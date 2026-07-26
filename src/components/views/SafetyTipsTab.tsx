'use client';

import React from 'react';
import {
  ShieldCheck,
  PhoneCall,
  Lock,
  Link2Off,
  Building2,
  AlertTriangle,
  Smartphone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function SafetyTipsTab() {
  const TIPS_GRID = [
    {
      icon: Lock,
      title: 'UPI PIN Safety',
      desc: 'UPI PIN is ONLY required for SENDING/TRANSFERRING money. You never need to enter your UPI PIN to RECEIVE money into your account.'
    },
    {
      icon: Link2Off,
      title: 'Shortened Links (.bit.ly)',
      desc: 'Never open links sent by unknown numbers claiming your electricity bill is unpaid or SIM card will be deactivated.'
    },
    {
      icon: Smartphone,
      title: 'Screen Sharing Apps',
      desc: 'Never download AnyDesk, TeamViewer, or RustDesk on request of unknown callers. They can view your banking passwords and OTPs.'
    },
    {
      icon: Building2,
      title: 'Official Bank Numbers',
      desc: 'Never trust phone numbers found in Google Search results for customer care. Always check the official website or back of your debit card.'
    },
    {
      icon: PhoneCall,
      title: 'Digital Arrest Scams',
      desc: 'No police officer, CBI, or Customs official will ever video call you demanding money or threat of digital arrest. Immediately report to 1930.'
    },
    {
      icon: AlertTriangle,
      title: 'National Helpline (1930)',
      desc: 'If you fall victim to financial fraud, call 1930 within the "Golden Hour" (first 1-2 hours) to freeze stolen money before cashout.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#5345ED]" />
          Digital Banking Safety Rules
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Master essential safety habits to protect your bank account, UPI, credit cards, and personal identity.
        </p>
      </div>

      {/* Emergency Contact Bar */}
      <div className="bg-gradient-to-r from-[#5345ED] to-indigo-700 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-indigo-500/20">
        <div className="space-y-1">
          <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
            Government Helpline
          </span>
          <h3 className="text-lg font-bold">National Cyber Crime Reporting Portal</h3>
          <p className="text-xs text-indigo-100 font-medium">
            Toll-Free Helpline: <strong className="text-white text-sm">1930</strong> | Official Website: <strong className="text-white">cybercrime.gov.in</strong>
          </p>
        </div>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#5345ED] hover:bg-slate-100 text-xs font-bold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 w-fit shrink-0"
        >
          <span>Visit cybercrime.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TIPS_GRID.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 group-hover:bg-[#5345ED] group-hover:text-white text-[#5345ED] flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{tip.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
