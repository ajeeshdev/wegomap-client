"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, HelpCircle, MessageCircle, Layers, Zap, Clock, ShieldCheck, Sparkles, List } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';

export default function CreateFAQ() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    module: 'Platform Core',
    order: 0,
    status: 'Published'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // Support both 'title' (legacy) and 'question'
      const bodyData = { ...formData, title: formData.question };
      const res = await fetch(`${API_URL}/faqs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/faqs');
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
          <button onClick={() => router.push('/admin/faqs')} className="admin-back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Add New FAQ
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Add a new question and answer for your customers.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/faqs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Saving...' : 'Save FAQ'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Form */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="admin-section-icon admin-section-icon--indigo"></div>
                FAQ Details
              </h3>

              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-3 mb-6">
                  <HelpCircle size={18} className="text-blue-500" /> The Question
                </label>
                <div className="bg-slate-50/50 rounded-[48px] p-3 border-2 border-slate-100 shadow-inner overflow-hidden transition-all focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-indigo-500/10 focus-within:border-indigo-200">
                  <textarea 
                    rows={3} 
                    value={formData.question} 
                    onChange={e => setFormData({ ...formData, question: e.target.value })} 
                    className="admin-form-textarea !bg-transparent border-none font-black text-slate-900 leading-relaxed text-2xl focus:ring-0 px-10 py-8 scrollbar-hidden" 
                    placeholder="e.g. How do I book a tour?" 
                  ></textarea>
                </div>
              </div>

              <div className="admin-form-group pt-12 border-t border-slate-100">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <MessageCircle size={18} className="text-emerald-500" /> The Answer
                </label>
                <div className="bg-slate-50 rounded-[56px] p-2.5 border-2 border-slate-100 transition-all shadow-inner overflow-hidden focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-indigo-500/10 focus-within:border-emerald-200">
                  <RichTextEditor 
                    value={formData.answer} 
                    onChange={(answer) => setFormData({ ...formData, answer })} 
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
              Settings
            </h4>
            <div className="space-y-10">
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] flex items-center gap-3 uppercase tracking-[0.2em] text-slate-400 font-black opacity-60 mb-4"> <List size={14} className="text-blue-500" /> Category or Tag</label>
                <div className="relative group/module">
                    <input 
                    type="text" 
                    value={formData.module} 
                    onChange={e => setFormData({ ...formData, module: e.target.value })} 
                    className="admin-form-input font-black h-14 px-6 rounded-2xl bg-slate-50 border-slate-100 group-hover/module:bg-white transition-all pr-12" 
                    placeholder="General, Packages, Transits..." 
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover/module:text-indigo-500 transition-colors">
                        <Layers size={16} />
                    </div>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label text-[10px] flex items-center gap-3 uppercase tracking-[0.2em] text-slate-400 font-black opacity-60 mb-4"> <Zap size={14} className="text-amber-500" /> Display Order</label>
                <input 
                  type="number" 
                  value={formData.order} 
                  onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} 
                  className="admin-form-input font-mono font-black h-14 px-6 rounded-2xl bg-slate-50 border-slate-100 text-blue-600 focus:bg-white" 
                />
              </div>
              <div className="admin-form-group pt-10 border-t border-slate-100">
                <label className="admin-form-label text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 block opacity-60">Status</label>
                <div className="relative group/status">
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="admin-form-input font-black bg-slate-50 border-slate-100 rounded-2xl h-14 uppercase text-[11px] tracking-widest cursor-pointer group-hover/status:bg-white transition-all shadow-sm focus:ring-12 focus:ring-blue-500/5 appearance-none px-6"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/status:text-emerald-500 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-indigo-950/20 mt-6">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-bl-full blur-[60px]"></div>
             <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-4 h-full text-center">
               <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-700 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110">
                 <Sparkles size={40} className="animate-pulse" />
               </div>
               <div className="admin-space-y-4">
                 <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none mb-2 opacity-60">Info</div>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 leading-relaxed italic opacity-60">FAQs help customers find answers quickly without needing to contact support.</p>
                 <div className="flex items-center justify-center gap-3 mt-8">
                    <Clock size={16} className="text-rose-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] italic">System Active</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}