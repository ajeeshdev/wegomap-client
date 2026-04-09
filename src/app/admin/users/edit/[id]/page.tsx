"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Users, Mail, Phone, Shield, Info, ArrowLeft, Save, X, Trash2
} from 'lucide-react';
import { API_URL } from '@/config';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    { id: 'blogs', label: 'Blogs' },
    { id: 'packages', label: 'Packages' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'events', label: 'Events' },
    { id: 'special_events', label: 'Special Events' },
    { id: 'enquiries', label: 'Enquiries' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'houseboat', label: 'Houseboat' },
    { id: 'cabs', label: 'Cabs' },
    { id: 'faqs', label: 'Faqs' },
    { id: 'banners', label: 'Banners' },
    { id: 'services', label: 'Services' },
    { id: 'site_options', label: 'General Settings' },
    { id: 'home_settings', label: 'Home Page' },
    { id: 'landing_pages', label: 'Landing Pages' },
    { id: 'site_pages', label: 'Site Pages' },
    { id: 'customers', label: 'Customers' },
    { id: 'seo', label: 'SEO' }
  ];

  useEffect(() => {
    if (id) {
       fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (data.success) {
            const user = data.data;
            setEditFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                password: '',
                role: user.role,
                permissions: Array.isArray(user.permissions) ? user.permissions : []
            });
        } else {
            toast.error("User not found");
            router.push('/admin/users');
        }
    } catch (err) {
        toast.error("Failed to fetch user");
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        const payload: any = {
            name: editFormData.name,
            email: editFormData.email,
            phone: editFormData.phone,
            role: editFormData.role,
            permissions: editFormData.permissions
        };
        if (editFormData.password) {
            payload.password = editFormData.password;
        }

        const response = await fetch(`${API_URL}/auth/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        if (data.success) {
            toast.success("Account updated successfully");
            router.push('/admin/users');
        } else {
            toast.error(data.error || "Update failed");
        }
    } catch (err) {
        toast.error("An error occurred");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="role-manager-page animate-in fade-in duration-700">
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
            <Link href="/admin/users" className="admin-back-btn">
                <ArrowLeft size={18} />
            </Link>
            <div>
                <h1 className="admin-page-title">Edit Administrator</h1>
                <p className="admin-page-subtitle">Update status and system permissions</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="admin-btn admin-btn-secondary">
            Discard
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="admin-btn admin-btn-primary"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="admin-form-card">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-slate-50 flex items-center gap-3">
                    Basic Information
                </h2>

                <div className="space-y-6">
                    <div className="admin-input-group">
                        <label className="admin-input-label">Full Name</label>
                        <div className="relative">
                            <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                required
                                type="text" 
                                className="admin-form-input pl-12" 
                                placeholder="Full Name"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="admin-input-group">
                            <label className="admin-input-label">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    required
                                    type="email" 
                                    className="admin-form-input pl-12" 
                                    placeholder="Email Address"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="admin-input-group">
                            <label className="admin-input-label">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    className="admin-form-input pl-12" 
                                    placeholder="+91..."
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="admin-input-group">
                        <label className="admin-input-label">Change Password (Optional)</label>
                        <div className="relative">
                            <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="password" 
                                minLength={6}
                                className="admin-form-input pl-12" 
                                placeholder="Leave blank to keep current"
                                value={editFormData.password}
                                onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-form-card">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-slate-50 flex items-center gap-3">
                    Permissions & Access
                </h2>

                <div className="admin-input-group mb-8">
                    <label className="admin-input-label">Access Role</label>
                    <select 
                        className="admin-search-input h-14 w-full text-base appearance-none cursor-pointer"
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                    >
                        <option value="manager">Manager</option>
                        <option value="admin">System Admin</option>
                        <option value="guide">Guide</option>
                        <option value="user">Standard User</option>
                    </select>
                </div>

                {['admin', 'manager'].includes(editFormData.role) && (
                    <div className="admin-input-group">
                        <label className="admin-input-label mb-4">Module Access Permissions</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                            {availablePermissions.map(p => (
                                <label key={p.id} className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                                    <input 
                                        type="checkbox" 
                                        checked={editFormData.permissions.includes(p.id)}
                                        onChange={e => {
                                            const newPerms = e.target.checked 
                                                ? [...editFormData.permissions, p.id]
                                                : editFormData.permissions.filter(x => x !== p.id);
                                            setEditFormData({...editFormData, permissions: newPerms});
                                        }}
                                        className="w-5 h-5 rounded-lg border-slate-300 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                                        {p.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>

          <div className="admin-form-sidebar">
            {/* Redundant save option removed */}
          </div>

        </div>
      </form>
    </div>
  );
}
