'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে সেভ করা লগইন ডাটা লোড
    const storedUser = localStorage.getItem('vara_hobe_user');
    const storedToken = localStorage.getItem('vara_hobe_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginState = (userData) => {
    setUser(userData);
    localStorage.setItem('vara_hobe_user', JSON.stringify(userData));
    localStorage.setItem('vara_hobe_token', userData.token);
  };

  const logoutState = () => {
    setUser(null);
    localStorage.removeItem('vara_hobe_user');
    localStorage.removeItem('vara_hobe_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginState, logoutState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);