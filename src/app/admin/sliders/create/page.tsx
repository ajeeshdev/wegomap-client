"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Type, MousePointerClick, AlignLeft, ShieldAlert, Sparkles, Zap, Globe, Clock, ExternalLink, ShieldCheck, Layers, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateSlider() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
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
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/sliders')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Design Hero Canvas
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Composing a new high-fidelity visual narrative for the global storefront</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/sliders')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Compiling...' : 'Deploy Canvas'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-16">
              <h3 className="admin-form-section-title">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                Visual Blueprint & Variable Stack
              </h3>

              <div className="space-y-12">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Type size={14} className="text-blue-500" /> Primary Headline Identity (Master Title)
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                    placeholder="EXPERIENCE KERALA MASTERCORE..." 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-50">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                       <Zap size={14} className="text-amber-500" /> Decorative Accent (Subtitle / Slugline)
                    </label>
                    <input 
                      type="text" 
                      value={formData.subtitle} 
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                      className="admin-form-input font-black text-indigo-600 uppercase tracking-[0.2em] text-[11px] h-14" 
                      placeholder="THE ULTIMATE ESCAPE PROTOCOL" 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                       <ExternalLink size={14} className="text-blue-400" /> structural Redirect Identifier (URL / Action)
                    </label>
                    <div className="relative">
                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[11px] font-black">/</span>
                      <input 
                        type="text" 
                        value={formData.link} 
                        onChange={e => setFormData({ ...formData, link: e.target.value })} 
                        className="admin-form-input pl-10 font-mono text-[11px] text-blue-600 font-bold h-14" 
                        placeholder="munnar-escape-blueprint" 
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group pt-12 border-t border-slate-50">
                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Master Asset Visual"
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
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
              Publication Hub
            </h4>
            <div className="space-y-8 text-center">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] mb-3 block opacity-60">Render Protocol Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-8 focus:ring-blue-500/5 text-center"
                >
                  <option value="Active">Operational / Live</option>
                  <option value="Hidden">Draft / Archive Node</option>
                </select>
              </div>
              
              <div className="pt-8 border-t border-slate-50">
                <div className="flex items-start gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 italic transition-all hover:bg-white hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                        <Clock size={20} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mb-2">Context Index</p>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed opacity-60">The hero canvas will be rendered at the root priority level of the array.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl">
             {formData.image && (
               <div className="absolute inset-0 opacity-10 filter blur-sm scale-110 transition-opacity duration-1000 group-hover:opacity-30">
                 <img src={formData.image} className="w-full h-full object-cover" />
               </div>
             )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent h-full"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 h-full text-center py-4">
              <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-blue-600 transition-all duration-700 shadow-2xl group-hover:scale-110">
                <Sparkles size={48} className="group-hover:rotate-12 transition-transform duration-700" />
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-2 leading-none opacity-60">Simulation Preview</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-10 leading-relaxed italic opacity-80 min-h-[3rem] line-clamp-2">{formData.title || 'Draft Campaign Manuscript'}</p>
                <div className="flex items-center justify-center gap-3 pt-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Master Protocol Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}