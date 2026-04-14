"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Star, Check, ArrowRight, CreditCard } from 'lucide-react';
import { getImageUrl } from '@/config';
import WishlistButton from './WishlistButton';
import { packagesData } from '@/data/packages';
import './PackageCard.scss';

import 'swiper/css';
import 'swiper/css/pagination';

interface PackageCardProps {
    pkg: {
        slug: string;
        title: string;
        location?: string;
        duration?: string;
        price: string;
        oldPrice?: string | null;
        image: string;
        images?: string[];
        subtitle?: string;
        highlights?: string[];
        inclusions?: string[];
        itinerary?: any[];
        averageRating?: number;
        reviewCount?: number;
        noCostEmi?: number;
        per?: string;
        totalPrice?: number;
        onoffer?: boolean;
        slabel?: string;
        href?: string;
        _id?: string;
        eventDate?: string;
    };
    wishlist: string[];
    toggleWishlist: (id: string, e: React.MouseEvent) => void;
    onEnquire: (e: React.MouseEvent, title: string) => void;
}

export default function PackageCard({ pkg, wishlist, toggleWishlist, onEnquire }: PackageCardProps) {
    // Parse subtitle for itinerary list (e.g. "2N Munnar / 1N Thekkady")
    const sub = pkg.subtitle || pkg.location;
    const itineraryItems = sub 
        ? sub.split(/[/|•]/).map(s => s.trim()).filter(Boolean)
        : [];

    // Fallback: extract duration from title if pkg.duration is missing or N/A
    let displayDuration = pkg.duration;
    if (!displayDuration || displayDuration === 'N/A') {
        const durationMatch = pkg.title.match(/(\d+N\d+D)|(\d+\s*Night[s]?\s*\d+\s*Day[s]?)/i);
        if (durationMatch) {
            displayDuration = durationMatch[0].toUpperCase();
        } else if (itineraryItems.length > 0) {
            // Estimate duration from itinerary items if they contain "N" (nights)
            const nights = itineraryItems.map(item => parseInt(item.match(/(\d+)N/)?.[1] || '0')).reduce((a, b) => a + b, 0);
            if (nights > 0) {
                displayDuration = `${nights}N${nights + 1}D`;
            }
        }
    }

    let finalItinerary = pkg.itinerary || [];

    // All images for slider (including itinerary photos)
    const itineraryPhotos = finalItinerary 
        ? finalItinerary.map((it: any) => it.image).filter(Boolean)
        : [];
    
    // Normalize ALL images to full URLs before putting them in the Set to avoid duplicate paths vs full URLs
    const allImages = Array.from(new Set([
        getImageUrl(pkg.image), 
        ...itineraryPhotos.map(img => getImageUrl(img))
    ])).filter(Boolean);
    
    // Pricing data parsing
    const rawPrice = parseInt(pkg.price?.toString().replace(/[^\d]/g, '') || '0') || 0;
    const emiValue = Number(pkg.noCostEmi) || Math.round(rawPrice / 3);
    const emi = emiValue.toLocaleString('en-IN');
    const totalPrice = pkg.totalPrice 
        ? Number(pkg.totalPrice).toLocaleString('en-IN') 
        : (rawPrice * 2).toLocaleString('en-IN');
    
    // Also format the main price
    const displayMainPrice = rawPrice.toLocaleString('en-IN');

    const extractHighlights = (p: any) => {
        if (Array.isArray(p.highlights) && p.highlights.length > 0) return p.highlights;
        const html = p.new_highlight || p.new_highlights || p.highlights_list;
        if (typeof html === 'string' && html.includes('<li')) {
            return Array.from(html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
                .map(m => m[1].replace(/<[^>]+>/g, '').trim())
                .filter(Boolean);
        }
        if (Array.isArray(p.highlights_list) && p.highlights_list.length > 0) return p.highlights_list;
        return [];
    };

    const highlights = extractHighlights(pkg);
    const inclusions = Array.isArray(pkg.inclusions) ? pkg.inclusions : [];
    
    let features: string[] = [];
    if (highlights.length > 0) {
        features = highlights.slice(0, 5);
    } else if (inclusions.length > 0) {
        features = inclusions.slice(0, 5);
    } else if (pkg.duration) {
        features = [pkg.duration];
    }

    return (
        <div className="detailedPackageCard group">
            {/* Image Section: Slider only if multiple images exist */}
            <div className="cardImageSection">
                {allImages.length > 1 ? (
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        pagination={{ clickable: true }}
                
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="packageSwiper"
                    >
                        {allImages.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <Link 
                                    href={pkg.href || `/packages/${pkg.slug || pkg._id}`} 
                                    className="block relative aspect-[4/3] overflow-hidden"
                                >
                                    <Image
                                        src={img}
                                        alt={`${pkg.title} - ${idx + 1}`}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={pkg.onoffer}
                                    />
                                    {pkg.onoffer && (
                                        <div className="absolute top-4 left-4  offerLabel">
                                            {pkg.slabel || 'SPECIAL OFFER'}
                                        </div>
                                    )}
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Link 
                        href={pkg.href || `/packages/${pkg.slug || pkg._id}`} 
                        className="block relative aspect-[4/3] overflow-hidden"
                    >
                        <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={pkg.onoffer}
                        />
                        {pkg.onoffer && (
                                        <div className="absolute top-4 left-4  offerLabel">
                                {pkg.slabel || 'SPECIAL OFFER'}
                            </div>
                        )}
                    </Link>
                )}
                
                <div className="wishlistBtnWrapper">
                    <WishlistButton id={pkg.slug} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                </div>
            </div>

            <div className="cardContent">
                {/* Header: Title & Duration */}
                <div className="headerSection">
                    <div className="titleRow">
                        <Link href={`/packages/${pkg.slug}`} className="titleLink">
                            <h3 className="cardTitle leading-snug">{pkg.title}</h3>
                        </Link>
                    </div>
                    {/* Rating Row - Added as per request */}
                    <div className="ratingReviewRow">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < (pkg.averageRating || 4.5) ? "#fbbf24" : "none"} color={i < (pkg.averageRating || 4.5) ? "#fbbf24" : "#cbd5e1"} strokeWidth={3} />
                            ))}
                        </div>
                        <span className="ratingValue">{pkg.averageRating || "4.9"}</span>
                        <span className="reviewCount">({pkg.reviewCount || "150"} reviews)</span>
                    </div>
                    {/* Itinerary Summary (Horizontal Bullets) */}
                    {itineraryItems.length > 0 && (
                        <div className="itineraryRow">
                            {itineraryItems.map((item, i) => (
                                <span key={i} className="itItem">
                                    {i >= 0 && <span className="bulletBullet">•</span>}
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Features Grid (Two Columns or Single) */}
                <div className={`featuresGrid ${features.length === 1 ? 'singleFeature' : ''}`}>
                    {features.map((f, i) => (
                        <div key={i} className="featureItem">• {f}</div>
                    ))}
                </div>

                {/* Detailed Itinerary Steps */}
                {/* <div className="itineraryListSection">
                    {pkg.itinerary && pkg.itinerary.length > 0 ? (
                        pkg.itinerary.slice(0, 4).map((item: any, i) => (
                            <div key={i} className="itStepItem">
                                <Check size={12} className="checkIcon" />
                                <span>{item.title || item}</span>
                            </div>
                        ))
                    ) : (
                        itineraryItems.slice(0, 4).map((item, i) => (
                            <div key={i} className="itStepItem">
                                <Check size={12} className="checkIcon" />
                                <span>{item}</span>
                            </div>
                        ))
                    )}
                </div> */}

                {/* High Detail Pricing Box */}
                <div className="detailedPricingBox">
                    <div className="pricingHeaderRow">
                        <div className="emiBadge">
                            <CreditCard size={12} />
                            No Cost EMI at <strong>₹{emi}/month</strong>
                        </div>
                        {pkg.oldPrice && (
                            <span className="priceRegular line-through">
                                {pkg.oldPrice}
                            </span>
                        )}
                    </div>

                    <div className="mainPriceSection">
                        <div className="pricePrimary">
                            <span className="currencySymbol">₹</span>
                            <span className="mainValue">{displayMainPrice}</span>
                            <span className="priceLabel">{pkg.per === 'Person' ? 'Per Person' : (pkg.per || "Per Person")}</span>
                        </div>
                        <div className="priceSecondary">
                            <span className="totalLabel">Total :</span>
                            <span className="totalValue">₹{totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Action CTA */}
                <div className="flex gap-3">
                    <Link 
                        href={`/packages/${pkg.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all rounded-xl py-3 font-bold text-sm"
                    >
                        Details
                    </Link>
                    <button 
                        className="enquireMainBtn flex-[1.5]"
                        onClick={(e) => onEnquire(e, pkg.title)}
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
        </div>
    );
}
