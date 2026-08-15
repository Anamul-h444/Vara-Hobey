'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/common/Sidebar';
import MobileHeader from '@/app/components/common/MobileHeader';
import MobileMenuDrawer from '@/app/components/common/MobileMenuDrawer';
import HeroSection from '@/app/components/modules/home/HeroSection';
import AdvancedFilterModal from '@/app/components/modules/home/AdvancedFilterModal';
import AuthModal from '@/app/components/common/AuthModal';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  
  // Single Auth Modal Controller
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-white flex flex-col md:flex-row">
      
      {/* Desktop Slim Sidebar */}
      <Sidebar onOpenSignIn={() => openAuthModal('signin')} />
      
      {/* Mobile Drawer */}
      <MobileMenuDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSignIn={() => openAuthModal('signin')}
        onOpenSignUp={() => openAuthModal('signup')}
      />

      {/* Advanced Filter Drawer */}
      <AdvancedFilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        selectedType={selectedType}
      />

      {/* Global Interactive Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />

      <div className="flex-1 md:pl-[72px]">
        <MobileHeader onToggleMenu={() => setIsMobileMenuOpen(true)} />

        <HeroSection 
          onOpenFilter={() => setIsFilterModalOpen(true)}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
    </div>
  );
}