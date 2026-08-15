'use client';

import React, { useState } from 'react';
import { X, Flame, Car, ShieldCheck, Wifi, Wind, Check } from 'lucide-react';
import Button from '@/app/components/ui/Button';
import { propertyTypes } from '@/config/filterData';

export default function AdvancedFilterModal({ isOpen, onClose, selectedType }) {
  if (!isOpen) return null;

  const currentTypeObj = propertyTypes.find(t => t.id === selectedType);
  const isResidential = currentTypeObj?.category === 'residential';

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop Close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Floating Modal Content */}
      <div className="relative z-10 w-full max-w-xl bg-[#0d111a] border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black text-white">
              Advanced Filters
            </h3>
            <p className="text-xs text-emerald-400 font-semibold">
              Category: {currentTypeObj?.name || 'Selected Property'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. RESIDENTIAL CONDITIONAL OPTIONS */}
        {isResidential ? (
          <div className="space-y-5 text-left">
            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Bedrooms</label>
              <div className="grid grid-cols-5 gap-2">
                {['1', '2', '3', '4', '5+'].map((bed) => (
                  <button key={bed} className="py-2 rounded-xl bg-[#161c28] border border-white/10 hover:border-emerald-500 text-xs font-bold text-slate-200 transition">
                    {bed} Bed
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Bathrooms</label>
              <div className="grid grid-cols-4 gap-2">
                {['1', '2', '3', '4+'].map((bath) => (
                  <button key={bath} className="py-2 rounded-xl bg-[#161c28] border border-white/10 hover:border-emerald-500 text-xs font-bold text-slate-200 transition">
                    {bath} Bath
                  </button>
                ))}
              </div>
            </div>

            {/* Gas Facility */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Gas Supply</label>
              <div className="grid grid-cols-3 gap-2">
                {['Line Gas', 'Cylinder Gas', 'Any'].map((gas) => (
                  <button key={gas} className="py-2 rounded-xl bg-[#161c28] border border-white/10 hover:border-emerald-500 text-xs font-bold text-slate-200 transition">
                    {gas}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Facilities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['Lift / Elevator', 'Car Parking', 'Generator Backup', '24/7 Security', 'Balcony', 'WiFi Ready'].map((fac) => (
                  <label key={fac} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#161c28] border border-white/10 cursor-pointer hover:border-emerald-500/50 text-slate-300">
                    <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0" />
                    <span>{fac}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 2. COMMERCIAL CONDITIONAL OPTIONS (Office, Shop, Warehouse) */
          <div className="space-y-5 text-left">
            {/* Space Size (Sq Ft) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Space Size (Square Feet)</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Min Sq Ft (e.g. 500)" className="bg-[#161c28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
                <input type="number" placeholder="Max Sq Ft (e.g. 3000)" className="bg-[#161c28] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            {/* Floor Preference */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Floor Position</label>
              <div className="grid grid-cols-3 gap-2">
                {['Ground Floor', '1st - 3rd Floor', 'Top Floor'].map((fl) => (
                  <button key={fl} className="py-2 rounded-xl bg-[#161c28] border border-white/10 hover:border-emerald-500 text-xs font-bold text-slate-200 transition">
                    {fl}
                  </button>
                ))}
              </div>
            </div>

            {/* Commercial Facilities */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Commercial Features</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['3-Phase Electricity', 'Cargo Lift', 'Customer Parking', 'Loading Zone', 'Attached Washroom', 'Fire Safety'].map((com) => (
                  <label key={com} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#161c28] border border-white/10 cursor-pointer hover:border-emerald-500/50 text-slate-300">
                    <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0" />
                    <span>{com}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2">
            Reset All
          </button>
          <Button variant="primary" size="md" onClick={onClose} className="rounded-xl px-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold">
            Apply Filters
          </Button>
        </div>

      </div>
    </div>
  );
}