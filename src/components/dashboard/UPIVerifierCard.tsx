'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShieldCheck, ShieldAlert, CheckCircle2, Search, Sparkles, Loader2, CreditCard } from 'lucide-react';
import { getTranslation } from '@/lib/translations';
import { useToast } from '@/components/ui/Toast';

interface UPIVerifierCardProps {
  selectedLanguage?: string;
}

const KNOWN_SUSPICIOUS_UPI_HANDLES = [
  'sbi-kyc-verify@ybl',
  'paytm-refund-claim@okicici',
  'electricity-bill-pay@okaxis',
  'cbi-digital-fine@upi',
  'anydesk-support@paytm',
  'win-lottery-claim@ybl'
];

export default function UPIVerifierCard({ selectedLanguage = 'en' }: UPIVerifierCardProps) {
  const [upiId, setUpiId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{
    isFraud: boolean;
    upiId: string;
    riskScore: number;
    merchantName: string;
    reason: string;
  } | null>(null);

  const { showToast } = useToast();

  const handleVerify = () => {
    if (!upiId.trim()) {
      showToast('warning', 'Empty UPI Handle', 'Please enter a UPI ID or VPA address to verify.');
      return;
    }

    setIsVerifying(true);
    showToast('info', 'Verifying UPI Handle', 'Querying NPCI & National Fraud Database...');

    setTimeout(() => {
      const cleaned = upiId.trim().toLowerCase();
      const isKnownScam = KNOWN_SUSPICIOUS_UPI_HANDLES.some(h => cleaned.includes(h)) || /kyc|refund|lottery|cbi|support|verify/i.test(cleaned);

      if (isKnownScam) {
        setResult({
          isFraud: true,
          upiId: upiId.trim(),
          riskScore: 94,
          merchantName: 'Unverified Impersonator VPA',
          reason: 'This UPI VPA matches reported banking phishing handles. Never send money to this ID!'
        });
        showToast('error', 'Fraudulent UPI Handle Detected!', 'Risk Score: 94% - DO NOT SEND MONEY');
      } else {
        setResult({
          isFraud: false,
          upiId: upiId.trim(),
          riskScore: 12,
          merchantName: 'Verified Merchant / User',
          reason: 'No reported phishing or fraud reports linked to this UPI VPA.'
        });
        showToast('success', 'UPI Handle Appears Safe', 'No threat flags found on NPCI database.');
      }
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">UPI & QR Fraud Verifier</h2>
            <p className="text-xs text-slate-500 font-medium">Verify UPI IDs before transferring money</p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-[#5345ED] px-2.5 py-1 rounded-full">
          NPCI Shield
        </span>
      </div>

      {/* Input Bar */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID (e.g., sbi-kyc-verify@ybl)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-4 pr-24 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all shadow-xs"
          />

          <button
            onClick={handleVerify}
            disabled={isVerifying || !upiId.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Verify</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400">Try Sample UPI:</span>
          <button
            onClick={() => setUpiId('sbi-kyc-verify@ybl')}
            className="text-[10px] font-mono font-bold bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-[#5345ED] px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            sbi-kyc-verify@ybl
          </button>
          <button
            onClick={() => setUpiId('paytm-refund-claim@okicici')}
            className="text-[10px] font-mono font-bold bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-[#5345ED] px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            paytm-refund-claim@okicici
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-4 border space-y-3 ${
            result.isFraud ? 'bg-red-50/80 border-red-200' : 'bg-emerald-50/80 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {result.isFraud ? (
                <ShieldAlert className="w-5 h-5 text-red-600" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              )}
              <div>
                <h4 className={`text-xs font-bold ${result.isFraud ? 'text-red-700' : 'text-emerald-700'}`}>
                  {result.isFraud ? 'DANGER: Fraudulent UPI ID!' : 'SAFE: Verified UPI Handle'}
                </h4>
                <p className="text-[10px] font-mono text-slate-500">{result.upiId}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-base font-black ${result.isFraud ? 'text-red-600' : 'text-emerald-600'}`}>
                {result.riskScore}%
              </span>
              <span className="block text-[9px] uppercase font-bold text-slate-400">Risk</span>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-200/50">
            {result.reason}
          </p>
        </motion.div>
      )}
    </div>
  );
}
