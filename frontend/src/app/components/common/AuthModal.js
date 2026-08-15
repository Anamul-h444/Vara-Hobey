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
  RefreshCw,
  Camera,
  Loader2
} from 'lucide-react';
import { 
  sendSignupOtpApi, 
  registerUserApi, 
  loginUserApi, 
  sendForgotOtpApi, 
  resetPasswordApi 
} from '@/services/authService';
import { useAuth } from '@/contex/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const { loginState } = useAuth();
  const [mode, setMode] = useState(initialMode);
  
  const [signupStep, setSignupStep] = useState(1);
  const [forgotStep, setForgotStep] = useState(1);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  // প্রোফাইল পিকচার স্টেট
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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
    setServerError('');
    setAvatarFile(null);
    setAvatarPreview(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};

    if (mode === 'signup') {
      if (signupStep === 1) {
        if (!formData.name.trim()) newErrors.name = 'আপনার পূর্ণ নাম লিখুন';
        if (!formData.email.trim()) {
          newErrors.email = 'ইমেইল অ্যাড্রেস আবশ্যক';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'সঠিক ইমেইল লিখুন';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'মোবাইল নম্বর দিন';
        } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(formData.phone.trim())) {
          newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন';
        }
        if (!formData.password) {
          newErrors.password = 'পাসওয়ার্ড প্রদান করুন';
        } else if (formData.password.length < 6) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      // ১. SIGN UP FLOW
      if (mode === 'signup') {
        if (signupStep === 1) {
          await sendSignupOtpApi(formData.email);
          setSignupStep(2);
        } else if (signupStep === 2) {
          const res = await registerUserApi(formData, avatarFile);
          loginState(res.user);
          setSignupStep(3);
        }
      } 
      // ২. FORGOT PASSWORD FLOW
      else if (mode === 'forgot') {
        if (forgotStep === 1) {
          await sendForgotOtpApi(formData.email);
          setForgotStep(2);
        } else if (forgotStep === 2) {
          setForgotStep(3);
        } else if (forgotStep === 3) {
          await resetPasswordApi(formData);
          setForgotStep(4);
        }
      } 
      // ৩. SIGN IN FLOW
      else if (mode === 'signin') {
        const res = await loginUserApi({
          email: formData.email,
          password: formData.password,
        });
        loginState(res.user);
        onClose(); // সরাসরি লগইন করে মডাল বন্ধ
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#0c1019]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200">
        
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

        {/* সার্ভার এরর ব্যানার */}
        {serverError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-bangla animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* SUCCESS SCREENS */}
        {mode === 'signup' && signupStep === 3 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">অভিনন্দন, {formData.name}!</h4>
            <p className="font-bangla text-xs text-slate-300 mt-1">আপনার অ্যাকাউন্ট সফলভাবে সক্রিয় করা হয়েছে।</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        )}

        {mode === 'forgot' && forgotStep === 4 && (
          <div className="text-center py-3 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="font-bangla text-xs text-slate-300">পাসওয়ার্ড সফলভাবে আপডেট হয়েছে।</p>
            <button
              type="button"
              onClick={() => { setMode('signin'); setForgotStep(1); }}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer"
            >
              Sign In Now
            </button>
          </div>
        )}

        {/* FORM SECTION */}
        {((mode === 'signup' && signupStep !== 3) || (mode === 'forgot' && forgotStep !== 4) || mode === 'signin') && (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            
            {/* প্রোফাইল ইমেজ আপলোড (শুধু সাইন আপে) */}
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
                  <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-slate-950 cursor-pointer shadow-md hover:scale-110 transition">
                    <Camera className="w-3.5 h-3.5" />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-bangla">প্রোফাইল ছবি (ঐচ্ছিক)</span>
              </div>
            )}

            {/* OTP INPUPT (SIGNUP STEP 2) */}
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

            {/* OTP INPUT (FORGOT STEP 2) */}
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

            {/* NEW PASSWORD (FORGOT STEP 3) */}
            {mode === 'forgot' && forgotStep === 3 && (
              <>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-[#141923] border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                  {errors.newPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.newPassword}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#141923] border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                  />
                  {errors.confirmPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            {/* REGULAR INPUTS */}
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
                        <button type="button" onClick={() => { setMode('forgot'); setForgotStep(1); }} className="text-[10px] text-emerald-400 hover:underline">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="আপনার পাসওয়ার্ড"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-slate-500 hover:text-slate-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-3 rounded-xl text-slate-950 font-bold text-xs shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'forgot'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
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
        )}

        {/* FOOTER SWITCH */}
        <div className="text-center mt-5 text-xs text-slate-400">
          {mode === 'forgot' ? (
            <button type="button" onClick={() => { setMode('signin'); setForgotStep(1); }} className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => { setMode('signin'); setErrors({}); }} className="text-emerald-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={() => { setMode('signup'); setErrors({}); }} className="text-emerald-400 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}