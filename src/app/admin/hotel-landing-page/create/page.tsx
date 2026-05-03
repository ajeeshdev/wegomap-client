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
    imageAlt: '',
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
    gallery_subtitle: '',
    gallery_title: '',
    gallery_images: [] as string[],
    testimonials: [] as any[],
    nearby_subtitle: '',
    nearby_title: '',
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

  if (loading) return <div className="p-10 text-center font-bold">Loading Data...</div>;

  return (
    <div className="property-edit-container animate-in fade-in duration-700">
      <div className="property-edit-header">
        <div className="header-left">
           <Link href="/admin/hotel-landing-page" className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600"><ArrowLeft size={18} /></Link>
           <div>
              <h2 className="serif text-2xl font-bold leading-tight">{isEdit ? 'Property Editing' : 'New Property Landing'}</h2>
              <p className="status-badge">CURRENT STATUS: <span className="active">{formData.status}</span></p>
           </div>
        </div>
        <button onClick={handleSubmit} className="save-btn">
           <Save size={18} /> Publish Changes
        </button>
      </div>

      <div className="property-edit-layout">
        <div className="content-area">
           <div className="tabs-header">
              {tabs.map(t => (
                 <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`tab-btn-top ${activeTab === t.id ? 'active' : ''}`}>
                    <div className="icon-wrap">{t.icon}</div>
                    <span>{t.label}</span>
                 </button>
              ))}
           </div>

           {activeTab === 'identification' && (
              <div className="tab-panel">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Property Identity</h4></div>
                    <div className="card-body">
                       <div className="admin-form-group"><label>Property Internal Title</label><input type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="title-input" /></div>
                       <div className="admin-form-group"><label>Meta Search Title</label><input type="text" value={formData.seo_title} onChange={e=>setFormData({...formData, seo_title: e.target.value})} /></div>
                       <div className="admin-form-group"><label>Search Description (SEO)</label><textarea value={formData.seo_description} onChange={e=>setFormData({...formData, seo_description: e.target.value})} rows={3} /></div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'content' && (
              <div className="tab-panel">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Hero Content</h4></div>
                    <div className="card-body">
                       <div className="admin-form-group"><label>Display Header</label><input type="text" value={formData.banner_title} onChange={e=>setFormData({...formData, banner_title: e.target.value})} className="title-input" /></div>
                       <div className="admin-form-group"><label>Sub-header Kicker</label><input type="text" value={formData.subtitle} onChange={e=>setFormData({...formData, subtitle: e.target.value})} /></div>
                       <div className="admin-form-group"><label>Story Intro Text</label><textarea value={formData.banner_description} onChange={e=>setFormData({...formData, banner_description: e.target.value})} rows={4} /></div>
                    </div>
                 </div>
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Storytelling About</h4></div>
                    <div className="card-body">
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="admin-form-group"><label>About Section Title</label><input type="text" value={formData.about_title} onChange={e=>setFormData({...formData, about_title: e.target.value})} /></div>
                             <div className="admin-form-group"><label>Detailed Description</label><textarea value={formData.about_description} onChange={e=>setFormData({...formData, about_description: e.target.value})} rows={8} /></div>
                          </div>
                          <div className="space-y-4">
                             <div className="admin-form-group"><label>Key Traits (One per line)</label><textarea value={formData.about_features.join('\n')} onChange={e=>setFormData({...formData, about_features: e.target.value.split('\n')})} rows={5} className="font-mono text-xs" /></div>
                             <div className="admin-form-group"><label>Float Badge Caption</label><input type="text" value={formData.about_badge_text} onChange={e=>setFormData({...formData, about_badge_text: e.target.value})} /></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           )}

            {activeTab === 'rooms' && (
               <div className="tab-panel">
                  <div className="editor-card">
                     <div className="card-header flex-header">
                        <h4 className="serif">Accommodations</h4>
                        <button onClick={()=>setFormData({...formData, hotel_rooms: [...formData.hotel_rooms, { title:'', description:'', images:[], facilities:[] }]})} className="add-day-btn">+ Add Room</button>
                     </div>
                     <div className="card-body">
                        <div className="space-y-6">
                           {formData.hotel_rooms.map((room, idx) => (
                              <div key={idx} className="itinerary-item">
                                 <button onClick={()=>{const r=[...formData.hotel_rooms]; r.splice(idx,1); setFormData({...formData, hotel_rooms: r});}} className="remove-day-btn"><Trash2 size={14}/></button>
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                       <div className="admin-form-group"><label>Room Class Title</label><input type="text" value={room.title} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx] = { ...r[idx], title: e.target.value }; setFormData({...formData, hotel_rooms: r});}} placeholder="Superior Deluxe, etc." className="title-input" /></div>
                                       <div className="admin-form-group"><label>Description</label><textarea value={room.description} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx] = { ...r[idx], description: e.target.value }; setFormData({...formData, hotel_rooms: r});}} rows={4} placeholder="Brief details about the space..." /></div>
                                       <div className="admin-form-group"><label>Highlights</label><input type="text" value={room.facilities.join(', ')} onChange={e=>{const r=[...formData.hotel_rooms]; r[idx] = { ...r[idx], facilities: e.target.value.split(',').map(s=>s.trim()) }; setFormData({...formData, hotel_rooms: r});}} className="text-xs" /></div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                       {room.images?.map((img:string, iIdx:number) => (
                                          <div key={iIdx} className="relative">
                                             <ImageUpload value={img} onChange={url=>{const r=[...formData.hotel_rooms]; const newImgs = [...r[idx].images]; newImgs[iIdx] = url; r[idx] = { ...r[idx], images: newImgs }; setFormData({...formData, hotel_rooms: r});}} label={`#${iIdx+1}`} dimensions="1200 x 800" />
                                             <button onClick={()=>{const r=[...formData.hotel_rooms]; const newImgs = [...r[idx].images]; newImgs.splice(iIdx,1); r[idx] = { ...r[idx], images: newImgs }; setFormData({...formData, hotel_rooms: r});}} className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full shadow-lg z-20"><X size={10}/></button>
                                          </div>
                                       ))}
                                       <button onClick={()=>{const r=[...formData.hotel_rooms]; const newImgs = [...(r[idx].images || [])]; newImgs.push(''); r[idx] = { ...r[idx], images: newImgs }; setFormData({...formData, hotel_rooms: r});}} className="add-day-btn mt-2 !bg-slate-100 !text-slate-600 border border-slate-200">+ Add Room Image</button>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="editor-card">
                     <div className="card-header flex-header"><h4 className="serif">Property Portfolio</h4><div className="flex gap-4"><div className="admin-form-group mb-0"><input type="text" value={formData.gallery_subtitle || ''} onChange={e=>setFormData({...formData, gallery_subtitle: e.target.value})} placeholder="Gallery Subtitle" className="!h-8 text-[10px]" /></div><div className="admin-form-group mb-0"><input type="text" value={formData.gallery_title || ''} onChange={e=>setFormData({...formData, gallery_title: e.target.value})} placeholder="Gallery Title" className="!h-8 text-[10px]" /></div></div></div>
                     <div className="card-body">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {formData.gallery_images.map((img, idx) => (
                              <div key={idx} className="relative group">
                                 <ImageUpload value={img} onChange={url=>{const g=[...formData.gallery_images]; g[idx]=url; setFormData({...formData, gallery_images: g});}} label="PHOTO" dimensions="1200 x 800" />
                                 <button onClick={()=>{const g=[...formData.gallery_images]; g.splice(idx,1); setFormData({...formData, gallery_images: g});}} className="remove-day-btn opacity-100"><X size={10}/></button>
                              </div>
                           ))}
                           <button onClick={()=>setFormData({...formData, gallery_images: [...formData.gallery_images, '']})} className="aspect-square border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">+ Add Photo</button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'amenities' && (
               <div className="tab-panel">
                  <div className="editor-card">
                     <div className="card-header flex-header"><h4 className="serif">Resort Specialities</h4><button onClick={()=>setFormData({...formData, hotel_facilities: [...formData.hotel_facilities, { icon:'Wifi', title:'', description:'' }]})} className="add-day-btn">+ Add Facility</button></div>
                     <div className="card-body">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           {formData.hotel_facilities.map((fac, idx) => (
                              <div key={idx} className="itinerary-item">
                                 <button onClick={()=>{const f=[...formData.hotel_facilities]; f.splice(idx,1); setFormData({...formData, hotel_facilities: f});}} className="remove-day-btn"><Trash2 size={12}/></button>
                                 <div className="flex gap-3 mb-3">
                                    <IconPicker value={fac.icon} onChange={val => { const f=[...formData.hotel_facilities]; f[idx] = { ...f[idx], icon: val }; setFormData({...formData, hotel_facilities:f}); }} />
                                    <input type="text" value={fac.title} onChange={e=>{const f=[...formData.hotel_facilities]; f[idx] = { ...f[idx], title: e.target.value }; setFormData({...formData, hotel_facilities:f});}} placeholder="Feature title" className="title-input !text-base" />
                                 </div>
                                 <textarea value={fac.description} onChange={e=>{const f=[...formData.hotel_facilities]; f[idx] = { ...f[idx], description: e.target.value }; setFormData({...formData, hotel_facilities:f});}} rows={2} placeholder="Description..." />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="editor-card">
                     <div className="card-header flex-header"><h4 className="serif">Why Choose Us</h4><button onClick={()=>setFormData({...formData, why_choose_points: [...formData.why_choose_points, { icon:'Star', title:'', description:'' }]})} className="add-day-btn">+ Add Point</button></div>
                     <div className="card-body">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                           <div className="space-y-4">
                              <div className="admin-form-group"><label>Section Subtitle</label><input type="text" value={formData.why_choose_subtitle || ''} onChange={e=>setFormData({...formData, why_choose_subtitle: e.target.value})} /></div>
                              <div className="admin-form-group"><label>Section Title</label><input type="text" value={formData.why_choose_title || ''} onChange={e=>setFormData({...formData, why_choose_title: e.target.value})} /></div>
                           </div>
                           <div className="space-y-4">
                              <ImageUpload value={formData.why_choose_image} onChange={url=>setFormData({...formData, why_choose_image: url})} label="Sidebar Illustration" dimensions="1200 x 1600" />
                           </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           {formData.why_choose_points.map((pt, idx) => (
                              <div key={idx} className="itinerary-item">
                                 <button onClick={()=>{const p=[...formData.why_choose_points]; p.splice(idx,1); setFormData({...formData, why_choose_points: p});}} className="remove-day-btn"><Trash2 size={12}/></button>
                                 <div className="flex gap-3 mb-3">
                                    <IconPicker value={pt.icon} onChange={val => { const p=[...formData.why_choose_points]; p[idx] = { ...p[idx], icon: val }; setFormData({...formData, why_choose_points:p}); }} />
                                    <input type="text" value={pt.title} onChange={e=>{const p=[...formData.why_choose_points]; p[idx] = { ...p[idx], title: e.target.value }; setFormData({...formData, why_choose_points:p});}} placeholder="Point title" className="title-input !text-base" />
                                 </div>
                                 <textarea value={pt.description} onChange={e=>{const p=[...formData.why_choose_points]; p[idx] = { ...p[idx], description: e.target.value }; setFormData({...formData, why_choose_points:p});}} rows={2} placeholder="Description..." />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'local' && (
               <div className="tab-panel">
                  <div className="editor-card">
                     <div className="card-header flex-header"><h4 className="serif">Nearby Attractions</h4><button onClick={()=>setFormData({...formData, nearby_attractions: [...formData.nearby_attractions, { title:'', distance:'', description:'' }]})} className="add-day-btn">+ Add Attraction</button></div>
                     <div className="card-body">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                           <div className="admin-form-group"><label>Section Subtitle</label><input type="text" value={formData.nearby_subtitle || ''} onChange={e=>setFormData({...formData, nearby_subtitle: e.target.value})} /></div>
                           <div className="admin-form-group"><label>Section Title</label><input type="text" value={formData.nearby_title || ''} onChange={e=>setFormData({...formData, nearby_title: e.target.value})} /></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           {formData.nearby_attractions.map((att, idx) => (
                              <div key={idx} className="itinerary-item">
                                 <button onClick={()=>{const a=[...formData.nearby_attractions]; a.splice(idx,1); setFormData({...formData, nearby_attractions: a});}} className="remove-day-btn"><Trash2 size={12}/></button>
                                 <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div className="col-span-2"><input type="text" value={att.title} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx] = { ...a[idx], title: e.target.value }; setFormData({...formData, nearby_attractions:a});}} placeholder="Attraction name" className="title-input !text-base" /></div>
                                    <div><input type="text" value={att.distance} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx] = { ...a[idx], distance: e.target.value }; setFormData({...formData, nearby_attractions:a});}} placeholder="Distance (e.g. 5 KM)" className="title-input !text-base" /></div>
                                 </div>
                                 <textarea value={att.description} onChange={e=>{const a=[...formData.nearby_attractions]; a[idx] = { ...a[idx], description: e.target.value }; setFormData({...formData, nearby_attractions:a});}} rows={2} placeholder="Short description..." />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="editor-card">
                     <div className="card-header flex-header"><h4 className="serif">Guest Testimonials</h4><button onClick={()=>setFormData({...formData, testimonials: [...formData.testimonials, { author:'', date:'', content:'' }]})} className="add-day-btn">+ Add Testimonial</button></div>
                     <div className="card-body">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           {formData.testimonials.map((test, idx) => (
                              <div key={idx} className="itinerary-item">
                                 <button onClick={()=>{const t=[...formData.testimonials]; t.splice(idx,1); setFormData({...formData, testimonials: t});}} className="remove-day-btn"><Trash2 size={12}/></button>
                                 <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input type="text" value={test.author} onChange={e=>{const t=[...formData.testimonials]; t[idx] = { ...t[idx], author: e.target.value }; setFormData({...formData, testimonials:t});}} placeholder="Author Name" className="title-input !text-base" />
                                    <input type="text" value={test.date} onChange={e=>{const t=[...formData.testimonials]; t[idx] = { ...t[idx], date: e.target.value }; setFormData({...formData, testimonials:t});}} placeholder="Date (e.g. March 2024)" className="title-input !text-base" />
                                 </div>
                                 <textarea value={test.content} onChange={e=>{const t=[...formData.testimonials]; t[idx] = { ...t[idx], content: e.target.value }; setFormData({...formData, testimonials:t});}} rows={4} placeholder="Testimonial content..." />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

           {activeTab === 'contact' && (
              <div className="tab-panel">
                 <div className="editor-card">
                    <div className="card-header"><h4 className="serif">Public Contact & Maps</h4></div>
                    <div className="card-body">
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                          <div className="space-y-4">
                             <div className="admin-form-group"><label>Google Maps Embed (Iframe)</label><textarea value={formData.google_maps_iframe} onChange={e=>setFormData({...formData, google_maps_iframe: e.target.value})} rows={10} className="font-mono text-xs" /></div>
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
                 </div>
              </div>
           )}
        </div>

        <div className="meta-sidebar">
           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Publishing</h4></div>
              <div className="card-body">
                 <div className="meta-item">
                    <label>URL Slug</label>
                    <div className="relative">
                       {!formData.slug && (
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono pointer-events-none">/</span>
                       )}
                       <input 
                          type="text" 
                          value={formData.slug} 
                          onChange={e=>setFormData({...formData, slug: e.target.value})} 
                          className={`slug-input ${formData.slug ? 'px-3' : 'pl-8'}`} 
                       />
                    </div>
                 </div>
                 <div className="meta-item">
                    <div className="toggle-row">
                       <label>Page Status</label>
                       <input type="checkbox" checked={formData.status === 'Published'} onChange={e => setFormData({ ...formData, status: e.target.checked ? 'Published' : 'Draft' })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
                 <div className="meta-item">
                    <label>Campaign Mode</label>
                    <div className="toggle-row">
                       <label>Is Campaign Page</label>
                       <input type="checkbox" checked={formData.isCampaign} onChange={e => setFormData({ ...formData, isCampaign: e.target.checked })} className="sr-only peer" />
                       <div className="toggle-switch"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Main Asset</h4></div>
              <div className="card-body">
                 <ImageUpload value={formData.banner_image} onChange={url=>setFormData({...formData, banner_image: url})} label="Banner Image" dimensions="1920 x 800" />
                 <p className="help-text mt-4">This is the background used for the top hero section.</p>
              </div>
           </div>

           <div className="meta-card">
              <div className="card-header"><h4 className="serif">Story Illustration</h4></div>
              <div className="card-body">
                 <ImageUpload value={formData.about_image} onChange={url=>setFormData({...formData, about_image: url})} label="Primary Photo" dimensions="1200 x 800" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
