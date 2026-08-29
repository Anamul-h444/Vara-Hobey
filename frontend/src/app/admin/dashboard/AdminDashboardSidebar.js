/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardSidebar.js
 * Description: Left desktop sidebar with enhanced typography, readability, and modular LogoutButton.
 * ==============================================================================
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
import LogoutButton from "@/app/components/common/LogoutButton";

export default function AdminDashboardSidebar({
  navItems = [],
  roleLabel = "Admin Panel",
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 z-40 flex-col justify-between py-6 px-5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      {/* Top Section */}
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3.5 px-2 pb-6 border-b border-white/10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase text-slate-100 leading-tight">
              VARA <span className="text-emerald-400">HOBE</span>
            </h2>
            <span className="text-xs text-emerald-400 font-mono tracking-wider block mt-1 uppercase font-semibold">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 flex flex-col gap-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] translate-x-1 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-slate-300 group-hover:text-white"}`}
                  />
                  <span className="tracking-wide">{item.name}</span>
                </div>

                {item.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Modular Logout Button */}
      <div className="pt-5 border-t border-white/10">
        <LogoutButton />
      </div>
    </aside>
  );
}
