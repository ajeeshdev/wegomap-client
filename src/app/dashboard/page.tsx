"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    User, Heart, MapPin,
    ArrowRight, LogOut, Sparkles,
    Compass, Star, Contact, FileText, Download, Eye, Calendar, Package, Settings, Lock, Smartphone
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { API_URL, UPLOADS_URL } from '@/config';

import './dashboard.css';

interface BookingPdf {
    _id: string;
    url: string;
    label: string;
    uploadedAt: string;
}

type DashTab = 'overview' | 'bookings' | 'settings';

export default function UserDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<DashTab>('overview');
    const [pdfs, setPdfs] = useState<BookingPdf[]>([]);
    const [pdfsLoading, setPdfsLoading] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const profile = localStorage.getItem('userProfile');
        if (!token || !profile) { router.push('/login'); return; }
        try { setUser(JSON.parse(profile)); } catch { router.push('/login'); }
        setLoading(false);
    }, [router]);

    // Fetch PDFs whenever user switches to bookings tab
    useEffect(() => {
        if (activeTab !== 'bookings') return;
        const token = localStorage.getItem('token');
        setPdfsLoading(true);
        fetch(`${API_URL}/bookings/my`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(d => { if (d.success) setPdfs(d.data); })
            .catch(console.error)
            .finally(() => setPdfsLoading(false));
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isLoggedIn');
        window.dispatchEvent(new Event('authChange'));
        router.push('/');
        toast.success('Logged out successfully');
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdatingProfile(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload: Record<string, string> = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            password: formData.get('password') as string
        };
        if (!payload.password) delete payload.password; // Don't send empty password
        
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Profile updated successfully!');
                setUser(data.data);
                localStorage.setItem('userProfile', JSON.stringify(data.data)); // Sync local storage
                form.reset(); // clear password field
                if (payload.password) {
                     toast.success('Password changed successfully - You will stay logged in.');
                }
            } else {
                toast.error(data.error || 'Failed to update profile');
            }
        } catch (err) {
            toast.error('Network error. Please try again.');
        } finally {
            setUpdatingProfile(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 48, height: 48, border: '4px solid #f1f5f9', borderTopColor: '#ff6b35', borderRadius: '50%', animation: 'dashSpin 0.8s linear infinite' }} />
                <style>{`@keyframes dashSpin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const navItems = [
        { key: 'overview', label: 'Dashboard', icon: User },
        { key: 'bookings', label: 'Booking Details', icon: Package },
        { key: 'settings', label: 'Account Settings', icon: Settings },
    ] as const;

    const BASE_URL = UPLOADS_URL;

    return (
        <div className="dashboardPage">
            <div className="dashboardContainer">

                {/* Header */}
                <div className="dashboardHeader">
                    <h2 className="dashboardTitle">Dashboard</h2>
                    <div className="dashboardAccent" />
                    <p className="dashboardSubtitle">Manage your adventures and account settings.</p>
                </div>

                <div className="dashboardLayout">
                    {/* Sidebar */}
                    <aside className="dashboardSidebar">
                        <div className="sidebarSticky">
                            <nav className="sidebarNav">
                                {navItems.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActiveTab(item.key)}
                                        className={`navItem ${activeTab === item.key ? 'navItemActive' : ''}`}
                                        style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
                                    >
                                        <item.icon size={18} strokeWidth={activeTab === item.key ? 2.5 : 2} className="navIcon" />
                                        {item.label}
                                    </button>
                                ))}
                                <Link href="/wishlist" className="navItem" prefetch={false}>
                                    <Heart size={18} strokeWidth={2} className="navIcon" /> Wishlist
                                </Link>
                                <Link href="/contact" className="navItem" prefetch={false}>
                                    <Contact size={18} strokeWidth={2} className="navIcon" /> Contact us
                                </Link>
                                <div className="sidebarDivider" />
                                <button onClick={handleLogout} className="logoutButton">
                                    <LogOut size={18} /> Log out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main */}
                    <div className="mainContent">

                        {/* ── Overview tab ── */}
                        {activeTab === 'overview' && (
                            <>
                                {/* Welcome Hero */}
                                <div className="heroCard">
                                    <div className="heroDecor1" />
                                    <div className="heroDecor2" />
                                    <div className="heroContent">
                                        <div className="heroBadge">
                                            <Sparkles size={14} className="text-primary" />
                                            Premium Member Experience
                                        </div>
                                        <h2 className="heroTitle">
                                            Welcome back, <span className="heroUser">{user?.name}</span>
                                        </h2>
                                        <p className="heroText">
                                            Your next great adventure is just a click away. Manage your bookings, explore saved tours, and discover world-class destinations.
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="statsGrid">
                                    <div className="profileCard">
                                        <div className="profileHeader">
                                            <div className="profileIconBox">
                                                <User size={32} strokeWidth={1.5} />
                                            </div>
                                            <div className="profileInfo">
                                                <h3 className="profileName">{user?.name}</h3>
                                                <p className="profileEmail">{user?.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setActiveTab('settings')} className="profileLink" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
                                            <span>Account Settings</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    <div className="statCard saved">
                                        <div className="statIconBox iconSaved">
                                            <Heart size={28} fill="currentColor" />
                                        </div>
                                        <div className="statValue">0</div>
                                        <span className="statLabel">Saved Destinations</span>
                                    </div>

                                    <div className="statCard completed">
                                        <div className="statIconBox iconCompleted">
                                            <MapPin size={28} fill="currentColor" />
                                        </div>
                                        <div className="statValue">0</div>
                                        <span className="statLabel">Trips Completed</span>
                                    </div>
                                </div>

                                {/* Empty / CTA state */}
                                <div className="emptyState">
                                    <div className="emptyStateBg" />
                                    <div className="emptyIconBox">
                                        <Compass className="emptyIcon" size={40} />
                                    </div>
                                    <h3 className="emptyTitle">Your Adventure Awaits</h3>
                                    <p className="emptyText">
                                        Explore our curated collections to start your journey and find your perfect getaway.
                                    </p>
                                    <div className="ctaGrid">
                                        <Link href="/packages" className="ctaButton ctaPrimary">
                                            Browse Packages <ArrowRight size={20} />
                                        </Link>
                                        <Link href="/trending" className="ctaButton ctaSecondary">
                                            Trending Now <Star size={20} className="text-amber-400" />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Booking Details tab ── */}
                        {activeTab === 'bookings' && (
                            <div>
                                {/* Tab hero */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    borderRadius: '2rem',
                                    padding: '2.5rem',
                                    marginBottom: '2rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-30%', right: '-5%',
                                        width: '40%', height: '200%',
                                        background: 'rgba(255,107,53,0.08)',
                                        borderRadius: '50%', filter: 'blur(60px)',
                                    }} />
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            padding: '0.35rem 1rem', borderRadius: '999px',
                                            fontSize: '0.6875rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)',
                                            textTransform: 'uppercase', letterSpacing: '0.08em',
                                            marginBottom: '1.25rem',
                                        }}>
                                            <FileText size={12} style={{ color: '#ff6b35' }} />
                                            Booking Documents
                                        </div>
                                        <h2 style={{
                                            fontSize: '1.875rem', fontWeight: 900, color: '#fff',
                                            letterSpacing: '-0.02em', lineHeight: 1.15,
                                            textTransform: 'uppercase', fontStyle: 'italic',
                                            marginBottom: '0.5rem',
                                        }}>
                                            Your Booking <span style={{ color: '#ff6b35' }}>Details</span>
                                        </h2>
                                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, maxWidth: '28rem' }}>
                                            All your booking confirmation PDFs and travel documents shared by our team.
                                        </p>
                                    </div>
                                </div>

                                {/* PDF list */}
                                {pdfsLoading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                                        <div style={{
                                            width: 40, height: 40,
                                            border: '3px solid #f1f5f9', borderTopColor: '#ff6b35',
                                            borderRadius: '50%', animation: 'dashSpin 0.8s linear infinite',
                                        }} />
                                    </div>
                                ) : pdfs.length === 0 ? (
                                    <div style={{
                                        background: '#fff', borderRadius: '2rem',
                                        border: '1px solid #f1f5f9', padding: '4rem 2rem',
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', textAlign: 'center',
                                    }}>
                                        <div style={{
                                            width: '4rem', height: '4rem', borderRadius: '50%',
                                            background: '#f8fafc', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            marginBottom: '1.25rem', border: '1px solid #e2e8f0',
                                        }}>
                                            <FileText size={28} style={{ color: '#cbd5e1' }} />
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                                            No Documents Yet
                                        </h3>
                                        <p style={{ color: '#64748b', maxWidth: '22rem', fontWeight: 500, lineHeight: 1.6 }}>
                                            Your booking confirmation PDFs will appear here once our team uploads them for your trips.
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {pdfs.map(pdf => (
                                            <div key={pdf._id} style={{
                                                background: '#fff', borderRadius: '1.25rem',
                                                border: '1px solid #e2e8f0',
                                                padding: '1.5rem',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                                display: 'flex', flexDirection: 'column', gap: '1rem',
                                                transition: 'box-shadow 0.2s, transform 0.2s',
                                            }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                                                    (e.currentTarget as HTMLDivElement).style.transform = '';
                                                }}
                                            >
                                                {/* PDF icon area */}
                                                <div style={{
                                                    height: '6rem', borderRadius: '0.875rem',
                                                    background: 'linear-gradient(135deg, #fff7f5, #fff1eb)',
                                                    border: '1px solid #fde8d8',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexDirection: 'column', gap: '0.4rem',
                                                }}>
                                                    <FileText size={32} style={{ color: '#ff6b35' }} />
                                                    <span style={{ fontSize: '0.5625rem', fontWeight: 800, color: '#f97316', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                                        PDF Document
                                                    </span>
                                                </div>

                                                <div>
                                                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem', lineHeight: 1.3 }}>
                                                        {pdf.label}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.6875rem', fontWeight: 600, color: '#94a3b8' }}>
                                                        <Calendar size={10} />
                                                        {new Date(pdf.uploadedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                                    <a
                                                        href={`${BASE_URL}${pdf.url}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            flex: 1, padding: '0.65rem',
                                                            borderRadius: '10px',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                                            background: '#ff6b35', color: '#fff',
                                                            fontSize: '0.75rem', fontWeight: 800,
                                                            textDecoration: 'none',
                                                            boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
                                                        }}
                                                    >
                                                        <Eye size={13} /> View
                                                    </a>
                                                    <a
                                                        href={`${BASE_URL}${pdf.url}`}
                                                        download
                                                        style={{
                                                            padding: '0.65rem 0.875rem',
                                                            borderRadius: '10px',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                                            background: '#f8fafc', color: '#475569',
                                                            fontSize: '0.75rem', fontWeight: 800,
                                                            textDecoration: 'none',
                                                            border: '1px solid #e2e8f0',
                                                        }}
                                                    >
                                                        <Download size={13} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Settings tab ── */}
                        {activeTab === 'settings' && (
                            <div>
                                <div style={{
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    borderRadius: '2rem', padding: '2.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden'
                                }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.6875rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                                            <Settings size={12} style={{ color: '#ff6b35' }} />
                                            Preferences
                                        </div>
                                        <h2 style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                                            Account <span style={{ color: '#ff6b35' }}>Settings</span>
                                        </h2>
                                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, maxWidth: '28rem' }}>
                                            Update your personal profile, contact information, and security credentials.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdateProfile} style={{ background: '#fff', borderRadius: '2rem', padding: '2.5rem', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} style={{ color: '#3b82f6' }} /> Personal Details
                                    </h3>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Full Name</label>
                                            <input type="text" name="name" defaultValue={user?.name} required style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, outline: 'none', color: '#0f172a' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Phone / Contact</label>
                                            <input type="text" name="phone" defaultValue={user?.phone || ''} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, outline: 'none', color: '#0f172a' }} />
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Email Address <span style={{ color: '#94a3b8', fontWeight: 600, textTransform: 'none' }}>(Contact support to change)</span></label>
                                            <input type="email" readOnly value={user?.email} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1.5px solid #cbd5e1', background: '#f1f5f9', fontWeight: 600, color: '#64748b', outline: 'none', cursor: 'not-allowed' }} />
                                        </div>
                                    </div>

                                    <div style={{ height: '1px', background: '#f1f5f9', margin: '2rem 0' }} />

                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Lock size={18} style={{ color: '#f43f5e' }} /> Security
                                    </h3>

                                    <div style={{ marginBottom: '2.5rem', maxWidth: '320px' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Change Password</label>
                                        <input type="password" name="password" placeholder="Enter a new password..." style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, outline: 'none', color: '#0f172a' }} />
                                        <p style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.5rem', fontWeight: 500 }}>Leave this field empty if you do not wish to change your current password.</p>
                                    </div>

                                    <button type="submit" disabled={updatingProfile} style={{ padding: '1rem 2rem', background: '#ff6b35', color: '#fff', fontSize: '0.875rem', fontWeight: 800, borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', opacity: updatingProfile ? 0.7 : 1, width: '100%', maxWidth: 'max-content' }}>
                                        {updatingProfile ? 'Saving Settings...' : 'Save Profile Settings'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`@keyframes dashSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
