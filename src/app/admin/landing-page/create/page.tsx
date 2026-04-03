"use client";
import { getImageUrl } from "@/config";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, FileText, Globe, Search, Plus, Sparkles, Settings, ShieldCheck, Clock, Layers, Package, Trash2, Eye } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

export default function CreateLandingPage({ params: paramsProp }: { params?: { id: string } }) {
  const router = useRouter();
  const paramsFromRoute = useParams();
  const pageId = (paramsFromRoute?.id ?? paramsProp?.id) as string | undefined;
  const isEdit = !!pageId;
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [pkgSearch, setPkgSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'Published',
    type: 'landing',
    isCampaign: true,

    // SEO
    seo_title: '',
    seo_description: '',

    // Content Sections
    banner_title: '',
    banner_amount: '',
    banner_old_amount: '',
    banner_description: '',
    banner_image: '',

    about_title: '',
    about_description: '',
    about_image: '',

    end_title: '',
    end_description: '',
    end_image: '',

    hero_badge_1: '',
    hero_badge_2: '',
    hero_starting_label: '',
    hero_per_person: '',
    hero_cta_button: '',
    hero_cta_note: '',
    instant_kicker: '',
    instant_title: '',
    instant_feature_1: '',
    instant_feature_2: '',
    instant_feature_3: '',
    instant_button: '',
    packages_heading: '',
    packages_lead: '',
    packages_quote_button: '',
    packages_card_cta: '',
    packages_details_link: '',
    packages_empty_text: '',
    testimonials_kicker: '',
    testimonials_title: '',
    testimonials_verified_label: '',
    why_kicker: '',
    why_title: '',
    cta_kicker: '',
    great_places_heading: '',
    cta_title: '',
    cta_lead: '',
    cta_button_label: '',
    cta_call_label: '',
    cta_phone: '',
    cta_email: '',
    faq_kicker: '',
    faq_title: '',
    faq_read_more: '',

    package_ids: [] as string[]
  });

  useEffect(() => {
    fetchPackages();
    if (pageId) fetchData();
  }, [pageId]);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`);
      const json = await res.json();
      if (json.success) setAllPackages(json.data);
    } catch (err) { console.error(err); }
  };

  const fetchData = async () => {
    if (!pageId) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/pages/${pageId}`);
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const packageIds = Array.isArray(d.package_ids)
          ? d.package_ids.map((p: any) => (typeof p === 'object' && p && p._id) ? p._id : String(p))
          : [];
        setFormData(prev => ({
          ...prev,
          ...d,
          package_ids: packageIds
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load page data");
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!formData.title) return toast.error("Title is required");
    setLoading(true);
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${API_URL}/pages/${pageId}` : `${API_URL}/pages`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? "Page updated!" : "Page created!");
        router.push('/admin/landing-page');
      } else {
        toast.error(data.error || "Execution failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Content & Details', icon: FileText },
    { id: 'package', label: 'Package', icon: Package },
  ];

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <button onClick={() => router.push('/admin/landing-page')} className="back-btn"><ArrowLeft size={18} /></button>
           <div className="title-area">
              <h1 className="serif">{isEdit ? 'Update Landing Page' : 'New Campaign'}</h1>
              <div className="status-badge">STATUS: <span className="active">{formData.status.toUpperCase()}</span></div>
           </div>
        </div>
        <div className="header-actions">
           <button onClick={handleSubmit} disabled={loading} className="save-btn"><ShieldCheck size={16} /> {loading ? 'Saving...' : (isEdit ? 'Update Landing Page' : 'Launch Campaign')}</button>
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
           
           <div className="mt-8 pt-8 border-t border-slate-100 px-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Publish Visibility</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="admin-form-select !bg-white">
                <option value="Published">🟢 Published</option>
                <option value="Draft">🟡 Draft</option>
              </select>
              
              {isEdit && (
                <Link href={`/${formData.slug}`} target="_blank" className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">
                  <Eye size={12} /> View Live Page
                </Link>
              )}
           </div>
        </div>

        <div className="content-area">
           {activeTab === 'content' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Page Identification</h4></div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="admin-form-group"><label>Internal Identifier</label><input type="text" value={formData.title} onChange={e => {const v=e.target.value; setFormData({...formData, title:v, slug:v.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')});}} placeholder="Summer 2024 Promo..." /></div>
                       <div className="admin-form-group"><label>Public URL Path</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">/</span><input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="pl-8 font-mono text-blue-600" /></div></div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">1. Hero Banner</h4></div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div className="admin-form-group"><label>Headline</label><input type="text" value={formData.banner_title} onChange={e => setFormData({ ...formData, banner_title: e.target.value })} /></div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="admin-form-group"><label>Display Price</label><input type="text" value={formData.banner_amount} onChange={e => setFormData({ ...formData, banner_amount: e.target.value })} className="text-emerald-600 font-bold" /></div>
                             <div className="admin-form-group"><label>Old Price</label><input type="text" value={formData.banner_old_amount} onChange={e => setFormData({ ...formData, banner_old_amount: e.target.value })} className="text-slate-400 line-through" /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="admin-form-group"><label>Top Badge 1</label><input type="text" value={formData.hero_badge_1} onChange={e=>setFormData({...formData, hero_badge_1:e.target.value})} className="text-xs" /></div>
                             <div className="admin-form-group"><label>Top Badge 2</label><input type="text" value={formData.hero_badge_2} onChange={e=>setFormData({...formData, hero_badge_2:e.target.value})} className="text-xs" /></div>
                          </div>
                          <div className="admin-form-group"><label>Intro Text</label><textarea rows={3} value={formData.banner_description} onChange={e => setFormData({ ...formData, banner_description: e.target.value })} /></div>
                       </div>
                       <div className="space-y-4">
                          <ImageUpload value={formData.banner_image} onChange={url => setFormData({ ...formData, banner_image: url })} label="Hero Media" dimensions="1920 x 800" />
                          <div className="grid grid-cols-2 gap-4">
                             <div className="admin-form-group"><label>Primary Button</label><input type="text" value={formData.hero_cta_button} onChange={e=>setFormData({...formData, hero_cta_button:e.target.value})} /></div>
                             <div className="admin-form-group"><label>Starting Label</label><input type="text" value={formData.hero_starting_label} onChange={e=>setFormData({...formData, hero_starting_label:e.target.value})} /></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">2. Narrative Section</h4></div>
                    <div className="grid grid-cols-2 gap-8 items-start">
                       <ImageUpload value={formData.about_image} onChange={url => setFormData({ ...formData, about_image: url })} label="Background Parallax Image" size="small" dimensions="1920 x 600" />
                       <div className="space-y-4">
                          <div className="admin-form-group"><label>Section Title</label><input type="text" value={formData.about_title} onChange={e => setFormData({ ...formData, about_title: e.target.value })} className="font-bold" /></div>
                          <div className="admin-form-group"><label>Description</label><textarea rows={6} value={formData.about_description} onChange={e => setFormData({ ...formData, about_description: e.target.value })} /></div>
                       </div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">3. Packages Settings</h4></div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="admin-form-group"><label>Heading</label><input type="text" value={formData.packages_heading} onChange={e => setFormData({ ...formData, packages_heading: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Subtitle</label><input type="text" value={formData.packages_lead} onChange={e => setFormData({ ...formData, packages_lead: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Review Quote Text</label><input type="text" value={formData.packages_quote_button} onChange={e => setFormData({ ...formData, packages_quote_button: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Link Text</label><input type="text" value={formData.packages_details_link} onChange={e => setFormData({ ...formData, packages_details_link: e.target.value })} /></div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">4. Trust Signals & Final Narrative</h4></div>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       <div className="admin-form-group"><label>Handwritten Kicker</label><input type="text" value={formData.why_kicker} onChange={e => setFormData({ ...formData, why_kicker: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Section Title</label><input type="text" value={formData.why_title} onChange={e => setFormData({ ...formData, why_title: e.target.value })} /></div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-8 items-start">
                       <div className="flex-1 space-y-4">
                          <div className="admin-form-group"><label>Bottom Closing Title</label><input type="text" value={formData.end_title} onChange={e => setFormData({ ...formData, end_title: e.target.value })} className="bg-white" /></div>
                          <div className="admin-form-group"><label>Statement</label><textarea rows={4} value={formData.end_description} onChange={e => setFormData({ ...formData, end_description: e.target.value })} className="bg-white" /></div>
                       </div>
                       <ImageUpload value={formData.end_image} onChange={url => setFormData({ ...formData, end_image: url })} label="Decorative Media" size="small" dimensions="1200 x 800" />
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">5. FAQs & Support</h4></div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="admin-form-group"><label>Kicker</label><input type="text" value={formData.faq_kicker} onChange={e => setFormData({ ...formData, faq_kicker: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Heading</label><input type="text" value={formData.faq_title} onChange={e => setFormData({ ...formData, faq_title: e.target.value })} /></div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">6. Conversational CTA</h4></div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="admin-form-group"><label>Upper Tagline</label><input type="text" value={formData.cta_kicker} onChange={e => setFormData({ ...formData, cta_kicker: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Lead Title</label><input type="text" value={formData.cta_title} onChange={e => setFormData({ ...formData, cta_title: e.target.value })} /></div>
                       <div className="admin-form-group col-span-2"><label>Final Narrative</label><textarea rows={3} value={formData.cta_lead} onChange={e => setFormData({ ...formData, cta_lead: e.target.value })} /></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                       <div className="admin-form-group"><label>Button text</label><input type="text" value={formData.cta_button_label} onChange={e=>setFormData({...formData, cta_button_label:e.target.value})} className="text-[10px]" /></div>
                       <div className="admin-form-group"><label>Phone</label><input type="text" value={formData.cta_phone} onChange={e=>setFormData({...formData, cta_phone:e.target.value})} className="text-[10px]" /></div>
                       <div className="admin-form-group"><label>Email</label><input type="text" value={formData.cta_email} onChange={e=>setFormData({...formData, cta_email:e.target.value})} className="text-[10px]" /></div>
                       <div className="admin-form-group"><label>Call Label</label><input type="text" value={formData.cta_call_label} onChange={e=>setFormData({...formData, cta_call_label:e.target.value})} className="text-[10px]" /></div>
                    </div>
                 </div>

                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">SEO Strategy</h4></div>
                    <div className="space-y-4">
                       <div className="admin-form-group"><label>Browser Meta Title</label><input type="text" value={formData.seo_title} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} /></div>
                       <div className="admin-form-group"><label>Search Summary</label><textarea rows={3} value={formData.seo_description} onChange={e => setFormData({ ...formData, seo_description: e.target.value })} /></div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'package' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header flex items-center justify-between">
                       <h4 className="serif">Affiliated Package Architecture</h4>
                       <div className="flex items-center gap-4">
                          <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                             <input type="text" placeholder="Filter inventory..." value={pkgSearch} onChange={e => setPkgSearch(e.target.value)} className="pl-9 h-10 w-48 text-[11px]" />
                          </div>
                          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{formData.package_ids.length} Linked</div>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       {allPackages
                          .filter(pkg => pkg.title.toLowerCase().includes(pkgSearch.toLowerCase()))
                          .map((pkg: any) => {
                             const isSelected = formData.package_ids.includes(pkg._id);
                             return (
                                <div key={pkg._id} onClick={() => {const ni = isSelected ? formData.package_ids.filter(id => id !== pkg._id) : [...formData.package_ids, pkg._id]; setFormData({ ...formData, package_ids: ni });}} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-orange-50/50':'border-slate-100 bg-slate-50/30 hover:border-slate-300'}`}>
                                   <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0"><img src={getImageUrl(pkg.thumb)} className="w-full h-full object-cover" /></div>
                                   <div className="flex-1 min-w-0">
                                      <div className="text-[11px] font-bold text-slate-900 line-clamp-1">{pkg.title}</div>
                                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">₹{pkg.price}</div>
                                   </div>
                                   {isSelected && <ShieldCheck size={14} className="text-blue-600" />}
                                </div>
                             );
                          })}
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
