'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Globe,
  Sun,
  Bell,
  Lock,
  Info,
  Mail,
  CheckCircle2,
  Save,
  Shield,
  Smartphone,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/data/mockData';

interface SettingsTabProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export default function SettingsTab({ selectedLanguage, setSelectedLanguage }: SettingsTabProps) {
  // 1. Profile State
  const [userName, setUserName] = useState('Rahul Sharma');
  const [userEmail, setUserEmail] = useState('rahul.sharma@example.com');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userCity, setUserCity] = useState('Mumbai, Maharashtra');

  // 4. Notification Preferences State
  const [pushAlerts, setPushAlerts] = useState(true);
  const [smsAutoScan, setSmsAutoScan] = useState(true);
  const [emailSummaries, setEmailSummaries] = useState(false);

  // 5. Privacy State
  const [anonymizeData, setAnonymizeData] = useState(true);
  const [aiTelemetry, setAiTelemetry] = useState(true);
  const [retentionDays, setRetentionDays] = useState('30');

  // Toast / Save State
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const handleSaveAll = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCheckUpdate = () => {
    setIsCheckingUpdate(true);
    setUpdateMessage(null);
    setTimeout(() => {
      setIsCheckingUpdate(false);
      setUpdateMessage('SafeBank AI is up to date (v1.2.0-production)');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Preferences & Security Controls</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your user profile, regional language, notification triggers, privacy consent, and system information.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold px-5 py-3 rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 w-fit cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Save Success Banner */}
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-xs"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Your settings preferences have been saved successfully!</span>
        </motion.div>
      )}

      {/* 1. Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">1. User Profile</h3>
            <p className="text-xs text-slate-500">Personal details for emergency fraud alert notifications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency Mobile Number</label>
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">City / Location</label>
            <input
              type="text"
              value={userCity}
              onChange={(e) => setUserCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
            />
          </div>
        </div>
      </div>

      {/* 2. Language & 3. Theme Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Language */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Regional Language</h3>
              <p className="text-xs text-slate-500">AI analysis & advice in your language</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Select Primary Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED] cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Theme (Disabled) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Application Theme</h3>
                <p className="text-xs text-slate-500">Light Mode (Enforced Default)</p>
              </div>
            </div>

            <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
              Disabled
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 space-y-1.5 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Light Theme (Default)</span>
              <div className="w-10 h-6 bg-slate-300 rounded-full p-1 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Dark mode is currently disabled to maintain strict high-contrast readability standards for senior citizens and financial compliance.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Notification Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">4. Notification Preferences</h3>
            <p className="text-xs text-slate-500">Configure real-time push alerts and automatic fraud scans</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">Real-time Push Fraud Alerts</span>
              <span className="text-[11px] text-slate-500 font-medium">Instant alerts when a high-risk SMS or call transcript is detected</span>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#5345ED] cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">Automated SMS Phishing Keyword Scan</span>
              <span className="text-[11px] text-slate-500 font-medium">Auto-crosscheck incoming bank SMS messages against phishing databases</span>
            </div>
            <input
              type="checkbox"
              checked={smsAutoScan}
              onChange={(e) => setSmsAutoScan(e.target.checked)}
              className="w-4 h-4 accent-[#5345ED] cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">Weekly Safety Email Summaries</span>
              <span className="text-[11px] text-slate-500 font-medium">Receive weekly breakdown of digital banking safety tips & threats</span>
            </div>
            <input
              type="checkbox"
              checked={emailSummaries}
              onChange={(e) => setEmailSummaries(e.target.checked)}
              className="w-4 h-4 accent-[#5345ED] cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 5. Privacy Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">5. Data Privacy & AI Controls</h3>
            <p className="text-xs text-slate-500">Your financial data privacy and local storage settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">Anonymize Phone Numbers in Scans</span>
              <span className="text-[11px] text-slate-500 font-medium">Mask personal phone numbers before AI processing</span>
            </div>
            <input
              type="checkbox"
              checked={anonymizeData}
              onChange={(e) => setAnonymizeData(e.target.checked)}
              className="w-4 h-4 accent-[#5345ED] cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 block">AI Threat Telemetry Sharing</span>
              <span className="text-[11px] text-slate-500 font-medium">Help train SafeBank AI by sharing anonymous scam patterns</span>
            </div>
            <input
              type="checkbox"
              checked={aiTelemetry}
              onChange={(e) => setAiTelemetry(e.target.checked)}
              className="w-4 h-4 accent-[#5345ED] cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 6. About, 7. Contact, 8. Version */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 6. About */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Info className="w-4 h-4 text-[#5345ED]" />
            <span>6. About SafeBank AI</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            SafeBank AI is an AI-powered Financial Safety Assistant designed specifically for Indian digital banking users to prevent SMS phishing, WhatsApp lottery fraud, and Vishing calls.
          </p>
        </div>

        {/* 7. Contact */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
            <Mail className="w-4 h-4 text-[#5345ED]" />
            <span>7. Contact & Support</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
            <p>Support Email: <strong className="text-[#5345ED]">support@safebank.ai</strong></p>
            <p>National Helpline: <strong className="text-emerald-700">1930 Cyber Crime</strong></p>
            <p>Portal: <strong className="text-slate-900">cybercrime.gov.in</strong></p>
          </div>
        </div>

        {/* 8. Version */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#5345ED]" />
                <span>8. System Version</span>
              </div>
              <span className="text-[10px] font-extrabold bg-indigo-50 text-[#5345ED] px-2 py-0.5 rounded-full">
                v1.2.0
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Build: 2026.07.26-production
            </p>
          </div>

          <div className="space-y-2">
            {updateMessage && (
              <span className="text-[10px] font-bold text-emerald-700 block">
                {updateMessage}
              </span>
            )}
            <button
              onClick={handleCheckUpdate}
              disabled={isCheckingUpdate}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
              <span>{isCheckingUpdate ? 'Checking...' : 'Check for Updates'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
