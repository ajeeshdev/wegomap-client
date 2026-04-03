"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, MessageSquareQuote, UserCircle, Star, Briefcase, Camera, Sparkles, Zap, ShieldCheck, Clock, Layers, User, Shield as Safe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateTestimonial() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    review: '',
    rating: 5,
    image: '',
    status: 'published'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
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
        alert(data.error || 'Creation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Request failed');
    } finally {
      setLoading(false);
    }
  };

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
              Add New Testimonial
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new customer testimonial to your website.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/testimonials')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save Testimonial'}
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

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4">
                    <User size={14} className="text-blue-600" /> Customer Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="admin-form-input text-2xl font-black uppercase tracking-tight h-16 px-8 rounded-3xl" 
                    placeholder="e.g. Sarah Jenkins..." 
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label flex items-center gap-3 mb-4 font-black text-[11px] uppercase tracking-[0.2em] opacity-60">
                    <Briefcase size={14} className="text-sky-500" /> Location or Title
                  </label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })} 
                    className="admin-form-input font-black h-16 px-8 rounded-3xl" 
                    placeholder="e.g. London, UK..." 
                  />
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-50">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <MessageSquareQuote size={18} className="text-emerald-500" /> Feedback Content
                </label>
                <div className="bg-slate-50/50 rounded-[48px] p-2.5 border-2 border-slate-100 shadow-inner overflow-hidden transition-all focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-slate-200/40 focus-within:border-amber-200">
                  <textarea 
                    value={formData.review} 
                    onChange={e => setFormData({ ...formData, review: e.target.value })} 
                    className="admin-form-textarea !bg-transparent border-none font-bold text-slate-700 leading-relaxed h-[420px] focus:ring-0 px-10 py-10 text-lg scrollbar-hidden" 
                    placeholder="Enter the customer's feedback and experience here..."
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
              <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
              Rating
            </h4>
            
            <div className="space-y-10">
              <div className="space-y-6">
                <label className="admin-form-label text-[10px] block text-center uppercase tracking-[0.4em] text-slate-400 font-black opacity-60">Customer Satisfaction</label>
                <div className="flex justify-center gap-3 p-8 bg-slate-50 shadow-inner rounded-[40px] border border-slate-100 transition-all hover:bg-white active:scale-95 shadow-2xl shadow-slate-100/50">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="group transition-all hover:scale-125 active:scale-90"
                    >
                      <Star 
                        size={32} 
                        className={`transition-all duration-300 drop-shadow-2xl ${star <= formData.rating ? 'fill-amber-400 text-amber-400 scale-110' : 'fill-slate-100 text-slate-200'}`} 
                      />
                    </button>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[32px] py-4 text-center border border-white/5 shadow-2xl">
                    <div className="font-black text-white text-3xl leading-none tracking-tighter">{formData.rating}.0</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3 opacity-60">Verified Rating</div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50">
                <div className="space-y-10 pt-4">
                  <ImageUpload 
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Customer Image"
                    dimensions="400 x 400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-rose-950/10 mt-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-bl-full blur-[60px]"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 h-full text-center py-4">
              <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-700 shadow-2xl transform group-hover:scale-110">
                <Sparkles size={40} className="animate-pulse" />
              </div>
              <div className="admin-space-y-4">
                <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none mb-2 opacity-60">Visibility</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-8 leading-relaxed italic line-clamp-2 opacity-60">Testimonials will be shown on the website immediately after saving.</p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <Layers size={14} className="text-amber-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-80 italic">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}