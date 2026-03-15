"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, FolderOpen, Layers, MoreVertical, LayoutGrid, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function CategorysAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all items linked to it.')) return;
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
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

  // Deduplicate by name/title to show each unique category only once
  const uniqueData = Array.from(new Map(filteredData.map((item: any) => [
    (item.title || item.name || '').toLowerCase(), 
    item
  ])).values()).sort((a: any, b: any) => {
    const nameA = (a.title || a.name || '').toLowerCase();
    const nameB = (b.title || b.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title text-xl font-bold">
            <div className="admin-page-title-indicator"></div>
            Categories
          </h2>
          <p className="admin-page-subtitle mt-1 text-slate-400">Manage categories for packages, blogs and other content.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="admin-search-container">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <Link href="/admin/categories/create" className="admin-btn admin-btn-primary h-10 px-6 flex-shrink-0">
            <Plus size={18} /> Add Category
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-16 gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading categories...</p>
        </div>
      ) : (
        <div className="admin-table-container shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-6 w-[40%] text-left">Category Name</th>
                  <th className="px-6 w-[30%] text-center">URL Slug</th>
                  <th className="px-6 w-[15%] text-center">Status</th>
                  <th className="px-6 text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uniqueData.map((item: any) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="admin-icon-enclosure">
                           <LayoutGrid size={20} strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="admin-table-text-primary">
                            {item.title || item.name}
                          </div>
                          <div className="admin-table-text-secondary">
                                ID: {String(item._id).toUpperCase().slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-x border-slate-50/50">
                      <div className="flex justify-center">
                        <div className="text-[10px] font-bold text-blue-600 font-mono bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50 w-fit tracking-tighter shadow-sm">
                          /{String(item.slug || 'global')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-slate-50/50">
                      <div className="flex justify-center">
                        <div className="admin-status-badge admin-status-badge-success">
                           <ShieldCheck size={10} /> Active
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Link href={`/admin/categories/${item._id}/edit`} className="admin-action-btn-circle" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="admin-action-btn-circle admin-action-btn-circle-danger" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {uniqueData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-12 bg-slate-50 rounded-[48px] border border-slate-100 text-slate-200">
                           <Layers size={64} strokeWidth={1} className="opacity-10" />
                        </div>
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-[11px]">No categories found</p>
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
      {!loading && uniqueData.length > 0 && (
          <div className="admin-summary-footer">
               <div className="absolute top-0 right-0 w-[600px] h-full bg-blue-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
               <div className="admin-summary-footer-inner">
                   <div className="flex items-center gap-6">
                       <div className="admin-summary-icon-box">
                           <Sparkles size={32} />
                       </div>
                       <div>
                           <h4 className="text-white font-bold text-lg tracking-tight uppercase mb-1">Category Summary</h4>
                           <div className="flex items-center gap-4">
                               <div className="admin-badge-indicator border-r border-white/10 pr-4">
                                  <Clock size={12} className="text-emerald-500" /> Synced
                               </div>
                               <div className="admin-badge-indicator">
                                  <ShieldCheck size={12} className="text-blue-500" /> Valid
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center gap-12 pr-6">
                        <div className="text-right">
                             <h5 className="admin-summary-stat-value">{(uniqueData.length).toString().padStart(2, '0')}</h5>
                             <p className="admin-summary-stat-label">Total Items</p>
                        </div>
                        <div className="w-px h-16 bg-white/10"></div>
                        <div className="grid grid-cols-1 gap-3">
                             <div className="admin-badge-indicator text-blue-400">
                                 <div className="admin-badge-dot bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                 Indexed
                             </div>
                             <div className="admin-badge-indicator">
                                 <Layers size={14} />
                                 Operational
                             </div>
                        </div>
                   </div>
               </div>
          </div>
      )}
    </div>
  );
}