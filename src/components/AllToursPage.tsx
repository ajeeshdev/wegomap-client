"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Clock, Filter, X, User, Mail, Phone, Heart, Star, MessageSquare, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import EnquireModal from '@/components/EnquireModal';
import WishlistButton from '@/components/WishlistButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import PackageCard from './PackageCard';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import { packagesData } from '@/data/packages';
import { categoryMappings } from '@/data/categoryMappings';

const ALL_CATEGORIES = [
    { key: 'all', label: '🌍 All Packages' },
    { key: 'kerala', label: '🌿 Kerala' },
    { key: 'international', label: '✈️ International' },
    { key: 'domestic', label: '🇮🇳 Domestic India' },
    { key: 'honeymoon', label: '❤️ Honeymoon' },
    { key: 'family', label: '👨‍👩‍👧 Family' },
    { key: 'adventure', label: '🏔️ Adventure' },
];

const CATEGORY_SLUG_MAP: Record<string, string[]> = {
    kerala: ['kerala-tour-packages', 'kerala-honeymoon-packages', 'kerala-family-tour-packages', 'kerala-tour-packages-from-bangalore'],
    international: ['bali-tour-packages', 'dubai-tour-packages', 'thailand-tour-packages', 'maldives-tour-packages', 'malaysia-tour-packages', 'singapore-tour-package', 'sri-lanka', 'bhutan-packages', 'nepal-tour-packages', 'vietnam-package', 'azerbaijan-tour-packages', 'lakshadweep-tour-package'],
    domestic: ['manali-tour-packages', 'kashmir-holiday-package', 'leh-ladakh-tour-package', 'rajasthan-tour-package', 'golden-triangle-tour-package', 'andaman-packages', 'varanasi-package', 'meghalaya-tour-package', 'darjeeling', 'goa-tour-packages', 'ooty-tour-packages', 'kodaikanal-tour-packages', 'coorg-tour-package', 'ooty-kodaikanal-tour-packages', 'coorg-mysore-ooty'],
    honeymoon: ['kerala-honeymoon-packages'],
    family: ['kerala-family-tour-packages'],
    adventure: ['leh-ladakh-tour-package', 'bhutan-packages', 'meghalaya-tour-package', 'darjeeling', 'kashmir-holiday-package'],
};

interface PackageCardData {
    slug: string;
    title: string;
    location: string;
    duration: string;
    price: string;
    oldPrice?: string | null;
    image: string;
    images?: string[];
    subtitle?: string;
    highlights?: string[];
    itinerary?: any[];
    categories: string[];
    averageRating?: number;
    reviewCount?: number;
    status?: string;
    order?: number;
    onoffer?: boolean;
    slabel?: string;
}

function buildAllPackages(): PackageCardData[] {
    const seen = new Set<string>();
    const result: PackageCardData[] = [];
    const slugCategoryMap: Record<string, Set<string>> = {};

    Object.entries(CATEGORY_SLUG_MAP).forEach(([cat, catGroups]) => {
        catGroups.forEach(catGroup => {
            const slugs = categoryMappings[catGroup] || [];
            slugs.forEach(slug => {
                if (!slugCategoryMap[slug]) slugCategoryMap[slug] = new Set();
                slugCategoryMap[slug].add(cat);
            });
        });
    });

    Object.entries(slugCategoryMap).forEach(([slug, cats]) => {
        if (seen.has(slug)) return;
        const pkg = (packagesData as any)[slug];
        if (!pkg) return;
        seen.add(slug);
        result.push({
            slug,
            title: pkg.title,
            location: pkg.location,
            duration: pkg.duration,
            price: pkg.price,
            oldPrice: pkg.oldPrice,
            image: getImageUrl(pkg.image),
            categories: [...cats],
            averageRating: pkg.averageRating,
            reviewCount: pkg.reviewCount,
            onoffer: pkg.onoffer,
            slabel: pkg.slabel,
        });
    });

    return result;
}

const ALL_PACKAGES = buildAllPackages();

