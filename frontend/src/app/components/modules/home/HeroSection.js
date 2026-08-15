'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Building2, 
  Banknote, 
  Compass, 
  SlidersHorizontal,
  Navigation,
  Landmark,
  MapPin
} from 'lucide-react';
import Button from '@/app/components/ui/Button';
import Toast from '@/app/components/ui/Toast';
import CustomSelect from '@/app/components/ui/CustomSelect';
import { propertyTypes, locationsData, budgetRanges } from '@/config/filterData';

export default function HeroSection({ onOpenFilter, selectedType, setSelectedType }) {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleFilterClick = () => {
    if (!selectedType) {
      setShowToast(true);
      return;
    }
    onOpenFilter();
  };

  return (
    <div className="relative isolate w-full pt-12 pb-32 sm:py-20 px-4 flex flex-col items-center justify-center text-center">
      
      {/* টোস্ট অ্যালার্ট */}
      <Toast 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        messageBn="অনুগ্রহ করে প্রথমে একটি প্রপার্টি টাইপ নির্বাচন করুন!"
        messageEn="Please select a property type first to apply filters."
      />

      {/* ১. ব্যাকগ্রাউন্ড ইমেজ */}
      <img
        src="/hero-bg.jpeg"
        alt="Apartment Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 brightness-[0.85] contrast-[1.05]"
      />

      {/* ২. অ্যাম্বার ও ডার্ক ওভারলে */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-yellow-500/5 z-[1] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b11]/40 via-[#080b11]/60 to-[#080b11] z-[2]" />

      {/* ৩. টাইটেল */}
      <div className="relative z-10 max-w-3xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl">
          YOURS TO RENT
        </h1>
        <p className="font-bangla text-xs sm:text-sm text-slate-300/90 mt-3 font-normal max-w-lg mx-auto tracking-wide">
          খুঁজে নিন আপনার পছন্দের ফ্ল্যাট, সাবলেট, মেস কিংবা বাণিজ্যিক স্পেস
        </p>
      </div>

      {/* ৪. কুইক সার্চ বার */}
      <div className="relative z-10 w-full max-w-2xl mx-auto mb-6 group">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-20 h-10 bg-purple-500/30 rounded-full blur-lg pointer-events-none group-hover:bg-purple-500/50 transition duration-500" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-20 h-10 bg-emerald-500/30 rounded-full blur-lg pointer-events-none group-hover:bg-emerald-500/50 transition duration-500" />

        <div className="relative rounded-full p-[1px] bg-gradient-to-r from-purple-500/60 via-white/15 to-emerald-400/60 shadow-2xl">
          <div className="flex items-center bg-[#0d111a]/85 backdrop-blur-2xl rounded-full px-3 py-1.5">
            <Search className="ml-2 w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="এলাকা বা ল্যান্ডমার্ক দিয়ে সহজে সার্চ করুন..."
              className="font-bangla w-full bg-transparent text-slate-200 px-3 py-1.5 text-xs sm:text-sm focus:outline-none placeholder:text-slate-500 font-normal"
            />
            <Button 
              variant="primary" 
              size="sm" 
              className="rounded-full px-5 py-1.5 text-xs font-medium shadow-none bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* ৫. রেসপন্সিভ ফিল্টার বার (ট্যাবলেটে পারফেক্ট গ্রিড + ডেস্কটপে ক্যাপসুল) */}
      <div className="relative z-30 w-full max-w-5xl mx-auto bg-[#0d111a]/80 backdrop-blur-2xl border border-white/15 rounded-3xl xl:rounded-full p-2 sm:p-3 xl:p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-2 sm:gap-2.5 xl:gap-0 items-center text-left">
          
          {/* ১. Type */}
          <div className="xl:border-r xl:border-white/10">
            <CustomSelect
              label="Type"
              icon={Building2}
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
              options={propertyTypes}
              placeholder="All Types"
            />
          </div>

          {/* ২. Division */}
          <div className="xl:border-r xl:border-white/10">
            <CustomSelect
              label="Division"
              icon={Compass}
              value={selectedDivision}
              onChange={(val) => {
                setSelectedDivision(val);
                setSelectedDistrict('');
                setSelectedThana('');
                setSelectedArea('');
              }}
              options={locationsData.divisions}
              placeholder="All Division"
            />
          </div>

          {/* ৩. District */}
          <div className="xl:border-r xl:border-white/10">
            <CustomSelect
              label="District"
              icon={MapPin}
              value={selectedDistrict}
              onChange={(val) => {
                setSelectedDistrict(val);
                setSelectedThana('');
                setSelectedArea('');
              }}
              options={selectedDivision ? locationsData.districts[selectedDivision] : []}
              placeholder="District"
              disabled={!selectedDivision}
              disabledHint="প্রথমে বিভাগ নির্বাচন করুন"
              searchable={true}
            />
          </div>

          {/* ৪. Thana */}
          <div className="xl:border-r xl:border-white/10">
            <CustomSelect
              label="Thana"
              icon={Landmark}
              value={selectedThana}
              onChange={(val) => {
                setSelectedThana(val);
                setSelectedArea('');
              }}
              options={selectedDistrict ? locationsData.thanas[selectedDistrict] : []}
              placeholder="Upazila / Thana"
              disabled={!selectedDistrict}
              disabledHint="প্রথমে জেলা নির্বাচন করুন"
              searchable={true}
            />
          </div>

          {/* ৫. Moholla / Area */}
          <div className="xl:border-r xl:border-white/10">
            <div className="px-3 py-2 flex flex-col justify-center hover:bg-white/[0.05] rounded-xl transition">
              <span className="text-[10px] font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Navigation className="w-3 h-3 text-amber-400" /> Moholla
              </span>
              <input
                type="text"
                placeholder="রোড / ব্লক..."
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="font-bangla w-full bg-transparent text-xs font-normal text-slate-100 focus:outline-none placeholder:text-slate-500 mt-0.5"
              />
            </div>
          </div>

          {/* ৬. Budget */}
          <div className="xl:border-r xl:border-white/10">
            <CustomSelect
              label="Budget"
              icon={Banknote}
              value={selectedBudget}
              onChange={(val) => setSelectedBudget(val)}
              options={budgetRanges}
              placeholder="Any Budget"
            />
          </div>

          {/* ৭. Filters Button (ট্যাবলেটে ফুল উইডথ ও ব্যালান্সড) */}
          <div className="p-1 xl:pl-2 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-1">
            <button
              type="button"
              onClick={handleFilterClick}
              className="w-full h-11 xl:h-10 rounded-xl xl:rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center gap-1.5 text-xs font-semibold shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}