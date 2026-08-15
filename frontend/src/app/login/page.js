'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Data:', formData);
    // পরবর্তী ধাপে ব্যাকএন্ড লগইন এপিআই কানেক্ট হবে
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* অ্যাম্বিয়েন্ট গ্লো */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* মেইন সাইন ইন কার্ড */}
      <div className="relative z-10 w-full max-w-md bg-[#0d111a]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        
        {/* ব্র্যান্ড হেডার */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(147,51,234,0.4)]">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-widest text-white uppercase">
              VARA<span className="text-emerald-400">HOBE</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Welcome Back</h2>
          <p className="font-bangla text-xs text-slate-400 mt-1">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </p>
        </div>

        {/* সাইন ইন ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ইমেইল */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" className="text-[11px] text-purple-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="আপনার পাসওয়ার্ড দিন"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(147,51,234,0.35)] transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* অ্যাকাউন্ট নেই? */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-emerald-400 font-semibold hover:underline">
            Create an account
          </Link>
        </p>

      </div>

    </div>
  );
}