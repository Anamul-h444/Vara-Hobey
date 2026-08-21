/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/Sidebar.js
 * Description: Desktop sidebar navigation featuring micro-interactions, glowing
 *              active indicators, animated hover tooltips, and profile modal trigger.
 * ==============================================================================
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, UserCircle2, User, Sparkles } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import ProfileModal from '@/app/components/common/ProfileModal';

export default function Sidebar({ onOpenSignIn }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] bg-[#0d111a]/95 backdrop-blur-2xl border-r border-[#1e2433] z-50 flex-col items-center justify-between py-5 shadow-2xl transition-all duration-300">
        
        {/* ------------------------------------------------------------------ */}
        {/* 1. Brand Logo                                                      */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex flex-col items-center shrink-0">
          <Link 
            href="/" 
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.55)] transition-all duration-300">
              <Building2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <span className="text-[8.5px] font-black tracking-widest uppercase text-emerald-400 mt-2 text-center leading-none transition-colors duration-300 group-hover:text-emerald-300">
              VARA HOBE
            </span>
          </Link>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. Navigation Menu Items                                           */}
        {/* ------------------------------------------------------------------ */}
        <nav className="flex flex-col items-center justify-center gap-3 my-auto w-full px-2">
          {navMenuItems && navMenuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={idx} className="relative group w-full flex justify-center">
                <Link
                  href={item.href}
                  className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative ${
                    isActive
                      ? 'bg-gradient-to-tr from-purple-600/30 to-indigo-600/20 text-emerald-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.07] hover:scale-105 active:scale-95'
                  }`}
                >
                  {/* Left Active Glow Bar */}
                  {isActive && (
                    <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-in fade-in duration-300" />
                  )}

                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-emerald-400' : 'group-hover:scale-110 group-hover:text-white'}`} />
                  <span className="text-[8.5px] font-medium mt-0.5 leading-none transition-colors duration-300">
                    {item.name.split(' ')[0]}
                  </span>
                </Link>

                {/* Floating Tooltip */}
                <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-200">
                  <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c1019]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.8)] whitespace-nowrap">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0c1019] border-l border-t border-white/10 rotate-[-45deg]" />
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* ------------------------------------------------------------------ */}
        {/* 3. Bottom Profile / Auth Action                                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="relative group shrink-0 pb-1">
          {user ? (
            /* Authenticated User Avatar Trigger */
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="w-11 h-11 rounded-2xl border-2 border-emerald-500/50 bg-[#161c28] hover:border-emerald-400 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 cursor-pointer relative"
              title="My Profile & Settings"
            >
              {user.avatar && user.avatar !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png' ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              ) : (
                <User className="w-6 h-6 text-emerald-400" />
              )}
            </button>
          ) : (
            /* Guest User Sign In Trigger & Floating Tooltip */
            <>
              <button
                type="button"
                onClick={onOpenSignIn}
                className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#161c28] to-[#1c2436] hover:from-purple-600/30 hover:to-indigo-600/30 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group/btn"
              >
                {/* Status Ping Dot */}
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
                </span>
                
                <UserCircle2 className="w-5 h-5 text-emerald-400 group-hover/btn:text-purple-300 transition-colors duration-300" />
                <span className="text-[8px] font-bold tracking-wider uppercase text-slate-400 group-hover/btn:text-white mt-0.5 leading-none transition-colors duration-300">
                  IN
                </span>
              </button>

              {/* Tooltip */}
              <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-200">
                <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0c1019]/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0c1019] border-l border-t border-white/15 rotate-[-45deg]" />
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Sign In <span className="text-slate-400 font-normal">/</span> Register
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onOpenSignIn={onOpenSignIn} 
      />
    </>
  );
}