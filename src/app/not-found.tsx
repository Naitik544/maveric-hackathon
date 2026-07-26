'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex items-center justify-center p-6 text-slate-900 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center space-y-6 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="w-48 h-48 rounded-full bg-indigo-100/60 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-[#5345ED] flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-[#5345ED] tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              404 Page Not Found
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight pt-2">
              Page Lost in Cyber Space
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
              The banking safety page or resource you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to SafeBank AI</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
