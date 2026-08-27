'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { userNavItems } from '@/config/dashboardNav';
import DashboardSidebar from '@/app/components/dashboard/layout/DashboardSidebar';
import DashboardHeader from '@/app/components/dashboard/layout/DashboardHeader';
import DashboardMobileHeader from '@/app/components/dashboard/layout/DashboardMobileHeader';
import ProfileModal from '@/app/components/common/ProfileModal';

export default function UserDashboardLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#080b11] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen w-full bg-[#080b11] text-white flex overflow-hidden antialiased">
      <DashboardSidebar navItems={userNavItems} roleLabel="User Panel" />
      
      <DashboardMobileHeader 
        navItems={userNavItems} 
        roleLabel="User Panel" 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-1 lg:pl-64 h-full flex flex-col overflow-hidden">
        <DashboardHeader 
          roleLabel="User Panel" 
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
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