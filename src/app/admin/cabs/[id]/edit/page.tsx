"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Car, Type, Users, Briefcase, IndianRupee, Clock, Sparkles, Image as ImageIcon, ShieldCheck, Zap, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function EditCab() {
  const router = useRouter();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCab() {
      try {
        const res = await fetch(`${API_URL}/cabs/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || data.data.name || '',
            slug: data.data.slug || '',
            description: data.data.description || '',
            price: data.data.price || '',
            capacity: data.data.capacity || '4',
            type: data.data.type || 'Sedan',
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
    if (id) fetchCab();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/cabs/${id}`, {
        method: 'PUT',
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
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Request failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-blue-600/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Retrieving vehicle records node...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/cabs')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-md">
              <div className="admin-page-title-indicator"></div>
              Edit Vehicle
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Vehicle: <span className="text-slate-900 font-black truncate max-w-[200px]">{formData.title}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/cabs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {saving ? 'Saving...' : 'Save Changes'}
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
                    <Type size={14} className="text-blue-600" /> Vehicle Model / Title
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
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
                      className="admin-form-input pl-12 font-mono text-[12px] text-blue-600 font-black h-16 rounded-3xl" 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Briefcase size={16} className="text-blue-600" /> Description & Features
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
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              Pricing & Type
            </h4>
            <div className="space-y-8">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] mb-3 block opacity-60">Vehicle Category</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-8 focus:ring-blue-600/5 text-center"
                >
                  <option value="Hatchback">Compact / Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Traveller">Tempo Traveller</option>
                </select>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-3 opacity-60"><Users size={12}/> PAX Unit</label>
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
                    className="admin-form-input font-black h-14 text-center rounded-2xl bg-slate-50 border-slate-100 focus:bg-white text-blue-600" 
                  />
                </div>
              </div>

                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Vehicle Image"
                    dimensions="1200 x 800"
                  />
                </div>

              <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">Record UID</div>
                  <div className="text-[10px] font-bold text-slate-800 font-mono uppercase truncate opacity-80 leading-none">#{String(id).toUpperCase().slice(-12)}</div>
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