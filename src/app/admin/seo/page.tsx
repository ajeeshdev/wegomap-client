"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Sparkles } from 'lucide-react';

export default function SEOAdmin() {
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

  const filteredData = data.filter((item: any) => {
    const title = (item.title || item.name || '').toLowerCase();
    const slug = (item.slug || '').toLowerCase();
    
    // Simple filter to exclude clearly package/event related landing pages if any
    // though most in Page collection are probably static pages
    const excludes = ['package', 'event'];
    const matchesExclude = excludes.some(exc => title.includes(exc) || slug.includes(exc));
    
    return !matchesExclude && title.includes(searchTerm.toLowerCase());
  });

  // Sort major pages to the top
  const majorSlugs = ['home', 'about', 'services', 'contact', 'blogs', 'tours'];
  const sortedData = [...filteredData].sort((a: any, b: any) => {
    const aIndex = majorSlugs.indexOf(a.slug);
    const bIndex = majorSlugs.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return (a.title || '').localeCompare(b.title || '');
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title text-2xl font-bold flex items-center gap-2">
            <Globe className="text-blue-600" size={24} />
            SEO Management
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-500">Optimize search engine presence for your main website pages</p>
        </div>
        <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search pages..." 
                className="admin-form-input pl-10 w-64 h-11 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm mt-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Synchronizing SEO Data...</p>
        </div>
      ) : (
        <div className="admin-table-container bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="admin-table w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-4 w-16 text-[10px] uppercase tracking-wider text-slate-400 font-bold">#</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Page / Slug</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold">SEO Title</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</th>
                  <th className="px-8 py-4 text-right w-32 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedData.map((item: any, index: number) => {
                    const hasSEO = item.seo_title && (item.seo_description || item.seo_meta);
                    return (
                        <tr key={item._id} className="group hover:bg-orange-50/30 transition-colors">
                            <td className="px-8 py-5 text-slate-400 text-xs font-medium">{index + 1}</td>
                            <td className="px-6 py-5">
                            <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                {item.title || item.slug}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 font-mono">/{item.slug}</div>
                            </td>
                            <td className="px-6 py-5">
                            <div className="text-xs text-slate-600 line-clamp-1 max-w-xs font-medium italic">
                                {item.seo_title || <span className="text-slate-300">Not configured</span>}
                            </div>
                            </td>
                            <td className="px-6 py-5">
                                {hasSEO ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">
                                        <Sparkles size={10} /> Optimized
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold border border-slate-100">
                                        Incomplete
                                    </span>
                                )}
                            </td>
                            <td className="px-8 py-5 text-right">
                            <Link 
                                href={`/admin/seo/${item._id}/edit`} 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 text-xs font-bold"
                            >
                                <Globe size={14} /> Configure
                            </Link>
                            </td>
                        </tr>
                    );
                })}
                {sortedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-slate-200">
                          <Globe size={48} />
                        </div>
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">No SEO pages found</p>
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
