'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { NavTab } from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import DashboardAnalytics from '@/components/dashboard/DashboardAnalytics';
import SMSCheckerCard from '@/components/dashboard/SMSCheckerCard';
import WhatsAppCheckerCard from '@/components/dashboard/WhatsAppCheckerCard';
import CallAnalyzerCard from '@/components/dashboard/CallAnalyzerCard';
import OverallResultCard from '@/components/dashboard/OverallResultCard';
import UPIVerifierCard from '@/components/dashboard/UPIVerifierCard';
import GlassHeroStudio from '@/components/dashboard/GlassHeroStudio';
import CyberSafetyQuiz from '@/components/dashboard/CyberSafetyQuiz';
import StaySafeTips from '@/components/dashboard/StaySafeTips';
import RecentHistory from '@/components/dashboard/RecentHistory';

import SMSCheckerTab from '@/components/views/SMSCheckerTab';
import WhatsAppCheckerTab from '@/components/views/WhatsAppCheckerTab';
import CallAnalyzerTab from '@/components/views/CallAnalyzerTab';
import SafetyTipsTab from '@/components/views/SafetyTipsTab';
import ReportScamTab from '@/components/views/ReportScamTab';
import HistoryTab from '@/components/views/HistoryTab';
import SettingsTab from '@/components/views/SettingsTab';
import AdminPanelTab from '@/components/views/AdminPanelTab';
import FeedbackTab from '@/components/views/FeedbackTab';
import PreloaderScreen from '@/components/ui/PreloaderScreen';
import OnboardingTutorialModal from '@/components/dashboard/OnboardingTutorialModal';
import { ScamAnalysis } from '@/data/mockData';
import { ShieldCheck, Zap, Lock, Sparkles, Activity, Flag } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const t = getTranslation(selectedLanguage);

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
    <div className="flex min-h-screen bg-[#F6F8FC] text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* High-Tech Animated Radar Preloader Screen */}
      <PreloaderScreen />

      {/* Interactive Step-by-Step Onboarding Tutorial Guided Tour Modal */}
      <OnboardingTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNav
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onMobileMenuToggle={() => setIsMobileOpen(true)}
          onOpenTutorial={() => setIsTutorialOpen(true)}
        />

        {/* Dynamic View Body with Framer Motion Page Transitions */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-8 max-w-[1600px] mx-auto">
                  {/* 1. ULTRA-PREMIUM GLASS HERO STUDIO BANNER */}
                  <GlassHeroStudio
                    selectedLanguage={selectedLanguage}
                  />

                  {/* 2. Sequential AI Scam Checkers Grid (3 Clean Columns) */}
                  <div id="ai-studio-section" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                          <Activity className="w-5 h-5 text-[#5345ED]" />
                          <span>{t.dashboard.studioTitle}</span>
                        </h2>
                        <p className="text-xs text-slate-500 font-medium">
                          {t.dashboard.studioDesc}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                      {/* Step 1: SMS Checker */}
                      <SMSCheckerCard
                        onAnalyze={handleSubAnalysis}
                        selectedLanguage={selectedLanguage}
                        onCardHeaderClick={() => setActiveTab('sms-checker')}
                      />

                      {/* Step 2: WhatsApp Checker */}
                      <WhatsAppCheckerCard
                        onAnalyze={handleSubAnalysis}
                        selectedLanguage={selectedLanguage}
                        onCardHeaderClick={() => setActiveTab('whatsapp-checker')}
                      />

                      {/* Step 3: Call Analyzer */}
                      <CallAnalyzerCard
                        onAnalyze={handleSubAnalysis}
                        selectedLanguage={selectedLanguage}
                        onCardHeaderClick={() => setActiveTab('call-analyzer')}
                      />
                    </div>
                  </div>

                  {/* 3. Live Overall AI Result Panel & Instant UPI Shield */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7">
                      <OverallResultCard
                        analysis={overallResult}
                        riskScore={overallResult.riskScore}
                        riskLevel={overallResult.riskLevel}
                        summary={overallResult.summary}
                        selectedLanguage={selectedLanguage}
                        onReportClick={() => setActiveTab('report-scam')}
                        onViewReportClick={() => setActiveTab('history')}
                      />
                    </div>
                    <div className="lg:col-span-5">
                      <UPIVerifierCard selectedLanguage={selectedLanguage} />
                    </div>
                  </div>

                  {/* 4. Sleek Quick Navigation Feature Cards (Replaces Long Scroll) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div
                      onClick={() => setActiveTab('safety-tips')}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-2 hover:border-[#5345ED] transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase bg-indigo-50 text-[#5345ED] px-2.5 py-0.5 rounded-full">
                          Safety & Quiz
                        </span>
                        <ShieldCheck className="w-5 h-5 text-[#5345ED] group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#5345ED] transition-colors">
                        60-Sec Cyber Quiz & Safety Tips →
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Earn your Guardian Badge & learn banking fraud prevention rules.
                      </p>
                    </div>

                    <div
                      onClick={() => setActiveTab('history')}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-2 hover:border-emerald-500 transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full">
                          Analytics
                        </span>
                        <Activity className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Threat Analytics & Scan History →
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        View real-time threat distribution across India & previous scans.
                      </p>
                    </div>

                    <div
                      onClick={() => setActiveTab('report-scam')}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-2 hover:border-red-500 transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full">
                          Helpline 1930
                        </span>
                        <Flag className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        Report Cyber Scam to Police →
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Submit incident report & connect with 1930 Cyber Crime Cell.
                      </p>
                    </div>
                  </div>

                  {/* Compact Footer */}
                  <footer className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-400 gap-4 pb-4">
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
              {activeTab === 'feedback' && <FeedbackTab />}
              {activeTab === 'admin' && <AdminPanelTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
