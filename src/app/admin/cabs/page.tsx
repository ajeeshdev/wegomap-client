"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Edit, Trash2, Plus, Search, Car, MapPin, Calendar, Users, Zap, MoreVertical, ShieldCheck, Sparkles, Clock, Layers } from 'lucide-react';

export default function CabsAdmin() {
  const defaultPricing = {
    sedan: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    innova: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    seater912: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' },
    seater17: { n2d3: '', n3d4: '', n4d5: '', n5d6: '', n6d7: '' }
  };

  const [pricing, setPricing] = useState<any>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPricing(); }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${API_URL}/options?key=cab_pricing`);
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        // Merge with defaults to prevent errors if some keys are missing
        const fetchedData = json.data[0].value;
        const mergedData = { ...defaultPricing };
        
        Object.keys(defaultPricing).forEach(key => {
          if (fetchedData[key]) {
            mergedData[key as keyof typeof defaultPricing] = {
              ...defaultPricing[key as keyof typeof defaultPricing],
              ...fetchedData[key]
            };
          }
        });
        
        setPricing(mergedData);
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleChange = (type: string, field: string, value: string) => {
    setPricing((prev: any) => ({
      ...prev,
      [type]: { ...(prev[type] || {}), [field]: value }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/options/bulk`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          options: [{ key: 'cab_pricing', value: pricing, type: 'pricing' }]
        })
      });
      if (res.ok) alert('Cab pricing updated successfully!');
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Syncing Cab Fleet Pricing...</div>;

  const vehicleTypes = [
    { key: 'sedan', label: 'Sedan' },
    { key: 'innova', label: 'Innova' },
    { key: 'seater912', label: '9/12 Seater' },
    { key: 'seater17', label: '17 Seater' }
  ];

  const durations = [
    { key: 'n2d3', label: '2 Nights 3 Days' },
    { key: 'n3d4', label: '3 Nights 4 Days' },
    { key: 'n4d5', label: '4 Nights 5 Days' },
    { key: 'n5d6', label: '5 Nights 6 Days' },
    { key: 'n6d7', label: '6 Nights 7 Days' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Cab Pricing
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage duration-based vehicle rental rates across the entire transport fleet</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {vehicleTypes.map((vehicle) => (
            <div key={vehicle.key} className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-10 py-6 border-b border-slate-100 bg-slate-50">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-4">
                  <Car size={24} className="text-amber-500" /> {vehicle.label}
                </h3>
              </div>
              <div className="p-10 space-y-8">
                {durations.map((duration) => (
                  <div key={duration.key} className="flex items-center gap-6">
                    <label className="w-48 text-[11px] font-black text-slate-500 uppercase tracking-widest">{duration.label}</label>
                    <input 
                      type="text" 
                      value={pricing[vehicle.key]?.[duration.key] || ''}
                      onChange={e => handleChange(vehicle.key, duration.key, e.target.value)}
                      className="flex-1 h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-lg"
                      placeholder="e.g. 8000"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={saving}
            className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 flex items-center gap-3"
          >
            <ShieldCheck size={24} />
            {saving ? 'UPDATING FLEET...' : 'SAVE PRICING CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
}