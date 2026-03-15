"use client";

import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { Mail, Phone, MapPin, Calendar, Clock, Search, MoreVertical, User, MessageCircle, ArrowUpRight, Zap, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error('Error fetching leads', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map((l: Lead) => l._id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filteredLeads = leads.filter((lead: Lead) => 
    (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.1)]';
      case 'Contacted': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.1)]';
      case 'Quoted': return 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-[0_0_20px_rgba(79,70,229,0.1)]';
      case 'Booked': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
      case 'Closed': return 'bg-slate-50 text-slate-800 border-slate-200';
      case 'Lost': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="cms-page-wrapper">
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Leads & Inquiries
          </h2>
          <p className="admin-page-subtitle">Manage customer inquiries and travel requests.</p>
        </div>
        <div className="admin-search-container">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search inquiries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="cms-empty-state">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="cms-empty-text">Loading inquiries...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: '25%' }}>Customer</th>
                  <th style={{ width: '25%' }}>Contact Info</th>
                  <th style={{ width: '25%' }}>Message</th>
                  <th style={{ textAlign: 'center', width: '15%' }}>Status</th>
                  <th style={{ textAlign: 'right', width: '10%' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead: Lead) => (
                  <tr key={lead._id} className="cms-table-row">
                    <td className="cms-table-cell">
                      <div className="flex items-center gap-4">
                        <div className="admin-icon-enclosure">
                           <User size={20} strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="cms-cell-title" style={{ fontSize: '13px' }}>
                            {lead.name || 'Guest User'}
                          </div>
                          <div className="cms-meta-badge">
                            <Clock size={10} />
                            {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <Mail size={10} style={{ color: '#3b82f6' }} />
                           <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Phone size={10} style={{ color: '#10b981' }} />
                           <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex flex-col gap-2">
                        <div className="cms-cat-badge">
                          <MapPin size={10} style={{ color: '#f43f5e' }} />
                          <span>{lead.destination || 'Global'}</span>
                        </div>
                        {lead.message && (
                          <p style={{ fontSize: '11px', lineHeight: 1.5, color: '#64748b', fontStyle: 'italic' }} title={lead.message}>"{lead.message}"</p>
                        )}
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex justify-center">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          className="cms-table-select"
                          style={{ backgroundColor: lead.status === 'New' ? '#eff6ff' : lead.status === 'Booked' ? '#f0fdf4' : '#f8fafc' }}
                        >
                          <option value="New">New Inquiry</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Booked">Booked</option>
                          <option value="Closed">Closed</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>
                    </td>
                    <td className="cms-table-cell" style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <div className="cms-empty-state">
                        <div className="cms-empty-icon">
                          <User size={64} />
                        </div>
                        <p className="cms-empty-text">No inquiries found matching your filters.</p>
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
      {!loading && filteredLeads.length > 0 && (
          <div className="admin-form-card bg-slate-900 border-slate-800 p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[600px] h-full bg-indigo-500/5 -skew-x-12 translate-x-32 group-hover:translate-x-24 transition-transform duration-1000"></div>
               <div className="relative z-10 flex items-center justify-between">
                   <div className="flex items-center gap-8">
                       <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                           <Zap size={32} />
                       </div>
                       <div>
                           <h4 className="text-white font-bold text-lg tracking-tight uppercase mb-1">Inquiry Overview</h4>
                           <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 border-r border-white/10 pr-4">
                                  <ShieldCheck size={12} className="text-emerald-500" /> Verified
                               </div>
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                  <Sparkles size={12} className="text-amber-500" /> Pipeline Active
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center gap-12 pr-6">
                        <div className="text-right">
                            <h5 className="text-3xl font-black text-white leading-none">{(filteredLeads.length).toString().padStart(2, '0')}</h5>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Total Leads</p>
                        </div>
                        <div className="w-px h-16 bg-white/10"></div>
                        <div className="grid grid-cols-1 gap-1">
                             <div className="flex items-center gap-3 text-[10px] font-bold text-blue-400">
                                 <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                 New Inquiries
                             </div>
                             <div className="flex items-center gap-3 text-[10px] font-bold text-emerald-400">
                                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                 Booked
                             </div>
                             <div className="flex items-center gap-3 text-[10px] font-bold text-amber-400">
                                 <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                 In Progress
                             </div>
                        </div>
                   </div>
               </div>
          </div>
      )}
    </div>
  );
}
