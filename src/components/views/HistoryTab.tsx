'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Search,
  Filter,
  MessageSquare,
  MessageCircle,
  Phone,
  ArrowUpRight,
  Download,
  Trash2,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import FullReportModal from '../dashboard/FullReportModal';
import { ScamAnalysis } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

export interface HistoryRecord {
  id: string;
  type: 'SMS' | 'WhatsApp' | 'Call';
  title: string;
  preview: string;
  riskScore: number;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Safe';
  category: string;
  date: string;
  timestamp: string;
  summary: string;
  reasons: string[];
  recommendedActions: string[];
}

const INITIAL_HISTORY_RECORDS: HistoryRecord[] = [
  {
    id: 'rec-101',
    type: 'SMS',
    title: 'SBI Account Block Notice',
    preview: 'Dear Customer, Your SBI account will be blocked today due to non-updated PAN Card...',
    riskScore: 96,
    riskLevel: 'High Risk',
    category: 'Bank KYC Phishing',
    date: '2026-07-26',
    timestamp: 'Today at 10:45 AM',
    summary: 'Phishing SMS attempting to harvest bank login credentials via fake domain.',
    reasons: ['Unverified domain (sbi-kyc-update.com)', 'Urgent account suspension threat', 'Requests PAN update'],
    recommendedActions: ['Do not click link', 'Do not share OTP', 'Report to 1930']
  },
  {
    id: 'rec-102',
    type: 'WhatsApp',
    title: 'KBC Lottery Cash Prize Claim',
    preview: 'Congratulations! You have won ₹25,000 in KBC Lucky Draw. Click link to claim now...',
    riskScore: 89,
    riskLevel: 'High Risk',
    category: 'Lottery Fraud',
    date: '2026-07-26',
    timestamp: 'Today at 09:15 AM',
    summary: 'Deceptive WhatsApp lottery fraud attempting to extract processing fees.',
    reasons: ['Unsolicited cash reward promise', 'External win-prize.in link', 'Requests bank details'],
    recommendedActions: ['Do not click link', 'Block and report sender on WhatsApp']
  },
  {
    id: 'rec-103',
    type: 'Call',
    title: 'Bank Executive OTP Inquiry',
    preview: 'Caller asking for 6-digit OTP to unblock debit card due to biometric update...',
    riskScore: 93,
    riskLevel: 'High Risk',
    category: 'Vishing Call',
    date: '2026-07-25',
    timestamp: 'Yesterday at 04:30 PM',
    summary: 'Voice phishing attempting unauthorized card access via OTP request.',
    reasons: ['Caller impersonated SBI official', 'Direct request for OTP', 'Creating artificial panic'],
    recommendedActions: ['Hang up immediately', 'Never share OTP over phone']
  },
  {
    id: 'rec-104',
    type: 'WhatsApp',
    title: 'Item Purchase Inquiry',
    preview: 'Hi, is the bicycle still available for sale on OLX? Can I come check today?',
    riskScore: 12,
    riskLevel: 'Safe',
    category: 'Legitimate Chat',
    date: '2026-07-25',
    timestamp: 'Yesterday at 02:10 PM',
    summary: 'Standard informal buyer inquiry with no malicious triggers.',
    reasons: ['No payment QR codes attached', 'No external links', 'Normal conversational tone'],
    recommendedActions: ['Normal caution applies']
  },
  {
    id: 'rec-105',
    type: 'SMS',
    title: 'Electricity Disconnection Notice',
    preview: 'Urgent: Power supply will be cut tonight at 9:30 PM due to unpaid bill. Call officer...',
    riskScore: 95,
    riskLevel: 'High Risk',
    category: 'Utility Scam',
    date: '2026-07-24',
    timestamp: '24 July 2026 at 08:20 PM',
    summary: 'Fraudulent utility disconnection alert targeting mobile users.',
    reasons: ['Personal 10-digit mobile number provided for officer', 'Immediate disconnection threat'],
    recommendedActions: ['Pay bills only through official board app', 'Do not call personal numbers']
  },
  {
    id: 'rec-106',
    type: 'Call',
    title: 'Delivery Agent OTP Verification',
    preview: 'Hello sir, delivery executive from Amazon outside your building for parcel...',
    riskScore: 8,
    riskLevel: 'Safe',
    category: 'Delivery Verification',
    date: '2026-07-23',
    timestamp: '23 July 2026 at 11:00 AM',
    summary: 'Standard delivery confirmation call with no suspicious requests.',
    reasons: ['Standard delivery context', 'Matches order tracking'],
    recommendedActions: ['Confirm parcel package on doorstep']
  },
  {
    id: 'rec-107',
    type: 'SMS',
    title: 'Income Tax Refund Approval',
    preview: 'Dear Taxpayer, An Income Tax Refund of ₹15,400 has been approved. Claim now...',
    riskScore: 92,
    riskLevel: 'High Risk',
    category: 'Tax Refund Phishing',
    date: '2026-07-22',
    timestamp: '22 July 2026 at 03:45 PM',
    summary: 'Phishing SMS pretending to be Income Tax Dept.',
    reasons: ['Fake domain link (incometax-refund-claim.org)', 'Unverified sender'],
    recommendedActions: ['Do not click link', 'Check IT portal directly']
  },
  {
    id: 'rec-108',
    type: 'WhatsApp',
    title: 'Part-Time Rating Job Offer',
    preview: 'Earn ₹3000-₹8000 daily by rating YouTube videos from home! Telegram contact...',
    riskScore: 88,
    riskLevel: 'High Risk',
    category: 'Task / Job Fraud',
    date: '2026-07-21',
    timestamp: '21 July 2026 at 06:15 PM',
    summary: 'Telegram task scam offering impossible daily earnings for video ratings.',
    reasons: ['Unrealistic income promises', 'Redirects to Telegram group', 'Prepaid task trap'],
    recommendedActions: ['Ignore and block sender']
  }
];

