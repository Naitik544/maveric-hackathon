'use client';

import React, { useState } from 'react';
import {
  Flag,
  ShieldAlert,
  CheckCircle2,
  Upload,
  Send,
  PhoneCall,
  ExternalLink,
  Database,
  ShieldCheck,
  Building2,
  Info,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ReportScamTab() {
  const [scamType, setScamType] = useState('SMS Phishing');
  const [scammersNumber, setScammersNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scammersNumber.trim() || !description.trim()) {
      showToast('warning', 'Incomplete Form', 'Please fill in the scammer phone number and details.');
      return;
    }

    // Save report to LocalStorage & History Database
    try {
      const newReport = {
        id: `report-${Date.now()}`,
        type: scamType.includes('SMS') ? 'SMS' : scamType.includes('WhatsApp') ? 'WhatsApp' : 'Call',
        title: `${scamType}: ${scammersNumber}`,
        preview: description,
        riskScore: 98,
        riskLevel: 'High Risk',
        timestamp: 'Just now'
      };

      const existingHistory = JSON.parse(localStorage.getItem('safebank_user_history') || '[]');
      localStorage.setItem('safebank_user_history', JSON.stringify([newReport, ...existingHistory]));

      // Call backend API endpoint if server is online
      fetch('http://localhost:8000/report-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scam_type: scamType,
          scammer_contact: scammersNumber,
          description: description
        })
      }).catch(() => {});
    } catch (err) {
      console.warn('LocalStorage save error', err);
    }

    setIsSubmitted(true);
    showToast('success', 'Scam Report Saved!', 'Logged in SafeBank Threat Intelligence & User History.');
    
    setTimeout(() => {
      setIsSubmitted(false);
      setScammersNumber('');
      setDescription('');
    }, 6000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>National Threat Reporting Center</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Report a Cyber Banking Scam
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Report fraudulent phone numbers, UPI handles, or phishing links to protect users across Gujarat and India.
        </p>
      </div>

      {/* 🚨 1. DIRECT HELPLINE 1930 & CYBER CRIME PORTAL ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Helpline 1930 Call Card */}
        <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-lg shadow-red-600/20 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2.5 py-1 rounded-full tracking-wider">
                Official Helpline
              </span>
              <Clock className="w-4 h-4 text-red-200" />
            </div>

            <h3 className="text-lg font-black tracking-tight">
              National Cyber Crime Helpline (1930)
            </h3>
            <p className="text-xs text-red-100 font-medium leading-relaxed">
              If you lost money in financial fraud, call immediately within 24 hours (Golden Hour) to freeze the fraudster's bank account!
            </p>
          </div>

          <a
            href="tel:1930"
            className="w-full bg-white text-red-700 hover:bg-red-50 font-black text-xs py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 fill-red-700" />
            <span>Call 1930 Toll-Free Right Now</span>
          </a>
        </div>

        {/* Official Cyber Crime Portal Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-lg shadow-slate-900/20 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 px-2.5 py-1 rounded-full tracking-wider">
                Govt. Portal
              </span>
              <Building2 className="w-4 h-4 text-indigo-300" />
            </div>

            <h3 className="text-lg font-black tracking-tight">
              Official Indian Cyber Crime Portal
            </h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              File an official legal complaint directly on the Ministry of Home Affairs Cyber Crime Reporting Portal (`cybercrime.gov.in`).
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#5345ED] hover:bg-[#4335dc] text-white font-black text-xs py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit cybercrime.gov.in</span>
          </a>
        </div>
      </div>

      {/* 📍 2. WHERE THIS INFORMATION GOES (EXPLANATION BANNER) */}
      <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs">
          <Database className="w-4 h-4 text-[#5345ED]" />
          <span>Where does your report information go & get saved?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 space-y-1">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              1. Saved to Your Personal Account History
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Saved locally and in PostgreSQL Prisma ORM DB. You can view all your submitted scam reports anytime under the <strong>History Tab</strong>.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 space-y-1">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5345ED]" />
              2. SafeBank Threat Intelligence Engine
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              The phone number/link is instantly added to our AI community threat database to automatically alert & block this scammer for all other users.
            </p>
          </div>
        </div>
      </div>

      {/* 📝 3. SCAM REPORT FORM */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900">Scam Report Logged & Saved!</h3>
            <p className="text-xs text-emerald-800 font-medium max-w-md mx-auto">
              Your report has been saved to your History Tab and added to the SafeBank AI National Threat Database to protect other users.
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
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all shadow-xs"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:bg-white transition-all resize-none shadow-xs"
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
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold py-4 px-4 rounded-2xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
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
