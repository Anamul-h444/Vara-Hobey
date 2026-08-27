/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/Button.js
 * Description: Core reusable button primitive featuring micro-interactions,
 *              adaptive loading spinners, and GPU-accelerated press effects.
 * ==============================================================================
 */

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  ...props 
}) {
  /* -------------------------------------------------------------------------- */
  /*                                Style System                                */
  /* -------------------------------------------------------------------------- */
  const baseStyles = 
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

  const variants = {
    primary: 
      "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 border border-emerald-400/30",
    secondary: 
      "bg-[#141923] hover:bg-[#1c2230] text-slate-200 border border-white/10 hover:border-white/20 shadow-sm",
    outline: 
      "border border-white/15 bg-transparent hover:bg-white/[0.06] text-slate-300 hover:text-white",
    ghost: 
      "bg-transparent hover:bg-white/[0.06] text-slate-400 hover:text-white",
    gradient: 
      "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-500/25 border border-purple-400/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
}