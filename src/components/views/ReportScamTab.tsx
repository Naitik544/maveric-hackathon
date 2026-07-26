'use client';

import React, { useState } from 'react';
import { Flag, ShieldAlert, CheckCircle2, Upload, Send, AlertTriangle } from 'lucide-react';

export default function ReportScamTab() {
  const [scamType, setScamType] = useState('SMS Phishing');
  const [scammersNumber, setScammersNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setScammersNumber('');
      setDescription('');
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Flag className="w-6 h-6 text-red-600" />
          Report a Banking Scam
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Help community members stay safe by logging fraudulent phone numbers, SMS headers, or phishing URLs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900">Scam Report Submitted Successfully!</h3>
            <p className="text-xs text-emerald-800 font-medium max-w-md mx-auto">
              Thank you for contributing to Indian digital banking safety. Our AI threat database has logged this report to alert other users.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Scam Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Scam Type / Channel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['SMS Phishing', 'WhatsApp Scam', 'Vishing Call', 'UPI / QR Scam'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setScamType(type)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      scamType === type
                        ? 'bg-[#5345ED] text-white border-[#5345ED] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Scammer's Phone Number or Link */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Scammer's Phone Number / Sender ID / Website Link
              </label>
              <input
                type="text"
                required
                value={scammersNumber}
                onChange={(e) => setScammersNumber(e.target.value)}
                placeholder="e.g. +91 98765 43210 or http://sbi-kyc-fix.in"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all"
              />
            </div>

            {/* Incident Details */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Incident Description & Details
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the scammer said or sent (e.g. Asked for OTP, threatened account blockage)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Attach Screenshot */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Attach Evidence Screenshot (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-300 rounded-2xl p-6 text-center bg-slate-50/50 cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-700 block">Click to upload screenshot</span>
                <span className="text-[10px] text-slate-400 font-medium">PNG, JPG, up to 10MB</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Scam Report</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
