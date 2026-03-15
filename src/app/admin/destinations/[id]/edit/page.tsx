"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, MapPin, Globe, Type, Image as ImageIcon, Sparkles, Clock, Compass, ShieldCheck, Zap, Layers, Info, Search } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditDestination() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchDestination() {
      try {
        const res = await fetch(`${API_URL}/destinations/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || data.data.name || '',
            slug: data.data.slug || '',
            content: data.data.content || '',
            excerpt: data.data.excerpt || '',
            image: data.data.image || '',
            status: data.data.status || 'Active'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDestination();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/destinations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/destinations');
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
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-indigo-500/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Navigating to cartographic global quadrant...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/destinations')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-sm">
              <div className="admin-page-title-indicator"></div>
              Edit Destination
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
              Destination: <span className="text-slate-900 font-black truncate max-w-[200px]">{formData.title}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/destinations')} className="admin-btn admin-btn-secondary">
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
        {/* Main Content Area (Central) */}
        <div className="space-y-8">

          {/* Basic Details Section */}
          <div className="admin-form-card space-y-10">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-blue-600"></div>
              Location Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2"> <MapPin size={12} className="text-blue-500" /> Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="admin-form-input font-bold h-12"
                  placeholder="e.g. Munnar"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2"> <Compass size={12} className="text-sky-500" /> URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="admin-form-input font-medium h-12 text-blue-600 bg-slate-50/50"
                  placeholder="munnar"
                />
              </div>

              <div className="admin-form-group md:col-span-2 pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-4"> <Layers size={14} className="text-blue-500" /> Description</label>
                <div className="bg-slate-50/30 rounded-2xl p-1 border border-slate-100 shadow-inner">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    height={400}
                  />
                </div>
              </div>

              <div className="admin-form-group md:col-span-2 pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-4"> <Info size={14} className="text-amber-500" /> Short Summary</label>
                <div className="bg-slate-50/30 rounded-2xl p-2 border border-slate-100 shadow-inner">
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 h-24"
                    placeholder="Enter a brief summary of the destination..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation & Meta (Right Side) */}
        <div className="admin-form-sidebar">

          <div className="admin-form-card p-8 space-y-10">
            {/* Featured Image */}
            <div className="group/media">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
                <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                Featured Image
              </h4>
              <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Main Image"
                />
              </div>
            </div>

            {/* Status box */}
            <div className="pt-10 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
                <div className="w-1 h-3 bg-rose-500 rounded-full"></div>
                Visibility
              </h4>
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-3"> <Globe size={10} className="text-emerald-500" /> Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="admin-form-input h-10 text-[11px] font-bold"
                >
                  <option value="Active">Published</option>
                  <option value="Hidden">Draft / Hidden</option>
                </select>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">System Status</div>
                    <div className="admin-status-badge admin-status-badge-success bg-white mt-1">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}