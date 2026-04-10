"use client";
import { getImageUrl } from "@/config";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Image as ImageIcon, Type, MousePointerClick, AlignLeft, ShieldAlert, Sparkles, Zap, Globe, Clock, ExternalLink, ShieldCheck, Layers, Shield as Safe } from 'lucide-react';
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
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/sliders" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Design Hero Canvas</h2>
              <p className="status-badge">CURRENT STATUS: <span className="active">{formData.status}</span></p>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={() => handleSubmit()} disabled={loading} className="save-btn">
             <ShieldCheck size={18} /> {loading ? 'Compiling...' : 'Deploy Canvas'}
           </button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
           <div className="tabs-header">
              <button className="tab-btn-top active">
                 <div className="icon-wrap"><Layers size={14} /></div>
                 <span>Slide Designer</span>
              </button>
           </div>

           <div className="tab-panel">
             <div className="space-y-6">
                <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Narrative Configuration</h4></div>
                  <div className="card-body">
                    <div className="admin-form-group">
                      <label>Headline / Main Title</label>
                      <input 
                        type="text" 
                        value={formData.title} 
                        onChange={e => setFormData({ ...formData, title: e.target.value })} 
                        placeholder="Enter breathtaking headline..." 
                        className="title-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-6">
                       <div className="admin-form-group">
                         <label>Lead Text / Subtitle</label>
                         <input 
                           type="text" 
                           value={formData.subtitle} 
                           onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                           placeholder="e.g. THE ULTIMATE ESCAPE PROTOCOL"
                           className="font-bold tracking-tight text-sm"
                         />
                       </div>
                       <div className="admin-form-group">
                         <label>Interaction Link (URL)</label>
                         <div className="relative">
                           <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                           <input 
                             type="text" 
                             value={formData.link} 
                             onChange={e => setFormData({ ...formData, link: e.target.value })} 
                             className="pl-9 font-mono text-blue-600 !text-xs" 
                             placeholder="/packages/..."
                           />
                         </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Hero Background</h4></div>
                  <div className="card-body">
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

                <div className="editor-card bg-slate-900 border-none p-12 relative overflow-hidden h-64 flex flex-col items-center justify-center text-center group">
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-xl mx-auto mb-4">
                      <Sparkles size={32} />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">Live Preview Identity</p>
                    <h2 className="text-2xl font-black text-white px-8 line-clamp-1">{formData.title || 'Untitled Narrative'}</h2>
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{formData.status}</span>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Publishing Audit</h4></div>
              <div className="card-body space-y-6">
                 <div className="meta-item">
                    <div className="toggle-row">
                       <label>Protocol Visibility</label>
                       <input type="checkbox" checked={formData.status === 'Active'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Hidden' })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
                 
                 <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Clock size={12} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority Index</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 leading-relaxed">
                       The hero canvas will be rendered at the root priority level of the array.
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}