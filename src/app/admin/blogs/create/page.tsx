"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, FileText, Search, Info, Globe, Sparkles, Clock, ShieldCheck, Layers, Tag, User, Zap, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import { toast } from 'react-hot-toast';

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    excerpt: '',
    featuredImage: '',
    content: '',
    category: '',
    author: 'Admin',
    publishDate: new Date().toISOString().split('T')[0],
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
          // Deduplicate categories by title/name
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error('Title and Content are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Blog post created successfully!');
        router.push('/admin/blogs');
      } else {
        toast.error(data.error || 'Creation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="admin-page-header ">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/blogs')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Create New Blog
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Write and publish a new blog post.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/blogs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="admin-btn admin-btn-primary h-11"
          >
            <Safe size={18} /> {loading ? 'Saving...' : 'Publish Blog'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area (Central) */}
        <div className="space-y-8">

          {/* Article Content Section */}
          <div className="admin-form-card space-y-10">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-orange-600"></div>
              Post Content
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="admin-form-group md:col-span-2">
                <label className="admin-form-label flex items-center gap-2"> <FileText size={12} className="text-orange-500" /> Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      title: val,
                      slug: val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                    });
                  }}
                  className="admin-form-input font-bold h-12"
                  placeholder="e.g. Best time to visit Kerala"
                />
              </div>
              <div className="admin-form-group md:col-span-2">
                <label className="admin-form-label flex items-center gap-2"> <Globe size={12} className="text-sky-500" /> URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="admin-form-input font-medium h-12 text-orange-600 bg-slate-50/50"
                  placeholder="best-time-to-visit-kerala"
                />
              </div>

              <div className="admin-form-group md:col-span-2 pt-4 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-2 mb-4"> <Layers size={14} className="text-orange-500" /> Content</label>
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

          {/* SEO Preview Simulator */}
          <div className="admin-form-card space-y-8">
            <h3 className="admin-form-section-title border-none mb-0">
              <div className="admin-page-title-indicator bg-emerald-500"></div>
              Google Search Preview
            </h3>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">W</div>
                <div className="text-[11px] text-slate-500">wegomap.com › blogs</div>
              </div>
              <h4 className="text-[#1a0dab] text-xl font-medium mb-1 hover:underline cursor-pointer">
                {formData.seo_title || formData.title || 'Post Title Preview'}
              </h4>
              <p className="text-[#4d5156] text-sm leading-snug line-clamp-2">
                {formData.seo_meta || formData.excerpt || 'Enter an SEO description to see how it appears in search results...'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation & Meta (Right Side) */}
        <div className="admin-form-sidebar">

          <div className="admin-form-card p-8 space-y-10">
            {/* Featured Image */}
            <div className="group/media">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
                <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
                Featured Image
              </h4>
              <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  label="Upload Image"
                />
              </div>
            </div>

            {/* Post details */}
            <div className="pt-10 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
                <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
                Metadata
              </h4>
              <div className="space-y-6">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Tag size={10} className="text-orange-500" /> Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="admin-form-input h-10 text-[11px] font-bold bg-white"
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
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Clock size={10} className="text-orange-500" /> Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                    className="admin-form-input h-10 text-[11px] font-bold"
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
            <div className="pt-10 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
                <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                SEO Settings
              </h4>
              <div className="space-y-6">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Search size={10} className="text-emerald-500" /> SEO Title</label>
                  <input
                    type="text"
                    value={formData.seo_title}
                    onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                    className="admin-form-input h-10 text-[11px] font-bold"
                    placeholder="Search title..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold mb-2"> <Layers size={10} className="text-orange-500" /> Meta Description</label>
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

            <div className="pt-10 border-t border-slate-50">
              <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-orange-100/50 flex items-center justify-center text-orange-600 shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">System Status</div>
                  <div className="admin-status-badge admin-status-badge-success bg-white mt-1">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
