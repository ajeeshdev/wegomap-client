"use client";

import { API_URL } from '@/config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Terminal, ShieldCheck, Zap, Sparkles, Layers, Clock } from 'lucide-react';

export default function CreateSetting() {
  const router = useRouter();
  const [jsonInput, setJsonInput] = useState('{\n  "title": "",\n  "key": "",\n  "value": ""\n}');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const bodyData = JSON.parse(jsonInput);
      const res = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/settings');
      } else {
        alert(data.error || 'Registration error');
      }
    } catch (err) { 
      alert('Invalid structural JSON syntax or request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/settings')} className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Initialize Global Tectonic Parameter
            </h2>
            <p className="admin-page-subtitle mt-1 text-slate-400">Registering a new global tectonic structural variable into the platform architectural core system</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/settings')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={loading}
            className="admin-btn admin-btn-primary h-12 px-8"
          >
            <ShieldCheck size={20} /> {loading ? 'Compiling...' : 'Save Parameter'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="relative z-10 space-y-12">
              <h3 className="admin-form-section-title">
                <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]"></div>
                Structural JSON Matrix Definition
              </h3>

              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-3 mb-8">
                  <Terminal size={18} className="text-blue-500" /> Administrative JSON Payload Manuscript (Definitions)
                </label>
                <div className="bg-slate-900 rounded-[56px] p-10 border-4 border-slate-800 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] relative group transition-all hover:shadow-indigo-500/10 hover:border-indigo-900/40">
                  <div className="absolute top-8 right-12 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
                     <span className="text-[11px] font-black font-mono text-emerald-500 uppercase tracking-[0.3em]">SYNTAX: JSON_CORE_V4</span>
                  </div>
                  <textarea 
                    value={jsonInput} 
                    onChange={e => setJsonInput(e.target.value)} 
                    className="w-full bg-transparent border-none outline-none focus:ring-0 font-mono text-base text-indigo-300 leading-relaxed min-h-[500px] scrollbar-hidden caret-white" 
                    rows={20}
                    placeholder='{ "key": "value" }'
                  ></textarea>
                </div>
              </div>
              
              <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[48px] flex items-start gap-8 shadow-inner group/tip transition-all hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-slate-200/40">
                  <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-blue-500 shadow-lg border border-slate-100 group-hover/tip:bg-indigo-600 group-hover/tip:text-white transition-all duration-700 transform group-hover/tip:scale-110">
                    <Zap size={32} className="animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] leading-none mb-1">
                        Architecture Integrity Notice
                    </p>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed max-w-2xl italic opacity-80">
                        Ensure the JSON matrix follows the tectonic schema requirements. Invalid syntax or missing structural keys will result in initialization failure and potential de-routing of system variables at runtime.
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-8 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
              Structural Protocol Stack
            </h4>
            <div className="space-y-8">
              <div className="flex items-center gap-5 bg-slate-50/50 p-6 rounded-[32px] border-2 border-slate-100 overflow-hidden group/lock hover:bg-white transition-all shadow-sm hover:border-indigo-100 hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0 group-hover/lock:bg-blue-600 group-hover/lock:text-white transition-all duration-700 shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 leading-none mb-1.5">Integrity Lock</div>
                   <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest opacity-60">RECURSIVE_NODE</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 bg-slate-50/50 p-6 rounded-[32px] border-2 border-slate-100 overflow-hidden group/prop hover:bg-white transition-all shadow-sm hover:border-emerald-100 hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 shrink-0 group-hover/prop:bg-emerald-600 group-hover/prop:text-white transition-all duration-700 shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 leading-none mb-1.5">Propagation Sync</div>
                   <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest opacity-60">REAL_TIME_PULSE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-card p-12 bg-slate-900 border-slate-800 relative overflow-hidden h-80 group shadow-2xl shadow-indigo-950/20 mt-6 text-center">
             <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-bl-full blur-[70px]"></div>
             <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-4 h-full">
               <div className="admin-icon-box bg-white/10 text-white w-24 h-24 rounded-[40px] border border-white/20 backdrop-blur-3xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-700 shadow-2xl transform group-hover:scale-125 group-hover:rotate-12">
                 <Layers size={40} className="animate-pulse" />
               </div>
               <div className="space-y-4">
                 <div className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-3 leading-none opacity-60">Variable Matrix Core</div>
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 leading-relaxed italic opacity-60 line-clamp-2">New Global Tectonic Structural Parameter Node Initialized in the System Core Infrastructure.</p>
                 <div className="flex items-center justify-center gap-3 mt-8">
                    <Sparkles size={16} className="text-amber-500" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] opacity-80 italic">Global Core Sync Live</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}