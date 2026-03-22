"use client";

import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { Mail, Phone, MapPin, Clock, Search, User, ArrowUpRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

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

  return (
    <div className="cms-page-wrapper">
      {/* ── Header ── */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator" />
            Enquiries
          </h2>
          <p className="admin-page-subtitle">Manage customer inquiries and travel requests.</p>
        </div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
          <Search
            size={15}
            style={{
              position: 'absolute', left: '0.875rem',
              top: '50%', transform: 'translateY(-50%)',
              color: '#94a3b8', pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search enquiries…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              height: '2.5rem',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: '#0f172a',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[
          { key: 'all',     label: 'All Enquiries' },
          { key: 'website', label: 'Website' },
          { key: 'landing', label: 'Landing Page' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 700,
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              background: activeTab === tab.key ? '#0f172a' : '#fff',
              color:      activeTab === tab.key ? '#fff'    : '#64748b',
              boxShadow:  activeTab === tab.key
                ? '0 4px 12px rgba(15,23,42,0.25)'
                : '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="cms-empty-state">
          <div style={{
            width: '2.5rem', height: '2.5rem',
            border: '3px solid #fee2e2',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p className="cms-empty-text" style={{ marginTop: '1rem' }}>Loading enquiries…</p>
        </div>
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {[
                    { label: 'Customer',             w: '22%' },
                    { label: 'Contact Info',          w: '22%' },
                    { label: 'Requirement & Source',  w: '28%' },
                    { label: 'Status',                w: '17%', center: true },
                    { label: 'Date',                  w: '11%', right: true },
                  ].map(col => (
                    <th
                      key={col.label}
                      style={{
                        padding: '0.625rem 1rem',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textAlign: col.center ? 'center' : col.right ? 'right' : 'left',
                        width: col.w,
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead: Lead) => {
                  const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New'];
                  return (
                    <tr
                      key={lead._id}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      {/* Customer */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '2.5rem', height: '2.5rem', borderRadius: '10px',
                            background: '#f1f5f9',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#94a3b8', flexShrink: 0,
                            border: '1px solid #e2e8f0',
                          }}>
                            <User size={16} strokeWidth={2} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>
                              {lead.name || 'Guest User'}
                            </div>
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                              fontSize: '0.6875rem', fontWeight: 600, color: '#94a3b8',
                              marginTop: '0.2rem',
                            }}>
                              <Clock size={10} />
                              {new Date(lead.createdAt).toLocaleTimeString([], {
                                hour: '2-digit', minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={11} style={{ color: '#3b82f6', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                              {lead.email}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Phone size={11} style={{ color: '#10b981', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#334155' }}>
                              {lead.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Requirement & Source */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            background: '#f1f5f9', color: '#475569',
                            fontSize: '0.6875rem', fontWeight: 600,
                            padding: '0.2rem 0.5rem', borderRadius: '6px',
                            width: 'fit-content',
                          }}>
                            <MapPin size={10} style={{ color: '#f43f5e' }} />
                            {lead.destination || 'Global'}
                          </div>
                          {lead.message && (
                            <p style={{
                              fontSize: '0.6875rem', lineHeight: 1.5,
                              color: '#64748b', fontStyle: 'italic', margin: 0,
                            }} title={lead.message}>
                              "{lead.message}"
                            </p>
                          )}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.35rem',
                            paddingTop: '0.25rem', marginTop: '0.1rem',
                            borderTop: '1px solid #f1f5f9',
                          }}>
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              backgroundColor: lead.source === 'Landing Page' ? '#8b5cf6' : '#3b82f6',
                              flexShrink: 0,
                            }} />
                            <span style={{
                              fontSize: '0.625rem', fontWeight: 700,
                              textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.04em',
                            }}>
                              {lead.source || 'Website'}
                            </span>
                            {lead.url && (
                              <a
                                href={lead.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: '2px',
                                  color: '#f97316', fontSize: '0.625rem', fontWeight: 600,
                                  textDecoration: 'none', marginLeft: '0.25rem',
                                }}
                              >
                                <ArrowUpRight size={10} />
                                <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {lead.url.replace(/https?:\/\/[^/]+/, '')}
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          style={{
                            padding: '0.35rem 1.75rem 0.35rem 0.6rem',
                            borderRadius: '8px',
                            border: `1.5px solid ${sc.border}`,
                            background: sc.bg,
                            color: sc.color,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: 'inherit',
                            outline: 'none',
                            cursor: 'pointer',
                            minWidth: '9rem',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.5rem center',
                            backgroundSize: '0.75rem',
                          }}
                        >
                          <option value="New">New Inquiry</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Booked">Booked</option>
                          <option value="Closed">Closed</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>
                          {new Date(lead.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={5}>
                      <div className="cms-empty-state">
                        <div className="cms-empty-icon"><User size={48} /></div>
                        <p className="cms-empty-text">No enquiries match your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Summary Footer ── */}
      {!loading && filteredLeads.length > 0 && (
        <div style={{
          background: '#0f172a',
          borderRadius: '14px',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '0.25rem',
        }}>
          {/* Decorative skew */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '40%', height: '100%',
            background: 'rgba(255,107,53,0.06)',
            transform: 'skewX(-12deg) translateX(20%)',
            pointerEvents: 'none',
          }} />

          {/* Left – label + badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}>
            <div style={{
              width: '3rem', height: '3rem', borderRadius: '12px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0,
            }}>
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{
                margin: 0, fontSize: '0.75rem', fontWeight: 800,
                color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Inquiry Overview
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.35rem' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.6875rem', fontWeight: 700, color: '#64748b',
                  paddingRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <ShieldCheck size={11} style={{ color: '#34d399' }} /> Verified
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.6875rem', fontWeight: 700, color: '#64748b',
                }}>
                  <Sparkles size={11} style={{ color: '#fbbf24' }} /> Pipeline Active
                </div>
              </div>
            </div>
          </div>

          {/* Right – stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative',
          }}>
            {/* Total */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                {String(filteredLeads.length).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.5625rem', fontWeight: 700, color: '#475569',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.35rem',
              }}>
                Total Leads
              </div>
            </div>

            <div style={{ width: '1px', height: '3rem', background: 'rgba(255,255,255,0.08)' }} />

            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {[
                { dot: '#f97316', label: `New Inquiries`, count: newCount },
                { dot: '#22c55e', label: 'Booked',         count: bookedCount },
                { dot: '#fbbf24', label: 'In Progress',    count: inProgressCount },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.6875rem', fontWeight: 700,
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: item.dot, flexShrink: 0,
                  }} />
                  <span style={{ color: '#94a3b8' }}>{item.label}</span>
                  <span style={{ color: '#e2e8f0', marginLeft: 'auto', paddingLeft: '1rem' }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
