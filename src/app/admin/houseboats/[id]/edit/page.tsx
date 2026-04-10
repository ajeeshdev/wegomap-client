"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Ship, Type, Anchor, Waves, Tag, Clock, Briefcase, Zap, Globe, Image as ImageIcon, ShieldCheck, Layers, Sparkles, IndianRupee, Shield as Safe, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import '../../../cms-premium.scss';

export default function EditHouseboat() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_desc: '',
    description: '',
    price: '',
    category: 'Deluxe',
    image: '',
    thumb: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchHouseboat() {
      try {
        const res = await fetch(`${API_URL}/houseboats/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || data.data.name || '',
            slug: data.data.slug || '',
            short_desc: data.data.short_desc || '',
            description: data.data.description || '',
            price: data.data.price || '',
            category: data.data.category || 'Deluxe',
            image: data.data.image || '',
            thumb: data.data.thumb || '',
            status: data.data.status || 'Available'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchHouseboat();
  }, [id]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/houseboats/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Houseboat updated successfully');
        router.push('/admin/houseboats');
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
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Syncing with harbor...</p>
    </div>
  );

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/houseboats" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">Refine Vessel</h2>
              <p className="status-badge">CURRENT STATUS: <span className="active">{formData.status}</span></p>
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
                <div className="icon-wrap"><Ship size={14} /></div>
                <span>Vessel Designer</span>
             </button>
          </div>

          <div className="tab-panel">
            <div className="space-y-6">
               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Core Identity</h4></div>
                  <div className="card-body">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="admin-form-group">
                           <label>Vessel Name</label>
                           <input 
                             type="text" 
                             value={formData.title} 
                             onChange={e => setFormData({ ...formData, title: e.target.value })} 
                             className="title-input" 
                           />
                        </div>
                        <div className="admin-form-group">
                           <label>URL Slug</label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xs">/</span>
                              <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="pl-6 font-mono text-xs text-blue-600 focus:bg-white" />
                           </div>
                        </div>

                        <div className="admin-form-group md:col-span-2">
                           <label>Draft Overview (Listing Snippet)</label>
                           <textarea 
                             value={formData.short_desc} 
                             onChange={e => setFormData({ ...formData, short_desc: e.target.value })} 
                             className="min-h-[100px] p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm leading-relaxed" 
                             placeholder="Brief snippet for the listing card..." 
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="editor-card">
                  <div className="card-header"><h4 className="serif">Vessel Narrative</h4></div>
                  <div className="card-body no-padding">
                     <RichTextEditor 
                       value={formData.description} 
                       onChange={(description) => setFormData({ ...formData, description })} 
                       height={500}
                     />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Logistics Audit</h4></div>
              <div className="card-body space-y-6">
                 <div className="meta-item">
                    <label>Structural Category</label>
                    <div className="relative">
                       <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="cursor-pointer appearance-none !h-11 font-bold">
                          <option value="Deluxe">💎 Deluxe</option>
                          <option value="Premium">✨ Premium</option>
                          <option value="Luxury">👑 Luxury</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                 </div>

                 <div className="meta-item">
                    <label>Standard Rate (₹)</label>
                    <div className="relative">
                       <IndianRupee size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                       <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="pl-8 font-black text-slate-900" placeholder="0.00" />
                    </div>
                 </div>

                 <div className="meta-item">
                    <div className="toggle-row">
                       <label>Visibility protocol</label>
                       <input type="checkbox" checked={formData.status === 'Available'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Available' : 'Unavailable' })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>

                 <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[10px] text-slate-500 flex items-center gap-3">
                    <Clock size={14} className="text-orange-500" />
                    UID: {String(id).toUpperCase().slice(-12)}
                 </div>
              </div>
           </div>

           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Media Assets</h4></div>
              <div className="card-body space-y-8">
                 <ImageUpload value={formData.thumb} onChange={(url) => setFormData({ ...formData, thumb: url })} label="Listing Thumbnail (4:3)" dimensions="800 x 600" />
                 <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} label="Hero Experience Image" dimensions="1920 x 1080" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}