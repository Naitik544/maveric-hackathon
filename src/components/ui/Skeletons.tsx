'use client';

import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-slate-200" />
        <div className="space-y-1 flex-1">
          <div className="w-24 h-4 bg-slate-200 rounded" />
          <div className="w-36 h-3 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="w-full h-24 bg-slate-100 rounded-2xl" />
      <div className="w-full h-10 bg-slate-200 rounded-xl" />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-28 h-3 bg-slate-200 rounded" />
        <div className="w-8 h-8 rounded-2xl bg-slate-200" />
      </div>
      <div className="w-20 h-6 bg-slate-200 rounded" />
      <div className="w-32 h-3 bg-slate-100 rounded" />
    </div>
  );
}
