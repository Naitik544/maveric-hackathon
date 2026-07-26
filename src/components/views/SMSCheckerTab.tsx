'use client';

import React, { useState } from 'react';
import { MessageSquare, AlertOctagon, CheckCircle2, ShieldAlert, Sparkles, Copy, RefreshCw } from 'lucide-react';
import SMSCheckerCard from '../dashboard/SMSCheckerCard';

const SAMPLE_SMS = [
  {
    title: 'Bank KYC Scam',
    text: 'Dear Customer, Your SBI account will be blocked today due to non-updated PAN Card. Click http://sbi-kyc-update.com immediately to avoid blockage.'
  },
  {
    title: 'Electricity Disconnection Scam',
    text: 'Urgent: Electricity power will be disconnected at 9:30 PM due to unpaid previous month bill. Contact Electricity Officer immediately at 9876543210.'
  },
  {
    title: 'Part-Time Job / Telegram Scam',
    text: 'Earn ₹3000-₹8000 daily by rating YouTube videos from home! No experience required. Telegram contact: @earn_easy_fast'
  },
  {
    title: 'Reward Points Expiry',
    text: 'Your HDFC Reward Points (value ₹4,850) will expire tonight. Redeem now into your bank account: http://hdfc-rewards-redeem.in'
  }
];

export default function SMSCheckerTab() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_SMS[0].text);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#5345ED]" />
          SMS Scam Analyzer
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Detect phishing links, fraudulent bank alerts, and malicious SMS messages targeted at Indian mobile users.
        </p>
      </div>

      {/* Preset Samples */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Try Common Indian SMS Scam Samples:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_SMS.map((sample, i) => (
            <button
              key={i}
              onClick={() => setSelectedSample(sample.text)}
              className="text-left bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-2xl p-3 space-y-1.5 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-[#5345ED]">
                <span>{sample.title}</span>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#5345ED]" />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 font-mono leading-tight">
                {sample.text}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Checker Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SMSCheckerCard />
        
        {/* Informational Guidance */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">How SMS Phishing Works in India</h3>
              <p className="text-xs text-slate-500">Key indicators recognized by SafeBank AI</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">1. Unregistered Sender Headers</span>
              <p className="text-slate-600">Official bank SMS headers in India use 6-character alphabetic codes (e.g. `AX-HDFCBK` or `VM-SBIBNK`), never 10-digit mobile numbers.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">2. Fake Domain Redirection</span>
              <p className="text-slate-600">Scammers use shortened URLs (bit.ly, tinyurl) or lookalike domains (`sbi-kyc.com` instead of `sbi.co.in`) to host credential harvesting pages.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">3. False Urgency & Fear Tactics</span>
              <p className="text-slate-600">Phrases like "Account Suspended", "Power Cut Tonight", or "Lien Marked" are designed to cause panic so victims act without thinking.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
