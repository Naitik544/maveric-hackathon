'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, ShieldCheck, Download, Printer, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { ScamAnalysis } from '@/data/mockData';

interface FullReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ScamAnalysis;
}

export default function FullReportModal({ isOpen, onClose, analysis }: FullReportModalProps) {
  if (!isOpen) return null;

  const isHighRisk = analysis.riskScore >= 70;
  const isSafe = analysis.riskScore < 30;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
                isHighRisk ? 'bg-red-500' : isSafe ? 'bg-emerald-500' : 'bg-amber-500'
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">SafeBank AI Detailed Fraud Audit</h3>
                <p className="text-xs text-slate-500 font-medium">Report Reference ID: #SB-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Risk Gauge Header */}
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${
              isHighRisk ? 'bg-red-50/80 border-red-200' : isSafe ? 'bg-emerald-50/80 border-emerald-200' : 'bg-amber-50/80 border-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                {isHighRisk ? <ShieldAlert className="w-8 h-8 text-red-600" /> : <ShieldCheck className="w-8 h-8 text-emerald-600" />}
                <div>
                  <h4 className={`text-base font-extrabold ${isHighRisk ? 'text-red-700' : isSafe ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isHighRisk ? 'CRITICAL FRAUD ALERT (SCAM)' : isSafe ? 'SAFE COMMUNICATION' : 'SUSPICIOUS ACTIVITY'}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">Automated threat engine confidence: 99.4%</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-2xl font-black ${isHighRisk ? 'text-red-600' : isSafe ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {analysis.riskScore}%
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Risk Score</span>
              </div>
            </div>

            {/* AI Technical Breakdown */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">AI Threat Vectors Detected</h5>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs text-slate-700 font-medium">
                {analysis.reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Executive Synthesis</h5>
              <p className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-950 font-medium leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Recommended Safety Action Steps */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Required User Action Steps</h5>
              <div className="space-y-2">
                {analysis.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-xs font-semibold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Audit</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-md shadow-indigo-500/20"
            >
              Close Report
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
