"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Ticket, Type, Image as ImageIcon, Sparkles, Link as LinkIcon, Clock, Zap, Globe, Briefcase, Info, ShieldCheck, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

export default function EditSpecialEvent() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    heroHeading: '',
    heroSubtext: '',
    description: '',
    image: '',
    slug: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`${API_URL}/special-events/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || '',
            heroHeading: data.data.heroHeading || '',
            heroSubtext: data.data.heroSubtext || '',
            description: data.data.description || '',
            image: data.data.images?.[0] || '',
            slug: data.data.slug || '',
            status: data.data.status || 'Active'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEvent();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const formDataToSubmit = { ...formData, images: [formData.image] };
      const res = await fetch(`${API_URL}/special-events/${id}`, {
        method: 'PUT',
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
      <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-rose-500/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/special-events')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-sm">
              <div className="admin-page-title-indicator"></div>
              Edit
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Event: <span className="text-slate-900 font-black truncate max-w-[200px]">{formData.title}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/special-events')} className="admin-btn admin-btn-secondary">
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
        <div className="lg:col-span-3 space-y-12">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.4)]"></div>
                Details
              </h3>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                      <Type size={14} className="text-blue-500" /> Name
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-50">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                      <Sparkles size={14} className="text-amber-500" /> Heading
                    </label>
                    <input 
                      type="text" 
                      value={formData.heroHeading} 
                      onChange={e => setFormData({ ...formData, heroHeading: e.target.value })} 
                      className="admin-form-input font-black h-16 px-8 rounded-3xl" 
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

              <div className="pt-8 border-t border-slate-50 space-y-8">
                <div className="admin-form-group">
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
                
                <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">Item ID</div>
                    <div className="text-[10px] font-bold text-slate-800 font-mono uppercase truncate opacity-80 leading-none">#{String(id).toUpperCase().slice(-12)}</div>
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
