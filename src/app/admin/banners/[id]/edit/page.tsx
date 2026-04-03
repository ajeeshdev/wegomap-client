"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Type, Layout, MousePointerClick, AlignLeft, ShieldCheck, Zap, Globe, Clock, ExternalLink } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';

export default function EditBanner() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    pageName: '',
    pagePath: '',
    title: '',
    subtitle: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch(`${API_URL}/banners/${params.id}`);
      const json = await res.json();
      if (json.success) {
        setFormData(json.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load banner');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/banners/${params.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Banner updated successfully!');
        router.push('/admin/banners');
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
    <div className="admin-loading-screen">
        <div className="spinner"></div>
        <p className="loading-text uppercase tracking-[0.2em] font-black text-[10px]">Synchronizing Banner Data...</p>
    </div>
  );

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
              Edit Banner: {formData.pageName}
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Refining the visual identity for {formData.pagePath}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/banners')} className="admin-btn admin-btn-secondary">
            Cancel
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {saving ? 'Syncing...' : 'Update Records'}
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
                  dimensions="1920 x 600"
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

               {/* Decorative Sections Removed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