export default function HistoryTab() {
  const [historyList, setHistoryList] = useState<HistoryRecord[]>(INITIAL_HISTORY_RECORDS);
  const { showToast } = useToast();

  const handleExportCSV = () => {
    try {
      const headers = ['Record ID', 'Channel Type', 'Title', 'Category', 'Risk Score', 'Risk Level', 'Date', 'Summary'];
      const rows = historyList.map(r => [
        `"${r.id}"`,
        `"${r.type}"`,
        `"${r.title.replace(/"/g, '""')}"`,
        `"${r.category.replace(/"/g, '""')}"`,
        `"${r.riskScore}%"`,
        `"${r.riskLevel}"`,
        `"${r.date}"`,
        `"${r.summary.replace(/"/g, '""')}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `SafeBank_Scan_History_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('success', 'CSV Exported Successfully!', 'Scan history downloaded as CSV file.');
    } catch (err) {
      showToast('error', 'Export Error', 'Unable to generate CSV download.');
    }
  };

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('safebank_user_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const userRecords: HistoryRecord[] = parsed.map((item: any, idx: number) => ({
            id: item.id || `user-rec-${idx}`,
            type: item.type || 'SMS',
            title: item.title || 'User Reported Scam',
            preview: item.preview || 'Submitted scam report',
            riskScore: item.riskScore || 98,
            riskLevel: item.riskLevel || 'High Risk',
            category: 'User Reported Fraud',
            date: '2026-07-29',
            timestamp: item.timestamp || 'Recently',
            summary: item.preview || 'User reported fraudulent attempt.',
            reasons: ['Reported by SafeBank AI community member', 'Unverified scammer contact'],
            recommendedActions: ['Do not respond or send money', 'Call 1930 Cyber Helpline']
          }));
          setHistoryList([...userRecords, ...INITIAL_HISTORY_RECORDS]);
        }
      }
    } catch (e) {}
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'High Risk' | 'Safe'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'SMS' | 'WhatsApp' | 'Call'>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<'All' | 'Today' | '7days' | '30days'>('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected report for modal
  const [selectedModalReport, setSelectedModalReport] = useState<ScamAnalysis | null>(null);

  // Filter logic
  const filteredRecords = useMemo(() => {
    return historyList.filter(item => {
      // Search term
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Status
      const matchesStatus =
        selectedStatus === 'All'
          ? true
          : selectedStatus === 'High Risk'
          ? item.riskScore >= 70
          : item.riskScore < 30;

      // Type
      const matchesType = selectedType === 'All' ? true : item.type === selectedType;

      // Date Range
      let matchesDate = true;
      if (selectedDateRange === 'Today') {
        matchesDate = item.date === '2026-07-26';
      } else if (selectedDateRange === '7days') {
        matchesDate = true; // includes sample set
      }

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [historyList, searchTerm, selectedStatus, selectedType, selectedDateRange]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const handleDeleteRecord = (id: string) => {
    setHistoryList(prev => prev.filter(r => r.id !== id));
  };

  const handleOpenReport = (record: HistoryRecord) => {
    setSelectedModalReport({
      riskScore: record.riskScore,
      riskLevel: record.riskLevel,
      reasons: record.reasons,
      recommendedActions: record.recommendedActions,
      summary: record.summary
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit & Scan Records</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Scan History
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review and manage all past SMS, WhatsApp, and Call Audio fraud analyses.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-[#5345ED] hover:bg-[#4335dc] text-white text-xs font-bold px-4 py-3 rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 w-fit cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export History CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by preview, title, category..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
            />
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-3 flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            {(['All', 'High Risk', 'Safe'] as const).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-2xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5345ED] cursor-pointer"
            >
              <option value="All">All Channels (SMS, WhatsApp, Call)</option>
              <option value="SMS">SMS Scans Only</option>
              <option value="WhatsApp">WhatsApp Scans Only</option>
              <option value="Call">Call Audio Scans Only</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedDateRange}
              onChange={(e) => {
                setSelectedDateRange(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-2xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#5345ED] cursor-pointer"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today Only</option>
              <option value="7days">Last 7 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Scan Cards Grid */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Scan Records Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or filter dropdowns.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {currentRecords.map((record) => {
              const isHighRisk = record.riskScore >= 70;
              const isSafe = record.riskScore < 30;

              return (
                <motion.div
                  key={record.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Card Header: Type Badge & Risk Meter Pill */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                            record.type === 'SMS'
                              ? 'bg-rose-500'
                              : record.type === 'WhatsApp'
                              ? 'bg-emerald-500'
                              : 'bg-[#5345ED]'
                          }`}
                        >
                          {record.type === 'SMS' && <MessageSquare className="w-4 h-4" />}
                          {record.type === 'WhatsApp' && <MessageCircle className="w-4 h-4" />}
                          {record.type === 'Call' && <Phone className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block">{record.type} Scan</span>
                          <span className="text-[10px] text-slate-400 font-medium">{record.category}</span>
                        </div>
                      </div>

                      {/* Risk Score Meter Pill */}
                      <span
                        className={`text-xs font-black px-3 py-1 rounded-full border ${
                          isHighRisk
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : isSafe
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {record.riskScore}% Risk
                      </span>
                    </div>

                    {/* Title & Preview */}
                    <div className="space-y-1 pt-1">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#5345ED] transition-colors">
                        {record.title}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {record.preview}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Timestamp & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{record.timestamp}</span>
                      </span>
                      <span>ID: #{record.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenReport(record)}
                        className="flex-1 bg-indigo-50 hover:bg-indigo-100/80 text-[#5345ED] text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Report</span>
                      </button>

                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                        title="Delete Scan Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Responsive Pagination Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} scan records
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#5345ED] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Report Modal Integration */}
      {selectedModalReport && (
        <FullReportModal
          isOpen={!!selectedModalReport}
          onClose={() => setSelectedModalReport(null)}
          analysis={selectedModalReport}
        />
      )}
    </div>
  );
}
