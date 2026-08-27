/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/ui/CustomSelect.js
 * Description: Sleek, high-padding searchable dropdown with clean text rendering.
 * ==============================================================================
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = options.find(
    (opt) => (opt.id || opt.name || opt.label) === value
  );

  const filteredOptions = searchable 
    ? options.filter((opt) => {
        const textEn = (opt.name || opt.label || '').toLowerCase();
        const textBn = (opt.bnName || '').toLowerCase();
        const query = searchTerm.toLowerCase();
        return textEn.includes(query) || textBn.includes(query);
      })
    : options;

  return (
    <div className="relative w-full select-none" ref={dropdownRef}>
      
      {/* Trigger Capsule */}
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        className={`px-4 py-3 flex flex-col justify-center rounded-2xl transition-all duration-300 cursor-pointer border h-full min-h-[58px] ${
          disabled 
            ? 'opacity-40 cursor-not-allowed bg-[#0c1019]/40 border-white/5' 
            : isOpen 
              ? 'bg-[#151f33] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40' 
              : 'bg-[#111726]/90 border-white/10 hover:border-white/20 hover:bg-[#161f33]'
        }`}
        title={disabled && disabledHint ? disabledHint : ''}
      >
        {/* Label */}
        {label && (
          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider mb-1">
            {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            {label}
          </span>
        )}

        {/* Value Display */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs w-full overflow-hidden">
            {selectedItem ? (
              <span className="font-medium text-white flex items-center gap-1.5 truncate">
                <span className="truncate">{selectedItem.name || selectedItem.label}</span>
                {selectedItem.bnName && (
                  <span className="text-emerald-400/90 font-normal text-[11px] shrink-0">
                    ({selectedItem.bnName})
                  </span>
                )}
              </span>
            ) : (
              <span className="text-slate-500 font-light truncate block">
                {placeholder}
              </span>
            )}
          </span>

          <ChevronDown 
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
              isOpen ? 'rotate-180 text-emerald-400' : ''
            }`} 
          />
        </div>
      </div>

      {/* Floating Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[115%] w-full min-w-[240px] bg-[#0c1019]/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[9999] p-2.5 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {searchable && (
            <div className="p-2 border border-white/10 mb-2 flex items-center gap-2 bg-[#141b2a] rounded-xl focus-within:border-emerald-500/60 transition-all">
              <Search className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
              <input
                type="text"
                placeholder="খুঁজুন (Search)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none px-1"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="overflow-y-auto max-h-56 space-y-1 pr-1 scrollbar-thin scrollbar-thumb-white/10">
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all duration-150 cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' 
                        : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="leading-snug truncate font-medium text-xs">
                        {opt.name || opt.label}
                      </span>
                      {opt.bnName && (
                        <span className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                          {opt.bnName}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1.5" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-center py-6 text-xs text-slate-500 flex flex-col items-center justify-center gap-1">
                <span>🔍 কোনো তথ্য পাওয়া যায়নি</span>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}