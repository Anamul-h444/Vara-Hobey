/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/services/authService.js
 * Description: Client-side HTTP client (Axios) configuration, global JWT
 *              request interceptor, and Authentication & Profile API methods.
 * ==============================================================================
 */

import axios from 'axios';

/* -------------------------------------------------------------------------- */
/*                           Axios Instance Config                            */
/* -------------------------------------------------------------------------- */
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Attach Authorization Bearer Token automatically to outgoing requests
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('vara_hobe_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* -------------------------------------------------------------------------- */
/*                         1. User Registration & Login                       */
/* -------------------------------------------------------------------------- */

/**
 * Request registration verification OTP to email
 * @param {string} email
 */
export const sendSignupOtpApi = async (email) => {
  const response = await API.post('/auth/send-signup-otp', { email });
  return response.data;
};

/**
 * Verify registration OTP and create user profile (supports avatar upload)
 * @param {Object} userData - { name, email, phone, password, signupOtp }
 * @param {File|null} avatarFile - Image File object
 */
export const registerUserApi = async (userData, avatarFile) => {
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('password', userData.password);
  formData.append('otp', userData.signupOtp);

  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }

  const response = await API.post('/auth/verify-and-register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Standard user email/password login
 * @param {Object} credentials - { email, password }
 */
export const loginUserApi = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/*                           2. Google OAuth Service                          */
/* -------------------------------------------------------------------------- */

/**
 * Authenticate via Google OAuth Access Token
 * @param {string} googleToken
 */
export const googleAuthApi = async (googleToken) => {
  const response = await API.post('/auth/google', { token: googleToken });
  return response.data;
};

/* -------------------------------------------------------------------------- */
/*                       3. Password Recovery Services                        */
/* -------------------------------------------------------------------------- */

/**
 * Send password recovery OTP
 * @param {string} email
 */
export const sendForgotOtpApi = async (email) => {
  const response = await API.post('/auth/send-forgot-otp', { email });
  return response.data;
};

/**
 * Verify OTP without executing password update immediately
 * @param {string} email
 * @param {string} otp
 * @param {string} type - 'forgot' | 'signup'
 */
export const verifyOtpApi = async (email, otp, type = 'forgot') => {
  const response = await API.post('/auth/verify-otp', { email, otp, type });
  return response.data;
};

/**
 * Reset user password with verified OTP
 * @param {Object} resetData - { email, forgotOtp, newPassword }
 */
export const resetPasswordApi = async (resetData) => {
  const response = await API.post('/auth/reset-password', {
    email: resetData.email,
    otp: resetData.forgotOtp,
    newPassword: resetData.newPassword,
  });
  return response.data;
};

/* -------------------------------------------------------------------------- */
/*                       4. User Profile & Settings API                       */
/* -------------------------------------------------------------------------- */

/**
 * Update authenticated user profile details & avatar
 * @param {Object} userData - { name, phone }
 * @param {File|null} avatarFile - Image File object
 */
export const updateProfileApi = async (userData, avatarFile = null) => {
  const formData = new FormData();
  if (userData.name) formData.append('name', userData.name);
  if (userData.phone !== undefined) formData.append('phone', userData.phone);
  if (avatarFile) formData.append('avatar', avatarFile);

  const response = await API.put('/auth/update-profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Change password for authenticated users
 * @param {Object} passwordData - { currentPassword, newPassword }
 */
export const changePasswordApi = async (passwordData) => {
  const response = await API.put('/auth/change-password', passwordData);
  return response.data;
};