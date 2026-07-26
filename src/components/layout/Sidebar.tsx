'use client';

import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  MessageCircle,
  Phone,
  ShieldCheck,
  Flag,
  History,
  Settings,
  Shield,
  ChevronDown,
  X
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/data/mockData';

export type NavTab = 
  | 'dashboard'
  | 'sms-checker'
  | 'whatsapp-checker'
  | 'call-analyzer'
  | 'safety-tips'
  | 'report-scam'
  | 'history'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const NAV_ITEMS = [
  { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sms-checker' as NavTab, label: 'SMS Checker', icon: MessageSquare },
  { id: 'whatsapp-checker' as NavTab, label: 'WhatsApp Checker', icon: MessageCircle },
  { id: 'call-analyzer' as NavTab, label: 'Call Analyzer', icon: Phone },
  { id: 'safety-tips' as NavTab, label: 'Safety Tips', icon: ShieldCheck },
  { id: 'report-scam' as NavTab, label: 'Report Scam', icon: Flag },
  { id: 'history' as NavTab, label: 'History', icon: History },
  { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  isMobileOpen = false,
  setIsMobileOpen
}: SidebarProps) {
  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-72 glass-sidebar flex flex-col justify-between h-screen sticky top-0 left-0 p-5 overflow-y-auto select-none z-50 transition-transform duration-300 ${
          isMobileOpen ? 'fixed translate-x-0' : 'hidden lg:flex'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Section */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleNavClick('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group px-2 py-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5345ED] to-[#7367f0] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-6 h-6 fill-white/20 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-900 tracking-tight">SafeBank AI</h1>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  AI Financial Safety Assistant
                </p>
              </div>
            </div>

            {/* Close button for mobile */}
            {setIsMobileOpen && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 pt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#5345ED] text-white shadow-lg shadow-indigo-500/25 translate-x-0.5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100 mt-6">
          {/* Language selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 px-1 uppercase tracking-wider">
              Language
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 pr-8 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Senior Awareness Illustration Card */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100/60 rounded-2xl p-4 text-center relative overflow-hidden group hover:border-indigo-200 transition-colors">
            <div className="relative z-10 space-y-2">
              <div className="w-full h-20 bg-white/80 backdrop-blur-xs rounded-xl flex items-center justify-center p-2 border border-indigo-50/50">
                <ShieldCheck className="w-10 h-10 text-[#5345ED]" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight">
                  Be Safe. Be Aware.
                </h4>
                <p className="text-[11px] font-semibold text-[#5345ED]">
                  Stay informed, Stay protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
