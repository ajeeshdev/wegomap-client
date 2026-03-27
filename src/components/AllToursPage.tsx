"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Clock, Filter, X, User, Mail, Phone, Heart, Star, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import EnquireModal from '@/components/EnquireModal';
import WishlistButton from '@/components/WishlistButton';

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

interface PackageCard {
    slug: string;
    title: string;
    location: string;
    duration: string;
    price: string;
    oldPrice?: string;
    image: string;
    categories: string[];
    averageRating?: number;
    reviewCount?: number;
}

function buildAllPackages(): PackageCard[] {
    const seen = new Set<string>();
    const result: PackageCard[] = [];
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
        });
    });

    return result;
}

const ALL_PACKAGES = buildAllPackages();

export default function AllToursPage() {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [durationRange, setDurationRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [cmsPackages, setCmsPackages] = useState<PackageCard[]>([]);
    const [loading, setLoading] = useState(true);
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
                    const mapped = data.data.map((pkg: any) => ({
                        slug: pkg.slug || pkg._id, // Prioritize human-readable slug if available
                        title: pkg.title,
                        location: pkg.location,
                        duration: pkg.duration,
                        price: pkg.price ? `₹${pkg.price.toLocaleString()}` : 'N/A',
                        oldPrice: pkg.oldamt ? `₹${Number(pkg.oldamt).toLocaleString()}` : null,
                        image: getImageUrl(pkg.thumb || (pkg.images && pkg.images[0]) || pkg.image || '/bg-placeholder.jpg'),
                        categories: [pkg.category?.toLowerCase() || 'all'],
                        averageRating: pkg.averageRating,
                        reviewCount: pkg.reviewCount
                    }));
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
        return combined;
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
        if (priceRange !== 'all') {
            list = list.filter(p => {
                const price = parseInt(p.price.replace(/[^\d]/g, '')) || 0;
                if (priceRange === 'low') return price < 15000;
                if (priceRange === 'mid') return price >= 15000 && price < 40000;
                if (priceRange === 'high') return price >= 40000;
                return true;
            });
        }
        if (durationRange !== 'all') {
            list = list.filter(p => {
                const days = parseInt(p.duration.split(' ')[0]) || 0;
                if (durationRange === 'short') return days <= 3;
                if (durationRange === 'mid') return days > 3 && days <= 6;
                if (durationRange === 'long') return days > 6;
                return true;
            });
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [allCombinedPackages, activeFilter, searchQuery, priceRange, durationRange]);

    const handleEnquire = (e: React.MouseEvent, pkgTitle: string) => {
        e.preventDefault();
        setSelectedPackage(pkgTitle);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        // Redundant as we now use EnquireModal, but kept for compatibility if needed
    };


    return (
        <div className="allToursPage">
            {/* Hero Banner */}
            <DynamicPageBanner
                fallbackTitle="Explore All\nDestinations."
                fallbackSubtitle={`Browse ${allCombinedPackages.length}+ handpicked packages — from Kerala backwaters to international escapes.`}
                fallbackPreTitle="Curated Journeys"
                breadcrumbs={[{ label: 'All Packages' }]}
            />

            {/* Filter + Search Strip */}
            <div className="allToursControls">
                <div className="homeContainer allToursControlsInner">
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

                    {/* Filter Pills */}
                    <div className="allToursFilterPills">
                        {ALL_CATEGORIES.map(cat => (
                            <button
                                key={cat.key}
                                className={`filterPill ${activeFilter === cat.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button className="mobileFilterToggle" onClick={() => setShowFilters(!showFilters)}>
                        <Filter size={16} /> Filter
                    </button>
                </div>

                {/* Additional Filters Strip */}
                <div className="allToursExtraFilters">
                    <div className="homeContainer allToursExtraFiltersInner">
                        <div className="filterGroup">
                            <label>Budget</label>
                            <select 
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="all">Any Price</option>
                                <option value="low">Under ₹15,000</option>
                                <option value="mid">₹15,000 - ₹40,000</option>
                                <option value="high">Above ₹40,000</option>
                            </select>
                        </div>
                        <div className="filterGroup">
                            <label>Duration</label>
                            <select 
                                value={durationRange}
                                onChange={(e) => setDurationRange(e.target.value)}
                            >
                                <option value="all">Any Duration</option>
                                <option value="short">Short (1-3 Days)</option>
                                <option value="mid">Medium (4-6 Days)</option>
                                <option value="long">Long (7+ Days)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Sheet Overlay */}
                {showFilters && (
                    <div className="mobileFilterOverlay" onClick={() => setShowFilters(false)}>
                        <div className="mobileFilterSheet" onClick={(e) => e.stopPropagation()}>
                            <div className="mobileFilterSheetHandle" />
                            
                            <div className="mobileFilterDrawerHeader">
                                <span>Filter Packages</span>
                                <div className="drawerActions">
                                    <button className="resetBtn" onClick={() => { setActiveFilter('all'); setPriceRange('all'); setDurationRange('all'); setSearchQuery(''); }}>Reset</button>
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
                                        <label>Budget</label>
                                        <select 
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(e.target.value)}
                                        >
                                            <option value="all">Any Price</option>
                                            <option value="low">Under ₹15,000</option>
                                            <option value="mid">₹15,000 - ₹40,000</option>
                                            <option value="high">Above ₹40,000</option>
                                        </select>
                                    </div>
                                    <div className="filterGroup flex-1">
                                        <label>Duration</label>
                                        <select 
                                            value={durationRange}
                                            onChange={(e) => setDurationRange(e.target.value)}
                                        >
                                            <option value="all">Any Duration</option>
                                            <option value="short">1-3 Days</option>
                                            <option value="mid">4-6 Days</option>
                                            <option value="long">7+ Days</option>
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
                    {priceRange !== 'all' && <> with price <em>{priceRange === 'low' ? 'Under ₹15,000' : priceRange === 'mid' ? '₹15,000 - ₹40,000' : 'Above ₹40,000'}</em></>}
                    {durationRange !== 'all' && <> with duration <em>{durationRange === 'short' ? '1-3 Days' : durationRange === 'mid' ? '4-6 Days' : '7+ Days'}</em></>}
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
                    filtered.map((pkg, i) => (
                        <div key={`${pkg.slug}-${i}`} className="allTourCard">
                            {/* Image zone */}
                            <Link href={`/packages/${pkg.slug}`} className="allTourCardImgLink">
                                <div className="allTourCardImg">
                                    <Image
                                        src={getImageUrl(pkg.image)}
                                        alt={pkg.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                </div>
                                {pkg.averageRating !== undefined && pkg.averageRating > 0 && (
                                    <div className="ratingBadge">
                                        <Star size={11} fill="currentColor" />
                                        <span>{pkg.averageRating.toFixed(1)}</span>
                                    </div>
                                )}

                                <div className="wishlistBtnFloating" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                    <WishlistButton id={pkg.slug} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                                </div>

                                {/* Location chip — bottom right */}
                                {pkg.location && (
                                    <div className="allTourCardLocation">
                                        <MapPin size={9} />
                                        <span className="locationText">{pkg.location}</span>
                                    </div>
                                )}
                            </Link>

                            {/* Card body */}
                            <div className="allTourCardBody">
                                {pkg.duration && (
                                    <div className="allTourCardDuration">
                                        <Clock size={11} /> {pkg.duration}
                                    </div>
                                )}
                                 <Link href={`/packages/${pkg.slug}`} className="allTourCardTitle">
                                    {pkg.title}
                                </Link>

                                <div className="allTourCardMetaRow flex items-center justify-between ">
                                     <div className="priceInfo">
                                        <div className="priceMain">
                                            <span className="currentPrice">{pkg.price}</span>
                                            <span className="perPerson">/ Person</span>
                                        </div>
                                        {pkg.oldPrice && <span className="oldPrice">{pkg.oldPrice}</span>}
                                     </div>
                                </div>

                                <div className="allTourCardRule" />
                                <div className="allTourCardCta">
                                    <Link href={`/packages/${pkg.slug}`} className="allTourCardDetails">
                                        View Details
                                    </Link>
                                    <button
                                        className="allTourCardEnquire"
                                        onClick={(e) => handleEnquire(e, pkg.title)}
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {/* ── Quick Plan Modal ── */}
            <EnquireModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                packageName={selectedPackage} 
            />
        </div>

    );
}
