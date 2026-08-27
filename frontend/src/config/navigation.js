import { 
  Home, 
  LayoutDashboard,
  Building2, 
  PlusCircle, 
  Bookmark, 
  Compass, 
  MoreHorizontal 
} from 'lucide-react';

export const navMenuItems = [
  { name: 'Home', icon: Home, href: '/' },
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard', 
    authRequired: true, 
  },
  { name: 'Rentals', icon: Building2, href: '/listings' },
  { name: 'Add Rent', icon: PlusCircle, href: '/add-listing' },
  { name: 'Saved', icon: Bookmark, href: '/saved' },
  { name: 'Explore', icon: Compass, href: '/explore' },
  { name: 'More', icon: MoreHorizontal, href: '#' },
];