/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/page.js
 * Description: Admin Dashboard Overview (Cleaned up, Header is handled in layout).
 * ==============================================================================
 */

'use client';

import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* স্ট্যাটস কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl">
          <h3 className="text-slate-400 text-xs font-bold uppercase">Total Users</h3>
          <p className="text-2xl font-black text-white mt-2">1,284</p>
        </div>
        {/* আরও স্ট্যাটস কার্ড এখানে যোগ করতে পারেন */}
      </div>
      
      {/* সাম্প্রতিক অ্যাক্টিভিটি */}
      <div className="p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl">
        <h2 className="text-lg font-bold text-white">Recent Activities</h2>
        <p className="text-slate-400 text-sm mt-2">অ্যাডমিন ড্যাশবোর্ডের মূল কাজ এখানে প্রদর্শিত হবে।</p>
      </div>
    </div>
  );
}