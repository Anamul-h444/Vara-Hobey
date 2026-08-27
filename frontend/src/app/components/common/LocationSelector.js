/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/components/common/LocationSelector.jsx
 * Description: Reusable, responsive cascading location dropdown selector.
 * ==============================================================================
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { fetchApi } from '@/utils/api';

export default function LocationSelector({ onLocationChange, selectedValues = {} }) {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cityCorpsAndUpazilas, setCityCorpsAndUpazilas] = useState([]);
  const [subLocations, setSubLocations] = useState([]);

  const [divisionId, setDivisionId] = useState(selectedValues.divisionId || '');
  const [districtId, setDistrictId] = useState(selectedValues.districtId || '');
  const [cityCorpOrUpazilaId, setCityCorpOrUpazilaId] = useState(selectedValues.cityCorpOrUpazilaId || '');
  const [subLocationId, setSubLocationId] = useState(selectedValues.subLocationId || '');

  useEffect(() => {
    const loadDivisions = async () => {
      const res = await fetchApi('/locations/divisions');
      if (res.success) setDivisions(res.data);
    };
    loadDivisions();
  }, []);

  useEffect(() => {
    if (!divisionId) {
      setDistricts([]);
      setDistrictId('');
      return;
    }
    const loadDistricts = async () => {
      const res = await fetchApi(`/locations/districts?parentId=${divisionId}`);
      if (res.success) setDistricts(res.data);
    };
    loadDistricts();
  }, [divisionId]);

  useEffect(() => {
    if (!districtId) {
      setCityCorpsAndUpazilas([]);
      setCityCorpOrUpazilaId('');
      return;
    }
    const loadCityCorpsAndUpazilas = async () => {
      const res = await fetchApi(`/locations/city-corps-and-upazilas?districtId=${districtId}`);
      if (res.success) setCityCorpsAndUpazilas(res.data);
    };
    loadCityCorpsAndUpazilas();
  }, [districtId]);

  useEffect(() => {
    if (!cityCorpOrUpazilaId) {
      setSubLocations([]);
      setSubLocationId('');
      return;
    }
    
    const selectedItem = cityCorpsAndUpazilas.find(item => item._id === cityCorpOrUpazilaId);
    if (!selectedItem) return;

    const loadSubLocations = async () => {
      let endpoint = '';
      if (selectedItem.type === 'city_corporation') {
        endpoint = `/locations/zones?parentId=${selectedItem._id}`;
      } else {
        endpoint = `/locations/municipalities?parentId=${selectedItem._id}`; 
      }
      const res = await fetchApi(endpoint);
      if (res.success) setSubLocations(res.data);
    };
    loadSubLocations();
  }, [cityCorpOrUpazilaId, cityCorpsAndUpazilas]);

  const handleChange = (type, value) => {
    if (type === 'division') {
      setDivisionId(value);
      setDistrictId('');
      setCityCorpOrUpazilaId('');
      setSubLocationId('');
    } else if (type === 'district') {
      setDistrictId(value);
      setCityCorpOrUpazilaId('');
      setSubLocationId('');
    } else if (type === 'cityCorpOrUpazila') {
      setCityCorpOrUpazilaId(value);
      setSubLocationId('');
    } else if (type === 'subLocation') {
      setSubLocationId(value);
    }

    if (onLocationChange) {
      onLocationChange({
        divisionId: type === 'division' ? value : divisionId,
        districtId: type === 'district' ? value : districtId,
        cityCorpOrUpazilaId: type === 'cityCorpOrUpazila' ? value : cityCorpOrUpazilaId,
        subLocationId: type === 'subLocation' ? value : subLocationId,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative">
        <select
          value={divisionId}
          onChange={(e) => handleChange('division', e.target.value)}
          className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 cursor-pointer"
        >
          <option value="">All Divisions</option>
          {divisions.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name_bn} ({item.name_en})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={districtId}
          onChange={(e) => handleChange('district', e.target.value)}
          disabled={!divisionId}
          className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">All Districts</option>
          {districts.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name_bn} ({item.name_en})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={cityCorpOrUpazilaId}
          onChange={(e) => handleChange('cityCorpOrUpazila', e.target.value)}
          disabled={!districtId}
          className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">City Corp / Upazila</option>
          {cityCorpsAndUpazilas.map((item) => (
            <option key={item._id} value={item._id}>
              {item.type === 'city_corporation' ? '🏛️ [City Corp]: ' : '📍 [Upazila]: '} 
              {item.name_bn} ({item.name_en})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={subLocationId}
          onChange={(e) => handleChange('subLocation', e.target.value)}
          disabled={!cityCorpOrUpazilaId || subLocations.length === 0}
          className="w-full bg-[#121929] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">Zone / Muni / Union</option>
          {subLocations.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name_bn} ({item.name_en})
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}