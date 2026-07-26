'use client';

import React, { useState } from 'react';
import Sidebar, { NavTab } from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
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
              {/* Main Grid: 3 Checker Cards + Overall Result Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                {/* 1. SMS Checker Card */}
                <SMSCheckerCard onAnalyze={handleSubAnalysis} />

                {/* 2. WhatsApp Checker Card */}
                <WhatsAppCheckerCard onAnalyze={handleSubAnalysis} />

                {/* 3. Call Analyzer Card */}
                <CallAnalyzerCard onAnalyze={handleSubAnalysis} />

                {/* 4. Overall Result Card (High Priority Right Panel) */}
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
