"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { 
  Users, ShieldCheck, UserPlus, Search, 
  Trash2, ShieldAlert, CheckCircle2, 
  Clock, Mail, Phone, ChevronRight, UserCog,
  MoreVertical, Shield
} from 'lucide-react';
import { toast } from 'react-hot-toast';

type TabType = 'admins' | 'users';

export default function RoleManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('admins');

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

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (userId === currentUser?._id) {
        toast.error("You cannot change your own role");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ role: newRole })
        });
        const data = await response.json();
        
        if (data.success) {
            toast.success(`User role updated to ${newRole}`);
            setUsers(prev => prev.map((u: any) => u._id === userId ? { ...u, role: newRole } : u));
        } else {
            toast.error(data.error || "Update failed");
        }
    } catch (err) {
        toast.error("An error occurred during update");
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

  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="rm-tabs">
             <button 
                onClick={() => setActiveTab('admins')}
                className={`rm-tab-btn ${activeTab === 'admins' ? 'active' : ''}`}
             >
                Admins & Managers
             </button>
             <button 
                onClick={() => setActiveTab('users')}
                className={`rm-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
             >
                Platform Users
             </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name/email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input pl-11 h-11 text-xs"
            />
          </div>
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
              {filteredUsers
                .filter((u: any) => activeTab === 'admins' ? ['admin', 'manager'].includes(u.role) : !['admin', 'manager'].includes(u.role))
                .map((user: any) => (
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
                      <select 
                        disabled={user._id === currentUser?._id}
                        className="rm-role-select"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
