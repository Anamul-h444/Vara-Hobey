/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/HeroFilterSection.js
 * Description: Hero filter section with single-column vertical stack for mobile and tablet screens.
 * ==============================================================================
 */

"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, MapPin, ChevronDown } from "lucide-react";
import Button from "@/app/components/ui/Button";
import CategorySelect from "@/app/components/ui/CategorySelect";
import LocationModal from "@/app/components/ui/LocationModal";
import AdvancedFilterModal from "@/app/components/modules/home/AdvancedFilterModal";

export default function HeroFilterSection({
  selectedType,
  setSelectedType,
  showToast,
}) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  const [locationObj, setLocationObj] = useState({
    division: { id: "", name: "" },
    district: { id: "", name: "" },
    upazila: { id: "", name: "" },
    unionZone: { id: "", name: "", type: "" },
    area: { id: "", name: "" },
  });

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
    return "Search by Location";
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 relative z-30 px-4">
      {/* 1. Quick Search Bar with Enhanced Glow */}
      <div className="animate-hero-search relative w-full max-w-3xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-cyan-500/40 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500" />

        <div className="relative rounded-full p-[1px] bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-cyan-400/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <div className="flex items-center bg-[#0b0f17]/95 backdrop-blur-xl rounded-full px-5 py-2.5">
            <Search className="w-5 h-5 text-emerald-400 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="Search by area, landmark or keyword..."
              className="font-sans w-full bg-transparent text-slate-100 px-3.5 py-2 text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 font-medium"
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

      {/* 2. Filter Modules Grid (1 column on mobile & tablet, 3 columns on large desktop) */}
      <div className="animate-hero-filter grid grid-cols-1 lg:grid-cols-3 gap-4 items-center text-left pb-12 md:pb-0">
        {/* Rental Type Selection */}
        <div className="w-full relative z-40">
          <CategorySelect
            label=""
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Search By Fare Category"
            searchable={true}
          />
        </div>

        {/* Location Selection Button */}
        <div className="w-full relative z-30">
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className={`group flex h-[50px] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left outline-none transition-all duration-300 ease-out cursor-pointer ${
              locationObj.division?.id
                ? "border-emerald-400/50 bg-[#141c29] shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "border-white/10 bg-[#121824]/90 hover:border-emerald-500/40 hover:bg-[#161f30]"
            }`}
          >
            <div className="min-w-0 flex-1 flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
              <span
                className={`truncate text-xs sm:text-sm font-medium ${
                  locationObj.division?.id
                    ? "text-emerald-400 font-semibold"
                    : "text-slate-400"
                }`}
              >
                {getLocationSummary()}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-slate-200" />
          </button>
        </div>

        {/* Advanced Filters Button */}
        <div className="w-full relative z-20">
          <button
            type="button"
            onClick={handleFilterClick}
            className="group flex h-[50px] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left outline-none transition-all duration-300 ease-out cursor-pointer border-white/10 bg-[#121824]/90 hover:border-emerald-500/40 hover:bg-[#161f30] shadow-sm"
          >
            <div className="min-w-0 flex-1 flex items-center gap-2.5">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-emerald-400 group-hover:rotate-90 transition-transform duration-300" />
              <span className="truncate text-xs sm:text-sm font-medium text-slate-400">
                Advanced Filters
              </span>
            </div>
            <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-[10px] font-bold text-emerald-400">+</span>
            </div>
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
