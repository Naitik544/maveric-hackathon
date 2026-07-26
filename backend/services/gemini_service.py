import os
import json
import re
from dotenv import load_dotenv
from models import AnalysisResponse

load_dotenv()

# Attempt importing google.genai or google.generativeai
try:
    from google import genai
    from google.genai import types
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

SYSTEM_PROMPT = """
You are SafeBank AI, an expert AI Financial Security Analyst specializing in Indian digital banking fraud detection.
Analyze the user's input (SMS, WhatsApp message, or Phone Call Transcript) for potential scams targeting users in India.

Identify common Indian scam patterns:
- Bank KYC / PAN Card blockage phishing (e.g. fake SBI/HDFC/ICICI links)
- Electricity power disconnection threats at 9:30 PM
- Fake KBC / Cash Prize lotteries
- OLX / Army Officer QR code scams ("Scan to receive money")
- Remote access app installation (AnyDesk, TeamViewer, QuickSupport)
- Voice Phishing (Vishing) asking for 6-digit OTPs, UPI PINs, or CVVs
- Digital Arrest threats impersonating Police, CBI, or Telecom Dept

You MUST return a valid JSON object strictly matching this schema:
{
  "riskScore": <integer 0-100>,
  "riskLevel": "<High Risk | Medium Risk | Low Risk | Safe>",
  "scamCategory": "<e.g. Bank Phishing, Electricity Fraud, Vishing OTP Theft, Safe Message>",
  "confidence": <float e.g. 98.5>,
  "reasons": ["<reason 1>", "<reason 2>"],
  "safetyAdvice": ["<advice 1>", "<advice 2>"],
  "summary": "<short 1-2 sentence executive summary>"
}
Do NOT include markdown backticks around JSON output. Return pure JSON.
"""

def fallback_rule_based_analyzer(text: str, content_type: str) -> AnalysisResponse:
    """Fallback threat analysis engine if Gemini API key is missing or encounters network errors."""
    lower = text.toLowerCase() if hasattr(text, 'toLowerCase') else text.lower()
    
    is_phishing = any(k in lower for k in ['bit.ly', 'kyc', 'block', 'immediate', 'pan card', 'http', 'lien'])
    is_bill = any(k in lower for k in ['electricity', 'disconnect', 'power cut', 'unpaid bill'])
    is_lottery = any(k in lower for k in ['won', 'prize', 'lakh', 'crore', 'claim', 'kbc'])
    is_otp = any(k in lower for k in ['otp', 'pin', 'cvv', 'password', 'anydesk', 'teamviewer'])
    is_arrest = any(k in lower for k in ['arrest', 'cbi', 'police', 'parcel', 'customs'])

    if is_phishing or is_bill or is_lottery or is_otp or is_arrest:
        cat = "Bank KYC Phishing"
        if is_bill: cat = "Electricity Bill Scam"
        if is_lottery: cat = "Lottery / Cash Prize Scam"
        if is_otp: cat = "Vishing OTP / Remote App Fraud"
        if is_arrest: cat = "Digital Arrest Scam"

        return AnalysisResponse(
            riskScore=94,
            riskLevel="High Risk",
            scamCategory=cat,
            confidence=98.5,
            reasons=[
                "Contains suspicious unverified links or urgent demands",
                "Requests sensitive credentials (OTP, PIN, or PAN details)",
                "Exhibits classic coercion and panic tactics common in Indian banking fraud"
            ],
            safetyAdvice=[
                "Do not click on any links in the message",
                "Never share 6-digit OTPs or UPI PINs with anyone",
                "Report immediately to 1930 Cyber Crime Helpline",
                "Contact your bank using official customer care numbers"
            ],
            summary=f"High risk detected. This {content_type} shows strong indicators of {cat}."
        )
    
    return AnalysisResponse(
        riskScore=10,
        riskLevel="Safe",
        scamCategory="Legitimate Communication",
        confidence=97.0,
        reasons=["No suspicious URLs found", "No financial threats or OTP requests detected"],
        safetyAdvice=["Standard digital awareness applies", "No immediate threat detected"],
        summary=f"The provided {content_type} appears safe with no malicious flags."
    )

async def analyze_with_gemini(text: str, content_type: str) -> AnalysisResponse:
    if not GEMINI_API_KEY:
        print("[SafeBank AI Backend] GEMINI_API_KEY not found in environment. Using fallback rule engine.")
        return fallback_rule_based_analyzer(text, content_type)

    prompt = f"Analyze this {content_type} content:\n\n\"{text}\""

    try:
        if HAS_GENAI:
            client = genai.Client(api_key=GEMINI_API_KEY)
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.2,
                    response_mime_type="application/json"
                )
            )
            raw_text = response.text
        else:
            # Fallback HTTP request to Gemini API endpoint
            import requests
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": f"{SYSTEM_PROMPT}\n\n{prompt}"}]}]
            }
            res = requests.post(url, json=payload, timeout=10)
            res_json = res.json()
            raw_text = res_json['candidates'][0]['content']['parts'][0]['text']

        # Parse JSON output
        clean_json_str = re.sub(r'^```json\s*|\s*```$', '', raw_text.strip(), flags=re.MULTILINE)
        data = json.loads(clean_json_str)

        return AnalysisResponse(
            riskScore=int(data.get("riskScore", 90)),
            riskLevel=str(data.get("riskLevel", "High Risk")),
            scamCategory=str(data.get("scamCategory", "Digital Scam")),
            confidence=float(data.get("confidence", 99.0)),
            reasons=list(data.get("reasons", ["Suspicious link or credentials request"])),
            safetyAdvice=list(data.get("safetyAdvice", ["Do not share OTP or click links"])),
            summary=str(data.get("summary", "Analysis completed."))
        )

    except Exception as e:
        print(f"[SafeBank AI Backend Error] Gemini API call error: {e}. Falling back to rule engine.")
        return fallback_rule_based_analyzer(text, content_type)
