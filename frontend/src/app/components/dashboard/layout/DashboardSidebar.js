/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardSidebar.js
 * Description: Left desktop sidebar utilizing modular LogoutButton.
 * ==============================================================================
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2 } from 'lucide-react';
import LogoutButton from '@/app/components/common/LogoutButton';

export default function DashboardSidebar({ navItems = [], roleLabel = 'Admin Panel' }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 z-40 flex-col justify-between py-6 px-4 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 animate-in fade-in slide-in-from-left duration-500 fill-mode-both">
      
      {/* Top Section */}
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase text-white leading-tight">
              VARA <span className="text-emerald-400">HOBE</span>
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wider block mt-0.5 uppercase">
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 flex flex-col gap-1.5">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ease-out active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] translate-x-1'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="tracking-wide">{item.name}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Modular Logout Button */}
      <div className="pt-4 border-t border-white/10">
        <LogoutButton />
      </div>

    </aside>
  );
}