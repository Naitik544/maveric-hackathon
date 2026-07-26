'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: any;
}

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
  icon: Icon = Inbox
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center mx-auto shadow-2xs">
        <Icon className="w-7 h-7 stroke-[2]" />
      </div>

      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center gap-1.5 mx-auto cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </motion.div>
  );
}
