'use client';

import React, { useState, useRef } from 'react';
import {
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  CheckCheck,
  Upload,
  Clipboard,
  Trash2,
  ShieldCheck,
  FileImage
} from 'lucide-react';
import { INITIAL_WHATSAPP_DATA, ScamAnalysis } from '@/data/mockData';
import { analyzeWhatsApp } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

interface WhatsAppCheckerCardProps {
  onAnalyze?: (result: ScamAnalysis) => void;
}

export default function WhatsAppCheckerCard({ onAnalyze }: WhatsAppCheckerCardProps) {
  const [waText, setWaText] = useState(INITIAL_WHATSAPP_DATA.sampleMessage);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(INITIAL_WHATSAPP_DATA.analysis);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!waText.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    showToast('info', 'Analyzing WhatsApp Message', 'Scanning text with Gemini AI threat engine...');

    try {
      const result = await analyzeWhatsApp(waText);
      setAnalysis(result);
      setIsAnalyzing(false);
      showToast(
        result.riskScore >= 70 ? 'warning' : 'success',
        result.riskScore >= 70 ? 'High Risk Scam Detected!' : 'WhatsApp Message Appears Safe',
        `Risk Score: ${result.riskScore}%`
      );
      if (onAnalyze) onAnalyze(result);
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorMessage('Failed to analyze WhatsApp message.');
      showToast('error', 'Analysis Error', 'Unable to complete WhatsApp scan.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setWaText(text);
    } catch {
      // Fallback
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // Simulate reading screenshot text or file content
      if (file.type.startsWith('text')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) setWaText(content.slice(0, 300));
        };
        reader.readAsText(file);
      }
    }
  };

  const isHighRisk = analysis ? analysis.riskScore >= 70 : false;
  const isSafe = analysis ? analysis.riskScore < 30 : false;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MessageCircle className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">WhatsApp Checker</h2>
              <p className="text-xs text-slate-500 font-medium">Paste text or upload chat screenshot</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <button
              onClick={handlePaste}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
              title="Paste from Clipboard"
            >
              <Clipboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setWaText(''); setUploadedFile(null); }}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Clear Input"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Input & Upload */}
        <div className="space-y-2.5">
          <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-3.5 relative">
            <textarea
              value={waText}
              onChange={(e) => setWaText(e.target.value)}
              rows={4}
              placeholder="Paste WhatsApp text..."
              className="w-full bg-transparent text-xs text-slate-900 font-sans leading-relaxed focus:outline-none resize-none"
            />
            <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-700 font-semibold mt-1">
              <span>{INITIAL_WHATSAPP_DATA.timestamp}</span>
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
            </div>
          </div>

          {/* Upload Screenshot / File Bar */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600 truncate max-w-[180px]">
              <FileImage className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate font-medium text-[11px]">
                {uploadedFile ? uploadedFile : 'Upload chat image / screenshot'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-emerald-700 hover:bg-emerald-50 font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Upload className="w-3 h-3" />
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !waText.trim()}
            className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Message...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Analyze Message</span>
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
              <ul className="space-y-1">
                {analysis.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                    <span className="text-red-500 font-bold text-xs mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
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
