"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, User, Mail, Phone, X, Heart, Search, Clock, Filter, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL, getImageUrl } from '@/config';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PackageCard from './PackageCard';
import EnquireModal from './EnquireModal';
import WishlistButton from '@/components/WishlistButton';
import { MessageSquare } from 'lucide-react';



export interface TourPackage {
    _id?: string;
    slug?: string;
    image: string;
    duration: string;
    title: string;
    location: string;
    price: string;
    originalPrice: string;
    strip?: string;
    detailUrl: string;
    packCode?: string;
}

export interface TourCategoryPageProps {
    title: string;
    subtitle: string;
    preTitle?: string;
    bannerImage: string;
    bookCount?: number;
    packages: TourPackage[];
    readMoreContent?: React.ReactNode;
    readMoreHeading?: string;
}

import DynamicPageBanner from './DynamicPageBanner';
import { testimonialsData as testimonials } from '@/data/testimonialsData';

export default function TourCategoryPage({
    title,
    subtitle,
    preTitle,
    bannerImage,
    bookCount = 25,
    packages,
    readMoreContent,
    readMoreHeading,
}: TourCategoryPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState(true);

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('all');
    const [durationRange, setDurationRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);


    const filtered = useMemo(() => {
        let list = packages;
        
        if (durationRange !== 'all') {
            list = list.filter(p => {
                const durationMatch = p.duration.match(/(\d+)\s*(?:Day|Days)/i);
                const titleMatch = p.title.match(/(\d+)D/i);
                const days = parseInt(durationMatch?.[1] || titleMatch?.[1] || "0") || 0;
                return days === parseInt(durationRange);
            });
        }
        
        if (sortOrder === 'low-high' || sortOrder === 'high-low') {
            list = [...list].sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
                const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
                return sortOrder === 'low-high' ? priceA - priceB : priceB - priceA;
            });
        }
        
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [packages, searchQuery, sortOrder, durationRange]);


    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success && data.data.wishlist) {
                        setWishlist(data.data.wishlist);
                    }
                } catch (e) {
                    console.error('Error fetching wishlist status:', e);
                }
            }
        };
        fetchWishlist();

        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${API_URL}/testimonials`);
                const data = await res.json();
                if (data.success) {
                    setTestimonials(data.data.map((t: any) => ({
                        name: t.name || t.title,
                        role: t.location || t.designation || 'Verified Traveler',
                        avatar: t.image ? getImageUrl(t.image) : null,
                        quote: t.message || t.review || t.text || t.description || 'Great experience!'
                    })));
                }
            } catch (err) {
                console.error("Failed to load testimonials:", err);
            } finally {
                setLoadingTestimonials(false);
            }
        };
        fetchTestimonials();
    }, []);

    const toggleWishlist = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to save tours');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/wishlist/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setWishlist(data.data);
                toast.success(data.message);
            }
        } catch (err) {
            toast.error('Failed to update wishlist');
        }
    };

    const handleQuickPlan = (pkgTitle: string) => {
        setSelectedPackage(pkgTitle);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        // Redundant as we now use EnquireModal, but kept for compatibility if needed
    };


    return (
        <div className="tourCatPage">

            {/* ── Banner / Hero ── */}
            <DynamicPageBanner
                fallbackTitle={title}
                fallbackSubtitle={subtitle}
                fallbackPreTitle={preTitle}
                fallbackImage={getImageUrl(bannerImage)}
                breadcrumbs={[{ label: title }]}
                variant="large"
                centered={true}
            />

            {/* ── Package Listings ── */}
            <section className="tourCatPackages allToursPage" style={{ background: '#f8fafc' }}>
                <div className="homeContainer">
                    <div className="tourCatBookedBadge">
                        <span className="tourCatBookedNum">{bookCount}</span> tours booked in the last 24 hours.
                    </div>
                    
                    {/* Filter + Search Strip */}
                    <div className="allToursControls" style={{ position: 'static', marginBottom: '2rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                        <div className="allToursControlsInner">
                            {/* Search */}
                            <div className="allToursSearch" style={{ flex: 1, maxWidth: '500px' }}>


                                <Search size={16} className="allToursSearchIcon" />
                                <input
                                    type="text"
                                    placeholder="Search in this category…"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="allToursSearchInput"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="allToursSearchClear">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="allToursControlsDivider" />

                            {/* Sorting */}
                            <div className="allToursSelectFilters">
                                <select 
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="tourSelect"
                                >
                                    <option value="all">Budget</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                                
                                <select 
                                    value={durationRange}
                                    onChange={(e) => setDurationRange(e.target.value)}
                                    className="tourSelect"
                                >
                                    <option value="all">Duration</option>
                                    {[1,2,3,4,5,6,7,8,9,10].map(d => (
                                        <option key={d} value={d}>{d} Day{d > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button className="mobileFilterToggle" onClick={() => setShowFilters(!showFilters)}>
                                <Filter size={16} /> Filter
                            </button>
                        </div>

                        {/* Mobile Filter Sheet Overlay */}
                        {showFilters && (
                            <div className="mobileFilterOverlay" onClick={() => setShowFilters(false)}>
                                <div className="mobileFilterSheet" onClick={(e) => e.stopPropagation()}>
                                    <div className="mobileFilterSheetHandle" />
                                    
                                    <div className="mobileFilterDrawerHeader">
                                        <span>Filter {title}</span>
                                        <div className="drawerActions">
                                            <button className="resetBtn" onClick={() => { setSortOrder('all'); setDurationRange('all'); setSearchQuery(''); }}>Reset</button>
                                            <button className="doneBtn" onClick={() => setShowFilters(false)}>Done</button>
                                        </div>
                                    </div>
                                    
                                    <div className="mobileFilterDrawerSection">
                                        <div className="flex gap-4">
                                            <div className="filterGroup flex-1">
                                                <label>Sort By</label>
                                                <select 
                                                    value={sortOrder}
                                                    onChange={(e) => setSortOrder(e.target.value)}
                                                >
                                                    <option value="all">Default</option>
                                                    <option value="low-high">Price: Low to High</option>
                                                    <option value="high-low">Price: High to Low</option>
                                                </select>
                                            </div>
                                            <div className="filterGroup flex-1">
                                                <label>Duration</label>
                                                <select 
                                                    value={durationRange}
                                                    onChange={(e) => setDurationRange(e.target.value)}
                                                >
                                                    <option value="all">Any Duration</option>
                                                    {[1,2,3,4,5,6,7,8,9,10].map(d => (
                                                        <option key={d} value={d}>{d} Day{d > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="allToursGrid">
                        {filtered.map((pkg, i) => {
                            const normalizedPkg = {
                                slug: pkg.slug || pkg._id || (pkg.detailUrl?.split('/').pop()) || '',
                                title: pkg.title,
                                location: pkg.location,
                                duration: pkg.duration,
                                price: pkg.price,
                                oldPrice: pkg.originalPrice,
                                image: pkg.image,
                                images: (pkg as any).images || [],
                                subtitle: (pkg as any).subtitle || '',
                                highlights: (pkg as any).highlights || [],
                                itinerary: (pkg as any).itinerary || [],
                                averageRating: (pkg as any).averageRating || 4.9,
                                reviewCount: (pkg as any).reviewCount || 150,
                                noCostEmi: (pkg as any).noCostEmi,
                                totalPrice: (pkg as any).totalPrice,
                                per: (pkg as any).per || '/ Person',
                                onoffer: (pkg as any).onoffer,
                                _id: pkg._id
                            };
                            return (
                                <PackageCard 
                                    key={`${pkg.slug}-${i}`}
                                    pkg={normalizedPkg}
                                    wishlist={wishlist}
                                    toggleWishlist={toggleWishlist}
                                    onEnquire={(e: React.MouseEvent, title: string) => handleQuickPlan(title)}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ── Read More Content (optional) ── */}
            {readMoreContent && (
                <section className="tourCatReadMore">
                    <div className="tourCatContainer">
                        {readMoreHeading && (
                            <h2 className="tourCatReadMoreHeading">
                                <span className="tourCatHeadingHighlight">{readMoreHeading}</span>
                            </h2>
                        )}
                        <div className="tourCatReadMoreBody">
                            {typeof readMoreContent === 'string' ? (
                                <div dangerouslySetInnerHTML={{ __html: readMoreContent }} />
                            ) : (
                                readMoreContent
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Testimonials (Home Page Style) ── */}
            {testimonials.length > 0 && (
            <section className="commonPadding bg-slate-50 testimonialSection">
                <div className="homeContainer">
                <div className="sectionHeader flex items-center justify-center mb-6">
                    <div className="titleArea">
                    <span className="sectionSubtitle">Guest Experiences</span>
                    <h2 className="sliderTitle">What Travelers Are Saying</h2>
                    </div>
                </div>
                
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={testimonials.length > 2}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true, el: '.test-pagination' }}
                    breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 }
                    }}
                    className="testimonialSwiper"
                >
                    {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <div className="testimonialCard">
                        <div className="quoteIcon"><MessageSquare size={24} /></div>
                        <p className="testimonialText">"{t.quote}"</p>
                        <div className="authorArea">
                            <div className="authorImg">
                            <Image 
                                src={t.avatar || "/assets/site/assets/images/google-review.svg"} 
                                alt={t.name} 
                                width={32} 
                                height={32} 
                                className="rounded-full"
                            />
                            </div>

                            <div className="authorInfo">
                            <h4 className="authorName">{t.name || "Happy Traveler"}</h4>
                            <div className="authorStars flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#fbbf24" color="#fbbf24" strokeWidth={3} />)}
                            </div>
                            </div>
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="test-pagination mt-8 flex justify-center"></div>
                </div>
            </section>
            )}

            {/* ── Footer CTA ── */}
            <section className="tourCatCTA">
                <div className="homeContainer">
                    <p className="tourCatCTALabel" style={{ color: '#FF6B35' }}>GREAT PLACES TO VISIT</p>
                    <h2 className="tourCatCTATitle">Planning your next trip?</h2>
                    <p className="tourCatCTASub">Talk to our experts and get a detailed plan for your next trip</p>
                    <div className="tourCatCTABtns">
                        <button 
                            onClick={() => handleQuickPlan('General Inquiry')}
                            className="tourCatCTAEnquire" 
                            style={{ backgroundColor: '#FF6B35' }}
                        >
                            Enquire Now
                        </button>
                        <a href="tel:+918590370566" className="tourCatCTACall">
                            📞 Talk With Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Plan Modal Popup */}
            <EnquireModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                packageName={selectedPackage} 
            />
        </div>

    );
}
