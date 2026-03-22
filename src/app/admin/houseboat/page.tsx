"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Ship, Save, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function HouseboatPricingAdmin() {
  const [pricing, setPricing] = useState({
    deluxe: { price: '', old_price: '' },
    premium: { price: '', old_price: '' },
    luxury: { price: '', old_price: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${API_URL}/options?key=houseboat_package`);
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        setPricing(json.data[0].value);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          options: [
            { key: 'houseboat_package', value: pricing, type: 'pricing' }
          ]
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Pricing updated successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (category: string, field: string, value: string) => {
    setPricing(prev => ({
      ...prev,
      [category]: { ...prev[category as keyof typeof prev], [field]: value }
    }));
  };

  if (loading) return (
    <div className="cms-page-wrapper flex items-center justify-center p-20">
      <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="cms-page-wrapper">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Houseboat Packages
          </h2>
          <p className="admin-page-subtitle">Update pricing for different luxury houseboat categories.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-8">
          {['deluxe', 'premium', 'luxury'].map((cat) => (
            <div key={cat} className="admin-card group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-orange-50 transition-colors duration-500"></div>
              
              <div className="flex flex-col md:flex-row gap-12 relative z-10">
                <div className="w-full md:w-1/3">
                   <div className="flex items-center gap-5 mb-6">
                      <div className="admin-icon-enclosure">
                        <Ship size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{cat}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Tier</span>
                        </div>
                      </div>
                   </div>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed italic">Adjust primary and discounted rates for this category. Changes reflect immediately in frontend search results.</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-l border-slate-100/50 pl-0 md:pl-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Base Price (₹)</label>
                    <input 
                      type="text" 
                      value={(pricing as any)[cat]?.price || ''}
                      onChange={e => handleChange(cat, 'price', e.target.value)}
                      className="admin-search-input !px-6 !h-16 font-bold text-xl !bg-white"
                      placeholder="e.g. 15999"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Strikethrough Price (₹)</label>
                    <input 
                      type="text" 
                      value={(pricing as any)[cat]?.old_price || ''}
                      onChange={e => handleChange(cat, 'old_price', e.target.value)}
                      className="admin-search-input !px-6 !h-16 font-bold text-xl !text-slate-400 !bg-slate-50/50"
                      placeholder="e.g. 19999"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-sticky-action-bar">
            <div className="flex items-center gap-3">
                <div className="admin-action-bar-icon">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">System Integrity</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Encrypted Pricing Update Protocol</p>
                </div>
            </div>
            <button 
              type="submit"
              disabled={saving}
              className="admin-btn admin-btn-primary h-14 px-12 flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? (
                  <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                  </>
              ) : (
                  <>
                      <Sparkles size={18} /> Update Pricing
                  </>
              )}
            </button>
        </div>
      </form>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-10">
          <div className="admin-stat-card admin-stat-card--primary">
               <div className="admin-card-corner admin-card-corner--strong"></div>
               <h5 className="admin-stat-label">Total Tiers</h5>
               <p className="admin-stat-value">03</p>
          </div>
          <div className="admin-stat-card admin-stat-card--slate">
               <div className="admin-card-corner"></div>
               <h5 className="admin-stat-label">Tier Coverage</h5>
               <p className="admin-stat-value">100%</p>
          </div>
          <div className="admin-stat-card admin-stat-card--emerald">
               <div className="admin-card-corner admin-card-corner--strong"></div>
               <h5 className="admin-stat-label">Visibility</h5>
               <p className="admin-stat-value">Live</p>
          </div>
      </div>
    </div>
  );
}
