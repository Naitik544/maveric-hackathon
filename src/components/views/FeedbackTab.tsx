'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, CheckCircle2, ShieldCheck, ThumbsUp, UserCheck, Heart, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface FeedbackItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  verified: boolean;
}

export default function FeedbackTab() {
  const { showToast } = useToast();
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [category, setCategory] = useState('SMS Scanner');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 'fb-1',
      name: 'Bhavesh Bhai Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      category: 'SMS Phishing Shield',
      comment: 'Mara phone par SBI account block thavano fake SMS aavyo hoto. SafeBank AI ye 2 sec ma scam detect kari ne mane bachavi lidho!',
      date: 'Today',
      verified: true
    },
    {
      id: 'fb-[#2]',
      name: 'Sunita Sharma',
      location: 'Surat, Gujarat',
      rating: 5,
      category: 'Voice Call Analyzer',
      comment: 'KBC 25 Lakh lottery call scam ka diagnosis ekdam accurate tha. Gujarati voice alert function very helpful for senior citizens!',
      date: 'Yesterday',
      verified: true
    },
    {
      id: 'fb-3',
      name: 'Vikram Singh',
      location: 'Rajkot, Gujarat',
      rating: 5,
      category: 'WhatsApp Checker',
      comment: 'OLX army officer QR code scam detection works perfectly. Highly recommend to everyone in rural & urban India!',
      date: '2 days ago',
      verified: true
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newFb: FeedbackItem = {
      id: `fb-${Date.now()}`,
      name: userName,
      location: userLocation || 'Gujarat, India',
      rating: rating,
      category: category,
      comment: comment,
      date: 'Just now',
      verified: true
    };

    setFeedbacks([newFb, ...feedbacks]);
    setUserName('');
    setUserLocation('');
    setComment('');
    showToast('success', 'Feedback Submitted!', 'Thank you for sharing your feedback with the SafeBank AI community.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#5345ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>User Feedback & Community Feed</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          User Feedback & Safety Reviews
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Read real user experiences from Gujarat & India and share your feedback on SafeBank AI protection.
        </p>
      </div>

      {/* Satisfaction Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">AI Accuracy Rating</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">4.9 / 5.0</span>
          <span className="text-[11px] text-emerald-600 font-bold">Based on 1,480+ Reviews</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Protected Families</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">14,800+</span>
          <span className="text-[11px] text-slate-500 font-medium">Gujarat & Rural India Trust</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Community Safety Index</span>
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <span className="text-2xl font-black text-slate-900">99.4%</span>
          <span className="text-[11px] text-emerald-600 font-bold">Scams Blocked Successfully</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feedback Submission Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#5345ED]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Submit Your Feedback</h3>
                <p className="text-[11px] text-slate-500 font-medium">Share your experience with SafeBank AI</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Bhavesh Patel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">City / Location</label>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="e.g. Ahmedabad, Gujarat"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Feature Used</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5345ED]"
                >
                  <option value="SMS Phishing Shield">SMS Phishing Shield</option>
                  <option value="WhatsApp Checker">WhatsApp Checker</option>
                  <option value="Voice Call Analyzer">Voice Call Analyzer</option>
                  <option value="UPI QR Shield">UPI QR Shield</option>
                  <option value="1-Tap Family SOS Alert">1-Tap Family SOS Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Feedback & Story</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how SafeBank AI helped protect your savings or what features you liked..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5345ED] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5345ED] hover:bg-[#4335dc] active:scale-[0.99] text-white text-xs font-bold py-3.5 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback Now</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Community Feedback Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Community Verified Reviews ({feedbacks.length})</span>
          </h3>

          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <motion.div
                key={fb.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5345ED] font-bold text-sm flex items-center justify-center">
                      {fb.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{fb.name}</span>
                        {fb.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">{fb.location} • {fb.date}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase bg-indigo-50 text-[#5345ED] px-2.5 py-1 rounded-full">
                    {fb.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  "{fb.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
