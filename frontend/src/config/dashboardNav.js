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
  Users, 
  Clock, 
  Bookmark, 
  Settings, 
  MessageSquare,
  BarChart3,
  MapPin
} from 'lucide-react';

export const adminNavItems = [
  {
    name: 'Home',
    nameBn: 'হোমপেজ',
    href: '/',
    icon: Home,
  },
  {
    name: 'Overview',
    nameBn: 'ওভারভিউ',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Location Management', 
    href: '/admin/dashboard/locations',
    icon: MapPin,
  },
  {
    name: 'Properties',
    nameBn: 'প্রপার্টি তালিকা',
    href: '/admin/dashboard/properties',
    icon: Building2,
  },
  {
    name: 'Approvals',
    nameBn: 'অনুমোদন পেন্ডিং',
    href: '/admin/dashboard/approvals',
    icon: Clock,
    badge: '24',
  },
  {
    name: 'Users',
    nameBn: 'ব্যবহারকারী',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  {
    name: 'Analytics',
    nameBn: 'অ্যানালিটিক্স',
    href: '/admin/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    nameBn: 'সেটিংস',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export const userNavItems = [
  {
    name: 'Home',
    nameBn: 'হোমপেজ',
    href: '/',
    icon: Home,
  },
  {
    name: 'Overview',
    nameBn: 'ওভারভিউ',
    href: '/user/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Listings',
    nameBn: 'আমার বিজ্ঞাপন',
    href: '/user/dashboard/listings',
    icon: Building2,
  },
  {
    name: 'Saved',
    nameBn: 'সংরক্ষিত প্রপার্টি',
    href: '/user/dashboard/saved',
    icon: Bookmark,
  },
  {
    name: 'Messages',
    nameBn: 'মেসেজ',
    href: '/user/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Settings',
    nameBn: 'সেটিংস',
    href: '/user/dashboard/settings',
    icon: Settings,
  },
];