'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Printer, Download, CheckCircle2, AlertTriangle, FileText, Building2, PhoneCall } from 'lucide-react';
import { ScamAnalysis } from '@/data/mockData';

interface AuditReportPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis?: ScamAnalysis;
}

export default function AuditReportPDFModal({
  isOpen,
  onClose,
  analysis
}: AuditReportPDFModalProps) {
  if (!isOpen) return null;

  const currentScore = analysis ? analysis.riskScore : 94;
  const isHighRisk = currentScore >= 70;
  const riskLevel = analysis ? analysis.riskLevel : 'High Risk';
  const summary = analysis ? analysis.summary : 'Phishing SMS attempting to harvest banking credentials via fake domain link.';
  const reasons = analysis ? analysis.reasons : ['Shortened fake URL', 'Urgent account suspension threat', 'Requests 6-digit OTP'];

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-2xl w-full overflow-hidden relative my-8 print:my-0 print:border-none print:shadow-none"
        >
          {/* Top Printable Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between relative print:bg-slate-900 print:text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5345ED] flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider block">
                  Official Cyber Crime Audit Certificate
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  SafeBank AI Forensic Report
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Document */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-900">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-mono">
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Report ID</span>
                <span className="font-bold text-slate-900">#SB-AUDIT-{Date.now().toString().slice(-6)}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">Audit Timestamp</span>
                <span className="font-bold text-slate-900">2026-07-29 | 15:45 IST</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold block text-[10px]">AI Confidence</span>
                <span className="font-bold text-emerald-600">99.4% Verified</span>
              </div>
            </div>

            {/* Risk Gauge Banner */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                isHighRisk ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Assessed Fraud Risk</span>
                <h3 className={`text-lg font-black ${isHighRisk ? 'text-red-700' : 'text-emerald-700'}`}>
                  {riskLevel} ({currentScore}%)
                </h3>
              </div>

              <div
                className={`text-2xl font-black px-4 py-2 rounded-xl text-white ${
                  isHighRisk ? 'bg-red-600' : 'bg-emerald-600'
                }`}
              >
                {currentScore}%
              </div>
            </div>

            {/* Threat Evidence Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Flagged Evidence & Threat Triggers</h4>
              <div className="space-y-2">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="space-y-1.5 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Executive AI Summary</h4>
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Official Legal Action & Helpline Info */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#05ffb0]">Official 1930 Cyber Crime Helpline Reference</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono">Toll-Free 1930</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                This forensic audit report can be attached to your official complaint on the National Cyber Crime Reporting Portal (`cybercrime.gov.in`) or submitted to your bank branch officer.
              </p>
            </div>

            {/* Print & Download Buttons */}
            <div className="flex items-center gap-3 pt-2 print:hidden">
              <button
                onClick={handlePrintPDF}
                className="flex-1 bg-[#5345ED] hover:bg-[#4335dc] text-white font-bold text-xs py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Audit PDF</span>
              </button>

              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 px-5 rounded-2xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
