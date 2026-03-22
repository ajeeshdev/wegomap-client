"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Car, Type, Image as ImageIcon, Users, Briefcase, IndianRupee, Sparkles, MapPin, ShieldCheck, Zap, Clock, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function CreateCab() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    capacity: '4',
    type: 'Sedan',
    image: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cabs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/cabs');
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
          <button onClick={() => router.push('/admin/cabs')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Add New Vehicle
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new car or traveller to your transport fleet.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/cabs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save Vehicle'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--amber"></div>
                Vehicle Specifications
              </h3>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Type size={14} className="text-orange-500" /> Vehicle Model / Title
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => {
                      const val = e.target.value;
                      setFormData({ 
                        ...formData, 
                        title: val,
                        slug: val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                      });
                    }} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                    placeholder="e.g. TOYOTA INNOVA CRYSTA CORE..." 
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Car size={14} className="text-sky-500" /> URL Slug
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[12px] font-black">/</span>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                      className="admin-form-input pl-12 font-mono text-[12px] text-orange-600 font-black h-16 rounded-3xl" 
                      placeholder="toyota-innova-crysta-blueprint" 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Briefcase size={16} className="text-orange-600" /> Description & Features
                </label>
                <div className="bg-slate-50/50 rounded-[48px] p-2.5 border-2 border-slate-100 shadow-inner overflow-hidden">
                  <RichTextEditor 
                    value={formData.description} 
                    onChange={(description) => setFormData({ ...formData, description })} 
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Logistics */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
              Pricing & Type
            </h4>
            <div className="space-y-8">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] mb-3 block opacity-60">Vehicle Category</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-8 focus:ring-orange-500/5 text-center"
                >
                  <option value="Hatchback">Compact / Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Traveller">Tempo Traveller</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-3 opacity-60"><Users size={12}/> Capacity (Pax)</label>
                  <input 
                    type="number" 
                    value={formData.capacity} 
                    onChange={e => setFormData({ ...formData, capacity: e.target.value })} 
                    className="admin-form-input font-black h-14 text-center rounded-2xl bg-slate-50 border-slate-100 focus:bg-white" 
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-3 opacity-60"><IndianRupee size={12}/> Daily Rate</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: e.target.value })} 
                    className="admin-form-input font-black h-14 text-center rounded-2xl bg-slate-50 border-slate-100 focus:bg-white text-orange-600" 
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Vehicle Image"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck size={20} className="fill-current animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">Fleet Status</div>
                  <div className="text-[11px] font-black text-slate-800 uppercase leading-none opacity-80">Verified Operational</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Sections Removed for Simplicity */}
        </div>
      </div>
    </div>
  );
}