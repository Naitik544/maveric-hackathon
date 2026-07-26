'use client';

import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, Lock, Smartphone, Save, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/data/mockData';

interface SettingsTabProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export default function SettingsTab({ selectedLanguage, setSelectedLanguage }: SettingsTabProps) {
  const [autoScanSMS, setAutoScanSMS] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#5345ED]" />
          App Settings & Security
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Configure language preferences, real-time fraud alerts, and emergency contact details.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Language Preference */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Primary Language</h3>
              <p className="text-xs text-slate-500 font-medium">Select your preferred Indian regional language</p>
            </div>
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Real-time Alerts */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Real-time Scam Alerts</h3>
              <p className="text-xs text-slate-500 font-medium">Instant push notifications for high-risk detected scams</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer">
              <span className="text-xs font-bold text-slate-800">Push Notifications for Fraud Alerts</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#5345ED] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer">
              <span className="text-xs font-bold text-slate-800">Automated SMS Keyword Scanning</span>
              <input
                type="checkbox"
                checked={autoScanSMS}
                onChange={(e) => setAutoScanSMS(e.target.checked)}
                className="w-4 h-4 accent-[#5345ED] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Emergency Family Contact</h3>
              <p className="text-xs text-slate-500 font-medium">Contact to notify in case a high-risk financial scam is detected</p>
            </div>
          </div>

          <input
            type="text"
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
}
