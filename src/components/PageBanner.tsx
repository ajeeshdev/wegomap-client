"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Star, MessageSquare } from 'lucide-react';
import { getImageUrl } from '@/config';
import { useEnquiry } from '@/context/EnquiryContext';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    subtitle?: string;
    preTitle?: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
    variant?: 'standard' | 'large';
    centered?: boolean;
    showEnquire?: boolean;
    onEnquire?: () => void;
}

export default function PageBanner({ 
    title, 
    subtitle, 
    preTitle, 
    breadcrumbs, 
    backgroundImage, 
    variant = 'standard',
    centered = false,
    showEnquire = false,
    onEnquire
}: PageBannerProps) {
    const { openEnquiry } = useEnquiry();

    const handleEnquiry = () => {
        if (onEnquire) {
            onEnquire();
        } else {
            openEnquiry(title);
        }
    };

    return (
        <div className={`pageBanner ${backgroundImage ? 'hasImage' : 'noImage'} variant-${variant} ${centered ? 'isCentered' : ''}`}>
            {/* Background Decorative Text Removed per user request */}


            {backgroundImage && (
                <div className="pageBannerImg">
                    <Image
                        src={getImageUrl(backgroundImage)}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                </div>
            )}

            <div className="pageBannerOverlay" />

            <div className="pageBannerInner">
                <div className="homeContainer">
                    <div className="pageBannerTop">
                        <nav className="pageBreadcrumb" aria-label="breadcrumb">
                            <Link href="/" className="breadcrumbItem breadcrumbHome">
                                <Home size={13} />
                                <span className='breadcrumbItem'>Home</span>
                            </Link>

                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="breadcrumbGroup">
                                    <ChevronRight size={13} className="breadcrumbSep" />
                                    {crumb.href && i < breadcrumbs.length - 1 ? (
                                        <Link href={crumb.href} className="breadcrumbItem">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="breadcrumbItem active">{crumb.label}</span>
                                    )}
                                </span>
                            ))}
                        </nav>

                    </div>

                    <div className="pageBannerContent">
                        {preTitle && <div className="pageBannerPreTitle">{preTitle}</div>}
                        <h1 className="pageBannerTitle">
                            {title}
                        </h1>
                        {subtitle && <p className="pageBannerDescription">{subtitle}</p>}
                        
                        {showEnquire && (
                            <div className="pageBannerActions mt-8">
                                <button 
                                    onClick={handleEnquiry}
                                    className="bannerEnquireBtn px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20 active:scale-95 text-sm uppercase tracking-widest"
                                >
                                    <MessageSquare size={18} />
                                    Enquire Now
                                </button>
                            </div>
                        )}
                        
                        {centered && (
                            <div className="googleReviewsBadge">
                                <span className="googleIcon">G</span>
                                <span className="rating">4.8</span>
                                <div className="stars">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#fbbf24" color="#fbbf24" />)}
                                </div>
                                <span className="count">450 Google reviews</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
