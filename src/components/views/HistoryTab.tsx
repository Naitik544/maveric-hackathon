'use client';

import React, { useState } from 'react';
import { History, Search, Filter, MessageSquare, MessageCircle, Phone, ArrowUpRight, Download } from 'lucide-react';
import { RECENT_HISTORY, HistoryItem } from '@/data/mockData';

export default function HistoryTab() {
  const [filter, setFilter] = useState<'All' | 'High Risk' | 'Safe'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = RECENT_HISTORY.filter(item => {
    const matchesFilter = filter === 'All' ? true : item.riskLevel === filter;
    const matchesSearch = item.preview.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <History className="w-6 h-6 text-[#5345ED]" />
            Scan History
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review past SMS, WhatsApp, and phone call scam analyses.
          </p>
        </div>

        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 w-fit">
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export History</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scan logs..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['All', 'High Risk', 'Safe'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-[#5345ED] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs divide-y divide-slate-100">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">
            No history logs found matching your criteria.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs ${
                    item.type === 'SMS'
                      ? 'bg-rose-500'
                      : item.type === 'WhatsApp'
                      ? 'bg-emerald-500'
                      : 'bg-[#5345ED]'
                  }`}
                >
                  {item.type === 'SMS' && <MessageSquare className="w-5 h-5" />}
                  {item.type === 'WhatsApp' && <MessageCircle className="w-5 h-5" />}
                  {item.type === 'Call' && <Phone className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium">• {item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono line-clamp-1 max-w-xl">
                    {item.preview}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <div className="text-right">
                  <div className={`text-xs font-black ${item.riskLevel === 'High Risk' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {item.riskScore}% Risk
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {item.riskLevel}
                  </span>
                </div>

                <button className="w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-[#5345ED] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
