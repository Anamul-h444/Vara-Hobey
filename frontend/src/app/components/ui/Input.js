/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/Input.js
 * Description: Robust form input component featuring dynamic icon positioning,
 *              focus glow states, and animated error feedback.
 * ==============================================================================
 */

'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="w-full text-left">
      {/* Label */}
      {label && (
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors">
          {label}
        </label>
      )}

      {/* Input Box with Adaptive Focus Glow */}
      <div className="relative flex items-center group">
        {Icon && (
          <div className="absolute left-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          className={`w-full bg-[#141923] border text-white text-xs sm:text-sm rounded-xl py-2.5 transition-all duration-200 focus:outline-none placeholder:text-slate-500 ${
            Icon ? 'pl-10 pr-4' : 'px-3.5'
          } ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-white/10 hover:border-white/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
          } ${className}`}
          {...props}
        />
      </div>

      {/* Animated Error Alert */}
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1 duration-150 animate-in fade-in slide-in-from-top-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}