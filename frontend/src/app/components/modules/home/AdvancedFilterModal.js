/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/modules/home/AdvancedFilterModal.js
 * Description: Parent Advanced Filter Modal managing states and rendering modular sub-filters.
 * ==============================================================================
 */

"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, RotateCcw, Wallet } from "lucide-react";
import Button from "@/app/components/ui/Button";

// Modular Sub-Filters Import
import ResidentialFilters from "./filters/ResidentialFilters";
import SubletMessFilters from "./filters/SubletMessFilters";
import HotelFilters from "./filters/HotelFilters";
import CommercialFilters from "./filters/CommercialFilters";
import EventFilters from "./filters/EventFilters";
import CarFilters from "./filters/CarFilters";

export default function AdvancedFilterModal({ isOpen, onClose, selectedType }) {
  // ডাইনামিক প্রপার্টি টাইপের জন্য স্টেট
  const [propertyTypes, setPropertyTypes] = useState([]);

  // ব্যাকএন্ড থেকে ডাইনামিক রেন্ট টাইপ ফেচ এবং ফরম্যাট করা
  useEffect(() => {
    fetch("http://localhost:5000/api/rent-types")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          throw new Error(
            "API did not return JSON. Endpoint might be incorrect.",
          );
        }
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const formattedTypes = data.data.map((item) => ({
            id: item.type,
            name: item.name,
            bnName: item.bnName,
            category: item.category,
          }));
          setPropertyTypes(formattedTypes);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch rent types:", err.message),
      );
  }, []);

  // Common Filter States
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState([]);

  // Residential Specific States
  const [selectedBed, setSelectedBed] = useState("");
  const [selectedBath, setSelectedBath] = useState("");
  const [selectedGas, setSelectedGas] = useState("");

  // Sublet & Mess Specific States
  const [subletGas, setSubletGas] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [bathType, setBathType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [genderPref, setGenderPref] = useState("");

  // Hotel Specific States
  const [hotelCooking, setHotelCooking] = useState("");
  const [hotelRoomCategory, setHotelRoomCategory] = useState("");
  const [stayDuration, setStayDuration] = useState("");

  // Commercial Specific States
  const [selectedFloor, setSelectedFloor] = useState("");

  // Event Specific States
  const [guestCapacity, setGuestCapacity] = useState("");

  // Vehicle / Car Specific States
  const [vehicleType, setVehicleType] = useState("");
  const [acType, setAcType] = useState("");
  const [driverPref, setDriverPref] = useState("");

  if (!isOpen) return null;

  const currentTypeObj = propertyTypes.find((t) => t.id === selectedType);

  // Categorization Checks
  const isResidentialFlatStyle = ["flat", "tinshed", "duplex"].includes(
    selectedType,
  );
  const isSubletOrMess = ["sublet", "bachelor"].includes(selectedType);
  const isHotelStyle = ["hotel", "hostel"].includes(selectedType);
  const isCommercial = ["office", "shop", "warehouse", "garage"].includes(
    selectedType,
  );
  const isOfficeOrShop = ["office", "shop"].includes(selectedType);
  const isWarehouse = selectedType === "warehouse";
  const isEventService =
    ["convention_hall", "event_decoration"].includes(selectedType) ||
    currentTypeObj?.category === "event";
  const isConventionHall = selectedType === "convention_hall";
  const isVehicle =
    selectedType === "transport" || currentTypeObj?.category === "transport";

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setAmenities([]);
    setSelectedBed("");
    setSelectedBath("");
    setSelectedGas("");
    setSubletGas("");
    setBuildingType("");
    setBathType("");
    setRoomType("");
    setGenderPref("");
    setHotelCooking("");
    setHotelRoomCategory("");
    setStayDuration("");
    setSelectedFloor("");
    setGuestCapacity("");
    setVehicleType("");
    setAcType("");
    setDriverPref("");
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Centered Glassmorphism Modal Box */}
      <div className="relative w-full max-w-xl bg-[#0c1019]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* TOP: Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                Advanced Filters
              </h3>
            </div>
            <p className="font-bangla text-xs sm:text-sm text-slate-300 mt-1">
              ক্যাটাগরি:{" "}
              <span className="text-emerald-300 font-semibold">
                {currentTypeObj?.name || "All"} (
                {currentTypeObj?.bnName || "সকল"})
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MIDDLE: Scrollable Filter Options */}
        <div className="flex-1 overflow-y-auto py-6 space-y-7 text-left pr-1 scrollbar-thin scrollbar-thumb-white/15">
          {/* BUDGET / PRICE RANGE (Common) */}
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
              <Wallet className="w-4 h-4 text-emerald-400" />
              Budget / Rate Range (বাজেট - টাকা)
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min (যেমন: 5000)"
                className="bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max (যেমন: 25000)"
                className="bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Under 10k", min: "", max: "10000" },
                { label: "10k - 20k", min: "10000", max: "20000" },
                { label: "20k - 40k", min: "20000", max: "40000" },
                { label: "40k+", min: "40000", max: "" },
              ].map((range) => (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => {
                    setMinPrice(range.min);
                    setMaxPrice(range.max);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#141923] text-slate-200 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-all cursor-pointer"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Render Modular Sub-Filters Based on Selected Type */}
          {isResidentialFlatStyle && (
            <ResidentialFilters
              selectedBed={selectedBed}
              setSelectedBed={setSelectedBed}
              selectedBath={selectedBath}
              setSelectedBath={setSelectedBath}
              selectedGas={selectedGas}
              setSelectedGas={setSelectedGas}
              amenities={amenities}
              toggleAmenity={toggleAmenity}
            />
          )}

          {isSubletOrMess && (
            <SubletMessFilters
              buildingType={buildingType}
              setBuildingType={setBuildingType}
              bathType={bathType}
              setBathType={setBathType}
              roomType={roomType}
              setRoomType={setRoomType}
              genderPref={genderPref}
              setGenderPref={setGenderPref}
              subletGas={subletGas}
              setSubletGas={setSubletGas}
            />
          )}

          {isHotelStyle && (
            <HotelFilters
              hotelRoomCategory={hotelRoomCategory}
              setHotelRoomCategory={setHotelRoomCategory}
              hotelCooking={hotelCooking}
              setHotelCooking={setHotelCooking}
              stayDuration={stayDuration}
              setStayDuration={setStayDuration}
              amenities={amenities}
              toggleAmenity={toggleAmenity}
            />
          )}

          {isCommercial && (
            <CommercialFilters
              selectedFloor={selectedFloor}
              setSelectedFloor={setSelectedFloor}
              isOfficeOrShop={isOfficeOrShop}
              isWarehouse={isWarehouse}
              amenities={amenities}
              toggleAmenity={toggleAmenity}
            />
          )}

          {isEventService && (
            <EventFilters
              guestCapacity={guestCapacity}
              setGuestCapacity={setGuestCapacity}
              isConventionHall={isConventionHall}
              amenities={amenities}
              toggleAmenity={toggleAmenity}
            />
          )}

          {isVehicle && (
            <CarFilters
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
              acType={acType}
              setAcType={setAcType}
              driverPref={driverPref}
              setDriverPref={setDriverPref}
            />
          )}
        </div>

        {/* BOTTOM: Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-4 py-2.5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="rounded-2xl px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
