'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

export default function CustomSelect({ 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select...', 
  disabled = false,
  searchable = false,
  disabledHint = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = options.find(opt => (opt.id || opt.name || opt.label) === value);

  const filteredOptions = searchable 
    ? options.filter(opt => {
        const textEn = opt.name || opt.label || '';
        const textBn = opt.bnName || '';
        return textEn.toLowerCase().includes(searchTerm.toLowerCase()) || textBn.includes(searchTerm);
      })
    : options;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      
      {/* ১. ট্রিপল ফিল্ড ট্রিগার বাটন */}
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        className={`px-3 py-2 flex flex-col justify-center rounded-xl transition-all duration-200 cursor-pointer ${
          disabled 
            ? 'opacity-60 cursor-not-allowed hover:bg-transparent' 
            : 'hover:bg-white/[0.06]'
        } ${isOpen ? 'bg-white/[0.08] shadow-inner' : ''}`}
        title={disabled && disabledHint ? disabledHint : ''}
      >
        <span className="text-[10px] font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
          {Icon && <Icon className="w-3 h-3 text-emerald-400" />}
          {label}
        </span>

        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs font-normal text-slate-100 truncate pr-1">
            {selectedItem ? (
              <span className="font-medium text-white truncate block">
                {selectedItem.name || selectedItem.label} 
                {selectedItem.bnName && <span className="text-slate-400 text-[11px] font-normal ml-1">({selectedItem.bnName})</span>}
              </span>
            ) : (
              <span className={disabled ? "text-slate-400/80 font-light" : "text-slate-300 font-light"}>
                {placeholder}
              </span>
            )}
          </span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
        </div>
      </div>

      {/* ২. ড্রপডাউন মেনু (ইনপুট বক্সের হুবহু সমান সাইজ - w-full, left-0, right-0) */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[110%] w-full min-w-[180px] max-h-64 bg-[#0c1019]/95 backdrop-blur-2xl border border-slate-700/70 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[9999] p-1.5 flex flex-col animate-in fade-in zoom-in-95 duration-150">
          
          {/* সার্চবার */}
          {searchable && (
            <div className="p-1 border-b border-white/10 mb-1 flex items-center gap-1.5 bg-[#161c28] rounded-xl">
              <Search className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-[11px] text-white placeholder:text-slate-500 focus:outline-none py-0.5"
                autoFocus
              />
            </div>
          )}

          {/* অপশন লিস্ট + আল্ট্রা-স্লিম ডার্ক স্ক্রলবার */}
          <div className="overflow-y-auto max-h-48 space-y-0.5 pr-1 custom-dark-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const optValue = opt.id || opt.name || opt.label;
                const isSelected = value === optValue;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition ${
                      isSelected 
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col truncate pr-1">
                      <span className="leading-snug truncate text-xs">{opt.name || opt.label}</span>
                      {opt.bnName && (
                        <span className="text-[10px] text-slate-400 font-normal truncate">
                          {opt.bnName}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />}
                  </button>
                );
              })
            ) : (
              <p className="text-center text-xs text-slate-400 py-2">No options found</p>
            )}
          </div>

        </div>
      )}

    </div>
  );
}