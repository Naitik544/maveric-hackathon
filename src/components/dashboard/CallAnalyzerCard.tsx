'use client';

import React, { useState, useRef } from 'react';
import {
  Phone,
  Play,
  Pause,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  FileAudio,
  Upload,
  ShieldCheck,
  Mic,
  Trash2
} from 'lucide-react';
import { INITIAL_CALL_DATA, ScamAnalysis } from '@/data/mockData';
import { analyzeCall } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

interface CallAnalyzerCardProps {
  onAnalyze?: (result: ScamAnalysis) => void;
}

export default function CallAnalyzerCard({ onAnalyze }: CallAnalyzerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState(INITIAL_CALL_DATA.fileName);
  const [transcriptText, setTranscriptText] = useState(INITIAL_CALL_DATA.transcript);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(INITIAL_CALL_DATA.analysis);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnalyze = async () => {
    if (!transcriptText.trim()) return;
    setIsAnalyzing(true);
    showToast('info', 'Analyzing Call Audio', 'Scanning call speech transcript with Gemini AI...');

    try {
      const result = await analyzeCall(transcriptText);
      setAnalysis(result);
      setIsAnalyzing(false);
      showToast(
        result.riskScore >= 70 ? 'warning' : 'success',
        result.riskScore >= 70 ? 'Voice Fraud / Vishing Call Detected!' : 'Call Audio Appears Safe',
        `Risk Score: ${result.riskScore}%`
      );
      if (onAnalyze) onAnalyze(result);
    } catch (err: any) {
      setIsAnalyzing(false);
      showToast('error', 'Analysis Error', 'Unable to complete Call Audio scan.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const isHighRisk = analysis ? analysis.riskScore >= 70 : false;
  const isSafe = analysis ? analysis.riskScore < 30 : false;

  return (
    <div className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5345ED] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Phone className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Call Analyzer</h2>
              <p className="text-xs text-slate-500 font-medium">Upload call audio or speech transcript</p>
            </div>
          </div>

          <button
            onClick={() => { setTranscriptText(''); setFileName('no_file.mp3'); }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            title="Clear Input"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Player & Upload Options */}
        <div className="space-y-2.5">
          {/* Audio Player Bar */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-3">
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

            {/* File info and Upload trigger */}
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                <FileAudio className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate text-[11px] font-semibold">{fileName}</span>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#5345ED] hover:bg-indigo-50 font-bold text-[11px] px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Audio</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.wav,.mp3,.m4a"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Speech Transcript Input Box */}
          <textarea
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
            rows={2}
            placeholder="Paste speech transcript or audio notes..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all resize-none"
          />

          {/* Analyze Button */}
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

        {/* Dynamic Risk Meter & Output */}
        {analysis && (
          <div className="space-y-3.5 pt-3 border-t border-slate-100">
            {/* Visual Risk Meter */}
            <div
              className={`rounded-2xl p-3.5 border space-y-2 ${
                isHighRisk
                  ? 'bg-red-50/80 border-red-200/80'
                  : isSafe
                  ? 'bg-emerald-50/80 border-emerald-200/80'
                  : 'bg-amber-50/80 border-amber-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isHighRisk ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  )}
                  <span className={`font-bold text-xs ${isHighRisk ? 'text-red-700' : 'text-emerald-700'}`}>
                    Risk Score: {analysis.riskScore}%
                  </span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isHighRisk
                      ? 'bg-red-100 text-red-700'
                      : isSafe
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {analysis.riskLevel}
                </span>
              </div>

              {/* Gauge Meter Bar */}
              <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isHighRisk
                      ? 'bg-gradient-to-r from-rose-500 to-red-600'
                      : isSafe
                      ? 'bg-gradient-to-r from-emerald-400 to-green-600'
                      : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                  style={{ width: `${analysis.riskScore}%` }}
                />
              </div>
            </div>

            {/* Why this is risky */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800">Why this is risky?</h4>
              <p className="text-[11px] text-slate-600 font-medium leading-normal">
                The caller is asking for OTP and KYC details and trying to create urgency.
              </p>
            </div>

            {/* What should you do */}
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
