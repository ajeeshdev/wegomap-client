"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function HotelLandingPagesAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/pages`);
      
      // Safety check for JSON content-type
      if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
      }

      const json = await res.json();
      if (json.success) {
        // Filter only hotel landing pages
        const hotelPages = json.data.filter((p: any) => p.type === 'hotel');
        setData(hotelPages);
      }
    } catch (err) { 
      console.error(err); 
      toast.error("Failed to load hotel landing pages");
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel landing page?")) return;
    try {
      const res = await fetch(`${API_URL}/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Hotel page deleted successfully");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const filteredData = data.filter((item: any) => 
    (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.slug || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cms-page-wrapper">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator" style={{ backgroundColor: '#c5a059' }}></div>
            Hotel landing pages
          </h2>
          <p className="admin-page-subtitle">Create and manage premium landing pages for hotel properties</p>
        </div>
        <div className="cms-search-bar">
          <div className="cms-search-input-wrap">
            <Search className="cms-search-icon" size={16} />
            <input 
              type="text" 
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-search-input"
            />
          </div>
          <Link href="/admin/hotel-landing-page/create" className="admin-btn admin-btn-primary" style={{ backgroundColor: '#c5a059', borderColor: '#c5a059' }}>
            <Plus size={18} /> New Hotel Page
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="cms-listing-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="w-10 h-10 border-2 border-amber-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500 mt-3">Loading...</p>
        </div>
      ) : (
        <div className="cms-listing-card">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Property Name</th>
                  <th>Route</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any, index: number) => (
                  <tr key={item._id} className="cms-table-row">
                    <td className="cms-table-cell text-center">
                      <span className="text-xs text-slate-400">{index + 1}</span>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                           <Building2 size={20} />
                        </div>
                        <div>
                          <div className="cms-cell-title">{item.title}</div>
                          <div className="text-xs text-slate-400 capitalize">{item.status || 'Published'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                        <Link href={`/hotels/${item.slug}`} target="_blank" className="text-sm text-amber-600 hover:underline font-medium">
                          /hotels/{item.slug}
                        </Link>
                    </td>
                    <td className="cms-table-cell text-center">
                      <span className={`admin-status-badge ${item.status === 'Published' ? 'admin-status-badge-success' : 'admin-status-badge-warning'}`}>
                        {item.status || 'Published'}
                      </span>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-action-group">
                        <Link href={`/admin/hotel-landing-page/${item._id}/edit`} className="cms-btn-icon cms-btn-edit" title="Edit">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="cms-btn-icon cms-btn-delete" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="cms-table-cell text-center" style={{ padding: '4rem' }}>
                      <Building2 size={48} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-slate-500 mb-4">No hotel landing pages created yet</p>
                      <Link href="/admin/hotel-landing-page/create" className="admin-btn admin-btn-primary" style={{ backgroundColor: '#c5a059', borderColor: '#c5a059' }}>
                        Create your first property page
                      </Link>
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
