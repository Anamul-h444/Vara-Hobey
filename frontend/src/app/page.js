/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/page.js
 * Description: Homepage root with guaranteed login success popup notification.
 * ==============================================================================
 */

'use client';

import React, { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

// Layout Components
import Sidebar from '@/app/components/common/Sidebar';
import MobileHeader from '@/app/components/common/MobileHeader';
import MobileMenuDrawer from '@/app/components/common/MobileMenuDrawer';
import AuthModal from '@/app/components/common/AuthModal';

// Home Module Components
import HeroSection from '@/app/components/modules/home/HeroSection';
import AdvancedFilterModal from '@/app/components/modules/home/AdvancedFilterModal';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  // Success Notification Popup State
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loggedUserName, setLoggedUserName] = useState('');

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  // লগইন সফল হলে সরাসরি ট্রিগার হওয়া ফাংশন
  const handleLoginSuccess = (userData) => {
    setLoggedUserName(userData?.name || 'User');
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-white flex flex-col md:flex-row antialiased selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      
      {/* 🌟 Animated Login Success Floating Banner */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-[999999] flex items-center gap-3.5 bg-[#0c1019]/95 backdrop-blur-2xl border border-emerald-500/40 text-white px-5 py-3.5 rounded-2xl shadow-[0_15px_40px_rgba(16,185,129,0.35)] animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide text-white">লগইন সফল হয়েছে!</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300 font-bangla mt-0.5">
              স্বাগতম, <span className="text-emerald-400 font-semibold">{loggedUserName}</span>
            </p>
          </div>
        </div>
      )}

      {/* Desktop Slim Sidebar Navigation */}
      <Sidebar onOpenSignIn={() => openAuthModal('signin')} />
      
      {/* Mobile Off-canvas Navigation Drawer */}
      <MobileMenuDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSignIn={() => openAuthModal('signin')}
        onOpenSignUp={() => openAuthModal('signup')}
      />

      {/* Advanced Filter Drawer / Modal */}
      <AdvancedFilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        selectedType={selectedType}
      />

      {/* Global Interactive Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode}
        setMode={setAuthMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Main Content Layout */}
      <main className="flex-1 md:pl-[72px] min-h-screen flex flex-col relative transition-all duration-300">
        <MobileHeader onToggleMenu={() => setIsMobileMenuOpen(true)} />

        <div className="flex-1 duration-300 animate-in fade-in fill-mode-both">
          <HeroSection 
            onOpenFilter={() => setIsFilterModalOpen(true)}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
      </main>

    </div>
  );
}