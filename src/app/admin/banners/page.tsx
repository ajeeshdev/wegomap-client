"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Image as ImageIcon, Layout, ArrowLeft, Clock } from 'lucide-react';

export default function BannersAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/banners`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Banner?')) return;
    try {
      const res = await fetch(`${API_URL}/banners/${id}`, {
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
    (item.pageName || item.pagePath || item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Inner Page Banners
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Update banner images and headlines for each site node</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search page banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-10 h-11 text-xs"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-20 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading banners...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item: any) => (
            <div key={item._id} className="admin-form-card admin-form-card--tile group">

              <div className="admin-tile-preview">
                {item.image ? (
                  <img src={item.image} alt="Banner" className="admin-tile-image" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}

                <div className="admin-tile-overlay"></div>

                <div className="absolute inset-x-6 bottom-6">
                  <div className="mb-2 bg-blue-600 w-fit px-2 py-1 rounded text-[9px] text-white font-bold uppercase tracking-wider">
                    {item.pageName}
                  </div>
                  <h3 className="text-white font-bold text-xl leading-tight line-clamp-2">{item.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="admin-space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Layout size={12} className="text-blue-500" /> Path
                    </div>
                    <div className="text-[10px] font-bold text-slate-900 border-b border-blue-200">
                      {item.pagePath}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ArrowLeft size={12} className="text-rose-500" /> Back Opt
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold border ${item.showBack ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {item.showBack ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <Link href={`/admin/banners/${item._id}/edit`} className="admin-tile-cta">
                    <ImageIcon size={14} /> Update Media Content
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="col-span-full py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-4">
                <div className="p-8 bg-white rounded-2xl border border-slate-100 text-slate-200">
                  <Layout size={48} />
                </div>
                <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">No banners found</p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
