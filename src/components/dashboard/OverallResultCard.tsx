'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Flag,
  Sparkles
} from 'lucide-react';
import FullReportModal from './FullReportModal';
import { ScamAnalysis } from '@/data/mockData';

interface OverallResultCardProps {
  analysis?: ScamAnalysis;
  riskScore?: number;
  riskLevel?: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  summary?: string;
  onReportClick?: () => void;
  onViewReportClick?: () => void;
}

export default function OverallResultCard({
  analysis,
  riskScore = 93,
  riskLevel = 'High Risk',
  summary = 'The message/call you provided shows strong signs of fraud. Do not share any OTP, PIN or personal information.',
  onReportClick,
  onViewReportClick,
}: OverallResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentScore = analysis ? analysis.riskScore : riskScore;
  const isScam = currentScore >= 75;
  const isSuspicious = currentScore >= 35 && currentScore < 75;
  const isSafe = currentScore < 35;

  const currentLevelLabel = isScam ? 'Scam' : isSuspicious ? 'Suspicious' : 'Safe';
  const currentSummary = analysis ? analysis.summary : summary;

  const activeAnalysisObj: ScamAnalysis = analysis || {
    riskScore: currentScore,
    riskLevel: isScam ? 'High Risk' : isSafe ? 'Safe' : 'Medium Risk',
    reasons: isScam
      ? ['Contains unverified links', 'Asks for 6-digit OTP', 'High urgency indicators']
      : ['No financial threats detected'],
    recommendedActions: isScam
      ? ['Do not click any links', 'Do not respond', 'Report to cyber crime (1930)', 'Contact your bank using official channels']
      : ['Maintain general awareness', 'Do not share confidential credentials'],
    summary: currentSummary
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full relative overflow-hidden">
        <div className="space-y-5">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Overall AI Result</h2>
            </div>

            {/* Status Pills Selector Display */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                isSafe ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-500'
              }`}>
                Safe
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                isSuspicious ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'
              }`}>
                Suspicious
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                isScam ? 'bg-red-500 text-white shadow-xs' : 'text-slate-500'
              }`}>
                Scam
              </span>
            </div>
          </div>

          {/* Large Risk Shield Hero Section with Framer Motion */}
          <div className="flex flex-col items-center text-center space-y-3 py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLevelLabel}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative"
              >
                <div
                  className={`w-20 h-24 rounded-3xl flex items-center justify-center text-white shadow-xl transition-all duration-500 ${
                    isScam
                      ? 'bg-gradient-to-tr from-red-600 to-rose-500 shadow-red-500/30'
                      : isSuspicious
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-500 shadow-amber-500/30'
                      : 'bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-emerald-500/30'
                  }`}
                >
                  {isScam ? (
                    <ShieldAlert className="w-12 h-12 stroke-[2.2] text-white" />
                  ) : isSuspicious ? (
                    <AlertTriangle className="w-12 h-12 stroke-[2.2] text-white" />
                  ) : (
                    <ShieldCheck className="w-12 h-12 stroke-[2.2] text-white" />
                  )}
                </div>

                <div
                  className={`absolute -top-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white font-extrabold text-xs shadow-sm ${
                    isScam ? 'bg-red-600' : isSuspicious ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}
                >
                  {isScam ? '!' : isSuspicious ? '?' : '✓'}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-1">
              <h3
                className={`text-lg font-black tracking-tight ${
                  isScam ? 'text-red-600' : isSuspicious ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {isScam
                  ? 'This looks like a Scam!'
                  : isSuspicious
                  ? 'Suspicious Content Detected!'
                  : 'Looks Safe & Legitimate!'}
              </h3>

              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
                <span>Risk Score:</span>
                <span
                  className={`text-sm font-black ${
                    isScam ? 'text-red-600' : isSuspicious ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {currentScore}%
                </span>
                <span
                  className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                    isScam
                      ? 'bg-red-100 text-red-700'
                      : isSuspicious
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  ({currentLevelLabel})
                </span>
              </div>
            </div>
          </div>

          {/* AI Summary Box */}
          <div
            className={`rounded-2xl p-4 space-y-2 border transition-all ${
              isScam
                ? 'bg-amber-50/80 border-amber-200/80'
                : isSuspicious
                ? 'bg-amber-50/80 border-amber-200/80'
                : 'bg-emerald-50/80 border-emerald-200/80'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>AI Summary</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {currentSummary}
            </p>
          </div>

          {/* Safe Next Steps Box */}
          <div
            className={`rounded-2xl p-4 space-y-2.5 border transition-all ${
              isSafe ? 'bg-emerald-50/80 border-emerald-200/80' : 'bg-emerald-50/80 border-emerald-200/80'
            }`}
          >
            <h4 className="text-xs font-bold text-emerald-900">Safe Next Steps</h4>
            <div className="space-y-1.5">
              {activeAnalysisObj.recommendedActions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5] mt-0.5" />
                  <span className="leading-tight">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-4">
          <button
            onClick={onReportClick}
            className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flag className="w-4 h-4" />
            <span>Report Scam</span>
          </button>

          <button
            onClick={() => {
              setIsModalOpen(true);
              if (onViewReportClick) onViewReportClick();
            }}
            className="w-full bg-indigo-50 hover:bg-indigo-100/80 active:scale-[0.99] text-[#5345ED] text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Full Report</span>
          </button>
        </div>
      </div>

      {/* Full Audit Report Modal */}
      <FullReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        analysis={activeAnalysisObj}
      />
    </>
  );
}
