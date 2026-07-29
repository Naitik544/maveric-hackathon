'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Clipboard,
  Trash2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  Tag,
  AlertTriangle,
  History,
  FileText,
  Lock,
  Search,
  ShieldAlert,
  Info
} from 'lucide-react';
import { analyzeSMS } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

export interface SMSAnalysisResult {
  riskScore: number;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  scamCategory: string;
  confidence: number;
  reasons: string[];
  recommendedActions?: string[];
  safeSuggestions: string[];
  summary: string;
}

export default function SMSCheckerTab() {
  const [smsText, setSmsText] = useState(
    'Dear Customer, Your SBI account will be blocked today due to non-updated PAN Card. Click http://sbi-kyc-update.com immediately to avoid blockage.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showToast } = useToast();

  const [analysis, setAnalysis] = useState<SMSAnalysisResult | null>({
    riskScore: 96,
    riskLevel: 'High Risk',
    scamCategory: 'Bank KYC Phishing',
    confidence: 99.4,
    reasons: [
      'Contains suspicious shortened domain (sbi-kyc-update.com instead of sbi.co.in)',
      'Uses artificial panic triggers ("blocked today", "immediately")',
      'Attempts credential harvesting for banking logins'
    ],
    safeSuggestions: [
      'Do not click on the link',
      'Do not share any OTP, PIN, or CVV',
      'Contact SBI customer care using the toll-free number on your debit card',
      'Report this SMS to 1930 Cyber Crime'
    ],
    summary: 'High confidence phishing attempt impersonating SBI to steal account credentials.'
  });

  const [recentAnalyses, setRecentAnalyses] = useState([
    {
      id: 'rec-1',
      text: 'Dear Customer, Your SBI account will be blocked today...',
      category: 'Bank KYC Phishing',
      score: 96,
      time: '2 min ago'
    },
    {
      id: 'rec-2',
      text: 'Electricity power will be disconnected at 9:30 PM...',
      category: 'Electricity Bill Fraud',
      score: 94,
      time: '12 min ago'
    },
    {
      id: 'rec-3',
      text: 'Your order #4920 has been dispatched via BlueDart...',
      category: 'Legitimate Logistics',
      score: 5,
      time: '1 hour ago'
    }
  ]);

  const handleAnalyze = async () => {
    if (!smsText.trim()) return;
    setIsAnalyzing(true);
    showToast('info', 'Analyzing SMS', 'Connecting to SafeBank AI threat engine...');

    try {
      const result = await analyzeSMS(smsText);
      setAnalysis({
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
        scamCategory: (result as any).scamCategory || 'SMS Phishing Analysis',
        confidence: (result as any).confidence || 99.4,
        reasons: result.reasons,
        recommendedActions: result.recommendedActions,
        safeSuggestions: result.recommendedActions,
        summary: result.summary
      });

      setRecentAnalyses(prev => [
        {
          id: `rec-${Date.now()}`,
          text: smsText.slice(0, 50) + '...',
          category: (result as any).scamCategory || 'SMS Phishing Analysis',
          score: result.riskScore,
          time: 'Just now'
        },
        ...prev.slice(0, 3)
      ]);
      showToast(
        result.riskScore >= 70 ? 'warning' : 'success',
        result.riskScore >= 70 ? 'SMS Fraud Detected!' : 'SMS Appears Safe',
        `Risk Score: ${result.riskScore}%`
      );
    } catch (error) {
      console.error('[SMSCheckerTab] Backend analysis failed', error);
      showToast('error', 'Analysis Error', 'Unable to complete SMS scan.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePasteSMS = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setSmsText(text);
    } catch {
      // Fallback
    }
  };

  const isHighRisk = analysis ? analysis.riskScore >= 70 : false;
  const isSafe = analysis ? analysis.riskScore < 30 : false;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Dedicated SMS Threat Inspector</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          SMS Scam Checker
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Detect phishing links, fake bank alerts, electricity bill fraud, and SMS scams across India in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Box & Security Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Input Box */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#5345ED]" />
                <span>Paste SMS Content Below</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePasteSMS}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Clipboard className="w-3.5 h-3.5 text-slate-600" />
                  <span>Paste SMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSmsText('')}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Clear Input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Textarea Input */}
            <div className="relative">
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                rows={6}
                placeholder="Paste suspicious SMS message here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all resize-none shadow-xs"
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-mono">
                {smsText.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !smsText.trim()}
              className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-4 px-6 rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer text-sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>AI Scanning & Analyzing SMS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                  <span>Analyze SMS Now</span>
                </>
              )}
            </button>
          </div>

          {/* 🌟 Rich Filler Component: SMS Security Inspection Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">SMS Safety Inspection Rules</h3>
                <p className="text-[11px] text-slate-500 font-medium">How SafeBank AI detects SMS phishing</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Shortened / Fake Links
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Real banks use official domain URLs (`sbi.co.in`, `hdfcbank.com`). Avoid clicking `bit.ly` or `.in` domains.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  Artificial Urgency
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Messages claiming *"Account blocked today"* or *"Electricity cut in 1 hour"* are designed to create panic.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-500" />
                  OTP / KYC Verification
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Banks NEVER ask for OTPs or PINs over SMS or external web forms.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  Unknown Mobile Numbers
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Official bank SMS comes from registered 6-letter sender IDs (e.g. `AX-SBINB`), not 10-digit mobile numbers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Result Card & Recent Scans */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-sm flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-[#5345ED] animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Scanning SMS Pattern...</h3>
                <p className="text-xs text-slate-500 font-medium max-w-xs">
                  SafeBank AI threat engine is cross-checking headers, URLs, and language markers.
                </p>
              </motion.div>
            ) : analysis ? (
              <motion.div
                key={analysis.riskScore}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5"
              >
                {/* Result Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#5345ED]" />
                    <h3 className="text-base font-bold text-slate-900">SMS Analysis Result</h3>
                  </div>

                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {analysis.confidence}% AI Confidence
                  </span>
                </div>

                {/* Score & Category Hero */}
                <div
                  className={`p-4 rounded-2xl border space-y-3 ${
                    isHighRisk
                      ? 'bg-red-50/80 border-red-200/80'
                      : isSafe
                      ? 'bg-emerald-50/80 border-emerald-200/80'
                      : 'bg-amber-50/80 border-amber-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Scam Category</span>
                      <h4 className={`text-sm font-black ${isHighRisk ? 'text-red-700' : 'text-emerald-700'}`}>
                        {analysis.scamCategory}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className={`text-2xl font-black ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>
                        {analysis.riskScore}%
                      </span>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Risk Score</span>
                    </div>
                  </div>

                  {/* Meter Progress Bar */}
                  <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isHighRisk ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-emerald-400 to-green-600'
                      }`}
                      style={{ width: `${analysis.riskScore}%` }}
                    />
                  </div>
                </div>

                {/* Threat Reasons */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Reason & Threat Indicators</h4>
                  <div className="space-y-1.5">
                    {analysis.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safe Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Safe Suggestions & Next Steps</h4>
                  <div className="space-y-1.5">
                    {analysis.safeSuggestions.map((sug, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Recent Analysis Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-[#5345ED]" />
                <span>Recent SMS Scans</span>
              </h3>
            </div>

            <div className="space-y-3">
              {recentAnalyses.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 bg-slate-50 border border-slate-200/70 rounded-2xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 truncate max-w-[220px]">
                    <span className="font-bold text-slate-800 block truncate">{rec.text}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{rec.category} • {rec.time}</span>
                  </div>

                  <span
                    className={`font-black text-xs px-2.5 py-1 rounded-lg shrink-0 ${
                      rec.score >= 70 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {rec.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
