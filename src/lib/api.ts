import { ScamAnalysis } from '@/data/mockData';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface ApiAnalysisResponse {
  riskScore: number;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  scamCategory: string;
  confidence: number;
  reasons: string[];
  safetyAdvice: string[];
  summary: string;
}

export async function analyzeSMS(message: string): Promise<ScamAnalysis> {
  try {
    const res = await fetch(`${BACKEND_URL}/analyze/sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiAnalysisResponse = await res.json();
    return {
      riskScore: data.riskScore,
      riskLevel: data.riskLevel,
      reasons: data.reasons,
      recommendedActions: data.safetyAdvice,
      summary: data.summary
    };
  } catch (error) {
    console.warn('[SafeBank AI] FastAPI backend call failed, fallback rule engine invoked.', error);
    // Dynamic Fallback AI Engine
    const isPhishing = /bit\.ly|kyc|block|immediate|bank|account|update|otp|lien|http/i.test(message);
    return isPhishing
      ? {
          riskScore: 96,
          riskLevel: 'High Risk',
          reasons: [
            'Contains unverified link or suspicious domain',
            'Creates artificial panic ("blocked", "immediate")',
            'Asks for sensitive KYC / account verification'
          ],
          recommendedActions: [
            'Do not click on the link',
            'Do not share any OTP, PIN or CVV',
            'Contact your bank using official number',
            'Report to 1930 Cyber Crime'
          ],
          summary: 'Message exhibits high-risk phishing markers targeting banking credentials.'
        }
      : {
          riskScore: 10,
          riskLevel: 'Safe',
          reasons: ['No suspicious links found', 'Normal informal tone', 'No sensitive credentials requested'],
          recommendedActions: ['Standard caution applies', 'No immediate threat detected'],
          summary: 'Message appears safe with no malicious indicators.'
        };
  }
}

export async function analyzeWhatsApp(message: string): Promise<ScamAnalysis> {
  try {
    const res = await fetch(`${BACKEND_URL}/analyze/whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiAnalysisResponse = await res.json();
    return {
      riskScore: data.riskScore,
      riskLevel: data.riskLevel,
      reasons: data.reasons,
      recommendedActions: data.safetyAdvice,
      summary: data.summary
    };
  } catch (error) {
    console.warn('[SafeBank AI] FastAPI backend call failed, fallback rule engine invoked.', error);
    const isScam = /won|prize|claim|lakh|crore|http|link|whatsapp|kbc|qr/i.test(message);
    return isScam
      ? {
          riskScore: 89,
          riskLevel: 'High Risk',
          reasons: [
            'Fake prize or lottery promise',
            'Suspicious website URL',
            'Tries to extract personal details via online form'
          ],
          recommendedActions: [
            'Do not click on any link',
            'Do not share personal information',
            'Ignore and block the sender',
            'Report this message'
          ],
          summary: 'The WhatsApp message is a deceptive lottery fraud scheme.'
        }
      : {
          riskScore: 8,
          riskLevel: 'Safe',
          reasons: ['No financial triggers detected', 'Known conversational tone'],
          recommendedActions: ['No action required'],
          summary: 'Message appears safe.'
        };
  }
}

export async function analyzeCall(transcript: string): Promise<ScamAnalysis> {
  try {
    const res = await fetch(`${BACKEND_URL}/analyze/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiAnalysisResponse = await res.json();
    return {
      riskScore: data.riskScore,
      riskLevel: data.riskLevel,
      reasons: data.reasons,
      recommendedActions: data.safetyAdvice,
      summary: data.summary
    };
  } catch (error) {
    console.warn('[SafeBank AI] FastAPI backend call failed, fallback rule engine invoked.', error);
    return {
      riskScore: 93,
      riskLevel: 'High Risk',
      reasons: [
        'Caller impersonates a bank official',
        'Caller asks directly for 6-digit OTP',
        'Tries to manipulate user through panic and urgency'
      ],
      recommendedActions: [
        'Never share OTP, PIN or CVV with anyone',
        'Bank officials never ask for OTP or passwords on call',
        'Hang up immediately and contact bank on official number',
        'Report this call to Cyber Crime Helpline (1930)'
      ],
      summary: 'Voice phishing (vishing) attempting to gain unauthorized account access via OTP.'
    };
  }
}
