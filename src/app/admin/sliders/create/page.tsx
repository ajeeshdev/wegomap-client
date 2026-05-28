"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Globe, Layers, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateSlider() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    imageAlt: 'wegomap',
    link: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/sliders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/sliders');
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <Link href="/admin/sliders" className="admin-back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Create New Slider
            </h2>
            <p className="admin-page-subtitle mt-1">
              Design a new hero banner slide for the homepage
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/sliders" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="admin-btn admin-btn-primary h-11 px-6"
          >
            <Save size={18} /> {loading ? 'Creating...' : 'Create Slider'}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="admin-form-grid">
        {/* Left: Main Content */}
        <div className="lg:col-span-3 space-y-8">

          {/* Slide Content */}
          <div className="admin-form-card">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Layers size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase tracking-wide">Slide Content</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Text displayed over the hero image</p>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Headline / Main Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Beautiful Malaysia"
                  className="admin-form-input text-lg font-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Lead Text / Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. THE ULTIMATE ESCAPE"
                    className="admin-form-input font-bold"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Interaction Link (URL)</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input
                      type="text"
                      value={formData.link}
                      onChange={e => setFormData({ ...formData, link: e.target.value })}
                      className="admin-form-input pl-9 font-mono text-blue-600 text-sm"
                      placeholder="/packages/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="admin-form-card">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase tracking-wide">Hero Background</h3>
                  <p className="text-[10px] text-slate-400 font-medium">High-resolution landscape image (recommended 1920×800)</p>
                </div>
              </div>

              <ImageUpload
                value={formData.image}
                onChange={url => setFormData({ ...formData, image: url })}
                altValue={formData.imageAlt}
                onAltChange={alt => setFormData({ ...formData, imageAlt: alt })}
                label="High-Res Landscape Resource"
                dimensions="1920 x 800"
              />
            </div>
          </div>

          {/* Live Preview Strip */}
          <div className="rounded-2xl bg-slate-900 p-8 flex items-center gap-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles size={22} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Live Preview Identity</p>
              <h2 className="text-xl font-black text-white line-clamp-1">{formData.title || 'Untitled Slide'}</h2>
              {formData.subtitle && <p className="text-sm text-white/60 mt-0.5">{formData.subtitle}</p>}
            </div>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full ${formData.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${formData.status === 'Active' ? 'text-emerald-400' : 'text-slate-400'}`}>{formData.status}</span>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="admin-form-sidebar space-y-6">
          {/* Status Toggle */}
          <div className="admin-form-card p-5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Visibility</h4>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-black">Active on site</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.status === 'Active'}
                  onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Hidden' })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 italic">When off, this slide won't appear on the homepage.</p>
          </div>

          {/* Priority note */}
          <div className="admin-form-card p-5 bg-slate-50 border-none">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Clock size={12} />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority Index</span>
            </div>
            <div className="text-[10px] font-bold text-slate-500 leading-relaxed">
              The new slide will be added to the end of the slider queue. You can reorder slides from the Sliders list view.
            </div>
          </div>

          {/* Info note */}
          <div className="admin-form-card bg-slate-50 border-none p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed italic opacity-80">
                The slide will appear on the homepage immediately after creation. Recommended image size is 1920×800px for best quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}