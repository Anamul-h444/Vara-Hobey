/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/Sidebar.js
 * Description: Optimized sidebar with larger width, bold icons, and enhanced readability.
 * ==============================================================================
 */

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Building2, UserCircle2, User, PlusCircle } from "lucide-react";
import { navMenuItems } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileModal from "@/app/components/common/ProfileModal";
import Toast from "@/app/components/ui/Toast";

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
          onOpenSignIn("signin");
        }
      }, 1200);
      return;
    }

    if (item.name === "Dashboard" && user) {
      e.preventDefault();

      const isAdmin = Boolean(
        (Array.isArray(user.roles) &&
          user.roles.some(
            (r) => typeof r === "string" && r.toLowerCase() === "admin",
          )) ||
        (typeof user.role === "string" && user.role.toLowerCase() === "admin"),
      );

      if (isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  };

  // Handle Add Fare click (Requires auth check)
  const handleAddFareClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowAuthToast(true);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShowAuthToast(false);
        if (onOpenSignIn) {
          onOpenSignIn("signin");
        }
      }, 1200);
      return;
    }
    router.push("/user/dashboard/add-property");
  };

  return (
    <>
      <Toast
        isVisible={showAuthToast}
        onClose={() => setShowAuthToast(false)}
        messageBn="বিজ্ঞাপন বা ভাড়া দিতে অনুগ্রহ করে প্রথমে লগইন করুন!"
        messageEn="Please sign in first to add a fare or property."
      />

      {/* সাইডবারের উইডথ আরও বাড়িয়ে w-[110px] করা হলো যাতে পর্যাপ্ত জায়গা থাকে */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[110px] bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 z-50 flex-col items-center justify-between py-6 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        {/* 1. Brand Identity & Logo */}
        <div className="flex flex-col items-center shrink-0 w-full px-2">
          <Link
            href="/"
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 active:scale-95 w-full"
            aria-label="Vara Hobe Homepage"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 border border-emerald-400/20">
              <Building2 className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-400 mt-2 text-center leading-tight transition-colors duration-300 group-hover:text-emerald-300 px-0.5">
              VARA HOBE
            </span>
          </Link>
        </div>

        {/* 2. Navigation Menu */}
        <nav className="flex flex-col items-center justify-center gap-3.5 my-auto w-full px-2">
          {/* SPECIAL ACTION BUTTON: Add Fare / ভাড়া দিন */}
          <div className="relative group w-full flex justify-center mb-1">
            <Link
              href="/user/dashboard/add-property"
              onClick={handleAddFareClick}
              className="w-[88px] h-[72px] rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out relative active:scale-95 cursor-pointer bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-emerald-300/30 group"
              aria-label="Add Fare"
            >
              <PlusCircle className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90 text-slate-950" />
              <span className="text-[11px] font-black mt-1 leading-tight tracking-tight font-bangla text-slate-950">
                ভাড়া দিন
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-900 opacity-90 leading-none mt-0.5">
                Add Fare
              </span>
            </Link>

            {/* Tooltip for Add Fare */}
            <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200 ease-out">
              <div className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0c1019]/95 backdrop-blur-xl border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0c1019] border-l border-t border-emerald-500/30 rotate-[-45deg]" />
                <span className="text-xs font-semibold text-emerald-400 tracking-wide font-bangla">
                  ভাড়া দিন (Add Fare)
                </span>
              </div>
            </div>
          </div>

          {/* Divider line separating Add Fare from standard Nav Items */}
          <div className="w-12 h-[1px] bg-white/15 my-1" />

          {/* Regular Navigation Items */}
          {navMenuItems &&
            navMenuItems.map((item, idx) => {
              const Icon = item.icon;
              const isDashboardPath =
                (pathname.startsWith("/admin") ||
                  pathname.startsWith("/user")) &&
                item.name === "Dashboard";
              const isActive = pathname === item.href || isDashboardPath;

              return (
                <div
                  key={idx}
                  className="relative group w-full flex justify-center"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`w-[88px] h-[64px] rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-out relative active:scale-95 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-tr from-purple-600/30 to-indigo-600/20 text-emerald-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105"
                        : "text-slate-200 hover:text-white hover:bg-white/[0.08] hover:border-white/20 border border-transparent"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={`w-6 h-6 transition-transform duration-300 ${isActive ? "scale-110 text-emerald-400" : "group-hover:scale-110 group-hover:text-white"}`}
                    />
                    <span
                      className={`text-xs font-semibold mt-1.5 leading-none transition-colors duration-300 ${isActive ? "text-slate-100 font-bold" : "text-slate-200 group-hover:text-white"}`}
                    >
                      {item.name.split(" ")[0]}
                    </span>
                  </Link>

                  {/* Tooltip */}
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
              className="w-16 h-16 rounded-full border-2 border-emerald-500/50 bg-[#161c28] hover:border-emerald-400 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 cursor-pointer relative"
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              aria-label="Open Profile Settings"
            >
              {user.avatar &&
              user.avatar !==
                "https://cdn-icons-png.flaticon.com/512/149/149071.png" ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <User className="w-8 h-8 text-emerald-400" />
              )}
            </button>
          ) : (
            <div className="relative w-full flex justify-center">
              <button
                type="button"
                onClick={() => onOpenSignIn("signin")}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#161c28] to-[#1c2436] hover:from-purple-600/30 hover:to-indigo-600/30 border border-white/10 hover:border-purple-500/50 text-slate-200 hover:text-white flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group/btn"
                aria-label="Sign In or Register"
              >
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                </span>

                <UserCircle2 className="w-7 h-7 text-emerald-400 group-hover/btn:text-purple-300 transition-colors duration-300" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-200 group-hover/btn:text-white mt-1 leading-none transition-colors duration-300">
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
