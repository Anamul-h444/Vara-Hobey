/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/LogoutButton.js
 * Description: Universal animated logout button with loading indicator.
 * ==============================================================================
 */

'use client';

import React from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

export default function LogoutButton({ 
  className = '', 
  showIcon = true, 
  label = 'Logout', 
  onBeforeLogout 
}) {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <button
      type="button"
      disabled={isLoggingOut}
      onClick={() => handleLogout(onBeforeLogout)}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Logout"
    >
      {isLoggingOut ? (
        <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
      ) : (
        showIcon && <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span>{isLoggingOut ? 'Logging out...' : label}</span>
    </button>
  );
}