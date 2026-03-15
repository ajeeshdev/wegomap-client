"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, HelpCircle, MessageCircle, Zap, Clock, ShieldCheck, Sparkles, List, Layers } from 'lucide-react';
import RichTextEditor from '@/components/admin/Editor';

export default function EditFAQ() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    module: 'Platform Core',
    order: 0,
    status: 'Published'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchFAQ() {
      try {
        const res = await fetch(`${API_URL}/faqs/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            question: data.data.question || data.data.title || '',
            answer: data.data.answer || '',
            module: data.data.module || 'Platform Core',
            order: data.data.order || 0,
            status: data.data.status || 'Published'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchFAQ();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const bodyData = { ...formData, title: formData.question };
      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: 'PUT',
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
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-indigo-500/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/faqs')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title truncate max-w-sm">
              <div className="admin-page-title-indicator"></div>
              Edit FAQ
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Question: <span className="text-slate-900 font-black truncate max-w-[240px] italic">"{formData.question}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/faqs')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {saving ? 'Compiling...' : 'Save Refinement'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Form */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="w-2 h-8 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]"></div>
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
                    className="admin-form-input font-black h-14 px-6 rounded-2xl bg-slate-50 border-slate-100 group-hover/module:bg-white transition-all pr-12 text-sm" 
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

               <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">Item ID</div>
                  <div className="text-[10px] font-bold text-slate-800 font-mono uppercase truncate opacity-80 leading-none">#{String(id).toUpperCase().slice(-12)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-indigo-950/20 mt-6 text-center">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-bl-full blur-[60px]"></div>
             <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-4 h-full">
               <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-700 shadow-2xl transform group-hover:scale-110">
                 <Sparkles size={40} className="animate-pulse" />
               </div>
               <div className="space-y-4">
                 <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none mb-2 opacity-60">Info</div>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 leading-relaxed italic opacity-60">FAQs help customers find answers quickly without needing to contact support.</p>
                 <div className="flex items-center justify-center gap-3 mt-8">
                    <Zap size={16} className="text-amber-500" />
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