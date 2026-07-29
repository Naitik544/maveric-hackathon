export interface Translations {
  sidebar: {
    dashboard: string;
    smsChecker: string;
    whatsappChecker: string;
    callAnalyzer: string;
    safetyTips: string;
    reportScam: string;
    history: string;
    settings: string;
    languageLabel: string;
    seniorBannerTitle: string;
    seniorBannerSubtitle: string;
  };
  topNav: {
    greeting: string;
    subtitle: string;
    aiBadgeTitle: string;
    aiBadgeSub: string;
    signIn: string;
  };
  dashboard: {
    welcomeBadge: string;
    welcomeTitle: string;
    welcomeDesc: string;
    instantAi: string;
    precision: string;
    upiProtection: string;
    studioTitle: string;
    studioDesc: string;
    overallResultTitle: string;
    overallResultSub: string;
    safeLabel: string;
    suspiciousLabel: string;
    scamLabel: string;
    scamDetectedTitle: string;
    suspiciousDetectedTitle: string;
    safeTitle: string;
    riskScoreLabel: string;
    aiSummaryTitle: string;
    safeNextStepsTitle: string;
    reportScamBtn: string;
    viewReportBtn: string;
    footerCopyright: string;
    footerMadeWith: string;
  };
  cards: {
    smsTitle: string;
    smsSubtitle: string;
    smsPlaceholder: string;
    smsUploadBtn: string;
    smsAnalyzeBtn: string;
    whatsappTitle: string;
    whatsappSubtitle: string;
    whatsappPlaceholder: string;
    whatsappUploadBtn: string;
    whatsappAnalyzeBtn: string;
    callTitle: string;
    callSubtitle: string;
    callUploadTab: string;
    callRecordTab: string;
    callTranscriptLabel: string;
    callPlaceholder: string;
    callAnalyzeBtn: string;
    riskScoreLabel: string;
    whyRiskyTitle: string;
    whatToDoTitle: string;
  };
}