export default function AllToursPage() {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('all');
    const [durationRange, setDurationRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [cmsPackages, setCmsPackages] = useState<PackageCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (!res.headers.get('content-type')?.includes('application/json')) {
                        console.warn(`Auth API returned non-JSON response: ${res.status}`);
                        return;
                    }

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
            
            if (!res.headers.get('content-type')?.includes('application/json')) {
                throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
            }

            const data = await res.json();
            if (data.success) {
                setWishlist(data.data);
                toast.success(data.message);
            }
        } catch (err) {
            toast.error('Failed to update wishlist');
        }
    };

    useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch(`${API_URL}/packages`);
                
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
                }

                const data = await res.json();
                if (data.success) {
                    const mapped = data.data.map((pkg: any) => {
                        const cmsCat = pkg.category?.toLowerCase() || '';
                        const cmsCats = Array.isArray(pkg.categories) ? pkg.categories : [];
                        const categoriesSet = new Set(['all']);
                        
                        // Add individual category if exists
                        if (cmsCat) categoriesSet.add(cmsCat);
                        
                        // Add all categories from multi-select
                        cmsCats.forEach((c: string) => categoriesSet.add(c.toLowerCase()));

                        // Convert back to array for easier processing
                        const categories = Array.from(categoriesSet);
                        
                        // Map them to internal filters for AllTours filter tabs
                        if (categories.some(c => c.includes('international'))) categories.push('international');
                        if (categories.some(c => c.includes('domestic'))) categories.push('domestic');
                        if (categories.some(c => c.includes('kerala'))) categories.push('kerala');
                        if (categories.some(c => c.includes('honeymoon'))) categories.push('honeymoon');
                        if (categories.some(c => c.includes('family'))) categories.push('family');
                        if (categories.some(c => c.includes('adventure'))) categories.push('adventure');

                        return {
                            slug: pkg.slug || pkg._id,
                            title: pkg.title,
                            location: pkg.location,
                            duration: pkg.duration,
                            price: pkg.price ? `₹${pkg.price.toLocaleString()}` : 'N/A',
                            oldPrice: pkg.oldamt ? `₹${Number(pkg.oldamt).toLocaleString()}` : null,
                            image: getImageUrl(pkg.thumb || (pkg.images && pkg.images[0]) || pkg.image || '/bg-placeholder.jpg'),
                            images: pkg.images || [],
                            subtitle: pkg.subtitle || '',
                            highlights: pkg.highlights || [],
                            itinerary: pkg.itinerary || [],
                            categories: categories,
                            averageRating: pkg.averageRating,
                            reviewCount: pkg.reviewCount,
                            noCostEmi: pkg.noCostEmi,
                            totalPrice: pkg.totalPrice,
                            per: pkg.per || '/ Person',
                            onoffer: pkg.onoffer,
                            slabel: pkg.slabel,
                            status: pkg.status || 'Published',
                            order: pkg.order || 0,
                            _id: pkg._id
                        };
                    })
                    .filter((p: any) => p.status === 'Published')
                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                    setCmsPackages(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch packages from CMS", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const allCombinedPackages = useMemo(() => {
        // Merge CMS packages with static packages, prioritizing CMS by Slug/Title if needed
        const combined = [...cmsPackages];
        const cmsSlugs = new Set(combined.map(p => p.slug));
        const cmsTitles = new Set(combined.map(p => p.title.toLowerCase()));
        
        ALL_PACKAGES.forEach(p => {
            // Only add static package if it's not already in CMS by slug or title
            if (!cmsSlugs.has(p.slug) && !cmsTitles.has(p.title.toLowerCase())) {
                combined.push(p);
                cmsSlugs.add(p.slug);
            }
        });
        return combined.sort((a, b) => (a.order || 0) - (b.order || 0));
    }, [cmsPackages]);

    useEffect(() => {
        const q = searchParams?.get('q');
        if (q) setSearchQuery(q);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let list = allCombinedPackages;
        if (activeFilter !== 'all') {
            list = list.filter(p => 
                p.categories.includes(activeFilter) || 
                p.title.toLowerCase().includes(activeFilter) ||
                p.location?.toLowerCase().includes(activeFilter)
            );
        }
        if (durationRange !== 'all') {
            list = list.filter(p => {
                const durationMatch = p.duration.match(/(\d+)\s*(?:Day|Days)/i);
                const titleMatch = p.title.match(/(\d+)D/i);
                const days = parseInt(durationMatch?.[1] || titleMatch?.[1] || "0") || 0;
                return days === parseInt(durationRange);
            });
        }
        
        // Sorting logic
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
    }, [allCombinedPackages, activeFilter, searchQuery, sortOrder, durationRange]);

    // Reset visibleCount when filters change
    useEffect(() => {
        setVisibleCount(6);
    }, [activeFilter, searchQuery, sortOrder, durationRange]);

    const loadMore = useCallback(() => {
        if (visibleCount < filtered.length && !loadingMore) {
            setLoadingMore(true);
            setTimeout(() => {
                setVisibleCount(prev => prev + 6);
                setLoadingMore(false);
            }, 600);
        }
    }, [visibleCount, filtered.length, loadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    const handleEnquire = (e: React.MouseEvent, pkgTitle: string) => {
        e.preventDefault();
        setSelectedPackage(pkgTitle);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        // Redundant as we now use EnquireModal, but kept for compatibility if needed
    };

    useEffect(() => {
        const handleScroll = () => {
            const controls = document.querySelector('.allToursControls');
            if (controls) {
                const rect = controls.getBoundingClientRect();
                // If the top of the controls is less than or equal to 0 (or a small buffer)
                if (rect.top <= 80) { // 80 is roughly the header height or the sticky point
                    document.body.classList.add('header-scrolled-controls');
                } else {
                    document.body.classList.remove('header-scrolled-controls');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('header-scrolled-controls');
        };
    }, []);


    return (
        <div className="allToursPage">
            {/* Hero Banner */}
            <DynamicPageBanner
                fallbackTitle="Explore All\nDestinations."
                fallbackSubtitle={`Browse ${allCombinedPackages.length}+ handpicked packages — from Kerala backwaters to international escapes.`}
                fallbackPreTitle="Curated Journeys"
                breadcrumbs={[{ label: 'All Packages' }]}
                variant="large"
                centered={true}
            />

            {/* Filter + Search Strip */}
            <div className="allToursControls">
                <div className="allToursControlsInner">
                    {/* Search */}
                    <div className="allToursSearch">
                        <Search size={16} className="allToursSearchIcon" />
                        <input
                            type="text"
                            placeholder="Search destination…"
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

                    {/* Divider */}
                    <div className="allToursControlsDivider" />

                    {/* Filter Pills Slider */}
                    <div className="allToursFilterSliderWrapper">
                        <button className="category-nav-btn cat-prev">
                            <ChevronLeft size={16} />
                        </button>
                        
                        <Swiper
                            modules={[Navigation, FreeMode]}
                            slidesPerView="auto"
                            freeMode={true}
                            spaceBetween={8}
                            navigation={{
                                prevEl: '.cat-prev',
                                nextEl: '.cat-next',
                            }}
                            className="allToursFilterSwiper"
                        >
                            {ALL_CATEGORIES.map(cat => (
                                <SwiperSlide key={cat.key} style={{ width: 'auto' }}>
                                    <button
                                        className={`filterPill ${activeFilter === cat.key ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(cat.key)}
                                    >
                                        {cat.label}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className="category-nav-btn cat-next">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Additional Filters Drodowns in same row */}
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
                                <span>Filter Packages</span>
                                <div className="drawerActions">
                                    <button className="resetBtn" onClick={() => { setActiveFilter('all'); setSortOrder('all'); setDurationRange('all'); setSearchQuery(''); }}>Reset</button>
                                    <button className="doneBtn" onClick={() => setShowFilters(false)}>Done</button>
                                </div>
                            </div>
                            
                            <div className="mobileFilterDrawerSection">
                                <label>Travel Category</label>
                                <div className="mobileFilterPills">
                                    {ALL_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.key}
                                            className={`filterPill ${activeFilter === cat.key ? 'active' : ''}`}
                                            onClick={() => { setActiveFilter(cat.key); }}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
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

            {/* Results Count */}
            <div className="homeContainer allToursResultsMeta">
                <span className="resultsCount">
                    Showing <strong>{filtered.length}</strong> packages
                    {activeFilter !== 'all' && <> in <em>{ALL_CATEGORIES.find(c => c.key === activeFilter)?.label}</em></>}
                    {sortOrder !== 'all' && <> sorted <em>{sortOrder === 'low-high' ? 'Low to High' : 'High to Low'}</em></>}
                    {durationRange !== 'all' && <> for <em>{durationRange} Day{parseInt(durationRange) > 1 ? 's' : ''}</em></>}
                    {searchQuery && <> for "<em>{searchQuery}</em>"</>}
                </span>
            </div>

            {/* Grid */}
            <section className="allToursGrid homeContainer">
                {filtered.length === 0 ? (
                    <div className="allToursEmpty">
                        <span>😕</span>
                        <p>No packages found. Try a different filter or search term.</p>
                        <button onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}>Clear Filters</button>
                    </div>
                ) : (
                    <>
                        {filtered.slice(0, visibleCount).map((pkg, i) => (
                            <PackageCard 
                                key={`${pkg.slug}-${i}`}
                                pkg={pkg}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                onEnquire={handleEnquire}
                            />
                        ))}
                    </>
                )}
            </section>

            {/* Infinite Scroll Sentinel */}
            {visibleCount < filtered.length && (
                <div ref={observerTarget} className="allToursLoadMore">
                    {loadingMore ? (
                        <div className="loaderContainer">
                            <Loader2 className="spinner" size={32} />
                            <span>Discovering more packages...</span>
                        </div>
                    ) : (
                        <div className="loadMorePlaceholder" />
                    )}
                </div>
            )}

            {/* ── Quick Plan Modal ── */}
            <EnquireModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                packageName={selectedPackage} 
            />
        </div>

    );
}
