/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/hooks/useRoleGuard.js
 * Description: Robust role guard supporting flexible multi-role checking.
 * ==============================================================================
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useRoleGuard(requiredRole = 'user') {
  const router = useRouter();
  const { user, loading } = useAuth();

  // ফ্লেক্সিবল রোল চেকার
  const checkIsAuthorized = () => {
    if (!user) return false;

    const req = requiredRole.toLowerCase();

    // ১. যদি রিকোয়ারমেন্ট 'user' হয়, তবে অ্যাডমিন ছাড়া যেকোনো লগইন করা ইউজারকেই আমরা পাস করে দিতে পারি (বা নির্দিষ্ট রোল ম্যাচ করতে পারি)
    if (req === 'user') {
      const isAdmin = Boolean(
        (Array.isArray(user.roles) && user.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin')) ||
        (typeof user.role === 'string' && user.role.toLowerCase() === 'admin')
      );
      // অ্যাডমিন নয় এমন যে কেউ ইউজার ড্যাশবোর্ডে ঢুকতে পারবে
      return !isAdmin; 
    }

    // ২. নির্দিষ্ট রোলের জন্য (যেমন: 'admin')
    const hasRolesArray = Array.isArray(user.roles) && user.roles.some((r) => typeof r === 'string' && r.toLowerCase() === req);
    const hasRoleString = typeof user.role === 'string' && user.role.toLowerCase() === req;

    return hasRolesArray || hasRoleString;
  };

  const isAuthorized = checkIsAuthorized();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/');
      } else if (!isAuthorized) {
        // যদি ইউজার অ্যাডমিন হয় কিন্তু ইউজার ড্যাশবোর্ডে আসে, তাকে অ্যাডমিনে পাঠিয়ে দেবো
        const isAdmin = Boolean(
          (Array.isArray(user.roles) && user.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin')) ||
          (typeof user.role === 'string' && user.role.toLowerCase() === 'admin')
        );

        if (isAdmin) {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/');
        }
      }
    }
  }, [user, loading, isAuthorized, router]);

  return { user, loading, isAuthorized };
}