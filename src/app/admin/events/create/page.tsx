"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Ticket, Type, Image as ImageIcon, Sparkles, Link as LinkIcon, Info, Briefcase, Zap, Globe, ShieldCheck, Clock, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

export default function CreateEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    heroHeading: '',
    heroSubtext: '',
    description: '',
    image: '',
    slug: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title) return toast.error('Event title required');
    setLoading(true);
    try {
      const formDataToSubmit = { ...formData, images: [formData.image] };
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formDataToSubmit)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Event created successfully');
        router.push('/admin/events');
      } else {
        toast.error(data.error || 'Creation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/events" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Host New Event</h2>
              <p className="status-badge">CURRENT FOCUS: <span className="active">{formData.status}</span></p>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={handleSubmit} disabled={loading} className="save-btn">
             <ShieldCheck size={18} /> {loading ? 'Saving...' : 'Deploy Event'}
           </button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
          <div className="tabs-header">
             <button className="tab-btn-top active">
                <div className="icon-wrap"><Ticket size={14} /></div>
                <span>Event Designer</span>
             </button>
          </div>

          <div className="tab-panel">
            <div className="space-y-6">
               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Core Identity</h4></div>
                  <div className="card-body">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="admin-form-group">
                           <label>Commercial Title</label>
                           <input type="text" value={formData.title} onChange={e => {
                              const v = e.target.value;
                              setFormData({ ...formData, title: v, slug: v.toLowerCase().replace(/ /g, '-') });
                           }} placeholder="Kerala Arts Festival..." className="title-input" />
                        </div>
                        <div className="admin-form-group">
                           <label>URL Slug</label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xs">/</span>
                              <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="pl-6 font-mono text-xs text-blue-600" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Hero Presentation</h4></div>
                  <div className="card-body">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="admin-form-group"><label>Display Headline</label><input type="text" value={formData.heroHeading} onChange={e => setFormData({ ...formData, heroHeading: e.target.value })} placeholder="Join the celebration" /></div>
                        <div className="admin-form-group"><label>Secondary Legend</label><input type="text" value={formData.heroSubtext} onChange={e => setFormData({ ...formData, heroSubtext: e.target.value })} placeholder="Cultural mastery revealed" /></div>
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Narrative Content</h4></div>
                  <div className="card-body no-padding">
                     <RichTextEditor value={formData.description} onChange={(description) => setFormData({ ...formData, description })} height={450} />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Publishing Audit</h4></div>
              <div className="card-body space-y-4">
                 <div className="meta-item">
                    <div className="toggle-row">
                       <label>Visibility Protocol</label>
                       <input type="checkbox" checked={formData.status === 'Active'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Hidden' })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
                 
                 <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Zap size={12} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Reach</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 leading-relaxed">
                       Events are automatically disseminated across all connected marketing channels upon deployment.
                    </div>
                 </div>
              </div>
           </div>

           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Primary Visual</h4></div>
              <div className="card-body">
                 <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} label="High-Res Landscape Resource" dimensions="1200 x 800" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
