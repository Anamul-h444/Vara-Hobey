"use client";

import React from "react";

export default function CarFilters({
  vehicleType,
  setVehicleType,
  acType,
  setAcType,
  driverPref,
  setDriverPref,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Vehicle Category (গাড়ির ধরন)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              id: "car_micro",
              label: "Car / Microbus",
              bn: "প্রাইভেট কার / মাইক্রো",
            },
            { id: "bus", label: "Bus / Minibus", bn: "বাস / মিনিবাস" },
            {
              id: "truck_pickup",
              label: "Truck / Pickup",
              bn: "ট্রাক / পিকআপ",
            },
            { id: "ambulance", label: "Ambulance", bn: "অ্যাম্বুলেন্স" },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVehicleType(vehicleType === v.id ? "" : v.id)}
              className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                vehicleType === v.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              <span className="block font-bold">{v.label}</span>
              <span className="font-bangla text-xs text-slate-400 mt-0.5 block">
                {v.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          AC / Non-AC Option (এসি সুবিধা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "ac", label: "Air Conditioned (AC)", bn: "এসি (AC)" },
            { id: "non_ac", label: "Non-AC", bn: "নন-এসি" },
          ].map((ac) => (
            <button
              key={ac.id}
              type="button"
              onClick={() => setAcType(acType === ac.id ? "" : ac.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                acType === ac.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              <span>{ac.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {ac.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Driver Preference (ড্রাইভার অপশন)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "with_driver", label: "With Driver", bn: "ড্রাইভারসহ" },
            { id: "self_drive", label: "Self Drive", bn: "সেলফ ড্রাইভ" },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDriverPref(driverPref === d.id ? "" : d.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                driverPref === d.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10 hover:border-white/20"
              }`}
            >
              <span>{d.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {d.bn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
