import { 
  Home, 
  Building2, 
  PlusCircle, 
  Bookmark, 
  Compass, 
  MoreHorizontal 
} from 'lucide-react';

export const navMenuItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Rentals', icon: Building2, href: '/listings' },
  { name: 'Add Rent', icon: PlusCircle, href: '/add-listing' },
  { name: 'Saved', icon: Bookmark, href: '/saved' },
  { name: 'Explore', icon: Compass, href: '/explore' },
  { name: 'More', icon: MoreHorizontal, href: '#' },
];