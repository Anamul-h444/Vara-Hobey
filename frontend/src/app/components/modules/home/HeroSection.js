/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/HeroSection.js
 * Description: Hero section with soft, eye-friendly search bar glow and premium filter UI.
 * ==============================================================================
 */

"use client";

import React, { useState } from "react";
import { Search, Building2, SlidersHorizontal, MapPin } from "lucide-react";

import Button from "@/app/components/ui/Button";
import Toast from "@/app/components/ui/Toast";
import CustomSelect from "@/app/components/ui/CustomSelect";
import LocationModal from "@/app/components/ui/LocationModal";
import AdvancedFilterModal from "@/app/components/modules/home/AdvancedFilterModal";
import { propertyTypes } from "@/config/filterData";

export default function HeroSection({ selectedType, setSelectedType }) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [locationObj, setLocationObj] = useState({
    division: "",
    district: "",
    upazila: "",
    unionZone: "",
    area: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleFilterClick = () => {
    if (!selectedType) {
      setShowToast(true);
      return;
    }
    setIsAdvancedModalOpen(true);
  };

  const getLocationSummary = () => {
    if (locationObj.area) return locationObj.area;
    if (locationObj.unionZone) return locationObj.unionZone;
    if (locationObj.upazila) return locationObj.upazila;
    if (locationObj.district) return locationObj.district;
    if (locationObj.division) return locationObj.division;
    return "Select Location...";
  };

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

      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/5 z-[1] mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b11]/40 via-[#080b11]/60 to-[#080b11] z-[2] pointer-events-none" />

      {/* Hero Typography */}
      <div className="animate-hero-title relative z-10 max-w-3xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl">
          YOURS TO RENT
        </h1>
        <p className="font-bangla text-xs sm:text-sm text-slate-300/90 mt-3 font-normal max-w-lg mx-auto tracking-wide">
          খুঁজে নিন আপনার পছন্দের ফ্ল্যাট, সাবলেট, মেস কিংবা বাণিজ্যিক স্পেস
        </p>
      </div>

      {/* Quick Search Bar with Soft & Balanced Glow */}
      <div className="animate-hero-search relative z-10 w-full max-w-2xl mx-auto mb-8 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-cyan-500/40 rounded-full blur-sm opacity-30 group-hover:opacity-70 transition duration-500" />

        <div className="relative rounded-full p-[1px] bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-400/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <div className="flex items-center bg-[#0b0f17] rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-emerald-400/80 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="এলাকা বা ল্যান্ডমার্ক দিয়ে সহজে সার্চ করুন..."
              className="font-bangla w-full bg-transparent text-slate-200 px-3 py-1.5 text-xs sm:text-sm focus:outline-none placeholder:text-slate-500 font-normal"
            />
            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-6 py-2.5 text-xs font-bold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Clean Filter Module */}
      <div className="animate-hero-filter relative z-30 w-full max-w-4xl mx-auto bg-[#0b1019]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-left">
          {/* 1. Property Type */}
          <div className="bg-[#111726]/90 border border-white/10 rounded-2xl p-1 hover:border-emerald-500/40 transition-all duration-300">
            <CustomSelect
              label="Type"
              icon={Building2}
              value={selectedType}
              onChange={setSelectedType}
              options={propertyTypes}
              placeholder="All Types"
              searchable={true}
            />
          </div>

          {/* 2. Interactive Location Modal Trigger */}
          <div
            onClick={() => setIsLocationModalOpen(true)}
            className="px-4 py-3 flex flex-col justify-center rounded-2xl transition-all duration-300 cursor-pointer border bg-[#111726]/90 border-white/10 hover:border-emerald-500/50 hover:bg-[#161f33] h-full min-h-[58px] group shadow-inner"
          >
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              Location
            </span>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-semibold truncate ${locationObj.area || locationObj.division ? "text-emerald-300" : "text-slate-300"}`}
              >
                {getLocationSummary()}
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30 shrink-0 ml-1 group-hover:bg-emerald-500/25 transition-colors">
                Browse
              </span>
            </div>
          </div>

          {/* 3. Advanced Filters Action Button */}
          <div>
            <button
              type="button"
              onClick={handleFilterClick}
              className="w-full h-full min-h-[58px] rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 flex items-center justify-center gap-2 text-xs font-extrabold shadow-[0_0_20px_rgba(20,184,166,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal Component */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={(loc) => setLocationObj(loc)}
      />

      {/* Advanced Filter Modal Component */}
      <AdvancedFilterModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        selectedType={selectedType}
      />
    </div>
  );
}
