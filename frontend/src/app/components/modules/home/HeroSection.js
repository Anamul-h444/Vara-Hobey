'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Building2, 
  Banknote, 
  Compass, 
  SlidersHorizontal,
  Navigation,
  Landmark
} from 'lucide-react';
import Button from '@/app/components/ui/Button';
import { propertyTypes, locationsData, budgetRanges } from '@/config/filterData';

export default function HeroSection({ onOpenFilter, selectedType, setSelectedType }) {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  // Handle Type Not Selected Error Toast
  const handleFilterClick = () => {
    if (!selectedType) {
      alert('Please select a Property Type first to use Advanced Filters!');
      return;
    }
    onOpenFilter();
  };

  return (
    <div className="relative isolate w-full pt-12 pb-16 sm:py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* 1. Background Apartment Image */}
      <img
        src="/hero-bg.jpeg"
        alt="Apartment Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 brightness-95 contrast-105"
      />

      {/* 2. Amber & Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-yellow-500/10 z-[1] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/30 via-[#0b0f17]/40 to-[#0b0f17] z-[2]" />

      {/* 3. Hero Big Title */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Yours To Rent
        </h1>
      </div>

      {/* 4. MAIN FLOATING SEARCH CAPSULE */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mb-5 group">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-24 h-12 bg-purple-600/40 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/60 transition duration-500" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-12 bg-emerald-500/40 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/60 transition duration-500" />

        <div className="relative rounded-2xl sm:rounded-full p-[1.5px] bg-gradient-to-r from-purple-500/80 via-white/10 to-emerald-400/80 shadow-2xl transition duration-300">
          <div className="flex items-center bg-[#10141f]/90 backdrop-blur-2xl rounded-2xl sm:rounded-full p-2">
            <Search className="ml-3 sm:ml-4 w-5 h-5 text-purple-300/80 shrink-0" />
            <input
              type="text"
              placeholder="Quick search by keywords or landmark..."
              className="w-full bg-transparent text-white px-3 py-2 text-sm sm:text-base focus:outline-none placeholder:text-slate-400 font-medium"
            />
            <Button 
              variant="primary" 
              size="sm" 
              className="rounded-full px-5 py-2 text-xs sm:text-sm font-bold shadow-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* 5. FLOATING SMART FILTER BAR (Type, Division, District, Upazila/Thana, Moholla, Budget, Filter Button) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto bg-[#11151f]/80 backdrop-blur-xl border border-white/15 rounded-3xl p-3 sm:p-4 shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 items-center text-left">
          
          {/* ১. Property Type */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-400" /> Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
            >
              <option value="" className="bg-[#11151f] text-slate-400">Select Type</option>
              {propertyTypes.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#11151f] text-white">
                  {t.name} ({t.bnName})
                </option>
              ))}
            </select>
          </div>

          {/* ২. Division (বিভাগ) */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-purple-400" /> Division
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict('');
                setSelectedThana('');
                setSelectedArea('');
              }}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
            >
              <option value="" className="bg-[#11151f] text-slate-400">All Division</option>
              {locationsData.divisions.map((d) => (
                <option key={d.id} value={d.id} className="bg-[#11151f] text-white">
                  {d.name} ({d.bnName})
                </option>
              ))}
            </select>
          </div>

          {/* ৩. District (জেলা) */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedThana('');
                setSelectedArea('');
              }}
              disabled={!selectedDivision}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5 disabled:opacity-40"
            >
              <option value="" className="bg-[#11151f] text-slate-400">Select District</option>
              {selectedDivision && locationsData.districts[selectedDivision]?.map((dist) => (
                <option key={dist.id} value={dist.id} className="bg-[#11151f] text-white">
                  {dist.name} ({dist.bnName})
                </option>
              ))}
            </select>
          </div>

          {/* ৪. Upazila / Thana (উপজেলা / থানা) */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Landmark className="w-3 h-3 text-pink-400" /> Upazila / Thana
            </label>
            <select
              value={selectedThana}
              onChange={(e) => {
                setSelectedThana(e.target.value);
                setSelectedArea('');
              }}
              disabled={!selectedDistrict}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5 disabled:opacity-40"
            >
              <option value="" className="bg-[#11151f] text-slate-400">Select Thana</option>
              {selectedDistrict && locationsData.thanas[selectedDistrict]?.map((thana, idx) => (
                <option key={idx} value={thana.name || thana} className="bg-[#11151f] text-white">
                  {typeof thana === 'object' ? `${thana.name} (${thana.bnName})` : thana}
                </option>
              ))}
            </select>
          </div>

          {/* ৫. Moholla / Area (মহল্লা / এলাকা) */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-amber-400" /> Moholla / মহল্লা
            </label>
            <input
              type="text"
              placeholder="e.g. Road 4, Block C"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none placeholder:text-slate-500 mt-0.5"
            />
          </div>

          {/* ৬. Budget (বাজেট) */}
          <div className="bg-[#161c28]/90 border border-white/10 rounded-2xl p-2 flex flex-col justify-center">
            <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Banknote className="w-3 h-3 text-emerald-400" /> Budget
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer mt-0.5"
            >
              <option value="" className="bg-[#11151f] text-slate-400">Any Budget</option>
              {budgetRanges.map((b, idx) => (
                <option key={idx} value={b.label} className="bg-[#11151f] text-white">
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* ৭. Advanced Filter Button */}
          <button
            type="button"
            onClick={handleFilterClick}
            className="col-span-2 sm:col-span-1 lg:col-span-1 h-full min-h-[48px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 font-bold text-xs shadow-[0_0_15px_rgba(147,51,234,0.4)] transition cursor-pointer active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>

        </div>
      </div>

    </div>
  );
}