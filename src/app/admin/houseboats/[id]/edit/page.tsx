"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Ship, Type, Anchor, Waves, Tag, Clock, Briefcase, Zap, Globe, Image as ImageIcon, ShieldCheck, Layers, Sparkles, IndianRupee, Shield as Safe } from 'lucide-react';
import { toast } from 'react-hot-toast';

import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function EditHouseboat() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    category: 'Deluxe',
    image: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchHouseboat() {
      try {
        const res = await fetch(`${API_URL}/houseboats/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || data.data.name || '',
            slug: data.data.slug || '',
            description: data.data.description || '',
            price: data.data.price || '',
            category: data.data.category || 'Deluxe',
            image: data.data.image || '',
            status: data.data.status || 'Available'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchHouseboat();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/houseboats/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Houseboat updated successfully');
        router.push('/admin/houseboats');
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    } finally {

      setSaving(false);
    }
  };

  if (loading) return (
    <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Navigating to harbor quadrant...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/houseboats')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-md">
              <div className="admin-page-title-indicator"></div>
              Edit Houseboat
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Houseboat: <span className="text-slate-900 font-bold">{formData.title || 'Untitled'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/houseboats')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-11"
          >
            <Safe size={18} /> {saving ? 'Saving...' : 'Save Changes'}
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

              <div className="admin-form-grid-2 pt-4">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-2">
                    <Ship size={12} className="text-blue-600" /> Houseboat Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-lg font-bold" 
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
                      className="admin-form-input pl-8 font-mono text-xs text-blue-600 focus:bg-white" 
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
              <div className="admin-form-grid-2">
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
                  <label className="admin-form-label text-[10px] flex items-center gap-2"> <IndianRupee size={10} className="text-emerald-500" /> Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input 
                      type="text" 
                      value={formData.price} 
                      onChange={e => setFormData({ ...formData, price: e.target.value })} 
                      className="admin-form-input pl-10 font-black text-slate-900 h-11" 
                    />
                  </div>
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
                    <Clock size={20} className="group-hover/status:animate-spin-slow" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">Record UID</div>
                    <div className="text-[10px] font-bold text-slate-800 uppercase mt-1.5 truncate">#{String(id).toUpperCase().slice(-12)}</div>
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