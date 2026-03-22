"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, MessageSquareQuote, UserCircle, Star, Briefcase, Camera, Clock, Sparkles, Zap, ShieldCheck, Layers, User, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditTestimonial() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    review: '',
    rating: 5,
    image: '',
    status: 'published'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await fetch(`${API_URL}/testimonials/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            name: data.data.name || '',
            location: data.data.location || '',
            review: data.data.review || '',
            rating: data.data.rating || 5,
            image: data.data.image || '',
            status: data.data.status || 'published'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTestimonial();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/testimonials');
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
    <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-2xl shadow-amber-500/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/testimonials')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Edit Testimonial
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Guest: <span className="text-slate-900 font-black">{formData.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/testimonials')} className="admin-btn admin-btn-secondary">
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
                <div className="admin-section-icon admin-section-icon--amber"></div>
                Customer Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-2 mb-3">
                    <User size={12} className="text-orange-500" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="admin-form-input text-xl font-bold h-14" 
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-2 mb-3">
                    <Briefcase size={12} className="text-sky-500" /> Professional Title / Location
                  </label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })} 
                    className="admin-form-input text-xl font-bold h-14" 
                    placeholder="e.g. CEO, Travel Co."
                  />
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <MessageSquareQuote size={18} className="text-rose-500" /> Feedback Content
                </label>
                <div className="bg-slate-50/50 rounded-[32px] p-1.5 border border-slate-100 shadow-inner overflow-hidden transition-all focus-within:bg-white focus-within:shadow-xl focus-within:border-amber-200">
                  <textarea 
                    value={formData.review} 
                    onChange={e => setFormData({ ...formData, review: e.target.value })} 
                    className="admin-form-textarea !bg-transparent border-none font-medium text-slate-700 leading-relaxed h-[360px] focus:ring-0 px-8 py-8 text-lg" 
                    placeholder="Type the guest's review here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Audit & Settings */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
              Rating
            </h4>
            
            <div className="space-y-10">
              <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-6 p-10 bg-slate-50/50 rounded-[40px] border border-slate-100 shadow-inner group/rating transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40">
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="group transition-all hover:scale-125 active:scale-90"
                      >
                        <Star 
                          size={28} 
                          className={`transition-all duration-300 drop-shadow-xl ${star <= formData.rating ? 'fill-amber-400 text-amber-400 scale-110' : 'fill-slate-100 text-slate-200'}`} 
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="font-black text-slate-900 text-4xl leading-none tracking-tighter">{formData.rating}.0</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">Satisfaction Score</div>
                  </div>
                </div>
              </div>
              </div>

                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Customer Image"
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 opacity-60 hover:opacity-100 transition-opacity">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Entry ID</div>
                   <div className="text-[10px] font-bold text-slate-500 font-mono uppercase">#{String(id).toUpperCase().slice(-12)}</div>
                </div>
            </div>
          </div>

          <div className="admin-form-card p-10 bg-slate-900 border-slate-800 relative overflow-hidden group shadow-2xl shadow-orange-950/20 mt-6">
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-[28px] bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-3xl group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-700 shadow-2xl">
                <ShieldCheck size={28} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-1">Status</div>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">Live & Visible</p>
                <div className="flex items-center gap-2 mt-4 opacity-40">
                  <Layers size={12} className="text-slate-400" />
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Global Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}