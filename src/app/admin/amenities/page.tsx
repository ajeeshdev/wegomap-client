"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Coffee, Wind, Wifi, ShieldCheck, Zap, MoreVertical, Clock, Sparkles, Layers } from 'lucide-react';

export default function AmenitiesAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/amenities`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this amenity?')) return;
    try {
      const res = await fetch(`${API_URL}/amenities/${id}`, {
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
    (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Amenities
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage the facilities and services available for your tours.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text"               placeholder="SEARCH..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-12 h-12 uppercase tracking-tight text-[11px] font-black"
            />
          </div>
          <Link href="/admin/amenities/create" className="admin-btn admin-btn-primary h-12 px-8 flex-shrink-0">
            <Plus size={20} /> Add New
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-indigo-500/20"></div>
          <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading amenities...</p>
        </div>
      ) : (
        <div className="admin-table-container shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                   <th className="px-8 w-[40%] text-left">Amenity Details</th>
                  <th className="px-6 w-[30%] text-center">ID / Key</th>
                  <th className="px-6 w-[15%] text-center">Status</th>
                  <th className="px-8 text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200/50 flex-shrink-0 group-hover:scale-125 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 shadow-sm relative overflow-hidden">
                           <Coffee size={30} strokeWidth={1.5} className="group-hover:-rotate-12 transition-transform duration-700 relative z-10" />
                           <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-[12px] tracking-tight leading-none truncate max-w-lg">
                            {item.title || item.name}
                          </div>
                          <div className="text-[9px] font-black text-slate-400 mt-3 flex items-center gap-3 uppercase tracking-[0.2em] leading-none">
                             <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 group-hover:bg-white group-hover:border-blue-100 transition-all text-slate-500">
                                <Zap size={11} className="text-amber-500 animate-pulse" /> AMENITIES
                             </div>
                             <span className="opacity-20">/</span>
                             <div className="flex items-center gap-1.5">
                                <Layers size={11} className="text-indigo-400" /> VERSION 4.0
                             </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7 border-x border-slate-50/50">
                      <div className="flex justify-center">
                        <div className="text-[11px] font-black text-indigo-500 font-mono bg-indigo-50/30 px-5 py-2.5 rounded-2xl border border-indigo-100/50 w-fit tracking-tighter group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-700 shadow-sm uppercase italic">
                          {String(item.key || 'standard-asset').toUpperCase()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7 border-r border-slate-50/50">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all duration-700">
                            <ShieldCheck size={12} className="fill-current animate-pulse" /> Live
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Link href={`/admin/amenities/${item._id}/edit`} className="p-3 bg-white border border-slate-200 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 group/edit" title="Edit">
                          <Edit size={18} className="group-hover/edit:rotate-12 transition-transform duration-500" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-slate-200 rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 shrink-0" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center gap-8">
                        <div className="p-20 bg-slate-50 rounded-[64px] border border-slate-100 text-slate-200 shadow-inner">
                          <Wind size={96} strokeWidth={1} className="animate-pulse opacity-10" />
                        </div>
                        <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-[12px] italic">No amenities found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Matrix Footer */}
      {!loading && filteredData.length > 0 && (
          <div className="admin-form-card bg-slate-900 border-slate-800 p-12 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 w-[800px] h-full bg-indigo-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
               <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-br-full blur-[100px]"></div>
               <div className="relative z-10 flex items-center justify-between">
                   <div className="flex items-center gap-10">
                       <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center text-white border border-white/10 backdrop-blur-3xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-700 shadow-2xl transform group-hover:scale-110">
                           <Zap size={48} className="animate-pulse" />
                       </div>
                       <div>
                            <h4 className="text-white font-black text-3xl tracking-tighter uppercase mb-4">Summary</h4>
                           <div className="flex items-center gap-8">
                               <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.35em] border-r border-white/10 pr-8 leading-none">
                                  <Clock size={16} className="text-blue-500" /> SYNCED
                               </div>
                               <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.35em] leading-none">
                                  <Sparkles size={16} className="text-amber-500" /> VERIFIED
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center gap-20 pr-12">
                        <div className="text-right">
                            <h5 className="text-7xl font-black text-white leading-none tracking-tighter">{(filteredData.length).toString().padStart(2, '0')}</h5>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mt-5 mr-1 italic">Total Amenities</p>
                        </div>
                        <div className="w-px h-32 bg-white/10"></div>
                        <div className="grid grid-cols-1 gap-6">
                             <div className="flex items-center gap-5 text-indigo-500">
                                 <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-pulse"></div>
                                 <span className="text-[11px] font-black uppercase tracking-widest leading-none">System Active</span>
                             </div>
                             <div className="flex items-center gap-5 text-slate-400">
                                 <Layers size={16} />
                                 <span className="text-[11px] font-black uppercase tracking-widest leading-none">Live Data</span>
                             </div>
                        </div>
                   </div>
               </div>
          </div>
      )}
    </div>
  );
}