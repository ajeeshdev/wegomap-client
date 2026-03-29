"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Info, Map as MapIcon, List, Search, Trash2, Globe, Sparkles, Clock, ShieldCheck, Layers, Tag, IndianRupee, Zap, MapPin, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

export default function CreatePackage() {
   const router = useRouter();

   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState<any[]>([]);
   const [formData, setFormData] = useState<any>({
      title: '', pcode: '', subtitle: '', slabel: '', location: '', description: '',
      price: '', oldamt: '', per: '/ Person', duration: '', highlights: [],
      inclusions: [], exclusions: [], terms: '', category: '',
      images: [], thumb: '', onoffer: false, isBestSeller: false,
      itinerary: [], seo_title: '', slug: '', seo_meta: '', seo_keys: '', canonical: ''
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

   const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoading(true);
      try {
         const res = await fetch(`${API_URL}/packages`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
         });
         const data = await res.json();
         if (data.success) {
            toast.success('Package created successfully!');
            router.push('/admin/packages');
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

   const [activeTab, setActiveTab] = useState('basic');

   const tabs = [
      { id: 'basic', label: 'Basic Info', icon: Layers },
      { id: 'pricing', label: 'Pricing & Strategy', icon: IndianRupee },
      { id: 'itinerary', label: 'Detailed Itinerary', icon: MapIcon },
      { id: 'gallery', label: 'Visual Assets', icon: ImageIcon },
      { id: 'seo', label: 'Search Indexing', icon: Globe },
   ];

   return (
      <div className="property-edit-container animate-in fade-in duration-700">
         <div className="property-edit-header">
            <div className="header-left">
               <button onClick={() => router.push('/admin/packages')} className="back-btn"><ArrowLeft size={18} /></button>
               <div className="title-area">
                  <h1 className="serif">Add New Package</h1>
                  <div className="status-badge">PACKAGE CODE: <span className="active">{formData.pcode || 'PENDING'}</span></div>
               </div>
            </div>
            <div className="header-actions">
               <button onClick={() => handleSubmit()} disabled={loading} className="save-btn"><Safe size={16} /> {loading ? 'Saving...' : 'Save Package'}</button>
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

               <div className="mt-8 pt-8 border-t border-slate-100 px-4 space-y-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Package Code</label>
                     <input type="text" value={formData.pcode} onChange={e => setFormData({ ...formData, pcode: e.target.value.toUpperCase() })} className="admin-form-input !h-10 font-mono text-center uppercase" placeholder="WM-KRL-001" />
                  </div>

                  <div>
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Visibility & Status</label>
                     <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer group">
                           <span className="text-[10px] font-bold text-slate-500">Special Offer</span>
                           <input type="checkbox" checked={formData.onoffer} onChange={e => setFormData({ ...formData, onoffer: e.target.checked })} className="sr-only peer" />
                           <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-all relative"><div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-4.5"></div></div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                           <span className="text-[10px] font-bold text-slate-500">Bestseller</span>
                           <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({ ...formData, isBestSeller: e.target.checked })} className="sr-only peer" />
                           <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-all relative"><div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-4.5"></div></div>
                        </label>
                     </div>
                  </div>

                  <div className="mt-6">
                     <ImageUpload value={formData.thumb} onChange={(url) => setFormData({ ...formData, thumb: url })} label="Primary Thumbnail" />
                  </div>
               </div>
            </div>

            <div className="content-area">
               {activeTab === 'basic' && (
                  <div className="space-y-6">
                     <div className="editor-card">
                        <div className="card-header"><h4 className="serif">Basic Identification</h4></div>
                        <div className="space-y-6">
                           <div className="admin-form-group">
                              <label>Package Title</label>
                              <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Kerala Backwaters Magic" className="text-xl font-bold" />
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div className="admin-form-group"><label>Subtitle</label><input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} /></div>
                              <div className="admin-form-group"><label>Promo Label</label><input type="text" value={formData.slabel} onChange={e => setFormData({ ...formData, slabel: e.target.value })} className="text-emerald-500 font-bold" /></div>
                           </div>
                           <div className="grid grid-cols-3 gap-6">
                              <div className="admin-form-group"><label>Location</label><input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} /></div>
                              <div className="admin-form-group"><label>Duration</label><input type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} /></div>
                              <div className="admin-form-group">
                                 <label>Category</label>
                                 <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="admin-form-select">
                                    <option value="">Select Category</option>
                                    {categories.map((cat: any) => <option key={cat._id} value={cat.title || cat.name}>{cat.title || cat.name}</option>)}
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="editor-card">
                        <div className="card-header"><h4 className="serif">Detailed Overview</h4></div>
                        <textarea rows={6} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Enter package overview..." />
                     </div>
                  </div>
               )}

               {activeTab === 'pricing' && (
                  <div className="space-y-6">
                     <div className="editor-card">
                        <div className="card-header"><h4 className="serif">Pricing Strategy</h4></div>
                        <div className="grid grid-cols-3 gap-6">
                           <div className="admin-form-group"><label>Offer Price (₹)</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="font-black text-blue-600 text-lg" /></div>
                           <div className="admin-form-group"><label>Regular Price (₹)</label><input type="number" value={formData.oldamt} onChange={e => setFormData({ ...formData, oldamt: e.target.value })} className="font-bold text-slate-400 line-through" /></div>
                           <div className="admin-form-group"><label>Price Frequency</label><input type="text" value={formData.per} onChange={e => setFormData({ ...formData, per: e.target.value })} /></div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif text-emerald-600">Inclusions</h4></div>
                           <textarea rows={8} value={formData.inclusions?.join('\n')} onChange={e => setFormData({ ...formData, inclusions: e.target.value.split('\n') })} className="bg-emerald-50/10" placeholder="One per line..." />
                        </div>
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif text-emerald-600">Exclusions</h4></div>
                           <textarea rows={8} value={formData.exclusions?.join('\n')} onChange={e => setFormData({ ...formData, exclusions: e.target.value.split('\n') })} className="bg-rose-50/10" placeholder="One per line..." />
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                     <div className="editor-card">
                        <div className="card-header flex justify-between items-center">
                           <h4 className="serif">Activity Plan</h4>
                           <button type="button" onClick={() => setFormData({ ...formData, itinerary: [...(formData.itinerary || []), { day: (formData.itinerary?.length || 0) + 1, title: '', description: '' }] })} className="px-4 py-2 bg-blue-600 text-white rounded-full text-[10px] font-bold">+ Add Day</button>
                        </div>
                        <div className="space-y-4 py-4">
                           {formData.itinerary?.map((item: any, idx: number) => (
                              <div key={idx} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 relative group">
                                 <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white rounded-xl border flex flex-col items-center justify-center font-bold text-blue-600 shrink-0">
                                       <span className="text-[7px] uppercase opacity-50">Day</span>
                                       <span>{item.day || idx + 1}</span>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                       <input type="text" value={item.title} onChange={e => { const ni = [...formData.itinerary]; ni[idx].title = e.target.value; setFormData({ ...formData, itinerary: ni }); }} placeholder="Title" className="w-full bg-transparent border-b font-bold text-lg" />
                                       <textarea value={item.description} onChange={e => { const ni = [...formData.itinerary]; ni[idx].description = e.target.value; setFormData({ ...formData, itinerary: ni }); }} placeholder="Description" className="w-full bg-transparent border-none p-0 min-h-[60px]" />
                                    </div>
                                    <button type="button" onClick={() => setFormData({ ...formData, itinerary: formData.itinerary.filter((_: any, i: number) => i !== idx) })} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-emerald-500"><Trash2 size={16} /></button>
                                 </div>
                              </div>
                           ))}
                           {(!formData.itinerary || formData.itinerary.length === 0) && (
                              <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl"><p className="text-slate-300 text-xs italic">No itinerary defined.</p></div>
                           )}
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'gallery' && (
                  <div className="editor-card">
                     <div className="card-header"><h4 className="serif">Package Gallery</h4></div>
                     <div className="p-4">
                        <MultiImageUpload value={formData.images} onChange={(urls) => setFormData({ ...formData, images: urls })} label="Upload Gallery Images" />
                     </div>
                  </div>
               )}

               {activeTab === 'seo' && (
                  <div className="space-y-6">
                     <div className="editor-card">
                        <div className="card-header"><h4 className="serif">Indexing Settings</h4></div>
                        <div className="space-y-4">
                           <div className="admin-form-group"><label>Meta Title</label><input type="text" value={formData.seo_title} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} /></div>
                           <div className="admin-form-group"><label>URL Slug</label><input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="font-mono text-blue-600" /></div>
                           <div className="admin-form-group"><label>Meta Description</label><textarea rows={4} value={formData.seo_meta} onChange={e => setFormData({ ...formData, seo_meta: e.target.value })} /></div>
                        </div>
                     </div>

                     <div className="editor-card bg-slate-900 border-slate-800">
                        <div className="card-header border-slate-800"><h4 className="serif text-white">Crawler View</h4></div>
                        <div className="p-8">
                           <div className="max-w-xl">
                              <h4 className="text-orange-400 text-xl font-bold mb-1">{formData.seo_title || formData.title || 'Untitled Package'}</h4>
                              <p className="text-emerald-500 text-xs font-mono mb-2">https://wegomap.digital/packages/{formData.slug || 'url-slug'}</p>
                              <p className="text-slate-400 text-sm italic">{formData.seo_meta || 'No description provided.'}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
