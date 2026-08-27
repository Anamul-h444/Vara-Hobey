/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/Sidebar.js
 * Description: Sidebar with optimized width to fit "VARA HOBE" properly.
 * ==============================================================================
 */

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Building2, UserCircle2, User, Sparkles } from 'lucide-react';
import { navMenuItems } from '@/config/navigation';
import { useAuth } from '@/context/AuthContext';
import ProfileModal from '@/app/components/common/ProfileModal';
import Toast from '@/app/components/ui/Toast';

export default function Sidebar({ onOpenSignIn }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAuthToast, setShowAuthToast] = useState(false);
  const timerRef = useRef(null);

  const handleNavClick = (e, item) => {
    if (item.authRequired && !user) {
      e.preventDefault();
      setShowAuthToast(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        setShowAuthToast(false);
        if (onOpenSignIn) {
          onOpenSignIn('signin');
        }
      }, 1200);
      return;
    }

    if (item.name === 'Dashboard' && user) {
      e.preventDefault();

      const isAdmin = Boolean(
        (Array.isArray(user.roles) && user.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin')) ||
        (typeof user.role === 'string' && user.role.toLowerCase() === 'admin')
      );

      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    }
  };

  return (
    <>
      <Toast 
        isVisible={showAuthToast} 
        onClose={() => setShowAuthToast(false)} 
        messageBn="ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে প্রথমে লগইন করুন!"
        messageEn="Please sign in first to access your dashboard."
      />

      {/* সাইডবারের উইডথ w-[80px] থেকে বাড়িয়ে w-[88px] করা হলো */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[88px] bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 z-50 flex-col items-center justify-between py-5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-in fade-in slide-in-from-left duration-500 fill-mode-both">
        
        {/* 1. Brand Identity & Logo */}
        <div className="flex flex-col items-center shrink-0 w-full px-1">
          <Link 
            href="/" 
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 active:scale-95 w-full"
            aria-label="Vara Hobe Homepage"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 border border-emerald-400/20">
              <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            {/* এখানে দুটি শব্দ পাশাপাশি বা সুন্দরভাবে ফিট করার ব্যবস্থা করা হলো */}
            <span className="text-[8px] font-black tracking-tighter uppercase text-emerald-400 mt-2 text-center leading-tight transition-colors duration-300 group-hover:text-emerald-300 px-0.5">
              VARA HOBE
            </span>
          </Link>
        </div>

        {/* 2. Navigation Menu */}
        <nav className="flex flex-col items-center justify-center gap-4 my-auto w-full px-2.5">
          {navMenuItems && navMenuItems.map((item, idx) => {
            const Icon = item.icon;
            const isDashboardPath = (pathname.startsWith('/admin') || pathname.startsWith('/user')) && item.name === 'Dashboard';
            const isActive = pathname === item.href || isDashboardPath;

            return (
              <div key={idx} className="relative group w-full flex justify-center">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out relative active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-tr from-purple-600/30 to-indigo-600/20 text-emerald-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/10 border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110 text-emerald-400' : 'group-hover:scale-110 group-hover:text-white'}`} />
                  <span className={`text-[10px] font-semibold mt-1.5 leading-none transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.name.split(' ')[0]}
                  </span>
                </Link>

                <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200 ease-out">
                  <div className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0c1019]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
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

        {/* 3. Bottom Profile Section */}
        <div className="relative group shrink-0 pb-1 w-full flex justify-center">
          {user ? (
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="w-13 h-13 rounded-full border-2 border-emerald-500/50 bg-[#161c28] hover:border-emerald-400 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 cursor-pointer relative"
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              aria-label="Open Profile Settings"
            >
              {user.avatar && user.avatar !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png' ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              ) : (
                <User className="w-7 h-7 text-emerald-400" />
              )}
            </button>
          ) : (
            <div className="relative w-full flex justify-center">
              <button
                type="button"
                onClick={() => onOpenSignIn('signin')}
                className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#161c28] to-[#1c2436] hover:from-purple-600/30 hover:to-indigo-600/30 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group/btn"
                aria-label="Sign In or Register"
              >
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
                </span>
                
                <UserCircle2 className="w-6 h-6 text-emerald-400 group-hover/btn:text-purple-300 transition-colors duration-300" />
                <span className="text-[9px] font-bold tracking-wider uppercase text-slate-300 group-hover/btn:text-white mt-1 leading-none transition-colors duration-300">
                  IN
                </span>
              </button>
            </div>
          )}
        </div>
      </aside>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onOpenSignIn={onOpenSignIn} 
      />
    </>
  );
}