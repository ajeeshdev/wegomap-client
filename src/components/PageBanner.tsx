"use client";

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    subtitle?: string;
    breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
    return (
        <div className="pageBanner">
            {/* Ghost watermark */}
            <span className="pageBannerGhost" aria-hidden="true">{title}</span>

            <div className="homeContainer pageBannerInner">
                {/* Orange accent label */}
                <span className="pageBannerAccent">Wegomap</span>

                {/* Title */}
                <h1 className="pageBannerTitle">{title}</h1>

                {/* Optional subtitle */}
                {subtitle && <p className="pageBannerSubtitle">{subtitle}</p>}

                {/* Breadcrumb */}
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
            </div>
        </div>
    );
}
