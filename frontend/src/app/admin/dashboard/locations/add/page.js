/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/locations/add/page.js
 * Description: Dynamic Sequence-based Location Addition and Management Form.
 * ==============================================================================
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import { fetchApi } from '@/utils/api';

export default function AddLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetLevel = searchParams.get('level') || 'division';

  // ড্রপডাউন ডাটা স্টেট
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [cityCorps, setCityCorps] = useState([]);
  const [zones, setZones] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [unions, setUnions] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  // সিলেক্টেড আইডি স্টেট
  const [selDivision, setSelDivision] = useState('');
  const [selDistrict, setSelDistrict] = useState('');
  const [selUpazila, setSelUpazila] = useState('');
  const [selCityCorp, setSelCityCorp] = useState('');
  const [selZone, setSelZone] = useState('');
  const [selThana, setSelThana] = useState('');
  const [selSector, setSelSector] = useState('');
  const [selUnion, setSelUnion] = useState('');
  const [selMunicipality, setSelMunicipality] = useState('');

  // ফর্ম ইনপুট ও লোডিং
  const [formData, setFormData] = useState({ name_en: '', name_bn: '' });
  const [loading, setLoading] = useState(false);

  // ১. ডিভিশন লোড করা
  useEffect(() => {
    const loadDivisions = async () => {
      const res = await fetchApi('/locations?level=division');
      if (res.success) setDivisions(res.data);
    };
    loadDivisions();
  }, []);

  // ২. ডিভিশন পরিবর্তন হলে জেলা লোড করা
  useEffect(() => {
    if (!selDivision) { setDistricts([]); setSelDistrict(''); return; }
    const loadDistricts = async () => {
      const res = await fetchApi(`/locations?level=district&divisionId=${selDivision}`);
      if (res.success) setDistricts(res.data);
    };
    loadDistricts();
  }, [selDivision]);

  // ৩. জেলা পরিবর্তন হলে উপজেলা লোড করা
  useEffect(() => {
    if (!selDistrict) { setUpazilas([]); setSelUpazila(''); return; }
    const loadUpazilas = async () => {
      const res = await fetchApi(`/locations?level=upazila&districtId=${selDistrict}`);
      if (res.success) setUpazilas(res.data);
    };
    loadUpazilas();
  }, [selDistrict]);

  // ৪. উপজেলা পরিবর্তন হলে সিটি কর্পোরেশন, ইউনিয়ন ও পৌরসভা লোড করা
  useEffect(() => {
    if (!selUpazila) { 
      setCityCorps([]); setUnions([]); setMunicipalities([]); 
      setSelCityCorp(''); setSelUnion(''); setSelMunicipality(''); 
      return; 
    }
    const loadChildren = async () => {
      const resCity = await fetchApi(`/locations?level=city_corp&upazilaId=${selUpazila}`);
      if (resCity.success) setCityCorps(resCity.data);

      const resUnion = await fetchApi(`/locations?level=union&upazilaId=${selUpazila}`);
      if (resUnion.success) setUnions(resUnion.data);

      const resMuni = await fetchApi(`/locations?level=municipality&upazilaId=${selUpazila}`);
      if (resMuni.success) setMunicipalities(resMuni.data);
    };
    loadChildren();
  }, [selUpazila]);

  // ৫. সিটি কর্পোরেশন পরিবর্তন হলে জোন লোড করা
  useEffect(() => {
    if (!selCityCorp) { setZones([]); setSelZone(''); return; }
    const loadZones = async () => {
      const res = await fetchApi(`/locations?level=zone&cityCorpId=${selCityCorp}`);
      if (res.success) setZones(res.data);
    };
    loadZones();
  }, [selCityCorp]);

  // ৬. জোন পরিবর্তন হলে থানা লোড করা
  useEffect(() => {
    if (!selZone) { setThanas([]); setSelThana(''); return; }
    const loadThanas = async () => {
      const res = await fetchApi(`/locations?level=thana&zoneId=${selZone}`);
      if (res.success) setThanas(res.data);
    };
    loadThanas();
  }, [selZone]);

  // ৭. থানা পরিবর্তন হলে সেক্টর লোড করা
  useEffect(() => {
    if (!selThana) { setSectors([]); setSelSector(''); return; }
    const loadSectors = async () => {
      const res = await fetchApi(`/locations?level=sector&thanaId=${selThana}`);
      if (res.success) setSectors(res.data);
    };
    loadSectors();
  }, [selThana]);

  // সিকোয়েন্স অনুযায়ী সিলেকশন কমপ্লিট হলো কি না চেক করার ভ্যালিডেশন
  const isReadyToSave = () => {
    if (targetLevel === 'division') return true;
    if (targetLevel === 'district') return !!selDivision;
    if (targetLevel === 'upazila') return !!selDivision && !!selDistrict;
    
    // সিকোয়েন্স ১: Division > District > Upazila > City Corp > Zone > Thana > Sector > Road No
    if (['city_corp', 'zone', 'thana', 'sector', 'road'].includes(targetLevel)) {
      if (!selDivision || !selDistrict || !selUpazila) return false;
      if (targetLevel === 'city_corp') return true;
      if (!selCityCorp) return false;
      if (targetLevel === 'zone') return true;
      if (!selZone) return false;
      if (targetLevel === 'thana') return true;
      if (!selThana) return false;
      if (targetLevel === 'sector') return true;
      if (!selSector) return false;
      return true;
    }

    // সিকোয়েন্স ২: Division > District > Upazila > Union > Village
    if (['union', 'village'].includes(targetLevel)) {
      if (!selDivision || !selDistrict || !selUpazila) return false;
      if (targetLevel === 'union') return true;
      if (!selUnion) return false;
      return true;
    }

    // সিকোয়েন্স ৩: Division > District > Upazila > Municipality > Municipality Name > Area
    if (['municipality', 'municipality_name', 'area'].includes(targetLevel)) {
      if (!selDivision || !selDistrict || !selUpazila) return false;
      if (targetLevel === 'municipality') return true;
      if (!selMunicipality) return false;
      return true;
    }

    return false;
  };

  // ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name_en || !formData.name_bn) {
      alert('দয়া করে বাংলা এবং ইংরেজি উভয় নাম প্রদান করুন।');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        level: targetLevel,
        divisionId: selDivision || null,
        districtId: selDistrict || null,
        upazilaId: selUpazila || null,
        cityCorpId: selCityCorp || null,
        zoneId: selZone || null,
        thanaId: selThana || null,
        sectorId: selSector || null,
        unionId: selUnion || null,
        municipalityId: selMunicipality || null,
      };

      const result = await fetchApi('/locations', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (result.success) {
        alert(result.message); // সুন্দর পপ-আপ মেসেজ
        window.location.reload(); // পেজ রিলোড হয়ে নতুন এ্যাড করার জন্য প্রস্তুত হবে
      } else {
        alert(result.message || 'ব্যর্থ হয়েছে!');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('সার্ভার ত্রুটি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl flex items-center justify-between">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
            GEO ENTRY PORTAL
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">নতুন লোকেশন এ্যাড করুন</h2>
          <p className="text-slate-400 text-xs mt-1">
            টার্গেট লেভেল: <span className="text-emerald-400 font-bold uppercase">{targetLevel}</span>
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#121929] border border-white/5 text-slate-300 font-bold text-xs hover:text-white cursor-pointer transition"
        >
          <ArrowLeft className="w-4 h-4" /> পেছনের পেজে যান
        </button>
      </div>

      {/* প্যারেন্ট সিলেকশন ড্রপডাউন প্যানেল */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-white/5 pb-3">
          <MapPin className="w-4 h-4 text-emerald-400" /> হাইয়ারার্কি সিলেকশন ধাপসমূহ
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ১. ডিভিশন */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Division (ডিভিশন)</label>
            <select value={selDivision} onChange={(e) => setSelDivision(e.target.value)} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer">
              <option value="">ডিভিশন সিলেক্ট করুন</option>
              {divisions.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
            </select>
          </div>

          {/* ২. জেলা */}
          {targetLevel !== 'division' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">District (জেলা)</label>
              <select value={selDistrict} onChange={(e) => setSelDistrict(e.target.value)} disabled={!selDivision} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">জেলা সিলেক্ট করুন</option>
                {districts.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {/* ৩. উপজেলা */}
          {['upazila', 'city_corp', 'zone', 'thana', 'sector', 'road', 'union', 'village', 'municipality', 'municipality_name', 'area'].includes(targetLevel) && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Upazila (উপজেলা)</label>
              <select value={selUpazila} onChange={(e) => setSelUpazila(e.target.value)} disabled={!selDistrict} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">উপজেলা সিলেক্ট করুন</option>
                {upazilas.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {/* সিকোয়েন্স ১ সাব-লেভেলগুলো */}
          {['zone', 'thana', 'sector', 'road'].includes(targetLevel) && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">City Corp (সিটি কর্পোরেশন)</label>
              <select value={selCityCorp} onChange={(e) => setSelCityCorp(e.target.value)} disabled={!selUpazila} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">সিটি কর্পোরেশন সিলেক্ট করুন</option>
                {cityCorps.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {['thana', 'sector', 'road'].includes(targetLevel) && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Zone (জোন)</label>
              <select value={selZone} onChange={(e) => setSelZone(e.target.value)} disabled={!selCityCorp} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">জোন সিলেক্ট করুন</option>
                {zones.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {['sector', 'road'].includes(targetLevel) && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Thana (থানা)</label>
              <select value={selThana} onChange={(e) => setSelThana(e.target.value)} disabled={!selZone} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">থানা সিলেক্ট করুন</option>
                {thanas.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {targetLevel === 'road' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Sector (সেক্টর)</label>
              <select value={selSector} onChange={(e) => setSelSector(e.target.value)} disabled={!selThana} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">সেক্টর সিলেক্ট করুন</option>
                {sectors.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {/* সিকোয়েন্স ২ সাব-লেভেল */}
          {targetLevel === 'village' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Union (ইউনিয়ন)</label>
              <select value={selUnion} onChange={(e) => setSelUnion(e.target.value)} disabled={!selUpazila} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">ইউনিয়ন সিলেক্ট করুন</option>
                {unions.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}

          {/* সিকোয়েন্স ৩ সাব-লেভেল */}
          {['municipality_name', 'area'].includes(targetLevel) && (
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Municipality (পৌরসভা)</label>
              <select value={selMunicipality} onChange={(e) => setSelMunicipality(e.target.value)} disabled={!selUpazila} className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none cursor-pointer disabled:opacity-40">
                <option value="">পৌরসভা সিলেক্ট করুন</option>
                {municipalities.map((item) => <option key={item._id} value={item._id}>{item.name_bn} ({item.name_en})</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* নাম ইনপুট ফর্ম (সিলেকশন কমপ্লিট হলে সক্রিয় হবে) */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-[#0c1019] border border-white/5 shadow-xl transition-all ${!isReadyToSave() ? 'opacity-40 pointer-events-none' : ''}`}>
        <h3 className="text-sm font-extrabold text-white mb-4">নতুন লোকেশনের নাম প্রদান করুন</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">English Name</label>
            <input type="text" required value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} placeholder="e.g. Narsingdi (নরসিংদী)" className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500/50" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Bangla Name (বাংলা নাম)</label>
            <input type="text" required value={formData.name_bn} onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })} placeholder="যেমন: নরসিংদী (Narsingdi)" className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500/50" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button type="submit" disabled={!isReadyToSave() || loading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 cursor-pointer transition shadow-lg shadow-emerald-500/25 disabled:opacity-40">
              <Save className="w-4 h-4" /> {loading ? 'সংরক্ষণ হচ্ছে...' : 'Save Location'}
            </button>
          </div>
        </form>
        {!isReadyToSave() && (
          <p className="text-[11px] text-amber-400 mt-3 font-semibold text-center">
            ⚠️ উপরের সমস্ত পূর্ববর্তী ধাপগুলো সম্পন্ন করার পর সেভ বাটন সক্রিয় হবে।
          </p>
        )}
      </div>
    </div>
  );
}