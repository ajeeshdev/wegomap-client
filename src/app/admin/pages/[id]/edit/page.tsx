"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, FileText, Sparkles, Clock, Zap, Layout, Settings, Layers } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    seo_title: '',
    seo_description: '',
    seo_keys: '',
    seo_canonical: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`${API_URL}/pages/${id}`);
        const json = await res.json();
        if (json.success) {
          const d = json.data;
          setFormData({
            title: d.title || '',
            slug: d.slug || '',
            content: d.content || '',
            seo_title: d.seo_title || '',
            seo_description: d.seo_description || '',
            seo_keys: d.seo_keys || '',
            seo_canonical: d.seo_canonical || ''
          });
        }
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    }
    if (id) fetchPage();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/pages/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) router.push('/admin/pages');
    } catch (err) { console.error(err); } 
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-10 text-center text-slate-400">Loading Page Data...</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/pages')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Edit Page
            </h2>
            <p className="admin-page-subtitle mt-1">Update page content and search engine settings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/pages')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-11 px-6"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-10">
          <div className="admin-form-card">
            <div className="space-y-8">
              <h3 className="admin-form-section-title">
                <div className="admin-page-title-indicator bg-blue-600"></div>
                Primary Content
              </h3>

              <div className="admin-form-group">
                <label className="admin-form-label">Page Heading / Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="admin-form-input"
                  placeholder="e.g. Welcome to Wegomap"
                />
              </div>

              <div className="admin-form-group">
                <label className="text-xs font-semibold uppercase tracking-wider text-blue-600 ml-1">Page Content</label>
                <RichTextEditor 
                  value={formData.content}
                  onChange={content => setFormData({...formData, content})}
                />
              </div>
            </div>
          </div>


        </div>

        {/* Sidebar Settings */}
        <div className="admin-form-sidebar space-y-8">
          <div className="admin-form-card bg-slate-50 border-none p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-blue-600 shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-400 uppercase tracking-wider text-xs italic">Live Update</p>
                <p className="text-[11px] text-slate-500 leading-relaxed italic opacity-80">
                  Changes made here will be reflected on the public website immediately after saving. To manage SEO metadata, please use the dedicated SEO module.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}