"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, FileText, Globe, Search, Plus, Sparkles, Zap, Layout, Settings, ShieldCheck, Clock, Layers } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';

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
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/pages')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Create New Page
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new page to your website.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/pages')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Sidebar Logic */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-3 space-y-2 mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-4 pt-2 mb-2">Navigation</h4>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group overflow-hidden ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-2xl' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  <div className={`absolute inset-0 bg-blue-600 transition-transform duration-500 origin-left ${activeTab === tab.id ? 'scale-x-full' : 'scale-x-0'}`}></div>
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
              Status
            </h4>
            <div className="space-y-8">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] mb-3 block opacity-60">Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="admin-form-select font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[10px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-8 focus:ring-blue-500/5 text-center"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="pt-8 border-t border-slate-50">
                <label className="flex items-center justify-between cursor-pointer group/stat p-5 bg-slate-50/50 rounded-[32px] hover:bg-white transition-all border border-transparent hover:border-slate-100 shadow-sm active:scale-95">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover/stat:text-blue-600 transition-colors leading-none">Quick Loading</span>
                    <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tight opacity-60">Optimized</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={formData.isStatic} 
                    onChange={e => setFormData({ ...formData, isStatic: e.target.checked })} 
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-7 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-all relative shadow-inner">
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:left-6 shadow-md border border-slate-100"></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Zap size={20} className="fill-current" />
                </div>
                <div className="text-left">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">System</div>
                   <div className="text-[11px] font-black text-slate-800 uppercase leading-none opacity-80">Active</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-bl-full blur-[60px]"></div>
              <div className="relative z-10 flex flex-col items-center justify-center gap-8 py-4 text-center h-full">
                <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-blue-600 transition-all duration-700 shadow-2xl group-hover:scale-110">
                  <Sparkles size={48} className="group-hover:rotate-12 transition-transform duration-700" />
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-2 leading-none opacity-60">Preview</div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-10 leading-relaxed italic line-clamp-2 opacity-80">New Page</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-80">URL Ready</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Content Region */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            {activeTab === 'content' && (
              <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
                <h3 className="admin-form-section-title">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                  Page Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                       <FileText size={14} className="text-blue-500" /> Page Title
                    </label>
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
                      className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                      placeholder="e.g. Terms of Service, About Us..." 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label flex items-center gap-3 mb-4">
                       <Globe size={14} className="text-sky-500" /> Page Link (URL)
                    </label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[12px] font-black">/</span>
                      <input 
                        type="text" 
                        value={formData.slug} 
                        onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                        className="admin-form-input pl-12 font-mono text-[12px] text-blue-600 font-black h-16 rounded-3xl" 
                        placeholder="terms-of-service" 
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group pt-12 border-t border-slate-50">
                   <label className="admin-form-label flex items-center gap-3 mb-8">
                      <Layers size={16} className="text-indigo-600" /> Page Content
                   </label>
                   <div className="bg-slate-50/50 rounded-[48px] p-2.5 border-2 border-slate-100 shadow-inner overflow-hidden">
                    <RichTextEditor 
                      value={formData.content} 
                      onChange={(content) => setFormData({ ...formData, content })} 
                      height={650}
                    />
                   </div>
                </div>

                <div className="admin-form-group pt-12 border-t border-slate-50">
                  <label className="admin-form-label text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 mb-6 opacity-60"> <Sparkles size={14} className="text-amber-500" /> Short Summary</label>
                  <div className="bg-slate-50/50 rounded-[40px] p-4 border border-slate-100 shadow-inner group-hover/area:bg-white transition-all duration-700">
                    <textarea 
                      rows={4} 
                      value={formData.excerpt} 
                      onChange={e => setFormData({ ...formData, excerpt: e.target.value })} 
                      className="admin-form-textarea text-[13px] font-bold text-slate-700 leading-relaxed focus:bg-white h-32 px-8 py-6 rounded-[32px] resize-none" 
                      placeholder="A short summary for previews and social sharing..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                <h3 className="admin-form-section-title">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                  SEO Settings
                </h3>
                
                <div className="grid grid-cols-1 gap-12 pt-4">
                   <div className="admin-form-group">
                     <label className="admin-form-label text-blue-600 flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em]">Search Engine Title</label>
                     <input 
                       type="text" 
                       value={formData.seo_title} 
                       onChange={e => setFormData({ ...formData, seo_title: e.target.value })} 
                       className="admin-form-input font-black h-16 px-8 rounded-3xl text-lg tracking-tight" 
                       placeholder="e.g. Terms of Service | Wegomap" 
                     />
                   </div>
                   <div className="admin-form-group pt-12 border-t border-slate-50">
                     <label className="admin-form-label text-blue-600 flex items-center gap-3 mb-6 font-black text-[11px] uppercase tracking-[0.2em]">Search Engine Description</label>
                     <div className="bg-slate-50/50 rounded-[40px] p-4 border border-slate-100 shadow-inner">
                       <textarea 
                         rows={5} 
                         value={formData.seo_description} 
                         onChange={e => setFormData({ ...formData, seo_description: e.target.value })} 
                         className="admin-form-textarea text-[13px] font-bold focus:bg-white h-40 leading-relaxed px-8 py-6 rounded-[32px] resize-none" 
                         placeholder="Description for search engines. This helps people find your page."
                       ></textarea>
                     </div>
                   </div>
                </div>

                <div className="mt-16 bg-slate-900 rounded-[56px] p-16 shadow-2xl relative overflow-hidden group border border-white/5">
                  <div className="absolute top-0 right-0 w-[500px] h-full bg-indigo-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-12">
                       <div className="w-16 h-16 bg-white/5 backdrop-blur-3xl rounded-[24px] flex items-center justify-center text-white font-black border border-white/10 text-2xl shadow-2xl group-hover:bg-indigo-600 transition-all duration-700">G</div>
                       <div className="text-left">
                          <div className="text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-3">Google Preview</div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60">How your page appears in search results.</p>
                       </div>
                    </div>
                    
                    <div className="max-w-3xl bg-white/5 rounded-[40px] p-12 border border-white/5 backdrop-blur-3xl shadow-2xl">
                       <h4 className="text-blue-400 font-bold text-3xl leading-tight mb-4 tracking-tight uppercase">
                         {formData.seo_title || formData.title || 'Page Title | Wegomap'}
                       </h4>
                       <p className="text-emerald-500 font-mono text-[13px] mb-6 flex items-center gap-3 font-black">
                          <Globe size={14} /> https://wegomap.digital/{formData.slug || 'architecture-identifier'}
                       </p>
                       <p className="text-slate-400 text-[15px] font-bold leading-relaxed italic line-clamp-2 max-w-2xl opacity-60">
                         {formData.seo_description || 'If left empty, search engines will use some text from your content.'}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="space-y-12 animate-in slide-in-from-right-12 duration-700">
                 <h3 className="admin-form-section-title">
                  <div className="w-2 h-8 bg-slate-400 rounded-full"></div>
                  Advanced Settings
                </h3>
                <div className="py-24 border-4 border-dashed border-slate-100 rounded-[64px] text-center bg-slate-50/50">
                   <div className="w-24 h-24 bg-white rounded-[40px] border border-slate-100 flex items-center justify-center text-slate-100 mx-auto mb-10 shadow-inner group-hover:scale-110 transition-transform">
                      <Settings size={48} strokeWidth={1} />
                   </div>
                   <div className="space-y-3">
                      <p className="font-black text-slate-300 uppercase tracking-[0.4em] text-[11px] max-w-xs mx-auto italic leading-relaxed">No advanced settings are available for this page.</p>
                      <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest opacity-40">Standard settings only.</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}