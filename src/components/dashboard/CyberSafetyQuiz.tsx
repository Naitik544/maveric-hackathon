'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, XCircle, Sparkles, RefreshCw, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface Question {
  id: number;
  questionHi: string;
  questionGu: string;
  questionEn: string;
  optionsHi: string[];
  optionsGu: string[];
  optionsEn: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    questionEn: 'Does any bank official EVER call to ask for your 6-digit OTP or PIN?',
    questionHi: 'क्या कोई बैंक अधिकारी आपसे फोन पर 6-डिजिट OTP या PIN मांगता है?',
    questionGu: 'શું કોઈ પણ બેંક અધિકારી ક્યારેય ફોન પર તમારી પાસે 6-ડિજિટ OTP કે PIN માગે છે?',
    optionsEn: ['Never (0% Bank Policy)', 'Yes, for KYC Update', 'Only for SBI cards'],
    optionsHi: ['कभी नहीं (0% बैंक नीति)', 'हाँ, KYC अपडेट के लिए', 'केवल SBI कार्ड के लिए'],
    optionsGu: ['ક્યારેય નહીં (0% બેંક નીતિ)', 'હા, KYC અપડેટ માટે', 'માત્ર SBI કાર્ડ માટે'],
    correctIndex: 0,
    explanation: 'Bank officers NEVER ask for OTP or PIN. Anyone asking for OTP on call is 100% a scammer!'
  },
  {
    id: 2,
    questionEn: 'Entering your UPI PIN in Google Pay / Paytm will:',
    questionHi: 'Google Pay या Paytm में अपना UPI PIN डालने से क्या होता है?',
    questionGu: 'Google Pay અથવા Paytm માં તમારો UPI PIN દાખલ કરવાથી શું થાય છે?',
    optionsEn: ['DEDUCT money from your account', 'RECEIVE cash prize money', 'Check bank account status'],
    optionsHi: ['आपके खाते से पैसे कटते हैं', 'पैसे प्राप्त (Receive) होते हैं', 'बैंक खाता चेक होता है'],
    optionsGu: ['તમારા ખાતામાંથી પૈસા કપાય છે', 'પૈસા પ્રાપ્ત (Receive) થાય છે', 'બેંક ખાતું ચેક થાય છે'],
    correctIndex: 0,
    explanation: 'Golden Rule: Entering UPI PIN ALWAYS DEDUCTS money from your account. You NEVER enter PIN to receive money!'
  },
  {
    id: 3,
    questionEn: 'What should you do if an SMS says "Electricity cut tonight at 9:30 PM, call officer"?',
    questionHi: 'अगर SMS आये कि "बिजली आज रात कट जाएगी, अफसर को कॉल करें", तो क्या करें?',
    questionGu: 'જો SMS આવે કે "વીજળી આજે રાત્રે 9:30 વાગ્યે કાપી નાખવામાં આવશે, આ નંબર પર કૉલ કરો", તો શું કરવું?',
    optionsEn: ['Ignore SMS & Pay only via official electricity board app', 'Call the personal mobile number in SMS', 'Share OTP with caller'],
    optionsHi: ['SMS को नजरअंदाज करें और केवल ऑफिशियल ऐप से बिल भरें', 'SMS वाले मोबाइल नंबर पर तुरंत कॉल करें', 'कॉलर को OTP बताएं'],
    optionsGu: ['SMS ને અવગણો અને માત્ર સત્તાવાર એપ દ્વારા જ બિલ ભરો', 'SMS વાળા વ્યક્તિગત ફોન નંબર પર કૉલ કરો', 'કૉલરને OTP આપો'],
    correctIndex: 0,
    explanation: 'Electricity boards never send personal 10-digit mobile numbers for bill payments. Always pay via official apps.'
  }
];

export default function CyberSafetyQuiz({ selectedLanguage = 'en' }: { selectedLanguage?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { showToast } = useToast();

  const handleAnswerSelect = (optionIdx: number) => {
    const updatedAnswers = [...selectedAnswers, optionIdx];
    setSelectedAnswers(updatedAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      showToast('success', 'Quiz Completed!', 'SafeBank Certified Cyber Guardian Badge Unlocked! 🛡️');
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? score + 1 : score;
    }, 0);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
  };

  const q = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#05ffb0]/20 border border-[#05ffb0]/40 flex items-center justify-center text-[#05ffb0]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              Cyber Safety Shield Quiz <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400 font-medium">Test your banking fraud awareness & earn a Guardian Badge</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full">
          60-Sec Challenge
        </span>
      </div>

      {!isCompleted ? (
        <div className="space-y-6 relative z-10">
          {/* Progress Dots */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === idx ? 'w-6 bg-[#05ffb0]' : idx < currentStep ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Title */}
          <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
            {selectedLanguage === 'hi'
              ? q.questionHi
              : selectedLanguage === 'gu'
              ? q.questionGu
              : q.questionEn}
          </h4>

          {/* Option Buttons */}
          <div className="space-y-3">
            {(selectedLanguage === 'hi'
              ? q.optionsHi
              : selectedLanguage === 'gu'
              ? q.optionsGu
              : q.optionsEn
            ).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className="w-full text-left bg-slate-800/80 hover:bg-indigo-900/60 border border-slate-700/80 hover:border-[#05ffb0] rounded-2xl p-4 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <span>{opt}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#05ffb0] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results & Badge Award Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-5 py-4 relative z-10"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-[#05ffb0] to-emerald-400 rounded-3xl flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-[#05ffb0]/20 animate-bounce">
            <ShieldCheck className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold text-[#05ffb0] uppercase tracking-wider block">
              Official Certification
            </span>
            <h3 className="text-xl font-black text-white">SafeBank Certified Cyber Guardian</h3>
            <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
              You scored {calculateScore()} out of {QUIZ_QUESTIONS.length}! You are now equipped to protect your family and bank savings from cyber fraud.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="bg-[#05ffb0] hover:bg-[#03e59d] text-slate-950 font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Take Quiz Again</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
