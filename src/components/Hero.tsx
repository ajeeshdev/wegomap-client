"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Hero() {
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);

    const [slides, setSlides] = useState<any[]>([]);
    const [isLoadingSlides, setIsLoadingSlides] = useState(true);
    const [searchIndex, setSearchIndex] = useState<any[]>([]);

    useEffect(() => {
        // Fetch dynamic sliders
        fetch(`${API_URL}/sliders`)
            .then(res => {
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
                }
                return res.json();
            })
            .then(data => {
                if (data.success && data.data && data.data.length > 0) {
                    const dynamicSlides = data.data.map((s: any) => ({
                        title: s.title || '',
                        subtitle: s.subtitle || "Explore the world with WEGOMAP",
                        buttonText: "Discover Now",
                        buttonHref: s.link || '/packages',
                        imgDesktop: getImageUrl(s.image),
                        imgMobile: getImageUrl(s.image),
                        imgPortrait: getImageUrl(s.image)
                    }));
                    setSlides(dynamicSlides);
                } else {
                    // Fallback static slide when database is empty
                    setSlides([{
                        title: 'Your world, your way',
                        subtitle: 'Discover breathtaking destinations with WEGOMAP',
                        buttonText: 'Explore Packages',
                        buttonHref: '/packages',
                        imgDesktop: '/bg-placeholder.jpg',
                        imgMobile: '/bg-placeholder.jpg',
                        imgPortrait: '/bg-placeholder.jpg'
                    }]);
                }
            })
            .catch(err => {
                console.error("Failed to load sliders", err);
                setSlides([{
                    title: 'Your world, your way',
                    subtitle: 'Discover breathtaking destinations with WEGOMAP',
                    buttonText: 'Explore Packages',
                    buttonHref: '/packages',
                    imgDesktop: '/bg-placeholder.jpg',
                    imgMobile: '/bg-placeholder.jpg',
                    imgPortrait: '/bg-placeholder.jpg'
                }]);
            })
            .finally(() => setIsLoadingSlides(false));

        // Fetch search data: packages, corporate events, and special events
        Promise.all([
            fetch(`${API_URL}/packages`),
            fetch(`${API_URL}/events`),
            fetch(`${API_URL}/special-events`)
        ])
        .then(async ([pkgsRes, eventsRes, specRes]) => {
            const pkgsData = await pkgsRes.json();
            const eventsData = await eventsRes.json();
            const specData = await specRes.json();

            let masterIndex: any[] = [];

            if (pkgsData.success) {
                masterIndex = [...masterIndex, ...pkgsData.data.map((pkg: any) => ({
                    type: 'package',
                    title: pkg.title,
                    href: `/packages/${pkg.slug || pkg._id}`,
                    image: getImageUrl(pkg.thumb || (pkg.images && pkg.images[0]) || ''),
                    meta: pkg.duration || pkg.location,
                }))];
            }

            if (eventsData.success) {
                masterIndex = [...masterIndex, ...eventsData.data.map((evt: any) => ({
                    type: 'event',
                    title: evt.title,
                    href: `/events/${evt.slug || evt._id}`,
                    image: getImageUrl(evt.image || ''),
                    meta: 'Corporate Event',
                }))];
            }

            if (specData.success) {
                masterIndex = [...masterIndex, ...specData.data.map((evt: any) => ({
                    type: 'special',
                    title: evt.title,
                    href: `/special-events/${evt.slug || evt._id}`,
                    image: getImageUrl(evt.image || ''),
                    meta: 'Special Occasion',
                }))];
            }

            setSearchIndex(masterIndex);
        })
        .catch(err => console.error("Failed to load search data", err));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (searchRef.current && window.innerWidth <= 768) {
                const parent = searchRef.current.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    if (parentRect.bottom <= 85) {
                        setIsSticky(true);
                        document.body.classList.add('mobile-search-sticky');
                    } else if (parentRect.bottom > 110) {
                        setIsSticky(false);
                        document.body.classList.remove('mobile-search-sticky');
                    }
                }
            } else {
                setIsSticky(false);
                document.body.classList.remove('mobile-search-sticky');
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('mobile-search-sticky');
        };
    }, []);

    // Close suggestions on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const suggestions = useMemo(() => {
        if (!query.trim() || query.length < 1) return [];
        const q = query.toLowerCase();
        return searchIndex
            .filter(item => item.title.toLowerCase().includes(q) || (item.meta && item.meta.toLowerCase().includes(q)))
            .slice(0, 6);
    }, [query, searchIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeSuggestion >= 0) {
                router.push(suggestions[activeSuggestion].href);
                setShowSuggestions(false);
            } else {
                router.push(`/packages?q=${encodeURIComponent(query)}`);
                setShowSuggestions(false);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <section className="heroSection">
            <div className="homeContainer">
                <div className="heroBanner group">
                    {slides.length > 0 ? (
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            loop={true}
                            className="heroSwiper"
                        >
                            {slides.map((slide, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="slideContent">
                                        <div className="imageWrapper">
                                            <picture style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
                                                <source media="(max-width: 480px)" srcSet={slide.imgPortrait || slide.imgDesktop} />
                                                <source media="(max-width: 768px)" srcSet={slide.imgMobile || slide.imgDesktop} />
                                                <Image
                                                    src={slide.imgDesktop || '/bg-placeholder.jpg'}
                                                    alt={slide.title || 'Slide'}
                                                    fill
                                                    className="object-cover"
                                                    priority={idx === 0}
                                                    unoptimized
                                                />
                                            </picture>
                                            <div className="overlay" />
                                        </div>

                                        <div className="contentOverlay">
                                            <h1>{slide.title}</h1>
                                            <p className="heroSubheading">{slide.subtitle}</p>
                                            {slide.buttonHref && (
                                                <Link href={slide.buttonHref} className="heroPackageBtn">{slide.buttonText}</Link>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : isLoadingSlides ? (
                        <div className="h-[60vh] bg-slate-900 flex items-center justify-center rounded-[32px] overflow-hidden">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="h-[60vh] bg-slate-900 flex items-center justify-center rounded-[32px] overflow-hidden">
                            <h1 className="text-white text-2xl font-bold">Welcome to WEGOMAP</h1>
                        </div>
                    )}

                    {/* Pill Search Bar with Live Suggestions */}
                    <div className={`heroSearchWrapper ${isSticky ? 'is-sticky' : ''}`} ref={searchRef}>
                        <div className={`searchPill ${showSuggestions && suggestions.length > 0 ? 'has-suggestions' : ''}`}>
                            <div className="inputArea">
                                <MapPin size={20} className="locationIcon" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search Destinations or Events"
                                    value={query}
                                    onChange={e => {
                                        setQuery(e.target.value);
                                        setShowSuggestions(true);
                                        setActiveSuggestion(-1);
                                    }}
                                    onFocus={() => query.length > 0 && setShowSuggestions(true)}
                                    onKeyDown={handleKeyDown}
                                />
                                {query && (
                                    <button
                                        className="searchClearBtn"
                                        onClick={() => { setQuery(''); setShowSuggestions(false); inputRef.current?.focus(); }}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <button
                                className="submitBtn"
                                onClick={() => {
                                    if (query.trim()) {
                                        router.push(`/packages?q=${encodeURIComponent(query)}`);
                                        setShowSuggestions(false);
                                    }
                                }}
                            >
                                <Search size={22} />
                            </button>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="searchSuggestions">
                                {suggestions.map((s, i) => (
                                    <Link
                                        key={i}
                                        href={s.href}
                                        className={`suggestionItem ${i === activeSuggestion ? 'active' : ''}`}
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        <div className="suggestionImg">
                                            {s.image ? (
                                                <Image src={getImageUrl(s.image)} alt={s.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                            ) : (
                                                <div className="w-small h-small bg-slate-200 flex items-center justify-center"><MapPin size={14} className="text-slate-400" /></div>
                                            )}
                                        </div>
                                        <div className="suggestionText">
                                            <span className="suggestionTitle">{s.title}</span>
                                            {s.meta && <span className="suggestionMeta">
                                                {s.type === 'package' ? <Clock size={11} /> : <MapPin size={11} />}
                                                {s.meta}
                                            </span>}
                                        </div>
                                        <span className={`suggestionBadge ${s.type}`}>
                                            {s.type === 'category' ? 'Category' : s.type === 'event' ? 'Event' : s.type === 'special' ? 'Special' : 'Package'}
                                        </span>
                                    </Link>
                                ))}
                                <Link
                                    href={`/packages?q=${encodeURIComponent(query)}`}
                                    className="suggestionViewAll"
                                    onClick={() => setShowSuggestions(false)}
                                >
                                    <Search size={14} /> View all results for "<strong>{query}</strong>"
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
