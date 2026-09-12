/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/Sidebar.js
 * Description: Fully responsive professional desktop sidebar with right-side sparkles icon on Add Fare button.
 * ==============================================================================
 */

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Building2,
  UserCircle2,
  User,
  PlusCircle,
  Sparkles,
} from "lucide-react";
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
        messageBn=""
        messageEn="Please sign in first to add a fare or property."
      />

      {/* Desktop Sidebar (Only visible on md screens and above, fixed width w-[260px]) */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 z-45 flex-col justify-between py-6 px-5 shadow-[5px_0_30px_rgba(0,0,0,0.6)] transition-all duration-300 font-sans">
        {/* Top Header: Brand Logo & Title */}
        <div className="flex flex-col shrink-0 w-full mb-6">
          <Link
            href="/"
            className="flex items-center gap-3.5 group transition-all duration-300 p-2 rounded-2xl hover:bg-white/[0.04]"
            aria-label="Vara Hobe Homepage"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 border border-emerald-400/20 shrink-0">
              <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-extrabold tracking-wider uppercase text-white truncate group-hover:text-emerald-400 transition-colors">
                Vara Hobe
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Navigation Menu */}
        <nav className="flex flex-col gap-2 my-auto w-full overflow-y-auto pr-1 custom-dark-scrollbar">
          {/* SPECIAL ACTION BUTTON: Add Fare with Right-Side Sparkles Icon */}
          <Link
            href="/user/dashboard/add-property"
            onClick={handleAddFareClick}
            className="w-full h-[52px] px-4 rounded-2xl flex items-center justify-between transition-all duration-300 ease-out relative active:scale-95 cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] font-bold mb-2 group"
            aria-label="Add Fare"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-950/10 flex items-center justify-center shrink-0">
                <PlusCircle className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:rotate-90" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-950 truncate">
                Add Fare
              </span>
            </div>
            <Sparkles className="w-4 h-4 text-slate-950 shrink-0 transition-transform duration-300 group-hover:scale-125" />
          </Link>

          <div className="w-full h-[1px] bg-white/10 my-1" />

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
                <Link
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`w-full h-[46px] px-4 rounded-xl flex items-center gap-3.5 transition-all duration-300 ease-out cursor-pointer group ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/15 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent font-medium"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isActive
                        ? "text-emerald-400 scale-110"
                        : "text-slate-400 group-hover:text-white group-hover:scale-110"
                    }`}
                  />
                  <span className="text-xs sm:text-sm tracking-wide truncate">
                    {item.name}
                  </span>
                </Link>
              );
            })}
        </nav>

        {/* Bottom Section: Profile Card or Login Button */}
        <div className="shrink-0 pt-4 border-t border-white/10 w-full">
          {user ? (
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer group text-left shadow-sm"
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              aria-label="Open Profile Settings"
            >
              <div className="w-10 h-10 rounded-xl border border-emerald-500/40 bg-[#161c28] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {user.avatar &&
                user.avatar !==
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png" ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <User className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-100 truncate group-hover:text-emerald-300 transition-colors">
                  {user.name || "User Account"}
                </span>
                <span className="text-[10px] text-slate-400 truncate font-medium">
                  {user.email || "Manage Profile"}
                </span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenSignIn("signin")}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#161c28] to-[#1c2436] hover:from-emerald-500/10 hover:to-teal-500/10 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all duration-300 cursor-pointer shadow-lg group"
              aria-label="Sign In or Register"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <UserCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-bold text-white tracking-wide">
                  Sign In / Register
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Access your account
                </span>
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Padding Fix for Desktop view */}
      <style jsx global>{`
        @media (min-width: 768px) {
          main,
          .main-container {
            padding-left: 260px !important;
          }
        }
      `}</style>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenSignIn={onOpenSignIn}
      />
    </>
  );
}
