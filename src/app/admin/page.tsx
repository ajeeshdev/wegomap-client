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
} from "lucide-react";

import "./cms-dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ packages: 0, blogs: 0, leads: 0 });
  const [loading, setLoading] = useState(true);
  const [siteLogo, setSiteLogo] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pRes, bRes, lRes, oRes] = await Promise.all([
          fetch(`${API_URL}/packages`),
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/leads`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${API_URL}/options`)
        ]);

        const safeJson = async (res: Response) => {
          if (res.headers.get("content-type")?.includes("application/json")) {
            return await res.json();
          }
          return { success: false, data: [] };
        };

        const [pData, bData, lData, oData] = await Promise.all([
          safeJson(pRes),
          safeJson(bRes),
          safeJson(lRes),
          safeJson(oRes),
        ]);

        if (oData.success && oData.data) {
          const logoOpt = oData.data.find((o: any) => o.key === 'site_logo');
          if (logoOpt) setSiteLogo(logoOpt.value);
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
    {
      label: "Travel Packages",
      count: stats.packages,
      icon: Package,
      href: "/admin/packages",
      desc: "Manage your tour packages",
    },
    {
      label: "Blog Posts",
      count: stats.blogs,
      icon: FileText,
      href: "/admin/blogs",
      desc: "Your published articles",
    },
    {
      label: "Inquiries",
      count: stats.leads,
      icon: Zap,
      href: "/admin/leads",
      desc: "Customer messages",
    },
  ];

  return (
    <div id="cms-dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="dashboard-header-centered flex flex-col items-center mb-16 pt-8">
     

        {/* Centered Actions */}
        <div className="header-actions flex items-center justify-center gap-4 mt-8">
          <Link href="/" target="_blank" className="admin-btn admin-btn-secondary !rounded-full !px-8">
            <Globe size={16} /> <span>Site Preview</span>
          </Link>
          <Link href="/admin/packages/create" className="admin-btn admin-btn-primary !rounded-full !px-8 hover:!rotate-[-2deg]">
            <Plus size={18} /> <span>New Package</span>
          </Link>
        </div>
      </header>

      <div className="dashboard-grid space-y-12">
        {/* Core Stats Overview */}
        <section className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="stat-card-premium group">
                <div className="card-top flex justify-between items-start mb-6">
                  <div className="icon-box group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <div className="trend text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                    Live
                  </div>
                </div>
                <div className="card-info">
                  <span className="label text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                    {card.label}
                  </span>
                  <div className="value text-4xl font-black text-slate-950 mb-4">
                    {loading ? <div className="h-10 w-20 bg-slate-100 animate-pulse rounded-lg" /> : card.count}
                  </div>
                  <p className="description text-xs font-semibold text-slate-500">{card.desc}</p>
                </div>
                <div className="card-footer mt-6 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Manage Data</span>
                  <ArrowRight size={14} className="text-orange-500" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Action Center */}
        <section className="quick-actions-panel pt-8">
          <div className="panel-header flex flex-col items-center gap-3 mb-10">
            <div className="w-8 h-1.5 bg-orange-500 rounded-full mb-2"></div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Quick Actions</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Execute frequent management tasks</p>
          </div>
          <div className="actions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/packages/create" className="action-button group">
              <div className="action-icon bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"><Plus size={18} /></div>
              <span className="font-black text-sm text-slate-700">Add Package</span>
            </Link>
            <Link href="/admin/blogs/create" className="action-button group">
              <div className="action-icon bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"><FileText size={18} /></div>
              <span className="font-black text-sm text-slate-700">Write Blog</span>
            </Link>
            <Link href="/admin/leads" className="action-button group">
              <div className="action-icon bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"><Zap size={18} /></div>
              <span className="font-black text-sm text-slate-700">Check Leads</span>
            </Link>
            <Link href="/admin/destinations" className="action-button group">
              <div className="action-icon bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"><Globe size={18} /></div>
              <span className="font-black text-sm text-slate-700">Destinations</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
