"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, FileText, Globe, Search, Plus, Sparkles, Zap, Layout, Settings, ShieldCheck, Clock, Layers } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';
import '../../cms-premium.scss';

export default function CreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    seo_title: '',
    seo_description: '',
    isStatic: true,
    status: 'Published'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/pages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/pages');
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

  const tabs = [
    { id: 'content', label: 'Content', icon: Layout },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'config', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <button onClick={() => router.push('/admin/pages')} className="back-btn"><ArrowLeft size={18} /></button>
           <div className="title-area">
              <h1 className="serif">Create New Page</h1>
              <div className="status-badge">STATUS: <span className="active">{formData.status.toUpperCase()}</span></div>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={() => handleSubmit()} disabled={loading} className="save-btn"><ShieldCheck size={16} /> {loading ? 'Saving...' : 'Save Page'}</button>
        </div>
      </div>

      <div className="property-edit-layout">
        <div className="tabs-sidebar">
           {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                 <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>
                    <Icon size={16} /> <span>{tab.label}</span>
                 </button>
              );
           })}
           
           <div className="mt-8 pt-8 border-t border-slate-100 px-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Publish Visibility</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="admin-form-select !bg-white">
                <option value="Published">🟢 Published</option>
                <option value="Draft">🟡 Draft</option>
              </select>
              
              <div className="mt-6 pt-6 border-t border-slate-50">
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Loading</span>
                    <input type="checkbox" checked={formData.isStatic} onChange={e => setFormData({ ...formData, isStatic: e.target.checked })} className="sr-only peer" />
                    <div className="w-10 h-6 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-all relative">
                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                    </div>
                 </label>
              </div>
           </div>
        </div>

        <div className="content-area">
           {activeTab === 'content' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Page Identification</h4></div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="admin-form-group">
                          <label>Page Title</label>
                          <input type="text" value={formData.title} onChange={e => {const v=e.target.value; setFormData({...formData, title:v, slug:v.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')});}} placeholder="e.g. Terms of Service..." className="text-xl font-bold" />
                       </div>
                       <div className="admin-form-group">
                          <label>Public URL Path</label>
                          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">/</span><input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="pl-6 font-mono text-orange-600" /></div>
                       </div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Page Content</h4></div>
                    <div className="bg-slate-50/30 rounded-2xl border border-slate-100 overflow-hidden">
                       <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} height={600} />
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Short Summary</h4></div>
                    <textarea rows={4} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A short summary for previews..." />
                 </div>
              </div>
           )}

           {activeTab === 'seo' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">SEO Optimization</h4></div>
                    <div className="space-y-4">
                       <div className="admin-form-group"><label>Meta Title</label><input type="text" value={formData.seo_title} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Meta Description</label><textarea rows={4} value={formData.seo_description} onChange={e => setFormData({ ...formData, seo_description: e.target.value })} /></div>
                    </div>
                 </div>
                 
                 <div className="editor-card bg-slate-900 border-slate-800">
                    <div className="card-header border-slate-800"><h4 className="serif text-white">Google Search Preview</h4></div>
                    <div className="p-8">
                       <div className="max-w-xl">
                          <h4 className="text-orange-400 text-xl font-bold mb-1">{formData.seo_title || formData.title || 'Page Title'}</h4>
                          <p className="text-emerald-500 text-xs font-mono mb-2">https://wegomap.digital/{formData.slug || 'url-slug'}</p>
                          <p className="text-slate-400 text-sm italic">{formData.seo_description || 'No description provided.'}</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'config' && (
              <div className="editor-card">
                 <div className="py-20 text-center">
                    <Settings size={40} className="text-slate-200 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No advanced settings available.</p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}