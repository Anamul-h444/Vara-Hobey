/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/context/AuthContext.js
 * Description: Global authentication state provider managing user session,
 *              local storage synchronization, and authorization state.
 * ==============================================================================
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Authentication Context
const AuthContext = createContext({
  user: null,
  loading: true,
  loginState: () => {},
  updateUserState: () => {},
  logoutState: () => {},
});

/**
 * Authentication Context Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                  Restore User Session on Initial Mount                     */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('vara_hobe_user');
      const storedToken = localStorage.getItem('vara_hobe_token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to restore authentication session:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                         Authentication Action Handlers                     */
  /* -------------------------------------------------------------------------- */
  /**
   * Set user session after successful login / registration / OAuth
   * @param {Object} userData
   */
  const loginState = (userData) => {
    setUser(userData);
    localStorage.setItem('vara_hobe_user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('vara_hobe_token', userData.token);
    }
  };

  /**
   * Update active user profile fields without re-authenticating
   * @param {Object} updatedFields
   */
  const updateUserState = (updatedFields) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedFields };
      localStorage.setItem('vara_hobe_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  /**
   * Clear session and purge authentication data
   */
  const logoutState = () => {
    setUser(null);
    localStorage.removeItem('vara_hobe_user');
    localStorage.removeItem('vara_hobe_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginState,
        updateUserState,
        logoutState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};