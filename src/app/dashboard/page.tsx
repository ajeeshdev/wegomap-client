"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    User, Heart, Briefcase, MapPin, 
    Calendar, ArrowRight, Settings, 
    LogOut, Sparkles, Clock, ShieldCheck,
    Compass, Bell, Search, Star, Package, Contact
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import './dashboard.css';

export default function UserDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const profile = localStorage.getItem('userProfile');
            
            if (!token || !profile) {
                router.push('/login');
                return;
            }
            
            try {
                setUser(JSON.parse(profile));
            } catch (e) {
                router.push('/login');
            }
            setLoading(false);
        };
        
        checkAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isLoggedIn');
        window.dispatchEvent(new Event('authChange'));
        router.push('/');
        toast.success('Logged out successfully');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: User, active: true },
        { name: 'Wishlist', href: '/wishlist', icon: Heart },
        { name: 'Contact us', href: '/contact', icon: Contact },
    ];

    return (
        <div className="dashboardPage">
            <div className="dashboardContainer">
                
                {/* Header Section */}
                <div className="dashboardHeader">
                    <h2 className="dashboardTitle">Dashboard</h2>
                    <div className="dashboardAccent"></div>
                    <p className="dashboardSubtitle">Manage your adventures and account settings.</p>
                </div>

                <div className="dashboardLayout">
                    {/* Sidebar */}
                    <aside className="dashboardSidebar">
                        <div className="sidebarSticky">
                            <nav className="sidebarNav">
                                {navigationItems.map((item) => (
                                    <Link 
                                        key={item.href} 
                                        href={item.href}
                                        className={`navItem ${item.active ? 'navItemActive' : ''}`}
                                    >
                                        <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} className="navIcon" />
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="sidebarDivider"></div>
                                <button 
                                    onClick={handleLogout}
                                    className="logoutButton"
                                >
                                    <LogOut size={18} />
                                    Log out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="mainContent">
                        
                        {/* Welcome Hero Card */}
                        <div className="heroCard">
                            <div className="heroDecor1"></div>
                            <div className="heroDecor2"></div>
                             
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

                        {/* Stats & Profile Overview */}
                        <div className="statsGrid">
                            {/* Profile Information */}
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
                                <Link href="/contact" className="profileLink">
                                    <span>Account Settings</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Stat: Saved */}
                            <div className="statCard saved">
                                <div className="statIconBox iconSaved">
                                    <Heart size={28} fill="currentColor" />
                                </div>
                                <div className="statValue">0</div>
                                <span className="statLabel">Saved Destinations</span>
                            </div>

                            {/* Stat: Completed */}
                            <div className="statCard completed">
                                <div className="statIconBox iconCompleted">
                                    <MapPin size={28} fill="currentColor" />
                                </div>
                                <div className="statValue">0</div>
                                <span className="statLabel">Trips Completed</span>
                            </div>
                        </div>

                        {/* Recent Activity / Empty State */}
                        <div className="emptyState">
                             <div className="emptyStateBg"></div>
                             
                             <div className="emptyIconBox">
                                 <Compass className="emptyIcon" size={40} />
                             </div>
                             
                             <h3 className="emptyTitle">Your Adventure Awaits</h3>
                             <p className="emptyText">
                                 Explore our curated collections to start your journey and find your perfect getaway.
                             </p>
                             
                             <div className="ctaGrid">
                                <Link href="/tours" className="ctaButton ctaPrimary">
                                    Browse Packages <ArrowRight size={20} />
                                </Link>
                                <Link href="/trending" className="ctaButton ctaSecondary">
                                    Trending Now <Star size={20} className="text-amber-400" />
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
