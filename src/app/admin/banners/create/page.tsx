"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Type, Layout, MousePointerClick, AlignLeft, ShieldCheck, Zap, Globe, Clock, ExternalLink } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';

export default function CreateBanner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pageName: '',
    pagePath: '',
    title: '',
    subtitle: '',
    image: '',
    showBack: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.pageName || !formData.pagePath || !formData.title) {
        toast.error('Please fill in Name, Path, and Title');
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/banners`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Banner created successfully!');
        router.push('/admin/banners');
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
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/banners')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Create New Banner
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Defining a unique identity for a specific inner page</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/banners')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Publish Banner'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 340px' }}>
        <div className="space-y-8">
          <div className="admin-form-card">
            <h3 className="admin-form-section-title">
              <div className="admin-section-icon admin-section-icon--orange"></div>
              Banner Content & Identity
            </h3>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-3">
                    <Layout size={14} className="text-blue-600" /> Page Identification Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.pageName} 
                    onChange={e => setFormData({ ...formData, pageName: e.target.value })} 
                    className="admin-form-input font-bold" 
                    placeholder="e.g. About Us" 
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-3">
                    <Globe size={14} className="text-emerald-500" /> Page Path (Slug)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">/</span>
                    <input 
                      type="text" 
                      value={formData.pagePath} 
                      onChange={e => setFormData({ ...formData, pagePath: e.target.value.startsWith('/') ? e.target.value : '/' + e.target.value })} 
                      className="admin-form-input pl-8 font-mono text-xs" 
                      placeholder="about" 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-3 mb-3">
                  <Type size={14} className="text-blue-600" /> Primary Banner Headline
                </label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  className="admin-form-input text-xl font-bold uppercase tracking-tight h-14" 
                  placeholder="e.g. EXPLORE OUR STORY" 
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-3 mb-3">
                   <AlignLeft size={14} className="text-amber-500" /> Subtitle Description
                </label>
                <textarea 
                  value={formData.subtitle} 
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                  className="admin-form-textarea" 
                  placeholder="A short description for the banner..." 
                  rows={3}
                />
              </div>

              <div className="admin-form-group pt-4 border-t border-slate-50">
                <ImageUpload 
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Background Banner Image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
              Banner Options
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-500">
                    <ArrowLeft size={18} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block">Back Option</label>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Visibility</span>
                  </div>
                </div>
                <label className="admin-toggle scale-90">
                  <input 
                    type="checkbox" 
                    checked={formData.showBack}
                    onChange={() => setFormData({ ...formData, showBack: !formData.showBack })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

               {/* Decorative Sections Removed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
