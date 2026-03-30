"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin, Clock, Star, Check, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { getImageUrl } from '@/config';
import WishlistButton from './WishlistButton';

import 'swiper/css';
import 'swiper/css/navigation';
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
    };
    wishlist: string[];
    toggleWishlist: (id: string, e: React.MouseEvent) => void;
    onEnquire: (e: React.MouseEvent, title: string) => void;
}

export default function PackageCard({ pkg, wishlist, toggleWishlist, onEnquire }: PackageCardProps) {
    // Parse subtitle for itinerary list (e.g. "2N Munnar / 1N Thekkady")
    const itineraryItems = pkg.subtitle 
        ? pkg.subtitle.split(/[/|]/).map(s => s.trim()).filter(Boolean)
        : [];

    // All images for slider
    const allImages = [pkg.image, ...(pkg.images || [])].filter(Boolean);
    
    // EMI Calculation (simplified logic for UI)
    const rawPrice = parseInt(pkg.price.replace(/[^\d]/g, '')) || 0;
    const emi = Math.round(rawPrice / 3).toLocaleString();

    return (
        <div className="detailedPackageCard group">
            {/* Image Slider Section */}
            <div className="cardImageSection">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="cardImageSwiper"
                    loop={allImages.length > 1}
                >
                    {allImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3]">
                                <Image
                                    src={getImageUrl(img)}
                                    alt={`${pkg.title} - ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Overlay Badges */}
                <div className="cardOverlay">
                    <div className="durationBadge">
                        {pkg.duration || 'Flexible'}
                    </div>
                    <div className="wishlistBtnWrapper">
                        <WishlistButton id={pkg.slug} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="cardContent">
                <div className="headerArea">
                    <Link href={`/packages/${pkg.slug}`} className="titleLink">
                        <h3 className="cardTitle">{pkg.title}</h3>
                    </Link>
                    <div className="ratingRow">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={12} fill="#fbbf24" color="#fbbf24" />
                            ))}
                        </div>
                        <span className="reviewCount">1000+ Reviews</span>
                    </div>
                </div>

                {/* Itinerary Summary (Nights/Locations) */}
                {itineraryItems.length > 0 && (
                    <ul className="itinerarySummary">
                        {itineraryItems.map((item, i) => (
                            <li key={i}>
                                <div className="bullet" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Inclusions / Highlights - Two columns */}
                <div className="inclusionsGrid">
                    <div className="inclusionItem">
                        <Check size={14} className="text-emerald-500" />
                        <span>Private Transfers</span>
                    </div>
                    <div className="inclusionItem">
                        <Check size={14} className="text-emerald-500" />
                        <span>3 Star Premium Hotels</span>
                    </div>
                    <div className="inclusionItem">
                        <Check size={14} className="text-emerald-500" />
                        <span>Daily Breakfast</span>
                    </div>
                    <div className="inclusionItem">
                        <Check size={14} className="text-emerald-500" />
                        <span>Expert Guided Tours</span>
                    </div>
                </div>

                {/* Call to Action Highlights (Green Checks) */}
                {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="keyHighlights">
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="highlightItem">
                                <Check size={12} strokeWidth={3} className="text-emerald-600" />
                                <span>{h}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pricing Box */}
                <div className="pricingBox">
                    <div className="emiInfo">
                        <div className="emiIcon"><CreditCard size={14} /></div>
                        <span>Best EMI at <strong>₹{emi}/mo</strong></span>
                    </div>
                    <div className="priceMain">
                        <div className="priceStack">
                            {pkg.oldPrice && <span className="oldPrice">{pkg.oldPrice}</span>}
                            <div className="currentPrice">
                                <span className="amount">{pkg.price}</span>
                                <span className="unit">/ Person</span>
                            </div>
                        </div>
                        <div className="totalPriceLabel">
                            Total Price ₹{(rawPrice * 2).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="cardActions">
                    <button 
                        className="enquireButton"
                        onClick={(e) => onEnquire(e, pkg.title)}
                    >
                        Enquire Now
                        <ArrowRight size={16} />
                    </button>
                    <Link href={`/packages/${pkg.slug}`} className="detailsLink">
                        View Details
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .detailedPackageCard {
                    background: #fff;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    border: 1px solid #f1f5f9;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    transition: all 0.3s ease;
                }
                .detailedPackageCard:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    transform: translateY(-4px);
                    border-color: #e2e8f0;
                }
                .cardImageSection {
                    position: relative;
                    overflow: hidden;
                }
                .durationBadge {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: #fff;
                    color: #0f172a;
                    padding: 4px 12px;
                    border-radius: 99px;
                    font-size: 11px;
                    font-weight: 800;
                    z-index: 10;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .wishlistBtnWrapper {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    z-index: 10;
                }
                .cardContent {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .headerArea {
                    margin-bottom: 12px;
                }
                .cardTitle {
                    font-size: 16px;
                    font-weight: 900;
                    color: #000;
                    margin: 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    min-height: 42px;
                }
                .ratingRow {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 6px;
                }
                .stars { display: flex; gap: 2px; }
                .reviewCount { font-size: 11px; color: #64748b; font-weight: 600; }
                
                .itinerarySummary {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 16px;
                    padding: 0;
                    list-style: none;
                }
                .itinerarySummary li {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #475569;
                    background: #f8fafc;
                    padding: 4px 8px;
                    border-radius: 6px;
                }
                .descriptionArea {
                    font-size: 12px;
                    color: #475569;
                    line-height: 1.5;
                    margin-bottom: 16px;
                }
                .inclusionsGrid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    margin-bottom: 16px;
                }
                .inclusionItem {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    font-weight: 600;
                    color: #1e293b;
                }
                .keyHighlights {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 20px;
                    background: #f0fdf4;
                    padding: 10px;
                    border-radius: 12px;
                }
                .highlightItem {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #166534;
                }
                .pricingBox {
                    margin-top: auto;
                    background: #f8fafc;
                    padding: 12px;
                    border-radius: 16px;
                    margin-bottom: 16px;
                }
                .emiInfo {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    color: #475569;
                    margin-bottom: 8px;
                }
                .priceMain {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .currentPrice {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                }
                .amount { font-size: 20px; font-weight: 900; color: #000; }
                .unit { font-size: 10px; color: #64748b; font-weight: 700; }
                .oldPrice { font-size: 12px; text-decoration: line-through; color: #94a3b8; }
                .totalPriceLabel { font-size: 9px; color: #94a3b8; font-weight: 700; margin-top: 2px; }

                .cardActions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .enquireButton {
                    flex: 1;
                    height: 48px;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #fff;
                    border: none;
                    border-radius: 14px;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .enquireButton:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    background: #f97316;
                }
                .detailsLink {
                    font-size: 11px;
                    font-weight: 800;
                    color: #64748b;
                    text-transform: uppercase;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
