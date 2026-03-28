"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, FileText, Globe, ExternalLink, MoreVertical, Zap, Clock, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function PagesAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/pages`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };
  const mainSlugs = [
    'home', 
    'about', 
    'services', 
    'contact', 
    'blogs', 
    'faqs', 
    'payment', 
    'cruise-packages', 
    'corporate-event-management-company-kochi', 
    'domestic-international-packages'
  ];

  const filteredData = data.filter((item: any) => 
    mainSlugs.includes(item.slug) &&
    (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Main Page SEO
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage Meta Titles, Descriptions and Keywords for core site landing pages</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search main pages..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-10 h-11 text-xs"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-12 gap-6 bg-white/50 border-dashed">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading Primary Nodes...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-20">ID</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Platform Route</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Meta Strategy</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item: any, index: number) => (
                  <tr key={item._id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-10 py-8">
                      <span className="text-xs font-black text-slate-300">{(index + 1).toString().padStart(2, '0')}</span>
                    </td>
                    <td className="px-6 py-8">
                      <div className="flex flex-col gap-1.5">
                        <div className="font-black text-slate-900 uppercase tracking-tight text-sm flex items-center gap-2">
                          <FileText size={14} className="text-blue-600" />
                          {item.title || item.name || item.slug}
                        </div>
                        <div className="text-[10px] font-mono text-blue-600 font-bold bg-orange-50 px-3 py-1 rounded-lg w-fit">
                          /{item.slug === 'home' ? '' : item.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      {item.seo_title ? (
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-slate-700 line-clamp-1 italic">{item.seo_title}</div>
                          <div className="text-[9px] text-slate-400 font-medium line-clamp-1 max-w-xs">{item.seo_description || 'No description meta defined'}</div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-rose-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Incomplete Strategy</span>
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      <Link 
                        href={`/admin/pages/${item._id}/edit`} 
                        className="inline-flex items-center gap-2 h-10 px-5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
                      >
                        <Zap size={14} className="text-amber-400 fill-amber-400" /> Optimize SEO
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 border border-slate-100">
                          <Globe size={40} />
                        </div>
                        <div className="space-y-2">
                          <p className="font-black text-slate-900 uppercase tracking-tight text-xl">No Primary Routes Found</p>
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Your main landing pages are missing from the system architecture</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}