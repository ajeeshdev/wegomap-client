"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect, useMemo } from 'react';
/* Refresh forced */
import Image from 'next/image';
import { Search, Ship, Anchor, Waves, MapPin, Wind, Sparkles, X, ShieldCheck, Utensils, Zap } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { useEnquiry } from '@/context/EnquiryContext';

export default function CruisesListingPage() {
    const { openEnquiry } = useEnquiry();
    const [houseboats, setHouseboats] = useState<any[]>([]);
    const [pricing, setPricing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [bannerData, setBannerData] = useState<any>({});

    useEffect(() => {
        async function fetchData() {
            try {
                const [hbRes, optRes] = await Promise.all([
                    fetch(`${API_URL}/houseboats`),
                    fetch(`${API_URL}/options?key=houseboat_package`)
                ]);
                
                const hbJson = await hbRes.json();
                const optJson = await optRes.json();

                if (hbJson.success) setHouseboats(hbJson.data);
                if (optJson.success && optJson.data.length > 0) setPricing(optJson.data[0].value);

                // Fetch cruises banner settings
                const bannerRes = await fetch(`${API_URL}/options`);
                const bannerJson = await bannerRes.json();
                if (bannerJson.success && bannerJson.data) {
                    const opt = bannerJson.data.find((o: any) => o.key === 'cruises_page_settings');
                    if (opt) {
                        try {
                            const parsed = JSON.parse(opt.value);
                            if (parsed.banner) setBannerData(parsed.banner);
                        } catch (e) {}
                    }
                }
            } catch (err) {
                console.error("Failed to fetch cruise data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredCruises = houseboats.filter(hb => 
        (hb.title || hb.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (hb.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="cruises-listing-wrapper">
            <DynamicPageBanner 
                title={bannerData.title || undefined}
                subtitle={bannerData.subtitle || undefined}
                preTitle={bannerData.preTitle || undefined}
                fallbackTitle="Luxury Backwater Cruises"
                fallbackSubtitle="Experience the serene backwaters of Alleppey and Kumarakom on our premium houseboats."
                fallbackPreTitle="Cruises & Houseboats"
                fallbackImage={bannerData.image || "/hero-houseboat.jpg"}
                breadcrumbs={[{ label: 'Cruises' }]}
                skipApiFetch={true}
            />

            <div className="homeContainer cruises-listing-container">
                <div className="listing-header">
                    <div className="header-content">
                        <div className="pre-title-wrapper">
                            <span className="line"></span>
                            <span className="pre-title">Premium Selection</span>
                        </div>
                        <h1 className="main-title">
                            Available Houseboats
                        </h1>
                        <p className="sub-title">
                            From traditional deluxe boats to modern luxury cruisers, find your perfect stay on the water.
                        </p>
                    </div>
                    
                    <div className="search-box-wrapper">
                        <Search className="search-icon" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or category..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="clear-btn">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="fleet-grid">
                    {filteredCruises.length > 0 ? (
                        filteredCruises.map((hb) => (
                            <div key={hb._id} className="fleet-card">
                                <div className="thumb-wrapper">
                                    <Image 
                                        src={hb.thumb ? getImageUrl(hb.thumb) : '/hero-houseboat.jpg'} 
                                        alt={hb.title || hb.name}
                                        fill
                                    />
                                    <div className="overlay" />
                                    
                                    <div className="badge-container">
                                        {hb.category && (
                                            <div className="category-badge">
                                                <Anchor size={12} className="icon" />
                                                <span className="text">{hb.category}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="info-overlay">
                                        <h3 className="title">{hb.title || hb.name}</h3>
                                        <div className="meta">
                                            {hb.location && (
                                                <div className="item">
                                                    <MapPin size={12} className="icon" />
                                                    <span>{hb.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-body">
                                    {hb.short_desc && (
                                        <p className="short-desc">{hb.short_desc}</p>
                                    )}
                                    
                                    <div className="footer">
                                        <div className="price-info">
                                            <p className="label">Starting from</p>
                                            <p className="amount">
                                                ₹{hb.price || (pricing && pricing[hb.category?.toLowerCase()]?.price)}
                                            </p>
                                        </div>
                                        
                                        <button 
                                            onClick={() => openEnquiry(`Inquiry: ${hb.title || hb.name} Houseboat`)}
                                            className="enquiry-btn"
                                        >
                                            Enquire
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <Ship size={48} />
                            <p>No houseboats found matching your search.</p>
                        </div>
                    )}
                </div>

                <div className="cta-banner">
                    <div className="cta-content">
                        <div className="text-side">
                            <h3 className="cta-title">Customized Private Cruise?</h3>
                            <p className="cta-desc">We can organize corporate events, weddings, and premium parties on our luxury fleets.</p>
                        </div>
                        <button 
                            onClick={() => openEnquiry("Custom Private Cruise Quote Request")}
                            className="cta-btn"
                        >
                            Request Quote
                        </button>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-item">
                        <div className="icon-wrapper"><ShieldCheck size={32} /></div>
                        <h4 className="feature-title">Verified Fleet</h4>
                        <p className="feature-desc">Every vessel undergoes rigorous safety and quality audits.</p>
                    </div>
                    <div className="feature-item">
                        <div className="icon-wrapper"><Utensils size={32} /></div>
                        <h4 className="feature-title">Chef Onboard</h4>
                        <p className="feature-desc">Authentic Kerala cuisine prepared fresh with local ingredients.</p>
                    </div>
                    <div className="feature-item">
                        <div className="icon-wrapper"><Zap size={32} /></div>
                        <h4 className="feature-title">Tiered Comfort</h4>
                        <p className="feature-desc">Transparent pricing for Deluxe, Premium, and Luxury stays.</p>
                    </div>
                    <div className="feature-item">
                        <div className="icon-wrapper"><Wind size={32} /></div>
                        <h4 className="feature-title">Climate Control</h4>
                        <p className="feature-desc">Fully air-conditioned cabins for a comfortable night stay.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
