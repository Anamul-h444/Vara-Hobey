'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[72px] h-screen fixed left-0 top-0 z-50 bg-[#0d111a]/95 backdrop-blur-xl border-r border-[#1e2433] py-3.5 items-center justify-between select-none shadow-[4px_0_24px_rgba(0,0,0,0.6)]">
      
      {/* 1. TOP LOGO */}
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/" className="relative group flex flex-col items-center justify-center gap-1.5">
          <div className="absolute -top-1 w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-600 to-emerald-500 opacity-60 blur-md group-hover:opacity-100 transition duration-300 pointer-events-none" />
          <div className="relative w-10 h-10 rounded-2xl bg-[#161c28] border border-white/20 flex items-center justify-center text-emerald-400 font-black shadow-inner group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white text-center leading-none">
            Vara Hobe
          </span>
        </Link>

        {/* 2. MENU ITEMS (Shared List) */}
        <nav className="flex flex-col items-center gap-2 w-full px-1.5 pt-2">
          {navMenuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`relative group w-full py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-purple-500/20 to-emerald-500/10 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-purple-400 to-emerald-400 rounded-r-full" />
                  </>
                )}

                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-purple-300' : 'group-hover:scale-110'} transition-transform duration-200`} />
                <span className="text-[10px] font-medium tracking-tight relative z-10 leading-none">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. BOTTOM BUTTONS */}
      <div className="flex flex-col items-center gap-2 w-full px-2">
        <Link
          href="/signup"
          className="w-full py-1.5 rounded-full text-center text-[10px] font-semibold text-slate-300 hover:text-white bg-[#161c28]/90 hover:bg-[#1f2738] border border-white/10 transition shadow-sm"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="w-full py-1.5 rounded-full text-center text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition shadow-[0_0_15px_rgba(147,51,234,0.4)]"
        >
          Sign In
        </Link>
      </div>

    </aside>
  );
}