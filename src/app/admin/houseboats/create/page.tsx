"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Ship, Type, Image as ImageIcon, Anchor, Waves, Tag, Sparkles, Briefcase, Zap, Globe, ShieldCheck, Clock, Layers, IndianRupee, Shield as Safe } from 'lucide-react';
import { toast } from 'react-hot-toast';

import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function CreateHouseboat() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    category: 'Deluxe',
    image: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/houseboats`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Houseboat added successfully');
        router.push('/admin/houseboats');
      } else {
        toast.error(data.error || 'Creation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/houseboats')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Add New Houseboat
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new houseboat to your fleet.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/houseboats')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-11"
          >
            <Safe size={18} /> {loading ? 'Saving...' : 'Save Houseboat'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--sm admin-section-icon--orange"></div>
                Houseboat Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-2">
                    <Ship size={12} className="text-blue-600" /> Houseboat Name
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
                    className="admin-form-input text-lg font-bold" 
                    placeholder="e.g. Royal Heritage Premium" 
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-2">
                    <Anchor size={12} className="text-sky-500" /> URL Slug
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[10px] font-bold">/</span>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                      className="admin-form-input pl-8 font-mono text-xs text-blue-600" 
                      placeholder="royal-heritage-premium" 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-6">
                  <Layers size={14} className="text-blue-600" /> Description
                </label>
                <div className="bg-slate-50/50 rounded-[40px] p-2 border border-slate-100 shadow-inner overflow-hidden">
                  <RichTextEditor 
                    value={formData.description} 
                    onChange={(description) => setFormData({ ...formData, description })} 
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Logistics */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-6 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
              Pricing & Type
            </h4>
            <div className="space-y-6">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] flex items-center gap-2"> <Tag size={10} className="text-blue-600" /> Category</label>
                <div className="relative">
                    <select 
                        value={formData.category} 
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="admin-form-input font-bold text-slate-900 cursor-pointer bg-white h-11 appearance-none pr-10"
                    >
                        <option value="Deluxe">Deluxe</option>
                        <option value="Premium">Premium</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Waves size={14} />
                    </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] flex items-center gap-2"> <IndianRupee size={10} className="text-emerald-500" /> Price per Night (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input 
                    type="text" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: e.target.value })} 
                    className="admin-form-input pl-10 font-black text-slate-900 h-11" 
                    placeholder="0.00" 
                  />
                </div>
              </div>

                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Houseboat Image"
                  />
                </div>

              <div className="pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-sm group/status">
                  <div className="w-10 h-10 rounded-xl bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0 group-hover/status:bg-blue-600 group-hover/status:text-white transition-all duration-500">
                    <Waves size={20} className="group-hover/status:animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">Status</div>
                    <div className="text-[10px] font-bold text-slate-800 uppercase mt-1.5 flex items-center gap-1.5">
                       <ShieldCheck size={10} className="text-emerald-500" /> Active
                    </div>
                  </div>
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