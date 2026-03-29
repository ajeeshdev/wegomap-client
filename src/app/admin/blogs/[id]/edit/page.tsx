"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, FileText, Search, Info, Globe, Sparkles, Clock, ShieldCheck, Layers, Tag, User, Zap } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import { toast } from 'react-hot-toast';

export default function EditBlog() {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    excerpt: '',
    featuredImage: '',
    featuredImageAlt: '',
    content: '',
    category: '',
    author: '',
    publishDate: '',
    seo_title: '',
    seo_meta: '',
    seo_keys: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        if (data.success) {
          const unique = Array.from(new Map(data.data.map((item: any) => [
            (item.title || item.name || '').toLowerCase(),
            item
          ])).values());
          setCategories(unique);
        }
      } catch (err) { console.error('Failed to fetch categories', err); }
    };
    fetchCategories();
  }, []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/blogs/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || '',
            slug: data.data.slug || '',
            excerpt: data.data.excerpt || '',
            featuredImage: data.data.featuredImage || data.data.image || '',
            featuredImageAlt: data.data.featuredImageAlt || 'wegomap',
            content: data.data.content || '',
            category: data.data.category || '',
            author: data.data.author || '',
            publishDate: data.data.publishDate ? new Date(data.data.publishDate).toISOString().split('T')[0] : '',
            seo_title: data.data.seo_title || '',
            seo_meta: data.data.seo_meta || '',
            seo_keys: data.data.seo_keys || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const newSlug = slugify(newTitle);
    
    // Only auto-update slug if it was previously empty or matching the previous title slug
    const shouldUpdateSlug = !formData.slug || formData.slug === slugify(formData.title);
    
    setFormData({
      ...formData,
      title: newTitle,
      slug: shouldUpdateSlug ? newSlug : formData.slug
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Blog post updated successfully!');
        router.push('/admin/blogs');
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    } finally {
      setSaving(false);
    }
  };


  if (loading) return (
    <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading blog post...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="admin-page-header ">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/blogs')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-md">
              <div className="admin-page-title-indicator"></div>
              Edit Blog
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
              Editing: <span className="text-slate-900 font-bold">{formData.title || 'Untitled'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/blogs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={saving}
            className="admin-btn admin-btn-primary h-11"
          >
            <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area (Central) */}
        <div className="space-y-6">

          {/* Article Content Section */}
          <div className="admin-form-card space-y-6">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-blue-600"></div>
              Post Content
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="admin-form-group md:col-span-2">
                <label className="admin-form-label flex items-center gap-2"> <FileText size={12} className="text-blue-600" /> Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="admin-form-input font-bold h-10 px-4"
                  placeholder="e.g. Best time to visit Kerala"
                />
              </div>
              <div className="admin-form-group md:col-span-2">
                <label className="admin-form-label flex items-center gap-2"> <Globe size={12} className="text-sky-500" /> URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="admin-form-input font-medium h-10 text-blue-600 bg-slate-50/50 px-4"
                  placeholder="best-time-to-visit-kerala"
                />
              </div>

              <div className="admin-form-group md:col-span-2 pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-4"> <Layers size={14} className="text-blue-600" /> Content</label>
                <div className="bg-slate-50/30 rounded-2xl p-1 border border-slate-100 shadow-inner">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    height={400}
                  />
                </div>
              </div>

              <div className="admin-form-group md:col-span-2 pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-4"> <Info size={14} className="text-amber-500" /> Excerpt / Summary</label>
                <div className="bg-slate-50/30 rounded-2xl p-2 border border-slate-100 shadow-inner">
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 h-24"
                    placeholder="Briefly describe what this post is about..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Navigation & Meta (Right Side) */}
        <div className="admin-form-sidebar">
          {/* SEO Preview Simulator */}
          <div className="admin-form-card space-y-4 !p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
              Search Preview
            </h3>

            <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[9px] text-slate-400">wegomap.com › blogs</div>
              </div>
              <h4 className="text-[#1a0dab] text-sm font-medium mb-1 line-clamp-1">
                {formData.seo_title || formData.title || 'Post Title Preview'}
              </h4>
              <p className="text-[#4d5156] text-[11px] leading-snug line-clamp-2">
                {formData.seo_meta || formData.excerpt || 'Enter an SEO description...'}
              </p>
            </div>
          </div>

          <div className="admin-form-card p-4 space-y-6">
            {/* Featured Image */}
            <div className="group/media">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-4">
                <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                Featured Image
              </h4>
              <div className="bg-slate-50/50 rounded-lg p-1 border border-slate-100">
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  altValue={formData.featuredImageAlt}
                  onAltChange={(alt) => setFormData({ ...formData, featuredImageAlt: alt })}
                  label=""
                />
              </div>
            </div>

            {/* Post details */}
            <div className="pt-6 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-4">
                <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                Metadata
              </h4>
              <div className="space-y-6">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Tag size={10} className="text-blue-600" /> Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="admin-form-input h-9 text-[11px] font-bold bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat._id} value={cat.title || cat.name}>
                        {cat.title || cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-1"> <Clock size={10} className="text-blue-600" /> Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                    className="admin-form-input h-9 text-[11px] font-bold"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <User size={10} className="text-sky-500" /> Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="admin-form-input h-10 text-[11px] font-bold"
                    placeholder="Admin"
                  />
                </div>
              </div>
            </div>

            {/* SEO section */}
            <div className="pt-6 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-4">
                <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                SEO Settings
              </h4>
              <div className="space-y-4">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-1"> <Search size={10} className="text-emerald-500" /> SEO Title</label>
                  <input
                    type="text"
                    value={formData.seo_title}
                    onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                    className="admin-form-input h-9 text-[11px] font-bold"
                    placeholder="Search title..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Layers size={10} className="text-blue-600" /> Meta Description</label>
                  <textarea
                    rows={3}
                    value={formData.seo_meta}
                    onChange={e => setFormData({ ...formData, seo_meta: e.target.value })}
                    className="admin-form-textarea text-[11px] font-medium text-slate-700 min-h-[80px]"
                    placeholder="Brief description for search engines..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={14} />
                </div>
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400 leading-none">Status</div>
                  <div className="admin-status-badge admin-status-badge-success bg-white mt-1 text-[9px] py-0.5 px-2">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
