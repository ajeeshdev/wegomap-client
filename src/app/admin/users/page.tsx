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

type TabType = 'admins' | 'users';

export default function RoleManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('admins');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'manager'
  });
  const [saving, setSaving] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: ''
  });

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

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setSaving(true);
    try {
        const payload: any = {
            name: editFormData.name,
            email: editFormData.email,
            phone: editFormData.phone,
            role: editFormData.role
        };
        
        // Only send password if it's been typed (to allow changing other fields without resetting password)
        if (editFormData.password) {
            payload.password = editFormData.password;
        }

        const response = await fetch(`${API_URL}/auth/users/${editingUser._id}`, {
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
            setUsers(prev => prev.map((u: any) => u._id === editingUser._id ? data.data : u));
            setShowEditModal(false);
        } else {
            toast.error(data.error || "Update failed");
        }
    } catch (err) {
        toast.error("An error occurred during update");
    } finally {
        setSaving(false);
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        password: '', // Keep empty unless changing
        role: user.role
    });
    setShowEditModal(true);
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
  
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        const response = await fetch(`${API_URL}/auth/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newUser)
        });
        const data = await response.json();
        
        if (data.success) {
            toast.success("Administrator account created");
            setUsers(prev => [...prev, data.data]);
            setShowAddModal(false);
            setNewUser({ name: '', email: '', phone: '', password: '', role: 'manager' });
        } else {
            toast.error(data.error || "Failed to create user");
        }
    } catch (err) {
        toast.error("An error occurred");
    } finally {
        setSaving(false);
    }
  };

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
           {/* Tabs removed per user request: only show admins */}
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
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-orange-200"
          >
            <UserPlus size={16} /> Add Admin
          </button>
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
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        title="Edit Roles & Password"
                      >
                         <UserCog size={16} />
                      </button>
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

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               <div style={{ padding: '2rem' }} className="border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Create New Administrator</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Assign system permissions directly</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white text-slate-400 transition-colors">
                    <X size={20} />
                 </button>
              </div>

               <form onSubmit={handleAddUser} style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="admin-input-group">
                           <label className="admin-input-label">Full Name</label>
                           <div className="relative">
                              <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                required
                                type="text" 
                                className="admin-search-input pl-12 h-12 w-full text-sm" 
                                placeholder="e.g. John Doe"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                              />
                           </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                            <div className="admin-input-group">
                                <label className="admin-input-label">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        required
                                        type="email" 
                                        className="admin-search-input pl-12 h-12 w-full text-sm" 
                                        placeholder="john@example.com"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="admin-input-group">
                                <label className="admin-input-label">Phone Number</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        className="admin-search-input pl-12 h-12 w-full text-sm" 
                                        placeholder="+91..."
                                        value={newUser.phone}
                                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="admin-input-group">
                           <label className="admin-input-label">Initial Password</label>
                           <div className="relative">
                              <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                required
                                type="password" 
                                minLength={6}
                                className="admin-search-input pl-12 h-12 w-full text-sm" 
                                placeholder="Minimum 6 characters"
                                value={newUser.password}
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                              />
                           </div>
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-input-label">Access Role</label>
                            <select 
                                className="admin-search-input h-12 w-full text-sm appearance-none cursor-pointer"
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            >
                                <option value="manager">Manager</option>
                                <option value="admin">System Admin</option>
                                <option value="guide">Guide</option>
                                <option value="user">Standard User</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', padding: '1rem' }} className="bg-blue-50 rounded-2xl flex gap-4 items-start border border-blue-100">
                        <div className="w-8 h-8 bg-white text-blue-500 rounded-lg flex shrink-0 items-center justify-center shadow-sm"><Info size={16} /></div>
                        <p className="text-[10px] leading-relaxed font-bold text-blue-700 uppercase tracking-wider">
                           Heads up! Accounts created here are automatically verified and will have immediate access to the system based on their assigned role.
                        </p>
                    </div>

                    <button 
                      disabled={saving}
                      type="submit" 
                      className="w-full bg-slate-900 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-200 disabled:bg-slate-300"
                    >
                        {saving ? 'Creating Access...' : 'Finalize & Create Account'}
                    </button>
                  </div>
              </form>
           </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               <div style={{ padding: '2rem' }} className="border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Edit Administrator</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Modify access level or update password</p>
                 </div>
                 <button onClick={() => setShowEditModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white text-slate-400 transition-colors">
                    <X size={20} />
                 </button>
              </div>

               <form onSubmit={handleUpdateUser} style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="admin-input-group">
                           <label className="admin-input-label">Full Name</label>
                           <div className="relative">
                              <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                required
                                type="text" 
                                className="admin-search-input pl-12 h-12 w-full text-sm" 
                                placeholder="Full Name"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                              />
                           </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                            <div className="admin-input-group">
                                <label className="admin-input-label">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        required
                                        type="email" 
                                        className="admin-search-input pl-12 h-12 w-full text-sm" 
                                        placeholder="Email Address"
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="admin-input-group">
                                <label className="admin-input-label">Phone</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        className="admin-search-input pl-12 h-12 w-full text-sm" 
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-input-label">Access Role</label>
                            <select 
                                disabled={editingUser._id === currentUser?._id}
                                className="admin-search-input h-12 w-full text-sm appearance-none cursor-pointer"
                                value={editFormData.role}
                                onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                            >
                                <option value="manager">Manager</option>
                                <option value="admin">System Admin</option>
                                <option value="guide">Guide</option>
                                <option value="user">Standard User</option>
                            </select>
                        </div>

                        <div className="admin-input-group">
                           <label className="admin-input-label">Change Password (Optional)</label>
                           <div className="relative">
                              <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                type="password" 
                                minLength={6}
                                className="admin-search-input pl-12 h-12 w-full text-sm" 
                                placeholder="Leave blank to keep current"
                                value={editFormData.password}
                                onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                              />
                           </div>
                        </div>
                    </div>

                    <button 
                      disabled={saving}
                      type="submit" 
                      className="w-full bg-slate-900 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-200 disabled:bg-slate-300"
                    >
                        {saving ? 'Updating Member...' : 'Save Changes'}
                    </button>
                  </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
}
