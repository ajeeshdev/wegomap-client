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
        <div className="content-area">
          <div className="tabs-header">
             {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                   <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn-top ${activeTab === tab.id ? 'active' : ''}`}>
                      <div className="icon-wrap"><Icon size={14} /></div>
                      <span>{tab.label}</span>
                   </button>
                );
             })}
          </div>

          {activeTab === 'content' && (
             <div className="tab-panel">
                <div className="editor-card">
                   <div className="card-header"><h4 className="serif">Page Identification</h4></div>
                   <div className="card-body">
                      <div className="admin-form-group">
                         <label>Page Title</label>
                         <input type="text" value={formData.title} onChange={e => {const v=e.target.value; setFormData({...formData, title:v, slug:v.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')});}} placeholder="e.g. Terms of Service..." className="title-input" />
                      </div>
                   </div>
                </div>

                <div className="editor-card">
                   <div className="card-header"><h4 className="serif">Page Content</h4></div>
                   <div className="card-body no-padding">
                      <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} height={600} />
                   </div>
                </div>

                <div className="editor-card">
                   <div className="card-header"><h4 className="serif">Short Summary</h4></div>
                   <div className="card-body">
                      <textarea rows={4} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A short summary for previews..." />
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'config' && (
             <div className="tab-panel">
                <div className="editor-card">
                   <div className="card-header"><h4 className="serif">Search Engine Optimization</h4></div>
                   <div className="card-body">
                      <div className="admin-form-group">
                         <label>Meta Title</label>
                         <input type="text" value={formData.seo_title} onChange={e => setFormData({...formData, seo_title: e.target.value})} />
                      </div>
                      <div className="admin-form-group">
                         <label>Meta Description</label>
                         <textarea rows={3} value={formData.seo_description} onChange={e => setFormData({...formData, seo_description: e.target.value})} />
                      </div>
                   </div>
                </div>
             </div>
          )}
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Publishing</h4></div>
              <div className="card-body">
                 <div className="meta-item">
                    <label>URL Slug</label>
                    <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="slug-input" />
                 </div>
                 <div className="meta-item">
                    <label>Privacy Status</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Published">🟢 Published</option>
                      <option value="Draft">🔴 Draft</option>
                    </select>
                 </div>
                 <div className="meta-item">
                    <div className="toggle-row">
                       <label>Quick Loading</label>
                       <input type="checkbox" checked={formData.isStatic} onChange={e => setFormData({ ...formData, isStatic: e.target.checked })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}