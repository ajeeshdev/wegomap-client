"use client";

import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Search, User, ArrowUpRight, ShieldCheck, Sparkles, Zap, Trash2 } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  message?: string;
  status: string;
  source?: string;
  url?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; border: string; dot: string }> = {
  'New':       { label: 'New Inquiry',  bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', dot: '#3b82f6' },
  'Contacted': { label: 'Contacted',    bg: '#fffbeb', color: '#d97706', border: '#fde68a', dot: '#f59e0b' },
  'Quoted':    { label: 'Quoted',       bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', dot: '#8b5cf6' },
  'Booked':    { label: 'Booked',       bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', dot: '#22c55e' },
  'Closed':    { label: 'Closed',       bg: '#f8fafc', color: '#475569', border: '#e2e8f0', dot: '#94a3b8' },
  'Lost':      { label: 'Lost',         bg: '#fff1f2', color: '#e11d48', border: '#fecdd3', dot: '#f43f5e' },
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (data.success) setLeads(data.data);
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
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter((l: Lead) => l._id !== id));
        toast.success("Enquiry deleted");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete enquiry");
    }
  };

  const filteredLeads = leads.filter((lead: Lead) => {
    const matchesSearch =
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.destination || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'website' && (lead.source === 'Website' || !lead.source)) ||
      (activeTab === 'landing' && lead.source === 'Landing Page');

    return matchesSearch && matchesTab;
  });

  const newCount = filteredLeads.filter(l => l.status === 'New').length;
  const bookedCount = filteredLeads.filter(l => l.status === 'Booked').length;
  const inProgressCount = filteredLeads.filter(l => ['Contacted', 'Quoted'].includes(l.status)).length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyCount = filteredLeads.filter(l => {
    const d = new Date(l.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ── Header ── */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title serif">
            <div className="admin-page-title-indicator" />
            Strategic Enquiries
          </h2>
          <p className="admin-page-subtitle">Track and optimize your conversion funnel and customer interactions.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-11 h-12 !rounded-2xl border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/50 rounded-2xl w-fit">
        {[
          { key: 'all',     label: 'Global View' },
          { key: 'website', label: 'Direct Web' },
          { key: 'landing', label: 'Campaigns' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Synchronizing Intel...</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                   <th className="px-8 py-5 text-left w-[25%]">Lead Identity</th>
                   <th className="px-6 py-5 text-left w-[20%]">Secure Contact</th>
                   <th className="px-6 py-5 text-left w-[25%]">Context & Source</th>
                   <th className="px-6 py-5 text-center w-[15%]">Protocol Status</th>
                   <th className="px-8 py-5 text-right w-[15%]">Operation</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // Deduplication Logic: Group by email/phone and show newest
                  const uniqueLeads: Record<string, Lead> = {};
                  filteredLeads.forEach(l => {
                    const key = l.email?.toLowerCase() || l.phone;
                    if (!uniqueLeads[key] || new Date(l.createdAt) > new Date(uniqueLeads[key].createdAt)) {
                      uniqueLeads[key] = l;
                    }
                  });
                  
                  return Object.values(uniqueLeads)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((lead: Lead) => {
                      const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New'];
                      return (
                        <tr key={lead._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                                <User size={20} />
                              </div>
                              <div>
                                <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-[11px] tracking-tight">
                                  {lead.name || 'ANONYMOUS UNIT'}
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                                  <Clock size={10} />
                                  {new Date(lead.createdAt).toLocaleDateString()} · {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-6 border-x border-slate-50/50">
                            <div className="space-y-2">
                               <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                                  <Mail size={12} className="text-blue-500" /> {lead.email}
                               </div>
                               <div className="flex items-center gap-2 text-[11px] font-black text-slate-900 font-mono">
                                  <Phone size={12} className="text-emerald-500" /> {lead.phone}
                               </div>
                            </div>
                          </td>

                          <td className="px-6 py-6 border-r border-slate-50/50">
                            <div className="space-y-2">
                               <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-lg w-fit text-[10px] font-black uppercase text-slate-600">
                                  <MapPin size={10} className="text-red-500" /> {lead.destination || 'GENERAL DISCOVERY'}
                               </div>
                               <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${lead.source === 'Landing Page' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                     {lead.source || 'GLOBAL WEB'}
                                  </span>
                                  {lead.url && (
                                     <a href={lead.url} target="_blank" className="flex items-center gap-1.5 py-0.5 px-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-[9px] font-black uppercase tracking-tighter hover:bg-blue-600 hover:text-white transition-all">
                                        <ArrowUpRight size={10} />
                                        <span className="max-w-[120px] truncate">{lead.destination || 'View Context'}</span>
                                     </a>
                                  )}
                               </div>
                            </div>
                          </td>

                          <td className="px-6 py-6">
                             <div className="flex justify-center">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateStatus(lead._id, e.target.value)}
                                  className="protocol-select"
                                  style={{
                                    padding: '0.4rem 1.75rem 0.4rem 0.75rem',
                                    borderRadius: '12px',
                                    border: `2px solid ${sc.border}`,
                                    background: sc.bg,
                                    color: sc.color,
                                    fontSize: '10px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    appearance: 'none',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${encodeURIComponent(sc.color)}' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.6rem center',
                                    backgroundSize: '0.8rem',
                                  }}
                                >
                                  <option value="New">NEW INQUIRY</option>
                                  <option value="Contacted">CONTACTED</option>
                                  <option value="Quoted">QUOTED</option>
                                  <option value="Booked">BOOKED</option>
                                  <option value="Closed">CLOSED</option>
                                  <option value="Lost">LOST</option>
                                </select>
                             </div>
                          </td>

                          <td className="px-8 py-6 text-right">
                             <button onClick={() => deleteLead(lead._id)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm active:scale-95">
                                <Trash2 size={16} />
                             </button>
                          </td>
                        </tr>
                      );
                    });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Summary Footer ── */}
      {!loading && filteredLeads.length > 0 && (
        <div className="admin-form-card bg-slate-900 border-slate-800 p-10 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-full bg-blue-600/5 -skew-x-12 translate-x-48"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-8">
               <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl group-hover:bg-blue-600 transition-all duration-700 shadow-2xl">
                  <Zap size={32} />
               </div>
               <div>
                  <h4 className="text-white font-black text-xl uppercase tracking-tight mb-2">Performance Intelligence</h4>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-r border-white/10 pr-5 leading-none">
                       <ShieldCheck size={14} className="text-emerald-500" /> High-Intent Verified
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                       <Sparkles size={14} className="text-blue-600" /> Pipeline Optimized
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-12 pr-6">
               <div className="text-right">
                  <h5 className="text-5xl font-black text-white leading-none tracking-tighter">{String(filteredLeads.length).padStart(2, '0')}</h5>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-3">Total Leads</p>
               </div>
               <div className="w-px h-16 bg-white/5"></div>
               <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> New: {newCount}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Booked: {bookedCount}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> In Progress: {inProgressCount}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> This Month: {monthlyCount}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
