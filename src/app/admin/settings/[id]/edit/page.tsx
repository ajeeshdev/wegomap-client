"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Terminal, ShieldCheck, Zap, Sparkles, Layers, Clock } from 'lucide-react';

export default function EditSetting() {
  const router = useRouter();
  const { id } = useParams();
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`${API_URL}/settings/${id}`);
        const json = await res.json();
        if (json.success) {
           // Basic formatting for presentation
           setJsonInput(JSON.stringify(json.data, null, 2));
        }
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    }
    if (id) fetchItem();
  }, [id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const bodyData = JSON.parse(jsonInput);
      // Strip system managed fields
      delete bodyData._id;
      delete bodyData.createdAt;
      delete bodyData.updatedAt;
      delete bodyData.__v;
      
      const res = await fetch(`${API_URL}/settings/${id}`, {
        method: 'PUT',
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
        alert(data.error || 'Update error');
      }
    } catch (err) { 
      alert('Invalid structural JSON syntax or request failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-indigo-500/20"></div>
      <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Retrieving tectonic parameter manuscript...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      {/* Header Section */}
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/settings')} className="p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 text-slate-500 shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="admin-page-title">
              <div className="admin-page-title-indicator"></div>
              Edit Setting
            </h2>
            <p className="admin-page-subtitle mt-1 flex items-center gap-2">
               Registry ID: <span className="text-slate-900 font-bold truncate max-w-[240px]">#{String(id).toUpperCase().slice(-8)}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/settings')} className="admin-btn admin-btn-secondary">
            Discard
          </button>
          <button 
            onClick={() => handleSubmit()} 
            disabled={saving}
            className="admin-btn admin-btn-primary h-11 px-6"
          >
            <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="admin-form-card">
            <div className="space-y-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <h3 className="admin-form-section-title !mb-0 border-none">
                    <div className="admin-page-title-indicator bg-blue-600"></div>
                    Configuration Data (JSON)
                  </h3>
                  <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg text-[10px] font-bold border border-emerald-100 flex items-center gap-2 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                     Live Registry Synced
                  </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label flex items-center gap-2 mb-4">
                  <Terminal size={14} className="text-blue-500" /> JSON Content
                </label>
                <div className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 shadow-xl relative group">
                  <div className="absolute top-4 right-6 hidden group-hover:block transition-all">
                     <span className="text-[10px] font-bold font-mono text-emerald-500 uppercase tracking-widest leading-none">Valid JSON Format</span>
                  </div>
                  <textarea 
                    value={jsonInput} 
                    onChange={e => setJsonInput(e.target.value)} 
                    className="w-full bg-transparent border-none outline-none focus:ring-0 font-mono text-sm text-blue-300 leading-relaxed min-h-[500px] scrollbar-hidden caret-white" 
                    rows={20}
                  ></textarea>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 shrink-0">
                    <Zap size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Developer Note
                    </p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic opacity-80">
                        Changing this setting may impact specific website features. Please ensure the JSON syntax is correct before saving.
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="admin-form-sidebar">
          <div className="admin-form-card p-6 space-y-8 sticky top-32">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6">
                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                System Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="min-w-0">
                     <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">ID</div>
                     <div className="text-[10px] font-bold text-slate-800 font-mono uppercase truncate opacity-80 leading-none">#{String(id).toUpperCase().slice(-12)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Clock size={16} />
                  </div>
                  <div>
                     <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Sync</div>
                     <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest leading-none">Healthy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
               <div className="flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Site Config Verified</span>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}