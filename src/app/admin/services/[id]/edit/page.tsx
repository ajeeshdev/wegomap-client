"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Type, AlignLeft, ShieldCheck, Globe, Clock, Briefcase, Hash, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EditService() {
    const router = useRouter();
    const params = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Globe',
        link: '/contact',
        order: 0,
        status: 'Active'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`${API_URL}/services/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    setFormData(data.data);
                } else {
                    toast.error('Service not found');
                    router.push('/admin/services');
                }
            } catch (err) {
                toast.error('Failed to load service');
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [params.id]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/services/${params.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Service node updated!');
                router.push('/admin/services');
            } else {
                toast.error(data.error || 'Update failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Request failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-32 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Service Logic...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            <div className="admin-page-header">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.push('/admin/services')} className="admin-back-btn">
                        <ArrowLeft size={22} />
                    </button>
                    <div className="min-w-0">
                        <h2 className="admin-page-title">
                            <div className="admin-page-title-indicator"></div>
                            Modify Service Node
                        </h2>
                        <p className="admin-page-subtitle mt-1 text-slate-400">Updating the parameters of an existing service</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin/services')} className="admin-btn admin-btn-secondary">
                        Discard
                    </button>
                    <button 
                        onClick={() => handleSubmit()} 
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-12 px-8"
                    >
                        <ShieldCheck size={20} /> {saving ? 'Syncing...' : 'Save Revisions'}
                    </button>
                </div>
            </div>

            <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 340px' }}>
                <div className="space-y-8">
                    <div className="admin-form-card">
                        <h3 className="admin-form-section-title">
                            <div className="admin-section-icon admin-section-icon--blue"></div>
                            Service Specifications
                        </h3>

                        <div className="space-y-8">
                            <div className="admin-form-group">
                                <label className="admin-form-label flex items-center gap-3 mb-3">
                                    <Type size={14} className="text-blue-500" /> Service Title
                                </label>
                                <input 
                                    type="text" 
                                    value={formData.title} 
                                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                                    className="admin-form-input text-xl font-black uppercase tracking-tight h-14" 
                                    placeholder="e.g. INTERNATIONAL TOURS" 
                                />
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label flex items-center gap-3 mb-3">
                                    <AlignLeft size={14} className="text-amber-500" /> Service Description
                                </label>
                                <textarea 
                                    value={formData.description} 
                                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                                    className="admin-form-textarea font-bold text-slate-600 leading-relaxed" 
                                    placeholder="Describe your service in detail..." 
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="admin-form-group">
                                    <label className="admin-form-label flex items-center gap-3 mb-3">
                                        <Briefcase size={14} className="text-purple-500" /> Icon Name (Lucide)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.icon} 
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })} 
                                        className="admin-form-input font-bold" 
                                        placeholder="e.g. Globe, Plane, Briefcase" 
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-form-label flex items-center gap-3 mb-3">
                                        <Globe size={14} className="text-blue-500" /> Redirect Path
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.link} 
                                        onChange={e => setFormData({ ...formData, link: e.target.value })} 
                                        className="admin-form-input font-mono text-xs" 
                                        placeholder="/contact" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-form-sidebar">
                    <div className="admin-form-card p-8 space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            Node Management
                        </h4>
                        
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label flex items-center gap-3 mb-3">
                                    <Hash size={14} className="text-slate-500" /> Display Order
                                </label>
                                <input 
                                    type="number" 
                                    value={formData.order} 
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} 
                                    className="admin-form-input font-black text-center" 
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-500">
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-slate-700 block text-nowrap">Node Status</label>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Visibility</span>
                                    </div>
                                </div>
                                <select 
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    className="bg-transparent font-black text-[10px] uppercase outline-none text-blue-600 appearance-none cursor-pointer"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Draft</option>
                                </select>
                            </div>

                             {/* Decorative Sections Removed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
