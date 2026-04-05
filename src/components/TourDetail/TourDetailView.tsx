"use client";

import { useEffect, useState } from 'react';
import { API_URL, getImageUrl } from '@/config';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { packagesData, TourPackageDetail } from '@/data/packages';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import PackageCard from '@/components/PackageCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';
import Link from 'next/link';
import {
    Clock, MapPin, Check, X, ShieldCheck,
    ChevronDown, Send, ArrowLeft, Sparkles,
    Building2, Car, Utensils, Star, Phone,
    Calendar, Users, Info, User, Heart, MessageSquare, Quote, ThumbsUp, Share2,
    Plane, Waves, Mountain, Palmtree, Camera, Tent, Wifi, Coffee, Music, Ticket, Sunset, ShoppingBag,
    BedDouble, Bed, Hotel, Bath, ShowerHead, ThermometerSnowflake, Tv, Key, DoorOpen, TreePalm
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    Building2, Utensils, Car, Plane, MapPin, Clock, 
    ShieldCheck, Sparkles, Waves, Mountain, Palmtree, 
    Camera, Tent, Wifi, Coffee, Music, Ticket, Star,
    Heart, Sunset, ShoppingBag, BedDouble, Bed, Hotel, 
    Bath, ShowerHead, ThermometerSnowflake, Tv, Key, 
    DoorOpen, TreePalm, Users
};
import { useEnquiry } from '@/context/EnquiryContext';

