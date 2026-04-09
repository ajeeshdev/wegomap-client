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
                            <div className="wishlistGrid">
                                {wishlist.map((pkg) => {
                                    return (
                                        <div key={pkg._id} className="wishlistCard">
                                            {/* Image Area */}
                                            <div className="cardImageContainer">
                                                <Image
                                                    src={getImageUrl(pkg.images?.[0] || pkg.image || pkg.thumb || '/bg-placeholder.jpg')}
                                                    alt={pkg.title}
                                                    fill
                                                    className="cardImage"
                                                    unoptimized
                                                />
                                                
                                                {/* Price Badge */}
                                                <div className="cardPriceBadge">
                                                    <div className="priceTagWrapper">
                                                        {pkg.oldamt && (
                                                            <span className="oldPrice">
                                                                ₹{Number(pkg.oldamt).toLocaleString()}
                                                            </span>
                                                        )}
                                                        <div className="currentPrice">
                                                            <span>₹</span>{Number(pkg.price).toLocaleString()}
                                                            <small className="perPerson">Per Person</small>
                                                        </div>
                                                    </div>
                                                </div>
 
                                                {/* Remove Wishlist Button */}
                                                <button 
                                                    onClick={(e) => removeFromWishlist(pkg._id, e)}
                                                    className="removeButton"
                                                >
                                                    <Heart size={16} fill="currentColor" />
                                                </button>
                                            </div>
 
                                            {/* Content Area */}
                                            <div className="cardContent">
                                                <h3 className="cardTitle">{pkg.title}</h3>
                                                <p className="cardMeta">
                                                    <MapPin size={12} /> {pkg.location || 'Global destination'}
                                                </p>
                                                <div className="cardFooter">
                                                    <div className="ratingWrapper">
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={12} fill={i < Math.floor(pkg.rating || 5) ? "currentColor" : "none"} />
                                                            ))}
                                                        </div>
                                                        <span className="ratingValue">({pkg.rating || 5})</span>
                                                    </div>
                                                    <Link href={`/packages/${pkg.slug || pkg._id}`} className="viewButton">
                                                        <ChevronRight size={16} />
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
