'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered for Both Tenant & Landlord:', formData);
    // ব্যাকএন্ড API যুক্ত হবে
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ১. অ্যাম্বিয়েন্ট ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* ২. মেইন সাইন আপ কার্ড */}
      <div className="relative z-10 w-full max-w-md bg-[#0d111a]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        
        {/* ব্র্যান্ড হেডার */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-widest text-white uppercase">
              VARA<span className="text-emerald-400">HOBE</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Create Your Account</h2>
          
          {/* ডুয়াল রোল ব্যাজ */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-bangla">ভাড়াটিয়া ও বাড়িওয়ালা—উভয় সুবিধাই সক্রিয় থাকবে</span>
          </div>
        </div>

        {/* ৩. সাইন আপ ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* নাম */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="text"
                name="name"
                required
                placeholder="আপনার পূর্ণ নাম"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
              />
            </div>
          </div>

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
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
              />
            </div>
          </div>

          {/* ফোন নম্বর */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="tel"
                name="phone"
                required
                placeholder="017XXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
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
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* সাইন ইন লিঙ্ক */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </p>

      </div>

    </div>
  );
}