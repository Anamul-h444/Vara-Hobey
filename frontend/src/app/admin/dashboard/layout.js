/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/layout.js
 * Description: Admin Dashboard Layout with enhanced UI/UX and clean typography.
 * ==============================================================================
 */

"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { adminNavItems } from "@/config/adminNav";
import AdminDashboardSidebar from "@/app/admin/dashboard/AdminDashboardSidebar";
import AdminDashboardHeader from "@/app/admin/dashboard/AdminDashboardHeader";
import AdminDashboardMobileHeader from "@/app/admin/dashboard/AdminDashboardMobileHeader";
import ProfileModal from "@/app/components/common/ProfileModal";

export default function AdminDashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#0b0f17] text-slate-100 flex overflow-hidden antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Sidebar Component */}
      <AdminDashboardSidebar navItems={adminNavItems} roleLabel="Admin Panel" />

      {/* Mobile Navigation Header */}
      <AdminDashboardMobileHeader
        navItems={adminNavItems}
        roleLabel="Admin Panel"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 h-full flex flex-col min-w-0 bg-[#0b0f17] overflow-hidden">
        <AdminDashboardHeader
          roleLabel="Admin Panel"
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        {/* Scrollable Main Content with comfortable padding and spacing */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-10 py-6 sm:py-8 pb-12 animate-in fade-in duration-500 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
