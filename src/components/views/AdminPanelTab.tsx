'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Users,
  Database,
  Plus,
  Trash2,
  Download,
  Filter,
  Search,
  Activity,
  Lock,
  PhoneCall,
  Globe
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminPanelTab() {
  const { showToast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState<'reports' | 'blacklist'>('reports');

  // Sample Scammer Blocklist Data
  const [blacklist, setBlacklist] = useState([
    { id: 'bl-1', type: 'UPI VPA', target: 'sbi-kyc-verify@ybl', riskScore: 98, date: '2026-07-29', status: 'Blocked' },
    { id: 'bl-2', type: 'Phishing Domain', target: 'http://sbi-kyc-update.com', riskScore: 96, date: '2026-07-28', status: 'Blocked' },
    { id: 'bl-3', type: 'Fake Officer Phone', target: '+91 98765 43210', riskScore: 94, date: '2026-07-28', status: 'Blocked' },
    { id: 'bl-4', type: 'Fake Electricity Link', target: 'http://electricity-bill-pay.in', riskScore: 92, date: '2026-07-27', status: 'Blocked' }
  ]);

  // Sample User Reported Scams Queue
  const [reportedScams, setReportedScams] = useState([
    { id: 'rep-101', type: 'SMS Phishing', reporter: 'Ramesh Patel (Ahmedabad)', detail: 'PAN card blockage alert SMS with shortened link', score: 96, date: '10 min ago', status: 'Pending Review' },
    { id: 'rep-102', type: 'WhatsApp Lottery', reporter: 'Sunita Sharma (Surat)', detail: 'KBC ₹25 Lakh lottery audio claiming processing fee via UPI', score: 94, date: '35 min ago', status: 'Pending Review' },
    { id: 'rep-103', type: 'Vishing Call', reporter: 'Vijay Shah (Vadodara)', detail: 'Caller posing as SBI Officer demanding 6-digit OTP', score: 92, date: '1 hour ago', status: 'Pending Review' }
  ]);

  const [newTarget, setNewTarget] = useState('');
  const [newType, setNewType] = useState('UPI VPA');

  const handleAddToBlacklist = () => {
    if (!newTarget.trim()) return;
    setBlacklist(prev => [
      {
        id: `bl-${Date.now()}`,
        type: newType,
        target: newTarget,
        riskScore: 99,
        date: new Date().toISOString().split('T')[0],
        status: 'Blocked'
      },
      ...prev
    ]);
    setNewTarget('');
    showToast('success', 'Scammer Blocked', `${newTarget} added to Global Threat Blacklist.`);
  };

  const handleResolveReport = (reportId: string, action: 'block' | 'forward' | 'dismiss') => {
    setReportedScams(prev => prev.filter(r => r.id !== reportId));
    if (action === 'block') {
      showToast('success', 'Threat Blocked', 'Scammer blacklisted and synced with SafeBank AI database.');
    } else if (action === 'forward') {
      showToast('info', 'Forwarded to 1930', 'Scam evidence forwarded to National Cyber Crime Reporting Portal.');
    } else {
      showToast('warning', 'Report Dismissed', 'Scam report marked resolved.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5 text-[#05ffb0]" />
            <span>Admin Command Center</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Threat Intelligence & Blacklist Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor real-time cyber attacks across Gujarat & India, resolve user fraud reports, and manage global blocklists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'reports' ? 'bg-[#5345ED] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Pending Reports ({reportedScams.length})
          </button>
          <button
            onClick={() => setActiveSubTab('blacklist')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'blacklist' ? 'bg-[#5345ED] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Global Blacklist ({blacklist.length})
          </button>
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Scams Flagged</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">14,892</span>
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">↑ +14% this week</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Active Blacklisted Scammers</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">2,341</span>
            <Ban className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium">VPAs, URLs & Phone Numbers</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Gujarat Regional Protection</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">41%</span>
            <Globe className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">High Density Safety Rate</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Cyber Helpline 1930 Synced</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">100%</span>
            <PhoneCall className="w-6 h-6 text-[#5345ED]" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium">National Portal Active</span>
        </div>
      </div>

      {activeSubTab === 'reports' ? (
        /* User Reported Scams Queue Table */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">User Submitted Scam Reports Queue</h3>
              <p className="text-xs text-slate-500">Review community submitted scams and block scammers globally</p>
            </div>
          </div>

          {reportedScams.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3">Scam Category</th>
                    <th className="pb-3">Reporter</th>
                    <th className="pb-3">Evidence Detail</th>
                    <th className="pb-3">AI Risk</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportedScams.map((rep) => (
                    <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 font-bold text-slate-900">{rep.type}</td>
                      <td className="py-4 text-slate-600 font-medium">{rep.reporter}</td>
                      <td className="py-4 font-mono text-slate-700 max-w-xs truncate">{rep.detail}</td>
                      <td className="py-4">
                        <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[11px]">
                          {rep.score}%
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => handleResolveReport(rep.id, 'block')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Block Scammer
                        </button>
                        <button
                          onClick={() => handleResolveReport(rep.id, 'forward')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-[#5345ED] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-indigo-200"
                        >
                          Forward 1930
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 font-medium text-xs">
              All reported scam entries have been resolved!
            </div>
          )}
        </div>
      ) : (
        /* Global Blacklist Manager Table */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
          {/* Add to Blacklist Form */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-600" />
              <span>Add New Scammer to Global Blocklist</span>
            </h4>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="UPI VPA">UPI VPA</option>
                <option value="Phishing Domain">Phishing Domain</option>
                <option value="Fake Officer Phone">Fake Officer Phone</option>
              </select>

              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Enter suspicious UPI ID, URL, or Phone Number..."
                className="flex-1 w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
              />

              <button
                onClick={handleAddToBlacklist}
                className="bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Blacklist</span>
              </button>
            </div>
          </div>

          {/* Blacklist Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">Threat Category</th>
                  <th className="pb-3">Blacklisted Target</th>
                  <th className="pb-3">Assessed Score</th>
                  <th className="pb-3">Date Added</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blacklist.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 font-bold text-slate-900">{item.type}</td>
                    <td className="py-4 font-mono font-bold text-red-600">{item.target}</td>
                    <td className="py-4 font-bold text-slate-700">{item.riskScore}%</td>
                    <td className="py-4 text-slate-500">{item.date}</td>
                    <td className="py-4 text-right">
                      <span className="bg-red-100 text-red-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
