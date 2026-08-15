// src/components/common/MainLayout.js
import React from 'react';
import Navbar from './Sidebar';
import { theme } from '@/config/theme';

export default function MainLayout({ children, className = '' }) {
  return (
    <div className={`min-h-screen flex flex-col ${theme.colors.surface.bg}`}>
      
      {/* ১. ওয়েবসাইটের ন্যাভবার */}
      <Navbar />

      {/* ২. মূল কন্টেন্ট এলাকা */}
      <main className={`flex-1 py-6 sm:py-8 md:py-10 ${theme.container} ${className}`}>
        {children}
      </main>

    </div>
  );
}