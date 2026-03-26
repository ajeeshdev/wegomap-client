"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Calendar, MapPin, Users, Ticket, Zap, Clock, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function SpecialEventsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/special-events`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      const res = await fetch(`${API_URL}/special-events/${id}`, {
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
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Special Events
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage your special tours and activities.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-11 h-11"
            />
          </div>
          <Link href="/admin/special-events/create" className="admin-btn admin-btn-primary h-11 shrink-0">
            <Plus size={18} /> Add New
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-rose-500/20"></div>
          <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-8 w-[40%] text-left">Details</th>
                  <th className="px-6 w-[25%] text-center">Date</th>
                  <th className="px-6 w-[20%] text-center">Status</th>
                  <th className="px-8 text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200/50 flex-shrink-0 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-700 shadow-sm relative overflow-hidden">
                          {item.images && item.images[0] ? (
                            <img src={getImageUrl(item.images[0])} alt="" className="w-small h-small object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" />
                          ) : (
                            <Ticket size={28} className="group-hover:-rotate-12 transition-transform duration-700 relative z-10" />
                          )}
                          <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/5 transition-colors"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 group-hover:text-rose-600 transition-colors uppercase text-[11px] tracking-tight leading-none truncate max-w-lg">
                            {item.title || item.name}
                          </div>
                          <div className="text-[9px] font-bold text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest leading-none">
                            <MapPin size={10} className="text-red-500" />
                            Location: <span className="text-slate-500 font-black">{item.location || 'All Regions'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-x border-slate-50/50">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-2 font-mono font-black text-slate-900 text-[10px] bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all tracking-tighter">
                          <Calendar size={12} className="text-orange-500" />
                          {item.date ? new Date(item.date).toLocaleDateString() : 'To be decided'}
                        </div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 leading-none mt-1">Event Date</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-r border-slate-50/50">
                      <div className="flex justify-center">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border border-emerald-100 flex items-center gap-2 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                          <Zap size={11} className="fill-current animate-pulse shrink-0" /> Published
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Link href={`/admin/special-events/${item._id}/edit`} className="p-2.5 bg-white border border-slate-200 rounded-xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95 group/edit" title="Edit">
                          <Edit size={16} className="group-hover/edit:rotate-12 transition-transform" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="p-16 bg-slate-50 rounded-[64px] border border-slate-100 text-slate-200 shadow-inner">
                          <Clock size={80} strokeWidth={1} className="animate-pulse opacity-20" />
                        </div>
                        <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-[10px] italic">No items found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tectonic Event Manifest Footer */}
      {!loading && filteredData.length > 0 && (
        <div className="admin-form-card bg-slate-900 border-slate-800 p-10 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-full bg-rose-500/5 -skew-x-12 translate-x-48 group-hover:translate-x-32 transition-transform duration-1000"></div>
          <div className="absolute top-0 left-0 w-48 h-48 bg-orange-500/10 rounded-br-full blur-[80px]"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="w-20 h-20 rounded-[32px] bg-white/5 flex items-center justify-center text-white border border-white/10 backdrop-blur-3xl group-hover:bg-rose-600 group-hover:border-rose-500 transition-all duration-700 shadow-2xl transform group-hover:scale-110">
                <Sparkles size={40} />
              </div>
              <div>
                <h4 className="text-white font-black text-2xl tracking-tighter uppercase mb-3">Summary</h4>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10 pr-6 leading-none">
                    <ShieldCheck size={14} className="text-emerald-500" /> Verified
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                    <Zap size={14} className="text-orange-500" /> Live Content
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-16 pr-12">
              <div className="text-right">
                <h5 className="text-6xl font-black text-white leading-none tracking-tighter">{(filteredData.length).toString().padStart(2, '0')}</h5>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-4 mr-1">Active Events</p>
              </div>
              <div className="w-px h-24 bg-white/5"></div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-rose-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse"></div>
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">Schedule Active</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Layers size={14} />
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}