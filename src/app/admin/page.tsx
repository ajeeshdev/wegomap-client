"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config";
import {
  Package,
  FileText,
  Zap,
  ArrowRight,
  Globe,
  Plus,
  Activity,
  MapPin,
  Clock,
  Users
} from "lucide-react";

import "./cms-dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ packages: 0, blogs: 0, leads: 0 });
  const [visitorStats, setVisitorStats] = useState({ totalVisits: 0, todayVisits: 0, recentVisitors: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const fetchOptions = { headers: { Authorization: `Bearer ${token}` } };
        
        const [pRes, bRes, lRes, aRes] = await Promise.all([
          fetch(`${API_URL}/packages`),
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/leads`, fetchOptions),
          fetch(`${API_URL}/analytics/stats`, fetchOptions)
        ]);

        const safeJson = async (res: Response) => {
          if (res.headers.get("content-type")?.includes("application/json")) {
            return await res.json();
          }
          return { success: false, data: [] };
        };

        const [pData, bData, lData, aData] = await Promise.all([
          safeJson(pRes),
          safeJson(bRes),
          safeJson(lRes),
          safeJson(aRes)
        ]);

        if (aData.success && aData.data) {
          setVisitorStats(aData.data);
        }

        setStats({
          packages: pData?.count ?? pData?.data?.length ?? 0,
          blogs: bData?.count ?? bData?.data?.length ?? 0,
          leads: lData?.count ?? lData?.data?.length ?? 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const cards = [
    { label: "Tour Packages", count: stats.packages, icon: Package, href: "/admin/packages" },
    { label: "Inquiries", count: stats.leads, icon: Zap, href: "/admin/leads" },
    { label: "Blog Posts", count: stats.blogs, icon: FileText, href: "/admin/blogs" },
  ];

  return (
    <div id="cms-dashboard">
      <div className="dashboard-header-modern">
        <h1>Overview</h1>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="admin-btn admin-btn-secondary h-8 text-[11px] !rounded-md">
            <Globe size={14} /> Preview Site
          </Link>
          <Link href="/admin/packages/create" className="admin-btn admin-btn-primary h-8 text-[11px] !rounded-md !bg-slate-900 !text-white shadow-none border-none">
            <Plus size={14} /> New Package
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <section className="stats-grid-compact">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="stat-card-classic">
                <div className="stat-label">{card.label}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="stat-value">{loading ? "..." : card.count}</div>
                  <Icon size={20} className="text-slate-300" />
                </div>
              </Link>
            );
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 audience-section">
            <div className="audience-section-header">
              <h2 className="audience-section-title flex items-center gap-2">
                <Activity size={14} className="text-blue-600" /> Recent Traffic
              </h2>
            </div>
            <div className="activity-table">
               {(visitorStats?.recentVisitors || []).length > 0 ? (
                 visitorStats.recentVisitors.map((v: any, idx: number) => (
                   <div key={idx} className="activity-row">
                      <div className="activity-info">
                         <div className="activity-ip">{v.ip}</div>
                         <div className="activity-ua font-mono">{v.userAgent}</div>
                      </div>
                      <div className="activity-meta">
                         <div className="activity-path text-blue-600 font-bold">{v.path}</div>
                         <div className="activity-time">{new Date(v.timestamp).toLocaleTimeString()}</div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="py-12 text-center text-xs text-slate-400">No activity yet</div>
               )}
            </div>
          </section>

          <section className="lg:col-span-1 space-y-4">
              <div className="audience-section !flex !items-center !justify-between !p-6">
                  <div>
                    <div className="stat-label">Total Visitors</div>
                    <div className="text-2xl font-bold text-slate-900 leading-none mt-2">
                      {loading ? "..." : (visitorStats?.totalVisits || 0).toLocaleString()}
                    </div>
                  </div>
                  <Users size={24} className="text-slate-100" />
              </div>
              <div className="audience-section !flex !items-center !justify-between !p-6">
                  <div>
                    <div className="stat-label">Direct Leads</div>
                    <div className="text-2xl font-bold text-slate-900 leading-none mt-2">
                      {loading ? "..." : stats.leads}
                    </div>
                  </div>
                  <Zap size={24} className="text-slate-100" />
              </div>
              
              <div className="p-1 px-3 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center">
                  System monitoring active
              </div>
          </section>
        </div>

        <section className="dashboard-actions pt-4 pb-12">
           <div className="audience-section-header">
              <h2 className="audience-section-title">Quick Actions</h2>
           </div>
           <div className="quick-actions-bar">
             <Link href="/admin/packages/create" className="action-card-classic">
               <Plus size={14} className="action-icon-classic" /> Add Package
             </Link>
             <Link href="/admin/blogs/create" className="action-card-classic">
               <FileText size={14} className="action-icon-classic" /> Write Blog
             </Link>
             <Link href="/admin/leads" className="action-card-classic">
               <Inbox className="w-4 h-4 text-slate-400" /> Check Inquiries
             </Link>
           </div>
        </section>
      </div>
    </div>
  );
}

// Minimal missing component for brevity
const Inbox = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 8-8-8" />
  </svg>
);
