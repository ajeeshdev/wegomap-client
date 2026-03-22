"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Ticket, Type, Image as ImageIcon, Sparkles, Link as LinkIcon, Info, Briefcase, Zap, Globe, ShieldCheck, Clock, Layers } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        router.push('/admin/events');
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
           <button onClick={() => router.push('/admin/events')} className="back-btn"><ArrowLeft size={18} /></button>
           <div className="title-area">
              <h1 className="serif">Add New Event</h1>
              <div className="status-badge">STATUS: <span className="active">{formData.status.toUpperCase()}</span></div>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={() => handleSubmit()} disabled={loading} className="save-btn"><ShieldCheck size={16} /> {loading ? 'Saving...' : 'Save Event'}</button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="tabs-sidebar">
           <button className="tab-btn active">
              <Ticket size={16} /> <span>Main Info</span>
           </button>
           
           <div className="mt-8 pt-8 border-t border-slate-100 px-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Event Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="admin-form-select !bg-white">
                <option value="Active">🟢 Visible</option>
                <option value="Hidden">🔴 Hidden</option>
              </select>

              <div className="mt-8">
                 <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} label="Cover Media" />
              </div>
           </div>
        </div>

        <div className="content-area">
           <div className="space-y-6">
              <div className="editor-card">
                 <div className="card-header"><h4 className="serif">Event Identity</h4></div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="admin-form-group">
                       <label>Event Name</label>
                       <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="KERALA BOAT RACING..." className="text-xl font-bold" />
                    </div>
                    <div className="admin-form-group">
                       <label>URL Slug</label>
                       <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="boat-racing-event" className="font-mono text-orange-600" />
                    </div>
                 </div>
              </div>

              <div className="editor-card">
                 <div className="card-header"><h4 className="serif">Hero Display</h4></div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="admin-form-group"><label>Display Heading</label><input type="text" value={formData.heroHeading} onChange={e => setFormData({ ...formData, heroHeading: e.target.value })} /></div>
                    <div className="admin-form-group"><label>Hero Subtext</label><input type="text" value={formData.heroSubtext} onChange={e => setFormData({ ...formData, heroSubtext: e.target.value })} /></div>
                 </div>
              </div>

              <div className="editor-card">
                 <div className="card-header"><h4 className="serif">Event Narrative</h4></div>
                 <div className="bg-slate-50/30 rounded-2xl border border-slate-100 overflow-hidden">
                    <RichTextEditor value={formData.description} onChange={(description) => setFormData({ ...formData, description })} height={450} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
