'use client';

import React, { useState, useEffect } from 'react';
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
  RefreshCw 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  
  // Step Controllers
  const [signupStep, setSignupStep] = useState(1); // 1: Form, 2: OTP, 3: Success
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Pass, 4: Success
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    signupOtp: '',
    forgotOtp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMode(initialMode);
    setSignupStep(1);
    setForgotStep(1);
    setErrors({});
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ফর্ম ভ্যালিডেশন
  const validate = () => {
    const newErrors = {};

    // 1. Sign Up OTP Flow
    if (mode === 'signup') {
      if (signupStep === 1) {
        if (!formData.name.trim()) newErrors.name = 'আপনার পূর্ণ নাম লিখুন';
        
        if (!formData.email.trim()) {
          newErrors.email = 'ইমেইল অ্যাড্রেস আবশ্যক';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'সঠিক ইমেইল লিখুন (যেমন: name@gmail.com)';
        }

        if (!formData.phone.trim()) {
          newErrors.phone = 'মোবাইল নম্বর প্রদান করুন';
        } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.phone.trim())) {
          newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন';
        }

        if (!formData.password) {
          newErrors.password = 'পাসওয়ার্ড প্রদান করুন';
        } else if (formData.password.length < 6) {
          newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
        }
      } else if (signupStep === 2) {
        if (!formData.signupOtp.trim()) {
          newErrors.signupOtp = '৬ ডিজিটের কোডটি লিখুন';
        } else if (formData.signupOtp.trim().length !== 6) {
          newErrors.signupOtp = 'কোডটি অবশ্যই ৬ ডিজিটের হতে হবে';
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    // 2. Forgot Password Flow
    if (mode === 'forgot') {
      if (forgotStep === 1) {
        if (!formData.email.trim()) {
          newErrors.email = 'ইমেইল অ্যাড্রেস প্রদান করুন';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'সঠিক ইমেইল লিখুন';
        }
      } else if (forgotStep === 2) {
        if (!formData.forgotOtp.trim()) {
          newErrors.forgotOtp = '৬ ডিজিটের কোডটি লিখুন';
        } else if (formData.forgotOtp.trim().length !== 6) {
          newErrors.forgotOtp = 'কোডটি অবশ্যই ৬ ডিজিটের হতে হবে';
        }
      } else if (forgotStep === 3) {
        if (!formData.newPassword) {
          newErrors.newPassword = 'নতুন পাসওয়ার্ড লিখুন';
        } else if (formData.newPassword.length < 6) {
          newErrors.newPassword = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'উভয় পাসওয়ার্ড হুবহু একই হতে হবে';
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    // 3. Sign In
    if (mode === 'signin') {
      if (!formData.email.trim()) {
        newErrors.email = 'ইমেইল অ্যাড্রেস আবশ্যক';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'সঠিক ইমেইল লিখুন';
      }

      if (!formData.password) {
        newErrors.password = 'পাসওয়ার্ড প্রদান করুন';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // --- SIGN UP LOGIC ---
    if (mode === 'signup') {
      if (signupStep === 1) {
        console.log('Sending Signup Verification OTP to:', formData.email);
        setSignupStep(2); // ইমেইলে ওটিপি পাঠানো হলো এবং ওটিপি ইনপুট বক্সে নেওয়া হলো
      } else if (signupStep === 2) {
        console.log('Verifying Signup OTP & Creating Account in DB:', formData);
        setSignupStep(3); // একাউন্ট সাকসেসফুলি ক্রিয়েট
      }
    } 
    // --- FORGOT PASSWORD LOGIC ---
    else if (mode === 'forgot') {
      if (forgotStep === 1) {
        console.log('Sending Forgot Password OTP to:', formData.email);
        setForgotStep(2);
      } else if (forgotStep === 2) {
        console.log('Forgot OTP Verified:', formData.forgotOtp);
        setForgotStep(3);
      } else if (forgotStep === 3) {
        console.log('Password Updated Successfully in DB');
        setForgotStep(4);
      }
    } 
    // --- SIGN IN LOGIC ---
    else {
      console.log('Sign In Data:', { email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      
      {/* ব্যাকড্রপ */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in" 
        onClick={onClose} 
      />

      {/* মেইন কার্ড */}
      <div className="relative z-10 w-full max-w-md bg-[#0c1019]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200">
        
        {/* ক্লোজ বাটন */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* হেডার */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-md ${
              mode === 'forgot'
                ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 shadow-amber-500/20'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/20'
            }`}>
              {mode === 'forgot' ? <KeyRound className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            </div>
            <span className="text-base font-black tracking-widest text-white uppercase">
              VARA<span className="text-emerald-400">HOBE</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {mode === 'signup' 
              ? (signupStep === 1 ? 'Create Your Account' : signupStep === 2 ? 'Verify Email Address' : 'Account Created!') 
              : mode === 'forgot'
                ? (forgotStep === 1 ? 'Reset Password' : forgotStep === 2 ? 'Verify OTP Code' : forgotStep === 3 ? 'Set New Password' : 'Password Reset!')
                : 'Welcome Back'}
          </h3>
          
          <p className="font-bangla text-xs text-slate-400 mt-0.5">
            {mode === 'signup'
              ? (signupStep === 1 
                  ? 'একটি অ্যাকাউন্টেই ভাড়াটিয়া ও বাড়িওয়ালা—উভয় সুবিধাই পাবেন' 
                  : signupStep === 2 
                    ? `${formData.email} ঠিকানায় পাঠানো ৬ ডিজিটের কোডটি লিখুন`
                    : 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে')
              : mode === 'forgot'
                ? (forgotStep === 1 
                    ? 'আপনার অ্যাকাউন্টের ইমেইল দিন, একটি ভেরিফিকেশন কোড পাঠানো হবে' 
                    : forgotStep === 2 
                      ? `${formData.email} ঠিকানায় পাঠানো ৬ ডিজিটের কোডটি লিখুন`
                      : forgotStep === 3 
                        ? 'একটি শক্তিশালী নতুন পাসওয়ার্ড নির্ধারণ করুন' 
                        : 'আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে')
                : 'আপনার অ্যাকাউন্টে সাইন ইন করুন'}
          </p>
        </div>

        {/* ================= SUCCESS STATES ================= */}
        {/* ১. সাইন আপ সাকসেস স্ক্রিন */}
        {mode === 'signup' && signupStep === 3 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">স্বাগতম, {formData.name}!</h4>
            <p className="font-bangla text-xs text-slate-300 mt-1">
              আপনার ইমেইল সফলভাবে ভেরিফাই করা হয়েছে। এখন সাইন ইন করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setSignupStep(1);
              }}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ২. পাসওয়ার্ড রিসেট সাকসেস স্ক্রিন */}
        {mode === 'forgot' && forgotStep === 4 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="font-bangla text-xs text-slate-300">
              আপনি এখন আপনার নতুন পাসওয়ার্ড দিয়ে সাইন ইন করতে পারেন।
            </p>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setForgotStep(1);
              }}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= MAIN FORM SECTION ================= */}
        {((mode === 'signup' && signupStep !== 3) || (mode === 'forgot' && forgotStep !== 4) || mode === 'signin') && (
          <>
            {/* সোশ্যাল গুগল বাটন (শুধু প্রথম স্টেপে) */}
            {((mode === 'signin') || (mode === 'signup' && signupStep === 1)) && (
              <>
                <button
                  type="button"
                  onClick={() => console.log('Google OAuth')}
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
              
              {/* ================= SIGN UP: STEP 2 (OTP VERIFICATION) ================= */}
              {mode === 'signup' && signupStep === 2 && (
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Enter 6-Digit Email OTP
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
                      className={`w-full bg-[#141923] border ${
                        errors.signupOtp ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'
                      } rounded-xl pl-10 pr-3.5 py-2.5 text-center tracking-[0.4em] font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none transition`}
                      autoFocus
                    />
                  </div>
                  {errors.signupOtp && (
                    <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.signupOtp}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-2 px-1 text-[11px]">
                    <span className="text-slate-400 font-bangla">কোড পাননি?</span>
                    <button
                      type="button"
                      onClick={() => console.log('Resending Signup OTP to', formData.email)}
                      className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                  </div>
                </div>
              )}

              {/* ================= FORGOT PASS: STEP 2 (OTP VERIFICATION) ================= */}
              {mode === 'forgot' && forgotStep === 2 && (
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    6-Digit Verification Code (OTP)
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
                      className={`w-full bg-[#141923] border ${
                        errors.forgotOtp ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                      } rounded-xl pl-10 pr-3.5 py-2.5 text-center tracking-[0.4em] font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none transition`}
                      autoFocus
                    />
                  </div>
                  {errors.forgotOtp && (
                    <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.forgotOtp}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-2 px-1 text-[11px]">
                    <span className="text-slate-400 font-bangla">কোড পাননি?</span>
                    <button
                      type="button"
                      onClick={() => console.log('Resending Forgot OTP to', formData.email)}
                      className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                  </div>
                </div>
              )}

              {/* ================= FORGOT PASS: STEP 3 (NEW PASSWORD) ================= */}
              {mode === 'forgot' && forgotStep === 3 && (
                <>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`w-full bg-[#141923] border ${
                          errors.newPassword ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                        } rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full bg-[#141923] border ${
                          errors.confirmPassword ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                        } rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-slate-500 hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* ================= REGULAR FORM FIELDS (Step 1 of Signup / Signin / Forgot) ================= */}
              {((mode === 'signup' && signupStep === 1) || (mode === 'forgot' && forgotStep === 1) || mode === 'signin') && (
                <>
                  {/* Full Name (Sign Up only) */}
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                        <input
                          type="text"
                          name="name"
                          placeholder="আপনার পূর্ণ নাম"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-[#141923] border ${
                            errors.name ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                        />
                      </div>
                      {errors.name && (
                        <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-[#141923] border ${
                          errors.email ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'
                        } rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                      />
                    </div>
                    {errors.email && (
                      <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone (Sign Up only) */}
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="017XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-[#141923] border ${
                            errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Password (Sign In & Sign Up only) */}
                  {mode !== 'forgot' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Password
                        </label>
                        {mode === 'signin' && (
                          <button 
                            type="button" 
                            onClick={() => {
                              setMode('forgot');
                              setForgotStep(1);
                              setErrors({});
                            }}
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
                          placeholder={mode === 'signup' ? 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড' : 'আপনার পাসওয়ার্ড'}
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full bg-[#141923] border ${
                            errors.password ? 'border-rose-500' : 'border-white/10 focus:border-emerald-500'
                          } rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="font-bangla flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.password}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* সাবমিট অ্যাকশন বাটন */}
              <button
                type="submit"
                className={`w-full py-3 mt-3 rounded-xl text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'forgot'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/20'
                }`}
              >
                <span>
                  {mode === 'signup'
                    ? (signupStep === 1 ? 'Verify Email & Create' : 'Submit & Register')
                    : mode === 'forgot'
                      ? (forgotStep === 1 ? 'Send Verification Code' : forgotStep === 2 ? 'Verify & Continue' : 'Update Password')
                      : 'Sign In'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* ফুটার নেভিগেশন */}
            <div className="text-center mt-5 text-xs text-slate-400">
              {mode === 'signup' && signupStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setSignupStep(1)}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              ) : mode === 'forgot' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (forgotStep > 1) {
                      setForgotStep(forgotStep - 1);
                    } else {
                      setMode('signin');
                      setForgotStep(1);
                    }
                    setErrors({});
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{forgotStep > 1 ? 'Go Back' : 'Back to Sign In'}</span>
                </button>
              ) : mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrors({});
                    }}
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
                    onClick={() => {
                      setMode('signup');
                      setSignupStep(1);
                      setErrors({});
                    }}
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