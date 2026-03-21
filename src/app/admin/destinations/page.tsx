"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Edit, Trash2, Plus, Search, MapPin, Compass, Globe, Sparkles, MoreVertical, Zap, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function DestinationsAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/destinations`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination? This action cannot be undone.')) return;
    try {
      const res = await fetch(`${API_URL}/destinations/${id}`, {
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
    (item.slug || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cms-page-wrapper">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Destinations
          </h2>
          <p className="admin-page-subtitle">Manage all your travel destinations and local guides here.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="admin-search-container">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <Link href="/admin/destinations/create" className="admin-btn admin-btn-primary h-[3.75rem] px-8">
            <Plus size={18} /> New Destination
          </Link>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="cms-empty-state">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="cms-empty-text">Loading destinations...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: '40%' }}>Destination</th>
                  <th style={{ width: '25%' }}>Slug</th>
                  <th style={{ textAlign: 'center', width: '20%' }}>Status</th>
                  <th style={{ textAlign: 'right', width: '15%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr key={item._id} className="cms-table-row">
                    <td className="cms-table-cell">
                      <div className="flex items-center gap-4">
                        <div className="admin-icon-enclosure overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-small h-small object-cover" />
                          ) : (
                            <MapPin size={22} strokeWidth={2} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="cms-cell-title">
                            {item.title || item.name}
                          </div>
                          <div className="cms-meta-badge">
                            <Globe size={10} /> ID: <span className="font-mono">{String(item._id).toUpperCase().slice(-8)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-cat-badge" style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
                        <Compass size={12} />
                        <span className="font-mono lowercase text-[10px]">/{item.slug || 'slug'}</span>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex justify-center">
                        <span className="admin-status-badge admin-status-badge-success">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="cms-table-cell text-right">
                      <div className="cms-action-group justify-end">
                        <Link href={`/admin/destinations/${item._id}/edit`} className="cms-btn-icon cms-btn-edit" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="cms-btn-icon cms-btn-delete" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <div className="cms-empty-state">
                        <div className="cms-empty-icon">
                          <Compass size={64} />
                        </div>
                        <p className="cms-empty-text">No destinations found in your database.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      {!loading && filteredData.length > 0 && (
        <div className="admin-form-card bg-slate-900 border-slate-800 p-8 relative overflow-hidden group mt-10">
          <div className="absolute top-0 right-0 w-[600px] h-full bg-blue-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                <Globe size={32} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg tracking-tight uppercase mb-1">Destinations Summary</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 border-r border-white/10 pr-4">
                    <ShieldCheck size={12} className="text-emerald-500" /> Atlas Synced
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Zap size={12} className="text-blue-500" /> Routing Live
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 pr-6">
              <div className="text-right">
                <h5 className="text-3xl font-black text-white leading-none">{(filteredData.length).toString().padStart(2, '0')}</h5>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Total Nodes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}