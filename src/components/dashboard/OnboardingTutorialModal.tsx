'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Globe,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface OnboardingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingTutorialModal({
  isOpen,
  onClose
}: OnboardingTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const STEPS = [
    {
      step: 1,
      badge: 'Step 1 • Select Language',
      titleEn: '1. Select Your Regional Language',
      titleGu: '૧. તમારી પ્રાદેશિક ભાષા પસંદ કરો',
      titleHi: '1. अपनी क्षेत्रीय भाषा चुनें',
      descriptionEn: 'Easily toggle between Gujarati (ગુજરાતી), Hindi (हिंदी), and English from the top navigation bar or sidebar at any time.',
      descriptionGu: 'કોઈપણ સમયે ટોપ નેવિગેશન બાર અથવા સાઇડબારમાંથી ગુજરાતી, હિન્દી અને અંગ્રેજી વચ્ચે સરળતાથી સ્વિચ કરો.',
      descriptionHi: 'टॉप नेविगेशन बार या साइडबार से किसी भी समय गुजराती, हिंदी और अंग्रेजी में आसानी से स्विच करें।',
      icon: <Globe className="w-10 h-10 text-[#5345ED]" />,
      bg: 'bg-indigo-50 border-indigo-200'
    },
    {
      step: 2,
      badge: 'Step 2 • Scan Content',
      titleEn: '2. Paste SMS, WhatsApp or Record Voice Call',
      titleGu: '૨. SMS, WhatsApp લિંક પેસ્ટ કરો અથવા વોઇસ કોલ રેકોર્ડ કરો',
      titleHi: '2. SMS, WhatsApp मैसेज पेस्ट करें या कॉल रिकॉर्ड करें',
      descriptionEn: 'Copy suspicious messages, lottery alerts, or record live phone calls. Click "Analyze" for instant AI fraud detection.',
      descriptionGu: 'શંકાસ્પદ મેસેજ, લોટરી એલર્ટ કોપી કરો અથવા લાઇવ કોલ રેકોર્ડ કરો. ઈન્સ્ટન્ટ ફ્રોડ ચેક માટે "Analyze" પર ક્લિક કરો.',
      descriptionHi: 'संदिग्ध मैसेज, लॉटरी अलर्ट कॉपी करें या लाइव कॉल रिकॉर्ड करें। तुरंत जांच के लिए "Analyze" पर क्लिक करें।',
      icon: <MessageSquare className="w-10 h-10 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      step: 3,
      badge: 'Step 3 • Check AI Risk',
      titleEn: '3. View AI Risk Score & Safety Advice',
      titleGu: '૩. AI રિસ્ક સ્કોર અને સલામતી માર્ગદર્શિકા જુઓ',
      titleHi: '3. AI रिस्क स्कोर और सुरक्षा सलाह देखें',
      descriptionEn: 'SafeBank AI analyzes shortened URLs, OTP requests, and bank official impersonation, showing a 0-100% Risk Gauge.',
      descriptionGu: 'SafeBank AI શંકાસ્પદ લિંક્સ, OTP વિનંતીઓ અને બોગસ કોલરનું વિશ્લેષણ કરીને ૦-૧૦૦% રિસ્ક સ્કોર બતાવે છે.',
      descriptionHi: 'SafeBank AI संदिग्ध लिंक, OTP अनुरोध और फर्जी कॉलर का विश्लेषण करके 0-100% रिस्क स्कोर दिखाता है।',
      icon: <ShieldCheck className="w-10 h-10 text-amber-500" />,
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      step: 4,
      badge: 'Step 4 • Protect & Alert',
      titleEn: '4. Send Family SOS Alert or Dial Helpline 1930',
      titleGu: '૪. ફેમિલી SOS એસએમએસ મોકલો અથવા 1930 પર કૉલ કરો',
      titleHi: '4. फैमिली SOS अलर्ट भेजें या 1930 हेल्पलाइन पर कॉल करें',
      descriptionEn: 'Send a 1-tap WhatsApp alert to family members or call National Cyber Crime Helpline 1930 to freeze fraudulent money transfers.',
      descriptionGu: 'પરિવારના સભ્યોને ૧-ટેપ વોટ્સએપ એલર્ટ મોકલો અથવા ફ્રોડ ટ્રાન્સફર રોકવા માટે 1930 પર કૉલ કરો.',
      descriptionHi: 'परिवार के सदस्यों को 1-टैप व्हाट्सएप अलर्ट भेजें या फ्रॉड ट्रांसफर रोकने के लिए 1930 पर कॉल करें।',
      icon: <PhoneCall className="w-10 h-10 text-red-600" />,
      bg: 'bg-red-50 border-red-200'
    }
  ];

  const current = STEPS[currentStep];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-xl w-full overflow-hidden relative"
        >
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-[#5345ED] to-indigo-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <HelpCircle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2.5 py-0.5 rounded-full tracking-wider">
                  Interactive Guide • વપરાશકર્તા માર્ગદર્શિકા
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
                  How to Use SafeBank AI Website
                </h3>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Step Visual Card */}
            <div className={`p-6 rounded-3xl border ${current.bg} space-y-4 shadow-xs`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full text-slate-800 border border-slate-200">
                  {current.badge}
                </span>
                {current.icon}
              </div>

              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  {current.titleEn}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                  {current.titleGu}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1 border-t border-slate-200/60">
                  {current.descriptionEn}
                </p>
              </div>
            </div>

            {/* Pagination Progress Dots */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === idx ? 'w-8 bg-[#5345ED]' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                {currentStep + 1 < STEPS.length ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Start Protecting Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
