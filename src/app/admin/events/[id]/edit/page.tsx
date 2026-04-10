"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Ticket, Type, Image as ImageIcon, Sparkles, Link as LinkIcon, Clock, Zap, Globe, Briefcase, Info, ShieldCheck, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import { toast } from 'react-hot-toast';
import '../../../cms-premium.scss';

export default function EditEvent() {
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
        const res = await fetch(`${API_URL}/events/${id}`);
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

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const formDataToSubmit = { ...formData, images: [formData.image] };
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formDataToSubmit)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Event updated');
        router.push('/admin/events');
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Retrieving record...</p>
    </div>
  );

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/events" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Refine Event</h2>
              <p className="status-badge">CURRENT FOCUS: <span className="active">{formData.title}</span></p>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={handleSubmit} disabled={saving} className="save-btn">
             <ShieldCheck size={18} /> {saving ? 'Applying...' : 'Save Configuration'}
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
                           <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="title-input" />
                        </div>
                        <div className="admin-form-group">
                           <label>URL Slug</label>
                           <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="font-mono text-xs text-blue-600" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Hero Presentation</h4></div>
                  <div className="card-body">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="admin-form-group"><label>Display Headline</label><input type="text" value={formData.heroHeading} onChange={e => setFormData({ ...formData, heroHeading: e.target.value })} /></div>
                        <div className="admin-form-group"><label>Secondary Legend</label><input type="text" value={formData.heroSubtext} onChange={e => setFormData({ ...formData, heroSubtext: e.target.value })} /></div>
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
                       <label>Visibility protocol</label>
                       <input type="checkbox" checked={formData.status === 'Active'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Active' : 'Hidden' })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
                 
                 <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[10px] text-slate-500 flex items-center gap-3">
                    <Clock size={14} className="text-orange-500" />
                    ID: {String(id).toUpperCase().slice(-12)}
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
