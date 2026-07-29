'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Lock, Activity } from 'lucide-react';

export default function PreloaderScreen() {
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState('Initializing SafeBank AI Shield...');

  useEffect(() => {
    const t1 = setTimeout(() => setStatusText('Loading Threat Intelligence Engine...'), 500);
    const t2 = setTimeout(() => setStatusText('Connecting NPCI & Cyber Helpline 1930...'), 1000);
    const t3 = setTimeout(() => setLoading(false), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[999999] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        >
          {/* Ambient Glowing Orbs */}
          <div className="absolute w-[500px] h-[500px] bg-[#5345ED]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Central Animated Radar Shield Logo */}
          <div className="relative mb-8">
            {/* Outer Rotating Pulsing Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-indigo-500/40 flex items-center justify-center"
            />

            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 w-32 h-32 rounded-full bg-indigo-500/20 blur-md"
            />

            {/* Inner Shield Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#5345ED] to-indigo-600 border border-white/30 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                <ShieldCheck className="w-10 h-10 text-white stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Brand Name & Tagline */}
          <div className="text-center space-y-2 relative z-10 px-4">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>SafeBank AI</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
                Rural Trust Guard
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-wider">
              FINANCIAL SECURITY & GUJARAT CYBER SHIELD
            </p>
          </div>

          {/* Progress Bar & Status Text */}
          <div className="mt-8 w-64 space-y-3 relative z-10">
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#5345ED] via-indigo-500 to-emerald-400 rounded-full"
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-indigo-300">
              <Activity className="w-3.5 h-3.5 animate-spin text-[#5345ED]" />
              <span>{statusText}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
