'use client';

import React, { useState } from 'react';
import { Phone, Play, Pause, AlertCircle, CheckCircle2, Loader2, Sparkles, FileAudio } from 'lucide-react';
import { INITIAL_CALL_DATA, ScamAnalysis } from '@/data/mockData';

interface CallAnalyzerCardProps {
  onAnalyze?: (result: ScamAnalysis) => void;
}

export default function CallAnalyzerCard({ onAnalyze }: CallAnalyzerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState(INITIAL_CALL_DATA.fileName);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(INITIAL_CALL_DATA.analysis);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(INITIAL_CALL_DATA.analysis);
      setIsAnalyzing(false);
      if (onAnalyze) onAnalyze(INITIAL_CALL_DATA.analysis);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5345ED] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Phone className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Call Analyzer</h2>
            <p className="text-xs text-slate-500 font-medium">Upload a call recording or transcript</p>
          </div>
        </div>

        {/* Audio Player Bar & Upload Box */}
        <div className="space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-[#5345ED] hover:bg-[#4335dc] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {/* Waveform graphic */}
              <div className="flex-1 flex items-center gap-1 h-6">
                {[40, 75, 30, 90, 60, 100, 45, 80, 55, 30, 70, 95, 40, 65, 85, 50, 70, 40, 90, 60].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying && i % 2 === 0 ? 'bg-[#5345ED] animate-pulse' : 'bg-slate-300'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-slate-600 shrink-0">
                {INITIAL_CALL_DATA.duration}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                <FileAudio className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{fileName}</span>
              </div>
              <label className="text-[#5345ED] hover:underline font-bold text-[11px] cursor-pointer">
                Change File
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Call Audio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Analyze Call</span>
              </>
            )}
          </button>
        </div>

        {/* Analysis Output */}
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
              <p className="text-[11px] text-slate-600 font-medium leading-normal">
                The caller is asking for OTP and KYC details and trying to create urgency.
              </p>
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
