"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
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
}

export default function PageBanner({ 
    title, 
    subtitle, 
    preTitle, 
    breadcrumbs, 
    backgroundImage, 
    showBack = true,
    variant = 'standard' 
}: PageBannerProps) {
    const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

    return (
        <div className={`pageBanner ${backgroundImage ? 'hasImage' : 'noImage'} variant-${variant}`}>
            {/* Background Decorative Text */}
            <div className="bannerBgText">{title}</div>

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
                                <span>Home</span>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
