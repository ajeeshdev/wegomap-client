"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Coffee, Type, LayoutGrid, Image as ImageIcon, Zap, Sparkles, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function CreateAmenity() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/amenities`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/amenities');
      } else {
        alert(data.error || 'Creation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/amenities')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Add New Amenity
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new facility or service to your tours.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/amenities')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save Amenity'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--orange"></div>
                Amenity Details
              </h3>

              <div className="admin-form-grid-2 admin-form-grid-2--compact">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Type size={18} className="text-blue-600" /> Amenity Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                    placeholder="e.g. Wifi, Breakfast, A/C..." 
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                    <ImageIcon size={18} className="text-sky-500" /> Icon Name
                  </label>
                  <div className="relative group/mapping">
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[12px] tracking-widest z-10">#</span>
                    <input 
                      type="text" 
                      value={formData.icon} 
                      onChange={e => setFormData({ ...formData, icon: e.target.value })} 
                      className="admin-form-input pl-10 font-mono text-[13px] text-blue-600 font-black h-16 px-8 rounded-3xl bg-slate-50 border-slate-100 group-hover/mapping:bg-white transition-all uppercase tracking-widest" 
                      placeholder="e.g. wifi, coffee, car..." 
                    />
                    <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-500/40 animate-pulse" size={18} />
                  </div>
                </div>
              </div>
              
              <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[48px] flex items-start gap-8 shadow-inner group/tip transition-all hover:bg-white hover:border-orange-100 hover:shadow-2xl hover:shadow-slate-200/40">
                  <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-blue-600 shadow-lg border border-slate-100 group-hover/tip:bg-blue-600 group-hover/tip:text-white transition-all duration-700 transform group-hover/tip:scale-110">
                    <Layers size={32} className="animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] leading-none mb-1">
                        Icon Tip
                    </p>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed max-w-2xl italic opacity-80">
                        Use icon names like 'wifi', 'coffee', or 'car'. This helps customers quickly identify the service.
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              Status
            </h4>
            <div className="space-y-10">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-6 opacity-60 text-center block">Publication Status</label>
                <div className="relative group/status">
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="admin-form-input font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[11px] tracking-widest cursor-pointer group-hover/status:bg-white transition-all shadow-sm focus:ring-12 focus:ring-blue-600/5 appearance-none px-6"
                  >
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/status:text-emerald-500 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                </div>
              </div>
              
              <div className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-5 bg-slate-50/50 p-6 rounded-[32px] border-2 border-slate-100 overflow-hidden group/sync hover:bg-white transition-all shadow-sm hover:border-orange-100 hover:shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0 group-hover/sync:bg-blue-600 group-hover/sync:text-white transition-all duration-700 shadow-sm">
                    <Clock size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-2">Sync Status</div>
                    <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest opacity-60 leading-tight">LIVE_SYNC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-orange-950/20 mt-6 text-center">
             <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/10 rounded-bl-full blur-[70px]"></div>
             <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-4 h-full">
               <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-700 shadow-2xl transform group-hover:scale-125 group-hover:rotate-12">
                 <Zap size={40} className="animate-pulse" />
               </div>
               <div className="admin-space-y-4">
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-4 leading-none opacity-60">Preview</div>
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 leading-relaxed italic opacity-80 min-h-[3rem] line-clamp-2">
                    {formData.title || 'Draft Comfort Resource Index'}
                 </p>
                 <div className="flex items-center justify-center gap-4 mt-8 border-t border-white/10 pt-8">
                    <ShieldCheck size={16} className="text-emerald-500" />
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">VERIFIED</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}