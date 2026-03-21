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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pRes, bRes, lRes] = await Promise.all([
          fetch(`${API_URL}/packages`),
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/leads`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const safeJson = async (res: Response) => {
          if (res.headers.get("content-type")?.includes("application/json")) {
            return await res.json();
          }
          return { success: false, data: [] };
        };

        const [pData, bData, lData] = await Promise.all([
          safeJson(pRes),
          safeJson(bRes),
          safeJson(lRes),
        ]);

        setStats({
          packages: pData?.count ?? pData?.data?.length ?? 0,
          blogs: bData?.count ?? bData?.data?.length ?? 0,
          leads: lData?.count ?? lData?.data?.length ?? 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
    <div id="cms-dashboard">
      <header>
        <div>
          <h1>Welcome back</h1>
          <p>Here&apos;s what&apos;s happening with your site</p>
        </div>
        <nav>
          <Link href="/" target="_blank">
            <Globe size={18} />
            View website
          </Link>
          <Link href="/admin/packages/create">
            <Plus size={20} />
            Add package
          </Link>
        </nav>
      </header>

      <section className="stats">
        {cards.map((card) => {
          const Icon = card.icon;
          const count =
            card.label === "Travel Packages"
              ? stats.packages
              : card.label === "Blog Posts"
                ? stats.blogs
                : stats.leads;

          return (
            <Link key={card.label} href={card.href} className="stat-card">
              <div className="stat-icon">
                <Icon size={28} strokeWidth={2} />
              </div>
              <div className="stat-body">
                <h3>{card.label}</h3>
                <div className="stat-value">
                  {loading ? (
                    <span className="stat-loader" />
                  ) : (
                    count
                  )}
                </div>
                <p>{card.desc}</p>
              </div>
              <span className="stat-link">
                Manage <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="quick-links">
        <h2>Quick actions</h2>
        <div className="quick-links-grid">
          <Link href="/admin/packages/create">Add new package</Link>
          <Link href="/admin/blogs/create">Write a blog post</Link>
          <Link href="/admin/leads">Check inquiries</Link>
          <Link href="/admin/destinations">Edit destinations</Link>
        </div>
      </section>
    </div>
  );
}
