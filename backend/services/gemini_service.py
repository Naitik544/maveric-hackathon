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
    """Fallback threat analysis engine with dynamic NLP scoring if Gemini API key is missing."""
    lower = text.lower().strip()
    score = 0
    reasons = []
    actions = []
    category = "General Communication"

    if not lower:
        return AnalysisResponse(
            riskScore=0,
            riskLevel="Safe",
            scamCategory="Clean Text",
            confidence=99.0,
            reasons=["No text input provided."],
            safetyAdvice=["Enter text to perform analysis."],
            summary="Empty input."
        )

    # 1. Check Links
    url_match = re.search(r'(https?://[^\s]+|www\.[^\s]+|[a-z0-9-]+\.(com|in|org|net|xyz|top|info|site|app|apk)[^\s]*)', lower)
    if url_match:
        domain = url_match.group(0)
        if re.search(r'sbi\.co\.in|hdfcbank\.com|icicibank\.com|axisbank\.com|gov\.in|nic\.in|cybercrime\.gov\.in', domain):
            score += 5
        elif re.search(r'bit\.ly|tinyurl|kyc|block|update|rewards|claim|free|pay-bill|refund|login', domain):
            score += 45
            reasons.append(f"Contains high-risk unverified domain link ({domain[:30]})")
            category = "Phishing Link Scam"
        else:
            score += 30
            reasons.append(f"Contains external URL link ({domain[:30]})")
            category = "Unverified Web Link"

    # 2. Check Credential Requests
    if re.search(r'otp|one time password|pin|cvv|password|debit card|credit card|expiry date', lower):
        score += 40
        reasons.append("Directly requests 6-digit OTP, UPI PIN, CVV, or card credentials")
        actions.append("NEVER share OTP, PIN, or CVV with anyone over SMS or calls")
        if "Scam" not in category: category = "OTP / Credential Harvesting"

    # 3. Check Panic Triggers
    if re.search(r'blocked|suspend|deactivate|disconnected|9:30 pm|today|within 2 hours|immediately|urgent|arrest|police|court|cbi|lien', lower):
        score += 25
        reasons.append("Uses artificial panic and time-pressure tactics ('blocked', 'disconnected', 'immediately')")
        if category == "General Communication": category = "Urgent Coercion Fraud"

    # 4. Check Lottery / Cash Claims
    if re.search(r'won|winner|lakh|crore|25 lakh|cash prize|kbc|lottery|reward points|refund|cashback|job|salary|telegram', lower):
        score += 35
        reasons.append("Promises unearned lottery cash prizes, reward point expiry, or fake job earnings")
        actions.append("Do not pay any 'processing fee' or 'TDS tax' to claim prizes")
        category = "Lottery / Cash Reward Fraud"

    # 5. Check APK / Remote Apps
    if re.search(r'\.apk|anydesk|teamviewer|quicksupport|rustdesk', lower):
        score += 45
        reasons.append("Requests installation of dangerous `.apk` files or remote access screen sharing apps")
        actions.append("Do not download `.apk` files or install AnyDesk/TeamViewer")
        category = "Malware / Remote Access Fraud"

    score = min(max(score, 5), 98)

    if score >= 75:
        level = "High Risk"
        if not actions: actions.append("Do not click any links or respond to this message")
        actions.append("Report immediately to 1930 Cyber Crime Helpline")
        actions.append("Block the sender number on your mobile phone")
    elif score >= 45:
        level = "Medium Risk"
        actions.append("Verify caller identity via official bank customer care number")
    elif score >= 25:
        level = "Low Risk"
        actions.append("Exercise general digital caution")
    else:
        level = "Safe"
        reasons.append("No malicious URLs, OTP requests, or panic triggers detected")
        actions.append("Message appears legitimate and safe")

    summary = f"Analysis complete. Content exhibits {level} markers ({score}% Risk Score) - {category}."

    return AnalysisResponse(
        riskScore=score,
        riskLevel=level,
        scamCategory=category,
        confidence=98.5,
        reasons=reasons,
        safetyAdvice=actions,
        summary=summary
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
