/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/HeroFilterSection.js
 * Description: Hero filter section with enhanced UI/UX, readable typography, and dynamic rent types.
 * ==============================================================================
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Building2,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import CustomSelect from "@/app/components/ui/CustomSelect";
import LocationModal from "@/app/components/ui/LocationModal";
import AdvancedFilterModal from "@/app/components/modules/home/AdvancedFilterModal";

export default function HeroFilterSection({
  selectedType,
  setSelectedType,
  showToast,
}) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  // ডাইনামিক প্রপার্টি টাইপের জন্য স্টেট
  const [propertyTypes, setPropertyTypes] = useState([]);

  const [locationObj, setLocationObj] = useState({
    division: { id: "", name: "" },
    district: { id: "", name: "" },
    upazila: { id: "", name: "" },
    unionZone: { id: "", name: "", type: "" },
    area: { id: "", name: "" },
  });

  // ব্যাকএন্ড থেকে ডাইনামিক রেন্ট টাইপ ফেচ এবং ফরম্যাট করা
  useEffect(() => {
    fetch("http://localhost:5000/api/rent-types")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          throw new Error(
            "API did not return JSON. Endpoint might be incorrect.",
          );
        }
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const formattedTypes = data.data.map((item) => ({
            id: item.type,
            name: item.name,
            bnName: item.bnName,
            category: item.category,
          }));
          setPropertyTypes(formattedTypes);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch rent types:", err.message),
      );
  }, []);

  const handleFilterClick = () => {
    if (!selectedType) {
      showToast(true);
      return;
    }
    setIsAdvancedModalOpen(true);
  };

  const getLocationSummary = () => {
    if (locationObj.area?.name) return locationObj.area.name;
    if (locationObj.unionZone?.name) return locationObj.unionZone.name;
    if (locationObj.upazila?.name) return locationObj.upazila.name;
    if (locationObj.district?.name) return locationObj.district.name;
    if (locationObj.division?.name) return locationObj.division.name;
    return "All Division / সকল বিভাগ";
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 relative z-30 px-4">
      {/* 1. Quick Search Bar with Original Emerald Glow */}
      <div className="animate-hero-search relative w-full max-w-3xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-cyan-500/40 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500" />

        <div className="relative rounded-full p-[1px] bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-cyan-400/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <div className="flex items-center bg-[#0b0f17]/95 backdrop-blur-xl rounded-full px-5 py-2.5">
            <Search className="w-5 h-5 text-emerald-400 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="এলাকা বা ল্যান্ডমার্ক দিয়ে সহজে সার্চ করুন..."
              className="font-bangla w-full bg-transparent text-slate-100 px-3.5 py-2 text-sm sm:text-base focus:outline-none placeholder:text-slate-400 font-medium"
            />
            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-7 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Filter Modules Grid */}
      <div className="animate-hero-filter grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 items-stretch text-left pb-12 md:pb-0">
        {/* Rental Type Selection Box */}
        <div className="bg-[#121824]/95 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 shadow-2xl relative z-40 group">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide font-bangla">
                ভাড়ার ধরন নির্বাচন করুন
              </span>
              <Building2 className="w-4 h-4 text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block mb-3">
              SELECT RENTAL TYPE
            </span>
          </div>
          <div className="w-full">
            <CustomSelect
              label=""
              icon={null}
              value={selectedType}
              onChange={setSelectedType}
              options={propertyTypes}
              placeholder="All Types"
              searchable={true}
            />
          </div>
        </div>

        {/* Location Selection Box */}
        <div
          onClick={() => setIsLocationModalOpen(true)}
          className="bg-[#121824]/95 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-2xl relative z-30 group"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide font-bangla">
                লোকেশন অনুযায়ী ভাড়া খুঁজুন
              </span>
              <MapPin className="w-4 h-4 text-emerald-400 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block mb-2">
              SEARCH RENTALS BY LOCATION
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pt-1">
            <span
              className={`truncate ${locationObj.division?.id ? "text-emerald-400" : "text-slate-200"}`}
            >
              {getLocationSummary()}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Advanced Filters Action Button */}
        <div className="relative z-20">
          <button
            type="button"
            onClick={handleFilterClick}
            className="w-full h-full min-h-[105px] rounded-3xl bg-[#121824]/95 hover:bg-[#161f30] border border-white/10 hover:border-emerald-500/50 text-slate-100 flex flex-col items-center justify-center text-center p-5 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-2xl group"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400 group-hover:rotate-95 transition-transform duration-300" />
              <span className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors font-bangla">
                বিস্তারিত ফিল্টার করুন
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              ADVANCED FILTERS
            </span>
          </button>
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
