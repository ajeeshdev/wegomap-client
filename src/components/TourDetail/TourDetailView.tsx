"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Clock, MapPin, Check, X, ShieldCheck,
    ChevronDown, Send, ArrowLeft, Sparkles,
    Building2, Car, Utensils, Star, Phone,
    Calendar, Users, Info, User, Heart
} from 'lucide-react';
import { API_URL } from '@/config';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { packagesData, TourPackageDetail } from '@/data/packages';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function TourDetailView({ id }: { id: string }) {
    const [pkg, setPkg] = useState<TourPackageDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number>(0);
    const [scrolled, setScrolled] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.headers.get('content-type')?.includes('application/json')) {
                        const data = await res.json();
                        if (data.success && data.data.wishlist) {
                            setWishlist(data.data.wishlist);
                        }
                    }
                } catch (e) {
                    console.error('Error fetching wishlist status:', e);
                }
            }
        };
        fetchWishlist();
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
                const slug = id;
                // 1. Check local static data first
                if (slug && packagesData[slug]) {
                    setPkg(packagesData[slug]);
                    setLoading(false);
                    return;
                }

                // 2. Fetch from CMS API
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
                        duration: p.duration || 'Flexible',
                        price: p.price ? `₹ ${Number(p.price).toLocaleString()}` : 'Contact for Price',
                        oldPrice: p.oldamt ? `₹ ${Number(p.oldamt).toLocaleString()}` : undefined,
                        image: p.thumb || (p.images && p.images[0]) || '/bg-placeholder.jpg',
                        description: p.description || '',
                        highlights: p.highlights || [],
                        itinerary: p.itinerary || [],
                        inclusions: p.inclusions || [],
                        exclusions: p.exclusions || []
                    });
                    setLoading(false);
                    return;
                }

                // 3. Last resort fallback (Mock)
                const titleFromSlug = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                setPkg({
                    id: slug,
                    slug: slug,
                    title: titleFromSlug.includes('Tours') ? titleFromSlug : `${titleFromSlug} Tour`,
                    location: 'Multiple Destinations',
                    duration: '4 Nights 5 Days',
                    price: '₹ 24,999',
                    oldPrice: '₹ 29,500',
                    image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
                    description: `Experience the best of ${titleFromSlug} with our signature tour package. This carefully crafted itinerary takes you through the most iconic landmarks and hidden gems.`,
                    highlights: [
                        'Guided Cultural Walking Tours',
                        'Premium Accommodation in City Center',
                        'Private Airport Transfers',
                        'Authentic Local Culinary Experiences',
                        'Expert Trip Planning & 24/7 Support'
                    ],
                    itinerary: [
                        {
                            day: 'Arrival & Welcome Dinner',
                            activity: 'Welcome to your destination! After a smooth transfer to your hotel, enjoy a welcome dinner featuring local specialties and a detailed briefing of your upcoming adventure.',
                        },
                        {
                            day: 'Local Heritage & Landmarks',
                            activity: 'Spend the day exploring the rich history and architecture. Visit the most iconic monuments and learn about the culture from our expert local guide.',
                        },
                        {
                            day: 'Nature & Scenic Views',
                            activity: 'Escape the city buzz and immerse yourself in the natural beauty of the surrounding region. Perfect for photography and relaxation.',
                        },
                        {
                            day: 'Culture & Leisure',
                            activity: 'A day dedicated to experiencing the local lifestyle. Visit markets, try traditional crafts, or simply enjoy the premium amenities of your resort.',
                        },
                        {
                            day: 'Final Souvenirs & Departure',
                            activity: 'Enjoy a slow morning and some last-minute shopping before we transfer you back for your flight with beautiful memories.',
                        }
                    ],
                    inclusions: [
                        '4 Nights stay in 4-Star hotels',
                        'Daily Breakfast and Select Meals',
                        'Dedicated Private A/C Vehicle',
                        'English-speaking Guide Assistance',
                        'All Applicable Taxes'
                    ],
                    exclusions: [
                        'International/Domestic Airfare',
                        'Personal Expenses and Gratuities',
                        'Optional Sightseeing Entry Fees'
                    ]
                });
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        if (id) getPackage();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
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
                        <div className="tValue priceValue">
                            {pkg.price}
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
                        {/* Main Content Column */}
                        <div className="detailsCol space-y-16">
                            {/* Overview Box */}
                            <div className="overviewBox group">
                                <div className="blurBg"></div>
                                <h2>
                                    <Sparkles size={28} />
                                    Experience Overview.
                                </h2>
                                <div
                                    className="tour-description-content description"
                                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                                />

                                <div className="amenitiesGrid">
                                    <div className="amenity">
                                        <div className="iconBox blue">
                                            <Building2 size={20} />
                                        </div>
                                        <span>3/4 Star Stays</span>
                                    </div>
                                    <div className="amenity">
                                        <div className="iconBox rose">
                                            <Utensils size={20} />
                                        </div>
                                        <span>Daily Meals</span>
                                    </div>
                                    <div className="amenity">
                                        <div className="iconBox emerald">
                                            <Car size={20} />
                                        </div>
                                        <span>Private Vehicle</span>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights Section */}
                            <div>
                                <h3 className="sectionTitle">Tour Highlights.</h3>
                                <div className="highlightsGrid">
                                    {pkg.highlights.map((highlight, i) => (
                                        <div key={i} className="highlightItem group">
                                            <div className="checkIcon">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary Section */}
                            <div className="itinerarySection">
                                <h3 className="itineraryTitle">Day Wise Itinerary.</h3>
                                <div className="itineraryTimeline">
                                    {pkg.itinerary.map((item, i) => (
                                        <div key={i} className="timelineItem group">
                                            <div className="dot"></div>
                                            <div className="dayLabel">Day 0{i + 1}</div>
                                            <h4>{item.day}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                                <p>{item.activity}</p>
                                                {item.image && (
                                                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform group-hover:scale-[1.02]">
                                                        <Image src={item.image} alt={item.day} fill className="object-cover" unoptimized />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inclusions & Exclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                        <h3 className="text-xl font-black uppercase text-slate-900 italic tracking-tight">Inclusions.</h3>
                                    </div>
                                    <ul className="space-y-4 padding-h">
                                        {pkg.inclusions.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 group">
                                                <div className="mt-1 bg-emerald-100 text-emerald-600 p-0.5 rounded-full">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-600 leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                        <h3 className="text-xl font-black uppercase text-slate-900 italic tracking-tight">Exclusions.</h3>
                                    </div>
                                    <ul className="space-y-4 padding-h">
                                        {pkg.exclusions.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 group">
                                                <div className="mt-1 bg-rose-100 text-rose-600 p-0.5 rounded-full">
                                                    <X size={12} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-600 leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Booking Column */}
                        <div className="bookingCol">
                            <div className="bookingCard">
                                <div className="decorCircle"></div>
                                <h4 className="text-slate-900">Book This <br /><span className="text-primary italic">Adventure.</span></h4>

                                <div className="priceRow">
                                    <div className="priceWrap">
                                        <span>₹</span>
                                        {pkg.price.replace('₹', '').trim()}
                                    </div>
                                    <div className="perPerson">
                                        Starting <br />From
                                    </div>
                                    <div className="iconBox">
                                        <Sparkles size={20} className="text-primary" />
                                    </div>
                                </div>

                                <form className="enquiryForm">
                                    <div className="formField">
                                        <label>Full Name</label>
                                        <div className="inputWrap">
                                            <User size={18} />
                                            <input type="text" placeholder="John Doe" required />
                                        </div>
                                    </div>
                                    <div className="formField">
                                        <label>Phone Number</label>
                                        <div className="inputWrap">
                                            <Phone size={18} />
                                            <input type="tel" placeholder="+91 80860 00000" required />
                                        </div>
                                    </div>
                                    <div className="formField">
                                        <label>Travel Date</label>
                                        <div className="inputWrap">
                                            <Calendar size={18} />
                                            <input type="text" placeholder="Approx. Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                                        </div>
                                    </div>
                                    <div className="formField">
                                        <label>Guests</label>
                                        <div className="inputWrap">
                                            <Users size={18} />
                                            <input type="number" placeholder="No. of Adults" min="1" />
                                        </div>
                                    </div>
                                    <button type="submit" className="submitBtn">
                                        Request Itinerary
                                    </button>
                                </form>

                                <button className="pdfBtn">Download PDF Overview</button>

                                <div className="badges mt-8">
                                    <div className="badgeItem">
                                        <div className="dot green"></div>
                                        <span>Verified Tour Partner</span>
                                    </div>
                                    <div className="badgeItem">
                                        <div className="dot blue"></div>
                                        <span>24/7 Expert Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA - iOS Style Bottom Sheet Peek */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 p-6 bg-white/70 backdrop-blur-2xl border-t border-slate-100 flex items-center gap-4 md:hidden transition-transform duration-500 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 ml-1">Starting From</div>
                    <div className="text-2xl font-black text-slate-900 leading-none italic">{pkg.price}</div>
                </div>
                <Link href={`https://wa.me/918086000000?text=Hi, I'm interested in ${pkg.title}`} className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform">
                    <Phone size={24} />
                </Link>
                <button
                    onClick={() => {
                        window.scrollTo({ top: document.querySelector('.bookingCol')?.getBoundingClientRect().top ?? 0 + window.scrollY - 100, behavior: 'smooth' });
                    }}
                    className="flex-[2] bg-primary text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl text-[10px] shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
