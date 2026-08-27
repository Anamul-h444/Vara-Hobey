/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/locations/page.js
 * Description: Admin Location Management with Query Selector & Dynamic Table.
 * ==============================================================================
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/utils/api';
import LocationSelector from '@/app/components/common/LocationSelector';

export default function LocationManagementPage() {
  const router = useRouter();

  const [queryFilters, setQueryFilters] = useState({
    divisionId: '',
    districtId: '',
    cityCorpOrUpazilaId: '',
    subLocationId: '',
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentListTitle, setCurrentListTitle] = useState('ডিভিশন এর তালিকা (Divisions List)');
  const [activeEndpoint, setActiveEndpoint] = useState('divisions');

  const fetchTableData = async () => {
    setLoading(true);
    try {
      let endpoint = '/locations/divisions';
      let title = 'ডিভিশন এর তালিকা (Divisions List)';
      let targetEp = 'divisions';

      if (queryFilters.subLocationId) {
        endpoint = `/locations/wards?parentId=${queryFilters.subLocationId}`;
        title = 'এরিয়া / ওয়ার্ড তালিকা (Areas / Wards List)';
        targetEp = 'municipality-areas';
      } else if (queryFilters.cityCorpOrUpazilaId) {
        endpoint = `/locations/zones?parentId=${queryFilters.cityCorpOrUpazilaId}`;
        title = 'জোন / পৌরসভা / ইউনিয়ন তালিকা (Zones / Municipalities / Unions List)';
        targetEp = 'zones';
      } else if (queryFilters.districtId) {
        endpoint = `/locations/city-corps-and-upazilas?districtId=${queryFilters.districtId}`;
        title = 'সিটি কর্পোরেশন ও উপজেলা তালিকা (City Corporations & Upazilas List)';
        targetEp = 'city-corps-and-upazilas';
      } else if (queryFilters.divisionId) {
        endpoint = `/locations/districts?parentId=${queryFilters.divisionId}`;
        title = 'জেলা তালিকা (Districts List)';
        targetEp = 'districts';
      }

      setActiveEndpoint(targetEp);
      setCurrentListTitle(title);

      const res = await fetchApi(endpoint);
      if (res.success) {
        setItems(res.data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [queryFilters]);

  const handleAddRedirect = () => {
    const queryParams = new URLSearchParams({
      level: activeEndpoint,
      ...(queryFilters.divisionId && { divisionId: queryFilters.divisionId }),
      ...(queryFilters.districtId && { districtId: queryFilters.districtId }),
      ...(queryFilters.cityCorpOrUpazilaId && { parentId: queryFilters.cityCorpOrUpazilaId }),
    });
    router.push(`/admin/dashboard/locations/add?${queryParams.toString()}`);
  };

  const handleDelete = async (id, itemType) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    
    let deleteEp = activeEndpoint;
    if (activeEndpoint === 'city-corps-and-upazilas') {
      deleteEp = itemType === 'city_corporation' ? 'city-corporations' : 'upazilas';
    }

    try {
      const res = await fetchApi(`/locations/${deleteEp}/${id}`, { method: 'DELETE' });
      if (res.success) {
        alert(res.message);
        fetchTableData();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
            ADMIN GEO CONTROL
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Location Management</h2>
        </div>
        <button 
          onClick={handleAddRedirect}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 hover:opacity-95 cursor-pointer transition"
        >
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location Query Section</h3>
        <LocationSelector 
          onLocationChange={(filters) => setQueryFilters(filters)} 
          selectedValues={queryFilters}
        />
      </div>

      <div className="p-6 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            {currentListTitle}
          </h3>
          <span className="text-xs text-slate-400 font-mono">Total: {items.length}</span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-slate-500 animate-pulse text-xs">Loading data...</div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-sm">No data found</h3>
                <p className="text-slate-500 text-xs mt-1 mb-5">No location entries found in this category.</p>
                <button
                  onClick={handleAddRedirect}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer transition shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" /> Add Location
                </button>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#121929]/50 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold w-16">#</th>
                  <th className="py-4 px-6 font-bold">বাংলা নাম (Bangla Name)</th>
                  <th className="py-4 px-6 font-bold">ইংরেজি নাম (English Name)</th>
                  <th className="py-4 px-6 text-right font-bold w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {items.map((item, index) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-6 text-slate-500 font-mono">{index + 1}</td>
                    <td className="py-4 px-6 font-extrabold text-emerald-400">{item.name_bn}</td>
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                      {item.name_en}
                      {item.type === 'city_corporation' && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">City Corp</span>}
                      {item.type === 'upazila' && <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">Upazila</span>}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button 
                        onClick={() => router.push(`/admin/dashboard/locations/add?id=${item._id}&level=${activeEndpoint}`)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 cursor-pointer transition"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id, item.type)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 cursor-pointer transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}