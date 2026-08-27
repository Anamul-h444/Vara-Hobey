/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/components/common/ProfileModal.js
 * Description: Authenticated user profile modal utilizing modular LogoutButton.
 * ==============================================================================
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldAlert
} from 'lucide-react';

// Context, Services & Common Components
import { useAuth } from '@/context/AuthContext';
import { updateProfileApi, changePasswordApi } from '@/services/authService';
import LogoutButton from '@/app/components/common/LogoutButton';
import { useLogout } from '@/hooks/useLogout';

export default function ProfileModal({ isOpen, onClose, onOpenSignIn }) {
  const { user, updateUserState } = useAuth();
  const { handleLogout } = useLogout();

  /* -------------------------------------------------------------------------- */
  /*                                Component State                             */
  /* -------------------------------------------------------------------------- */
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'security'
  
  // Profile Info States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Security & Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  /* -------------------------------------------------------------------------- */
  /*                     Synchronize Form Data on Modal Open                    */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (user && isOpen) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAvatarPreview(user.avatar || null);
      setAvatarFile(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPass(false);
      setShowNewPass(false);
      setShowConfirmPass(false);
      setStatusMsg({ type: '', text: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  /* -------------------------------------------------------------------------- */
  /*                                Helper Methods                              */
  /* -------------------------------------------------------------------------- */
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setStatusMsg({ type: '', text: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setStatusMsg({ type: '', text: '' });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                        1. Handle General Profile Update                    */
  /* -------------------------------------------------------------------------- */
  const handleUpdateGeneral = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const res = await updateProfileApi({ name, phone }, avatarFile);
      updateUserState(res.user);
      setAvatarFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      setStatusMsg({
        type: 'success',
        text: 'প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!',
      });
      
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: err.response?.data?.message || 'আপডেট করতে সমস্যা হয়েছে।' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         2. Handle User Password Change                     */
  /* -------------------------------------------------------------------------- */
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'নতুন পাসওয়ার্ড দুটি মিলছে না।' });
      return;
    }

    setIsLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      await changePasswordApi({ currentPassword, newPassword });
      setStatusMsg({
        type: 'success',
        text: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! লগআউট করা হচ্ছে...',
      });

      setTimeout(async () => {
        onClose();
        await handleLogout();
      }, 1200);
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: err.response?.data?.message || 'বর্তমান পাসওয়ার্ডটি সঠিক নয়।' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200 cursor-pointer" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0c1019]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200">
        
        {/* Close Action */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Summary & Profile Image Header */}
        <div className="flex flex-col items-center border-b border-white/10 pb-5 mb-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-[#161c28] flex items-center justify-center shadow-xl">
              {avatarPreview && avatarPreview !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png' ? (
                <img src={avatarPreview} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-9 h-9 text-emerald-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-lg hover:scale-110 transition active:scale-95">
              <Camera className="w-4 h-4" />
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
            </label>
          </div>

          <h3 className="text-base font-bold text-white mt-3">{user.name}</h3>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#141923] p-1 rounded-xl mb-4 border border-white/5">
          <button
            type="button"
            onClick={() => handleTabSwitch('general')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'general' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Personal Details
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('security')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'security' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Password & Security
          </button>
        </div>

        {/* Feedback Alert */}
        {statusMsg.text && (
          <div className={`p-3 mb-4 rounded-xl flex items-center gap-2 text-xs font-bangla animate-in fade-in duration-150 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab 1: Personal Details */}
        {activeTab === 'general' && (
          <form onSubmit={handleUpdateGeneral} className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Email (Immutable)</label>
              <div className="relative flex items-center opacity-60">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-[#141923] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </form>
        )}

        {/* Tab 2: Password & Security */}
        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="বর্তমান পাসওয়ার্ড দিন"
                  className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Confirm New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                  className="w-full bg-[#141923] border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
              <span>Update Password</span>
            </button>
          </form>
        )}

        {/* Tab 3: Session Termination using universal LogoutButton */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <LogoutButton 
            onBeforeLogout={onClose} 
            label="Log Out from Account" 
            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 justify-center"
          />
        </div>

      </div>
    </div>
  );
}