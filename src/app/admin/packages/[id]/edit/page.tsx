"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Info, Map, List, Search, Trash2, Globe, Sparkles, Clock, ShieldCheck, Layers, Tag, IndianRupee, Zap, MapPin, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import RichTextEditor from '@/components/admin/Editor';
import AmenityPicker from '@/components/admin/AmenityPicker';
import { toast } from 'react-hot-toast';

export default function EditPackage() {
  const router = useRouter();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    title: '', pcode: '', subtitle: '', slabel: '', location: '', description: '',
    price: '', oldamt: '', duration: '', highlights: [],
    inclusions: [], exclusions: [], terms: '', category: '',
    images: [], thumb: '', thumb_alt: '', onoffer: false, isBestSeller: false,
    itinerary: [], seo_title: '', slug: '', seo_meta: '', seo_keys: '', canonical: '',
    averageRating: 4.9, reviewCount: 150, noCostEmi: '',
    amenities: [{ icon: 'Building2', label: 'Luxury Stays', color: 'blue' }, { icon: 'Utensils', label: 'Fine Dining', color: 'rose' }, { icon: 'Car', label: 'Private Hub', color: 'emerald' }],
    status: 'Published', order: 0
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        if (data.success) {
          const seen: Record<string, boolean> = {};
          const unique = data.data.filter((item: any) => {
            const key = (item.title || item.name || '').toLowerCase();
            if (seen[key]) return false;
            seen[key] = true;
            return true;
          });
          setCategories(unique);
        }
      } catch (err) { console.error('Failed to fetch categories', err); }
    };
    fetchCategories();
  }, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch(`${API_URL}/packages/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            ...data.data,
            inclusions: data.data.inclusions || [],
            exclusions: data.data.exclusions || [],
            images: data.data.images || [],
            thumb_alt: data.data.thumb_alt || 'wegomap',
            itinerary: (data.data.itinerary || []).map((item: any, idx: number) => {
              const dayNum = typeof item.day === 'number' ? item.day : (parseInt(String(item.day)) || idx + 1);
              const autoTitle = typeof item.day === 'string' && item.day.includes(':') ? item.day.split(':').slice(1).join(':').trim() : (typeof item.day === 'string' ? item.day : '');
              return {
                ...item,
                day: dayNum,
                title: item.title || autoTitle,
                description: item.description || item.activity || '',
                image: item.image || item.img || ''
              };
            }),
            noCostEmi: data.data.noCostEmi || '',
            averageRating: data.data.averageRating || 4.9,
            reviewCount: data.data.reviewCount || 150,
            amenities: data.data.amenities?.length > 0 ? data.data.amenities : [
              { icon: 'Building2', label: 'Luxury Stays', color: 'blue' },
              { icon: 'Utensils', label: 'Fine Dining', color: 'rose' },
              { icon: 'Car', label: 'Private Hub', color: 'emerald' }
            ],
            status: data.data.status || 'Published',
            order: data.data.order || 0
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPackage();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const formDataToSubmit = { ...formData };
      delete formDataToSubmit._id;
      delete formDataToSubmit.__v;
      delete formDataToSubmit.createdAt;

      const res = await fetch(`${API_URL}/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formDataToSubmit)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Package updated successfully!');
        router.push('/admin/packages');
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
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Retrieving package node...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/packages')} className="admin-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-md">
              <div className="admin-page-title-indicator"></div>
              Edit Package
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
              Package: <span className="text-slate-900 font-bold">{formData.title || 'Untitled'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/packages')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button
            onClick={() => handleSubmit()}
            disabled={saving}
            className="admin-btn admin-btn-primary h-11"
          >
            <Safe size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area (Central) */}
        <div className="space-y-8">

          {/* Basic Details Section */}
          <div className="admin-form-card space-y-12">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-blue-600"></div>
              Basic Details
            </h3>

            <div className="admin-form-grid-4 pt-4">
              <div className="admin-form-group md:col-span-4">
                <label className="admin-form-label flex items-center gap-2"> <Layers size={12} className="text-blue-600" /> Package Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="admin-form-input text-lg font-bold h-12" placeholder="e.g. Kerala Backwaters Magic" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Subtitle / Tagline</label>
                <input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="admin-form-input" placeholder="e.g. Venice of the East" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2"> <Zap size={12} className="text-emerald-500" /> Offer Label</label>
                <input type="text" value={formData.slabel} onChange={e => setFormData({ ...formData, slabel: e.target.value })} className="admin-form-input font-black text-emerald-500 uppercase tracking-widest placeholder:text-rose-200" placeholder="e.g. 20% OFF" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2"> <MapPin size={12} className="text-emerald-500" /> Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="admin-form-input font-bold" placeholder="e.g. Alleppey, Kerala" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2"> <Clock size={12} className="text-sky-500" /> Duration</label>
                <input type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="admin-form-input font-bold" placeholder="e.g. 3 Days / 2 Nights" />
              </div>
            </div>
          </div>

          {/* Pricing & Content Section */}
          <div className="admin-form-card space-y-12">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-emerald-500"></div>
              Pricing & Description
            </h3>
            <div className="admin-form-grid-5 pt-4">
              <div className="admin-form-group">
                <label className="admin-form-label text-slate-400">Regular Price (₹)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold">₹</div>
                  <input type="number" value={formData.oldamt} onChange={e => setFormData({ ...formData, oldamt: e.target.value })} className="admin-form-input pl-12 h-12 font-bold text-slate-400 line-through" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-blue-600">Offer Price (₹)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</div>
                  <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="admin-form-input pl-12 h-12 font-black text-slate-900 text-lg" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-orange-600">EMI (₹)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300 font-bold">₹</div>
                  <input type="number" value={formData.noCostEmi} onChange={e => setFormData({ ...formData, noCostEmi: e.target.value })} className="admin-form-input pl-12 h-12 font-bold text-slate-900" placeholder="e.g. 1999" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-yellow-600">Rating (0-5)</label>
                <input type="number" step="0.1" value={formData.averageRating} onChange={e => setFormData({ ...formData, averageRating: e.target.value })} className="admin-form-input font-bold" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-slate-500">Reviews</label>
                <input type="number" value={formData.reviewCount} onChange={e => setFormData({ ...formData, reviewCount: e.target.value })} className="admin-form-input font-bold" />
              </div>
            </div>

            <div className="admin-form-group pt-4 border-t border-slate-50">
              <label className="admin-form-label mb-4 block">Description</label>
              <div className="bg-slate-50/50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                <RichTextEditor value={formData.description} onChange={(content) => setFormData({ ...formData, description: content })} height={300} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
              <div className="admin-form-group">
                <label className="admin-form-label text-emerald-600 flex items-center gap-2"> <Sparkles size={12} /> Package Inclusions</label>
                <div className="bg-emerald-50/10 rounded-2xl p-2 border border-emerald-100/50 shadow-inner">
                  <textarea rows={6} value={formData.inclusions?.join('\n')} onChange={e => setFormData({ ...formData, inclusions: e.target.value.split('\n') })} className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 h-40" placeholder="e.g. Luxury Breakfast included..."></textarea>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-emerald-600 flex items-center gap-2"> <Trash2 size={12} /> Package Exclusions</label>
                <div className="bg-rose-50/10 rounded-2xl p-2 border border-rose-100/50 shadow-inner">
                  <textarea rows={6} value={formData.exclusions?.join('\n')} onChange={e => setFormData({ ...formData, exclusions: e.target.value.split('\n') })} className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 h-40" placeholder="e.g. Personal expenses..."></textarea>
                </div>
              </div>
            </div>

            <div className="admin-form-group pt-4 border-t border-slate-50">
              <label className="admin-form-label text-sky-600 flex items-center gap-2 mb-4"> <MapPin size={12} /> Tour Highlights</label>
              <div className="bg-sky-50/10 rounded-2xl p-4 border border-sky-100/50 shadow-inner">
                <textarea 
                  rows={4} 
                  value={formData.highlights?.join('\n')} 
                  onChange={e => setFormData({ ...formData, highlights: e.target.value.split('\n') })} 
                  className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 h-32" 
                  placeholder="Enter each highlight on a new line..."
                ></textarea>
                <p className="mt-2 text-[10px] text-slate-400 italic">Enter one highlight per line. These will appear with checkmarks on the package page.</p>
              </div>
            </div>

            <div className="admin-form-group pt-4 border-t border-slate-50">
              <label className="admin-form-label flex items-center gap-2 mb-2"> <ShieldCheck size={12} className="text-blue-600" /> Terms & Conditions</label>
              <div className="bg-slate-50/50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                <RichTextEditor value={formData.terms} onChange={(content) => setFormData({ ...formData, terms: content })} height={250} />
              </div>
            </div>
          </div>

          {/* Gallery Assets Section */}
          <div className="admin-form-card space-y-12">
            <h3 className="admin-form-section-title">
              <div className="admin-page-title-indicator bg-blue-600"></div>
              Gallery Assets
            </h3>
            <div className="pt-4">
                <MultiImageUpload
                  value={formData.images}
                  onChange={(urls) => setFormData({ ...formData, images: urls })}
                  label="Gallery Assets"
                  dimensions="1200 x 800"
                />
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="admin-form-card space-y-12">
            <div className="flex justify-between items-center border-b border-slate-50 pb-6 mb-2">
              <h3 className="admin-form-section-title border-none pb-0 mb-0">
                <div className="admin-page-title-indicator bg-blue-600"></div>
                Itinerary / Tour Plan
              </h3>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, itinerary: [...(formData.itinerary || []), { day: (formData.itinerary?.length || 0) + 1, title: '', description: '', image: null }] })}
                className="admin-btn admin-btn-primary h-10 px-6 text-[10px]"
              >
                + Add Day
              </button>
            </div>
            <div className="space-y-8 pt-4">
              {formData.itinerary?.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50/30 p-8 rounded-3xl border border-slate-100 relative group transition-all duration-300 hover:bg-white hover:shadow-sm">
                  <div className="absolute -left-4 top-8 w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col items-center justify-center font-bold text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                    <span className="text-[7px] uppercase opacity-50 mb-0.5">Day</span>
                    <span className="text-xl leading-none">{item.day || idx + 1}</span>
                  </div>
                  <div className="pl-12 space-y-6">
                    <div className="admin-form-group">
                      <label className="admin-form-label text-[10px] uppercase tracking-widest text-slate-400">Activity Title</label>
                      <input type="text" value={item.title} onChange={e => {
                        setFormData((prev: any) => {
                          const newItin = [...prev.itinerary];
                          newItin[idx] = { ...newItin[idx], title: e.target.value };
                          return { ...prev, itinerary: newItin };
                        });
                      }} className="w-full bg-transparent border-b border-slate-100 py-3 focus:border-blue-600 outline-none font-bold text-xl text-slate-900 transition-all" placeholder="e.g. Arrival at Cochin" />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label text-[10px] uppercase tracking-widest text-slate-400">Activity Description</label>
                      <div className="mt-2 bg-white rounded-xl border border-slate-100 p-1">
                        <RichTextEditor value={item.description} onChange={(content) => {
                          setFormData((prev: any) => {
                            const newItin = [...prev.itinerary];
                            newItin[idx] = { ...newItin[idx], description: content };
                            return { ...prev, itinerary: newItin };
                          });
                        }} height={400} />
                      </div>
                    </div>
                    <div className="admin-form-group">
                       <label className="admin-form-label text-[10px] uppercase tracking-widest text-slate-400">Day Thumbnail / Image</label>
                       <div className="mt-2 max-w-xs">
                          <ImageUpload
                             value={item.image}
                             onChange={(url) => {
                                setFormData((prev: any) => {
                                  const newItin = [...prev.itinerary];
                                  newItin[idx] = { ...newItin[idx], image: url };
                                  return { ...prev, itinerary: newItin };
                                });
                             }}
                             label=""
                             dimensions="800 x 500"
                          />
                       </div>
                    </div>
                    <div className="admin-form-group">
                       <label className="admin-form-label text-[10px] uppercase tracking-widest text-slate-400">Day Specific Highlights / Icons</label>
                       <div className="mt-4">
                          <AmenityPicker
                             value={item.amenities || []}
                             onChange={(am) => {
                                setFormData((prev: any) => {
                                   const ni = [...prev.itinerary];
                                   ni[idx] = { ...ni[idx], amenities: am };
                                   return { ...prev, itinerary: ni };
                                });
                             }}
                             max={4}
                          />
                       </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, itinerary: formData.itinerary.filter((_: any, i: number) => i !== idx) })}
                    className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 hover:border-rose-200 shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {(!formData.itinerary || formData.itinerary.length === 0) && (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
                  <div className="admin-icon-box bg-white mx-auto mb-4 border border-slate-100 w-16 h-16 rounded-2xl shadow-sm">
                    <Map size={32} className="text-slate-200" />
                  </div>
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-[10px] italic">No itinerary defined yet</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar Navigation & Meta (Right Side) */}
        <div className="admin-form-sidebar">

          <div className="admin-form-card p-6 space-y-8">
            {/* Main Thumbnail */}
            <div className="group/media">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
                <div className="w-1 h-3 bg-blue-600 rounded-full shadow-blue-glow"></div>
                Primary Thumbnail
              </h4>
              <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                <ImageUpload
                  value={formData.thumb}
                  onChange={(url) => setFormData({ ...formData, thumb: url })}
                  altValue={formData.thumb_alt}
                  onAltChange={(alt) => setFormData({ ...formData, thumb_alt: alt })}
                  label=""
                  dimensions="1200 x 800"
                />
              </div>
            </div>

            {/* Package Details */}
            <div className="pt-8 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
                <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                Package Identity
              </h4>
              <div className="space-y-5">
                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold"> <Tag size={10} className="text-blue-600" /> Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="admin-form-select font-bold text-slate-900 h-10 text-xs bg-white pl-4"
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
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold"> <Tag size={10} className="text-sky-500" /> Package Code</label>
                  <input
                    type="text"
                    value={formData.pcode}
                    onChange={e => setFormData({ ...formData, pcode: e.target.value.toUpperCase() })}
                    className="admin-form-input font-mono font-bold text-blue-600 h-10 text-xs uppercase"
                    placeholder="WM-KRL-001"
                  />
                </div>
              </div>
            </div>

            {/* Status box */}
            <div className="pt-10 border-t border-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
                <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                Publication
              </h4>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group/stat p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors leading-none">Active Status</span>
                  </div>
                  <input type="checkbox" checked={formData.status === 'Published'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Published' : 'Draft' })} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-all relative">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-4.5 shadow-sm"></div>
                  </div>
                </label>

                <div className="px-3">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Display Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="admin-form-input !h-9 font-bold text-center" placeholder="0" />
                </div>

                <div className="h-4"></div>

                <label className="flex items-center justify-between cursor-pointer group/stat p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors leading-none">Special Offer</span>
                  </div>
                  <input type="checkbox" checked={formData.onoffer} onChange={e => setFormData({ ...formData, onoffer: e.target.checked })} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-all relative">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-4.5 shadow-sm"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group/stat p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors leading-none">Bestseller</span>
                  </div>
                  <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({ ...formData, isBestSeller: e.target.checked })} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-all relative">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-4.5 shadow-sm"></div>
                  </div>
                </label>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-orange-100/50 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">Sync System</div>
                    <div className="admin-status-badge admin-status-badge-success bg-white mt-1">Ready</div>
                  </div>
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
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold"> <Search size={10} className="text-emerald-500" /> SEO Title</label>
                  <input type="text" value={formData.seo_title} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} className="admin-form-input font-bold text-slate-900 h-10 text-[11px]" placeholder="Target keyword tag..." />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold"> <Globe size={10} className="text-blue-600" /> URL Slug</label>
                  <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="admin-form-input font-bold text-slate-900 h-10 text-[11px]" placeholder="e.g. kerala-backwaters-magic" />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label text-[10px] flex items-center gap-2 text-slate-500 font-bold"> <Layers size={10} className="text-blue-600" /> SEO Description</label>
                  <textarea rows={3} value={formData.seo_meta} onChange={e => setFormData({ ...formData, seo_meta: e.target.value })} className="admin-form-textarea text-[11px] font-bold text-slate-700 leading-relaxed min-h-[80px] py-2" placeholder="Brief summary for indexing..."></textarea>
                </div>
              </div>

              {/* Google Preview (Simplified for Sidebar) */}
              <div className="mt-8 bg-slate-900 rounded-3xl p-6 border border-white/5 overflow-hidden group/google">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Crawler View</div>
                </div>
                <h5 className="text-orange-400 font-bold text-sm leading-snug mb-2 line-clamp-2">
                  {formData.seo_title || formData.title || 'Untitled Package'}
                </h5>
                <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2">
                  {formData.seo_meta || 'No description provided...'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
