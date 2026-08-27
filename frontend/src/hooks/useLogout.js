/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/hooks/useLogout.js
 * Description: Reusable hook to handle complete backend & frontend session clearance
 *              with clean hard navigation.
 * ==============================================================================
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async (callback) => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      if (typeof callback === 'function') {
        callback();
      }

      if (logout) {
        await logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        
        // কুকি ক্লিয়ার
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
        });

        // ক্যাশ ও মেমোরি স্টেট ফ্রেশ করে রিডাইরেক্ট
        window.location.href = '/';
      }
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
}