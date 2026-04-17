"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, FileText, Sparkles, Clock, Zap, Layout, Settings, Layers, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';
import ImageUpload from '@/components/admin/ImageUpload';
import { getImageUrl } from '@/config';

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
    seo_canonical: '',
    banner_title: '',
    banner_subtitle: '',
    banner_pre_title: '',
    banner_image: ''
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
            seo_canonical: d.seo_canonical || '',
            banner_title: d.banner_title || '',
            banner_subtitle: d.banner_subtitle || '',
            banner_pre_title: d.banner_pre_title || '',
            banner_image: d.banner_image || ''
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
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="admin-form-input"
                  placeholder="e.g. Welcome to WEGOMAP"
                />
              </div>

              {/* Banner Section */}
              <div className="pt-6 border-t border-slate-100 space-y-8">
                <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Banner Information</h4>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded tracking-tighter uppercase italic">Visible at page hero</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-1">Banner Title</label>
                            <input
                                type="text"
                                value={formData.banner_title}
                                onChange={e => setFormData({ ...formData, banner_title: e.target.value })}
                                className="admin-form-input"
                                placeholder="e.g. Experience the Unforgettable"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-1">Banner Pre-Title</label>
                            <input
                                type="text"
                                value={formData.banner_pre_title}
                                onChange={e => setFormData({ ...formData, banner_pre_title: e.target.value })}
                                className="admin-form-input"
                                placeholder="e.g. Premium Event Management"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-1">Banner Subtitle / Description</label>
                            <textarea
                                rows={3}
                                value={formData.banner_subtitle}
                                onChange={e => setFormData({ ...formData, banner_subtitle: e.target.value })}
                                className="admin-form-input"
                                placeholder="e.g. WEGOMAP orchestrates world-class corporate summits..."
                            />
                        </div>
                    </div>

                    {/* Banner Image Upload */}
                    <div className="admin-form-group">
                        <label className="admin-form-label mb-3 flex items-center gap-2">
                             Banner Background Image
                        </label>
                        <ImageUpload
                            value={formData.banner_image}
                            onChange={val => setFormData({ ...formData, banner_image: val })}
                        />
                        <p className="text-[10px] text-slate-400 mt-3 italic leading-relaxed">
                            Recommended: High resolution 1920x600px or similar wide aspect ratio. Darker images work best for white text overlay.
                        </p>
                    </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="text-xs font-semibold uppercase tracking-wider text-blue-600 ml-1">Page Content</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={content => setFormData({ ...formData, content })}
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