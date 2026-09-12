/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/MobileMenuDrawer.js
 * Description: Mobile navigation drawer with profile modal handling.
 * ==============================================================================
 */

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  X,
  Building2,
  Sparkles,
  UserCircle2,
  User,
  PlusCircle,
} from "lucide-react";

import { navMenuItems } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileModal from "@/app/components/common/ProfileModal";
import Toast from "@/app/components/ui/Toast";

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  onOpenSignIn,
  onOpenSignUp,
  onOpenProfile,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // ============================================================
  // Local Profile Modal State
  // ============================================================
  const [isLocalProfileOpen, setIsLocalProfileOpen] = useState(false);

  // ============================================================
  // Authentication Toast State
  // ============================================================
  const [showAuthToast, setShowAuthToast] = useState(false);

  const timerRef = useRef(null);

  // ============================================================
  // Navigation Click Handler
  // ============================================================
  const handleNavClick = (e, item) => {
    // ----------------------------------------------------------
    // Authentication Required
    // ----------------------------------------------------------
    if (item.authRequired && !user) {
      e.preventDefault();

      setShowAuthToast(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setShowAuthToast(false);

        if (onOpenSignIn) {
          onOpenSignIn("signin");
        }
      }, 1200);

      return;
    }

    // ----------------------------------------------------------
    // Dashboard Routing
    // ----------------------------------------------------------
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

    // Close mobile drawer
    onClose();
  };

  // ============================================================
  // Add Fare Click Handler
  // ============================================================
  const handleAddFareClick = (e) => {
    // ----------------------------------------------------------
    // User is not logged in
    // ----------------------------------------------------------
    if (!user) {
      e.preventDefault();

      setShowAuthToast(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setShowAuthToast(false);

        if (onOpenSignIn) {
          onOpenSignIn("signin");
        }
      }, 1200);

      return;
    }

    // ----------------------------------------------------------
    // User is logged in
    // ----------------------------------------------------------
    onClose();

    router.push("/user/dashboard/add-property");
  };

  // ============================================================
  // Profile Click Handler
  // ============================================================
  const handleProfileClick = () => {
    /*
     * IMPORTANT:
     * Profile Modal must be opened BEFORE closing the drawer.
     *
     * Previously:
     * onClose() -> drawer disappeared -> component returned null
     * -> Profile Modal could not render properly on mobile.
     *
     * Now:
     * 1. Open Profile Modal
     * 2. Close Drawer
     */

    if (onOpenProfile) {
      // If parent component controls profile modal
      onOpenProfile();
    } else {
      // Otherwise use local profile modal
      setIsLocalProfileOpen(true);
    }

    // Close mobile drawer AFTER opening profile
    onClose();
  };

  return (
    <>
      {/* ========================================================
          Authentication Toast
      ======================================================== */}
      <Toast
        isVisible={showAuthToast}
        onClose={() => setShowAuthToast(false)}
        messageBn=""
        messageEn="Please sign in first to add a fare or property."
      />

      {/* ========================================================
          MOBILE DRAWER
          
          IMPORTANT:
          The entire component is NOT returned as null when
          isOpen becomes false.

          Only the drawer itself is conditionally rendered.
          
          This allows ProfileModal to remain mounted and open
          even after the drawer closes.
      ======================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] md:hidden font-sans">
          {/* ====================================================
              Backdrop Overlay
          ==================================================== */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in cursor-pointer"
            onClick={onClose}
          />

          {/* ====================================================
              Drawer Container
          ==================================================== */}
          <div className="fixed inset-y-0 left-0 w-[280px] bg-[#0c1019]/95 backdrop-blur-2xl border-r border-white/10 p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between z-10 duration-300 animate-in slide-in-from-left">
            {/* ==================================================
                Top Section
            ================================================== */}
            <div className="flex items-center justify-between shrink-0 w-full mb-6 pb-2 border-b border-white/10">
              {/* ------------------------------------------------
                  Logo
              ------------------------------------------------ */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 group transition-all duration-300"
                aria-label="Vara Hobe Homepage"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/25 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-white truncate">
                    Vara Hobe
                  </span>

                  <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">
                    Workspace
                  </span>
                </div>
              </Link>

              {/* ------------------------------------------------
                  Close Button
              ------------------------------------------------ */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ==================================================
                Center Navigation Section
            ================================================== */}
            <nav className="flex flex-col gap-2 my-auto w-full overflow-y-auto pr-1 custom-dark-scrollbar">
              {/* ==================================================
                  Add Fare Button
              ================================================== */}
              <Link
                href="/user/dashboard/add-property"
                onClick={handleAddFareClick}
                className="w-full h-[52px] px-4 rounded-2xl flex items-center justify-between transition-all duration-300 ease-out relative active:scale-95 cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] font-bold mb-2 group"
                aria-label="Add Fare"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-950/10 flex items-center justify-center shrink-0">
                    <PlusCircle className="w-4 h-4 text-slate-950" />
                  </div>

                  <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-950 truncate">
                    Add Fare
                  </span>
                </div>

                <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
              </Link>

              {/* Divider */}
              <div className="w-full h-[1px] bg-white/10 my-1" />

              {/* ==================================================
                  Regular Navigation Items
              ================================================== */}
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
                        className={`w-5 h-5 shrink-0 ${
                          isActive
                            ? "text-emerald-400 scale-110"
                            : "text-slate-400"
                        }`}
                      />

                      <span className="text-xs sm:text-sm tracking-wide truncate">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
            </nav>

            {/* ==================================================
                Bottom Profile Section
            ================================================== */}
            <div className="shrink-0 pt-4 border-t border-white/10 w-full">
              {/* ==================================================
                  Logged In User
              ================================================== */}
              {user ? (
                <button
                  type="button"
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer group text-left shadow-sm"
                  aria-haspopup="dialog"
                  aria-label="Open Profile Settings"
                >
                  {/* ------------------------------------------------
                      User Avatar
                  ------------------------------------------------ */}
                  <div className="w-10 h-10 rounded-xl border border-emerald-500/40 bg-[#161c28] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {user.avatar &&
                    user.avatar !==
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png" ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>

                  {/* ------------------------------------------------
                      User Information
                  ------------------------------------------------ */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-100 truncate">
                      {user.name || "User Account"}
                    </span>

                    <span className="text-[10px] text-slate-400 truncate font-medium">
                      {user.email || "Manage Profile"}
                    </span>
                  </div>
                </button>
              ) : (
                /* ==================================================
                   Logged Out User
                ================================================== */
                <button
                  type="button"
                  onClick={() => {
                    onClose();

                    if (onOpenSignIn) {
                      onOpenSignIn("signin");
                    }
                  }}
                  className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#161c28] to-[#1c2436] hover:from-emerald-500/10 hover:to-teal-500/10 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all duration-300 cursor-pointer shadow-lg group"
                  aria-label="Sign In or Register"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/25">
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
          </div>
        </div>
      )}

      {/* ========================================================
          Profile Modal
          
          IMPORTANT:
          This is OUTSIDE {isOpen && (...)}
          
          Therefore:
          Drawer closes -> Profile Modal stays available.
      ======================================================== */}
      <ProfileModal
        isOpen={isLocalProfileOpen}
        onClose={() => setIsLocalProfileOpen(false)}
        onOpenSignIn={onOpenSignIn}
      />
    </>
  );
}
