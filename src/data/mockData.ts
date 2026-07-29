export interface ScamAnalysis {
  riskScore: number;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  reasons: string[];
  recommendedActions: string[];
  summary: string;
}

export interface HistoryItem {
  id: string;
  type: 'SMS' | 'WhatsApp' | 'Call';
  title: string;
  preview: string;
  riskScore: number;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  timestamp: string;
}

export interface SafetyTip {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const INITIAL_SMS_DATA = {
  sampleText: `Dear Customer,\nYour bank account is blocked.\nUpdate KYC immediately to avoid deactivation.\nClick here: http://bit.ly/xyz123`,
  analysis: {
    riskScore: 96,
    riskLevel: 'High Risk' as const,
    reasons: [
      'Contains suspicious shortened link (bit.ly)',
      'Creates artificial urgency ("blocked", "immediately")',
      'Asks for sensitive KYC / account verification action'
    ],
    recommendedActions: [
      'Do not click on the link',
      'Do not share any OTP, PIN or CVV',
      'Contact your bank using the official number',
      'Report this message to 1930 Cyber Crime'
    ],
    summary: 'This SMS exhibits classic phishing patterns designed to steal banking credentials via a fraudulent link.'
  }
};

export const INITIAL_WHATSAPP_DATA = {
  sampleMessage: `Congratulations!\nYou have won ₹25,000.\nClick the link and fill the form to claim your prize now!\nhttp://win-prize.in/claim`,
  timestamp: '11:30 AM',
  analysis: {
    riskScore: 89,
    riskLevel: 'High Risk' as const,
    reasons: [
      'Fake lottery / cash prize offer',
      'Suspicious unverified domain (win-prize.in)',
      'Tries to extract personal details via online form'
    ],
    recommendedActions: [
      'Do not click on any link',
      'Do not share personal or banking information',
      'Ignore and block the sender on WhatsApp',
      'Report this message'
    ],
    summary: 'The message is a prize scam intended to capture sensitive personal and financial details.'
  }
};

export const INITIAL_CALL_DATA = {
  fileName: 'call_recording.mp3',
  duration: '00:45',
  transcript: `Caller: "Hello, I am calling from SBI Main Branch. Your debit card has been suspended due to pending biometric KYC. Please share the 6-digit OTP sent to your mobile right now to unblock it."`,
  analysis: {
    riskScore: 93,
    riskLevel: 'High Risk' as const,
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
    summary: 'The call transcript indicates voice phishing (vishing) attempting to gain unauthorized account access via OTP.'
  }
};

export const STAY_SAFE_TIPS: SafetyTip[] = [
  {
    id: 'tip-1',
    icon: 'ShieldAlert',
    title: 'Never share sensitive codes',
    description: 'Never share OTP, PIN, CVV or UPI PIN with anyone, including bank staff.'
  },
  {
    id: 'tip-2',
    icon: 'Link2Off',
    title: 'Avoid suspicious links',
    description: 'Never click on unknown links received via SMS, WhatsApp, or emails.'
  },
  {
    id: 'tip-3',
    icon: 'Building2',
    title: 'Official bank communication',
    description: 'Your bank never asks for personal banking details over phone calls or SMS.'
  },
  {
    id: 'tip-4',
    icon: 'PhoneCall',
    title: 'Verify via official channels',
    description: 'If in doubt, hang up and call your bank on the toll-free number printed on your card.'
  },
  {
    id: 'tip-5',
    icon: 'AlertTriangle',
    title: 'Report fraud immediately',
    description: 'Report any fraud immediately on national cyber crime portal or 1930 helpline.'
  }
];

export const RECENT_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    type: 'SMS',
    title: 'SMS',
    preview: 'Dear Customer, Your account is blocked...',
    riskScore: 96,
    riskLevel: 'High Risk',
    timestamp: '2 min ago'
  },
  {
    id: 'hist-2',
    type: 'WhatsApp',
    title: 'WhatsApp',
    preview: 'Congratulations! You have won ₹25,000...',
    riskScore: 89,
    riskLevel: 'High Risk',
    timestamp: '15 min ago'
  },
  {
    id: 'hist-3',
    type: 'Call',
    title: 'Call',
    preview: 'Bank officer asking for OTP and KYC...',
    riskScore: 93,
    riskLevel: 'High Risk',
    timestamp: '1 hour ago'
  },
  {
    id: 'hist-4',
    type: 'WhatsApp',
    title: 'WhatsApp',
    preview: 'Hi, is the bike still available?',
    riskScore: 12,
    riskLevel: 'Safe',
    timestamp: '2 hours ago'
  },
  {
    id: 'hist-5',
    type: 'SMS',
    title: 'SMS',
    preview: 'Electricity bill unpaid! Connection disconnect tonight...',
    riskScore: 95,
    riskLevel: 'High Risk',
    timestamp: '5 hours ago'
  },
  {
    id: 'hist-6',
    type: 'Call',
    title: 'Call',
    preview: 'Courier delivery agent verification call...',
    riskScore: 8,
    riskLevel: 'Safe',
    timestamp: '1 day ago'
  }
];

export const SUPPORTED_LANGUAGES = [
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'en', name: 'English' },
  { code: 'hinglish', name: 'Hinglish' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' }
];
