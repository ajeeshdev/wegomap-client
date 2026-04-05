"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, LayoutGrid, Type, Globe, Info, Clock, Sparkles, Zap, ShieldCheck, Layers } from 'lucide-react';
import { toast } from 'react-hot-toast';


export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    parent: '',
    description: '',
    status: 'Active',
    order: 0,
    packages: [] as string[],
    bannerImage: '',
    subtitle: '',
    contentTitle: '',
    contentDesc: ''
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`${API_URL}/categories/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title || data.data.name || '',
            slug: data.data.slug || '',
            description: data.data.description || '',
            status: data.data.status || 'Active',
            parent: data.data.parent || '',
            order: data.data.order || 0,
            packages: data.data.packages || [],
            bannerImage: data.data.bannerImage || '',
            subtitle: data.data.subtitle || '',
            contentTitle: data.data.contentTitle || '',
            contentDesc: data.data.contentDesc || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        if (data.success) {
          const items = data.data.filter((c: any) => c._id !== id);
          const map: Record<string, any> = {};
          items.forEach((item: any) => { map[item._id] = { ...item, children: [] }; });
          const roots: any[] = [];
          items.forEach((item: any) => {
            if (item.parent && map[item.parent]) {
              map[item.parent].children.push(map[item._id]);
            } else {
              roots.push(map[item._id]);
            }
          });
          const flattened: any[] = [];
          const traverse = (nodes: any[], depth = 0) => {
            nodes.sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(node => {
              flattened.push({ ...node, depth });
              traverse(node.children, depth + 1);
            });
          };
          traverse(roots);
          setCategories(flattened);
        }
      } catch (err) { console.error('Failed to fetch categories', err); }
    };
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const data = await res.json();
        if (data.success) {
          setPackages(data.data);
        }
      } catch (err) { console.error('Failed to fetch packages', err); }
    };

    if (id) {
      fetchCategory();
      fetchCategories();
      fetchPackages();
    }
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Category updated successfully');
        router.push('/admin/categories');
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
    <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-blue-600/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/categories')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-sm">
              <div className="admin-page-title-indicator"></div>
              Edit Category
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Category: <span className="text-slate-900 font-black truncate max-w-[240px] italic">"{formData.title}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/categories')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--orange"></div>
                Category Details
              </h3>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <Type size={14} className="text-blue-600" /> Category Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                    placeholder="ENTER LABEL..." 
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                    <Globe size={14} className="text-sky-500" /> Link (URL) (Slug)
                  </label>
                  <div className="relative group/routing">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[11px] tracking-widest z-10">/</span>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                      className="admin-form-input pl-10 font-black h-16 px-8 rounded-3xl text-blue-600 bg-slate-50 border-slate-100 group-hover/routing:bg-white transition-all uppercase tracking-widest" 
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-100">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Info size={18} className="text-amber-500" /> Description / Content
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="admin-form-group">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3 block">Subtitle</label>
                    <input 
                      type="text" 
                      value={formData.subtitle} 
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      className="admin-form-input h-14"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3 block">Banner Image URL</label>
                    <input 
                      type="text" 
                      value={formData.bannerImage} 
                      onChange={e => setFormData({ ...formData, bannerImage: e.target.value })}
                      className="admin-form-input h-14"
                    />
                  </div>
                </div>

                <div className="admin-form-group mb-8">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3 block">Read More Heading</label>
                  <input 
                    type="text" 
                    value={formData.contentTitle} 
                    onChange={e => setFormData({ ...formData, contentTitle: e.target.value })}
                    className="admin-form-input h-14"
                  />
                </div>

                <div className="bg-slate-50 rounded-[48px] p-3 border-2 border-slate-100 shadow-inner overflow-hidden transition-all focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-blue-600/10 focus-within:border-orange-200">
                  <textarea 
                    rows={6} 
                    value={formData.contentDesc} 
                    onChange={e => setFormData({ ...formData, contentDesc: e.target.value })} 
                    className="admin-form-textarea !bg-transparent border-none font-bold text-slate-700 leading-relaxed h-[200px] px-8 py-6 text-lg scrollbar-hidden caret-blue-600" 
                    placeholder="Extended content (HTML supported)..."
                  ></textarea>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-100">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Layers size={18} className="text-blue-600" /> Assign Packages
                </label>
                <div className="admin-form-group">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4 px-2">Select packages to display on this category page:</p>
                  <select 
                    multiple
                    value={formData.packages}
                    onChange={e => {
                      const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
                      setFormData({ ...formData, packages: values });
                    }}
                    className="admin-form-select h-64 font-bold text-slate-700 p-4 rounded-[32px] border-2 border-slate-100 bg-slate-50 focus:bg-white transition-all shadow-inner"
                  >
                    {packages.sort((a, b) => a.title.localeCompare(b.title)).map(pkg => (
                      <option key={pkg._id} value={pkg._id} className="py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors">
                        {pkg.title} ({pkg.location})
                      </option>
                    ))}
                  </select>
                  <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Hold CMD/CTRL to select multiple packages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
             <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              Settings
            </h4>
            
            <div className="space-y-10">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-6 opacity-60">Parent Category</label>
                <select 
                  value={formData.parent} 
                  onChange={e => setFormData({ ...formData, parent: e.target.value })}
                  className="admin-form-input font-black bg-white border-slate-100 rounded-2xl h-14 uppercase text-[11px] tracking-widest cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-12 focus:ring-blue-600/5 px-6"
                >
                  <option value="">None (Top Level)</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.depth > 0 ? "— ".repeat(cat.depth) : ""}{cat.title || cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-6 opacity-60">Display Order</label>
                <input 
                  type="number"
                  value={formData.order} 
                  onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="admin-form-input font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-sm px-6 text-center" 
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-6 opacity-60">Publication Status</label>
                <div className="relative group/status">
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="admin-form-input font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[11px] tracking-widest cursor-pointer group-hover/status:bg-white transition-all shadow-sm focus:ring-12 focus:ring-blue-600/5 appearance-none px-6"
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/status:text-emerald-500 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                </div>
              </div>
              
               <div className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-5 bg-slate-50/50 p-6 rounded-[32px] border-2 border-slate-100 overflow-hidden group/id transition-all hover:bg-white hover:shadow-xl hover:border-orange-100">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0 group-hover/id:bg-blue-600 group-hover/id:text-white transition-all duration-700 shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1.5">ID</div>
                    <div className="text-[10px] font-bold text-slate-800 font-mono uppercase truncate opacity-80 leading-none">#{String(id).toUpperCase().slice(-12)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-orange-950/20 mt-6 text-center">
             <div className="absolute top-0 right-0 w-56 h-56 bg-blue-600/10 rounded-bl-full blur-[70px]"></div>
             <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-4 h-full">
               <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-700 shadow-2xl transform group-hover:scale-125 group-hover:-rotate-12">
                 <Layers size={40} className="animate-pulse" />
               </div>
               <div className="admin-space-y-4">
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-4 leading-none opacity-60">Preview</div>
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 leading-relaxed italic opacity-80 min-h-[3rem] line-clamp-2">
                    {formData.title || 'Classification Index'}
                 </p>
                 <div className="flex items-center justify-center gap-4 mt-8 border-t border-white/10 pt-8">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono">/{formData.slug || 'null_routing'}</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}