"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Package, FileText, Users, ArrowRight, Zap, TrendingUp, Sparkles, Plus, Layout, BarChart3, Globe, Activity, ShieldCheck, Clock, Monitor, Box, Layers, Terminal } from 'lucide-react';

import './cms-dashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ packages: 0, blogs: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pRes, bRes, lRes] = await Promise.all([
          fetch(`${API_URL}/packages`),
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/leads`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        const safeJson = async (res: Response) => {
          if (res.headers.get('content-type')?.includes('application/json')) {
            return await res.json();
          }
          return { success: false, data: [] };
        };

        const [pData, bData, lData] = await Promise.all([
          safeJson(pRes),
          safeJson(bRes),
          safeJson(lRes)
        ]);

        setStats({
          packages: pData?.count || pData?.data?.length || 0,
          blogs: bData?.count || bData?.data?.length || 0,
          leads: lData?.count || lData?.data?.length || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { 
      label: 'Packages', 
      count: stats.packages, 
      icon: Package, 
      color: 'blue', 
      href: '/admin/packages',
      desc: 'Active travel packages',
      tag: 'PACKAGES'
    },
    { 
      label: 'Blog Posts', 
      count: stats.blogs, 
      icon: FileText, 
      color: 'emerald', 
      href: '/admin/blogs',
      desc: 'Published articles',
      tag: 'BLOGS'
    },
    { 
      label: 'Customer Leads', 
      count: stats.leads, 
      icon: Zap, 
      color: 'rose', 
      href: '/admin/leads',
      desc: 'Total inquiries received',
      tag: 'LEADS'
    }
  ];

  return (
    <div className="cms-dashboard">
      {/* Header Section */}
      <div className="cms-header-row">
        <div className="cms-welcome-text">
          <h2>
            Welcome Back, <span className="text-primary">Admin</span>
          </h2>
          <div className="cms-status-row">
            <span className="cms-badge cms-badge-secure flex items-center gap-2">
                <ShieldCheck size={12} /> System Secure
             </span>
             <span className="text-slate-200">/</span>
             <span className="cms-badge cms-badge-live">Inventory Live</span>
          </div>
        </div>
        <div className="cms-header-actions">
          <Link href="/" target="_blank" className="admin-btn admin-btn-secondary h-12 flex items-center gap-3">
            <Globe size={18} /> View Website
          </Link>
          <Link href="/admin/packages/create" className="admin-btn admin-btn-primary h-12 px-8 flex items-center gap-3">
            <Plus size={20} /> Add New
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="cms-stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          const colorStyles = card.color === 'blue' ? { color: '#3b82f6', bg: '#eff6ff', border: '#dbeafe', glow: '#3b82f6' } : 
                              card.color === 'emerald' ? { color: '#10b981', bg: '#f0fdf4', border: '#dcfce7', glow: '#10b981' } : 
                              { color: '#f43f5e', bg: '#fff1f2', border: '#ffe4e6', glow: '#f43f5e' };
          
          return (
            <div key={card.label} className="cms-stat-card">
              <div 
                className="cms-stat-glow" 
                style={{ backgroundColor: colorStyles.glow }}
              ></div>
              
              <div className="relative z-10">
                <div className="cms-stat-icon-row">
                  <div 
                    className="cms-stat-icon-box"
                    style={{ 
                        color: colorStyles.color, 
                        backgroundColor: colorStyles.bg,
                        borderColor: colorStyles.border
                    }}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <div className="cms-trend-badge">
                    <TrendingUp size={10} /> +12%
                  </div>
                </div>
                
                <div className="cms-stat-content">
                  <h4 className="cms-stat-label">{card.label}</h4>
                  <div className="cms-stat-value">
                    {loading ? (
                        <div className="cms-stat-loader"></div>
                    ) : (
                        stats[card.label.toLowerCase().includes('package') ? 'packages' : card.label.toLowerCase().includes('blog') ? 'blogs' : 'leads']
                    )}
                  </div>
                  <p className="cms-stat-desc">{card.desc}</p>
                </div>

                <div className="cms-stat-footer">
                  <Link href={card.href} className="cms-stat-link">
                    View Details <ArrowRight size={14} />
                  </Link>
                  <Activity size={16} style={{ color: '#f1f5f9' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Subsection */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Activity Feed */}
        <div className="lg:col-span-2 cms-activity-card">
          <div className="cms-activity-header">
            <div>
                 <h3 className="cms-activity-title">
                   <div className="cms-activity-badge-dot"></div>
                    Recent Activity
                  </h3>
                  <p className="cms-activity-subtitle">
                    <Terminal size={10} /> Updates from your website
                  </p>
            </div>
            <Monitor size={18} style={{ color: '#e2e8f0' }} />
          </div>
          
          <div className="cms-activity-list">
            {[
              { title: 'New customer booking request', time: '12m ago', type: 'Lead', icon: Zap, color: '#f43f5e' },
              { title: 'Travel package updated', time: '45m ago', type: 'Package', icon: Box, color: '#3b82f6' },
              { title: 'New travel story published', time: '2h ago', type: 'Blog', icon: FileText, color: '#10b981' },
               { title: 'Database optimization complete', time: '4h ago', type: 'System', icon: ShieldCheck, color: '#6366f1' }
            ].map((item, i) => (
              <div key={i} className="cms-activity-item">
                <div className="cms-activity-icon-box">
                  <item.icon size={24} strokeWidth={1.5} style={{ color: item.color }} />
                </div>
                <div className="cms-activity-main">
                  <p className="cms-activity-label">{item.title}</p>
                  <div className="cms-activity-meta">
                    <span className="cms-activity-time">
                       <Clock size={12} /> {item.time}
                    </span>
                    <span className="cms-activity-sep"></span>
                    <span className="cms-activity-type">{item.type}</span>
                  </div>
                </div>
                <ArrowRight size={18} style={{ color: '#e2e8f0' }} />
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50/50 text-center border-t border-slate-50">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-all flex items-center justify-center gap-2 mx-auto group">
               <Activity size={12} /> View All Activity
            </button>
          </div>
        </div>

        {/* Website Performance */}
        <div className="lg:col-span-3 cms-chart-card">
          <div className="cms-chart-bg-dots"></div>
          
          <div className="cms-chart-header">
            <div>
              <h3 className="cms-chart-title">
                <BarChart3 size={20} style={{ color: '#60a5fa' }} />
                 Website Performance
               </h3>
               <p className="cms-chart-subtitle">
                  <Sparkles size={12} style={{ color: '#f59e0b' }} /> Traffic and engagement metrics
               </p>
            </div>
            <div className="cms-chart-tabs">
              {['W', 'M', 'Y'].map(t => (
                <button 
                    key={t} 
                    className={`cms-chart-tab ${t === 'M' ? 'cms-chart-tab-active' : ''}`}
                >
                    {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="cms-chart-grid">
            {[45, 75, 50, 95, 60, 85, 45, 98, 70, 55, 90, 45].map((h, i) => (
              <div key={i} className="cms-chart-bar-wrap">
                <div className="cms-chart-bar-bg"></div>
                <div 
                  className="cms-chart-bar-fill"
                  style={{ height: `${h}%` }}
                >
                   <div className="cms-chart-tooltip">
                     {h}% CAPACITY
                  </div>
                   <div className="cms-chart-dot"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cms-chart-footer">
            <span className="flex items-center gap-2"> 
                <div 
                    className="admin-badge-dot" 
                    style={{ backgroundColor: '#3b82f6', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}
                ></div> 
                Data Start
            </span>
             <span style={{ opacity: 0.2 }}> Website Analytics </span>
             <span className="flex items-center gap-2">
                 Data End 
                 <div className="admin-badge-dot" style={{ backgroundColor: '#f43f5e' }}></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
