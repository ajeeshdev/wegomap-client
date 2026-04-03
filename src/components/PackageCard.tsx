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
        itinerary?: any[];
        averageRating?: number;
        reviewCount?: number;
        noCostEmi?: number;
        per?: string;
        totalPrice?: number;
        onoffer?: boolean;
        href?: string;
        _id?: string;
    };
    wishlist: string[];
    toggleWishlist: (id: string, e: React.MouseEvent) => void;
    onEnquire: (e: React.MouseEvent, title: string) => void;
}

export default function PackageCard({ pkg, wishlist, toggleWishlist, onEnquire }: PackageCardProps) {
    // Parse subtitle for itinerary list (e.g. "2N Munnar / 1N Thekkady")
    const itineraryItems = pkg.subtitle 
        ? pkg.subtitle.split(/[/|•]/).map(s => s.trim()).filter(Boolean)
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

    // Fallback: extract itinerary from static packagesData if empty in API
    let finalItinerary = pkg.itinerary || [];
    if (finalItinerary.length === 0) {
        // Direct Slug Match (Most accurate as it links to the detail page)
        let fallbackPkg: any = packagesData[pkg.slug];

        // If no slug match, try Title + Location/Subtitle normalization as backup
        if (!fallbackPkg) {
            const normalize = (s: string) => s?.toLowerCase().trim().replace(/[\s\/\-•|]/g, '') || '';
            const normTitle = normalize(pkg.title);
            const normSubtitle = normalize(pkg.subtitle || '');

            fallbackPkg = Object.values(packagesData).find(p => {
                const staticTitle = normalize(p.title);
                const staticLocation = normalize(p.location);
                if (staticTitle === normTitle) {
                    if (normSubtitle) {
                        return staticLocation === normSubtitle || staticLocation.includes(normSubtitle) || normSubtitle.includes(staticLocation);
                    }
                    return true;
                }
                return false;
            });
        }

        if (fallbackPkg && fallbackPkg.itinerary) {
            finalItinerary = fallbackPkg.itinerary;
        }
    }

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
    const emi = emiValue.toLocaleString();
    const totalPrice = pkg.totalPrice 
        ? Number(pkg.totalPrice).toLocaleString() 
        : (rawPrice * 2).toLocaleString();

    // Features Mapping
    const features = [
        "Intercity Car Transfers",
        "7 Activities Included",
        "3-4 Star Premium Hotels",
        "Daily Breakfast & Meals",
        "Airport Pickup & Drop"
    ];

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
                                    {(pkg.onoffer || pkg.oldPrice) && (
                                        <div className="absolute top-4 left-4  offerLabel">
                                            SPECIAL OFFER
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
                        {(pkg.onoffer || pkg.oldPrice) && (
                                        <div className="absolute top-4 left-4  offerLabel">
                                SPECIAL OFFER
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
                            <h3 className="cardTitle">{pkg.title}</h3>
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

                {/* Main Features Grid (Two Columns) */}
                <div className="featuresGrid">
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
                            <span className="mainValue">{rawPrice.toLocaleString()}</span>
                            <span className="priceLabel">{pkg.per === 'Person' ? 'Per Person' : (pkg.per || "Per Person")}</span>
                        </div>
                        <div className="priceSecondary">
                            <span className="totalLabel">Total :</span>
                            <span className="totalValue">₹{totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Action CTA */}
                <button 
                    className="enquireMainBtn"
                    onClick={(e) => onEnquire(e, pkg.title)}
                >
                    Enquire Now
                </button>
            </div>
        </div>
    );
}
