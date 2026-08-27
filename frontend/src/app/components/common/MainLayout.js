/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/components/common/MainLayout.js
 * Description: Primary shell layout wrapping shared sub-pages, managing responsive
 *              spacing, global background theme, and smooth route transitions.
 * ==============================================================================
 */

import React from 'react';
import Navbar from './Sidebar';
import { theme } from '@/config/theme';

export default function MainLayout({ children, className = '' }) {
  return (
    <div className={`min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300 ${theme.colors.surface.bg}`}>
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. Global Navigation / Sidebar                                     */}
      {/* ------------------------------------------------------------------ */}
      <Navbar />

      {/* ------------------------------------------------------------------ */}
      {/* 2. Main Scrollable Content Container                               */}
      {/* ------------------------------------------------------------------ */}
      <main 
        className={`flex-1 py-6 sm:py-8 md:py-10 ${theme.container} ${className} duration-300 animate-in fade-in fill-mode-both`}
      >
        {children}
      </main>

    </div>
  );
}