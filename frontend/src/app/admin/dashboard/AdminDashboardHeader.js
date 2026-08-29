/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardHeader.js
 * Description: Fully responsive professional floating dashboard header with enhanced typography.
 * ==============================================================================
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardHeader({
  onToggleMobileMenu,
  onOpenProfileModal,
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [hasNotifications, setHasNotifications] = useState(true);

  // ইউআরএল পাথ চেক করে ডাইনামিক টাইটেল ও ব্যাজ নির্ধারণ করা
  const isAdminPage = pathname?.includes("/admin");
  const title = isAdminPage ? "Admin Overview" : "User Overview";
  const badgeText = isAdminPage ? "SYSTEM CONTROLLER" : "USER PANEL";

  return (
    <header className="sticky top-4 z-30 mx-4 sm:mx-6 lg:mx-8 mb-6 bg-[#0e1422]/95 backdrop-blur-2xl border border-white/10 rounded-3xl px-5 sm:px-7 py-4 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative">
      {/* বাম পাশ: মোবাইল মেনু বা লোগো */}
      <div className="flex items-center gap-3.5 z-10">
        {/* মোবাইল/ট্যাবে লোগো ও মেনু টগল */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link href="/" title="Go to Home" className="shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
          </Link>
          <button
            onClick={onToggleMobileMenu}
            className="p-2 text-slate-300 hover:text-white transition"
          >
            <Menu className="w-6 h-6 hover:cursor-pointer" />
          </button>
        </div>

        {/* টাইটেল অংশ (ল্যাপটপের জন্য বামে থাকবে) */}
        <div className="hidden lg:block truncate">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 tracking-wider uppercase">
            {badgeText}
          </span>
          <h1 className="text-base font-extrabold text-slate-100 mt-1 tracking-tight truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* মোবাইল স্ক্রিনের জন্য ঠিক মাঝখানে টাইটেল দেখানোর অ্যাবসলুট কন্টেইনার */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center lg:hidden pointer-events-none">
        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
          {badgeText}
        </span>
        <h1 className="text-sm font-extrabold text-slate-100 tracking-tight mt-0.5">
          {title}
        </h1>
      </div>

      {/* ডান পাশ: সার্চ, নোটিফিকেশন ও প্রোফাইল */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 z-10">
        {/* সার্চবার (ল্যাপটপে দৃশ্যমান) */}
        <div className="hidden sm:flex items-center relative w-36 md:w-52 lg:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#121929] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition font-medium"
          />
        </div>

        {/* নোটিফিকেশন */}
        <button className="p-2.5 rounded-2xl bg-[#121929] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition relative">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          )}
        </button>

        {/* প্রোফাইল পিকচার */}
        <button
          onClick={onOpenProfileModal}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-white/15 hover:border-emerald-400 transition-all shrink-0 shadow-md"
        >
          {user?.avatar &&
          user?.avatar !==
            "https://cdn-icons-png.flaticon.com/512/149/149071.png" ? (
            <img src={user.avatar} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