export const TRANSLATIONS: Record<string, Translations> = {
  en: {
    sidebar: {
      dashboard: 'Dashboard',
      smsChecker: 'SMS Checker',
      whatsappChecker: 'WhatsApp Checker',
      callAnalyzer: 'Call Analyzer',
      safetyTips: 'Safety Tips',
      reportScam: 'Report Scam',
      history: 'History',
      settings: 'Settings',
      languageLabel: 'LANGUAGE',
      seniorBannerTitle: 'Be Safe. Be Aware.',
      seniorBannerSubtitle: 'Stay informed, Stay protected.'
    },
    topNav: {
      greeting: 'Hello, User!',
      subtitle: 'We help you detect scams and stay safe in digital banking.',
      aiBadgeTitle: 'AI POWERED',
      aiBadgeSub: 'Secure • Smart • Safe',
      signIn: 'Sign In'
    },
    dashboard: {
      welcomeBadge: 'AI-Powered Financial Safety Assistant',
      welcomeTitle: 'Hello User!',
      welcomeDesc: 'Protect yourself and your family from digital banking fraud across India. Paste any suspicious SMS, WhatsApp message, or upload call recordings below for instant AI scam analysis.',
      instantAi: 'Instant AI Detection',
      precision: '99.4% Fraud Precision',
      upiProtection: 'UPI & Banking Protection',
      studioTitle: 'AI Scam Detection Studio',
      studioDesc: 'Select an analyzer below to evaluate SMS messages, WhatsApp chats, or call recordings in real-time.',
      overallResultTitle: 'Overall AI Diagnosis',
      overallResultSub: 'Real-time threat evaluation',
      safeLabel: 'Safe',
      suspiciousLabel: 'Suspicious',
      scamLabel: 'Scam',
      scamDetectedTitle: 'This looks like a Scam!',
      suspiciousDetectedTitle: 'Suspicious Content Detected!',
      safeTitle: 'Looks Safe & Legitimate!',
      riskScoreLabel: 'Risk Score:',
      aiSummaryTitle: 'AI Summary & Threat Analysis',
      safeNextStepsTitle: 'Recommended Action Steps',
      reportScamBtn: 'Report This Scam',
      viewReportBtn: 'View Detailed Audit Report',
      footerCopyright: '© 2026 SafeBank AI. All rights reserved.',
      footerMadeWith: 'Made with ❤️ for a safer India'
    },
    cards: {
      smsTitle: 'SMS Checker',
      smsSubtitle: 'Paste SMS or upload message file',
      smsPlaceholder: 'Paste suspicious SMS here...',
      smsUploadBtn: 'Upload',
      smsAnalyzeBtn: 'Analyze SMS',
      whatsappTitle: 'WhatsApp Checker',
      whatsappSubtitle: 'Paste text or upload chat screenshot',
      whatsappPlaceholder: 'Paste suspicious WhatsApp message here...',
      whatsappUploadBtn: 'Upload',
      whatsappAnalyzeBtn: 'Analyze Message',
      callTitle: 'Call Analyzer',
      callSubtitle: 'Upload call audio or speech transcript',
      callUploadTab: 'Upload Call Audio',
      callRecordTab: 'Record Audio (Live)',
      callTranscriptLabel: 'Speech-to-Text Transcript Panel',
      callPlaceholder: 'Paste speech transcript or audio notes...',
      callAnalyzeBtn: 'Analyze Call',
      riskScoreLabel: 'Risk Score:',
      whyRiskyTitle: 'Why this is risky?',
      whatToDoTitle: 'What should you do?'
    }
  },
  hi: {
    sidebar: {
      dashboard: 'डैशबोर्ड',
      smsChecker: 'SMS जांचकर्ता',
      whatsappChecker: 'व्हाट्सएप जांचकर्ता',
      callAnalyzer: 'कॉल विश्लेषक',
      safetyTips: 'सुरक्षा सुझाव',
      reportScam: 'स्कैम रिपोर्ट करें',
      history: 'इतिहास',
      settings: 'सेटिंग्स',
      languageLabel: 'भाषा चुनें',
      seniorBannerTitle: 'सुरक्षित रहें। सावधान रहें।',
      seniorBannerSubtitle: 'जागरूक रहें, सुरक्षित रहें।'
    },
    topNav: {
      greeting: 'नमस्ते, उपयोगकर्ता!',
      subtitle: 'हम आपको डिजिटल बैंकिंग धोखाधड़ी से सुरक्षित रखने में मदद करते हैं।',
      aiBadgeTitle: 'AI द्वारा संचालित',
      aiBadgeSub: 'सुरक्षित • समझदार • सुरक्षित',
      signIn: 'साइन इन करें'
    },
    dashboard: {
      welcomeBadge: 'AI-संचालित वित्तीय सुरक्षा सहायक',
      welcomeTitle: 'नमस्ते उपयोगकर्ता!',
      welcomeDesc: 'पूरे भारत में डिजिटल बैंकिंग धोखाधड़ी से खुद को और अपने परिवार को बचाएं। त्वरित AI स्कैम विश्लेषण के लिए नीचे कोई भी संदिग्ध SMS, व्हाट्सएप संदेश चिपकाएं या कॉल रिकॉर्डिंग अपलोड करें।',
      instantAi: 'त्वरित AI जांच',
      precision: '99.4% धोखाधड़ी सटीकता',
      upiProtection: 'UPI एवं बैंकिंग सुरक्षा',
      studioTitle: 'AI स्कैम डिटेक्शन स्टूडियो',
      studioDesc: 'वास्तविक समय में SMS, व्हाट्सएप चैट या कॉल रिकॉर्डिंग का विश्लेषण करने के लिए नीचे एक विश्लेषक चुनें।',
      overallResultTitle: 'समग्र AI निदान',
      overallResultSub: 'वास्तविक समय खतरा मूल्यांकन',
      safeLabel: 'सुरक्षित',
      suspiciousLabel: 'संदिग्ध',
      scamLabel: 'स्कैम',
      scamDetectedTitle: 'यह एक स्कैम (धोखाधड़ी) लगता है!',
      suspiciousDetectedTitle: 'संदिग्ध सामग्री पाई गई!',
      safeTitle: 'सुरक्षित और वैध लगता है!',
      riskScoreLabel: 'जोखिम स्कोर:',
      aiSummaryTitle: 'AI सारांश एवं खतरा विश्लेषण',
      safeNextStepsTitle: 'अनुशंसित सुरक्षा कदम',
      reportScamBtn: 'इस स्कैम की रिपोर्ट करें',
      viewReportBtn: 'विस्तृत ऑडिट रिपोर्ट देखें',
      footerCopyright: '© 2026 सेफबैंक AI. सर्वाधिकार सुरक्षित।',
      footerMadeWith: 'सुरक्षित भारत के लिए ❤️ से निर्मित'
    },
    cards: {
      smsTitle: 'SMS जांचकर्ता',
      smsSubtitle: 'SMS चिपकाएं या संदेश फ़ाइल अपलोड करें',
      smsPlaceholder: 'यहाँ संदिग्ध SMS चिपकाएं...',
      smsUploadBtn: 'अपलोड',
      smsAnalyzeBtn: 'SMS का विश्लेषण करें',
      whatsappTitle: 'व्हाट्सएप जांचकर्ता',
      whatsappSubtitle: 'पाठ चिपकाएं या चैट स्क्रीनशॉट अपलोड करें',
      whatsappPlaceholder: 'यहाँ संदिग्ध व्हाट्सएप संदेश चिपकाएं...',
      whatsappUploadBtn: 'अपलोड',
      whatsappAnalyzeBtn: 'संदेश का विश्लेषण करें',
      callTitle: 'कॉल विश्लेषक',
      callSubtitle: 'कॉल ऑडियो या स्पीच ट्रांसक्रिप्ट अपलोड करें',
      callUploadTab: 'कॉल ऑडियो अपलोड करें',
      callRecordTab: 'लाइव ऑडियो रिकॉर्ड करें',
      callTranscriptLabel: 'स्पीच-टू-टेक्स्ट ट्रांसक्रिप्ट पैनल',
      callPlaceholder: 'स्पीच ट्रांसक्रिप्ट या ऑडियो नोट्स चिपकाएं...',
      callAnalyzeBtn: 'कॉल का विश्लेषण करें',
      riskScoreLabel: 'जोखिम स्कोर:',
      whyRiskyTitle: 'यह जोखिम भरा क्यों है?',
      whatToDoTitle: 'आपको क्या करना चाहिए?'
    }
  },
  gu: {
    sidebar: {
      dashboard: 'ડેશબોર્ડ',
      smsChecker: 'SMS ચકાસણી',
      whatsappChecker: 'WhatsApp ચકાસણી',
      callAnalyzer: 'કૉલ પૃથક્કરણ',
      safetyTips: 'સુરક્ષા ટિપ્સ',
      reportScam: 'સ્કેમ રિપોર્ટ કરો',
      history: 'ઇતિહાસ',
      settings: 'સેટિંગ્સ',
      languageLabel: 'ભાષા પસંદ કરો',
      seniorBannerTitle: 'સુરક્ષિત રહો. સાવધ રહો.',
      seniorBannerSubtitle: 'માહિતગાર રહો, સુરક્ષિત રહો.'
    },
    topNav: {
      greeting: 'નમસ્તે, વપરાશકર્તા!',
      subtitle: 'અમે તમને ડિજિટલ બેંકિંગ ફ્રોડથી સુરક્ષિત રાખવામાં મદદ કરીએ છીએ.',
      aiBadgeTitle: 'AI સંચાલિત',
      aiBadgeSub: 'સુરક્ષિત • સ્માર્ટ • સેફ',
      signIn: 'સાઇન ઇન'
    },
    dashboard: {
      welcomeBadge: 'AI-સંચાલિત નાણાકીય સુરક્ષા મદદગાર',
      welcomeTitle: 'નમસ્તે વપરાશકર્તા!',
      welcomeDesc: 'સમગ્ર ભારતમાં ડિજિટલ બેંકિંગ ફ્રોડથી તમારી જાતને અને તમારા પરિવારને બચાવો. ત્વરિત AI સ્કેમ પૃથક્કરણ માટે નીચે કોઈપણ શંકાસ્પદ SMS, WhatsApp સંદેશ પેસ્ટ કરો અથવા કૉલ રેકોર્ડિંગ અપલોડ કરો.',
      instantAi: 'ત્વરિત AI તપાસ',
      precision: '99.4% ફ્રોડ ચોકસાઈ',
      upiProtection: 'UPI અને બેંકિંગ સુરક્ષા',
      studioTitle: 'AI સ્કેમ ડિટેક્શન સ્ટુડિયો',
      studioDesc: 'રીયલ-ટાઇમમાં SMS, WhatsApp ચેટ અથવા કૉલ રેકોર્ડિંગનું વિશ્લેષણ કરવા માટે નીચે એક તપાસકર્તા પસંદ કરો.',
      overallResultTitle: 'સમગ્ર AI નિદાન',
      overallResultSub: 'રીયલ-ટાઇમ જોખમ મૂલ્યાંકન',
      safeLabel: 'સુરક્ષિત',
      suspiciousLabel: 'શંકાસ્પદ',
      scamLabel: 'સ્કેમ',
      scamDetectedTitle: 'આ એક સ્કેમ (છેતરપિંડી) લાગે છે!',
      suspiciousDetectedTitle: 'શંકાસ્પદ સામગ્રી મળી!',
      safeTitle: 'સુરક્ષિત અને કાયદેસર લાગે છે!',
      riskScoreLabel: 'જોખમ સ્કોર:',
      aiSummaryTitle: 'AI સારાંશ અને જોખમ વિશ્લેષણ',
      safeNextStepsTitle: 'સૂચવેલ સુરક્ષા પગલાં',
      reportScamBtn: 'આ સ્કેમની રિપોર્ટ કરો',
      viewReportBtn: 'વિગતવાર ઓડિટ રિપોર્ટ જુઓ',
      footerCopyright: '© 2026 સેફબેંક AI. સર્વાધિકાર સુરક્ષિત.',
      footerMadeWith: 'સુરક્ષિત ભારત માટે ❤️ થી બનાવેલ'
    },
    cards: {
      smsTitle: 'SMS ચકાસણી',
      smsSubtitle: 'SMS પેસ્ટ કરો અથવા મેસેજ ફાઇલ અપલોડ કરો',
      smsPlaceholder: 'અહીં શંકાસ્પદ SMS પેસ્ટ કરો...',
      smsUploadBtn: 'અપલોડ',
      smsAnalyzeBtn: 'SMS નું પૃથક્કરણ કરો',
      whatsappTitle: 'WhatsApp ચકાસણી',
      whatsappSubtitle: 'લખાણ પેસ્ટ કરો અથવા ચેટ સ્ક્રીનશોટ અપલોડ કરો',
      whatsappPlaceholder: 'અહીં શંકાસ્પદ WhatsApp મેસેજ પેસ્ટ કરો...',
      whatsappUploadBtn: 'અપલોડ',
      whatsappAnalyzeBtn: 'મેસેજ નું પૃથક્કરણ કરો',
      callTitle: 'કૉલ પૃથક્કરણ',
      callSubtitle: 'કૉલ ઑડિઓ અથવા સ્પીચ ટ્રાન્સક્રિપ્ટ અપલોડ કરો',
      callUploadTab: 'કૉલ ઑડિઓ અપલોડ કરો',
      callRecordTab: 'લાઇવ ઑડિઓ રેકોર્ડ કરો',
      callTranscriptLabel: 'સ્પીચ-ટુ-ટેક્સ્ટ ટ્રાન્સક્રિપ્ટ પેનલ',
      callPlaceholder: 'સ્પીચ ટ્રાન્સક્રિપ્ટ અથવા ઑડિઓ નોટ્સ પેસ્ટ કરો...',
      callAnalyzeBtn: 'કૉલ નું પૃથક્કરણ કરો',
      riskScoreLabel: 'જોખમ સ્કોર:',
      whyRiskyTitle: 'આ શા માટે જોખમી છે?',
      whatToDoTitle: 'તમારે શું કરવું જોઈએ?'
    }
  },
  hinglish: {
    sidebar: {
      dashboard: 'Dashboard',
      smsChecker: 'SMS Checker',
      whatsappChecker: 'WhatsApp Checker',
      callAnalyzer: 'Call Analyzer',
      safetyTips: 'Safety Tips',
      reportScam: 'Report Scam',
      history: 'History',
      settings: 'Settings',
      languageLabel: 'LANGUAGE',
      seniorBannerTitle: 'Safe Raho. Aware Raho.',
      seniorBannerSubtitle: 'Jankari rakho, Protected raho.'
    },
    topNav: {
      greeting: 'Hello, User!',
      subtitle: 'Hum aapko digital banking fraud se safe rakhne me help karte hain.',
      aiBadgeTitle: 'AI POWERED',
      aiBadgeSub: 'Secure • Smart • Safe',
      signIn: 'Sign In'
    },
    dashboard: {
      welcomeBadge: 'AI-Powered Financial Safety Assistant',
      welcomeTitle: 'Hello User!',
      welcomeDesc: 'Apne aapko aur apni family ko digital banking fraud se bachayein. Suspicious SMS, WhatsApp message ya call recording paste karke instant AI scam analysis payein.',
      instantAi: 'Instant AI Detection',
      precision: '99.4% Fraud Precision',
      upiProtection: 'UPI & Banking Protection',
      studioTitle: 'AI Scam Detection Studio',
      studioDesc: 'Real-time me SMS, WhatsApp chats ya Call recordings analyze karne ke liye neeche checker select karein.',
      overallResultTitle: 'Overall AI Diagnosis',
      overallResultSub: 'Real-time threat evaluation',
      safeLabel: 'Safe',
      suspiciousLabel: 'Suspicious',
      scamLabel: 'Scam',
      scamDetectedTitle: 'Yeh ek Scam lagta hai!',
      suspiciousDetectedTitle: 'Suspicious Content Detect Hua!',
      safeTitle: 'Safe aur Legitimate lagta hai!',
      riskScoreLabel: 'Risk Score:',
      aiSummaryTitle: 'AI Summary & Threat Analysis',
      safeNextStepsTitle: 'Recommended Safety Steps',
      reportScamBtn: 'Is Scam Ko Report Karein',
      viewReportBtn: 'Detailed Audit Report Dekhein',
      footerCopyright: '© 2026 SafeBank AI. All rights reserved.',
      footerMadeWith: 'Safer India ke liye ❤️ se banaya gaya'
    },
    cards: {
      smsTitle: 'SMS Checker',
      smsSubtitle: 'SMS paste karein ya message file upload karein',
      smsPlaceholder: 'Yahan suspicious SMS paste karein...',
      smsUploadBtn: 'Upload',
      smsAnalyzeBtn: 'Analyze SMS',
      whatsappTitle: 'WhatsApp Checker',
      whatsappSubtitle: 'Text paste karein ya chat screenshot upload karein',
      whatsappPlaceholder: 'Yahan suspicious WhatsApp message paste karein...',
      whatsappUploadBtn: 'Upload',
      whatsappAnalyzeBtn: 'Analyze Message',
      callTitle: 'Call Analyzer',
      callSubtitle: 'Call audio ya speech transcript upload karein',
      callUploadTab: 'Upload Call Audio',
      callRecordTab: 'Record Audio (Live)',
      callTranscriptLabel: 'Speech-to-Text Transcript Panel',
      callPlaceholder: 'Speech transcript ya audio notes paste karein...',
      callAnalyzeBtn: 'Analyze Call',
      riskScoreLabel: 'Risk Score:',
      whyRiskyTitle: 'Yeh risky kyun hai?',
      whatToDoTitle: 'Aapko kya karna chahiye?'
    }
  }
};

export function getTranslation(lang: string): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
