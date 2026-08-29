/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/page.js
 * Description: Admin Dashboard Overview with enhanced UI/UX and clean typography.
 * ==============================================================================
 */

"use client";

import React from "react";
import { Users, Building, ShieldCheck, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner / Overview Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
            Dashboard Overview
          </h1>
          <p className="font-bangla text-sm text-slate-400 mt-1">
            আপনার প্ল্যাটফর্মের সার্বিক কার্যক্রম এবং পরিসংখ্যান এক নজরে দেখুন।
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          System Online & Secure
        </div>
      </div>

      {/* স্ট্যাটস কার্ড সেকশন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Users */}
        <div className="group p-6 rounded-3xl bg-[#121824] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Users
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            1,284
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% গত মাস থেকে</span>
          </div>
        </div>

        {/* Card 2: Total Properties (Placeholder for future stats) */}
        <div className="group p-6 rounded-3xl bg-[#121824] border border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Properties
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            458
          </p>
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>সক্রিয় প্রপার্টি</span>
          </div>
        </div>

        {/* Card 3: Active Rentals */}
        <div className="group p-6 rounded-3xl bg-[#121824] border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Bookings
            </span>
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            92
          </p>
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium mt-3">
            <span>চলমান চুক্তি</span>
          </div>
        </div>
      </div>

      {/* সাম্প্রতিক অ্যাক্টিভিটি */}
      <div className="p-8 rounded-3xl bg-[#121824] border border-white/10 shadow-xl">
        <h2 className="text-lg font-bold text-slate-100 tracking-wide">
          Recent Activities
        </h2>
        <p className="font-bangla text-sm text-slate-400 mt-2">
          অ্যাডমিন ড্যাশবোর্ডের মূল কার্যক্রম ও সাম্প্রতিক লগ এখানে প্রদর্শিত
          হবে।
        </p>

        {/* Placeholder activity list item */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <p className="text-sm font-medium text-slate-200 font-bangla">
                নতুন একটি প্রপার্টি রেন্ট টাইপ যোগ করা হয়েছে।
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
