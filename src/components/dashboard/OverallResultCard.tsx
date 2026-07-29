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
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import FullReportModal from './FullReportModal';
import { ScamAnalysis } from '@/data/mockData';
import { getTranslation } from '@/lib/translations';

interface OverallResultCardProps {
  analysis?: ScamAnalysis;
  riskScore?: number;
  riskLevel?: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  summary?: string;
  selectedLanguage?: string;
  onReportClick?: () => void;
  onViewReportClick?: () => void;
}

export default function OverallResultCard({
  analysis,
  riskScore = 93,
  riskLevel = 'High Risk',
  summary = 'The message/call you provided shows strong signs of fraud. Do not share any OTP, PIN or personal information.',
  selectedLanguage = 'en',
  onReportClick,
  onViewReportClick,
}: OverallResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = getTranslation(selectedLanguage);

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
      <div className="glass-card glass-card-hover rounded-3xl p-6 md:p-7 flex flex-col justify-between h-full relative overflow-hidden space-y-6">
        <div className="space-y-5">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{t.dashboard.overallResultTitle}</h2>
                <p className="text-[11px] text-slate-400 font-medium">{t.dashboard.overallResultSub}</p>
              </div>
            </div>

            {/* Status Pill Display */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl shrink-0">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg transition-all ${
                isSafe ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-400'
              }`}>
                {t.dashboard.safeLabel}
              </span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg transition-all ${
                isSuspicious ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-400'
              }`}>
                {t.dashboard.suspiciousLabel}
              </span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg transition-all ${
                isScam ? 'bg-red-500 text-white shadow-xs' : 'text-slate-400'
              }`}>
                {t.dashboard.scamLabel}
              </span>
            </div>
          </div>

          {/* Large Risk Shield Hero Section with Framer Motion */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-50/60 rounded-2xl p-5 border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLevelLabel}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative shrink-0"
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

            <div className="space-y-1.5 text-center sm:text-left">
              <h3
                className={`text-lg md:text-xl font-black tracking-tight ${
                  isScam ? 'text-red-600' : isSuspicious ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {isScam
                  ? t.dashboard.scamDetectedTitle
                  : isSuspicious
                  ? t.dashboard.suspiciousDetectedTitle
                  : t.dashboard.safeTitle}
              </h3>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-700">
                <span>{t.dashboard.riskScoreLabel}</span>
                <span
                  className={`text-base font-black ${
                    isScam ? 'text-red-600' : isSuspicious ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {currentScore}%
                </span>
                <span
                  className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                    isScam
                      ? 'bg-red-100 text-red-700'
                      : isSuspicious
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {currentLevelLabel}
                </span>
              </div>
            </div>
          </div>

          {/* AI Summary Box with Voice Readout Button */}
          <div
            className={`rounded-2xl p-4 space-y-2 border transition-all ${
              isScam
                ? 'bg-amber-50/80 border-amber-200/80'
                : isSuspicious
                ? 'bg-amber-50/80 border-amber-200/80'
                : 'bg-emerald-50/80 border-emerald-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.dashboard.aiSummaryTitle}</span>
              </div>

              {/* Text to Speech Voice Readout Button */}
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(currentSummary);
                    if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
                    else if (selectedLanguage === 'gu') utterance.lang = 'gu-IN';
                    else utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#5345ED] bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-indigo-200/60"
                title="Read Diagnosis Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen (સાંભળો / सुनो)</span>
              </button>
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
            <h4 className="text-xs font-bold text-emerald-900">{t.dashboard.safeNextStepsTitle}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onReportClick}
            className="flex-1 w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flag className="w-4 h-4" />
            <span>{t.dashboard.reportScamBtn}</span>
          </button>

          <button
            onClick={() => {
              setIsModalOpen(true);
              if (onViewReportClick) onViewReportClick();
            }}
            className="flex-1 w-full bg-indigo-50 hover:bg-indigo-100/80 active:scale-[0.99] text-[#5345ED] text-xs font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-100"
          >
            <FileText className="w-4 h-4" />
            <span>{t.dashboard.viewReportBtn}</span>
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
