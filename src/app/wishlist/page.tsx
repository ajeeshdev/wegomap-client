"use client";
import { getImageUrl } from "@/config";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Heart, MapPin, Star, ArrowLeft, 
    Trash2, ShoppingBag, ArrowRight, ChevronRight,
    Sparkles, User, Contact
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { API_URL } from '@/config';
import PackageCard from '@/components/PackageCard';

import './wishlist.css';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchWishlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/wishlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.headers.get('content-type')?.includes('application/json')) {
                const data = await res.json();
                if (data.success) {
                    setWishlist(data.data);
                }
            }
        } catch (err) {
            console.error('Error fetching wishlist:', err);
            toast.error('Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [router]);

    const removeFromWishlist = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/auth/wishlist/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setWishlist(wishlist.filter(item => item._id !== id));
                toast.success('Removed from wishlist');
            }
        } catch (err) {
            toast.error('Failed to remove item');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
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
        { name: 'Dashboard', href: '/dashboard', icon: User },
        { name: 'Wishlist', href: '/wishlist', icon: Heart, active: true },
        { name: 'Contact us', href: '/contact', icon: Contact },
    ];

    return (
        <div className="wishlistPage">
            <div className="wishlistContainer">
                
                {/* Header Section */}
                <div className="wishlistHeader">
                    <h2 className="wishlistTitle">Wishlist</h2>
                    <div className="wishlistAccent"></div>
                    <p className="wishlistSubtitle">Destinations you&apos;ve fallen in love with.</p>
                </div>

                <div className="wishlistLayout">
                    {/* Sidebar */}
                    <aside className="wishlistSidebar">
                        <div className="sidebarSticky">
                            <nav className="sidebarNav">
                                {navigationItems.map((item) => (
                                    <Link 
                                        key={item.href} 
                                        href={item.href}
                                        className={`navItem ${item.active ? 'navItemActive' : ''}`}
                                    >
                                        <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} />
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="sidebarDivider"></div>
                                <button 
                                    onClick={handleLogout}
                                    className="logoutButton"
                                >
                                    <Trash2 size={18} />
                                    Log out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="wishlistMain">
                        {wishlist.length === 0 ? (
                            <div className="emptyState">
                                <div className="emptyIconBox">
                                    <Heart size={40} fill="currentColor" />
                                </div>
                                <h3 className="emptyTitle">Your wishlist is empty</h3>
                                <p className="emptyText">
                                    Looks like you haven&apos;t saved any adventures yet. Explore our collections and find something magical!
                                </p>
                                <Link href="/packages" className="exploreButton">
                                    Explore Tours <ArrowRight size={20} />
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                {wishlist.map((pkg) => {
                                    return (
                                        <div key={pkg._id} className="group relative bg-[#f1f5f9] rounded-[2rem] overflow-hidden border border-transparent hover:border-blue-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                                            {/* Image Area */}
                                            <div className="aspect-[4/3] relative overflow-hidden">
                                                <Image
                                                    src={getImageUrl(pkg.images?.[0] || pkg.image || pkg.thumb || '/bg-placeholder.jpg')}
                                                    alt={pkg.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    unoptimized
                                                />
                                                {/* Price Badge */}
                                                <div className="absolute top-4 left-4 z-10">
                                                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl border border-white/20">
                                                        {pkg.oldamt && (
                                                            <span className="text-[9px] text-slate-400 line-through block font-bold mb-0.5 tracking-tighter decoration-red-400/50">
                                                                ₹{Number(pkg.oldamt).toLocaleString()}
                                                            </span>
                                                        )}
                                                        <div className="flex items-center gap-0.5 text-slate-900 font-black tracking-tighter text-sm">
                                                            <span className="text-[10px]">₹</span>{Number(pkg.price).toLocaleString()}
                                                            <small className="text-[8px] text-slate-500 font-bold ml-1 uppercase">Per Person</small>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Remove Wishlist Button */}
                                                <button 
                                                    onClick={(e) => removeFromWishlist(pkg._id, e)}
                                                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all z-20 bg-rose-500 text-white hover:bg-rose-600"
                                                >
                                                    <Heart size={14} fill="currentColor" />
                                                </button>
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-black text-slate-900 mb-1.5 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{pkg.title}</h3>
                                                <p className="text-slate-500 text-[11px] font-semibold mb-6 flex items-center gap-1">
                                                    <MapPin size={10} /> {pkg.location || 'Global destination'}
                                                </p>
                                                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="flex gap-0.5 text-yellow-500">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={12} fill={i < Math.floor(pkg.rating || 5) ? "currentColor" : "none"} />
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-600">({pkg.rating || 5})</span>
                                                    </div>
                                                    <Link href={`/packages/${pkg.slug || pkg._id}`} className="w-8 h-8 bg-white group-hover:bg-blue-600 group-hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all border border-slate-100">
                                                        <ChevronRight size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
