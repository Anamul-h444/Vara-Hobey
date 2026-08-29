"use client";

import React from "react";
import { Check } from "lucide-react";

export default function CommercialFilters({
  selectedFloor,
  setSelectedFloor,
  isOfficeOrShop,
  isWarehouse,
  amenities,
  toggleAmenity,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Space Size (বর্গফুট / Sq Ft)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min Sq Ft (e.g. 500)"
            className="bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <input
            type="number"
            placeholder="Max Sq Ft (e.g. 5000)"
            className="bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Floor Level (ফ্লোর লেভেল)
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {["Ground Floor", "1st - 4th", "Top / Other"].map((floor) => (
            <button
              key={floor}
              type="button"
              onClick={() =>
                setSelectedFloor(selectedFloor === floor ? "" : floor)
              }
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFloor === floor
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      {isOfficeOrShop && (
        <div>
          <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
            Basic Facilities (বেসিক সুবিধা)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: "Electricity Available", label: "Electricity Available" },
              { id: "Water Supply", label: "Water Supply" },
              { id: "Attached Washroom", label: "Attached Washroom" },
              { id: "Public Toilet", label: "Public Toilet" },
            ].map((facility) => {
              const isChecked = amenities.includes(facility.id);
              return (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => toggleAmenity(facility.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                    isChecked
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                      : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-500 bg-black/20"}`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="truncate">{facility.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isWarehouse && (
        <div>
          <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
            Warehouse Facilities (গুদাম সুবিধা)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                id: "Electricity Connection Available",
                label: "Electricity Connection Available",
              },
              { id: "Wide Entrance (Truck)", label: "Wide Entrance (Truck)" },
              { id: "Loading Zone", label: "Loading Zone" },
              { id: "Security / CCTV", label: "Security / CCTV" },
            ].map((wh) => {
              const isChecked = amenities.includes(wh.id);
              return (
                <button
                  key={wh.id}
                  type="button"
                  onClick={() => toggleAmenity(wh.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                    isChecked
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                      : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-500 bg-black/20"}`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="truncate">{wh.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