export default function TourDetailView({ id }: { id: string }) {
    const [pkg, setPkg] = useState<TourPackageDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);
    const [similarPackages, setSimilarPackages] = useState<any[]>([]);

    useEffect(() => {
        const getSimilar = async () => {
            try {
                const res = await fetch(`${API_URL}/packages`);
                if (res.headers.get('content-type')?.includes('application/json')) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                        let published = data.data.filter((p: any) => p.status === 'Published' && p._id !== id && p.slug !== id);
                        published.sort(() => 0.5 - Math.random());
                        setSimilarPackages(published.slice(0, 6));
                    }
                }
            } catch (e) {
                console.error('Error fetching similar packages:', e);
            }
        };
        getSimilar();
    }, [id]);


    const { openEnquiry } = useEnquiry();
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.headers.get('content-type')?.includes('application/json')) {
                        const data = await res.json();
                        if (data.success) {
                            setUser(data.data);
                            if (data.data.wishlist) {
                                setWishlist(data.data.wishlist);
                            }
                        }
                    }
                } catch (e) {
                    console.error('Error fetching user data:', e);
                }
            }
        };
        fetchUserData();
    }, []);



    const toggleWishlist = async (pkgId: string, e: React.MouseEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to save tours');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/wishlist/${pkgId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.headers.get('content-type')?.includes('application/json')) {
                const data = await res.json();
                if (data.success) {
                    setWishlist(data.data);
                    toast.success(data.message);
                }
            }
        } catch (err) {
            toast.error('Failed to update wishlist');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function getPackage() {
            setLoading(true);
            try {
                // Try API first to allow Admin updates to take priority
                const res = await fetch(`${API_URL}/packages/${id}`);
                let data: any = {};
                if (res.headers.get('content-type')?.includes('application/json')) {
                    data = await res.json();
                }

                if (data.success && data.data) {
                    const p = data.data;
                    setPkg({
                        id: p._id,
                        slug: p.slug || p._id,
                        title: p.title,
                        location: p.location || 'Explore',
                        duration: p.duration || p.days || 'Flexible Duration',
                        price: p.price ? `₹ ${Number(p.price).toLocaleString()}` : 'Contact for Price',
                        oldPrice: p.oldamt ? `₹ ${Number(p.oldamt).toLocaleString()}` : undefined,
                        image: getImageUrl(p.thumb || (p.images && p.images[0]) || '/bg-placeholder.jpg'),
                        images: (p.images || []).map((img: string) => getImageUrl(img)),
                        description: p.description || '',
                        highlights: p.highlights || [],
                        itinerary: (p.itinerary || []).map((item: any) => ({
                            ...item,
                            day: typeof item.day === 'string' ? item.day : (item.title ? `Day ${item.day}: ${item.title}` : `Day ${item.day}`),
                            activity: item.description || item.activity || '',
                            image: item.image ? getImageUrl(item.image) : item.image
                        })),
                        inclusions: p.inclusions || [],
                        exclusions: p.exclusions || [],
                        amenities: p.amenities?.length > 0 ? p.amenities : [
                            { icon: 'Building2', label: 'Luxury Stays', color: 'blue' },
                            { icon: 'Utensils', label: 'Fine Dining', color: 'rose' },
                            { icon: 'Car', label: 'Private Hub', color: 'emerald' }
                        ],
                    });
                    setLoading(false);
                    return;
                }

                // Fallback to local hardcoded data if API fails or No data
                const slug = id;
                if (slug && packagesData[slug]) {
                    const localPkg = packagesData[slug];
                    setPkg({
                        ...localPkg,
                        image: getImageUrl(localPkg.image),
                        itinerary: localPkg.itinerary.map(item => ({
                            ...item,
                            image: item.image ? getImageUrl(item.image) : item.image
                        }))
                    });
                    setLoading(false);
                    return;
                }

                setPkg(null);
            } catch (err) {
                console.error('Fetch error:', err);
                // Last ditch effort: Try local data if network failed
                const slug = id;
                if (slug && packagesData[slug]) {
                    const localPkg = packagesData[slug];
                    setPkg({
                        ...localPkg,
                        image: getImageUrl(localPkg.image),
                        itinerary: localPkg.itinerary.map(item => ({
                            ...item,
                            image: item.image ? getImageUrl(item.image) : item.image
                        }))
                    });
                } else {
                    setPkg(null);
                }
            } finally {
                setLoading(false);
            }
        }
        if (id) getPackage();
    }, [id]);




    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="relative">
                <div className="w-20 h-20 border-8 border-slate-50 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );

    if (!pkg) return (
        <div className="pt-40 text-center min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <div className="text-8xl mb-6">🏜️</div>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic">Package Not Found</h2>
            <Link href="/packages" className="mt-8 px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Back to All Tours
            </Link>
        </div>
    );

    return (
        <div className="packageDetailPage">
            <DynamicPageBanner
                fallbackTitle={pkg.title}
                fallbackImage={pkg.image}
                fallbackSubtitle={pkg.location}
                fallbackPreTitle="Package Details"
                breadcrumbs={[
                    { label: 'Packages', href: '/packages' },
                    { label: pkg.title }
                ]}
            />

            <div className="tourStatsRow homeContainer">
                <div className="tourStatsGrid">
                    <div className="tStat">
                        <span className="tLabel">Duration</span>
                        <div className="tValue">
                            <Clock size={16} /> {pkg.duration}
                        </div>
                    </div>
                    <div className="tStat border-l border-slate-100 pl-8">
                        <span className="tLabel">Location</span>
                        <div className="tValue">
                            <MapPin size={16} /> {pkg.location}
                        </div>
                    </div>
                    <div className="tStat border-l border-slate-100 pl-8">
                        <span className="tLabel">Pricing</span>
                        <div className="tValue priceValue flex items-baseline gap-2">
                            <span>{pkg.price}</span>
                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">/ Person</span>
                            {pkg.oldPrice && (
                                <span className="text-[12px] text-rose-400/70 line-through font-bold ml-1">
                                    {pkg.oldPrice}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="tStat border-l border-slate-100 pl-8 flex items-center">
                        <button
                            onClick={(e) => toggleWishlist(pkg.id, e)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${wishlist.includes(pkg.id) ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                        >
                            <Heart size={16} fill={wishlist.includes(pkg.id) ? "currentColor" : "none"} />
                            {wishlist.includes(pkg.id) ? 'Saved' : 'Save to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>

            <section className="mainContent">
                <div className="homeContainer">
                    <div className="contentGrid">
                        {/* Main Pillar */}
                        <div className="detailsCol">
                            {/* Overview */}
                            <div className="overviewBox">
                                <h2>
                                    <Sparkles size={36} />
                                    Overview
                                </h2>
                                <div
                                    className="description tour-description-content"
                                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                                />

                            </div>

                            {/* Highlights */}
                            <div className="mb-12">
                                <h3 className="sectionTitle">Tour Highlights</h3>
                                <div className="highlightsGrid">
                                    {pkg.highlights.map((highlight, i) => (
                                        <div key={i} className="highlightItem">
                                            <div className="checkIcon">
                                                <Check size={18} strokeWidth={4} />
                                            </div>
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="itinerarySection">
                                <h3 className="sectionTitle">Itinerary</h3>
                                <div className="itineraryTimeline">
                                    {pkg.itinerary.map((item, i) => (
                                        <div key={i} className="timelineItem">
                                            <div className="dot"></div>
                                            <div className="dayLabel">Chapter 0{i + 1}</div>
                                            <h4>{item.day}</h4>
                                            <div className="activityGrid">
                                                <div className="flex flex-col">
                                                    <div 
                                                        className="activityText tour-description-content mb-4"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.activity || '' }}
                                                    />
                                                    
                                                    {item.amenities && item.amenities.length > 0 && (
                                                        <div className="dayAmenities">
                                                            {item.amenities.map((am: any, aIdx: number) => {
                                                                const IconComp = ICON_MAP[am.icon] || Star;
                                                                return (
                                                                    <div key={aIdx} className="dayAmenityBadge">
                                                                        <div className="amIcon">
                                                                            <IconComp size={14} strokeWidth={2} />
                                                                        </div>
                                                                        <span className="amLabel">{am.label}</span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </div>

                                                {item.image && (
                                                    <div className="itineraryImage aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden mt-0 md:mt-0 border border-slate-50">
                                                        <Image src={getImageUrl(item.image)} alt={item.day} fill className="object-cover transition-transform hover:scale-105 duration-700" unoptimized />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inclusions / Exclusions */}
                            <div className="pkgFeaturesSection">
                                <div className="featureCol">
                                    <div className="featureHeader">
                                        <div className="featureIcon inclusion"><ShieldCheck size={20} strokeWidth={2.5} /></div>
                                        <h3>What's included</h3>
                                    </div>
                                    <ul className="featureList">
                                        {pkg.inclusions.map((item, i) => (
                                            <li key={i}>
                                                <Check size={14} className="icon-check" strokeWidth={3} />
                                                <span>{item.replace(/\\\\/g, '/')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="featureCol">
                                    <div className="featureHeader">
                                        <div className="featureIcon exclusion"><Info size={20} strokeWidth={2.5} /></div>
                                        <h3>What's not included</h3>
                                    </div>
                                    <ul className="featureList">
                                        {pkg.exclusions.map((item, i) => (
                                            <li key={i}>
                                                <X size={14} className="icon-x" strokeWidth={3} />
                                                <span>{item.replace(/\\\\/g, '/')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                        </div>

                        <div className="bookingCol">
                            <div className="bookingCard">
                                <div className="bk-price-row">
                                    <div className="bk-price-stack">
                                        <span className="bk-price-val">{pkg.price}</span>
                                        <span className="bk-price-label">Starting Price</span>
                                    </div>

                                </div>

                                <div className="bk-stats">
                                    <div className="bk-stat-item">
                                        <Clock className="bk-icon" size={20} />
                                        <div className="bk-stat-content">
                                            <div className="bk-stat-label">Duration</div>
                                            <div className="bk-stat-val">{pkg.duration}</div>
                                        </div>
                                    </div>
                                    <div className="bk-stat-item">
                                        <Users className="bk-icon" size={20} />
                                        <div className="bk-stat-content">
                                            <div className="bk-stat-label">Group Size</div>
                                            <div className="bk-stat-val">Customized</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ctaGroup">
                                    <button onClick={() => openEnquiry(pkg.title)} className="bk-btn bk-btn-primary w-full">
                                        Get a quick plan
                                    </button>
                                </div>

                                <p className="bk-note">
                                    RESPONSE WITHIN 24 HOURS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Packages Section */}
            {similarPackages.length > 0 && (
                <section className="bg-slate-50 py-20 relative border-t border-slate-200/60 commonPadding pb-0">
                    <div className="homeContainer">
                        <div className="sectionHeader flex items-center justify-center mb-10 text-center">
                            <div className="titleArea">
                                <span className="sectionSubtitle">Explore More</span>
                                <h2 className="sliderTitle" style={{ textTransform: 'none', fontStyle: 'normal' }}>Similar Packages</h2>
                            </div>
                        </div>
                        
                        <div className="block w-full min-w-0 overflow-hidden pb-12 px-2">
                            <Slider
                                infinite={false}
                                speed={500}
                                slidesToShow={4}
                                slidesToScroll={1}
                                arrows={true}
                                dots={false}
                                responsive={[
                                    { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                                    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                                    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false } }
                                ]}
                            >
                            {similarPackages.map((spkg, i) => {
                                const normalizedPkg = {
                                    slug: spkg.slug || spkg._id || '',
                                    title: spkg.title,
                                    location: spkg.location,
                                    duration: spkg.duration,
                                    price: spkg.price ? `₹${Number(String(spkg.price).replace(/[^\d]/g, '')).toLocaleString()}` : 'N/A',
                                    oldPrice: spkg.oldamt ? `₹${Number(String(spkg.oldamt).replace(/[^\d]/g, '')).toLocaleString()}` : null,
                                    image: getImageUrl(spkg.thumb || (spkg.images && spkg.images[0]) || "/bg-placeholder.jpg"),
                                    images: spkg.images || [],
                                    subtitle: spkg.location || '',
                                    highlights: [],
                                    itinerary: [],
                                    averageRating: spkg.averageRating || 4.9,
                                    reviewCount: spkg.reviewCount || 150,
                                    noCostEmi: spkg.noCostEmi,
                                    totalPrice: spkg.totalPrice,
                                    per: spkg.per || '/ Person',
                                    onoffer: spkg.onoffer,
                                    slabel: spkg.slabel,
                                    href: `/packages/${spkg.slug || spkg._id}`,
                                    _id: spkg._id
                                };
                                return (
                                    <div key={`${spkg._id}-${i}`} className="px-2">
                                        <PackageCard 
                                            pkg={normalizedPkg}
                                            wishlist={wishlist}
                                            toggleWishlist={async (pkgId, e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const token = localStorage.getItem('token');
                                                if (!token) return toast.error('Please login to save tours');
                                                try {
                                                    const res = await fetch(`${API_URL}/auth/wishlist/${pkgId}`, {
                                                        method: 'PUT',
                                                        headers: { 'Authorization': `Bearer ${token}` }
                                                    });
                                                    const data = await res.json();
                                                    if (data.success) {
                                                        setWishlist(data.data);
                                                        toast.success(data.message);
                                                    }
                                                } catch (err) {}
                                            }}
                                            onEnquire={(e, title) => openEnquiry(title)}
                                        />
                                    </div>
                                );
                            })}
                            </Slider>
                        </div>
                    </div>
                </section>
            )}

            {/* Mobile Sticky CTA */}
            <div className={`fixed bottom-0 left-0 right-0 z-[100] p-6 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex items-center gap-4 md:hidden transition-transform duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-full'} rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)]`}>
                <div className="flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Pricing</div>
                    <div className="text-3xl font-black text-slate-950 italic">{pkg.price}</div>
                </div>
                <button onClick={() => openEnquiry(pkg.title)} className="flex-[2] bg-primary text-slate-950 font-black uppercase tracking-widest py-6 rounded-3xl text-[10px] shadow-2xl">
                    Secure Spot
                </button>
            </div>
        </div>
    );
}
