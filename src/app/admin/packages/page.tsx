"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL, getImageUrl } from '@/config';
import { Edit, Trash2, Plus, Search, MapPin, Tag, IndianRupee, Eye, MoreVertical, ShieldCheck, Sparkles, Zap, Clock, Layers } from 'lucide-react';

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`);
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (err) {
      console.error('Error fetching packages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const res = await fetch(`${API_URL}/packages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setPackages(packages.filter((pkg: any) => pkg._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  }

  const filteredPackages = packages.filter((pkg: any) =>
    (pkg.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pkg.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pkg.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pkg.pcode || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cms-page-wrapper">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Packages
          </h2>
          <p className="admin-page-subtitle">Manage your travel packages and itineraries.</p>
        </div>
        <div className="cms-search-bar">
          <div className="cms-search-input-wrap">
            <Search className="cms-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-search-input"
            />
          </div>
          <Link href="/admin/packages/create" className="admin-btn admin-btn-primary h-11 shrink-0">
            <Plus size={18} /> New Package
          </Link>
        </div>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading packages...</p>
        </div>
      ) : (
        <div className="cms-listing-card">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: '35%' }}>Package Details</th>
                  <th style={{ width: '20%' }}>Location</th>
                  <th style={{ width: '15%' }}>Price</th>
                  <th style={{ width: '15%' }}>Category</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((pkg: any) => (
                  <tr key={pkg._id} className="cms-table-row">
                    <td className="cms-table-cell">
                      <div className="cms-cell-product">
                        <div className="cms-cell-image">
                          {pkg.thumb || (pkg.images && pkg.images[0]) ? (
                            <img src={getImageUrl(pkg.thumb || pkg.images[0])} alt="" />
                          ) : (
                            <div className="w-small h-small flex items-center justify-center text-slate-300">
                              <Layers size={24} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="cms-cell-title">
                            {pkg.title}
                          </div>
                          <div className="cms-cell-meta">
                            <span className="cms-meta-badge">
                              <ShieldCheck size={9} style={{ color: '#3b82f6' }} /> #{pkg.pcode || 'UNTYPED'}
                            </span>
                            <span className="cms-meta-badge">
                              <Layers size={9} style={{ color: '#0ea5e9' }} /> {pkg.slug || 'no-slug'}
                            </span>
                            {pkg.onoffer && (
                              <span className="px-1.5 py-0.5 bg-rose-50 text-emerald-500 rounded-lg text-[8px] font-black uppercase tracking-tighter border border-rose-100 flex items-center gap-1">
                                <Zap size={8} className="fill-current" /> Special Offer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-cat-badge">
                        <MapPin size={11} style={{ color: '#f43f5e' }} />
                        <span>{pkg.location || 'GLOBAL CORE'}</span>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-cell-price">
                        <div className="cms-price-current">₹{pkg.price ? Number(pkg.price).toLocaleString() : '0'} <span className="text-[8px] opacity-50">{pkg.per || '/ NODE'}</span></div>
                        {pkg.oldamt && (
                          <div className="cms-price-old">₹{Number(pkg.oldamt).toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <span className="cms-cat-badge">
                        <Tag size={10} /> {pkg.category || 'Platform Core'}
                      </span>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-action-group">
                        <Link href={`/admin/packages/${pkg._id}/edit`} className="cms-btn-icon cms-btn-edit" title="Edit Package">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(pkg._id)} className="cms-btn-icon cms-btn-delete" title="Remove Package">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPackages.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <div className="cms-empty-state">
                        <div className="cms-empty-icon">
                          <Layers size={64} />
                        </div>
                        <p className="cms-empty-text">No packages found in your inventory</p>
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
      {!loading && filteredPackages.length > 0 && (
        <div className="admin-card !p-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-base uppercase tracking-tight">Inventory Summary</h4>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">View your current active package statistics.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Inventory</p>
              <h5 className="text-xl font-bold text-slate-900 leading-none mt-1">{(filteredPackages.length).toString().padStart(2, '0')}</h5>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Inventory Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={10} className="text-blue-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pricing Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
