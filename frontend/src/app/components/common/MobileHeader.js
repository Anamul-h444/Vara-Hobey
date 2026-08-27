/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/MobileHeader.js
 * Description: Sleek, high-performance mobile top navigation bar with 
 *              micro-interactions and responsive drawer triggers.
 * ==============================================================================
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Building2 } from 'lucide-react';

export default function MobileHeader({ onToggleMenu }) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-[#080b11]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between transition-colors duration-300">
      
      {/* ------------------------------------------------------------------ */}
      {/* Brand Identity & Logo                                              */}
      {/* ------------------------------------------------------------------ */}
      <Link 
        href="/" 
        className="flex items-center gap-2.5 group active:scale-95 transition-transform duration-200"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300">
          <Building2 className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
        </div>
        <span className="text-sm font-black tracking-widest text-white uppercase">
          VARA<span className="text-emerald-400">HOBE</span>
        </span>
      </Link>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Drawer Trigger Action                                       */}
      {/* ------------------------------------------------------------------ */}
      <button 
        type="button"
        onClick={() => {
          if (onToggleMenu) onToggleMenu();
        }}
        className="p-2 rounded-xl bg-[#141923] hover:bg-[#1c2230] text-slate-300 hover:text-white border border-white/10 active:scale-90 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer shadow-sm"
        aria-label="Open Navigation Menu"
      >
        <Menu className="w-5 h-5 transition-transform duration-200 active:rotate-12" />
      </button>
    </header>
  );
}