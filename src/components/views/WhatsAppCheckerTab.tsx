'use client';

import React from 'react';
import { MessageCircle, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import WhatsAppCheckerCard from '../dashboard/WhatsAppCheckerCard';

export default function WhatsAppCheckerTab() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-emerald-600" />
          WhatsApp Scam Analyzer
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Identify fake lottery claims, fake QR code payment scams, and malicious links sent via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WhatsAppCheckerCard />

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Common WhatsApp Scams in India</h3>
              <p className="text-xs text-slate-500">Protecting your UPI & bank balance</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 font-medium">
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 block">1. KBC / Cash Prize Lottery Audio & Images</span>
              <p className="text-emerald-800">Scammers send fake audio recordings of KBC hosts alleging you won ₹25 Lakhs, requesting "processing fee" via UPI.</p>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 block">2. OLX / Army Officer QR Code Scam</span>
              <p className="text-emerald-800">Posing as buyers, scammers send a QR code claiming "Scan to RECEIVE money". Golden rule: Entering UPI PIN ALWAYS DEDUCTS money!</p>
            </div>

            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 block">3. APK File Downloads (.apk)</span>
              <p className="text-emerald-800">Never install `.apk` files sent on WhatsApp (e.g. `SBI_Reward.apk` or `ElectricityBill.apk`). They contain spyware that intercepts your SMS OTPs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
