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
  Globe,
  HeartHandshake
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
}: SidebarProps) {
  return (
    <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 left-0 p-5 overflow-y-auto select-none shadow-sm z-30">
      <div className="space-y-6">
        {/* Logo Section */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group px-2 py-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5345ED] to-[#7367f0] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Shield className="w-6 h-6 fill-white/20 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-xl text-slate-900 tracking-tight">SafeBank AI</h1>
            </div>
            <p className="text-[11px] font-medium text-slate-500 tracking-wide">
              AI Financial Safety Assistant
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 pt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
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
        {/* Language selector in sidebar */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 px-1 uppercase tracking-wider">
            Language
          </label>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 pr-8 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED] focus:border-transparent transition-all cursor-pointer"
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

        {/* Illustration Card: Senior awareness */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100/60 rounded-2xl p-4 text-center relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="relative z-10 space-y-2.5">
            {/* Senior couple SVG illustration container */}
            <div className="w-full h-24 bg-white/80 backdrop-blur-xs rounded-xl flex items-center justify-center p-2 shadow-xs border border-indigo-50/50">
              <svg viewBox="0 0 160 100" className="w-full h-full max-h-20 drop-shadow-xs">
                {/* Background soft glow */}
                <circle cx="80" cy="50" r="40" fill="#EEEDFE" opacity="0.6" />
                {/* Man figure */}
                <circle cx="55" cy="35" r="14" fill="#FDBA74" />
                <path d="M45,35 Q55,22 65,35" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                <path d="M38,68 C38,50 48,45 55,45 C62,45 72,50 72,68 Z" fill="#475569" />
                {/* Woman figure */}
                <circle cx="105" cy="35" r="14" fill="#FED7AA" />
                <path d="M92,30 Q105,18 118,30 Q120,40 105,45 Z" fill="#94A3B8" />
                <path d="M88,68 C88,50 98,45 105,45 C112,45 122,50 122,68 Z" fill="#5345ED" />
                {/* Smartphone held together */}
                <rect x="73" y="42" width="14" height="24" rx="3" fill="#1E293B" />
                <rect x="75" y="44" width="10" height="18" rx="1" fill="#38BDF8" />
                <path d="M80,50 L80,56 M77,53 L83,53" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                {/* Small heart/shield badge */}
                <circle cx="80" cy="22" r="8" fill="#22C55E" />
                <path d="M76,22 L79,25 L84,19" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 tracking-tight">
                Be Safe. Be Aware.
              </h4>
              <p className="text-[11px] font-semibold text-[#5345ED] leading-tight">
                Stay informed, <br />
                Stay protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
