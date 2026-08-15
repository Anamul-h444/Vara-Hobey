'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, UserCircle2, Sparkles } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';

export default function Sidebar({ onOpenSignIn }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] bg-[#0d111a]/95 backdrop-blur-2xl border-r border-[#1e2433] z-50 flex-col items-center justify-between py-4 shadow-2xl">
      
      {/* ১. টপ সেকশন: ব্র্যান্ড লোগো */}
      <div className="flex flex-col items-center shrink-0">
        <Link 
          href="/" 
          className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[8.5px] font-black tracking-wider uppercase text-emerald-400 mt-1.5 text-center leading-none">
            VARA HOBE
          </span>
        </Link>
      </div>

      {/* ২. মিডল সেকশন: মূল মেনু আইকনসমূহ (বড় ও স্পষ্ট) */}
      <nav className="flex flex-col items-center justify-center gap-2.5 my-auto w-full">
        {navMenuItems && navMenuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              title={item.name}
              className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-tr from-purple-600/30 to-indigo-600/20 text-emerald-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium mt-0.5 leading-none">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* ৩. বটম সেকশন: ইন্টারঅ্যাক্টিভ সাইন-ইন বাটন + ফ্লোটিং টুলটিপ */}
      <div className="relative group shrink-0 pb-1">
        <button
          type="button"
          onClick={onOpenSignIn}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#161c28] to-[#1c2436] hover:from-purple-600/30 hover:to-indigo-600/30 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white flex flex-col items-center justify-center shadow-lg transition-all duration-200 active:scale-95 cursor-pointer relative"
        >
          {/* নিয়ন অ্যাক্টিভেশন পালস ডট */}
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>

          <UserCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-purple-300 transition" />
          <span className="text-[8px] font-bold tracking-wider uppercase text-slate-400 group-hover:text-white mt-0.5 leading-none">
            Login
          </span>
        </button>

        {/* ডানপাশে ভেসে ওঠা প্রিমিয়াম ডার্ক-গ্লাস টুলটিপ */}
        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-200">
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1019]/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
            {/* ছোট লেফট অ্যারো */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0c1019] border-l border-t border-white/15 rotate-[-45deg]" />
            
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Sign In <span className="text-slate-400 font-normal">/</span> Register
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}