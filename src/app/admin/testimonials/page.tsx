"use client";
import { getImageUrl } from "@/config";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, MessageSquareQuote, Star, UserCircle, Sparkles, Quote, Clock, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/testimonials`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
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
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Testimonials
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage testimonials shown on all landing pages. Add, edit, or remove reviews.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-amber-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-12 h-12 uppercase tracking-tight text-[11px] font-black"
            />
          </div>
          <Link href="/admin/testimonials/create" className="admin-btn admin-btn-primary h-12 px-8 flex-shrink-0">
            <Plus size={20} /> Add New
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-2xl shadow-amber-500/20"></div>
          <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Loading testimonials...</p>
        </div>
      ) : (
        <div className="admin-table-container shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-8 w-[35%] text-left">Guest Info</th>
                  <th className="px-6 w-[40%] text-left">Content</th>
                  <th className="px-6 text-center w-[15%]">Rating</th>
                  <th className="px-8 text-right w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200/50 flex-shrink-0 group-hover:scale-125 group-hover:bg-amber-500 group-hover:text-white transition-all duration-700 shadow-sm overflow-hidden relative">
                          {item.image ? (
                            <img src={getImageUrl(item.image)} alt={item.name} className="w-small h-small object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-110" />
                          ) : (
                            <UserCircle size={32} strokeWidth={1.2} className="group-hover:-rotate-12 transition-transform duration-700 relative z-10" />
                          )}
                          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-900 group-hover:text-amber-600 transition-colors uppercase text-[12px] tracking-tighter leading-none flex items-center gap-2">
                            {item.name || 'Guest User'}
                            <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                          </div>
                          <div className="mt-3">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 group-hover:bg-white group-hover:border-amber-200 transition-all shadow-sm">
                              {item.location || item.designation || 'Verified Traveler'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7 border-x border-slate-50/50">
                      <div className="relative font-bold text-slate-500 leading-relaxed text-[11px] italic pr-8 group-hover:text-slate-800 transition-colors max-w-xl pl-6">
                        <Quote size={20} className="absolute left-0 -top-2 text-amber-500/10 rotate-180" />
                        <span className="line-clamp-2 leading-relaxed tracking-tight">
                          {item.review || item.text || item.description || 'No content provided.'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-7 border-r border-slate-50/50">
                      <div className="flex flex-col items-center gap-2.5">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < (item.rating || 5) ? "fill-amber-400 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]" : "fill-slate-100 text-slate-100"}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">{item.rating || 5}.0 RATING</span>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex items-center justify-end gap-2 transition-all duration-300">
                        <Link href={`/admin/testimonials/${item._id}/edit`} className="p-3 bg-white border border-slate-200 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 group/edit" title="Edit">
                          <Edit size={18} className="group-hover/edit:rotate-12 transition-transform duration-500" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-slate-200 rounded-2xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-95 shrink-0" title="Delete">
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
                        <div className="p-10 bg-slate-50 rounded-[64px] border border-slate-100 text-slate-200 shadow-inner">
                          <MessageSquareQuote size={96} strokeWidth={1} className="animate-pulse opacity-10" />
                        </div>
                        <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-[12px] italic">No testimonials found</p>
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
          <div className="absolute top-0 right-0 w-[800px] h-full bg-amber-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-br-full blur-[100px]"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center text-white border border-white/10 backdrop-blur-3xl group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-700 shadow-2xl transform group-hover:scale-110">
                <Sparkles size={48} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-white font-black text-3xl tracking-tighter uppercase mb-4">Summary</h4>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/10 pr-8 leading-none">
                    <ShieldCheck size={16} className="text-emerald-500" /> VERIFIED
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] leading-none">
                    <Zap size={16} className="text-blue-600 animate-pulse" /> LIVE CONTENT
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 pr-12">
              <div className="text-right">
                <h5 className="text-7xl font-black text-white leading-none tracking-tighter">{(filteredData.length).toString().padStart(2, '0')}</h5>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mt-5 mr-1 italic">Total Testimonials</p>
              </div>
              <div className="w-px h-32 bg-white/10"></div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-5 text-amber-500">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse"></div>
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">System Active</span>
                </div>
                <div className="flex items-center gap-5 text-slate-400">
                  <Layers size={16} />
                  <span className="text-[11px] font-black uppercase tracking-widest leading-none">Version 4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}