/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/HeroSection.js
 * Description: Hero section containing the typography and the integrated search/filter component.
 * ==============================================================================
 */

"use client";

import React, { useState } from "react";
import Toast from "@/app/components/ui/Toast";
import HeroFilterSection from "@/app/components/modules/home/HeroFilterSection";

export default function HeroSection({ selectedType, setSelectedType }) {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="relative isolate w-full pt-12 pb-32 sm:py-20 px-4 flex flex-col items-center justify-center text-center">
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        messageBn="অনুগ্রহ করে প্রথমে একটি প্রপার্টি টাইপ নির্বাচন করুন!"
        messageEn="Please select a property type first to apply filters."
      />

      <img
        src="/hero-bg.jpeg"
        alt="Apartment Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 brightness-[0.85] contrast-[1.05]"
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/5 z-[1] mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b11]/40 via-[#080b11]/60 to-[#080b11] z-[2] pointer-events-none" />

      {/* Hero Typography */}
      <div className="animate-hero-title relative z-10 max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl">
          YOURS TO RENT
        </h1>
        <p className="font-bangla text-xs sm:text-sm md:text-[18px] text-slate-300/90 mt-3 font-normal max-w-lg mx-auto tracking-wide">
          খুঁজে নিন আপনার পছন্দের ফ্ল্যাট, সাবলেট, মেস কিংবা বাণিজ্যিক স্পেস
        </p>
      </div>

      {/* Integrated Search Bar & Filter Modules */}
      <HeroFilterSection
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showToast={setShowToast}
      />
    </div>
  );
}
