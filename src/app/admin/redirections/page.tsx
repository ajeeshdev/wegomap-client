"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit2, Save, X, ArrowRight, RotateCcw, ChevronDown, CheckCircle2, AlertCircle, Link as LinkIcon, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Redirect {
  id: string;
  from: string;
  to: string;
  type: '301' | '302';
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export default function RedirectionsPage() {
  const router = useRouter();
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const emptyForm = { from: '', to: '', type: '301' as const, active: true };
  const [newForm, setNewForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState<Partial<Redirect>>({});

  const fetchRedirects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/redirections');
      const data = await res.json();
      if (data.success) setRedirects(data.data);
    } catch (err) {
      toast.error('Failed to load redirections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRedirects(); }, []);

  const handleAdd = async () => {
    if (!newForm.from || !newForm.to) {
      toast.error('From and To paths are required');
      return;
    }
    if (!newForm.from.startsWith('/') && !newForm.from.startsWith('http')) {
      toast.error('From path must start with /');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/redirections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Redirect added!');
        setNewForm(emptyForm);
        setShowAddForm(false);
        fetchRedirects();
      } else {
        toast.error(data.error || 'Failed to add redirect');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/redirections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Redirect updated!');
        setEditingId(null);
        fetchRedirects();
      } else {
        toast.error(data.error || 'Update failed');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this redirect?')) return;
    try {
      const res = await fetch('/api/redirections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Redirect deleted');
        fetchRedirects();
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleToggleActive = async (redirect: Redirect) => {
    try {
      const res = await fetch('/api/redirections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...redirect, active: !redirect.active }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(redirect.active ? 'Redirect disabled' : 'Redirect enabled');
        fetchRedirects();
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            URL Redirections
          </h2>
          <p className="admin-page-subtitle mt-1">Manage 301/302 redirects for old or moved pages. Changes apply instantly.</p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null); }}
          className="admin-btn admin-btn-primary h-10 px-6 flex items-center gap-2"
        >
          <Plus size={16} /> Add Redirect
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="admin-form-card border-2 border-blue-100 bg-blue-50/30 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-6">
            <Plus size={12} /> New Redirect Rule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_100px] gap-4 items-end">
            <div className="admin-form-group !mb-0">
              <label className="admin-form-label text-[10px]">From Path (old URL)</label>
              <input
                type="text"
                value={newForm.from}
                onChange={e => setNewForm({ ...newForm, from: e.target.value })}
                placeholder="/old-page-url"
                className="admin-form-input !h-10 font-mono text-xs text-blue-700"
              />
            </div>
            <div className="admin-form-group !mb-0">
              <label className="admin-form-label text-[10px]">To Path (destination)</label>
              <input
                type="text"
                value={newForm.to}
                onChange={e => setNewForm({ ...newForm, to: e.target.value })}
                placeholder="/new-page-url"
                className="admin-form-input !h-10 font-mono text-xs text-emerald-700"
              />
            </div>
            <div className="admin-form-group !mb-0">
              <label className="admin-form-label text-[10px]">Type</label>
              <select
                value={newForm.type}
                onChange={e => setNewForm({ ...newForm, type: e.target.value as '301' | '302' })}
                className="admin-form-input !h-10 font-bold text-xs"
              >
                <option value="301">301 - Permanent</option>
                <option value="302">302 - Temporary</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleAdd} disabled={saving} className="admin-btn admin-btn-primary h-10 px-4 flex-1 flex items-center justify-center gap-1.5 text-xs">
                <Save size={13} /> {saving ? '...' : 'Save'}
              </button>
              <button onClick={() => { setShowAddForm(false); setNewForm(emptyForm); }} className="admin-btn h-10 w-10 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-rose-500 transition-all">
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2">
            <AlertCircle size={13} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-500">Use <strong>301</strong> for permanently moved pages (best for SEO). Use <strong>302</strong> for temporary redirects that may revert.</p>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Redirects', value: redirects.length, color: 'blue' },
          { label: 'Active', value: redirects.filter(r => r.active).length, color: 'emerald' },
          { label: 'Disabled', value: redirects.filter(r => !r.active).length, color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="admin-form-card !p-4 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              {stat.value}
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Redirects Table */}
      <div className="admin-form-card !p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <LinkIcon size={12} /> Active Redirect Rules
          </h3>
          <button onClick={fetchRedirects} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100">
            <RotateCcw size={12} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Loading...</span>
          </div>
        ) : redirects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <ArrowRight size={28} className="text-slate-200" />
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-black uppercase tracking-widest text-[10px]">No redirects defined</p>
              <p className="text-slate-300 text-xs mt-1 italic">Add one above to get started</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_80px_100px_80px] gap-4 px-6 py-2 bg-slate-50/50">
              {['From', 'To', 'Type', 'Status', 'Actions'].map(h => (
                <span key={h} className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</span>
              ))}
            </div>

            {redirects.map((redirect) => (
              <div key={redirect.id}>
                {editingId === redirect.id ? (
                  // Edit row
                  <div className="p-4 bg-blue-50/30 border-l-4 border-blue-400">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px] gap-3">
                      <input
                        type="text"
                        value={editForm.from || ''}
                        onChange={e => setEditForm({ ...editForm, from: e.target.value })}
                        className="admin-form-input !h-9 font-mono text-xs text-blue-700"
                        placeholder="/from-path"
                      />
                      <input
                        type="text"
                        value={editForm.to || ''}
                        onChange={e => setEditForm({ ...editForm, to: e.target.value })}
                        className="admin-form-input !h-9 font-mono text-xs text-emerald-700"
                        placeholder="/to-path"
                      />
                      <select
                        value={(editForm.type as string) || '301'}
                        onChange={e => setEditForm({ ...editForm, type: e.target.value as '301' | '302' })}
                        className="admin-form-input !h-9 font-bold text-xs"
                      >
                        <option value="301">301 — Permanent</option>
                        <option value="302">302 — Temporary</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => handleUpdate(redirect.id)} disabled={saving} className="admin-btn admin-btn-primary h-8 px-4 text-xs flex items-center gap-1.5">
                        <Save size={12} /> {saving ? '...' : 'Update'}
                      </button>
                      <button onClick={() => setEditingId(null)} className="admin-btn h-8 px-3 bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-1.5">
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View row
                  <div className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_80px_100px_80px] gap-4 px-6 py-4 items-center transition-all hover:bg-slate-50/50 ${!redirect.active ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[11px] font-mono font-bold text-slate-700 truncate">{redirect.from}</span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <ArrowRight size={12} className="text-slate-300 shrink-0" />
                      <span className="text-[11px] font-mono font-bold text-emerald-600 truncate">{redirect.to}</span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${redirect.type === '301' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                        {redirect.type}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleToggleActive(redirect)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${redirect.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                      >
                        {redirect.active ? <><CheckCircle2 size={10} /> Active</> : <><X size={10} /> Disabled</>}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setEditingId(redirect.id); setEditForm(redirect); setShowAddForm(false); }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100 hover:border-blue-200"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(redirect.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all border border-slate-100 hover:border-rose-200"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="admin-form-card bg-slate-900 border-none !p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-2">
            <h4 className="text-[11px] font-black text-white uppercase tracking-widest">How Redirects Work</h4>
            <div className="space-y-1.5">
              {[
                { badge: '301', text: 'Permanent redirect — tells search engines the page has permanently moved. Use for SEO-safe URL changes.' },
                { badge: '302', text: 'Temporary redirect — the old URL may come back. Search engines keep the old URL indexed.' },
                { badge: 'Tip', text: 'Changes apply immediately to all page requests without needing a redeploy.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-white/10 text-blue-300 uppercase tracking-wider shrink-0 mt-0.5">{item.badge}</span>
                  <p className="text-[11px] text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
