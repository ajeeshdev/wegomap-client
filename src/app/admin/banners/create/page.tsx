"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Image as ImageIcon, Type, Layout, MousePointerClick, AlignLeft, ShieldCheck, Zap, Globe, Clock, ExternalLink, Sparkles, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

export default function CreateBanner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pageName: '',
    pagePath: '',
    title: '',
    subtitle: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/banners" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Define Banner</h2>
              <p className="status-badge">CURRENT FOCUS: <span className="active">{formData.pageName || 'New Identity'}</span></p>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={handleSubmit} disabled={loading} className="save-btn">
             <ShieldCheck size={18} /> {loading ? 'Compiling...' : 'Publish Banner'}
           </button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
          <div className="tabs-header">
             <button className="tab-btn-top active">
                <div className="icon-wrap"><Layers size={14} /></div>
                <span>Banner Designer</span>
             </button>
          </div>

          <div className="tab-panel">
            <div className="space-y-6">
               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Banner Identity</h4></div>
                  <div className="card-body">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="admin-form-group">
                           <label>Page Identification Name</label>
                           <input 
                             type="text" 
                             value={formData.pageName} 
                             onChange={e => setFormData({ ...formData, pageName: e.target.value })} 
                             placeholder="e.g. About Us" 
                           />
                        </div>
                        <div className="admin-form-group">
                           <label>Page Path (Slug)</label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xs">/</span>
                              <input 
                                type="text" 
                                value={formData.pagePath} 
                                onChange={e => setFormData({ ...formData, pagePath: e.target.value.replace(/^\//, '') })} 
                                className="pl-6 font-mono text-xs text-blue-600 focus:bg-white" 
                                placeholder="about" 
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Visual Narratives</h4></div>
                  <div className="card-body">
                     <div className="admin-form-group">
                        <label>Primary Headline</label>
                        <input 
                          type="text" 
                          value={formData.title} 
                          onChange={e => setFormData({ ...formData, title: e.target.value })} 
                          className="title-input" 
                          placeholder="e.g. EXPLORE OUR STORY" 
                        />
                     </div>
                     <div className="admin-form-group mt-6">
                        <label>Subtitle / Description</label>
                        <textarea 
                          value={formData.subtitle} 
                          onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                          rows={3}
                          placeholder="Craft a compelling narrative..."
                        />
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Background Asset</h4></div>
                  <div className="card-body">
                     <ImageUpload 
                       value={formData.image}
                       onChange={(url) => setFormData({ ...formData, image: url })}
                       label="High-Res Landscape Resource"
                       dimensions="1920 x 600"
                     />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Audit Log</h4></div>
              <div className="card-body space-y-4">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[10px] text-slate-500 flex items-center gap-3 leading-relaxed">
                    <Sparkles size={14} className="text-blue-500 shrink-0" />
                    Banners are global identifiers that define the hero section for specific internal routes.
                 </div>
                 
                 <div className="flex items-center gap-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 text-[10px] text-orange-600 font-bold uppercase tracking-widest">
                    <Zap size={14} /> Live Deployment
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
