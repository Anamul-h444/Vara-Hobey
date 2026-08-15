'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, LogIn } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';

export default function MobileMenuDrawer({ isOpen, onClose, onOpenSignIn, onOpenSignUp }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] md:hidden">
      
      {/* ১. ডার্ক ব্যাকড্রপ ওভারলে */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />

      {/* ২. ফুল-হাইট স্লিম ড্রয়ার */}
      <div className="fixed inset-y-0 left-0 w-[82%] max-w-xs bg-[#0d111a]/95 backdrop-blur-2xl border-r border-[#1e2433] p-5 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
        
        {/* টপ ও মেনু সেকশন */}
        <div className="flex flex-col">
          
          {/* হেডার: লোগো ও ক্লোজ বাটন */}
          <div className="relative flex flex-col items-center pt-2 pb-5">
            <button 
              type="button"
              onClick={onClose}
              className="absolute right-0 top-0 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* নিয়ন গ্লোয়িং লোগো */}
            <div className="relative group mb-2.5">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-emerald-500 opacity-70 blur-md pointer-events-none" />
              <div className="relative w-12 h-12 rounded-2xl bg-[#161c28] border border-white/20 flex items-center justify-center text-emerald-400 font-black shadow-inner">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            {/* লোগো টেক্সট */}
            <span className="text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white text-center drop-shadow">
              Vara Hobe
            </span>
          </div>

          {/* স্টাইলিশ সেপারেটর */}
          <div className="relative my-2">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          </div>

          {/* মেনু আইটেমসমূহ */}
          <nav className="space-y-1.5 pt-4">
            {navMenuItems && navMenuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500/20 to-emerald-500/10 text-white border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* বটম সেকশন: অথ মডাল ট্রিগার বাটন */}
        <div className="pt-4 border-t border-[#1e2433] space-y-2.5">
          
          {/* Sign In বাটন (ক্লিক করলে Auth Modal খুলবে) */}
          <button 
            type="button"
            onClick={() => {
              onClose();
              if (onOpenSignIn) onOpenSignIn();
            }}
            className="w-full py-3 rounded-2xl text-center text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.35)] transition active:scale-[0.98] cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>

          {/* ক্রিয়েট অ্যাকাউন্ট কুইক লিঙ্ক */}
          <button 
            type="button"
            onClick={() => {
              onClose();
              if (onOpenSignUp) onOpenSignUp();
            }}
            className="w-full py-2 rounded-xl text-center text-[11px] font-medium text-slate-400 hover:text-emerald-400 transition cursor-pointer"
          >
            Don't have an account? <span className="underline">Create one</span>
          </button>

        </div>

      </div>

    </div>
  );
}