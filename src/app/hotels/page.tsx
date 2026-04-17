"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Building2, Star, ChevronRight, X, MapPin } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function HotelsListingPage() {
    const [hotels, setHotels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [bannerData, setBannerData] = useState<any>({});

    useEffect(() => {
        async function fetchHotels() {
            try {
                const res = await fetch(`${API_URL}/pages`);
                const json = await res.json();
                if (json.success) {
                    const hotelPages = json.data.filter((p: any) => p.type === 'hotel' && (p.status === 'Published' || !p.status));
                    setHotels(hotelPages);
                }
            } catch (err) {
                console.error("Failed to fetch hotels", err);
            } finally {
                setLoading(false);
            }
        }
        fetchHotels();

        // Fetch CMS banner settings
        fetch(`${API_URL}/options`)
            .then(r => r.json())
            .then(json => {
                if (json.success && json.data) {
                    const opt = json.data.find((o: any) => o.key === 'hotels_page_settings');
                    if (opt) {
                        try { const p = JSON.parse(opt.value); if (p.banner) setBannerData(p.banner); } catch {}
                    }
                }
            }).catch(() => {});
    }, []);

    const filteredHotels = hotels.filter(h => 
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (h.seo_description && h.seo_description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="hotels-listing-wrapper">
            <DynamicPageBanner
                title={bannerData.title || undefined}
                subtitle={bannerData.subtitle || undefined}
                preTitle={bannerData.preTitle || undefined}
                fallbackTitle={"Premium Stay\nExperiences."}
                fallbackSubtitle="Explore our curated collection of luxury hotels and resorts for your next getaway."
                fallbackPreTitle="Stay with WEGOMAP"
                fallbackImage={bannerData.image || "aroma_hero_kerala_1774025974860.png"}
                breadcrumbs={[{ label: 'Hotels' }]}
            />

            <div className="homeContainer hotels-listing-container">
                <div className="hotels-header-row">
                    <div className="hotels-title-area">
                        <span className="hotels-page-pretitle">Stay with WEGOMAP</span>
                        <h2 className="hotels-page-title">Exclusive Properties</h2>
                        <p className="hotels-page-subtitle">Discover the best-rated stays across top destinations in Kerala and beyond</p>
                    </div>
                    
                    <div className="hotels-search-wrap">
                        <Search className="hotels-search-icon" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search properties or locations..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="hotels-search-input"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="hotels-search-clear">
                                <X size={16} />
                            </button>
                        )}
                        <button className="hotels-search-btn">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {filteredHotels.length === 0 ? (
                    <div className="hotels-empty-state">
                        <Building2 size={64} className="empty-icon" />
                        <p>No hotels found matching your search</p>
                        <button onClick={() => setSearchTerm('')} className="clear-search-btn">Clear Search</button>
                    </div>
                ) : (
                    <div className="hotels-grid">
                        {filteredHotels.map((hotel) => (
                            <Link href={`/hotels/${hotel.slug}`} key={hotel._id} className="hotel-card">
                                <div className="hotel-card-image-wrap">
                                    <Image 
                                        src={hotel.banner_image ? getImageUrl(hotel.banner_image) : '/bg-placeholder.jpg'} 
                                        alt={hotel.title}
                                        fill
                                        
                                    />
                                    <div className="hotel-card-overlay" />
                                    
                                    <div className="hotel-card-badge">
                                        <Star size={12} fill="currentColor" />
                                        <span>Top Rated</span>
                                    </div>
                                </div>
                                
                                <div className="hotel-card-body">
                                    <div className="hotel-card-location">
                                        <MapPin size={12} />
                                        <span>{hotel.slug.split('-').join(' ')}</span>
                                    </div>
                                    
                                    <h3 className="hotel-card-title">{hotel.title}</h3>
                                    
                                    <p className="hotel-card-desc">
                                        {hotel.seo_description || "Experience luxury and comfort in our handpicked premium properties."}
                                    </p>
                                    
                                    <div className="hotel-card-footer">
                                        <span className="hotel-card-more-text">View Property</span>
                                        <div className="hotel-card-arrow">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
