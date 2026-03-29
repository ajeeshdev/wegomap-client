"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Type, MousePointerClick, AlignLeft, ShieldAlert, MonitorPlay, Sparkles, Zap, Clock, ExternalLink, ShieldCheck, Layers, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditSlider() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    imageAlt: '',
    link: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSlider() {
      try {
        const res = await fetch(`${API_URL}/sliders/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || '',
            subtitle: data.data.subtitle || '',
            image: data.data.image || '',
            imageAlt: data.data.imageAlt || 'wegomap',
            link: data.data.link || '',
            status: data.data.status || 'Active'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchSlider();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/sliders/${id}`, {
        method: 'PUT',
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
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Retrieving canvas data...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/sliders')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Edit Slider
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               ID: <span className="text-slate-900 font-bold">#{String(id).toUpperCase().slice(-8)}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/sliders')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-11 px-6"
          >
            <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="space-y-10">
              <h3 className="admin-form-section-title">
                <div className="admin-page-title-indicator bg-blue-600"></div>
                Slider Information
              </h3>

              <div className="space-y-8">
                <div className="admin-form-group">
                  <label className="admin-form-label">Main Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-lg font-bold h-12" 
                    placeholder="e.g. Explore Kerala"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Sub Title</label>
                    <input 
                      type="text" 
                      value={formData.subtitle} 
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                      className="admin-form-input text-xs font-bold uppercase tracking-wider h-11" 
                      placeholder="e.g. Limited Offers"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Button Link / URL</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData.link} 
                        onChange={e => setFormData({ ...formData, link: e.target.value })} 
                        className="admin-form-input font-mono text-xs h-11" 
                        placeholder="/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    altValue={formData.imageAlt}
                    onAltChange={(alt) => setFormData({ ...formData, imageAlt: alt })}
                    label="Slider Background Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-6 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
              Settings
            </h4>
            <div className="space-y-6">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-wider mb-2 block opacity-60">Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="admin-form-select h-11 text-xs font-bold"
                >
                  <option value="Active">Active / Published</option>
                  <option value="Hidden">Hidden / Draft</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all hover:bg-white">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">Record ID</div>
                    <div className="text-[10px] font-bold text-slate-800 font-mono uppercase mt-1 leading-none">
                       #{String(id).toUpperCase().slice(-12)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card bg-slate-900 border-none p-8 relative overflow-hidden h-64 group shadow-xl">
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-xl group-hover:bg-blue-600 transition-all duration-700">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-white uppercase tracking-widest opacity-60">Live Preview Hint</p>
                <p className="text-xs font-bold text-slate-400 italic px-4 line-clamp-2">{formData.title || 'No Title Set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}