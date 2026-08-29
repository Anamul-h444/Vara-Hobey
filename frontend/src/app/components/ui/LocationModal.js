/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/LocationModal.jsx
 * Description:
 * Dynamic location selection modal with increased font size for Bengali location names.
 * ==============================================================================
 */

"use client";

import React, { useEffect, useState } from "react";

import {
  X,
  MapPin,
  Compass,
  Landmark,
  Layers,
  Navigation,
  Check,
  ChevronRight,
  Loader2,
  RotateCcw,
} from "lucide-react";

// ==============================================================================
// API CONFIG
// ==============================================================================

const API_URL = "http://localhost:5000/api/locations";

// ==============================================================================
// COMPONENT
// ==============================================================================

export default function LocationModal({ isOpen, onClose, onSelectLocation }) {
  // ============================================================================
  // STEP
  // ============================================================================

  const [step, setStep] = useState("division");

  // ============================================================================
  // LOADING / ERROR
  // ============================================================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================================
  // LOCATION LISTS
  // ============================================================================

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unionZones, setUnionZones] = useState([]);
  const [areas, setAreas] = useState([]);

  // ============================================================================
  // SELECTED LOCATION
  // ============================================================================

  const [division, setDivision] = useState({ id: "", name: "" });
  const [district, setDistrict] = useState({ id: "", name: "" });
  const [upazila, setUpazila] = useState({ id: "", name: "" });
  const [unionZone, setUnionZone] = useState({ id: "", name: "", type: "" });
  const [area, setArea] = useState({ id: "", name: "" });

  // ============================================================================
  // GENERIC FETCH FUNCTION
  // ============================================================================

  const fetchLocations = async (params = {}) => {
    try {
      setLoading(true);
      setError("");

      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
        ) {
          searchParams.append(key, String(value).trim());
        }
      });

      const queryString = searchParams.toString();
      const url = queryString ? `${API_URL}?${queryString}` : API_URL;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "লোকেশন ডেটা লোড করা যায়নি");
      }

      return Array.isArray(result.data) ? result.data : [];
    } catch (err) {
      console.error("[Location API] Error:", err);
      setError(err.message || "লোকেশন ডেটা লোড করতে সমস্যা হয়েছে");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // RESET EVERYTHING
  // ============================================================================

  const resetAll = () => {
    setStep("division");
    setError("");
    setDivisions([]);
    setDistricts([]);
    setUpazilas([]);
    setUnionZones([]);
    setAreas([]);

    setDivision({ id: "", name: "" });
    setDistrict({ id: "", name: "" });
    setUpazila({ id: "", name: "" });
    setUnionZone({ id: "", name: "", type: "" });
    setArea({ id: "", name: "" });
  };

  // ============================================================================
  // MODAL OPEN - Load divisions
  // ============================================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadDivisions = async () => {
      resetAll();
      const data = await fetchLocations({ type: "division" });
      setDivisions(data);
    };

    loadDivisions();
  }, [isOpen]);

  // ============================================================================
  // DIVISION CLICK
  // ============================================================================

  const handleDivisionClick = async (item) => {
    const divisionId = item?._id;
    if (!divisionId) return;

    setDivision({
      id: divisionId,
      name: item.name_bn || item.name_en || "",
    });

    // Reset lower levels
    setDistrict({ id: "", name: "" });
    setUpazila({ id: "", name: "" });
    setUnionZone({ id: "", name: "", type: "" });
    setArea({ id: "", name: "" });

    setDistricts([]);
    setUpazilas([]);
    setUnionZones([]);
    setAreas([]);

    setStep("district");

    const data = await fetchLocations({ division_id: divisionId });
    setDistricts(data);
  };

  // ============================================================================
  // DISTRICT CLICK
  // ============================================================================

  const handleDistrictClick = async (item) => {
    const districtId = item?._id;
    if (!districtId) return;

    setDistrict({
      id: districtId,
      name: item.name_bn || item.name_en || "",
    });

    // Reset lower levels
    setUpazila({ id: "", name: "" });
    setUnionZone({ id: "", name: "", type: "" });
    setArea({ id: "", name: "" });

    setUpazilas([]);
    setUnionZones([]);
    setAreas([]);

    setStep("upazila");

    const data = await fetchLocations({ district_id: districtId });
    setUpazilas(data);
  };

  // ============================================================================
  // UPAZILA CLICK
  // ============================================================================

  const handleUpazilaClick = async (item) => {
    const localBodyId = item?._id;
    if (!localBodyId) return;

    setUpazila({
      id: localBodyId,
      name: item.name_bn || item.name_en || "",
    });

    // Reset lower levels
    setUnionZone({ id: "", name: "", type: "" });
    setArea({ id: "", name: "" });

    setUnionZones([]);
    setAreas([]);

    setStep("unionZone");

    const data = await fetchLocations({ local_body_id: localBodyId });
    setUnionZones(data);
  };

  // ============================================================================
  // ZONE / UNION / MUNICIPALITY CLICK
  // ============================================================================

  const handleUnionZoneClick = async (item) => {
    const zoneId = item?._id;
    if (!zoneId) return;

    setUnionZone({
      id: zoneId,
      name: item.name_bn || item.name_en || "",
      type: item.type || "",
    });

    // Reset lower level
    setArea({ id: "", name: "" });
    setAreas([]);

    setStep("area");

    const areaData = await fetchLocations({ zone_id: zoneId });
    setAreas(areaData);
  };

  // ============================================================================
  // AREA CLICK
  // ============================================================================

  const handleAreaClick = (item) => {
    const areaId = item?._id;
    if (!areaId) return;

    setArea({
      id: areaId,
      name: item.name_bn || item.name_en || "",
    });

    setStep("completed");
  };

  // ============================================================================
  // BREADCRUMB NAVIGATION
  // ============================================================================

  const goToDivision = () => {
    setError("");
    setStep("division");
  };

  const goToDistrict = () => {
    if (!division.id) return;
    setError("");
    setStep("district");
  };

  const goToUpazila = () => {
    if (!district.id) return;
    setError("");
    setStep("upazila");
  };

  const goToUnionZone = () => {
    if (!upazila.id) return;
    setError("");
    setStep("unionZone");
  };

  // ============================================================================
  // RESET BUTTON
  // ============================================================================

  const handleReset = async () => {
    resetAll();
    const data = await fetchLocations({ type: "division" });
    setDivisions(data);
  };

  // ============================================================================
  // DONE (Flexible check: allows saving whichever level is selected)
  // ============================================================================

  const handleDone = () => {
    if (!division.id) {
      setError("অনুগ্রহ করে অন্তত একটি বিভাগ নির্বাচন করুন।");
      return;
    }

    const selectedLocation = {
      division: {
        id: division.id,
        name: division.name,
      },
      district: {
        id: district.id,
        name: district.name,
      },
      upazila: {
        id: upazila.id,
        name: upazila.name,
      },
      unionZone: {
        id: unionZone.id,
        name: unionZone.name,
        type: unionZone.type,
      },
      area: {
        id: area.id,
        name: area.name,
      },
    };

    console.log("[Location] Final Selection:", selectedLocation);
    onSelectLocation(selectedLocation);
    onClose();
  };

  // ============================================================================
  // CLOSE
  // ============================================================================

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  // ============================================================================
  // GENERIC LOCATION BUTTON RENDERER
  // ============================================================================

  const renderLocationButton = ({ item, icon: Icon, selected, onClick }) => {
    const itemId = item?._id;
    if (!itemId) return null;

    return (
      <button
        key={itemId}
        type="button"
        onClick={onClick}
        className={`
          flex items-center justify-between
          w-full
          p-3.5
          rounded-2xl
          border
          text-left
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-0.5
          active:scale-[0.98]
          cursor-pointer
          ${
            selected
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/10"
              : "bg-[#121929] border-white/5 text-slate-200 hover:border-emerald-500/30 hover:bg-[#161f33] hover:shadow-md hover:shadow-black/40"
          }
        `}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon className="w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <div className="min-w-0">
            {/* বাংলা লেখার সাইজ text-xs থেকে বাড়িয়ে text-sm করা হলো এবং font-semibold দেওয়া হলো */}
            <div className="font-bangla text-sm font-semibold truncate">
              {item.name_bn || item.name_en || "Unnamed"}
            </div>
            {item.name_en && item.name_bn && (
              <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                {item.name_en}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {selected && (
            <Check className="w-4 h-4 text-emerald-400 animate-in fade-in zoom-in duration-200" />
          )}
        </div>
      </button>
    );
  };

  const renderEmptyState = (message) => {
    if (loading) return null;
    return (
      <div className="col-span-1 sm:col-span-2 text-center py-10 animate-in fade-in duration-300">
        <div className="text-xs text-slate-400">{message}</div>
      </div>
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        p-4
        bg-black/75
        backdrop-blur-md
        animate-in fade-in duration-300
      "
    >
      <div
        className="
          relative
          w-full
          max-w-xl
          bg-[#0c1019]/90
          backdrop-blur-2xl
          border
          border-white/15
          rounded-3xl
          shadow-[0_25px_60px_rgba(0,0,0,0.9)]
          overflow-hidden
          flex
          flex-col
          max-h-[85vh]
          animate-in zoom-in-95 duration-300
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-4
            border-b
            border-white/10
            bg-[#121929]/50
          "
        >
          <div className="flex items-center gap-2.5">
            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-emerald-500/20
                flex
                items-center
                justify-center
                text-emerald-400
              "
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                লোকেশন নির্বাচন করুন
              </h3>
              <p className="text-[11px] text-slate-400">Select Location</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              p-2
              text-slate-400
              hover:text-white
              rounded-xl
              hover:bg-red-500/20 hover:text-red-400
              transition-all duration-200
              cursor-pointer
            "
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BREADCRUMB */}
        <div
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            bg-[#141b2a]/60
            border-b
            border-white/5
            text-xs
            overflow-x-auto
            scrollbar-none
          "
        >
          {/* Division */}
          <button
            type="button"
            onClick={goToDivision}
            className={`
              flex flex-col text-left
              transition-colors duration-200
              ${
                step === "division"
                  ? "text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }
            `}
          >
            <span
              className={`font-semibold whitespace-nowrap ${step === "division" ? "underline underline-offset-4" : ""}`}
            >
              {division.name || "Division"}
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              Division
            </span>
          </button>

          {/* District */}
          {division.id && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 self-center" />
              <button
                type="button"
                onClick={goToDistrict}
                className={`
                  flex flex-col text-left
                  transition-colors duration-200
                  ${
                    step === "district"
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }
                `}
              >
                <span
                  className={`font-semibold whitespace-nowrap ${step === "district" ? "underline underline-offset-4" : ""}`}
                >
                  {district.name || "District"}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  District
                </span>
              </button>
            </>
          )}

          {/* Upazila */}
          {district.id && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 self-center" />
              <button
                type="button"
                onClick={goToUpazila}
                className={`
                  flex flex-col text-left
                  transition-colors duration-200
                  ${
                    step === "upazila"
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }
                `}
              >
                <span
                  className={`font-semibold whitespace-nowrap ${step === "upazila" ? "underline underline-offset-4" : ""}`}
                >
                  {upazila.name || "Upazila"}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  Upazila
                </span>
              </button>
            </>
          )}

          {/* Zone / Union */}
          {upazila.id && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 self-center" />
              <button
                type="button"
                onClick={goToUnionZone}
                className={`
                  flex flex-col text-left
                  transition-colors duration-200
                  ${
                    step === "unionZone"
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }
                `}
              >
                <span
                  className={`font-semibold whitespace-nowrap ${step === "unionZone" ? "underline underline-offset-4" : ""}`}
                >
                  {unionZone.name || "Zone / Union"}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  Zone / Union
                </span>
              </button>
            </>
          )}

          {/* Area */}
          {unionZone.id && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 self-center" />
              <button
                type="button"
                onClick={() => setStep("area")}
                className={`
                  flex flex-col text-left
                  transition-colors duration-200
                  ${
                    step === "area" || step === "completed"
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }
                `}
              >
                <span
                  className={`font-semibold whitespace-nowrap ${step === "area" || step === "completed" ? "underline underline-offset-4" : ""}`}
                >
                  {area.name || "Area"}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  Area
                </span>
              </button>
            </>
          )}
        </div>

        {/* BODY */}
        <div
          className="
            p-6
            overflow-y-auto
            max-h-[50vh]
            space-y-2
            relative
            min-h-[180px]
          "
        >
          {loading && (
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                bg-[#0c1019]/80
                backdrop-blur-sm
                z-10
                gap-2
                text-emerald-400
                text-xs
                font-medium
              "
            >
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>ডেটা লোড হচ্ছে...</span>
            </div>
          )}

          {error && !loading && (
            <div
              className="
                mb-4
                p-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                text-red-300
                text-xs
              "
            >
              {error}
            </div>
          )}

          {/* STEP 1 — DIVISION */}
          {step === "division" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {divisions.length === 0 &&
                renderEmptyState("কোনো বিভাগ পাওয়া যায়নি।")}
              {divisions.map((item) =>
                renderLocationButton({
                  item,
                  icon: Compass,
                  selected: division.id === item._id,
                  onClick: () => handleDivisionClick(item),
                }),
              )}
            </div>
          )}

          {/* STEP 2 — DISTRICT */}
          {step === "district" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {districts.length === 0 &&
                renderEmptyState("এই বিভাগের অধীনে কোনো জেলা পাওয়া যায়নি।")}
              {districts.map((item) =>
                renderLocationButton({
                  item,
                  icon: MapPin,
                  selected: district.id === item._id,
                  onClick: () => handleDistrictClick(item),
                }),
              )}
            </div>
          )}

          {/* STEP 3 — UPAZILA */}
          {step === "upazila" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {upazilas.length === 0 &&
                renderEmptyState("এই জেলার অধীনে কোনো উপজেলা পাওয়া যায়নি।")}
              {upazilas.map((item) =>
                renderLocationButton({
                  item,
                  icon: Landmark,
                  selected: upazila.id === item._id,
                  onClick: () => handleUpazilaClick(item),
                }),
              )}
            </div>
          )}

          {/* STEP 4 — ZONE / UNION */}
          {step === "unionZone" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {unionZones.length === 0 &&
                renderEmptyState(
                  "এই উপজেলার অধীনে কোনো Zone / Union / Municipality পাওয়া যায়নি।",
                )}
              {unionZones.map((item) =>
                renderLocationButton({
                  item,
                  icon: Layers,
                  selected: unionZone.id === item._id,
                  onClick: () => handleUnionZoneClick(item),
                }),
              )}
            </div>
          )}

          {/* STEP 5 — AREA */}
          {step === "area" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {areas.length === 0 &&
                renderEmptyState(
                  "এই Zone / Union-এর অধীনে কোনো Area পাওয়া যায়নি।",
                )}
              {areas.map((item) =>
                renderLocationButton({
                  item,
                  icon: Navigation,
                  selected: area.id === item._id,
                  onClick: () => handleAreaClick(item),
                }),
              )}
            </div>
          )}

          {/* STEP 6 — COMPLETED */}
          {step === "completed" && (
            <div className="py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                লোকেশন নির্বাচন সম্পন্ন
              </h3>
              <p className="text-xs text-slate-400 leading-6">
                {[
                  division.name,
                  district.name,
                  upazila.name,
                  unionZone.name,
                  area.name,
                ]
                  .filter(Boolean)
                  .join(" → ")}
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-4
            border-t
            border-white/10
            bg-[#121929]/50
          "
        >
          <button
            type="button"
            onClick={handleReset}
            className="
              flex items-center gap-1.5
              px-3.5
              py-2
              rounded-xl
              text-xs
              font-semibold
              text-slate-400
              bg-white/5
              hover:text-white
              hover:bg-white/10
              border
              border-white/10
              cursor-pointer
            "
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <div className="flex items-center gap-2">
            {step !== "division" && step !== "completed" && (
              <button
                type="button"
                onClick={() => {
                  if (step === "area") setStep("unionZone");
                  else if (step === "unionZone") setStep("upazila");
                  else if (step === "upazila") setStep("district");
                  else if (step === "district") setStep("division");
                }}
                className="
                  px-4
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  text-slate-300
                  bg-white/5
                  hover:bg-white/10
                  border
                  border-white/10
                  cursor-pointer
                "
              >
                ← Back
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="
                px-4
                py-2
                rounded-xl
                text-xs
                font-semibold
                text-red-400
                bg-red-500/10
                hover:bg-red-500/20
                border
                border-red-500/20
                cursor-pointer
              "
            >
              Cancel
            </button>

            {/* Flexible Done Button: enabled as soon as division is chosen */}
            <button
              type="button"
              onClick={handleDone}
              disabled={!division.id}
              className="
                px-5
                py-2
                rounded-xl
                text-xs
                font-bold
                bg-emerald-500
                hover:bg-emerald-600
                disabled:bg-slate-800
                disabled:text-slate-500
                disabled:cursor-not-allowed
                text-slate-950
                cursor-pointer
                shadow-md
                shadow-emerald-500/20
              "
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
