"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    subtitle?: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
    showBack?: boolean;
}

export default function PageBanner({ title, subtitle, breadcrumbs, backgroundImage, showBack = true }: PageBannerProps) {
    const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

    return (
        <div className={`pageBanner ${backgroundImage ? 'hasImage' : 'noImage'}`}>
            {/* Background Decorative Text */}
            <div className="bannerBgText">{title}</div>

            {backgroundImage && (
                <div className="pageBannerImg">
                    <Image
                        src={backgroundImage}
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
                <div className="cosmicContainer">
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
                        <h1 className="pageBannerTitle">
                            {title.includes('\n') ? (
                                title.split('\n').map((line, i) => (
                                    <span key={i} className={i === 1 ? 'italicText' : ''}>
                                        {line} {i === 0 && <br />}
                                    </span>
                                ))
                            ) : (
                                <>
                                    {title.split(' ').slice(0, -2).join(' ')} <br />
                                    <span className="italicText">{title.split(' ').slice(-2).join(' ')}</span>
                                </>
                            )}
                        </h1>

                        {subtitle && <p className="pageBannerSubtitle">{subtitle}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
