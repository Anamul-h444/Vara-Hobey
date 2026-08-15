'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/common/Sidebar';
import MobileHeader from '@/app/components/common/MobileHeader';
import MobileMenuDrawer from '@/app/components/common/MobileMenuDrawer';
import HeroSection from '@/app/components/modules/home/HeroSection';
import AdvancedFilterModal from '@/app/components/modules/home/AdvancedFilterModal';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white flex flex-col md:flex-row">
      <Sidebar />
      
      <MobileMenuDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <AdvancedFilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        selectedType={selectedType}
      />

      <div className="flex-1 md:pl-[72px]">
        <MobileHeader onToggleMenu={() => setIsMobileMenuOpen(true)} />

        <HeroSection 
          onOpenFilter={() => setIsFilterModalOpen(true)}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Properties Gallery... */}
      </div>
    </div>
  );
}