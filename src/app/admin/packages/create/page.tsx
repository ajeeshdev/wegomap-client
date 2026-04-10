"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Save, ArrowLeft, Info, List, Map, Search, Trash2, Globe, 
  Sparkles, Clock, ShieldCheck, Layers, IndianRupee, Zap, 
  MapPin, Shield as Safe, ChevronDown, Check, LayoutPanelTop, 
  Settings, Image as ImageIcon, Plus, X
} from 'lucide-react';

import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import AmenityPicker from '@/components/admin/AmenityPicker';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

export default function CreatePackage() {
   const router = useRouter();

   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState<any[]>([]);
   const [activeTab, setActiveTab] = useState('basic');
   const [catDropdown, setCatDropdown] = useState(false);

   const [formData, setFormData] = useState<any>({
      title: '', pcode: '', subtitle: '', slabel: '', location: '', description: '',
      inclusions: [], exclusions: [], terms: '', highlights: [],
      itinerary: [], seo_title: '', slug: '', seo_meta: '', seo_keys: '', canonical: '',
      averageRating: 4.9, reviewCount: 150, noCostEmi: '',
      amenities: [], categories: [], images: [], thumb: '', thumb_alt: 'wegomap',
      status: 'Published', order: 0
   });

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const res = await fetch(`${API_URL}/categories?type=package`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (data.success) {
               const items = data.data;
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
      fetchCategories();
   }, []);

   const handleSubmit = async () => {
      if (!formData.title) return toast.error('Package title is required');
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

   const tabs = [
      { id: 'basic', label: 'Essential Info', icon: <Info size={16} /> },
      { id: 'content', label: 'Narrative & Terms', icon: <List size={16} /> },
      { id: 'itinerary', label: 'Tour Strategy', icon: <Map size={16} /> },
      { id: 'visuals', label: 'Visual Media', icon: <ImageIcon size={16} /> },
   ];

   return (
      <div className="property-edit-container animate-in fade-in duration-700">
         <div className="property-edit-header">
            <div className="header-left">
               <Link href="/admin/packages" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600">
                  <ArrowLeft size={18} />
               </Link>
               <div>
                  <h2 className="serif text-2xl font-bold leading-tight">New Tour Package</h2>
                  <p className="status-badge">STATUS: <span className="active">{formData.status}</span></p>
               </div>
            </div>
            <button onClick={handleSubmit} disabled={loading} className="save-btn">
               <ShieldCheck size={18} /> {loading ? 'Saving...' : 'Publish Changes'}
            </button>
         </div>

         <div className="property-edit-layout">
            <div className="content-area">
               <div className="tabs-header">
                  {tabs.map(t => (
                     <button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-btn-top ${activeTab === t.id ? 'active' : ''}`}>
                        <div className="icon-wrap">{t.icon}</div>
                        <span>{t.label}</span>
                     </button>
                  ))}
               </div>

               <div className="tab-panel">
                  {activeTab === 'basic' && (
                     <div className="space-y-6">
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Fundamental Identity</h4></div>
                           <div className="card-body">
                              <div className="admin-form-group">
                                 <label>Commercial Title</label>
                                 <input type="text" value={formData.title} onChange={e => {
                                    const v = e.target.value; 
                                    setFormData({ ...formData, title: v, pcode: v.substring(0,3).toUpperCase() + Math.floor(Math.random()*1000) });
                                 }} placeholder="Munnar Luxury Escape..." className="title-input" />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="admin-form-group"><label>Lead Subtitle</label><input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} /></div>
                                 <div className="admin-form-group"><label>Promo Highlight</label><input type="text" value={formData.slabel} onChange={e => setFormData({ ...formData, slabel: e.target.value })} className="promo-input" /></div>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="admin-form-group"><label>Geographic Focus</label><input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} /></div>
                                 <div className="admin-form-group"><label>Temporal Duration</label><input type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 3D / 2N" /></div>
                              </div>
                           </div>
                        </div>

                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Financial Architecture</h4></div>
                           <div className="card-body">
                              <div className="admin-form-grid-3">
                                 <div className="admin-form-group"><label className="regular-price-label">Rack Rate (₹)</label><input type="number" value={formData.oldamt} onChange={e => setFormData({ ...formData, oldamt: e.target.value })} className="regular-price-input" /></div>
                                 <div className="admin-form-group"><label className="offer-price-label">Live Offer (₹)</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="offer-price-input" /></div>
                                 <div className="admin-form-group"><label className="emi-label">Monthly EMI (₹)</label><input type="number" value={formData.noCostEmi} onChange={e => setFormData({ ...formData, noCostEmi: e.target.value })} /></div>
                              </div>
                              <div className="admin-form-grid-2 mt-4">
                                 <div className="admin-form-group"><label className="rating-label">Social Rating</label><input type="number" step="0.1" value={formData.averageRating} onChange={e => setFormData({ ...formData, averageRating: e.target.value })} /></div>
                                 <div className="admin-form-group"><label className="review-label">Verified Reviews</label><input type="number" value={formData.reviewCount} onChange={e => setFormData({ ...formData, reviewCount: e.target.value })} /></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'content' && (
                     <div className="space-y-6">
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Narrative Description</h4></div>
                           <div className="card-body no-padding">
                              <RichTextEditor value={formData.description} onChange={(content) => setFormData({ ...formData, description: content })} height={400} />
                           </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                           <div className="editor-card">
                              <div className="card-header flex-header"><h4 className="serif">Inclusions</h4></div>
                              <div className="card-body no-padding">
                                 <textarea rows={10} value={formData.inclusions?.join('\n')} onChange={e => setFormData({ ...formData, inclusions: e.target.value.split('\n') })} className="inclusion-textarea p-4" placeholder="One per line..." />
                              </div>
                           </div>
                           <div className="editor-card">
                              <div className="card-header flex-header"><h4 className="serif">Exclusions</h4></div>
                              <div className="card-body no-padding">
                                 <textarea rows={10} value={formData.exclusions?.join('\n')} onChange={e => setFormData({ ...formData, exclusions: e.target.value.split('\n') })} className="exclusion-textarea p-4" placeholder="One per line..." />
                              </div>
                           </div>
                        </div>
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Highlights List</h4></div>
                           <div className="card-body no-padding">
                              <textarea rows={6} value={formData.highlights?.join('\n')} onChange={e => setFormData({ ...formData, highlights: e.target.value.split('\n') })} className="highlight-textarea p-4" placeholder="Key selling points, one per line..." />
                           </div>
                        </div>
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Terms & Conditions</h4></div>
                           <div className="card-body no-padding">
                              <RichTextEditor value={formData.terms} onChange={(content) => setFormData({ ...formData, terms: content })} height={300} />
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'itinerary' && (
                     <div className="editor-card">
                        <div className="card-header flex-header">
                           <h4 className="serif">Strategic Itinerary</h4>
                           <button onClick={() => setFormData({ ...formData, itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, title: '', description: '', image: '', amenities: [] }] })} className="add-day-btn">+ Add Tactical Day</button>
                        </div>
                        <div className="card-body">
                           <div className="itinerary-list">
                              {formData.itinerary.map((item: any, idx: number) => (
                                 <div key={idx} className="itinerary-item group">
                                    <button onClick={() => {
                                       const ni = [...formData.itinerary];
                                       ni.splice(idx, 1);
                                       setFormData({ ...formData, itinerary: ni });
                                    }} className="remove-day-btn"><Trash2 size={14} /></button>
                                    
                                    <div className="admin-form-group">
                                       <label>Day {item.day || idx + 1}: Goal Title</label>
                                       <input type="text" value={item.title} onChange={e => {
                                          const ni = [...formData.itinerary];
                                          ni[idx].title = e.target.value;
                                          setFormData({ ...formData, itinerary: ni });
                                       }} className="day-title-input" />
                                    </div>
                                    
                                    <div className="itinerary-footer">
                                       <div className="space-y-4">
                                          <ImageUpload value={item.image} onChange={url => {
                                             const ni = [...formData.itinerary];
                                             ni[idx].image = url;
                                             setFormData({ ...formData, itinerary: ni });
                                          }} label="Day Visual" dimensions="800 x 500" />
                                          <AmenityPicker value={item.amenities || []} onChange={am => {
                                             const ni = [...formData.itinerary];
                                             ni[idx].amenities = am;
                                             setFormData({ ...formData, itinerary: ni });
                                          }} max={4} />
                                       </div>
                                       <div className="admin-form-group">
                                          <label>Operational Details</label>
                                          <RichTextEditor value={item.description} onChange={c => {
                                             const ni = [...formData.itinerary];
                                             ni[idx].description = c;
                                             setFormData({ ...formData, itinerary: ni });
                                          }} height={250} />
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'visuals' && (
                     <div className="space-y-6">
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Primary Showcase</h4></div>
                           <div className="card-body">
                              <ImageUpload value={formData.thumb} onChange={url => setFormData({ ...formData, thumb: url })} label="Package Thumbnail" dimensions="1200 x 800" />
                           </div>
                        </div>
                        <div className="editor-card">
                           <div className="card-header"><h4 className="serif">Gallery Assets</h4></div>
                           <div className="card-body">
                              <MultiImageUpload value={formData.images} onChange={urls => setFormData({ ...formData, images: urls })} label="High-Res Gallery" dimensions="1200 x 800" />
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            <div className="meta-sidebar">
               <div className="meta-card">
                  <div className="card-header"><h4 className="serif">Classification</h4></div>
                  <div className="card-body">
                     <div className={`custom-dropdown ${catDropdown ? 'open' : ''}`}>
                        <div className="dropdown-toggle" onClick={() => setCatDropdown(!catDropdown)}>
                           <div className="selected-count">{formData.categories?.length || 0} Nodes Selected</div>
                           <ChevronDown size={14} className={`chevron ${catDropdown ? 'rotate' : ''}`} />
                        </div>
                        {catDropdown && (
                           <div className="dropdown-list">
                              {categories.map((cat: any) => {
                                 const isSelected = formData.categories?.includes(cat.title || cat.name);
                                 return (
                                    <div key={cat._id} className={`dropdown-item ${isSelected ? 'selected' : ''}`} onClick={() => {
                                       const current = formData.categories || [];
                                       const val = cat.title || cat.name;
                                       if (isSelected) {
                                          setFormData({ ...formData, categories: current.filter((c: string) => c !== val) });
                                       } else {
                                          setFormData({ ...formData, categories: [...current, val] });
                                       }
                                    }}>
                                       <div className="item-content">
                                          {cat.depth > 0 && <span className="indent">{"— ".repeat(cat.depth)}</span>}
                                          <span className="label">{cat.title || cat.name}</span>
                                       </div>
                                       {isSelected && <Check size={12} className="check-icon" />}
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                     <p className="help-text mt-2">Tag this package to relevant discovery nodes.</p>
                  </div>
               </div>

               <div className="meta-card">
                  <div className="card-header"><h4 className="serif">Publishing Audit</h4></div>
                  <div className="card-body space-y-4">
                     <div className="meta-item">
                        <label>Protocol Code</label>
                        <input type="text" value={formData.pcode} onChange={e => setFormData({ ...formData, pcode: e.target.value.toUpperCase() })} className="slug-input" />
                     </div>
                     <div className="meta-item">
                        <div className="toggle-row">
                           <label>Visibility Protocol</label>
                           <input type="checkbox" checked={formData.status === 'Published'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Published' : 'Draft' })} className="sr-only peer" />
                           <div className="toggle-switch"></div>
                        </div>
                     </div>
                     <div className="meta-item">
                        <label>Display Priority</label>
                        <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
                     </div>
                  </div>
               </div>

               <div className="meta-card dark-card">
                  <div className="card-header"><h4 className="serif">Crawler Intelligence</h4></div>
                  <div className="crawler-preview">
                     <div className="preview-title">{formData.title || 'Draft Blueprint'}</div>
                     <div className="preview-url">wegomap.com/packages/{formData.pcode?.toLowerCase()}</div>
                     <div className="preview-desc">{formData.description?.replace(/<[^>]*>/g, '').substring(0, 160)}...</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
