"use client";

import { useEffect, useState, useRef } from 'react';
import { API_URL, UPLOADS_URL } from '@/config';
import {
  User, Mail, Phone, ShieldCheck, ShieldAlert, Search,
  UserCheck, UserX, Crown, Users, Upload, Trash2, FileText,
  X, Plus, Eye, Calendar
} from 'lucide-react';

interface BookingPdf {
  _id: string;
  url: string;
  label: string;
  uploadedAt: string;
}

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}

const roleColors: Record<string, { bg: string; color: string; border: string }> = {
  admin:   { bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
  manager: { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' },
  guide:   { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' },
  user:    { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
};

const roleIcons: Record<string, any> = {
  admin: Crown, manager: ShieldCheck, guide: UserCheck, user: User,
};

// ── PDF upload/manage modal ──────────────────────────────────
function PdfModal({
  user,
  onClose,
}: {
  user: UserRecord;
  onClose: () => void;
}) {
  const [pdfs, setPdfs] = useState<BookingPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [label, setLabel] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch(`${API_URL}/bookings/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => { if (d.success) setPdfs(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user._id]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('pdf', file);
    fd.append('label', label || file.name.replace('.pdf', ''));
    const res = await fetch(`${API_URL}/bookings/upload/${user._id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (data.success) {
      setPdfs(data.data);
      setFile(null);
      setLabel('');
    }
    setUploading(false);
  };

  const handleDelete = async (pdfId: string) => {
    if (!confirm('Delete this PDF?')) return;
    const res = await fetch(`${API_URL}/bookings/${user._id}/pdf/${pdfId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setPdfs(data.data);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px',
        width: '100%', maxWidth: '560px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          background: '#0f172a',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'rgba(255,107,53,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FileText size={18} style={{ color: '#ff6b35' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fff' }}>
                Booking Documents
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 600 }}>
                {user.name} · {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
              color: '#94a3b8', borderRadius: '8px', padding: '0.4rem',
              display: 'flex', alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Upload area */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              const dropped = e.dataTransfer.files[0];
              if (dropped?.type === 'application/pdf') setFile(dropped);
            }}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? '#ff6b35' : file ? '#22c55e' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? '#fff7f5' : file ? '#f0fdf4' : '#fafafa',
              transition: 'all 0.2s ease',
              marginBottom: '1rem',
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              style={{ display: 'none' }}
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            {file ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#166534' }}>
                  {file.name}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); setFile(null); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', display: 'flex', alignItems: 'center' }}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={24} style={{ color: '#94a3b8', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#475569' }}>
                  Click or drop a PDF here
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Max 20 MB · PDF only
                </div>
              </>
            )}
          </div>

          {/* Label input */}
          <input
            type="text"
            placeholder="Label (e.g. Kerala Tour – March 2026)"
            value={label}
            onChange={e => setLabel(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '0.625rem 0.875rem',
              border: '1.5px solid #e2e8f0', borderRadius: '10px',
              fontSize: '0.8125rem', fontWeight: 500, color: '#0f172a',
              outline: 'none', marginBottom: '0.875rem', fontFamily: 'inherit',
            }}
          />

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            style={{
              width: '100%', padding: '0.75rem',
              borderRadius: '10px', border: 'none', cursor: !file ? 'not-allowed' : 'pointer',
              background: !file ? '#f1f5f9' : 'linear-gradient(135deg, #ff7043, #ff6b35)',
              color: !file ? '#94a3b8' : '#fff',
              fontSize: '0.875rem', fontWeight: 800, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: file ? '0 4px 15px rgba(255,107,53,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {uploading ? (
              <>
                <span style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
                Uploading…
              </>
            ) : (
              <><Plus size={16} /> Upload PDF</>
            )}
          </button>

          {/* PDF list */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
              Uploaded Documents ({pdfs.length})
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8125rem', padding: '1rem' }}>Loading…</div>
            ) : pdfs.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '1.5rem',
                background: '#f8fafc', borderRadius: '10px',
                color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 600,
              }}>
                No documents uploaded yet
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pdfs.map(pdf => (
                  <div key={pdf._id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: '#f8fafc', borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}>
                    <FileText size={16} style={{ color: '#f97316', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {pdf.label}
                      </div>
                      <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={9} />
                        {new Date(pdf.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                      <a
                        href={`${UPLOADS_URL}${pdf.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 30, height: 30, borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#eff6ff', color: '#2563eb', textDecoration: 'none',
                          border: '1px solid #bfdbfe',
                        }}
                      >
                        <Eye size={13} />
                      </a>
                      <button
                        onClick={() => handleDelete(pdf._id)}
                        style={{
                          width: 30, height: 30, borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#fff1f2', color: '#e11d48',
                          border: '1px solid #fecdd3', cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function CustomersAdmin() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterVerified, setFilterVerified] = useState('all');
  const [pdfUser, setPdfUser] = useState<UserRecord | null>(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone || '').includes(searchTerm);
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchVerified =
      filterVerified === 'all' ||
      (filterVerified === 'verified' && u.isEmailVerified) ||
      (filterVerified === 'unverified' && !u.isEmailVerified);
    return matchSearch && matchRole && matchVerified;
  });

  const totalVerified = users.filter(u => u.isEmailVerified).length;
  const totalUnverified = users.filter(u => !u.isEmailVerified).length;

  return (
    <div className="cms-page-wrapper">
      {pdfUser && <PdfModal user={pdfUser} onClose={() => setPdfUser(null)} />}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator" />
            Customers
          </h2>
          <p className="admin-page-subtitle">Manage customers and upload booking documents.</p>
        </div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
          <Search size={15} style={{
            position: 'absolute', left: '0.875rem', top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%', height: '2.5rem', boxSizing: 'border-box',
              paddingLeft: '2.5rem', paddingRight: '1rem',
              background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: '10px', fontSize: '0.8125rem',
              fontWeight: 500, color: '#0f172a', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Customers', value: users.length, icon: Users, color: '#f97316' },
          { label: 'Verified', value: totalVerified, icon: ShieldCheck, color: '#10b981' },
          { label: 'Unverified', value: totalUnverified, icon: ShieldAlert, color: '#f43f5e' },
          { label: 'Admins / Managers', value: users.filter(u => u.role === 'admin' || u.role === 'manager').length, icon: Crown, color: '#8b5cf6' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="admin-form-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {['all', 'user', 'guide', 'manager', 'admin'].map(r => (
          <button key={r} onClick={() => setFilterRole(r)} style={{
            padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontSize: '0.75rem', fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.2s',
            background: filterRole === r ? '#0f172a' : '#fff',
            color: filterRole === r ? '#fff' : '#64748b',
            boxShadow: filterRole === r ? '0 4px 12px rgba(15,23,42,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
        <div style={{ width: 1, height: 20, background: '#e2e8f0' }} />
        {['all', 'verified', 'unverified'].map(v => (
          <button key={v} onClick={() => setFilterVerified(v)} style={{
            padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontSize: '0.75rem', fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.2s',
            background: filterVerified === v ? '#0f172a' : '#fff',
            color: filterVerified === v ? '#fff' : '#64748b',
            boxShadow: filterVerified === v ? '0 4px 12px rgba(15,23,42,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            {v === 'all' ? 'All Status' : v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="cms-empty-state">
          <div style={{
            width: '2.5rem', height: '2.5rem', border: '3px solid #fee2e2',
            borderTopColor: 'var(--primary)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p className="cms-empty-text" style={{ marginTop: '1rem' }}>Loading customers…</p>
        </div>
      ) : (
        <div style={{
          background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
          overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {[
                    { label: 'Customer',     w: '28%' },
                    { label: 'Contact',      w: '24%' },
                    { label: 'Role',         w: '13%', center: true },
                    { label: 'Email Status', w: '14%', center: true },
                    { label: 'Joined',       w: '12%', right: true },
                    { label: 'Actions',      w: '9%',  center: true },
                  ].map(col => (
                    <th key={col.label} style={{
                      padding: '0.625rem 1rem',
                      fontSize: '0.6875rem', fontWeight: 700, color: '#64748b',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      textAlign: col.center ? 'center' : col.right ? 'right' : 'left',
                      width: col.w,
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const RoleIcon = roleIcons[u.role] || User;
                  const rc = roleColors[u.role] || roleColors.user;
                  return (
                    <tr
                      key={u._id}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                      onMouseLeave={e => (e.currentTarget.style.background = '')}
                    >
                      {/* Customer */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '2.5rem', height: '2.5rem', borderRadius: '10px',
                            background: '#f1f5f9', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#94a3b8', flexShrink: 0,
                            border: '1px solid #e2e8f0',
                          }}>
                            <RoleIcon size={16} strokeWidth={2} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                            <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.15rem' }}>
                              #{u._id.slice(-6).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={11} style={{ color: '#3b82f6', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>{u.email}</span>
                          </div>
                          {u.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Phone size={11} style={{ color: '#10b981', flexShrink: 0 }} />
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#334155' }}>{u.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block', padding: '0.2rem 0.75rem',
                          borderRadius: '8px', fontSize: '0.6875rem', fontWeight: 800,
                          textTransform: 'capitalize',
                          background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`,
                        }}>
                          {u.role}
                        </span>
                      </td>

                      {/* Email status */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        {u.isEmailVerified ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '0.2rem 0.75rem', borderRadius: 8, fontSize: 11, fontWeight: 800, background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
                            <ShieldCheck size={10} /> Verified
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '0.2rem 0.75rem', borderRadius: 8, fontSize: 11, fontWeight: 800, background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
                            <ShieldAlert size={10} /> Pending
                          </span>
                        )}
                      </td>

                      {/* Joined */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>
                          {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                          {new Date(u.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '0.875rem 1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        <button
                          onClick={() => setPdfUser(u)}
                          title="Upload / Manage Booking PDFs"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '8px', border: '1.5px solid #fde68a',
                            background: '#fef3c7', color: '#92400e',
                            fontSize: '0.6875rem', fontWeight: 800, cursor: 'pointer',
                            fontFamily: 'inherit', transition: 'all 0.2s',
                          }}
                        >
                          <FileText size={12} /> PDF
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="cms-empty-state">
                        <div className="cms-empty-icon"><UserX size={48} /></div>
                        <p className="cms-empty-text">No customers match your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
