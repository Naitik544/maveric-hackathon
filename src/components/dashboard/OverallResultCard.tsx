'use client';

import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Flag
} from 'lucide-react';

interface OverallResultCardProps {
  riskScore?: number;
  riskLevel?: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  summary?: string;
  onReportClick?: () => void;
  onViewReportClick?: () => void;
}

export default function OverallResultCard({
  riskScore = 93,
  riskLevel = 'High Risk',
  summary = 'The message/call you provided shows strong signs of fraud. Do not share any OTP, PIN or personal information.',
  onReportClick,
  onViewReportClick,
}: OverallResultCardProps) {
  const isHighRisk = riskScore >= 70;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="space-y-5">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Overall Result</h2>
          </div>
        </div>

        {/* Big Alert Hero Section */}
        <div className="flex flex-col items-center text-center space-y-2 py-2">
          <div className="relative">
            {/* Pulsing red shield glow */}
            <div className="w-20 h-24 bg-red-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
              <ShieldAlert className="w-12 h-12 stroke-[2.2] text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white font-extrabold text-xs">
              !
            </div>
          </div>

          <div className="space-y-0.5 pt-2">
            <h3 className="text-lg font-black text-red-600 tracking-tight">
              This looks like a Scam!
            </h3>
            <p className="text-xs font-bold text-red-600">
              Risk Score: {riskScore}% ({riskLevel})
            </p>
          </div>
        </div>

        {/* AI Summary Box */}
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>AI Summary</span>
          </div>
          <p className="text-xs text-amber-900/90 font-medium leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Safe Next Steps Box */}
        <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-4 space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-900">Safe Next Steps</h4>
          <div className="space-y-1.5">
            {[
              'Do not click any links',
              'Do not respond',
              'Report to cyber crime (1930)',
              'Contact your bank using official channels'
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>{step}</span>
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
          <span>Report This Scam</span>
        </button>

        <button
          onClick={onViewReportClick}
          className="w-full bg-indigo-50 hover:bg-indigo-100/80 active:scale-[0.99] text-[#5345ED] text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>View Full Report</span>
        </button>
      </div>
    </div>
  );
}
