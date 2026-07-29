'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  PhoneCall,
  Lock,
  QrCode,
  Award,
  Building2,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  CreditCard,
  Zap,
  AlertOctagon,
  ShieldAlert,
  FileText
} from 'lucide-react';
import CyberSafetyQuiz from '@/components/dashboard/CyberSafetyQuiz';

interface AccordionItem {
  id: string;
  icon: any;
  title: string;
  badge: string;
  badgeColor: string;
  summary: string;
  details: string[];
  goldenRule?: string;
}

export default function SafetyTipsTab() {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('sec-upi');

  const ACCORDION_SECTIONS: AccordionItem[] = [
    {
      id: 'sec-frauds',
      icon: AlertOctagon,
      title: '1. Common Banking Frauds in India',
      badge: 'Overview',
      badgeColor: 'bg-indigo-100 text-[#5345ED]',
      summary: 'Understanding Phishing (fake links), Smishing (fake SMS), Vishing (fraud calls), and Malware (.apk files).',
      details: [
        'Phishing & Smishing: Fake SMS alerts claiming account suspension, electricity disconnection, or PAN card blocks containing malicious links.',
        'Vishing (Voice Fraud): Impersonation calls claiming to be bank officers, RBI inspectors, or police threatening digital arrest.',
        'Malware (.apk files): Malicious Android app packages sent via WhatsApp (e.g. SBI_Rewards.apk) that secretly steal SMS OTPs.'
      ]
    },
    {
      id: 'sec-upi',
      icon: Lock,
      title: '2. UPI Safety Guidelines',
      badge: 'Crucial Rule',
      badgeColor: 'bg-[#5345ED] text-white',
      summary: 'Golden Rule: Entering your UPI PIN ALWAYS DEDUCTS money from your account. You NEVER need a PIN to RECEIVE money.',
      goldenRule: 'NEVER enter your UPI PIN when someone claims they are sending or transferring money TO YOU.',
      details: [
        'Entering your 4-digit or 6-digit UPI PIN authorizes a DEBIT transaction from your account.',
        'Receiving money via Google Pay, PhonePe, or Paytm is 100% automatic and requires NO PIN or QR scanning.',
        'Never accept UPI "Collect Money" requests from unknown buyers on OLX, Facebook Marketplace, or Telegram.'
      ]
    },
    {
      id: 'sec-otp',
      icon: ShieldAlert,
      title: '3. OTP & Credentials Protection',
      badge: 'Strict Security',
      badgeColor: 'bg-red-100 text-red-700',
      summary: 'Never read out, forward, or share 6-digit OTPs, Debit Card CVVs, or Net Banking passwords.',
      details: [
        'Bank staff, customer care, and police officers NEVER ask for OTPs over phone calls or SMS.',
        'Treat your OTP like your ATM PIN — sharing it gives fraudsters instant access to authorize transfers.',
        'Never forward SMS messages containing verification codes to third-party mobile numbers.'
      ]
    },
    {
      id: 'sec-qr',
      icon: QrCode,
      title: '4. QR Code Payment Scams',
      badge: 'Scam Alert',
      badgeColor: 'bg-amber-100 text-amber-800',
      summary: 'Scammers send QR codes claiming "Scan this QR code to receive payment" — scanning QR codes ONLY pays out money.',
      details: [
        'Fraudulent buyers on OLX pose as Army Officers or CISF personnel sending QR codes for advance payment.',
        'Scanning a QR code in BHIM/GPay/PhonePe opens a PAYMENT screen, not a receipt screen.',
        'If anyone insists you scan a QR code to receive cash, it is 100% a fraud attempt.'
      ]
    },
    {
      id: 'sec-loan',
      icon: CreditCard,
      title: '5. Instant Loan App Scams',
      badge: 'Financial Trap',
      badgeColor: 'bg-[#5345ED] text-white',
      summary: 'Avoid illegal pre-approved loan apps that demand upfront processing fees or harvest phone contacts.',
      details: [
        'Illegal loan apps promise instant loans without documentation, then access contacts & photos for harassment.',
        'Genuine RBI-registered banks never ask for "Advance Processing Fee" or "GST Insurance Fee" before releasing a loan.',
        'Always check if the lender is registered on the RBI Sachet Portal (sachet.rbi.org.in).'
      ]
    },
    {
      id: 'sec-lottery',
      icon: Award,
      title: '6. Lottery & KBC Cash Prize Frauds',
      badge: 'Fake Promises',
      badgeColor: 'bg-purple-100 text-purple-800',
      summary: 'Fake WhatsApp audio messages alleging you won ₹25 Lakhs in KBC or international lotteries.',
      details: [
        'Fraudsters send doctored certificates featuring national emblems or TV logos to gain trust.',
        'They request "TDS tax" or "registration charges" via UPI before releasing the non-existent prize.',
        'Remember: You cannot win a lottery you never bought a ticket for!'
      ]
    },
    {
      id: 'sec-impersonation',
      icon: Building2,
      title: '7. Bank Officer Impersonation (Vishing)',
      badge: 'High Risk',
      badgeColor: 'bg-red-100 text-red-700',
      summary: 'Fake caller IDs threatening account closure unless biometric KYC or OTP is verified.',
      details: [
        'Fraud callers use caller-ID spoofing software so your phone displays "SBI Support" or "HDFC Care".',
        'They use panic lines: "Your card is blocked in 10 minutes", "Income tax lien marked", or "Court warrant issued".',
        'Hang up immediately and dial your bank toll-free number printed on the back of your physical card.'
      ]
    },
    {
      id: 'sec-[#1930]',
      icon: PhoneCall,
      title: '8. National Cyber Crime Helpline (1930)',
      badge: 'Government Line',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      summary: 'Immediate financial fraud reporting portal operated by the Ministry of Home Affairs (MHA).',
      details: [
        'Call 1930 within the "Golden Hour" (first 1 to 2 hours of fraud) to freeze funds in transit.',
        'Online Complaints: File detailed logs with transaction IDs on cybercrime.gov.in.',
        'Keep bank account number, UTR number, and screenshot proofs ready when filing.'
      ]
    },
    {
      id: 'sec-emergency',
      icon: Zap,
      title: '9. Emergency Action Steps (If Defrauded)',
      badge: 'Immediate Action',
      badgeColor: 'bg-rose-600 text-white',
      summary: 'Step-by-step checklist to contain damages and maximize money recovery chances.',
      details: [
        'Step 1: Immediately call 1930 to report the transaction ID and block target wallet accounts.',
        'Step 2: Lock your Debit Card / Net Banking via Mobile Banking App or SMS blocking service.',
        'Step 3: Register a complaint on cybercrime.gov.in and obtain an acknowledgement number.',
        'Step 4: Visit your home bank branch within 3 days to submit a written zero-liability dispute form.'
      ]
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>National Financial Safety Guidelines</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Banking Safety & Anti-Fraud Guide
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Master essential safety protocols to protect your bank balance, UPI, credit cards, and identity.
        </p>
      </div>

      {/* 🌟 Interactive 60-Second Cyber Safety Quiz */}
      <CyberSafetyQuiz />

      {/* Cyber Crime Helpline Hero Banner */}
      <div className="bg-gradient-to-r from-[#5345ED] via-indigo-600 to-indigo-800 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl">
          <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
            MHA Government Helpline
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            Victim of Financial Fraud? Call 1930 Immediately
          </h2>
          <p className="text-xs text-indigo-100 font-medium leading-relaxed">
            Report within the <strong>"Golden Hour"</strong> to freeze stolen funds before fraudsters cash out at ATMs or crypto exchanges.
          </p>
        </div>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#5345ED] hover:bg-slate-100 text-xs font-bold px-5 py-3.5 rounded-2xl transition-all shadow-md flex items-center gap-2 w-fit shrink-0 cursor-pointer"
        >
          <span>Visit cybercrime.gov.in</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Accordion Cards Section */}
      <div className="space-y-4">
        {ACCORDION_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isOpen = openAccordionId === section.id;

          return (
            <div
              key={section.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(section.id)}
                className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5345ED] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${section.badgeColor}`}>
                        {section.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {section.summary}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-indigo-50 text-[#5345ED]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content Body */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-4"
                  >
                    {section.goldenRule && (
                      <div className="bg-amber-100/80 border border-amber-300/80 rounded-2xl p-4 text-xs text-amber-950 font-bold flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{section.goldenRule}</span>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Key Rules & Preventive Steps
                      </h4>
                      <ul className="space-y-2">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
