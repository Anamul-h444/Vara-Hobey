/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/dashboard/layout/DashboardSidebar.js
 *
 * Description:
 * Left desktop sidebar with:
 * - User navigation
 * - Dynamic My Drafts count
 * - Add Property button
 * - Modular LogoutButton
 * ==============================================================================
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Building2, PlusCircle } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/app/components/common/LogoutButton";
import Toast from "@/app/components/ui/Toast";

export default function UserDashboardSidebar({
  navItems = [],
  roleLabel = "Admin Panel",
  onOpenSignIn,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuth();

  const [showAuthToast, setShowAuthToast] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  const timerRef = useRef(null);

  // ============================================================================
  // GET CURRENT USER ID
  // ============================================================================

  const getCurrentUserId = () => {
    try {
      if (user?._id) return String(user._id);
      if (user?.id) return String(user.id);

      const userStr =
        localStorage.getItem("vara_hobe_user") || localStorage.getItem("user");

      if (!userStr) return null;

      const userObj = JSON.parse(userStr);

      return userObj?._id
        ? String(userObj._id)
        : userObj?.id
          ? String(userObj.id)
          : null;
    } catch (error) {
      return null;
    }
  };

  // ============================================================================
  // UPDATE DRAFT COUNT
  // ============================================================================

  const updateDraftCount = () => {
    try {
      const storedDrafts = JSON.parse(
        localStorage.getItem("vara_hobe_drafts") || "[]",
      );

      if (!Array.isArray(storedDrafts)) {
        setDraftCount(0);
        return;
      }

      const currentUserId = getCurrentUserId();

      if (!currentUserId) {
        setDraftCount(0);
        return;
      }

      const userDrafts = storedDrafts.filter(
        (draft) => String(draft.userId) === String(currentUserId),
      );

      setDraftCount(userDrafts.length);
    } catch (error) {
      setDraftCount(0);
    }
  };

  // ============================================================================
  // INITIAL LOAD
  // ============================================================================

  useEffect(() => {
    updateDraftCount();

    const handleStorageChange = () => {
      updateDraftCount();
    };

    window.addEventListener("storage", handleStorageChange);

    /*
     * localStorage একই tab থেকে পরিবর্তন করলে browser
     * সাধারণত "storage" event দেয় না।
     *
     * তাই একটি ছোট interval রাখা হয়েছে যাতে
     * Save / Delete করার পর sidebar count update হয়।
     */
    const interval = setInterval(() => {
      updateDraftCount();
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [user]);

  // ============================================================================
  // ADD PROPERTY
  // ============================================================================

  const handleAddFareClick = (e) => {
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

    router.push("/user/dashboard/add-property");
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <Toast
        isVisible={showAuthToast}
        onClose={() => setShowAuthToast(false)}
        messageBn="বিজ্ঞাপন বা ভাড়া দিতে অনুগ্রহ করে প্রথমে লগইন করুন!"
        messageEn="Please sign in first to add a fare or property."
      />

      <aside
        className="
          hidden
          lg:flex
          fixed
          left-0
          top-0
          bottom-0
          w-72
          bg-[#0c1019]/95
          backdrop-blur-2xl
          border-r
          border-white/10
          z-40
          flex-col
          justify-between
          py-6
          px-5
          shadow-[5px_0_30px_rgba(0,0,0,0.5)]
          transition-all
          duration-300
        "
      >
        {/* ======================================================================
            TOP SECTION
        ======================================================================= */}

        <div>
          {/* BRAND HEADER */}

          <div className="flex items-center gap-3.5 px-2 pb-5 border-b border-white/10">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-gradient-to-tr
                from-emerald-500
                to-teal-400
                flex
                items-center
                justify-center
                text-slate-950
                font-black
                shadow-[0_0_20px_rgba(16,185,129,0.35)]
                shrink-0
              "
            >
              <Building2 className="w-6 h-6" />
            </div>

            <div>
              <h2
                className="
                  text-sm
                  font-black
                  tracking-widest
                  uppercase
                  text-slate-100
                  leading-tight
                "
              >
                VARA <span className="text-emerald-400">HOBE</span>
              </h2>

              <span
                className="
                  text-xs
                  text-emerald-400
                  font-mono
                  tracking-wider
                  block
                  mt-1
                  uppercase
                  font-semibold
                "
              >
                {roleLabel}
              </span>
            </div>
          </div>

          {/* ====================================================================
              ADD PROPERTY BUTTON
          ===================================================================== */}

          <div className="mt-5 px-1">
            <Link
              href="/user/dashboard/add-property"
              onClick={handleAddFareClick}
              className="
                w-full
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                ease-out
                active:scale-95
                cursor-pointer
                bg-gradient-to-tr
                from-emerald-500
                via-teal-500
                to-cyan-500
                hover:from-emerald-400
                hover:to-cyan-400
                text-slate-950
                shadow-[0_0_20px_rgba(16,185,129,0.35)]
                hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]
                border
                border-emerald-300/30
                group
              "
            >
              <PlusCircle
                className="
                  w-6
                  h-6
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-90
                  text-slate-950
                "
              />

              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-black tracking-tight font-bangla text-slate-950">
                  ভাড়া দিন
                </span>

                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-900 opacity-90">
                  Add Fare
                </span>
              </div>
            </Link>
          </div>

          {/* DIVIDER */}

          <div className="w-full h-[1px] bg-white/10 my-4" />

          {/* ====================================================================
              NAVIGATION
          ===================================================================== */}

          <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              const isDraftItem =
                item.isDrafts || item.href === "/user/dashboard/drafts";

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-2xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ease-out
                    active:scale-95
                    cursor-pointer

                    ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] translate-x-1 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`
                        w-5
                        h-5
                        transition-transform
                        duration-300
                        group-hover:scale-110

                        ${
                          isActive
                            ? "text-emerald-400"
                            : "text-slate-300 group-hover:text-white"
                        }
                      `}
                    />

                    <span className="tracking-wide">{item.name}</span>
                  </div>

                  {/* ============================================================
                      MY DRAFTS COUNT
                  ============================================================= */}

                  {isDraftItem && draftCount > 0 && (
                    <span
                      className="
                        min-w-[26px]
                        h-6
                        px-2
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[11px]
                        font-bold
                        bg-emerald-500/15
                        text-emerald-400
                        border
                        border-emerald-500/25
                      "
                    >
                      {draftCount}
                    </span>
                  )}

                  {/* Other static badges */}

                  {!isDraftItem && item.badge && (
                    <span
                      className="
                        px-2.5
                        py-0.5
                        rounded-full
                        text-xs
                        font-bold
                        bg-amber-500/20
                        text-amber-300
                        border
                        border-amber-500/30
                        animate-pulse
                      "
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ======================================================================
            LOGOUT
        ======================================================================= */}

        <div className="pt-5 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
