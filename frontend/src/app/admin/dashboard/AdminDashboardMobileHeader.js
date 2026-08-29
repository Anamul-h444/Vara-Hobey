/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardMobileHeader.js
 * Description: Mobile drawer with Branding Logo at the top and navigation items.
 * ==============================================================================
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/app/components/common/LogoutButton";

export default function DashboardMobileHeader({
  navItems = [],
  roleLabel = "Dashboard",
  isOpen,
  onClose,
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-72 bg-[#0c1019] border-l border-white/10 z-50 p-5 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Top Branding (Logo & App Name) */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-black tracking-widest text-white uppercase">
                VARA<span className="text-emerald-400">HOBE</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition active:scale-90 cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-5 flex flex-col gap-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout */}
        <div className="pt-4 border-t border-white/10">
          <LogoutButton onBeforeLogout={onClose} />
        </div>
      </div>
    </>
  );
}
