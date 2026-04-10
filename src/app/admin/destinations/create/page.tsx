"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, MapPin, Globe, Type, Image as ImageIcon, Search, Info, Compass, Sparkles, ShieldCheck, Zap, Layers, Clock } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';
import ImageUpload from '@/components/admin/ImageUpload';
import '../../cms-premium.scss';

export default function CreateDestination() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/destinations`, {
        method: 'POST',
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
           <button onClick={() => router.push('/admin/destinations')} className="back-btn"><ArrowLeft size={18} /></button>
           <div className="title-area">
              <h1 className="serif">Add Destination</h1>
              <div className="status-badge">STATUS: <span className="active">{formData.status.toUpperCase()}</span></div>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={() => handleSubmit()} disabled={loading} className="save-btn"><ShieldCheck size={16} /> {loading ? 'Saving...' : 'Save Destination'}</button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
          <div className="tabs-header">
             <button className="tab-btn-top active">
                <div className="icon-wrap"><MapPin size={14} /></div>
                <span>General Information</span>
             </button>
          </div>

          <div className="space-y-6">
             <div className="editor-card">
                <div className="card-header"><h4 className="serif">Location Profile</h4></div>
                <div className="card-body">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="admin-form-group">
                         <label>Destination Name</label>
                         <input type="text" value={formData.title} onChange={e => {const v=e.target.value; setFormData({...formData, title:v, slug:v.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')});}} placeholder="e.g. Munnar, Kerala" className="title-input" />
                      </div>
                      <div className="admin-form-group">
                         <label>URL Slug</label>
                         <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="munnar" className="slug-input" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="editor-card">
                <div className="card-header"><h4 className="serif">Rich Description</h4></div>
                <div className="card-body no-padding">
                   <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} height={400} />
                </div>
             </div>

             <div className="editor-card">
                <div className="card-header"><h4 className="serif">Search Summary</h4></div>
                <div className="card-body">
                   <textarea rows={4} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A brief summary for listings..." />
                </div>
             </div>
          </div>
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Publication</h4></div>
              <div className="card-body">
                 <div className="meta-item">
                    <label>Visibility</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Active">🟢 Published</option>
                      <option value="Hidden">🔴 Hidden</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Featured Visual</h4></div>
              <div className="card-body">
                 <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} label="Location Cover" dimensions="1200 x 800" />
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}