'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Zap,
  Lock,
  MessageSquare,
  MessageCircle,
  PhoneCall,
  QrCode,
  Globe,
  ArrowRight,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Cpu,
  Database
} from 'lucide-react';
import { getTranslation } from '@/lib/translations';

interface MaverickHeroStudioProps {
  selectedLanguage?: string;
  onInitiateScanClick?: () => void;
}

const SAMPLE_LIVE_MESSAGES = [
  {
    id: 'msg-1',
    channel: 'SMS',
    sender: 'VM-SBINB',
    time: 'Just now',
    text: 'Dear Customer, your SBI Debit card is BLOCKED due to pending KYC. Update now at http://sbi-verify-kyc.in or account freeze.',
    status: 'BLOCKED',
    riskScore: 98,
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
    reason: 'Phishing URL & OTP Threat'
  },
  {
    id: 'msg-2',
    channel: 'WhatsApp',
    sender: '+91 98210 54321',
    time: '2 mins ago',
    text: 'Earn ₹5,000/day by liking YouTube videos! No experience needed. Click telegram link to claim registration bonus ₹500.',
    status: 'WARNING',
    riskScore: 88,
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    reason: 'Part-Time Task Job Fraud'
  },
  {
    id: 'msg-3',
    channel: 'UPI',
    sender: 'paytm-refund-claim@okicici',
    time: '5 mins ago',
    text: 'UPI Collect Request of ₹14,999 received for Electricity Bill Refund. Enter UPI PIN to receive cash.',
    status: 'BLOCKED',
    riskScore: 95,
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
    reason: 'Fake UPI Money Collect Trap'
  },
  {
    id: 'msg-4',
    channel: 'SMS',
    sender: 'AD-[#5345ED]',
    time: '12 mins ago',
    text: 'Your OTP for login to HDFC NetBanking is 482910. Valid for 10 minutes. Do not share with anyone.',
    status: 'SAFE',
    riskScore: 5,
    badgeColor: 'bg-[#05ffb0]/20 text-[#05ffb0] border-[#05ffb0]/40',
    reason: 'Legitimate System OTP'
  }
];

export default function MaverickHeroStudio({
  selectedLanguage = 'en',
  onInitiateScanClick
}: MaverickHeroStudioProps) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % SAMPLE_LIVE_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeMsg = SAMPLE_LIVE_MESSAGES[activeMessageIndex];

  return (
    <div className="bg-[#0b0f19] text-white rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 md:p-10 space-y-10 relative overflow-hidden">
      {/* Background Subtle Cyber Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5345ED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#05ffb0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. MAVERICK.AI NAVBAR / HEADER BRAND IDENTITY */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5345ED] to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-white flex items-center gap-1">
              MAVERICK<span className="text-[#05ffb0]">.ai</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-widest">
              AI Cyber-Security Shield
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#05ffb0] animate-ping" />
            <span className="text-[11px] font-mono">Live Threat Defense: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION & LIVE PIPELINE VISUALIZER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Reassuring Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#5345ED]/15 border border-[#5345ED]/30 text-[#05ffb0] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#05ffb0]" />
            <span>Digital Safety & Shielding Wealth</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Protecting Hard-Earned Family Savings from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05ffb0] via-teal-300 to-indigo-400">Cyber Traps</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-xl">
            Maverick AI continuously intercepts fake bank calls, SMS phishing links, WhatsApp job scams, and fraudulent UPI collect requests in real-time — before your money is compromised.
          </p>

          {/* Call-to-action button */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onInitiateScanClick}
              className="bg-[#05ffb0] hover:bg-[#03e59d] text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-2xl transition-all shadow-lg shadow-[#05ffb0]/20 flex items-center gap-2.5 cursor-pointer group"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>Initiate Instant Message Scanner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Pipeline Smartphone Simulator */}
        <div className="lg:col-span-5 relative">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#05ffb0]" />
                <span className="text-xs font-bold text-slate-200">Live Incoming Message Stream</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                PARSED BY MAVERICK AI
              </span>
            </div>

            {/* Dynamic Animated Message Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMsg.id}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {activeMsg.channel}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">{activeMsg.sender}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${activeMsg.badgeColor}`}>
                    {activeMsg.status === 'BLOCKED' ? '🚨 BLOCKED' : activeMsg.status === 'WARNING' ? '⚠️ WARNING' : '🟢 SAFE'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  "{activeMsg.text}"
                </p>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-1 border-t border-slate-900">
                  <span>Reason: <strong className="text-slate-200">{activeMsg.reason}</strong></span>
                  <span className="font-mono text-emerald-400 font-bold">Risk: {activeMsg.riskScore}%</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Selector Indicator Dots */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {SAMPLE_LIVE_MESSAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMessageIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeMessageIndex === idx ? 'w-6 bg-[#05ffb0]' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE "AMAZON-STYLE" 4-COLUMN SERVICES GRID */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#05ffb0]" />
            <span>Maverick AI Security Capabilities</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">4-Vector Protection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Service Card 1 */}
          <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#05ffb0] transition-colors">
              SMS & WhatsApp Shielding
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              NLP contextual scanning that neutralizes shortened links (`bit.ly`) and fake electricity cutoff alerts.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#05ffb0] transition-colors">
              Call Transcript Safety
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Vishing call transcript analyzer detecting fake bank officers and CBI digital arrest threats.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#05ffb0] transition-colors">
              Fake UPI Request Mitigation
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              NPCI VPA fraud verification blocking malicious collect-request links before PIN input.
            </p>
          </div>

          {/* Service Card 4 */}
          <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5 text-[#05ffb0]" />
            </div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#05ffb0] transition-colors">
              Privacy-First Guard
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              100% confidential, secure local processing ensuring private banking data never leaves your device.
            </p>
          </div>
        </div>
      </div>

      {/* 4. FINANCIAL INTEGRATION & TRUST METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#05ffb0] flex items-center justify-center font-black text-lg">
            99.4%
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Detection Accuracy</h4>
            <p className="text-[10px] text-slate-400 font-medium">Verified by NPCI & Cyber Datasets</p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-xs font-mono">
            &lt;40ms
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Processing Latency</h4>
            <p className="text-[10px] text-slate-400 font-medium">Ultra-low latency real-time alerts</p>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#05ffb0] flex items-center justify-center font-black text-sm">
            ₹14.8Cr+
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Savings Protected</h4>
            <p className="text-[10px] text-slate-400 font-medium">Hard-earned Indian community wealth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
