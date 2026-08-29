"use client";

import React from "react";

export default function SubletMessFilters({
  buildingType,
  setBuildingType,
  bathType,
  setBathType,
  roomType,
  setRoomType,
  genderPref,
  setGenderPref,
  subletGas,
  setSubletGas,
}) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Building Type (বাসার ধরন)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "flat", label: "Flat Building", bn: "ফ্ল্যাট বাসা" },
            { id: "tinshed", label: "Tin-shed House", bn: "টিনশেড বাসা" },
          ].map((bt) => (
            <button
              key={bt.id}
              type="button"
              onClick={() =>
                setBuildingType(buildingType === bt.id ? "" : bt.id)
              }
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                buildingType === bt.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{bt.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {bt.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Bathroom Type (বাথরুমের ধরন)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              id: "attached",
              label: "Attached Bathroom",
              bn: "অ্যাটাচড বাথরুম",
            },
            { id: "shared", label: "Shared Bathroom", bn: "শেয়ার্ড বাথরুম" },
          ].map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBathType(bathType === b.id ? "" : b.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                bathType === b.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{b.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {b.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Room Options (রুমের অপশন)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "single", label: "Single Room", bn: "সিঙ্গেল রুম" },
            {
              id: "shared",
              label: "Shared Room / Seat",
              bn: "শেয়ার্ড রুম / সিট",
            },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRoomType(roomType === r.id ? "" : r.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                roomType === r.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{r.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {r.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Preferred For (কাদের জন্য প্রযোজ্য)
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "male", label: "Male / Bachelor", bn: "পুরুষ/ব্যাচেলর" },
            { id: "female", label: "Female / Bachelor", bn: "মহিলা/ব্যাচেলর" },
            { id: "family", label: "Family", bn: "ফ্যামিলি" },
          ].map((gp) => (
            <button
              key={gp.id}
              type="button"
              onClick={() => setGenderPref(genderPref === gp.id ? "" : gp.id)}
              className={`py-3 px-1 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                genderPref === gp.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{gp.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {gp.bn}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
          Gas Connection (গ্যাস সুবিধা)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: "line", label: "Line Gas", bn: "লাইনের গ্যাস" },
            { id: "cylinder", label: "Cylinder Gas", bn: "সিলিন্ডার গ্যাস" },
          ].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSubletGas(subletGas === g.id ? "" : g.id)}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                subletGas === g.id
                  ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#141923] text-slate-200 border border-white/10"
              }`}
            >
              <span>{g.label}</span>
              <span className="block font-bangla text-xs text-slate-400 mt-0.5">
                {g.bn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
