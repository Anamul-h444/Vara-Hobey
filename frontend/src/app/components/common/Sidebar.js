'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, UserCircle2, Sparkles, LogOut } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';
import { useAuth } from '@/contex/AuthContext';

export default function Sidebar({ onOpenSignIn }) {
  const pathname = usePathname();
  const { user, logoutState } = useAuth();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] bg-[#0d111a]/95 backdrop-blur-2xl border-r border-[#1e2433] z-50 flex-col items-center justify-between py-4 shadow-2xl">
      
      {/* লোগো */}
      <div className="flex flex-col items-center shrink-0">
        <Link href="/" className="flex flex-col items-center group transition-transform duration-200 hover:scale-105">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[8.5px] font-black tracking-wider uppercase text-emerald-400 mt-1.5 text-center leading-none">
            VARA HOBE
          </span>
        </Link>
      </div>

      {/* নেভিগেশন */}
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

      {/* বটম বাটন (লগইন থাকলে প্রোফাইল ইমেজ + লগআউট অপশন) */}
      <div className="relative group shrink-0 pb-1">
        {user ? (
          <button
            type="button"
            onClick={logoutState}
            className="w-11 h-11 rounded-2xl overflow-hidden border border-emerald-500/50 relative group cursor-pointer shadow-lg"
            title="Click to Logout"
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition">
              <LogOut className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenSignIn}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#161c28] to-[#1c2436] hover:from-purple-600/30 hover:to-indigo-600/30 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white flex flex-col items-center justify-center shadow-lg transition active:scale-95 cursor-pointer relative"
          >
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <UserCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-purple-300 transition" />
            <span className="text-[8px] font-bold tracking-wider uppercase text-slate-400 group-hover:text-white mt-0.5 leading-none">
              IN
            </span>
          </button>
        )}
      </div>

    </aside>
  );
}