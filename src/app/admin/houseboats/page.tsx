"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Ship, Anchor, Waves, Sparkles, MoreVertical, Zap, Clock, ShieldCheck, Layers, MapPin } from 'lucide-react';

export default function HouseboatsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/houseboats`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this houseboat? This will remove it from your website.')) return;
    try {
      const res = await fetch(`${API_URL}/houseboats/${id}`, {
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
    (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Houseboats
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage your houseboats and backwater cruises.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search houseboats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-11 h-11"
            />
          </div>
          <Link href="/admin/houseboats/create" className="admin-btn admin-btn-primary h-11 shrink-0">
            <Plus size={18} /> Add Houseboat
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-20 gap-4">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading houseboats...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-8 w-[40%]">Houseboat Details</th>
                  <th className="px-6 w-[25%]">Category</th>
                  <th className="px-6 text-center w-[20%]">Status</th>
                  <th className="px-8 text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-orange-50/30 flex items-center justify-center text-orange-600 border border-orange-100/50 flex-shrink-0 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-700 shadow-sm overflow-hidden relative">
                          {item.thumb ? (
                            <img src={getImageUrl(item.thumb)} alt="" className="w-small h-small object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" />
                          ) : (
                            <Ship size={24} className="group-hover:-rotate-12 transition-transform duration-500" />
                          )}
                          <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 transition-colors"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors uppercase text-[11px] tracking-tight leading-tight line-clamp-1">
                            {item.title || item.name}
                          </div>
                          <div className="flex items-center gap-3 mt-2 leading-none">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                              <ShieldCheck size={9} className="text-emerald-500" /> ID: #{String(item._id).toUpperCase().slice(-6)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-x border-slate-50/50">
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit">
                        <Anchor size={11} className="text-orange-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.category || 'Luxury Cruiser'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-r border-slate-50/50">
                      <div className="flex justify-center">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-100 flex items-center gap-2 shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500">
                          <Waves size={10} className="fill-current" /> Active
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Link href={`/admin/houseboats/${item._id}/edit`} className="p-2.5 bg-white border border-slate-200 rounded-xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95 group/edit" title="Edit">
                          <Edit size={16} className="group-hover/edit:rotate-12 transition-transform" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 shrink-0" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 text-slate-200 shadow-inner">
                          <Ship size={64} className="animate-pulse opacity-20" />
                        </div>
                        <p className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[10px] italic">No houseboats found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Matrix */}
      {!loading && filteredData.length > 0 && (
        <div className="admin-form-card bg-slate-900 border-slate-800 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-bl-full blur-[80px]"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                <Waves size={28} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg tracking-tight uppercase">Houseboat Summary</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Total houseboats available on your website.</p>
              </div>
            </div>
            <div className="flex items-center gap-8 pr-12">
              <div className="text-center">
                <h5 className="text-2xl font-bold text-white leading-none">{String(filteredData.length).padStart(2, '0')}</h5>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Total Houseboats</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={10} className="text-emerald-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">System Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={10} className="text-orange-500" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Live Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}