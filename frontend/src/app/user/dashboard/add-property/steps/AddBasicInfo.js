/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/user/dashboard/add-property/steps/AddBasicInfo.js
 *
 * Description:
 * Step 1 Component with professional dark UI and consistent color system.
 * ==============================================================================
 */

"use client";

import React from "react";

export default function AddBasicInfo({ formData, onChange }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ==========================================================================
          STEP TITLE
      =========================================================================== */}

      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
          ধাপ ১: সাধারণ তথ্য ও বিবরণ
        </h2>

        <p className="text-xs sm:text-sm text-emerald-400/90 font-sans font-medium">
          Step 1: Basic Information & Description
        </p>
      </div>

      {/* ==========================================================================
          LISTING TITLE
      =========================================================================== */}

      <div className="space-y-2.5">
        <label
          htmlFor="listing-title"
          className="
            block
            text-xs
            sm:text-sm
            font-semibold
            tracking-wide
          "
        >
          <span className="text-slate-200">বিজ্ঞাপনের শিরোনাম</span>

          <span className="mx-1.5 text-slate-600">—</span>

          <span className="font-sans text-emerald-400 font-medium">
            Listing Title
          </span>
        </label>

        <input
          id="listing-title"
          type="text"
          name="title"
          required
          placeholder="e.g. Modern 2-Bedroom Apartment for Rent in Uttara"
          value={formData.title}
          onChange={onChange}
          className="
            w-full
            h-12
            sm:h-13
            px-4
            sm:px-5
            bg-slate-950
            border
            border-slate-700
            rounded-xl
            text-sm
            sm:text-base
            text-slate-100
            placeholder:text-slate-500
            shadow-inner
            transition-all
            duration-200
            focus:outline-none
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/10
            hover:border-slate-600
          "
        />
      </div>

      {/* ==========================================================================
          DESCRIPTION
      =========================================================================== */}

      <div className="space-y-2.5">
        <label
          htmlFor="listing-description"
          className="
            block
            text-xs
            sm:text-sm
            font-semibold
            tracking-wide
          "
        >
          <span className="text-slate-200">বিস্তারিত বিবরণ</span>

          <span className="mx-1.5 text-slate-600">—</span>

          <span className="font-sans text-emerald-400 font-medium">
            Description
          </span>
        </label>

        <textarea
          id="listing-description"
          name="details"
          rows="4"
          placeholder="e.g. Spacious 2-bedroom flat with modern amenities and balcony…."
          value={formData.details}
          onChange={onChange}
          className="
            w-full
            min-h-[120px]
            sm:min-h-[135px]
            px-4
            sm:px-5
            py-3.5
            sm:py-4
            bg-slate-950
            border
            border-slate-700
            rounded-xl
            text-sm
            sm:text-base
            text-slate-100
            placeholder:text-slate-500
            shadow-inner
            transition-all
            duration-200
            focus:outline-none
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/10
            hover:border-slate-600
            resize-none
            leading-relaxed
          "
        />
      </div>
    </div>
  );
}
