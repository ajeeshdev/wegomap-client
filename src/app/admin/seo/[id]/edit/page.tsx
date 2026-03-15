"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Globe, Sparkles, Info } from 'lucide-react';

export default function EditSEO() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keys: '',
    seo_meta: '',
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
            seo_title: d.seo_title || '',
            seo_description: d.seo_description || '',
            seo_keys: d.seo_keys || '',
            seo_meta: d.seo_meta || '',
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
      if (res.ok) router.push('/admin/seo');
    } catch (err) { console.error(err); } 
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-20 text-center text-slate-400">Loading Configuration...</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/seo')} className="p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="admin-page-title text-2xl font-bold flex items-center gap-2">
              <Globe className="text-indigo-600" size={24} />
              Configure SEO: <span className="text-slate-400 ml-1 font-medium italic">{formData.title}</span>
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-500">Manage metadata and search engine optimization for this node</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/seo')} className="admin-btn h-11 px-6 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={saving}
            className="admin-btn bg-indigo-600 text-white hover:bg-indigo-700 h-11 px-6 flex items-center gap-2 rounded-xl shadow-lg shadow-indigo-100 active:scale-95 transition-all font-bold"
          >
            <Save size={18} /> {saving ? 'Updating...' : 'Update SEO'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        Core Metadata
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">SEO Title</label>
                            <input 
                                type="text" 
                                value={formData.seo_title}
                                onChange={e => setFormData({...formData, seo_title: e.target.value})}
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                placeholder="Recommended: 50-60 characters"
                            />
                            <div className="flex justify-between items-center px-1">
                                <p className="text-[10px] text-slate-400">Character count: {formData.seo_title.length}</p>
                                {formData.seo_title.length > 60 && <p className="text-[10px] text-amber-500 font-medium">May be truncated in SERPs</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">SEO Description</label>
                            <textarea 
                                rows={4}
                                value={formData.seo_description}
                                onChange={e => setFormData({...formData, seo_description: e.target.value})}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                                placeholder="Recommended: 150-160 characters"
                            />
                            <div className="flex justify-between items-center px-1">
                                <p className="text-[10px] text-slate-400">Character count: {formData.seo_description.length}</p>
                                {formData.seo_description.length > 160 && <p className="text-[10px] text-amber-500 font-medium">May be truncated in SERPs</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Keywords</label>
                            <textarea 
                                rows={3}
                                value={formData.seo_keys}
                                onChange={e => setFormData({...formData, seo_keys: e.target.value})}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                                placeholder="Separate with commas..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        Advanced Tags
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Other SEO Meta Tags</label>
                            <textarea 
                                rows={5}
                                value={formData.seo_meta}
                                onChange={e => setFormData({...formData, seo_meta: e.target.value})}
                                className="w-full p-4 bg-slate-900 text-indigo-300 border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-xs font-mono resize-none"
                                placeholder='e.g. <meta name="robots" content="index, follow" />'
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Canonical URL</label>
                            <input 
                                type="text" 
                                value={formData.seo_canonical}
                                onChange={e => setFormData({...formData, seo_canonical: e.target.value})}
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-mono"
                                placeholder="https://wegomap.com/..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                        <Sparkles size={14} />
                        SERP Preview
                    </div>
                    <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50 hover:bg-white transition-all group">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">W</div>
                            <div className="text-[11px] text-slate-600 truncate">
                                wegomap.com › {formData.slug}
                            </div>
                        </div>
                        <div className="text-blue-700 text-lg font-medium group-hover:underline underline-offset-2 break-words leading-tight">
                            {formData.seo_title || formData.title || 'Untitled Page'}
                        </div>
                        <div className="text-slate-600 text-[13px] line-clamp-2 leading-relaxed break-words">
                            {formData.seo_description || 'No description provided. Search engines will pull content from the page instead to show to potential visitors.'}
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 italic text-center">Preview may vary based on search engine algorithms.</p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 space-y-6 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                        <Info size={14} className="text-blue-400" />
                        Quick Strategy
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-200">Titles & Focus</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">Ensure your primary keyword appears near the beginning of the SEO title.</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-200">Descriptions</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">Write for humans first. A compelling description increases click-through rate (CTR).</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-200">Keywords</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">Don't overstuff. Use 3-5 high-value phrases relevant to this specific page content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
