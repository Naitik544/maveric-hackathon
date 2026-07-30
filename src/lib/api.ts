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

/**
 * Advanced Dynamic NLP Threat Inspection Engine
 * Evaluates exact text features, URL domains, panic triggers, credential requests, and context.
 */
function calculateDynamicThreatAnalysis(text: string, type: 'SMS' | 'WhatsApp' | 'Call'): ScamAnalysis {
  const lower = text.toLowerCase().trim();
  let score = 0;
  const reasons: string[] = [];
  const actions: string[] = [];
  let category = 'General Communication';

  if (!lower) {
    return {
      riskScore: 0,
      riskLevel: 'Safe',
      reasons: ['No text content provided.'],
      recommendedActions: ['Enter or paste text to perform AI threat analysis.'],
      summary: 'Please enter a message or transcript to analyze.'
    };
  }

  // 1. Check Suspicious Link / URL Features
  const urlMatch = lower.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9-]+\.(com|in|org|net|xyz|top|info|site|app|apk)[^\s]*)/i);
  if (urlMatch) {
    const domain = urlMatch[0];
    if (/sbi\.co\.in|hdfcbank\.com|icicibank\.com|axisbank\.com|gov\.in|nic\.in|cybercrime\.gov\.in/i.test(domain)) {
      score += 5; // Verified Official Domain
    } else if (/bit\.ly|tinyurl|kyc|block|update|rewards|claim|free|pay-bill|refund|login/i.test(domain)) {
      score += 45;
      reasons.push(`Contains high-risk unverified domain link (${domain.slice(0, 30)})`);
      category = 'Phishing Link Scam';
    } else {
      score += 30;
      reasons.push(`Contains external third-party URL link (${domain.slice(0, 30)})`);
      category = 'Unverified Web Link';
    }
  }

  // 2. Check Sensitive Credential / OTP / PIN Demands
  if (/otp|one time password|pin|cvv|password|debit card|credit card|expiry date/i.test(lower)) {
    score += 40;
    reasons.push('Directly requests 6-digit OTP, UPI PIN, CVV, or card credentials');
    actions.push('NEVER share OTP, PIN, or CVV with anyone over SMS, WhatsApp, or calls');
    if (!category.includes('Scam')) category = 'OTP / Credential Harvesting';
  }

  // 3. Check Artificial Urgency & Panic Triggers
  if (/blocked|suspend|deactivate|disconnected|9:30 pm|today|within 2 hours|immediately|urgent|arrest|police|court|cbi|lien/i.test(lower)) {
    score += 25;
    reasons.push('Uses artificial panic and time-pressure tactics ("blocked", "disconnected", "immediately")');
    if (category === 'General Communication') category = 'Urgent Coercion Fraud';
  }

  // 4. Check Financial Prize / Lottery / Reward / Refund Claims
  if (/won|winner|lakh|crore|25 lakh|cash prize|kbc|lottery|reward points|refund|cashback|job|salary|telegram/i.test(lower)) {
    score += 35;
    reasons.push('Promises unearned lottery cash prizes, reward point expiry, or fake job earnings');
    actions.push('Do not pay any "processing fee" or "TDS tax" to claim prizes');
    category = 'Lottery / Cash Reward Fraud';
  }

  // 5. Check APK / Remote Access App Downloads
  if (/\.apk|anydesk|teamviewer|quicksupport|rustdesk/i.test(lower)) {
    score += 45;
    reasons.push('Requests installation of dangerous `.apk` files or remote access screen sharing apps');
    actions.push('Do not download `.apk` files or install AnyDesk/TeamViewer');
    category = 'Malware / Remote Access Fraud';
  }

  // 6. Check Digital Arrest / Government Impersonation
  if (/police|cbi|customs|telecom|trai|digital arrest|warrant|illegal parcel/i.test(lower)) {
    score += 45;
    reasons.push('Impersonates police officers or law enforcement threatening digital arrest');
    actions.push('Police never conduct "Digital Arrests" via video calls or demand money transfers');
    category = 'Digital Arrest Coercion';
  }

  // Normalize final score between 5% and 98%
  score = Math.min(Math.max(score, 5), 98);

  // Determine Risk Level & Advice based on dynamic score
  let riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe' = 'Safe';
  if (score >= 75) {
    riskLevel = 'High Risk';
    if (actions.length === 0) actions.push('Do not click any links or respond to this message');
    actions.push('Report immediately to 1930 Cyber Crime Helpline');
    actions.push('Block the sender number on your mobile phone');
  } else if (score >= 45) {
    riskLevel = 'Medium Risk';
    actions.push('Verify caller identity via official bank customer care number on your card');
    actions.push('Do not share confidential credentials');
  } else if (score >= 25) {
    riskLevel = 'Low Risk';
    actions.push('Exercise general digital caution');
  } else {
    riskLevel = 'Safe';
    reasons.push('No malicious URLs, OTP requests, or panic triggers detected');
    actions.push('Message appears legitimate and safe');
  }

  // Dynamic summary generation
  let summary = '';
  if (riskLevel === 'High Risk') {
    summary = `High confidence threat detected. This ${type} exhibits strong characteristics of ${category} (${score}% Risk Score).`;
  } else if (riskLevel === 'Medium Risk') {
    summary = `Caution advised. The ${type} contains unverified links or urgency markers (${score}% Risk Score).`;
  } else {
    summary = `The provided ${type} content appears safe with no malicious threat indicators (${score}% Risk Score).`;
  }

  return {
    riskScore: score,
    riskLevel,
    reasons,
    recommendedActions: actions,
    summary
  };
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
    console.warn('[SafeBank AI] Backend API call failed, using dynamic client NLP threat engine.', error);
    return calculateDynamicThreatAnalysis(message, 'SMS');
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
    console.warn('[SafeBank AI] Backend API call failed, using dynamic client NLP threat engine.', error);
    return calculateDynamicThreatAnalysis(message, 'WhatsApp');
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
    console.warn('[SafeBank AI] Backend API call failed, using dynamic client NLP threat engine.', error);
    return calculateDynamicThreatAnalysis(transcript, 'Call');
  }
}
