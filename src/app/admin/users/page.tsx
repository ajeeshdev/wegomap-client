"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { 
  Users, ShieldCheck, UserPlus, Search, 
  Trash2, ShieldAlert, CheckCircle2, 
  Clock, Mail, Phone, ChevronRight, UserCog,
  MoreVertical, Shield, X, Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoleManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('userProfile');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?._id) {
        toast.error("You cannot delete your own account");
        return;
    }

    if (!confirm("Are you sure? This user will be permanently removed from the system.")) return;

    try {
        const response = await fetch(`${API_URL}/auth/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        
        if (data.success) {
            toast.success("User deleted successfully");
            setUsers(prev => prev.filter((u: any) => u._id !== userId));
        } else {
            toast.error(data.error || "Deletion failed");
        }
    } catch (err) {
        toast.error("An error occurred");
    }
  };

  const filteredUsers = users.filter((u: any) => {
    // Only show admins and managers per user request
    if (!['admin', 'manager'].includes(u.role)) return false;
    
    return u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           u.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin': 
        return <span className="rm-role-badge admin"><Shield size={10} /> Administrator</span>;
      case 'manager': 
        return <span className="rm-role-badge manager"><UserCog size={10} /> Manager</span>;
      case 'guide': 
        return <span className="rm-role-badge guide"><Clock size={10} /> Guide</span>;
      default: 
        return <span className="rm-role-badge user">User</span>;
    }
  };

  return (
    <div className="role-manager-page animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator bg-orange-500"></div>
            Admin Role Manager
          </h2>
          <p className="admin-page-subtitle mt-1">Manage administrative permissions and user access levels</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64 mr-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name/email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-11 h-11 text-xs"
            />
          </div>
          <Link 
            href="/admin/users/create"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-orange-200"
          >
            <UserPlus size={16} /> Add Admin
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center py-32 gap-6 bg-white/50 border-dashed">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Retrieving User Permissions...</p>
        </div>
      ) : (
        <div className="rm-table-card">
          <table>
            <thead>
              <tr>
                <th>Account Information</th>
                <th className="text-center">Assigned Access</th>
                <th className="text-center">Status</th>
                <th className="text-right">Permission</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr key={user._id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className={`user-avatar ${user.role}`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="user-name group-hover:text-orange-500 transition-colors">{user.name}</span>
                        <div className="user-email">
                          <Mail size={10} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="text-center">
                    {user.isEmailVerified ? (
                      <div className="rm-status-badge verified">
                        <CheckCircle2 size={10} /> Verified
                      </div>
                    ) : (
                      <div className="rm-status-badge standard">
                        <Clock size={10} /> Standard
                      </div>
                    )}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/users/edit/${user._id}`}
                        prefetch={false}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        title="Edit Roles & Password"
                      >
                         <UserCog size={16} />
                      </Link>
                      <button 
                         disabled={user._id === currentUser?._id}
                         onClick={() => handleDeleteUser(user._id)}
                         className="rm-delete-btn"
                         title="Revoke All Access"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Board */}
      {!loading && users.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
           <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-inner"><ShieldAlert size={24} /></div>
                 <h6 className="font-black text-slate-900 uppercase tracking-widest italic text-[11px]">Core Controllers</h6>
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {users.filter((u: any) => u.role === 'admin').length.toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Active System Administrators</p>
           </div>
           
           <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner"><UserCog size={24} /></div>
                 <h6 className="font-black text-slate-900 uppercase tracking-widest italic text-[11px]">System Operators</h6>
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {users.filter((u: any) => u.role === 'manager').length.toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Active Site Managers</p>
           </div>

           <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner"><Users size={24} /></div>
                 <h6 className="font-black text-slate-900 uppercase tracking-widest italic text-[11px]">Total Registrations</h6>
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {users.length.toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Global Platform Users</p>
           </div>
        </div>
      )}

    </div>
  );
}
