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
  Users,
  Cloud,
  Sun,
  CloudRain,
  Thermometer
} from "lucide-react";

import "./cms-dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ packages: 0, blogs: 0, leads: 0 });
  const [visitorStats, setVisitorStats] = useState({ totalVisits: 0, todayVisits: 0, monthlyVisits: 0, recentVisitors: [] });
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any[]>([]);

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
    const fetchWeather = async () => {
      try {
        const dests = [
          { name: 'Munnar', lat: 10.0889, lon: 77.0595 },
          { name: 'Kochi', lat: 9.9312, lon: 76.2673 },
          { name: 'Alleppey', lat: 9.4981, lon: 76.3329 },
          { name: 'Thekkady', lat: 9.6031, lon: 77.1615 },
        ];
        
        const results = await Promise.all(dests.map(async (d) => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current_weather=true`);
          const json = await res.json();
          return { ...d, temp: json.current_weather.temperature, code: json.current_weather.weathercode };
        }));
        setWeatherData(results);
      } catch (err) {
        console.error("Weather error:", err);
      }
    };

    fetchDashboardData();
    fetchWeather();
  }, []);

  const formatUA = (ua: string) => {
    if (!ua) return "Direct Visit";
    const lowUA = ua.toLowerCase();
    if (lowUA.includes("node")) return "Server Process";
    if (lowUA.includes("chrome")) return "Chrome Browser";
    if (lowUA.includes("safari")) return "Safari Browser";
    if (lowUA.includes("firefox")) return "Firefox Browser";
    if (lowUA.includes("edge")) return "Edge Browser";
    
    // Fallback but clean it up
    return ua.split(" ")[0].replace(/Mozilla\/\d\.\d/i, "Web Browser");
  };

  const getDeviceFromUA = (ua: string) => {
    const lowUA = ua.toLowerCase();
    if (lowUA.includes("macintosh") || lowUA.includes("mac os")) return "macOS";
    if (lowUA.includes("iphone") || lowUA.includes("ipad")) return "iOS";
    if (lowUA.includes("android")) return "Android";
    if (lowUA.includes("windows")) return "Windows";
    if (lowUA.includes("node")) return "System";
    return "Desktop";
  };

  const cards = [
    { label: "Tour Packages", count: stats.packages, icon: Package, href: "/admin/packages", color: "#6366f1" },
    { label: "Enquiries", count: stats.leads, icon: Zap, href: "/admin/leads", color: "#f59e0b" },
    { label: "Monthly Visits", count: visitorStats.monthlyVisits || 0, icon: Activity, href: "#", color: "#10b981" },
    { label: "Blog Posts", count: stats.blogs, icon: FileText, href: "/admin/blogs", color: "#3b82f6" },
  ];

  const getPageTitle = (path: string) => {
    if (!path) return "Unknown";
    const p = path.split('?')[0]; // remove query params
    if (p === '/') return 'Home Page';
    if (p === '/packages') return 'All Packages';
    if (p.startsWith('/packages/')) return p.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Tour Detail';
    if (p === '/destinations') return 'Destinations';
    if (p === '/blogs') return 'Travel Blogs';
    if (p.startsWith('/blogs/')) return 'Blog Reading';
    if (p === '/contact') return 'Contact Us';
    if (p === '/about') return 'About Company';
    if (p.startsWith('/api/')) return 'API: ' + p.replace('/api/', '').toUpperCase();
    return p;
  };

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
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="stat-card-classic !border-l-4" style={{ borderLeftColor: card.color }}>
                <div className="stat-label">{card.label}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="stat-value text-slate-900">{loading ? "..." : card.count.toLocaleString()}</div>
                  <Icon size={18} style={{ color: card.color, opacity: 0.2 }} />
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
               {(() => {
                 const recentActivity: any[] = (visitorStats?.recentVisitors || [])
                   .filter((v: any) => v.userAgent && !v.userAgent.toLowerCase().includes('node'));
                 
                 const uniqueUsers: any[] = [];
                 const ipSet = new Set();
                 for (const v of recentActivity) {
                   const key = `${v.ip}-${v.userAgent}`;
                   if (!ipSet.has(key)) {
                     uniqueUsers.push(v);
                     ipSet.add(key);
                   }
                 }

                 return uniqueUsers.map((v: any, idx: number) => (
                    <div key={idx} className="activity-row">
                       <div className="activity-info">
                          <div className="activity-ip flex items-center gap-2">
                              {v.ip === '::1' || v.ip === '127.0.0.1' ? 'Localhost' : v.ip}
                              <span className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[9px] font-bold uppercase tracking-tighter">
                                  {getDeviceFromUA(v.userAgent)}
                              </span>
                          </div>
                          <div className="activity-ua font-mono text-[10px] text-slate-400">{formatUA(v.userAgent)}</div>
                       </div>
                       <div className="activity-meta">
                          <div className="activity-path text-blue-600 font-bold truncate max-w-[150px]" title={v.path}>
                              {getPageTitle(v.path)}
                          </div>
                          <div className="activity-time">{new Date(v.timestamp).toLocaleTimeString()}</div>
                       </div>
                    </div>
                  ));
               })()}
               {visitorStats?.recentVisitors?.length === 0 && (
                 <div className="py-12 text-center text-xs text-slate-400">No activity yet</div>
               )}
            </div>
          </section>

          {/* Weather Section */}
          <section className="lg:col-span-2 audience-section">
            <div className="audience-section-header">
              <h2 className="audience-section-title flex items-center gap-2">
                <Cloud size={14} className="text-sky-500" /> Local Weather (Tourist Hubs)
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {weatherData.length > 0 ? weatherData.map((w, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                   <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">{w.name}</div>
                   <div className="flex items-center gap-3">
                     {w.code < 3 ? <Sun size={20} className="text-amber-400" /> : 
                      w.code < 60 ? <Cloud size={20} className="text-slate-400" /> :
                      <CloudRain size={20} className="text-blue-400" />}
                     <span className="text-xl font-black text-slate-800 tracking-tighter">{Math.round(w.temp)}°C</span>
                   </div>
                </div>
              )) : (
                [1,2,3,4].map(idx => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 animate-pulse h-20" />
                ))
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
                    <div className="stat-label">Today's Visits</div>
                    <div className="text-2xl font-bold text-slate-900 leading-none mt-2">
                       {loading ? "..." : (visitorStats?.todayVisits || 0).toLocaleString()}
                    </div>
                  </div>
                  <Activity size={24} className="text-slate-100" />
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
