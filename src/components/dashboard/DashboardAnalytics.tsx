'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  PhoneCall,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function DashboardAnalytics() {
  const STAT_CARDS = [
    {
      id: 'stat-1',
      title: 'Total Scans Conducted',
      value: '1,284',
      change: '+14% this week',
      changeType: 'positive',
      icon: Activity,
      iconBg: 'bg-indigo-50 text-[#5345ED]'
    },
    {
      id: 'stat-2',
      title: 'Scams Blocked',
      value: '842 Scams',
      change: '65.6% Threat Rate',
      changeType: 'danger',
      icon: ShieldAlert,
      iconBg: 'bg-red-50 text-red-600'
    },
    {
      id: 'stat-3',
      title: 'Average Risk Index',
      value: '78.4%',
      change: 'High Severity Avg',
      changeType: 'warning',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'stat-4',
      title: 'Reports Sent to 1930',
      value: '156 Filed',
      change: '100% Verification Rate',
      changeType: 'success',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600'
    }
  ];

  const CATEGORY_DISTRIBUTION = [
    { name: 'Bank KYC Phishing', percentage: 42, color: 'bg-red-500', count: '539 Scans' },
    { name: 'Voice Vishing Calls', percentage: 28, color: 'bg-[#5345ED]', count: '360 Scans' },
    { name: 'WhatsApp Lottery Fraud', percentage: 18, color: 'bg-emerald-500', count: '231 Scans' },
    { name: 'Electricity Bill Scams', percentage: 12, color: 'bg-amber-500', count: '154 Scans' },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              <div className="pt-3 space-y-1">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Threat Distribution Analytics Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#5345ED]" />
            <h3 className="text-sm font-bold text-slate-900">National Fraud Vectors Analytics</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Real-time Indian Cyber Cell Telemetry</span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex shadow-2xs">
          {CATEGORY_DISTRIBUTION.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.color} h-full transition-all duration-700`}
              style={{ width: `${cat.percentage}%` }}
              title={`${cat.name}: ${cat.percentage}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {CATEGORY_DISTRIBUTION.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <div className={`w-3 h-3 rounded-full ${cat.color} shrink-0`} />
              <div className="truncate">
                <span className="block truncate font-bold text-slate-900">{cat.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{cat.percentage}% ({cat.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
