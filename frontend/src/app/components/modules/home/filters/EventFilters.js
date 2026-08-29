"use client";

import React from "react";
import { Check } from "lucide-react";

export default function EventFilters({
  guestCapacity,
  setGuestCapacity,
  isConventionHall,
  amenities,
  toggleAmenity,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Guest Capacity (অতিথি ধারণক্ষমতা)
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {["Up to 200", "200 - 500", "500+ Guests"].map((cap) => (
            <button
              key={cap}
              type="button"
              onClick={() => setGuestCapacity(guestCapacity === cap ? "" : cap)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                guestCapacity === cap
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              {cap}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Event Essentials (প্রয়োজনীয় ডেকোরেশন ও সুবিধা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {(isConventionHall
            ? [
                "AC Hall Room",
                "Bridal Room",
                "Stage Decoration",
                "Sound System",
                "Catering Service",
                "VIP Dining Setup",
                "Lighting & Gate",
                "Generator Support",
              ]
            : [
                "Stage Decoration",
                "Sound System",
                "Catering Service",
                "VIP Dining Setup",
                "Lighting & Gate",
                "Generator Support",
              ]
          ).map((item) => {
            const isChecked = amenities.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAmenity(item)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                  isChecked
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                    : "bg-[#141923] text-slate-200 border border-white/10"
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
