"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, FileText, Globe, Search, Plus, Sparkles, Clock, ExternalLink } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';

export default function EditPage() {
 const router = useRouter();
 const { id } = useParams();
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
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);

 useEffect(() => {
 async function fetchPage() {
 try {
 const res = await fetch(`${API_URL}/pages/${id}`);
 const data = await res.json();
 if (data.success) {
 setFormData({
 title: data.data.title || '',
 slug: data.data.slug || data.data.key || '',
 content: data.data.content || '',
 excerpt: data.data.excerpt || '',
 seo_title: data.data.seo_title || '',
 seo_description: data.data.seo_description || '',
 isStatic: data.data.isStatic !== undefined ? data.data.isStatic : true,
 status: data.data.status || 'Published'
 });
 }
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 }
 if (id) fetchPage();
 }, [id]);

 const handleSubmit = async (e?: React.FormEvent) => {
 if (e) e.preventDefault();
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
 const data = await res.json();
 if (data.success) {
 router.push('/admin/pages');
 } else {
 alert(data.error || 'Update failed');
 }
 } catch (err) {
 console.error(err);
 alert('Request failed');
 } finally {
 setSaving(false);
 }
 };

 if (loading) return (
 <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
 <p className="font-semibold text-slate-400 uppercase tracking-wider text-xs italic">Loading page content...</p>
 </div>
 );

 const tabs = [
 { id: 'content', label: 'Page Content', icon: FileText },
 { id: 'seo', label: 'SEO Config', icon: Search },
 ];

 return (
 <div className="space-y-8 animate-in fade-in duration-700">
 {/* Header Section */}
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-4">
 <button onClick={() => router.push('/admin/pages')} className="admin-back-btn">
 <ArrowLeft size={20} />
 </button>
 <div>
 <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">Modify Page</h2>
 <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Editing: {formData.title}</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <button onClick={() => router.push('/admin/pages')} className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-all uppercase text-xs tracking-wider">
 Cancel
 </button>
 <button 
 onClick={() => handleSubmit()} 
 disabled={saving}
 className="bg-blue-600 hover:bg-black text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-95 uppercase text-xs tracking-wider italic"
 >
 <Save size={18} /> {saving ? 'Syncing...' : 'Update Page'}
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
 {/* Tabs Sidebar */}
 <div className="lg:col-span-1 space-y-3">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all text-left group ${
 activeTab === tab.id
 ? 'bg-white shadow-xl shadow-slate-200/50 text-blue-600 border-r-4 border-r-blue-600'
 : 'text-slate-400 hover:text-slate-500 hover:bg-white/50'
 }`}
 >
 <Icon size={20} className={activeTab === tab.id ? 'text-blue-600' : 'group-hover:text-slate-500 transition-colors'} />
 <span className="uppercase tracking-wider text-xs">{tab.label}</span>
 </button>
 );
 })}

 <div className="pt-8 px-6">
 <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
 <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
 <Clock size={12} /> Registry
 </h4>
 <div className="admin-space-y-4">
 <div className="space-y-2">
 <label className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Publication Status</label>
 <select 
 value={formData.status} 
 onChange={e => setFormData({ ...formData, status: e.target.value })}
 className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none cursor-pointer"
 >
 <option className="bg-slate-900" value="Published">PUBLISHED</option>
 <option className="bg-slate-900" value="Draft">DRAFT / HIDDEN</option>
 </select>
 </div>
 <label className="flex items-center gap-3 cursor-pointer group/stat">
 <input 
 type="checkbox" 
 checked={formData.isStatic} 
 onChange={e => setFormData({ ...formData, isStatic: e.target.checked })} 
 className="sr-only peer" 
 />
 <div className="w-8 h-5 bg-white/10 rounded-full peer-checked:bg-emerald-500 transition-all relative">
 <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:left-4"></div>
 </div>
 <span className="text-[9px] font-semibold uppercase text-slate-400 group-hover/stat:text-white transition-colors">Internal Route</span>
 </label>
 </div>
 </div>
 </div>
 </div>

 {/* Main Content Area */}
 <div className="lg:col-span-3">
 <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/40 border border-slate-100 p-10 relative">
 {activeTab === 'content' && (
 <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Page Identity</label>
 <input 
 type="text" 
 value={formData.title} 
 onChange={e => setFormData({ ...formData, title: e.target.value })} 
 className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-slate-800 outline-none" 
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1 flex items-center justify-between">
 <span>Canonical Slug</span>
 <a href={`/${formData.slug}`} target="_blank" className="text-blue-600 hover:text-orange-700 flex items-center gap-1 normal-case tracking-normal font-bold">
 View Live <ExternalLink size={10} />
 </a>
 </label>
 <div className="relative">
 <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xs">/</span>
 <input 
 type="text" 
 value={formData.slug} 
 onChange={e => setFormData({ ...formData, slug: e.target.value })} 
 className="w-full pl-10 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-mono text-xs text-slate-500 outline-none" 
 />
 </div>
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Content Composition</label>
 <RichTextEditor 
 value={formData.content} 
 onChange={(content) => setFormData({ ...formData, content })} 
 height={600}
 />
 </div>

 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Meta Excerpt</label>
 <textarea 
 rows={3} 
 value={formData.excerpt} 
 onChange={e => setFormData({ ...formData, excerpt: e.target.value })} 
 className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-medium text-slate-800 outline-none" 
 ></textarea>
 </div>
 </div>
 )}

 {activeTab === 'seo' && (
 <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
 <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-100 pb-5 flex items-center gap-3">
 <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
 Global Search Indexing
 </h3>
 <div className="space-y-6">
 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-blue-600 ml-1">Custom Meta Title</label>
 <input 
 type="text" 
 value={formData.seo_title} 
 onChange={e => setFormData({ ...formData, seo_title: e.target.value })} 
 className="w-full px-6 py-4 rounded-2xl border border-orange-100 bg-orange-50/10 focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-bold text-slate-800 outline-none" 
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-semibold uppercase tracking-wider text-blue-600 ml-1">Meta Description Mapping</label>
 <textarea 
 rows={5} 
 value={formData.seo_description} 
 onChange={e => setFormData({ ...formData, seo_description: e.target.value })} 
 className="w-full px-6 py-4 rounded-2xl border border-orange-100 bg-orange-50/10 focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-medium text-slate-800 outline-none" 
 ></textarea>
 </div>
 </div>

 <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl mt-12 relative overflow-hidden group border border-white/5">
 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full blur-2xl"></div>
 <div className="flex items-center gap-3 mb-6">
 <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-xs text-white font-semibold">G</div>
 <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Search Engine Result Preview</p>
 </div>
 <h4 className="text-orange-400 font-bold text-xl leading-tight mb-2">
 {formData.seo_title || formData.title || 'Untitled Page | WEGOMAP'}
 </h4>
 <p className="text-emerald-500 text-xs mb-4 font-medium opacity-80 uppercase tracking-wider">
 https://wegomap.com/{formData.slug || id}
 </p>
 <p className="text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed italic">
 {formData.seo_description || 'Live metadata is being generated by the system using page content if not explicitly defined here.'}
 </p>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
}
