"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, MoreVertical, Edit, Trash2, ExternalLink, Briefcase, ChevronRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    order: number;
    status: string;
}

export default function ServicesAdminPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const fetchServices = async () => {
        try {
            const res = await fetch(`${API_URL}/services`);
            if (!res.headers.get('content-type')?.includes('application/json')) {
                throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
            }
            const data = await res.json();
            if (data.success) {
                setServices(data.data);
            }
        } catch (err) {
            console.error('Error fetching services:', err);
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const res = await fetch(`${API_URL}/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!res.headers.get('content-type')?.includes('application/json')) {
                throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
            }
            const data = await res.json();
            if (data.success) {
                toast.success('Service deleted');
                setServices(services.filter(s => s._id !== id));
            } else {
                toast.error(data.error || 'Delete failed');
            }
        } catch (err) {
            toast.error('Request failed');
        }
    };

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="cms-page-wrapper">
            {/* Page Header */}
            <div className="admin-page-header">
                <div className="min-w-0">
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator"></div>
                        Company Services
                    </h2>
                    <p className="admin-page-subtitle">Manage the global service nodes displayed on the services page</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="admin-search-container">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find a service node..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="admin-search-input" 
                        />
                    </div>
                    <button 
                        onClick={() => router.push('/admin/services/create')}
                        className="admin-btn admin-btn-primary h-[3.75rem] px-8"
                    >
                        <Plus size={20} /> Deploy Service
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                {[
                    { label: 'Active Services', val: services.filter(s => s.status === 'Active').length, icon: <Zap size={22} />, color: '#10b981', bg: '#f0fdf4' },
                    { label: 'Draft Services', val: services.filter(s => s.status === 'Inactive').length, icon: <Edit size={22} />, color: '#f59e0b', bg: '#fffbeb' },
                    { label: 'System Health', val: '100%', icon: <ShieldCheck size={22} />, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Total Volume', val: services.length, icon: <Briefcase size={22} />, color: '#8b5cf6', bg: '#f5f3ff' },
                ].map((stat, i) => (
                    <div key={i} className="admin-card !p-6 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: stat.bg, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 block">{stat.label}</span>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.val}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* List Table */}
            <div className="admin-table-container">
                {loading ? (
                    <div className="cms-empty-state">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="cms-empty-text">Loading Service Modules...</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead className="cms-table-header">
                            <tr>
                                <th style={{ width: '35%' }}>Service Info</th>
                                <th style={{ width: '25%' }}>Path & Connectivity</th>
                                <th style={{ textAlign: 'center', width: '12%' }}>Sequence</th>
                                <th style={{ textAlign: 'center', width: '15%' }}>Status</th>
                                <th style={{ textAlign: 'right', width: '13%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map((service) => (
                                <tr key={service._id} className="cms-table-row">
                                    <td className="cms-table-cell">
                                        <div className="flex items-center gap-5">
                                            <div className="admin-icon-enclosure overflow-hidden">
                                                {service.icon ? (
                                                    <span className="text-xl">{service.icon}</span>
                                                ) : (
                                                    <Briefcase size={22} />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="cms-cell-title">{service.title}</h4>
                                                <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }} className="line-clamp-1">{service.description || 'No description node defined'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="cms-table-cell">
                                        <div className="cms-cat-badge" style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
                                            <Globe size={10} />
                                            <span className="font-mono text-[10px]">{service.link || '/services'}</span>
                                        </div>
                                    </td>
                                    <td className="cms-table-cell text-center">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-900 text-xs mx-auto border border-slate-100">
                                            {service.order}
                                        </div>
                                    </td>
                                    <td className="cms-table-cell">
                                        <div className="flex justify-center">
                                            <span className={`admin-status-badge ${
                                                service.status === 'Active' 
                                                ? 'admin-status-badge-success' 
                                                : 'admin-status-badge-warning'
                                            }`}>
                                                {service.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="cms-table-cell text-right">
                                        <div className="cms-action-group justify-end">
                                            <button 
                                                onClick={() => router.push(`/admin/services/${service._id}/edit`)}
                                                className="cms-btn-icon cms-btn-edit"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(service._id)}
                                                className="cms-btn-icon cms-btn-delete"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!loading && filteredServices.length === 0 && (
                    <div className="cms-empty-state">
                        <div className="cms-empty-icon">
                            <Briefcase size={64} />
                        </div>
                        <p className="cms-empty-text">Your global service table is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
}
