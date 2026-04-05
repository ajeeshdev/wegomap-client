"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Edit, Trash2, Plus, Search, User, Calendar, Tag, FileText, Globe, ShieldCheck, Sparkles, Clock, Layers, Zap } from 'lucide-react';

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;

    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter((blog: any) => blog._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  }

  const filteredBlogs = blogs.filter((blog: any) => 
    (blog.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.slug || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.categories || []).some((c: string) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (blog.author || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cms-page-wrapper">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            <div className="admin-page-title-indicator"></div>
            Blogs
          </h2>
          <p className="admin-page-subtitle">Manage blog posts and articles.</p>
        </div>
        <div className="cms-search-bar">
          <div className="cms-search-input-wrap">
            <Search className="cms-search-icon" size={16} />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-search-input"
            />
          </div>
          <Link href="/admin/blogs/create" className="admin-btn admin-btn-primary">
            <Plus size={18} /> New Blog
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="admin-form-card flex flex-col items-center justify-center p-10 gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading blogs...</p>
        </div>
      ) : (
        <div className="cms-listing-card">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead className="cms-table-header">
                <tr>
                  <th style={{ width: '80px' }}>#</th>
                  <th>Heading</th>
                  <th>Category</th>
                  <th>Post date</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'right', width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((item: any, index: number) => (
                  <tr key={item._id} className="cms-table-row">
                    <td className="cms-table-cell" style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8' }}>
                        {(index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-cell-title">{item.title}</div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>/{item.slug}</div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {(item.categories && item.categories.length > 0) ? (
                          item.categories.map((cat: string, i: number) => (
                            <span key={i} className="cms-cat-badge whitespace-nowrap">
                              <Tag size={10} /> {cat}
                            </span>
                          ))
                        ) : (
                          <span className="cms-cat-badge whitespace-nowrap">
                            <Tag size={10} /> {item.category || 'General'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="cms-table-cell" style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                      {(item.publishDate || item.createdAt) ? new Date(item.publishDate || item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '---'}
                    </td>
                    <td className="cms-table-cell">
                      <div className="flex justify-center">
                        <span className="admin-status-badge admin-status-badge-success">
                          <ShieldCheck size={10} /> Published
                        </span>
                      </div>
                    </td>
                    <td className="cms-table-cell">
                      <div className="cms-action-group">
                        <Link 
                          href={`/admin/blogs/${item._id}/edit`} 
                          className="cms-btn-icon cms-btn-edit"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="cms-btn-icon cms-btn-delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                       <div className="cms-empty-state">
                        <div className="cms-empty-icon">
                          <FileText size={64} />
                        </div>
                        <p className="cms-empty-text">No articles found in your archives</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
