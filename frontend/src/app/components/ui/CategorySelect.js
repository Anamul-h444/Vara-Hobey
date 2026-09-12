/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/CategorySelect.js
 * Description: Premium dark custom dropdown component with placeholder icon and hardcoded options.
 * ==============================================================================
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  Search,
  X,
  Building2,
  Home,
  Layers,
  Home as HomeIcon,
  Warehouse,
  Hotel,
  Users,
  UserCheck,
  Utensils,
  LayoutGrid,
} from "lucide-react";

export default function CategorySelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select Fare Category.",
  disabled = false,
  searchable = true,
  disabledHint = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  const defaultOptions = [
    {
      id: "apartment",
      name: "Apartment",
      icon: <Building2 className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "sublet",
      name: "Sublet",
      icon: <Layers className="w-4 h-4 text-teal-400" />,
    },
    {
      id: "duplex",
      name: "Duplex",
      icon: <Home className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: "entire_house",
      name: "Entire House",
      icon: <HomeIcon className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "tin_shed_house",
      name: "Tin-Shed House",
      icon: <Warehouse className="w-4 h-4 text-amber-400" />,
    },
    {
      id: "hostel",
      name: "Hostel Seat",
      icon: <Hotel className="w-4 h-4 text-indigo-400" />,
    },

    {
      id: "bachelor",
      name: "Bachelor Mess",
      icon: <Users className="w-4 h-4 text-cyan-400" />,
    },
  ];

  const activeOptions = options.length > 0 ? options : defaultOptions;

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

  const selectedItem = activeOptions.find(
    (opt) => (opt.id || opt.name || opt.label) === value,
  );

  const filteredOptions = searchable
    ? activeOptions.filter((opt) => {
        const textEn = (opt.name || opt.label || "").toLowerCase();
        const query = searchTerm.toLowerCase();
        return textEn.includes(query);
      })
    : activeOptions;

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
      className="relative w-full select-none font-sans"
      title={disabled && disabledHint ? disabledHint : undefined}
    >
      {label && (
        <div className="mb-1.5 flex items-center gap-2 px-0.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold leading-tight text-slate-200">
              {label}
            </p>
          </div>
        </div>
      )}

      {/* Main Select Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`group flex h-[50px] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left outline-none transition-all duration-300 ease-out ${
          disabled
            ? "cursor-not-allowed border-white/[0.05] bg-[#0c1019]/40 opacity-40"
            : isOpen
              ? "border-emerald-400/50 bg-[#141c29] shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "cursor-pointer border-white/10 bg-[#121824]/90 hover:border-emerald-500/40 hover:bg-[#161f30]"
        }`}
      >
        <div className="min-w-0 flex-1 flex items-center gap-2.5">
          {selectedItem?.icon ? (
            <span className="shrink-0 flex items-center">
              {selectedItem.icon}
            </span>
          ) : (
            <LayoutGrid className="h-4 w-4 shrink-0 text-emerald-400" />
          )}

          {selectedItem ? (
            <span className="max-w-full truncate text-xs sm:text-sm font-semibold text-slate-100">
              {selectedItem.name || selectedItem.label}
            </span>
          ) : (
            <span className="block truncate text-xs sm:text-sm font-medium text-slate-400 transition-colors duration-200">
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
            isOpen
              ? "rotate-180 text-emerald-400"
              : "rotate-0 group-hover:text-slate-200"
          }`}
        />
      </button>

      {/* Dropdown Options Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[99999] overflow-hidden rounded-2xl border border-white/15 bg-[#0c1019]/98 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
          {searchable && (
            <div className="mb-2 flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#141923] px-3 transition-all duration-200 focus-within:border-emerald-400/50">
              <Search className="h-4 w-4 shrink-0 text-emerald-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm text-slate-100 outline-none placeholder:text-slate-400 font-medium"
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
                    className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-300 font-bold"
                        : "hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium"
                    }`}
                  >
                    <div className="min-w-0 flex-1 flex items-center gap-2.5">
                      {opt.icon && (
                        <span className="shrink-0 flex items-center">
                          {opt.icon}
                        </span>
                      )}
                      <span className="block truncate text-xs sm:text-sm">
                        {opt.name || opt.label}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 py-8 text-center">
                <Search className="h-5 w-5 text-slate-500" />
                <span className="text-xs sm:text-sm text-slate-400 font-medium">
                  No results found
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
