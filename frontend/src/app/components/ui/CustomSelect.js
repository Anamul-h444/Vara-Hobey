/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/CustomSelect.js
 *
 * Description:
 * Compact premium searchable select component with enlarged and clear Bengali font sizes.
 * ==============================================================================
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";

export default function CustomSelect({
  label,
  icon: Icon,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  disabled = false,
  searchable = false,
  disabledHint = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedItem = options.find(
    (opt) => (opt.id || opt.name || opt.label) === value,
  );

  const filteredOptions = searchable
    ? options.filter((opt) => {
        const textEn = (opt.name || opt.label || "").toLowerCase();
        const textBn = (opt.bnName || "").toLowerCase();
        const query = searchTerm.toLowerCase();

        return textEn.includes(query) || textBn.includes(query);
      })
    : options;

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);

    if (isOpen) {
      setSearchTerm("");
    }
  };

  const handleSelect = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full select-none"
      title={disabled && disabledHint ? disabledHint : undefined}
    >
      {label && (
        <div className="mb-1.5 flex items-center gap-2 px-0.5">
          {Icon && (
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-emerald-400/10 bg-emerald-400/[0.07]">
              <Icon className="h-3 w-3 text-emerald-400" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-bangla truncate text-xs font-bold leading-tight text-slate-200">
              {label}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Select option
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`group flex h-[50px] w-full items-center justify-between gap-2 rounded-2xl border px-4 text-left outline-none transition-all duration-200 ease-out ${
          disabled
            ? "cursor-not-allowed border-white/[0.05] bg-[#0c1019]/40 opacity-40"
            : isOpen
              ? "border-emerald-400/50 bg-[#141c29] shadow-[0_0_0_2px_rgba(16,185,129,0.1)]"
              : "cursor-pointer border-white/10 bg-[#121824]/90 hover:border-white/20 hover:bg-[#161f30]"
        }`}
      >
        <div className="min-w-0 flex-1">
          {selectedItem ? (
            <div className="flex min-w-0 items-center gap-2">
              <span className="max-w-full truncate text-xs sm:text-sm font-semibold text-slate-100">
                {selectedItem.name || selectedItem.label}
              </span>

              {selectedItem.bnName && (
                /* সিলেক্টেড বক্সের ভেতরের বাংলা ফন্ট সাইজ বাড়িয়ে স্পষ্ট করা হলো */
                <span className="max-w-[55%] shrink-0 truncate font-bangla text-xs sm:text-sm font-bold text-emerald-400">
                  ({selectedItem.bnName})
                </span>
              )}
            </div>
          ) : (
            <span className="block truncate text-xs sm:text-sm font-medium text-slate-400 transition-colors duration-200">
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 ${
            isOpen
              ? "rotate-180 text-emerald-400"
              : "rotate-0 group-hover:text-slate-200"
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[99999] overflow-hidden rounded-2xl border border-white/15 bg-[#0c1019]/98 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
          {searchable && (
            <div className="mb-2 flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#141923] px-3 transition-all duration-200 focus-within:border-emerald-400/50">
              <Search className="h-4 w-4 shrink-0 text-emerald-400" />
              <input
                type="text"
                placeholder="খুঁজুন..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="min-w-0 flex-1 bg-transparent font-bangla text-xs sm:text-sm text-slate-100 outline-none placeholder:text-slate-400 font-medium"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="max-h-60 space-y-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const optValue = opt.id || opt.name || opt.label;
                const isSelected = value === optValue;

                return (
                  <button
                    key={opt.id || `${optValue}-${idx}`}
                    type="button"
                    onClick={() => handleSelect(optValue)}
                    className={`group flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "border-emerald-400/30 bg-emerald-400/10"
                        : "border-transparent hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-xs sm:text-sm font-semibold ${
                          isSelected
                            ? "text-emerald-300 font-bold"
                            : "text-slate-200 group-hover:text-white"
                        }`}
                      >
                        {opt.name || opt.label}
                      </span>

                      {opt.bnName && (
                        /* ড্রপডাউনের ভেতরের বাংলা অপশনের ফন্ট সাইজ বাড়িয়ে text-xs এবং bold করা হলো */
                        <span
                          className={`mt-0.5 block truncate font-bangla text-xs sm:text-sm font-bold ${
                            isSelected
                              ? "text-emerald-400"
                              : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          {opt.bnName}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-400/20">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 py-8 text-center">
                <Search className="h-5 w-5 text-slate-500" />
                <span className="font-bangla text-xs sm:text-sm text-slate-400 font-medium">
                  কোনো তথ্য পাওয়া যায়নি
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
