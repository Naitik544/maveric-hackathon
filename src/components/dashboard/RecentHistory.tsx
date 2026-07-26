'use client';

import React from 'react';
import { MessageSquare, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { RECENT_HISTORY, HistoryItem } from '@/data/mockData';

interface RecentHistoryProps {
  onViewAllClick?: () => void;
  onSelectItem?: (item: HistoryItem) => void;
}

export default function RecentHistory({ onViewAllClick, onSelectItem }: RecentHistoryProps) {
  const displayItems = RECENT_HISTORY.slice(0, 4);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Recent History</h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-bold text-[#5345ED] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {displayItems.map((item) => {
          const isHighRisk = item.riskLevel === 'High Risk';
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem && onSelectItem(item)}
              className="bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-indigo-200 rounded-2xl p-3.5 space-y-2.5 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-white ${
                      item.type === 'SMS'
                        ? 'bg-rose-500'
                        : item.type === 'WhatsApp'
                        ? 'bg-emerald-500'
                        : 'bg-[#5345ED]'
                    }`}
                  >
                    {item.type === 'SMS' && <MessageSquare className="w-3.5 h-3.5" />}
                    {item.type === 'WhatsApp' && <MessageCircle className="w-3.5 h-3.5" />}
                    {item.type === 'Call' && <Phone className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{item.title}</span>
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-600 line-clamp-2 leading-relaxed h-8">
                {item.preview}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px]">
                <span
                  className={`font-extrabold ${
                    isHighRisk ? 'text-red-600' : 'text-emerald-600'
                  }`}
                >
                  {item.riskLevel} • {item.riskScore}%
                </span>
                <span className="text-slate-400 font-medium">{item.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
