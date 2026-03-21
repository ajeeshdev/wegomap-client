"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Edit, Trash2, Plus, Search, HelpCircle, MessageSquare, List, MoreVertical, Zap, Clock, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function FAQsAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/faqs`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    try {
      const res = await fetch(`${API_URL}/faqs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newFaq)
      });
      const json = await res.json();
      if (json.success) {
        setData([json.data, ...data]);
        setNewFaq({ question: '', answer: '', category: 'General' });
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      if (json.success) {
        setData(data.filter((item: any) => item._id !== id));
      }
    } catch (err) { console.error('Failed to delete', err); }
  }

  const handleUpdateLocal = (index: number, field: string, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await Promise.all(data.map(faq => 
        fetch(`${API_URL}/faqs/${faq._id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(faq)
        })
      ));
      alert('All changes saved successfully!');
    } catch (err) { 
      console.error(err);
      alert('Failed to save some changes.');
    } finally {
      setSaving(false);
    }
  };

    return (
        <div className="cms-page-wrapper">
            {/* Create Section */}
            <div className="cms-listing-card relative">
                <div className="p-4 pb-0 border-b border-slate-50">
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                        Add New FAQ
                    </h3>
                </div>
                <form onSubmit={handleCreate} className="cms-form-grid">
                    <div className="cms-form-group">
                        <label className="cms-label">Category</label>
                        <select 
                            value={newFaq.category}
                            onChange={e => setNewFaq({...newFaq, category: e.target.value})}
                            className="cms-select"
                        >
                            <option value="General">General Inquiries</option>
                            <option value="Booking & Packages">Booking & Packages</option>
                            <option value="Payments & Pricing">Payments & Pricing</option>
                            <option value="Cancellations & Refunds">Cancellations & Refunds</option>
                            <option value="Travel & Accommodation">Travel & Accommodation</option>
                        </select>
                    </div>
                    <div className="cms-form-group lg:col-span-2">
                        <label className="cms-label">Question</label>
                        <input 
                            type="text" 
                            placeholder="Enter the question..." 
                            value={newFaq.question}
                            onChange={e => setNewFaq({...newFaq, question: e.target.value})}
                            className="cms-input"
                        />
                    </div>
                    <div className="cms-form-group lg:col-span-3">
                        <label className="cms-label">Answer</label>
                        <div className="flex gap-4 items-center">
                            <textarea 
                                placeholder="Enter the answer..." 
                                value={newFaq.answer}
                                onChange={e => setNewFaq({...newFaq, answer: e.target.value})}
                                className="cms-textarea !min-h-[60px]"
                                rows={2}
                            />
                            <button 
                                type="submit"
                                className="admin-btn admin-btn-primary h-10 px-6 shrink-0 flex items-center justify-center"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#000]">Add FAQ</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Manage Section */}
            <div className="cms-section-header">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-md">
                        <Layers size={16} />
                    </div>
                    <div>
                        <h3 className="cms-section-title">FAQ List</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{data.length} Total items</p>
                    </div>
                </div>
                <button 
                    onClick={handleSaveAll}
                    disabled={saving || loading}
                    className="admin-btn admin-btn-primary h-10 px-6 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                            <span className="text-[10px]">Saving...</span>
                        </>
                    ) : (
                        <>
                            <ShieldCheck size={14} /> 
                            <span className="text-[10px]">Save Changes</span>
                        </>
                    )}
                </button>
            </div>
            
            <div className="cms-listing-card">
                {loading ? (
                    <div className="p-16 flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Loading...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead className="cms-table-header">
                                <tr>
                                    <th style={{ width: '80px', textAlign: 'center' }}>#</th>
                                    <th style={{ width: '240px' }}>Category</th>
                                    <th>Content</th>
                                    <th style={{ textAlign: 'center', width: '120px' }}>Status</th>
                                    <th style={{ textAlign: 'center', width: '120px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((faq, index) => (
                                    <tr key={faq._id} className="cms-table-row">
                                        <td className="cms-table-cell" style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 900, color: '#CBD5E1', fontFamily: 'monospace' }}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className="cms-table-cell" style={{ verticalAlign: 'top'}}>
                                            <select 
                                                value={faq.category || 'General'}
                                                onChange={e => handleUpdateLocal(index, 'category', e.target.value)}
                                                className="cms-table-select"
                                            >
                                                <option value="General">General</option>
                                                <option value="Booking & Packages">Booking & Packages</option>
                                                <option value="Payments & Pricing">Payments & Pricing</option>
                                                <option value="Cancellations & Refunds">Cancellations & Refunds</option>
                                                <option value="Travel & Accommodation">Travel & Accommodation</option>
                                            </select>
                                        </td>
                                        <td className="cms-table-cell">
                                            <div className="flex flex-col gap-3">
                                                <textarea 
                                                    value={faq.question || ''}
                                                    onChange={e => handleUpdateLocal(index, 'question', e.target.value)}
                                                    className="cms-table-textarea font-bold !text-[13px] !text-slate-900 !py-2 !min-h-[40px]"
                                                    placeholder="Question"
                                                    rows={1}
                                                />
                                                <textarea 
                                                    value={faq.answer || ''}
                                                    onChange={e => handleUpdateLocal(index, 'answer', e.target.value)}
                                                    className="cms-table-textarea text-slate-500 !text-[12px] !py-2 !min-h-[80px]"
                                                    placeholder="Answer"
                                                    rows={3}
                                                />
                                            </div>
                                        </td>
                                        <td className="cms-table-cell">
                                            <div className="flex flex-col items-center gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    checked={faq.status === 'published'}
                                                    onChange={e => handleUpdateLocal(index, 'status', e.target.checked ? 'published' : 'draft')}
                                                    className="cms-toggle"
                                                />
                                               
                                            </div>
                                        </td>
                                        <td className="cms-table-cell">
                                            <div className="flex justify-center">
                                                <button 
                                                    onClick={() => handleDelete(faq._id)}
                                                    className="cms-btn-icon cms-btn-delete shadow-sm"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}