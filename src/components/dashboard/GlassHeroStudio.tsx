'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Sparkles, PhoneCall, ArrowRight, ShieldAlert, CheckCircle2, QrCode } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

interface GlassHeroStudioProps {
  selectedLanguage?: string;
  onQuickTabSelect?: (tabName: string) => void;
}

export default function GlassHeroStudio({
  selectedLanguage = 'en',
  onQuickTabSelect
}: GlassHeroStudioProps) {
  const t = getTranslation(selectedLanguage);

  return (
    <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 md:p-10 space-y-8 relative overflow-hidden">
      {/* Decorative Glowing Gradient Spots */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5345ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Hero Text & Reassuring Badges */}
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-[#5345ED] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SafeBank AI • Gujarat & India Safety Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Protecting Your Family & Financial Savings from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5345ED] via-indigo-600 to-purple-600">Digital Banking Scams</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
            {t.dashboard.welcomeDesc}
          </p>

          {/* Key Security Pillars */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant AI Detection (300ms)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>99.4% Fraud Precision</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
              <Lock className="w-4 h-4 text-[#5345ED]" />
              <span>100% On-Device Privacy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Helpline 1930 & Quick Assist Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl shadow-red-600/20 space-y-4 relative overflow-hidden">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2.5 py-0.5 rounded-full tracking-wider">
                  24/7 Helpline
                </span>
                <ShieldAlert className="w-5 h-5 text-red-200" />
              </div>
              <h3 className="text-lg font-black tracking-tight">National Cyber Helpline 1930</h3>
              <p className="text-xs text-red-100 font-medium leading-normal">
                Facing financial fraud right now? Call 1930 immediately to freeze fraudulent money transfers!
              </p>
            </div>

            <a
              href="tel:1930"
              className="w-full bg-white text-red-700 hover:bg-red-50 font-black text-xs py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 fill-red-700" />
              <span>Dial 1930 (Toll-Free)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
