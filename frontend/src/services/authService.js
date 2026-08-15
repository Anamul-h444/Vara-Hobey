import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// ১. সাইন আপ ওটিপি পাঠানো
export const sendSignupOtpApi = async (email) => {
  const response = await API.post('/auth/send-signup-otp', { email });
  return response.data;
};

// ২. ওটিপি যাচাই ও রেজিস্ট্রেশন (ফাইল সাপোর্ট সহ)
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

// ৩. সাইন ইন
export const loginUserApi = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

// ৪. ফরগট পাসওয়ার্ড ওটিপি পাঠানো
export const sendForgotOtpApi = async (email) => {
  const response = await API.post('/auth/send-forgot-otp', { email });
  return response.data;
};

// ৫. পাসওয়ার্ড রিসেট
export const resetPasswordApi = async (resetData) => {
  const response = await API.post('/auth/reset-password', {
    email: resetData.email,
    otp: resetData.forgotOtp,
    newPassword: resetData.newPassword,
  });
  return response.data;
};