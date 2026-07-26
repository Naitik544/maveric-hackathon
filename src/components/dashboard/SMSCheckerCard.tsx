'use client';

import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { INITIAL_SMS_DATA, ScamAnalysis } from '@/data/mockData';

interface SMSCheckerCardProps {
  onAnalyze?: (result: ScamAnalysis) => void;
}

export default function SMSCheckerCard({ onAnalyze }: SMSCheckerCardProps) {
  const [smsText, setSmsText] = useState(INITIAL_SMS_DATA.sampleText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(INITIAL_SMS_DATA.analysis);

  const handleAnalyze = () => {
    if (!smsText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      // Generate dynamic risk based on suspicious keywords
      const isSuspicious = /bit\.ly|kyc|block|immediate|bank|account|update|otp/i.test(smsText);
      const newAnalysis: ScamAnalysis = isSuspicious
        ? {
            riskScore: 96,
            riskLevel: 'High Risk',
            reasons: [
              'Contains suspicious link (bit.ly or unverified URL)',
              'Creates artificial urgency ("blocked", "immediately")',
              'Asks for sensitive bank account / KYC details'
            ],
            recommendedActions: [
              'Do not click on the link',
              'Do not share any OTP, PIN or CVV',
              'Contact your bank using official number',
              'Report this message'
            ],
            summary: 'Message exhibits classic banking phishing flags designed to capture credentials.'
          }
        : {
            riskScore: 12,
            riskLevel: 'Safe',
            reasons: ['No suspicious links found', 'Normal informal tone', 'No sensitive credentials requested'],
            recommendedActions: ['Standard caution applies', 'No immediate threat detected'],
            summary: 'Message appears safe.'
          };

      setAnalysis(newAnalysis);
      setIsAnalyzing(false);
      if (onAnalyze) onAnalyze(newAnalysis);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5345ED] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <MessageSquare className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">SMS Checker</h2>
            <p className="text-xs text-slate-500 font-medium">Paste your SMS message below</p>
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-2">
          <textarea
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            rows={4}
            placeholder="Paste your suspicious SMS here..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all resize-none"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !smsText.trim()}
            className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing SMS...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Analyze SMS</span>
              </>
            )}
          </button>
        </div>

        {/* Analysis Result */}
        {analysis && (
          <div className="space-y-3.5 pt-2 border-t border-slate-100">
            {/* Risk Score Pill */}
            <div className="bg-red-50/80 border border-red-200/80 rounded-2xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>Risk Score: {analysis.riskScore}%</span>
                </div>
                <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {analysis.riskLevel}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-red-200/60 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${analysis.riskScore}%` }}
                />
              </div>
            </div>

            {/* Why is this risky? */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800">Why is this risky?</h4>
              <ul className="space-y-1">
                {analysis.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                    <span className="text-red-500 font-bold text-xs mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What should you do? */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800">What should you do?</h4>
              <div className="space-y-1">
                {analysis.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
