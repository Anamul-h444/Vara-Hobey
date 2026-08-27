/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/user/dashboard/page.js
 * Description: User Dashboard Overview (Cleaned up, Header is handled in layout).
 * ==============================================================================
 */

'use client';

import React from 'react';

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      {/* ওয়েলকাম কার্ড */}
      <div className="p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl">
        <h2 className="text-lg font-bold text-white">Welcome back!</h2>
        <p className="text-slate-400 text-sm mt-2">আপনার প্রপার্টি বিজ্ঞাপন এবং মেসেজগুলো এখান থেকে চেক করুন।</p>
      </div>
      
      {/* গ্রিড সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl">
          <h3 className="text-white font-bold mb-4">Saved Properties</h3>
          <p className="text-slate-500 text-sm">কোনো প্রপার্টি সেভ করা নেই।</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl">
          <h3 className="text-white font-bold mb-4">Messages</h3>
          <p className="text-slate-500 text-sm">আপনার কোনো নতুন মেসেজ নেই।</p>
        </div>
      </div>
    </div>
  );
}