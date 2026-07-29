'use client';

import React from 'react';
import { Globe, ShieldCheck, ChevronDown, User, Menu, HelpCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/data/mockData';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { getTranslation } from '@/lib/translations';

interface TopNavProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onMobileMenuToggle?: () => void;
  onOpenTutorial?: () => void;
}

export default function TopNav({
  selectedLanguage,
  setSelectedLanguage,
  onMobileMenuToggle,
  onOpenTutorial
}: TopNavProps) {
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const { isSignedIn } = useUser();
  const t = getTranslation(selectedLanguage);

  return (
    <header className="w-full glass-nav sticky top-0 z-20 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* User Greeting & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {t.topNav.greeting} <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 hidden sm:block">
            {t.topNav.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Tutorial Button */}
        {onOpenTutorial && (
          <button
            onClick={onOpenTutorial}
            className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            title="How to Use Website Tutorial"
          >
            <HelpCircle className="w-4 h-4 text-[#5345ED]" />
            <span className="hidden md:inline">Quick Tutorial (કેવી રીતે વાપરવું)</span>
          </button>
        )}

        {/* Top Language Selector */}
        <div className="relative">
          <button 
            type="button"
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{currentLangObj.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Quick Language Picker Dropdown */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label="Select Language"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI Powered Badge */}
        <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 rounded-2xl px-4 py-2 text-xs font-bold shadow-xs">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[11px] font-extrabold tracking-wide uppercase text-emerald-700">
              {t.topNav.aiBadgeTitle}
            </div>
            <div className="text-[10px] font-medium text-emerald-600 space-x-1">
              <span>{t.topNav.aiBadgeSub}</span>
            </div>
          </div>
        </div>

        {/* Clerk Auth Integration */}
        <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-xl shadow-xs"
                }
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                <User className="w-3.5 h-3.5" />
                <span>{t.topNav.signIn}</span>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
