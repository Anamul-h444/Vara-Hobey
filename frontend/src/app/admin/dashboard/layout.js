'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRoleGuard } from '@/hooks/useRoleGuard';
import { adminNavItems } from '@/config/dashboardNav';
import DashboardSidebar from '@/app/components/dashboard/layout/DashboardSidebar';
import DashboardHeader from '@/app/components/dashboard/layout/DashboardHeader';
import DashboardMobileHeader from '@/app/components/dashboard/layout/DashboardMobileHeader';
import ProfileModal from '@/app/components/common/ProfileModal';

export default function AdminDashboardLayout({ children }) {
  const { isAuthorized, loading } = useRoleGuard('admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  if (loading || !isAuthorized) {
    return (
      <div className="h-screen w-screen bg-[#080b11] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#080b11] text-white flex overflow-hidden antialiased">
      <DashboardSidebar navItems={adminNavItems} roleLabel="Admin Panel" />
      
      <DashboardMobileHeader 
        navItems={adminNavItems} 
        roleLabel="Admin Panel" 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* ডানপাশের অংশ */}
      <div className="flex-1 lg:pl-64 h-full flex flex-col min-w-0 bg-[#080b11] overflow-hidden">
        <DashboardHeader 
          roleLabel="Admin Panel" 
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />
        
        {/* এখানে overflow-y-auto এর পরিবর্তে auto ব্যবহার করা হয়েছে এবং ওভারফ্লো একদম কন্ট্রোলে রাখা হয়েছে */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
}