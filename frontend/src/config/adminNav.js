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
  Settings,
  BarChart3,
  MapPin,
} from "lucide-react";

export const adminNavItems = [
  {
    name: "Home",

    href: "/",
    icon: Home,
  },
  {
    name: "Overview",

    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Property Types",
    href: "/admin/dashboard/rent-types",
    icon: Building2, // অথবা আপনার পছন্দমতো আইকন
  },
  {
    name: "Locations ",
    href: "/admin/dashboard/locations",
    icon: MapPin,
  },
  {
    name: "Properties",

    href: "/admin/dashboard/properties",
    icon: Building2,
  },
  {
    name: "Approvals",

    href: "/admin/dashboard/approvals",
    icon: Clock,
    badge: "24",
  },
  {
    name: "Users",

    href: "/admin/dashboard/users",
    icon: Users,
  },
  {
    name: "Analytics",

    href: "/admin/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",

    href: "/admin/dashboard/settings",
    icon: Settings,
  },
];
