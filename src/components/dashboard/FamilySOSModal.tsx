'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, Send, PhoneCall, CheckCircle2, MessageCircle, AlertTriangle, Users } from 'lucide-react';
import { ScamAnalysis } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

interface FamilySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis?: ScamAnalysis;
  scammerInfo?: string;
}

export default function FamilySOSModal({
  isOpen,
  onClose,
  analysis,
  scammerInfo = 'Suspicious Banking Link / Call'
}: FamilySOSModalProps) {
  const [relativeName, setRelativeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLang, setSelectedLang] = useState<'hi' | 'gu' | 'en'>('hi');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const riskScore = analysis ? analysis.riskScore : 94;
  const summary = analysis ? analysis.summary : 'Suspicious bank fraud call/message requesting OTP or payment link.';

  // Format pre-filled WhatsApp alert text based on selected language
  const getAlertMessage = () => {
    if (selectedLang === 'gu') {
      return `⚠️ *સાવધાન: સાયબર ફ્રોડ એલર્ટ!* ⚠️\n\nમારા ફોન પર એક શંકાસ્પદ ફ્રોડ મેસેજ/કૉલ આવ્યો છે.\n*જોખમ સ્કોર:* ${riskScore}%\n*વિગત:* ${summary}\n\nકૃપા કરીને મને કૉલ કરો અને મદદ કરો.`;
    } else if (selectedLang === 'hi') {
      return `⚠️ *सावधान: साइबर फ्रॉड अलर्ट!* ⚠️\n\nमेरे फोन पर एक संदिग्ध फ्रॉड मैसेज/कॉल आया है।\n*रिस्क स्कोर:* ${riskScore}%\n*विवरण:* ${summary}\n\nकृपया मुझे तुरंत कॉल करके गाइड करें।`;
    } else {
      return `⚠️ *CYBER FRAUD WARNING ALERT!* ⚠️\n\nA suspicious bank scam message/call was detected on my phone.\n*Risk Score:* ${riskScore}%\n*Summary:* ${summary}\n\nPlease check on me and assist immediately.`;
    }
  };

  const handleSendWhatsApp = () => {
    const message = encodeURIComponent(getAlertMessage());
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${message}`
      : `https://wa.me/?text=${message}`;

    window.open(waUrl, '_blank');
    showToast('success', 'WhatsApp SOS Sent!', 'Alert message copied and opened in WhatsApp.');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-lg w-full overflow-hidden relative"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  1-Tap Family SOS
                </span>
                <h3 className="text-xl font-black tracking-tight mt-0.5">
                  Send WhatsApp SOS Alert
                </h3>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Risk Summary Pill */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-red-900 block flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Detected Fraud ({riskScore}% Risk)
                </span>
                <p className="text-red-700 text-[11px] font-medium line-clamp-1">{summary}</p>
              </div>
            </div>

            {/* Language Selector for Alert Message */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Select Alert Message Language
              </label>
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                {(['hi', 'gu', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedLang === lang ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    {lang === 'hi' ? 'Hindi (हिंदी)' : lang === 'gu' ? 'Gujarati (ગુજરાતી)' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Family Member Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 9876543210 (Leave blank to choose contact in WhatsApp)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Message Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp Message Preview
                </span>
                <p className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                  {getAlertMessage()}
                </p>
              </div>
            </div>

            {/* Send Action Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs py-4 px-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send SOS Alert on WhatsApp Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
