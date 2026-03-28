"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Type, MousePointerClick, AlignLeft, ShieldAlert, Sparkles, Zap, Globe, Clock, ExternalLink, ShieldCheck, Layers, Shield as Safe, Megaphone } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateOfferBanner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    link: '',
    active: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.image || !formData.title) {
        alert('Please provide at least a title and an image.');
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/offer-banners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/offer-banners');
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
          <button onClick={() => router.push('/admin/offer-banners')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Create Offer Banner
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new promotional slider for the homepage</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/offer-banners')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save Banner'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-16">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--orange"></div>
                Banner Information
              </h3>

              <div className="space-y-12">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Type size={14} className="text-orange-500" /> Administrative Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="admin-form-input font-bold tracking-tight h-16 px-8 rounded-3xl"
                    placeholder="E.g. Summer Special Offer 2024..."
                  />
                </div>

                <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                      <ExternalLink size={14} className="text-orange-400" /> Destination Link (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[11px] font-black">URL</span>
                      <input
                        type="text"
                        value={formData.link}
                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                        className="admin-form-input pl-14 font-mono text-[11px] text-orange-600 font-bold h-14"
                        placeholder="https://wegomap.com/kerala-special"
                      />
                    </div>
                </div>

                <div className="admin-form-group pt-12 border-t border-slate-50">
                  <div className="space-y-10 pt-4">
                    <ImageUpload
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      label="Upload Banner Image (Recommended aspect ratio 25:7)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
              <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
              Configuration
            </h4>
            <div className="space-y-8 text-center">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] mb-3 block opacity-60">Status</label>
                <select
                  value={formData.active ? 'true' : 'false'}
                  onChange={e => setFormData({ ...formData, active: e.target.value === 'true' })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm text-center"
                >
                  <option value="true">Active / Visible</option>
                  <option value="false">Inactive / Hidden</option>
                </select>
              </div>

              <div className="pt-8 border-t border-slate-50 text-left">
                <div className="flex items-start gap-4 p-4 bg-orange-50 text-orange-800 rounded-2xl border border-orange-100 text-[11px] font-medium leading-relaxed italic opacity-80">
                   Tip: Use high-quality wide banners. Standard size is roughly 1920x540 pixels.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
