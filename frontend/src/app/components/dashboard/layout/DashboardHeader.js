/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardHeader.js
 * Description: Fully responsive professional floating dashboard header.
 * ==============================================================================
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // পাথ চেক করার জন্য
import { Bell, Search, Menu, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader({ 
  onToggleMobileMenu, 
  onOpenProfileModal 
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [hasNotifications, setHasNotifications] = useState(true);

  // ইউআরএল পাথ চেক করে ডাইনামিক টাইটেল ও ব্যাজ নির্ধারণ করা
  const isAdminPage = pathname?.includes('/admin');
  const title = isAdminPage ? 'Admin Overview' : 'User Overview';
  const badgeText = isAdminPage ? 'SYSTEM CONTROLLER' : 'USER PANEL';

  return (
    <header className="sticky top-4 z-30 mx-4 sm:mx-6 lg:mx-8 mb-6 bg-[#0e1422]/90 backdrop-blur-2xl border border-white/10 rounded-3xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative">
      
      {/* বাম পাশ: মোবাইল মেনু বা লোগো */}
      <div className="flex items-center gap-3 z-10">
        {/* মোবাইল/ট্যাবে লোগো ও মেনু টগল */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/" title="Go to Home" className="shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Building2 className="w-4 h-4" />
            </div>
          </Link>
          <button onClick={onToggleMobileMenu} className="p-2 text-slate-400 hover:text-white transition">
            <Menu className="w-5 h-5 hover:cursor-pointer " />
          </button>
        </div>

        {/* টাইটেল অংশ (ল্যাপটপের জন্য বামে থাকবে) */}
        <div className="hidden lg:block truncate">
           <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 tracking-wide uppercase">
            {badgeText}
           </span>
           <h1 className="text-sm font-black text-white mt-0.5 tracking-tight truncate">{title}</h1>
        </div>
      </div>

      {/* মোবাইল স্ক্রিনের জন্য ঠিক মাঝখানে টাইটেল দেখানোর অ্যাবসলুট কন্টেইনার */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center lg:hidden pointer-events-none">
        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest block">
          {badgeText}
        </span>
        <h1 className="text-xs font-black text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* ডান পাশ: সার্চ, নোটিফিকেশন ও প্রোফাইল */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
        
        {/* সার্চবার (ল্যাপটপে দৃশ্যমান) */}
        <div className="hidden sm:flex items-center relative w-32 md:w-48 lg:w-60">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#121929] border border-white/5 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition"
          />
        </div>

        {/* নোটিফিকেশন */}
        <button className="p-2 sm:p-2.5 rounded-2xl bg-[#121929] border border-white/5 text-slate-400 hover:text-white transition relative">
          <Bell className="w-4 h-4" />
          {hasNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
        </button>

        {/* প্রোফাইল পিকচার */}
        <button 
          onClick={onOpenProfileModal}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all shrink-0"
        >
          {user?.avatar && user?.avatar !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png' ? (
            <img src={user.avatar} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </button>

      </div>
    </header>
  );
}