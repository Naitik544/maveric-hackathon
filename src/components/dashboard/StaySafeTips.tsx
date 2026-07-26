'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Link2Off,
  Building2,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';
import { STAY_SAFE_TIPS } from '@/data/mockData';

const TIP_ICONS = [CheckCircle2, Link2Off, Building2, PhoneCall, AlertTriangle];

export default function StaySafeTips() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Stay Safe Tips</h3>
      </div>

      <div className="space-y-3">
        {STAY_SAFE_TIPS.map((tip, idx) => {
          const IconComponent = TIP_ICONS[idx % TIP_ICONS.length];
          return (
            <div key={tip.id} className="flex items-start gap-3 text-xs text-slate-700 font-semibold group">
              <div className="w-5 h-5 rounded-lg bg-indigo-50 group-hover:bg-[#5345ED] group-hover:text-white text-[#5345ED] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug">{tip.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
