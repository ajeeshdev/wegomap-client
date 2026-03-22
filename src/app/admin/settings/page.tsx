"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Settings, ShieldCheck, Zap, Clock, Sparkles, Layers } from 'lucide-react';

export default function SettingsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tectonic variable? Global architectural parameters are critical for system stability. Deleting this may destabilize the platform logic core.')) return;
    try {
      const res = await fetch(`${API_URL}/settings/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      if (json.success) {
        setData(data.filter((item: any) => item._id !== id));
      }
    } catch (err) { console.error('Failed to delete', err); }
  }

  const filteredData = data.filter((item: any) => 
    (item.title || item.name || item.key || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Site Settings
          </h2>
          <p className="admin-page-subtitle mt-1">Manage global configurations and website content settings</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search settings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-10 h-11 text-xs"
            />
          </div>
          <Link href="/admin/settings/create" className="admin-btn admin-btn-primary h-11 px-6">
            <Plus size={18} /> Add Setting
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-20 gap-4">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading settings...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-8 w-[50%] text-left text-[10px] uppercase tracking-wider text-slate-400 font-bold">Setting Name</th>
                  <th className="px-6 w-[20%] text-center text-[10px] uppercase tracking-wider text-slate-400 font-bold">Type</th>
                  <th className="px-6 w-[15%] text-center text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</th>
                  <th className="px-8 text-right w-[15%] text-[10px] uppercase tracking-wider text-slate-400 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                           <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-sm">
                            {item.title || item.name || item.key}
                          </div>
                          <div className="text-[10px] font-medium text-slate-400 mt-1 flex items-center gap-2">
                             <span className="text-orange-500/60">Registry: #{String(item._id).toUpperCase().slice(-8)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                          CONFIG_VAR
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100">
                           <ShieldCheck size={10} /> Active
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Link href={`/admin/settings/${item._id}/edit`} className="p-2 bg-white border border-slate-200 rounded-lg text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-2 bg-white border border-slate-200 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="p-12 bg-slate-50 rounded-3xl border border-slate-100 text-slate-200">
                          <Layers size={48} strokeWidth={1} />
                        </div>
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">No settings found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      {!loading && filteredData.length > 0 && (
          <div className="admin-form-card bg-slate-900 p-8 shadow-xl">
               <div className="flex items-center justify-between">
                   <div className="flex items-center gap-8">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 backdrop-blur-3xl shadow-2xl">
                           <Sparkles size={32} />
                       </div>
                       <div>
                           <h4 className="text-white font-bold text-xl tracking-tight mb-2">Configuration Overview</h4>
                           <div className="flex items-center gap-6">
                               <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-r border-white/10 pr-6 leading-none">
                                  <Clock size={12} className="text-orange-500" /> System Live
                               </div>
                               <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">
                                  <ShieldCheck size={12} className="text-emerald-500" /> Data Validated
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center gap-12 pr-6">
                        <div className="text-right">
                             <h5 className="text-4xl font-bold text-white leading-none tracking-tighter">{(filteredData.length).toString().padStart(2, '0')}</h5>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Settings</p>
                        </div>
                   </div>
               </div>
          </div>
      )}

    </div>
  );
}