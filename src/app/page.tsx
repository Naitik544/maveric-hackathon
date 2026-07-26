'use client';

import React, { useState } from 'react';
import Sidebar, { NavTab } from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import DashboardAnalytics from '@/components/dashboard/DashboardAnalytics';
import SMSCheckerCard from '@/components/dashboard/SMSCheckerCard';
import WhatsAppCheckerCard from '@/components/dashboard/WhatsAppCheckerCard';
import CallAnalyzerCard from '@/components/dashboard/CallAnalyzerCard';
import OverallResultCard from '@/components/dashboard/OverallResultCard';
import StaySafeTips from '@/components/dashboard/StaySafeTips';
import RecentHistory from '@/components/dashboard/RecentHistory';

import SMSCheckerTab from '@/components/views/SMSCheckerTab';
import WhatsAppCheckerTab from '@/components/views/WhatsAppCheckerTab';
import CallAnalyzerTab from '@/components/views/CallAnalyzerTab';
import SafetyTipsTab from '@/components/views/SafetyTipsTab';
import ReportScamTab from '@/components/views/ReportScamTab';
import HistoryTab from '@/components/views/HistoryTab';
import SettingsTab from '@/components/views/SettingsTab';
import { ScamAnalysis } from '@/data/mockData';
import { ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Active scam score state for Overall Result Card
  const [overallResult, setOverallResult] = useState<ScamAnalysis>({
    riskScore: 93,
    riskLevel: 'High Risk',
    reasons: ['Suspicious URL & OTP request', 'Pretending to be bank official'],
    recommendedActions: ['Do not click link', 'Do not share OTP'],
    summary: 'The message/call you provided shows strong signs of fraud. Do not share any OTP, PIN or personal information.'
  });

  const handleSubAnalysis = (newAnalysis: ScamAnalysis) => {
    setOverallResult(newAnalysis);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FC] text-slate-900 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNav
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-[1600px] mx-auto">
              {/* 1. Welcome Section */}
              <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/30 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 bg-indigo-100/80 border border-indigo-200 text-[#5345ED] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Powered Financial Safety Assistant</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    Hello User! <span className="inline-block animate-bounce">👋</span>
                  </h1>

                  <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    Protect yourself and your family from digital banking fraud across India. Paste any suspicious SMS, WhatsApp message, or upload call recordings below for instant AI scam analysis.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-2xs">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Instant AI Detection</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>99.4% Fraud Precision</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-2xs">
                      <Lock className="w-3.5 h-3.5 text-[#5345ED]" />
                      <span>UPI & Banking Protection</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Graphic */}
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#5345ED] to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
                    <ShieldCheck className="w-12 h-12 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Real-time Dashboard Analytics Cards & Threat Distribution */}
              <DashboardAnalytics />

              {/* 2. Three Analyzer Cards + Overall Result Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                {/* Card 1: SMS Checker */}
                <SMSCheckerCard onAnalyze={handleSubAnalysis} />

                {/* Card 2: WhatsApp Checker */}
                <WhatsAppCheckerCard onAnalyze={handleSubAnalysis} />

                {/* Card 3: Call Analyzer */}
                <CallAnalyzerCard onAnalyze={handleSubAnalysis} />

                {/* Card 4: Overall Result Diagnosis Card */}
                <OverallResultCard
                  riskScore={overallResult.riskScore}
                  riskLevel={overallResult.riskLevel}
                  summary={overallResult.summary}
                  onReportClick={() => setActiveTab('report-scam')}
                  onViewReportClick={() => setActiveTab('history')}
                />
              </div>

              {/* Lower Section: Stay Safe Tips & Recent History */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5">
                  <StaySafeTips />
                </div>
                <div className="lg:col-span-7">
                  <RecentHistory onViewAllClick={() => setActiveTab('history')} />
                </div>
              </div>

              {/* Footer */}
              <footer className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-400 gap-4 pb-4">
                <p>© 2026 SafeBank AI. All rights reserved.</p>
                <p className="flex items-center gap-1.5">
                  Made with <span className="text-red-500">❤️</span> for a safer India
                </p>
              </footer>
            </div>
          )}

          {activeTab === 'sms-checker' && <SMSCheckerTab />}
          {activeTab === 'whatsapp-checker' && <WhatsAppCheckerTab />}
          {activeTab === 'call-analyzer' && <CallAnalyzerTab />}
          {activeTab === 'safety-tips' && <SafetyTipsTab />}
          {activeTab === 'report-scam' && <ReportScamTab />}
          {activeTab === 'history' && <HistoryTab />}
          {activeTab === 'settings' && (
            <SettingsTab
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
