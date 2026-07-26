'use client';

import React from 'react';
import { Phone, Mic, ShieldAlert, AlertTriangle, FileText } from 'lucide-react';
import CallAnalyzerCard from '../dashboard/CallAnalyzerCard';

export default function CallAnalyzerTab() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Phone className="w-6 h-6 text-[#5345ED]" />
          Call Audio & Vishing Analyzer
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Upload phone call recordings or paste speech transcripts to detect fake bank officer scams (Vishing).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CallAnalyzerCard />

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <Mic className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Vishing (Voice Fraud) Signs</h3>
              <p className="text-xs text-slate-500">What our AI listens for in call audio</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 font-medium">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">1. Requests for OTP, PIN, or Card CVV</span>
              <p className="text-slate-600">No genuine bank official will ever ask you to read out a 6-digit OTP or UPI PIN during a phone call.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">2. Remote Access App Installation</span>
              <p className="text-slate-600">Callers asking you to install AnyDesk, TeamViewer QuickSupport, or RustDesk on your phone to "help update KYC" are trying to mirror your device screen.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">3. Threats of Legal Action / Digital Arrest</span>
              <p className="text-slate-600">Fraudsters posing as CBI, ED, or Telecom Dept claiming your phone number is linked to illegal parcel shipment ("Digital Arrest") are 100% fraudulent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
