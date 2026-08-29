"use client";

import React from "react";
import { Check } from "lucide-react";

export default function ResidentialFilters({
  selectedBed,
  setSelectedBed,
  selectedBath,
  setSelectedBath,
  selectedGas,
  setSelectedGas,
  amenities,
  toggleAmenity,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Bedrooms (বেডরুম)
        </label>
        <div className="grid grid-cols-5 gap-2.5">
          {["1", "2", "3", "4", "5+"].map((bed) => (
            <button
              key={bed}
              type="button"
              onClick={() => setSelectedBed(selectedBed === bed ? "" : bed)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                selectedBed === bed
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              {bed} Bed
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Bathrooms (বাথরুম)
        </label>
        <div className="grid grid-cols-4 gap-2.5">
          {["1", "2", "3", "4+"].map((bath) => (
            <button
              key={bath}
              type="button"
              onClick={() => setSelectedBath(selectedBath === bath ? "" : bath)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                selectedBath === bath
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              {bath} Bath
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Gas Connection (গ্যাস সুবিধা)
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "line", label: "Line Gas", bn: "লাইনের গ্যাস" },
            { id: "cylinder", label: "Cylinder Gas", bn: "সিলিন্ডার গ্যাস" },
            { id: "any", label: "Any", bn: "যেকোনো" },
          ].map((gas) => (
            <button
              key={gas.id}
              type="button"
              onClick={() =>
                setSelectedGas(selectedGas === gas.id ? "" : gas.id)
              }
              className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center ${
                selectedGas === gas.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              <span>{gas.label}</span>
              <span className="font-bangla text-xs text-slate-400 mt-0.5">
                {gas.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Amenities (সুযোগ-সুবিধা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            "Lift / Elevator",
            "Car Parking",
            "Generator Backup",
            "24/7 Security Guard",
            "Attached Balcony",
            "WiFi Facility",
          ].map((item) => {
            const isChecked = amenities.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAmenity(item)}
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
                <span className="truncate">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
