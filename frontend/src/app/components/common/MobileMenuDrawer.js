/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/MobileMenuDrawer.js
 * Description: Fully functional mobile navigation with dynamic dashboard routing.
 * ==============================================================================
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { X, Sparkles, LogIn, LogOut, User } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';

export default function MobileMenuDrawer({ isOpen, onClose, onOpenSignIn, onOpenSignUp }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutState } = useAuth();

  if (!isOpen) return null;

  // ড্যাশবোর্ড পাথ ডিটারমিনার
  const getDashboardPath = () => {
    if (!user) return '/';
    const isAdmin = Boolean(
      (Array.isArray(user.roles) && user.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin')) ||
      (typeof user.role === 'string' && user.role.toLowerCase() === 'admin')
    );
    return isAdmin ? '/admin/dashboard' : '/user/dashboard';
  };

  const handleSmoothLogout = () => {
    onClose();
    if (typeof document !== 'undefined') {
      document.body.classList.add('logging-out');
    }
    setTimeout(() => {
      logoutState();
      router.push('/');
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          document.body.classList.remove('logging-out');
        }
      }, 100);
    }, 180);
  };

  return (
    <div className="fixed inset-0 z-[999] md:hidden">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in cursor-pointer" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 left-0 w-[82%] max-w-xs bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between z-10 duration-300 animate-in slide-in-from-left">
        
        <div className="flex flex-col">
          <div className="relative flex flex-col items-center pt-2 pb-4">
            <button 
              type="button"
              onClick={onClose}
              className="absolute right-0 top-0 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative group mb-2.5">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60 blur-md pointer-events-none" />
              <div className="relative w-12 h-12 rounded-2xl bg-[#141923] border border-white/20 flex items-center justify-center text-emerald-400 font-black">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">
              Vara Hobe
            </span>
          </div>

          {user && (
            <div className="flex items-center gap-3 p-3 mb-2 rounded-2xl bg-[#141923] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#1c2436] border border-emerald-500/40 flex items-center justify-center overflow-hidden shrink-0">
                {user.avatar && user.avatar !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png' ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-white truncate leading-tight">{user.name}</span>
                <span className="text-[10.5px] text-slate-400 truncate">{user.email}</span>
              </div>
            </div>
          )}

          <div className="relative my-1">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
          </div>

          <nav className="space-y-1.5 pt-3">
            {navMenuItems && navMenuItems.map((item, idx) => {
              const Icon = item.icon;
              // ড্যাশবোর্ডের জন্য পাথ ডিটেকশন
              const href = item.name === 'Dashboard' ? getDashboardPath() : item.href;
              const isActive = pathname === href;

              return (
                <Link
                  key={idx}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-white border border-emerald-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-2.5">
          {user ? (
            <button 
              type="button"
              onClick={handleSmoothLogout}
              className="w-full py-3 rounded-2xl text-center text-xs font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <>
              <button 
                type="button"
                onClick={() => { onClose(); if (onOpenSignIn) onOpenSignIn(); }}
                className="w-full py-3 rounded-2xl text-center text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}