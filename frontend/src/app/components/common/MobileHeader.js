'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Building2 } from 'lucide-react';

export default function MobileHeader({ onToggleMenu }) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-[#0e121b]/90 backdrop-blur-md border-b border-[#1e2433] px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
          <Building2 className="w-4 h-4" />
        </div>
        <span className="text-base font-black tracking-widest text-white uppercase">
          VARA<span className="text-emerald-400">HOBE</span>
        </span>
      </Link>

      {/* নিশ্চিত করুন onClick এ onToggleMenu কল হচ্ছে */}
      <button 
        type="button"
        onClick={() => {
          if (onToggleMenu) onToggleMenu();
        }}
        className="p-2 rounded-lg bg-[#1a202c] text-slate-300 hover:text-white border border-slate-700/50 active:scale-95 transition cursor-pointer"
        aria-label="Open Menu"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  );
}