"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Image as ImageIcon, LayoutTemplate, Layers, MousePointerClick, Zap, Clock, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function SlidersAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/sliders`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Hero Canvas? This action will permanently deconstruct the visual narrative.')) return;
    try {
      const res = await fetch(`${API_URL}/sliders/${id}`, {
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
    (item.title || item.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Homepage Sliders
          </h2>
          <p className="admin-page-subtitle mt-1">Manage the hero banners and slides on the homepage</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search sliders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-10 h-11 text-xs"
            />
          </div>
          <Link href="/admin/sliders/create" className="admin-btn admin-btn-primary h-11 px-6">
            <Plus size={18} /> Add Slider
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-20 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading sliders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item: any) => (
            <div key={item._id} className="admin-form-card group p-0 overflow-hidden flex flex-col hover:shadow-xl transition-all border-none bg-white shadow-sm h-[480px]">
              
              {/* Preview Window */}
              <div className="h-56 bg-slate-100 relative overflow-hidden shrink-0 border-b border-slate-100">
                {item.image ? (
                  <img src={item.image} alt="Slider" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute inset-x-6 bottom-6">
                  {item.subtitle && (
                    <div className="mb-2 bg-blue-600 w-fit px-2 py-1 rounded text-[9px] text-white font-bold uppercase tracking-wider">
                       {item.subtitle}
                    </div>
                  )}
                  <h3 className="text-white font-bold text-xl leading-tight line-clamp-2">{item.title || 'Untitled Slider'}</h3>
                </div>
              </div>
              
              {/* Actions & Meta */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} className="text-blue-500" /> Status
                     </div>
                     <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold border border-emerald-100">
                        Active
                     </div>
                  </div>

                  {item.link ? (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                           <ExternalLink size={10} /> Link Path
                        </div>
                        <div className="text-[10px] font-medium text-slate-600 truncate text-xs">
                          {item.link}
                        </div>
                    </div>
                  ) : (
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center py-4 border border-dashed border-slate-100 rounded-xl bg-slate-50 italic">No link defined</div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 pt-6">
                    <Link href={`/admin/sliders/${item._id}/edit`} className="flex-1 flex items-center justify-center gap-2 h-10 bg-white border border-slate-200 rounded-xl text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95">
                      <Edit size={14} /> Edit Slide
                    </Link>
                    <button onClick={() => handleDelete(item._id)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 shrink-0">
                      <Trash2 size={16} />
                    </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredData.length === 0 && (
            <div className="col-span-full py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-4">
                <div className="p-8 bg-white rounded-2xl border border-slate-100 text-slate-200">
                  <ImageIcon size={48} />
                </div>
                <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">No sliders found</p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}