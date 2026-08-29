/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/config/dashboardNav.js
 * Description: Role-based navigation item configurations for Admin & User.
 * ==============================================================================
 */

import {
  Home,
  LayoutDashboard,
  Building2,
  Bookmark,
  Settings,
  MessageSquare,
  FileEdit,
} from "lucide-react";

export const userNavItems = [
  {
    name: "Home",
    nameBn: "হোমপেজ",
    href: "/",
    icon: Home,
  },

  {
    name: "Overview",
    nameBn: "ওভারভিউ",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "My Listings",
    nameBn: "আমার বিজ্ঞাপন",
    href: "/user/dashboard/listings",
    icon: Building2,
  },

  // ============================================================================
  // MY DRAFTS
  // ============================================================================

  {
    name: "My Drafts",
    nameBn: "আমার ড্রাফট",
    href: "/user/dashboard/drafts",
    icon: FileEdit,
    isDrafts: true,
  },

  {
    name: "Saved",
    nameBn: "সংরক্ষিত প্রপার্টি",
    href: "/user/dashboard/saved",
    icon: Bookmark,
  },

  {
    name: "Messages",
    nameBn: "মেসেজ",
    href: "/user/dashboard/messages",
    icon: MessageSquare,
  },

  {
    name: "Settings",
    nameBn: "সেটিংস",
    href: "/user/dashboard/settings",
    icon: Settings,
  },
];
