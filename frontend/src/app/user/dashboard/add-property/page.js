/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/user/dashboard/add-property/page.jsx
 *
 * Description:
 * Master Multi-Step Property Form with Fixed Header/Footer and Internal Scroll.
 *
 * Layout:
 * - Dashboard header stays visible
 * - Form never enters dashboard header
 * - Main page does not scroll
 * - Property box does not move
 * - Box height adapts to content
 * - Maximum height is limited
 * - Only middle content scrolls when necessary
 * - Back button stays beside Save Draft
 * ==============================================================================
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/api";
import { Building2, ArrowRight, ArrowLeft, X, Save, Send } from "lucide-react";

// Step 1 Component Import
import AddBasicInfo from "./steps/AddBasicInfo";

export default function AddPropertyPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ফর্মের সম্পূর্ণ স্টেট
  const [formData, setFormData] = useState({
    fareType: "ফ্ল্যাট / অ্যাপার্টমেন্ট",
    title: "",
    details: "",
    location: {
      division: { id: "1", name_bn: "ঢাকা", name_en: "Dhaka" },
      district: { id: "13", name_bn: "নরসিংদী", name_en: "Narsingdi" },
      upazila: {
        id: "101",
        name_bn: "নরসিংদী সদর",
        name_en: "Narsingdi Sadar",
      },
      area: { id: "1001", name_bn: "শহরের ভেতর", name_en: "City Area" },
      roadAndHouse: "",
    },
    pricing: { monthlyRent: "", serviceCharge: 0, advanceAmount: 0 },
    utilityPolicy: {
      gas: "excluded",
      electricity: "excluded",
      water: "excluded",
    },
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      kitchens: 1,
      drawingDining: true,
    },
    amenities: {
      lift: false,
      generator: false,
      securityGuard: false,
      cctv: false,
      carParking: false,
      gasSupply: "cylinder",
    },
    contactInfo: { name: "", mobileNumber: "", whatsappNo: "" },
    photos: [],
    status: "active",
  });

  // ============================================================================
  // BODY SCROLL LOCK
  // ============================================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // অটো লোকাল স্টোরেজে ড্রাফট সেভ
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.details) {
        localStorage.setItem("vara_hobe_auto_draft", JSON.stringify(formData));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSaveDraftLocal = () => {
    try {
      const existingDrafts = JSON.parse(
        localStorage.getItem("vara_hobe_drafts") || "[]",
      );
      const draftItem = {
        id: Date.now(),
        ...formData,
        savedAt: new Date().toLocaleString(),
      };
      existingDrafts.push(draftItem);
      localStorage.setItem("vara_hobe_drafts", JSON.stringify(existingDrafts));
      setSuccessMsg("Draft Saved Successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg("Failed to save draft.");
    }
  };

  // ============================================================================
  // NEXT STEP
  // ============================================================================

  const handleNextStep = () => {
    if (step === 1 && !formData.title.trim()) {
      setErrorMsg("অনুগ্রহ করে বিজ্ঞাপনের শিরোনাম লিখুন।");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");

    setStep((prev) => Math.min(prev + 1, 6));
  };

  // ============================================================================
  // BACK BUTTON
  // ============================================================================

  const handleBackStep = () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (step === 1) {
      router.push("/user/dashboard");
      return;
    }

    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ============================================================================
  // SUBMIT
  // ============================================================================

  const handleSubmit = async (e, submitStatus = "active") => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        status: submitStatus,
      };

      const userStr =
        localStorage.getItem("vara_hobe_user") || localStorage.getItem("user");

      if (!userStr) {
        setErrorMsg("দয়া করে প্রথমে লগইন করুন।");
        setLoading(false);
        return;
      }

      const userObj = JSON.parse(userStr);

      payload.userId = userObj._id || userObj.id;

      const response = await fetchApi("/flats", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        alert(response.message);

        localStorage.removeItem("vara_hobe_auto_draft");

        router.push("/user/dashboard");
      } else {
        setErrorMsg(response.message || "বিজ্ঞাপন প্রকাশ করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      setErrorMsg("সার্ভারে সংযোগ স্থাপন করতে সমস্যা হচ্ছে।");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // UI
  // ============================================================================

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-slate-950 text-slate-100 font-bangla">
      {/* ========================================================================
          MAIN AREA
          Dashboard header-এর নিচ থেকে শুরু হবে
      ======================================================================== */}

      <main
        className="
          absolute
          left-0
          right-0
          bottom-0
          top-[74px]
          md:left-[110px]
          overflow-hidden
          box-border
          p-3
          sm:p-5
          lg:p-6
          flex
          items-center
          justify-center
        "
      >
        {/* ======================================================================
            PROPERTY BOX
            Content অনুযায়ী height হবে, কিন্তু maximum height সীমাবদ্ধ
        ======================================================================= */}

        <div
          className="
            w-full
            max-w-4xl
            max-h-full
            bg-slate-900/95
            backdrop-blur-xl
            border
            border-slate-800
            rounded-3xl
            p-5
            sm:p-7
            shadow-2xl
            flex
            flex-col
            relative
            overflow-hidden
          "
        >
          {/* ====================================================================
              CLOSE BUTTON
          ===================================================================== */}

          <button
            type="button"
            onClick={() => router.push("/user/dashboard")}
            className="
              absolute
              top-4
              right-4
              sm:top-6
              sm:right-6
              p-2
              rounded-full
              bg-slate-800
              text-slate-400
              hover:text-white
              hover:bg-slate-700
              transition-all
              cursor-pointer
              z-20
            "
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ====================================================================
              FIXED HEADER
          ===================================================================== */}

          <div className="shrink-0">
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 border-b border-slate-800 pb-4 pr-10">
              <div
                className="
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-2xl
                  bg-gradient-to-tr
                  from-emerald-500
                  to-teal-400
                  flex
                  items-center
                  justify-center
                  text-slate-950
                  shadow-[0_0_20px_rgba(16,185,129,0.3)]
                  shrink-0
                "
              >
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-black text-slate-100 tracking-tight leading-snug">
                  আপনার কাঙ্ক্ষিত ভাড়ার বিজ্ঞাপন দিন
                </h1>

                <p className="text-[11px] sm:text-xs font-bold text-teal-400 uppercase tracking-widest mt-0.5 font-sans">
                  Post Your Property for Rent
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">
                  সহজ কয়েকটি ধাপে তথ্য পূরণ করুন
                </p>

                <p className="text-[10px] sm:text-xs text-cyan-300 uppercase tracking-wider font-sans font-bold mt-0.5">
                  Complete your listing in a few simple steps
                </p>
              </div>
            </div>

            {/* ==================================================================
                STEP INDICATOR
            =================================================================== */}

            <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-4">
              {[
                {
                  id: 1,
                  nameBn: "সাধারণ তথ্য",
                  nameEn: "Basic",
                },
                {
                  id: 2,
                  nameBn: "লোকেশন",
                  nameEn: "Location",
                },
                {
                  id: 3,
                  nameBn: "ভাড়ার ধরন",
                  nameEn: "Type",
                },
                {
                  id: 4,
                  nameBn: "ভাড়ার তথ্য",
                  nameEn: "Details",
                },
                {
                  id: 5,
                  nameBn: "যোগাযোগ",
                  nameEn: "Contact",
                },
                {
                  id: 6,
                  nameBn: "ছবি",
                  nameEn: "Photos",
                },
              ].map((s) => (
                <div
                  key={s.id}
                  className={`
                    flex
                    flex-col
                    items-center
                    p-2
                    rounded-2xl
                    transition-all
                    ${
                      step === s.id
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : step > s.id
                          ? "bg-slate-800 text-teal-300 border border-slate-700"
                          : "bg-slate-950 text-slate-500 border border-slate-800/80"
                    }
                  `}
                >
                  <span className="w-6 h-6 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold mb-1">
                    {s.id}
                  </span>

                  <span className="hidden sm:block text-xs font-bold text-center leading-tight">
                    {s.nameBn}
                  </span>

                  <span className="text-[9px] uppercase tracking-tighter text-slate-400 font-sans">
                    {s.nameEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="mb-2 p-2.5 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Success */}
            {successMsg && (
              <div className="mb-2 p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-medium">
                {successMsg}
              </div>
            )}
          </div>

          {/* ====================================================================
              CONTENT AREA
              বেশি content হলে শুধু এখানে scrollbar
          ===================================================================== */}

          <div
            className="
              min-h-0
              max-h-[55vh]
              overflow-y-auto
              overflow-x-hidden
              custom-scrollbar
              px-1
              py-2
              my-2
              overscroll-contain
            "
          >
            {/* ================================================================
                ONLY STEP 1
                নতুন কোনো Step content যোগ করা হয়নি
            ================================================================= */}

            {step === 1 && (
              <AddBasicInfo formData={formData} onChange={handleChange} />
            )}
          </div>

          {/* ====================================================================
              FIXED FOOTER
          ===================================================================== */}

          <div
            className="
              shrink-0
              flex
              items-center
              justify-between
              pt-4
              border-t
              border-slate-800
              mt-2
              bg-slate-900/95
            "
          >
            {/* বামপাশে ব্যাক বাটন */}
            <div>
              <button
                type="button"
                onClick={handleBackStep}
                className="
                  px-4
                  sm:px-5
                  py-2.5
                  bg-slate-800
                  hover:bg-slate-700
                  text-slate-200
                  rounded-2xl
                  text-xs
                  sm:text-sm
                  font-bold
                  flex
                  items-center
                  gap-2
                  transition-all
                  cursor-pointer
                  shadow-md
                  whitespace-nowrap
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            {/* ডানপাশে সেভ ড্রাফট ও নেক্সট বাটন */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSaveDraftLocal}
                className="
                  px-3.5
                  sm:px-4
                  py-2.5
                  bg-slate-800
                  hover:bg-slate-700
                  text-emerald-400
                  rounded-2xl
                  text-xs
                  sm:text-sm
                  font-bold
                  flex
                  items-center
                  gap-2
                  transition-all
                  cursor-pointer
                  shadow-md
                  whitespace-nowrap
                "
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="
                    px-5
                    sm:px-6
                    py-2.5
                    bg-emerald-500
                    hover:bg-emerald-400
                    text-slate-950
                    rounded-2xl
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    gap-2
                    shadow-lg
                    transition-all
                    cursor-pointer
                    whitespace-nowrap
                  "
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "active")}
                  disabled={loading}
                  className="
                    px-6
                    sm:px-7
                    py-2.5
                    bg-gradient-to-r
                    from-emerald-500
                    to-teal-400
                    hover:from-emerald-400
                    hover:to-teal-300
                    text-slate-950
                    rounded-2xl
                    text-xs
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    gap-2
                    shadow-lg
                    transition-all
                    cursor-pointer
                    whitespace-nowrap
                  "
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Publishing..." : "Publish — প্রকাশ করুন"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
