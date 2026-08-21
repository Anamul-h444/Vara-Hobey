/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/AuthModal.js
 * Description: Unified Authentication Modal supporting Sign In, Multi-step
 *              Sign Up with OTP & Avatar Upload, Password Recovery, and Google OAuth.
 * ==============================================================================
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  KeyRound, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Camera,
  Loader2
} from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

// Services & Context
import { 
  sendSignupOtpApi, 
  registerUserApi, 
  loginUserApi, 
  googleAuthApi,
  sendForgotOtpApi, 
  verifyOtpApi,
  resetPasswordApi 
} from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

/* -------------------------------------------------------------------------- */
/*                            Initial Form States                             */
/* -------------------------------------------------------------------------- */
const initialFormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  signupOtp: '',
  forgotOtp: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const { loginState } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                                Modal States                                */
  /* -------------------------------------------------------------------------- */
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [signupStep, setSignupStep] = useState(1); // 1: Info -> 2: OTP -> 3: Success
  const [forgotStep, setForgotStep] = useState(1); // 1: Email -> 2: OTP -> 3: New Pass -> 4: Success

  // Form Fields & Visibility
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Avatar Upload States
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /*                              Helper Methods                                */
  /* -------------------------------------------------------------------------- */
  const resetFormState = () => {
    setFormData(initialFormState);
    setErrors({});
    setServerError('');
    setAvatarFile(null);
    setAvatarPreview(null);
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const switchMode = (newMode) => {
    resetFormState();
    setSignupStep(1);
    setForgotStep(1);
    setMode(newMode);
  };

  useEffect(() => {
    if (isOpen) {
      switchMode(initialMode);
    }
  }, [isOpen, initialMode]);

  /* -------------------------------------------------------------------------- */
  /*                          Google OAuth Integration                          */
  /* -------------------------------------------------------------------------- */
  const handleGoogleLoginSuccess = async (tokenResponse) => {
    setIsLoading(true);
    setServerError('');
    try {
      const token = tokenResponse.access_token || tokenResponse.credential;
      const res = await googleAuthApi(token);
      loginState(res.user);
      resetFormState();
      onClose();
    } catch (err) {
      setServerError(err.response?.data?.message || 'গুগল লগইন সম্পন্ন করা যায়নি!');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => setServerError('গুগল অথেন্টিকেশন উইন্ডো বাতিল করা হয়েছে!'),
  });

  /* -------------------------------------------------------------------------- */
  /*                           Input & File Handlers                            */
  /* -------------------------------------------------------------------------- */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate mime-types
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setServerError('শুধুমাত্র JPG, JPEG, PNG এবং WEBP ফরম্যাটের ছবি আপলোড করুন!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate size limit (3 MB)
    if (file.size > 3 * 1024 * 1024) {
      setServerError('ছবির সাইজ সর্বোচ্চ ৩ মেগাবাইট (3 MB) হতে পারবে!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setServerError('');
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  /* -------------------------------------------------------------------------- */
  /*                             Form Validation                                */
  /* -------------------------------------------------------------------------- */
  const validate = () => {
    const newErrors = {};

    if (mode === 'signup') {
      if (signupStep === 1) {
        if (!formData.name.trim()) newErrors.name = 'আপনার পূর্ণ নাম লিখুন';
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'সঠিক ইমেইল লিখুন';
        }
        if (!formData.phone.trim() || !/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.phone.trim())) {
          newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন';
        }
        if (!formData.password || formData.password.length < 6) {
          newErrors.password = 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন';
        }
      } else if (signupStep === 2) {
        if (!formData.signupOtp.trim() || formData.signupOtp.trim().length !== 6) {
          newErrors.signupOtp = '৬ ডিজিটের ওটিপি কোডটি লিখুন';
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (mode === 'forgot') {
      if (forgotStep === 1) {
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'সঠিক ইমেইল লিখুন';
        }
      } else if (forgotStep === 2) {
        if (!formData.forgotOtp.trim() || formData.forgotOtp.trim().length !== 6) {
          newErrors.forgotOtp = '৬ ডিজিটের কোডটি লিখুন';
        }
      } else if (forgotStep === 3) {
        if (!formData.newPassword || formData.newPassword.length < 6) {
          newErrors.newPassword = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'উভয় পাসওয়ার্ড একই হতে হবে';
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (mode === 'signin') {
      if (!formData.email.trim()) newErrors.email = 'ইমেইল অ্যাড্রেস আবশ্যক';
      if (!formData.password) newErrors.password = 'পাসওয়ার্ড প্রদান করুন';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true;
  };

  /* -------------------------------------------------------------------------- */
  /*                            Form Submit Action                              */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      if (mode === 'signup') {
        if (signupStep === 1) {
          await sendSignupOtpApi(formData.email);
          setSignupStep(2);
        } else if (signupStep === 2) {
          const res = await registerUserApi(formData, avatarFile);
          loginState(res.user);
          setSignupStep(3);
          resetFormState();
        }
      } else if (mode === 'forgot') {
        if (forgotStep === 1) {
          await sendForgotOtpApi(formData.email);
          setForgotStep(2);
        } else if (forgotStep === 2) {
          await verifyOtpApi(formData.email, formData.forgotOtp, 'forgot');
          setForgotStep(3);
        } else if (forgotStep === 3) {
          await resetPasswordApi(formData);
          setForgotStep(4);
          resetFormState();
        }
      } else if (mode === 'signin') {
        const res = await loginUserApi({
          email: formData.email,
          password: formData.password,
        });
        loginState(res.user);
        resetFormState();
        onClose();
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন!');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in cursor-pointer" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-[#0c1019]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-md ${
              mode === 'forgot'
                ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950'
            }`}>
              {mode === 'forgot' ? <KeyRound className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            </div>
            <span className="text-base font-black tracking-widest text-white uppercase">
              VARA<span className="text-emerald-400">HOBE</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {mode === 'signup' 
              ? (signupStep === 1 ? 'Create Your Account' : signupStep === 2 ? 'Verify Email' : 'Registration Complete!') 
              : mode === 'forgot'
                ? (forgotStep === 1 ? 'Reset Password' : forgotStep === 2 ? 'Verify OTP' : forgotStep === 3 ? 'Set New Password' : 'Password Reset!')
                : 'Welcome Back'}
          </h3>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-bangla animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Success View: Registration */}
        {mode === 'signup' && signupStep === 3 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">স্বাগতম!</h4>
            <p className="font-bangla text-xs text-slate-300 mt-1">আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer hover:opacity-90 transition active:scale-95"
            >
              Start Exploring
            </button>
          </div>
        )}

        {/* Success View: Password Reset */}
        {mode === 'forgot' && forgotStep === 4 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="font-bangla text-xs text-slate-300">পাসওয়ার্ড সফলভাবে আপডেট হয়েছে।</p>
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer hover:opacity-90 transition active:scale-95"
            >
              Sign In Now
            </button>
          </div>
        )}

        {/* Interactive Forms View */}
        {((mode === 'signup' && signupStep !== 3) || (mode === 'forgot' && forgotStep !== 4) || mode === 'signin') && (
          <>
            {/* Google Authentication Trigger */}
            {((mode === 'signin') || (mode === 'signup' && signupStep === 1)) && (
              <>
                <button
                  type="button"
                  onClick={() => loginWithGoogle()}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#141923] hover:bg-[#1c2230] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-3 transition active:scale-[0.98] mb-4 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-full border-t border-white/10" />
                  <span className="bg-[#0c1019] px-3 text-[10px] text-slate-500 uppercase tracking-widest absolute">
                    Or with email
                  </span>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              {/* Avatar Selector (Signup Step 1) */}
              {mode === 'signup' && signupStep === 1 && (
                <div className="flex flex-col items-center mb-3">
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#141923] flex items-center justify-center shadow-lg">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-7 h-7 text-slate-500" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-slate-950 cursor-pointer shadow-md hover:scale-110 transition active:scale-95">
                      <Camera className="w-3.5 h-3.5" />
                      <input 
                        ref={fileInputRef} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 font-bangla">প্রোফাইল ছবি (ঐচ্ছিক)</span>
                </div>
              )}

              {/* OTP Field (Signup Step 2) */}
              {mode === 'signup' && signupStep === 2 && (
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    6-Digit OTP Sent to {formData.email}
                  </label>
                  <div className="relative flex items-center">
                    <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5" />
                    <input
                      type="text"
                      name="signupOtp"
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={formData.signupOtp}
                      onChange={handleChange}
                      className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-center tracking-[0.4em] font-mono text-sm text-white focus:outline-none transition"
                      autoFocus
                    />
                  </div>
                  {errors.signupOtp && <p className="text-[11px] text-rose-400 mt-1">{errors.signupOtp}</p>}
                </div>
              )}

              {/* OTP Field (Forgot Password Step 2) */}
              {mode === 'forgot' && forgotStep === 2 && (
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    6-Digit Reset OTP Sent to {formData.email}
                  </label>
                  <div className="relative flex items-center">
                    <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5" />
                    <input
                      type="text"
                      name="forgotOtp"
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={formData.forgotOtp}
                      onChange={handleChange}
                      className="w-full bg-[#141923] border border-white/10 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-2.5 text-center tracking-[0.4em] font-mono text-sm text-white focus:outline-none transition"
                      autoFocus
                    />
                  </div>
                  {errors.forgotOtp && <p className="text-[11px] text-rose-400 mt-1">{errors.forgotOtp}</p>}
                </div>
              )}

              {/* New Password Inputs (Forgot Password Step 3) */}
              {mode === 'forgot' && forgotStep === 3 && (
                <>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full bg-[#141923] border border-white/10 focus:border-amber-400 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowNewPassword(!showNewPassword)} 
                        className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.newPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.newPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Confirm Password</label>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-[#141923] border border-white/10 focus:border-amber-400 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </>
              )}

              {/* Standard Text Inputs */}
              {((mode === 'signup' && signupStep === 1) || (mode === 'forgot' && forgotStep === 1) || mode === 'signin') && (
                <>
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                        <input
                          type="text"
                          name="name"
                          placeholder="আপনার পূর্ণ নাম"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="017XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  )}

                  {mode !== 'forgot' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                        {mode === 'signin' && (
                          <button 
                            type="button" 
                            onClick={() => switchMode('forgot')} 
                            className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="আপনার পাসওয়ার্ড"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
                    </div>
                  )}
                </>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-3 rounded-xl text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'forgot'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signup'
                        ? (signupStep === 1 ? 'Send Verification OTP' : 'Complete Registration')
                        : mode === 'forgot'
                          ? (forgotStep === 1 ? 'Send Code' : forgotStep === 2 ? 'Verify Code' : 'Update Password')
                          : 'Sign In'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode Navigation */}
            <div className="text-center mt-5 text-xs text-slate-400">
              {mode === 'forgot' ? (
                <button 
                  type="button" 
                  onClick={() => switchMode('signin')} 
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>
              ) : mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => switchMode('signin')} 
                    className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => switchMode('signup')} 
                    className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}