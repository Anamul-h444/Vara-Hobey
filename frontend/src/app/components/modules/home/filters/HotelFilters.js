"use client";

import React from "react";
import { Check } from "lucide-react";

export default function HotelFilters({
  hotelRoomCategory,
  setHotelRoomCategory,
  hotelCooking,
  setHotelCooking,
  stayDuration,
  setStayDuration,
  amenities,
  toggleAmenity,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Room Category (রুম ক্যাটাগরি)
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "single_room", label: "Single Room", bn: "সিঙ্গেল রুম" },
            { id: "double", label: "Double Room", bn: "ডাবল রুম" },
            { id: "family", label: "Family Suite", bn: "ফ্যামিলি স্যুট" },
          ].map((rc) => (
            <button
              key={rc.id}
              type="button"
              onClick={() =>
                setHotelRoomCategory(hotelRoomCategory === rc.id ? "" : rc.id)
              }
              className={`py-3 px-1 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                hotelRoomCategory === rc.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{rc.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {rc.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Cooking Facility (রান্নার ব্যবস্থা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "yes", label: "Available", bn: "রান্নার ব্যবস্থা আছে" },
            { id: "no", label: "Not Available", bn: "রান্নার ব্যবস্থা নেই" },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setHotelCooking(hotelCooking === c.id ? "" : c.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                hotelCooking === c.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{c.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {c.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Stay Duration (ভাড়ার সময়কাল)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "daily", label: "Per Day", bn: "ট্যুরিস্ট / ডেইলি" },
            {
              id: "weekly",
              label: "Weekly / Monthly",
              bn: "সাপ্তাহিক / মাসিক",
            },
          ].map((sd) => (
            <button
              key={sd.id}
              type="button"
              onClick={() =>
                setStayDuration(stayDuration === sd.id ? "" : sd.id)
              }
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                stayDuration === sd.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{sd.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {sd.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Hotel Amenities (হোটেল সুবিধা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            "WiFi Available",
            "AC Room",
            "Room Service",
            "Attached Balcony",
            "Hot Water",
            "Geyser",
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
