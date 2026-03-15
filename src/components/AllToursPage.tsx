"use client";

import { API_URL } from '@/config';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Clock, Filter, X, User, Mail, Phone, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DynamicPageBanner from '@/components/DynamicPageBanner';
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
            image: pkg.image,
            categories: [...cats],
        });
    });

    return result;
}

const ALL_PACKAGES = buildAllPackages();

export default function AllToursPage() {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [cmsPackages, setCmsPackages] = useState<PackageCard[]>([]);
    const [loading, setLoading] = useState(true);
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
        async function fetchPackages() {
            try {
                const res = await fetch(`${API_URL}/packages`);
                const data = await res.json();
                if (data.success) {
                    const mapped = data.data.map((pkg: any) => ({
                        slug: pkg._id, // Use ID as slug for direct backend packages
                        title: pkg.title,
                        location: pkg.location,
                        duration: pkg.duration,
                        price: pkg.price ? `₹${pkg.price.toLocaleString()}` : 'N/A',
                        oldPrice: pkg.oldamt ? `₹${Number(pkg.oldamt).toLocaleString()}` : null,
                        image: pkg.thumb || (pkg.images && pkg.images[0]) || '/bg-placeholder.jpg',
                        categories: [pkg.category?.toLowerCase() || 'all']
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
        // Merge CMS packages with static packages, prioritizing CMS by ID/Slug if needed
        const combined = [...cmsPackages];
        const cmsSlugs = new Set(combined.map(p => p.slug));
        
        ALL_PACKAGES.forEach(p => {
            if (!cmsSlugs.has(p.slug)) {
                combined.push(p);
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
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [allCombinedPackages, activeFilter, searchQuery]);

    const handleEnquire = (e: React.MouseEvent, pkgTitle: string) => {
        e.preventDefault();
        setSelectedPackage(pkgTitle);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Request sent for: ${selectedPackage}`);
        setIsModalOpen(false);
    };

    return (
        <div className="allToursPage">
            {/* Hero Banner */}
            <DynamicPageBanner
                fallbackTitle="Explore All\nDestinations."
                fallbackSubtitle={`Browse ${allCombinedPackages.length}+ handpicked packages — from Kerala backwaters to international escapes.`}
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

                {/* Mobile Filter Drawer */}
                {showFilters && (
                    <div className="mobileFilterDrawer homeContainer">
                        {ALL_CATEGORIES.map(cat => (
                            <button
                                key={cat.key}
                                className={`filterPill ${activeFilter === cat.key ? 'active' : ''}`}
                                onClick={() => { setActiveFilter(cat.key); setShowFilters(false); }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="homeContainer allToursResultsMeta">
                <span className="resultsCount">
                    Showing <strong>{filtered.length}</strong> packages
                    {activeFilter !== 'all' && <> in <em>{ALL_CATEGORIES.find(c => c.key === activeFilter)?.label}</em></>}
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
                    filtered.map(pkg => (
                        <div key={pkg.slug} className="allTourCard">
                            {/* Image zone */}
                            <Link href={`/packages/${pkg.slug}`} className="allTourCardImgLink">
                                <div className="allTourCardImg">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                </div>
                                {pkg.oldPrice && <span className="allTourCardBadge">SALE</span>}

                                {/* Wishlist Heart Icon */}
                                <button 
                                    onClick={(e) => toggleWishlist(pkg.slug, e)}
                                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all z-20 ${wishlist.includes(pkg.slug) ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500'}`}
                                >
                                    <Heart size={16} fill={wishlist.includes(pkg.slug) ? "currentColor" : "none"} />
                                </button>

                                {/* Price — bottom left */}
                                <div className="allTourCardFloatPrice">
                                    <span className="floatPriceMain">{pkg.price}</span>
                                    <div className="floatPriceMeta">
                                        {pkg.oldPrice && <span className="floatPriceOld">{pkg.oldPrice}</span>}
                                        <span className="floatPricePp">/ person</span>
                                    </div>
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
            {isModalOpen && (
                <div className="tourCatModalOverlay">
                    <div
                        className="tourCatModalBackdrop"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="tourCatModalContent">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="tourCatModalCloseBtn"
                        >
                            <X size={20} />
                        </button>

                        {/* Left visual panel */}
                        <div className="tourCatModalLeft">
                            <div className="tourCatModalGradient" />
                            <div className="tourCatModalBlur1" />
                            <div className="tourCatModalBlur2" />
                            <div className="tourCatModalVisual">
                                <div className="tourCatModalIconWrap">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="italic">
                                    Pack <br />Your <br /><span>Bags.</span>
                                </h3>
                                <p>Leave the planning to us. We'll craft the perfect itinerary tailored just for you.</p>
                            </div>
                            <div className="tourCatModalStatus">
                                <div className="tourCatStatusDot" />
                                <span>Travel Experts Available</span>
                            </div>
                        </div>

                        {/* Right form panel */}
                        <div className="tourCatModalRight">
                            <div className="tourCatModalHeader">
                                <h2>Quick Plan Request</h2>
                                <p>Get a response within 2 hours.</p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="tourCatModalForm">
                                {/* Selected package */}
                                <div className="tourCatModalSelectedPkg">
                                    <div className="tourCatPkgIcon">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <label>Destination Package</label>
                                        <div className="tourCatPkgName">{selectedPackage}</div>
                                    </div>
                                </div>

                                <div className="tourCatModalFormGrid">
                                    <div className="tourCatModalField">
                                        <label>Full Name</label>
                                        <div className="tourCatModalInputWrap">
                                            <User size={16} />
                                            <input type="text" placeholder="John Doe" required />
                                        </div>
                                    </div>
                                    <div className="tourCatModalField">
                                        <label>Phone Number</label>
                                        <div className="tourCatModalInputWrap">
                                            <Phone size={16} />
                                            <input type="tel" placeholder="+91 9876543210" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="tourCatModalField">
                                    <label>Email Address</label>
                                    <div className="tourCatModalInputWrap">
                                        <Mail size={16} />
                                        <input type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <button type="submit" className="tourCatModalSubmitBtn">
                                    Get My Itinerary Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
