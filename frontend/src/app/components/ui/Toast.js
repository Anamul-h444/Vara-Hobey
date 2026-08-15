'use client';

import React, { useEffect } from 'react';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export default function Toast({ isVisible, onClose, messageBn, messageEn }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    /* মোবাইলে top-18 এবং সেন্টারে (left-4 right-4 mx-auto), ডেক্সটপে top-6 right-6 */
    <div className="fixed top-18 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-[9999] max-w-sm sm:w-full mx-auto sm:mx-0 animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
      
      {/* গ্লোয়িং বর্ডার ফ্রেম */}
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-amber-500/80 via-purple-500/60 to-emerald-500/80 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
        
        {/* ডার্ক গ্লাস সারফেস */}
        <div className="flex items-start gap-3 bg-[#0d111a]/95 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-4 border border-white/10">
          
          {/* ওয়ার্নিং আইকন */}
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>

          {/* টেক্সট সেকশন */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3 h-3" />
              <span>Selection Required</span>
            </div>
            
            {/* বাংলা মেসেজ */}
            <p className="font-bangla text-xs font-semibold text-slate-100 leading-snug">
              {messageBn || "অনুগ্রহ করে প্রথমে একটি প্রপার্টি টাইপ নির্বাচন করুন!"}
            </p>
            
            {/* ইংরেজি মেসেজ */}
            <p className="text-[11px] font-normal text-slate-400 mt-0.5 leading-tight">
              {messageEn || "Please select a property type first to apply filters."}
            </p>
          </div>

          {/* ক্লোজ বাটন */}
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </div>
  );
}