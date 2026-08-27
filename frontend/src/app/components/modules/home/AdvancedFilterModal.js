/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/AdvancedFilterModal.js
 * Description: Centered glassmorphism modal for granular residential & commercial filters.
 * ==============================================================================
 */

'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, RotateCcw } from 'lucide-react';
import Button from '@/app/components/ui/Button';
import { propertyTypes } from '@/config/filterData';

export default function AdvancedFilterModal({ isOpen, onClose, selectedType }) {
  const [selectedBed, setSelectedBed] = useState('');
  const [selectedBath, setSelectedBath] = useState('');
  const [selectedGas, setSelectedGas] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [amenities, setAmenities] = useState([]);

  if (!isOpen) return null;

  const currentTypeObj = propertyTypes.find((t) => t.id === selectedType);
  const isResidential = currentTypeObj?.category === 'residential';

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleReset = () => {
    setSelectedBed('');
    setSelectedBath('');
    setSelectedGas('');
    setSelectedFloor('');
    setAmenities([]);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Centered Glassmorphism Modal Box */}
      <div className="relative w-full max-w-lg bg-[#0c1019]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* TOP: Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Advanced Filters
              </h3>
            </div>
            <p className="font-bangla text-xs text-slate-400 mt-1">
              ক্যাটাগরি: <span className="text-emerald-300 font-medium">{currentTypeObj?.name || 'All'} ({currentTypeObj?.bnName || 'সকল'})</span>
            </p>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MIDDLE: Scrollable Filter Options */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 text-left pr-1 scrollbar-thin scrollbar-thumb-white/10">
          
          {isResidential ? (
            /* RESIDENTIAL FILTERS */
            <>
              {/* Bedrooms */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Bedrooms (বেডরুম)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['1', '2', '3', '4', '5+'].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setSelectedBed(selectedBed === bed ? '' : bed)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                        selectedBed === bed
                          ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      {bed} Bed
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Bathrooms (বাথরুম)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '4+'].map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() => setSelectedBath(selectedBath === bath ? '' : bath)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                        selectedBath === bath
                          ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      {bath} Bath
                    </button>
                  ))}
                </div>
              </div>

              {/* Gas Supply */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Gas Connection (গ্যাস সুবিধা)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'line', label: 'Line Gas', bn: 'লাইনের গ্যাস' },
                    { id: 'cylinder', label: 'Cylinder', bn: 'সিলিন্ডার' },
                    { id: 'any', label: 'Any', bn: 'যেকোনো' }
                  ].map((gas) => (
                    <button
                      key={gas.id}
                      type="button"
                      onClick={() => setSelectedGas(selectedGas === gas.id ? '' : gas.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex flex-col items-center justify-center active:scale-95 ${
                        selectedGas === gas.id
                          ? 'bg-gradient-to-tr from-emerald-500/25 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{gas.label}</span>
                      <span className="font-bangla text-[10px] text-slate-400 mt-0.5">{gas.bn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities / Amenities */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Amenities (সুযোগ-সুবিধা)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Lift / Elevator',
                    'Car Parking',
                    'Generator Backup',
                    '24/7 Security Guard',
                    'Attached Balcony',
                    'WiFi Facility'
                  ].map((item) => {
                    const isChecked = amenities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAmenity(item)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-normal transition-all duration-200 text-left cursor-pointer active:scale-[0.98] ${
                          isChecked
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                            : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors duration-200 ${
                          isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-black/20'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3] animate-in zoom-in duration-150" />}
                        </div>
                        <span className="truncate">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* COMMERCIAL FILTERS */
            <>
              {/* Space Size */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Space Size (Square Feet)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <input 
                    type="number" 
                    placeholder="Min Sq Ft (e.g. 500)" 
                    className="bg-[#141923] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors duration-200" 
                  />
                  <input 
                    type="number" 
                    placeholder="Max Sq Ft (e.g. 5000)" 
                    className="bg-[#141923] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors duration-200" 
                  />
                </div>
              </div>

              {/* Floor Level */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Floor Level (ফ্লোর)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Ground Floor', '1st - 4th', 'Top Floor'].map((floor) => (
                    <button
                      key={floor}
                      type="button"
                      onClick={() => setSelectedFloor(selectedFloor === floor ? '' : floor)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                        selectedFloor === floor
                          ? 'bg-gradient-to-tr from-emerald-500/25 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commercial Features */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Commercial Features
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '3-Phase Electricity',
                    'Cargo / Big Lift',
                    'Customer Parking',
                    'Loading Zone',
                    'Attached Washroom',
                    'Fire Safety System'
                  ].map((item) => {
                    const isChecked = amenities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAmenity(item)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-normal transition-all duration-200 text-left cursor-pointer active:scale-[0.98] ${
                          isChecked
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                            : 'bg-[#141923] text-slate-300 border border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors duration-200 ${
                          isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-black/20'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3] animate-in zoom-in duration-150" />}
                        </div>
                        <span className="truncate">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>

        {/* BOTTOM: Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors duration-200 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="rounded-xl px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95"
          >
            Apply Filters
          </Button>
        </div>

      </div>

    </div>
  );
}