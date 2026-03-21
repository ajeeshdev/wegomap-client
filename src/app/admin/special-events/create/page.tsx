"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Ticket, Type, Image as ImageIcon, Sparkles, Link as LinkIcon, Info, Briefcase, Zap, Globe, ShieldCheck, Clock, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function CreateSpecialEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    heroHeading: '',
    heroSubtext: '',
    description: '',
    image: '',
    slug: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const formDataToSubmit = { ...formData, images: [formData.image] };
      const res = await fetch(`${API_URL}/special-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formDataToSubmit)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/special-events');
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
          <button onClick={() => router.push('/admin/special-events')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Add New
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new special tour or event to your website.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/special-events')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Form */}
        <div className="lg:col-span-3 space-y-12">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--rose"></div>
                Details
              </h3>

              <div className="space-y-12">
                <div className="admin-form-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                      <Type size={14} className="text-blue-500" /> Name
                    </label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({ ...formData, title: e.target.value })} 
                      className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                      placeholder="e.g. KERALA BOAT RACING CORE MANIFEST..." 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                      <Layers size={14} className="text-sky-500" /> URL Slug
                    </label>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                      className="admin-form-input font-bold h-16 px-8 rounded-3xl bg-slate-50/50" 
                      placeholder="e.g. boat-racing-event" 
                    />
                    <p className="text-[9px] font-bold text-slate-400 mt-3 uppercase tracking-widest leading-relaxed italic opacity-70">Optional. Auto-generated from name if left empty.</p>
                  </div>
                </div>

                <div className="admin-form-grid-2 admin-form-grid-2--bordered">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                      <Sparkles size={14} className="text-amber-500" /> Heading
                    </label>
                    <input 
                      type="text" 
                      value={formData.heroHeading} 
                      onChange={e => setFormData({ ...formData, heroHeading: e.target.value })} 
                      className="admin-form-input font-black h-16 px-8 rounded-3xl" 
                      placeholder="SPLASH YOUR HEART OUT..." 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                      <Info size={14} className="text-sky-500" /> Subtext
                    </label>
                    <input 
                      type="text" 
                      value={formData.heroSubtext} 
                      onChange={e => setFormData({ ...formData, heroSubtext: e.target.value })} 
                      className="admin-form-input font-bold h-16 px-8 rounded-3xl" 
                      placeholder="Experience the magic of tradition..." 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Briefcase size={16} className="text-slate-400" /> Description
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

        {/* Sidebar Assets */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
              Media
            </h4>
            <div className="space-y-8">
                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Cover Image"
                  />
                </div>

              <div className="pt-8 border-t border-slate-50">
                <label className="admin-form-label text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60 block">Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-8 focus:ring-blue-500/5 text-center"
                >
                  <option value="Active">Visible</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Decorative Sections Removed for Simplicity */}
        </div>
      </div>
    </div>
  );
}
