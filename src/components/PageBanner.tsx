"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ArrowLeft, Star } from 'lucide-react';
import { getImageUrl } from '@/config';

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
    showBack?: boolean;
    variant?: 'standard' | 'large';
    centered?: boolean;
}

export default function PageBanner({ 
    title, 
    subtitle, 
    preTitle, 
    breadcrumbs, 
    backgroundImage, 
    showBack = true,
    variant = 'standard',
    centered = false
}: PageBannerProps) {
    const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

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

                        {showBack && (
                            <button 
                                onClick={() => router?.back()}
                                className="bannerBackBtn"
                            >
                                <ArrowLeft size={14} />
                                <span>Go Back</span>
                            </button>
                        )}
                    </div>

                    <div className="pageBannerContent">
                        {preTitle && <div className="pageBannerPreTitle">{preTitle}</div>}
                        <h1 className="pageBannerTitle">
                            {title}
                        </h1>
                        {subtitle && <p className="pageBannerDescription">{subtitle}</p>}
                        
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
