/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/Toast.js
 * Description: Sleek floating notification banner featuring auto-dismiss timer,
 *              bilingual validation feedback, and GPU-accelerated enter animations.
 * ==============================================================================
 */

'use client';

import React, { useEffect } from 'react';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export default function Toast({ isVisible, onClose, messageBn, messageEn }) {
  /* -------------------------------------------------------------------------- */
  /*                                Auto-Dismiss Timer                          */
  /* -------------------------------------------------------------------------- */
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
    <div className="fixed top-16 sm:top-6 left-4 right-4 sm:left-auto sm:right-6 z-[9999] max-w-sm sm:w-full mx-auto sm:mx-0 duration-300 animate-in fade-in slide-in-from-top-4 pointer-events-auto">
      
      {/* Ambient Gradient Frame */}
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/80 via-purple-500/60 to-emerald-500/80 shadow-[0_15px_45px_rgba(0,0,0,0.85)]">
        
        {/* Glass Content Card */}
        <div className="relative flex items-start gap-3 bg-[#0c1019]/95 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-4 border border-white/10 overflow-hidden">
          
          {/* Warning Icon Badge */}
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <AlertCircle className="w-4 h-4" />
          </div>

          {/* Text Information Body */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Selection Required</span>
            </div>
            
            {/* Bengali Message */}
            <p className="font-bangla text-xs font-semibold text-slate-100 leading-snug">
              {messageBn || 'অনুগ্রহ করে প্রথমে একটি প্রপার্টি টাইপ নির্বাচন করুন!'}
            </p>
            
            {/* English Subtext */}
            <p className="text-[11px] font-normal text-slate-400 mt-0.5 leading-tight">
              {messageEn || 'Please select a property type first to apply filters.'}
            </p>
          </div>

          {/* Close Trigger Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all duration-150 cursor-pointer active:scale-90"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Subtle Bottom Lifetime Bar */}
          <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400 w-full animate-out fade-out fill-mode-forwards" style={{ animationDuration: '3500ms' }} />
        </div>
      </div>

    </div>
  );
}