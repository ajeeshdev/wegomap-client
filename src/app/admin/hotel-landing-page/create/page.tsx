"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Save, ArrowLeft, Globe, Search, Plus, Sparkles, Settings, 
  ShieldCheck, Layers, Package, Trash2, Eye, Building2, X, 
  LayoutPanelTop, Check, Star, MapPin, User, Calendar, 
  MessageSquare, Wifi, Coffee, Utensils, Mountain, Car, Wind, Zap, Plane, Camera, Flame,
  Waves, Dumbbell, Flower2, AirVent, GlassWater, WashingMachine, Baby, Gamepad2, Bell, Tv, 
  ShowerHead, Bath, Trees, Wine, Shield, Heart, Umbrella, Bike, Music, Map
} from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';
import '../../cms-premium.scss';

const ICON_OPTIONS = [
  { label: 'WiFi', value: 'Wifi', icon: <Wifi size={14} /> },
  { label: 'Coffee', value: 'Coffee', icon: <Coffee size={14} /> },
  { label: 'Restaurant', value: 'Utensils', icon: <Utensils size={14} /> },
  { label: 'View', value: 'Mountain', icon: <Mountain size={14} /> },
  { label: 'Parking', value: 'Car', icon: <Car size={14} /> },
  { label: 'Security', value: 'Shield', icon: <Shield size={14} /> },
  { label: 'Campfire', value: 'Flame', icon: <Flame size={14} /> },
  { label: 'Wind', value: 'Wind', icon: <Wind size={14} /> },
  { label: 'Power', value: 'Zap', icon: <Zap size={14} /> },
  { label: 'Travel', value: 'Plane', icon: <Plane size={14} /> },
  { label: 'Sightseeing', value: 'Camera', icon: <Camera size={14} /> },
  { label: 'Check', value: 'Check', icon: <Check size={14} /> },
  { label: 'Star', value: 'Star', icon: <Star size={14} /> },
  { label: 'Pool', value: 'Waves', icon: <Waves size={14} /> },
  { label: 'Gym', value: 'Dumbbell', icon: <Dumbbell size={14} /> },
  { label: 'Spa', value: 'Flower2', icon: <Flower2 size={14} /> },
  { label: 'AC', value: 'AirVent', icon: <AirVent size={14} /> },
  { label: 'Bar', value: 'GlassWater', icon: <GlassWater size={14} /> },
  { label: 'Laundry', value: 'WashingMachine', icon: <WashingMachine size={14} /> },
  { label: 'Kids', value: 'Baby', icon: <Baby size={14} /> },
  { label: 'Games', value: 'Gamepad2', icon: <Gamepad2 size={14} /> },
  { label: 'Service', value: 'Bell', icon: <Bell size={14} /> },
  { label: 'TV', value: 'Tv', icon: <Tv size={14} /> },
  { label: 'Shower', value: 'ShowerHead', icon: <ShowerHead size={14} /> },
  { label: 'Bath', value: 'Bath', icon: <Bath size={14} /> },
  { label: 'Nature', value: 'Trees', icon: <Trees size={14} /> },
  { label: 'Wine', value: 'Wine', icon: <Wine size={14} /> },
  { label: 'Health', value: 'Heart', icon: <Heart size={14} /> },
  { label: 'Beach', value: 'Umbrella', icon: <Umbrella size={14} /> },
  { label: 'Cycling', value: 'Bike', icon: <Bike size={14} /> },
  { label: 'Music', value: 'Music', icon: <Music size={14} /> },
  { label: 'Map', value: 'Map', icon: <Map size={14} /> },
];

function IconPicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeIcon = ICON_OPTIONS.find(o => o.value === value) || ICON_OPTIONS[0];

  return (
    <div className="custom-picker relative w-full">
      <div className="picker-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-slate-400">{activeIcon.icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">{activeIcon.label}</span>
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[999]" onClick={() => setIsOpen(false)} />
          <div className="picker-dropdown animate-in zoom-in-95 duration-200">
            {ICON_OPTIONS.map(o => (
              <div 
                key={o.value} 
                className={`picker-option ${value === o.value ? 'active' : ''}`}
                onClick={() => { onChange(o.value); setIsOpen(false); }}
              >
                {o.icon} <span>{o.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function CreateHotelLandingPage({ params: paramsProp }: { params?: { id: string } }) {
  const router = useRouter();
  const paramsFromRoute = useParams();
  const pageIdRaw = (paramsFromRoute?.id ?? paramsProp?.id);
  const pageId = typeof pageIdRaw === 'string' ? pageIdRaw : undefined;
  const isEdit = !!pageId;
  const [activeTab, setActiveTab] = useState('identification');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    
    // Banner Section
    banner_image: '',
    banner_title: '',
    subtitle: '',
    banner_description: '',
    
    // About
    about_subtitle: '',
    about_title: '',
    about_description: '',
    about_image: '',
    about_badge_text: '',
    about_features: [] as string[],
    
    // Repeaters
    hotel_facilities: [] as any[],
    why_choose_subtitle: '',
    why_choose_title: '',
    why_choose_image: '',
    why_choose_points: [] as any[],
    hotel_rooms: [] as any[],
    gallery_images: [] as string[],
    testimonials: [] as any[],
    nearby_attractions: [] as any[],

    // Contact
    location: '',
    whatsapp_number: '',
    cta_phone: '',
    cta_email: '',
    footer_address: '',
    footer_email: '',
    google_maps_iframe: '',

    status: 'Published',
    isCampaign: true,
    type: 'hotel'
  });

  useEffect(() => {
    if (pageId) fetchData();
  }, [pageId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/pages/${pageId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setFormData(prev => ({ ...prev, ...json.data }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load page data");
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug) return toast.error("Title and Slug are required");
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
        toast.success("Saved successfully!");
        router.push('/admin/hotel-landing-page');
      } else { toast.error(data.error || "Save failed"); }
    } catch (err) { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  const tabs = [
    { id: 'identification', label: 'Identity & SEO', icon: <Settings size={16} /> },
    { id: 'content', label: 'Main Content', icon: <Sparkles size={16} /> },
    { id: 'rooms', label: 'Rooms & Gallery', icon: <Building2 size={16} /> },
    { id: 'amenities', label: 'Amenities & Why', icon: <LayoutPanelTop size={16} /> },
    { id: 'local', label: 'Local & Reviews', icon: <Package size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Globe size={16} /> },
  ];

  const gold = "#849071";

  if (loading) return <div className="p-10 text-center font-bold">Loading Aroma Hills Data...</div>;

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/hotel-landing-page" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all"><ArrowLeft size={18} /></Link>
           <div>
              <h2>{isEdit ? 'Property Editing' : 'New Property Landing'}</h2>
              <p className="status-badge">Status: <span>{formData.status}</span></p>
           </div>
        </div>
        <button onClick={handleSubmit} className="save-btn">
           <Save size={18} /> Publish Changes
        </button>
      </div>

      <div className="property-edit-layout">
        <div className="tabs-sidebar">
           {tabs.map(t => (
              <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}>
                 <div className="icon-wrap">{t.icon}</div>
                 {t.label}
              </button>
           ))}
        </div>

        <div className="content-area animate-in slide-in-from-bottom-2 duration-500">
           {activeTab === 'identification' && (
              <div className="editor-card">
                 <div className="card-header"><h4 className="serif">Identity & SEO Metadata</h4></div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="admin-form-group"><label>Property Internal Title</label><input type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} /></div>
                    <div className="admin-form-group"><label>URL Slug</label><input type="text" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})} className="font-mono" /></div>
                 </div>
                 <div className="admin-form-group"><label>Meta Search Title</label><input type="text" value={formData.seo_title} onChange={e=>setFormData({...formData, seo_title: e.target.value})} /></div>
                 <div className="admin-form-group"><label>Search Description (SEO)</label><textarea value={formData.seo_description} onChange={e=>setFormData({...formData, seo_description: e.target.value})} rows={3} /></div>
              </div>
           )}

           {activeTab === 'content' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Hero Visuals</h4></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       <ImageUpload value={formData.banner_image} onChange={url=>setFormData({...formData, banner_image: url})} label="Main Banner" />
                       <div className="space-y-4">
                          <div className="admin-form-group"><label>Display Header</label><input type="text" value={formData.banner_title} onChange={e=>setFormData({...formData, banner_title: e.target.value})} /></div>
                          <div className="admin-form-group"><label>Sub-header Kicker</label><input type="text" value={formData.subtitle} onChange={e=>setFormData({...formData, subtitle: e.target.value})} /></div>
                          <div className="admin-form-group"><label>Story Intro Text</label><textarea value={formData.banner_description} onChange={e=>setFormData({...formData, banner_description: e.target.value})} rows={4} /></div>
                       </div>
                    </div>
                 </div>
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Storytelling About</h4></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div className="admin-form-group"><label>About Section Title</label><input type="text" value={formData.about_title} onChange={e=>setFormData({...formData, about_title: e.target.value})} /></div>
                          <div className="admin-form-group"><label>Detailed Description</label><textarea value={formData.about_description} onChange={e=>setFormData({...formData, about_description: e.target.value})} rows={8} /></div>
                          <div className="admin-form-group"><label>Key Traits (One per line)</label><textarea value={formData.about_features.join('\n')} onChange={e=>setFormData({...formData, about_features: e.target.value.split('\n')})} rows={5} className="font-mono text-xs" /></div>
                       </div>
                       <div className="space-y-4">
                          <ImageUpload value={formData.about_image} onChange={url=>setFormData({...formData, about_image: url})} label="Story Illustration" />
                          <div className="admin-form-group"><label>Float Badge Caption</label><input type="text" value={formData.about_badge_text} onChange={e=>setFormData({...formData, about_badge_text: e.target.value})} /></div>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'rooms' && (
              <div className="space-y-8">
                 <div className="flex items-center justify-between"><h4 className="text-lg font-bold serif">Accommodations & Gallery</h4><button onClick={()=>setFormData({...formData, hotel_rooms: [...formData.hotel_rooms, { title:'', description:'', images:[], facilities:[] }]})} className="add-item-btn"><Plus size={14}/> Add New Room</button></div>
                 <div className="space-y-4">
                    {formData.hotel_rooms.map((room, idx) => (
                       <div key={idx} className="repeater-item group">
                          <button onClick={()=>{const r=[...formData.hotel_rooms]; r.splice(idx,1); setFormData({...formData, hotel_rooms: r});}} className="remove-btn"><Trash2 size={14}/></button>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <div className="admin-form-group"><label>Room Class Title</label><input type="text" value={room.title} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx].title=e.target.value; setFormData({...formData, hotel_rooms: r});}} placeholder="Superior Deluxe, etc." /></div>
                                <div className="admin-form-group"><label>Description</label><textarea value={room.description} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx].description=e.target.value; setFormData({...formData, hotel_rooms: r});}} rows={4} placeholder="Brief details about the space..." /></div>
                                <div className="admin-form-group"><label>Highlights</label><input type="text" value={room.facilities.join(', ')} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx].facilities=e.target.value.split(',').map(s=>s.trim()); setFormData({...formData, hotel_rooms: r});}} className="text-xs" placeholder="WiFi, AC, Bed size... (comma separated)" /></div>
                             </div>
                             <div className="grid grid-cols-1 gap-3">
                                {room.images?.map((img:string, iIdx:number) => (
                                   <div key={iIdx} className="relative">
                                      <ImageUpload value={img} onChange={url=>{const r=[...formData.hotel_rooms]; r[idx].images[iIdx]=url; setFormData({...formData, hotel_rooms: r});}} label={`#${iIdx+1}`} hideRemove={true} />
                                      <button onClick={()=>{const r=[...formData.hotel_rooms]; r[idx].images.splice(iIdx,1); setFormData({...formData, hotel_rooms: r});}} className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full shadow-lg z-20"><X size={10}/></button>
                                   </div>
                                ))}
                                <button onClick={()=>{const r=[...formData.hotel_rooms]; if(!r[idx].images) r[idx].images=[]; r[idx].images.push(''); setFormData({...formData, hotel_rooms: r});}} className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-slate-800 hover:text-slate-800 transition-all gap-2"><Plus size={20}/><span className="text-[10px] font-bold uppercase tracking-widest">Image</span></button>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="editor-card mt-6">
                    <div className="card-header flex items-center justify-between"><h4 className="serif">Property Image Portfolio</h4><button onClick={()=>setFormData({...formData, gallery_images: [...formData.gallery_images, '']})} className="text-slate-900 font-bold text-sm underline-decoration">+ More Photos</button></div>
                    <div className="gallery-grid">
                       {formData.gallery_images.map((img, idx) => (
                          <div key={idx} className="relative group">
                             <ImageUpload value={img} onChange={url=>{const g=[...formData.gallery_images]; g[idx]=url; setFormData({...formData, gallery_images: g});}} label="IMG" hideRemove={true} />
                             <button onClick={()=>{const g=[...formData.gallery_images]; g.splice(idx,1); setFormData({...formData, gallery_images: g});}} className="absolute -top-1 -right-1 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-20"><X size={10}/></button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'amenities' && (
              <div className="space-y-6">
                 <div className="editor-card">
                    <div className="card-header flex items-center justify-between"><h4 className="serif">Resort Specialities</h4><button onClick={()=>setFormData({...formData, hotel_facilities: [...formData.hotel_facilities, { icon:'Wifi', title:'', description:'' }]})} className="text-sm font-bold underline decoration-slate-300">+ Add Facility</button></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                       {formData.hotel_facilities.map((fac, idx) => (
                          <div key={idx} className="repeater-item space-y-3">
                             <button onClick={()=>{const f=[...formData.hotel_facilities]; f.splice(idx,1); setFormData({...formData, hotel_facilities: f});}} className="remove-btn"><Trash2 size={12}/></button>
                             <div className="flex gap-3">
                                <IconPicker value={fac.icon} onChange={val => {
                                   const f=[...formData.hotel_facilities]; 
                                   f[idx].icon=val; 
                                   setFormData({...formData, hotel_facilities:f});
                                }} />
                                <input type="text" value={fac.title} onChange={e=>{const f=[...formData.hotel_facilities]; f[idx].title=e.target.value; setFormData({...formData, hotel_facilities:f});}} placeholder="Heated Pool, etc." className="flex-1 font-bold border-0 bg-white" />
                             </div>
                             <textarea value={fac.description} onChange={e=>{const f=[...formData.hotel_facilities]; f[idx].description=e.target.value; setFormData({...formData, hotel_facilities:f});}} rows={2} className="text-[11px] border-0 bg-slate-50 p-2" placeholder="Briefly describe this feature..." />
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="editor-card">
                    <div className="card-header flex items-center justify-between"><h4 className="serif">Exclusive Benefits (Why Us)</h4><button onClick={()=>setFormData({...formData, why_choose_points: [...formData.why_choose_points, { icon:'Check', title:'', description:'' }]})} className="text-sm font-bold underline decoration-slate-300">+ Add Note</button></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       <ImageUpload value={formData.why_choose_image} onChange={url=>setFormData({...formData, why_choose_image: url})} label="Experience Visual" />
                       <div className="space-y-3">
                          {formData.why_choose_points.map((pt, idx) => (
                             <div key={idx} className="repeater-item !p-4">
                                <button onClick={()=>{const p=[...formData.why_choose_points]; p.splice(idx,1); setFormData({...formData, why_choose_points: p});}} className="remove-btn"><X size={12}/></button>
                                <input type="text" value={pt.title} onChange={e=>{const p=[...formData.why_choose_points]; p[idx].title=e.target.value; setFormData({...formData, why_choose_points: p});}} className="font-bold text-xs mb-1 border-0 bg-transparent w-full" placeholder="USP Heading" />
                                <textarea value={pt.description} onChange={e=>{const p=[...formData.why_choose_points]; p[idx].description=e.target.value; setFormData({...formData, why_choose_points: p});}} rows={2} className="text-[10px] border-0 bg-slate-100 p-2 w-full" placeholder="Quick details..." />
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'local' && (
              <div className="space-y-8">
                 <div className="editor-card">
                    <div className="card-header flex items-center justify-between"><h4 className="serif">Local Exploration</h4><button onClick={()=>setFormData({...formData, nearby_attractions: [...formData.nearby_attractions, { title:'', distance:'', description:'' }]})} className="text-sm font-bold border-b border-dotted">+ Add New Spot</button></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {formData.nearby_attractions.map((att, idx) => (
                          <div key={idx} className="repeater-item group">
                             <button onClick={()=>{const a=[...formData.nearby_attractions]; a.splice(idx,1); setFormData({...formData, nearby_attractions: a});}} className="remove-btn"><Trash2 size={12}/></button>
                             <div className="flex flex-wrap gap-4">
                                <input type="text" value={att.title} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx].title=e.target.value; setFormData({...formData, nearby_attractions: a});}} className="font-bold text-sm bg-transparent border-0 w-100" placeholder="Destination Name" />
                                <input type="text" value={att.distance} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx].distance=e.target.value; setFormData({...formData, nearby_attractions: a});}} className="w-100 text-xs font-bold bg-slate-100 rounded-lg h-8" placeholder="2.5 KM" />
                             </div>
                             <textarea value={att.description} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx].description=e.target.value; setFormData({...formData, nearby_attractions: a});}} rows={2} className="text-[11px] mt-2 bg-slate-50/50 p-2 border-0 w-full" placeholder="Why should guests visit here?..." />
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="editor-card">
                    <div className="card-header flex items-center justify-between"><h4 className="serif">Guest Wall of Love</h4><button onClick={()=>setFormData({...formData, testimonials: [...formData.testimonials, { content:'', author:'', date:'' }]})} className="text-sm font-bold border-b border-dotted">+ Add Feedback</button></div>
                    <div className="space-y-4">
                       {formData.testimonials.map((t, idx) => (
                          <div key={idx} className="repeater-item border-l-4 border-l-slate-200">
                             <button onClick={()=>{const ts=[...formData.testimonials]; ts.splice(idx,1); setFormData({...formData, testimonials: ts});}} className="remove-btn"><Trash2 size={12}/></button>
                             <textarea value={t.content} onChange={e=>{const ts=[...formData.testimonials]; ts[idx].content=e.target.value; setFormData({...formData, testimonials: ts});}} rows={4} className="italic serif !text-base bg-transparent border-0 w-full mb-3" placeholder="Paste the review content here..." />
                             <div className="flex gap-4 pt-4 border-t border-slate-100">
                                <input type="text" value={t.author} onChange={e=>{const ts=[...formData.testimonials]; ts[idx].author=e.target.value; setFormData({...formData, testimonials: ts});}} className="text-xs font-black uppercase tracking-widest border-0 bg-transparent" placeholder="Guest Name" />
                                <input type="text" value={t.date} onChange={e=>{const ts=[...formData.testimonials]; ts[idx].date=e.target.value; setFormData({...formData, testimonials: ts});}} className="text-[10px] text-slate-400 border-0 bg-transparent" placeholder="Date (Optional)" />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'contact' && (
              <div className="editor-card">
                 <div className="card-header"><h4 className="serif">Public Contact & Maps</h4></div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <div className="admin-form-group"><label>Google Maps Embed (Iframe)</label><textarea value={formData.google_maps_iframe} onChange={e=>setFormData({...formData, google_maps_iframe: e.target.value})} rows={10} className="font-mono text-[10px] !bg-slate-50 shadow-inner p-4" /></div>
                       <div className="admin-form-group"><label>Location Identifier (for Weather)</label><input type="text" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} placeholder="Munnar, etc." /></div>
                    </div>
                    <div className="space-y-6">
                       <div className="admin-form-group"><label>Business Address</label><textarea value={formData.footer_address} onChange={e=>setFormData({...formData, footer_address: e.target.value})} rows={3} /></div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="admin-form-group"><label>Front Desk Phone</label><input type="text" value={formData.cta_phone} onChange={e=>setFormData({...formData, cta_phone: e.target.value})} /></div>
                          <div className="admin-form-group"><label>Direct WhatsApp</label><input type="text" value={formData.whatsapp_number} onChange={e=>setFormData({...formData, whatsapp_number: e.target.value})} /></div>
                       </div>
                       <div className="admin-form-group"><label>Official Guest Email</label><input type="text" value={formData.footer_email} onChange={e=>setFormData({...formData, footer_email: e.target.value})} /></div>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
