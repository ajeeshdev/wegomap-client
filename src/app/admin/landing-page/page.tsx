"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LandingPagesAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/pages`);
      const json = await res.json();
      if (json.success) {
        // Filter only landing pages that are marked as campaigns
        const landingPages = json.data.filter((p: any) => p.type === 'landing' && p.isCampaign);
        setData(landingPages);
      }
    } catch (err) { 
      console.error(err); 
      toast.error("Failed to load landing pages");
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landing page?")) return;
    try {
      const res = await fetch(`${API_URL}/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Page deleted successfully");
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
            <div className="admin-page-title-indicator"></div>
            Landing pages
          </h2>
          <p className="admin-page-subtitle">Create and manage landing pages for your travel business</p>
        </div>
        <div className="cms-search-bar">
          <div className="cms-search-input-wrap">
            <Search className="cms-search-icon" size={16} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-search-input"
            />
          </div>
          <Link href="/admin/landing-page/create" className="admin-btn admin-btn-primary">
            <Plus size={18} /> New page
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="cms-listing-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="w-10 h-10 border-2 border-slate-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500 mt-3">Loading...</p>
        </div>
      ) : (
        <div className="cms-listing-card">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Page</th>
                  <th>SEO</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ width: 140 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any, index: number) => (
                  <tr key={item._id} className="cms-table-row">
                    <td className="cms-table-cell text-center">
                      <span className="text-xs text-slate-400">{index + 1}</span>
                    </td>
                    <td className="cms-table-cell">
                      <div>
                        <div className="cms-cell-title">{item.title}</div>
                        <Link href={`/${item.slug}`} target="_blank" className="text-xs text-blue-600 hover:underline">
                          /{item.slug}
                        </Link>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="text-xs text-slate-600">{item.seo_title || '—'}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[200px]">{item.seo_description || '—'}</div>
                    </td>
                    <td className="cms-table-cell text-center">
                      <span className={`admin-status-badge ${item.status === 'Published' ? 'admin-status-badge-success' : 'admin-status-badge-warning'}`}>
                        {item.status || 'Published'}
                      </span>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-action-group">
                        <Link href={`/admin/landing-page/${item._id}`} className="cms-btn-icon cms-btn-edit" title="Edit">
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
                    <td colSpan={5} className="cms-table-cell text-center" style={{ padding: '3rem' }}>
                      <p className="text-slate-500 mb-4">No landing pages yet</p>
                      <Link href="/admin/landing-page/create" className="admin-btn admin-btn-primary">
                        Create first page
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
