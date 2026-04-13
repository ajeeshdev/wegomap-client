"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageBanner from './PageBanner';

interface BannerData {
    title?: string;
    subtitle?: string;
    preTitle?: string;
    image?: string;
}

interface DynamicPageBannerProps {
    title?: string;
    subtitle?: string;
    fallbackTitle?: string;
    fallbackSubtitle?: string;
    fallbackPreTitle?: string;
    fallbackImage?: string;
    variant?: 'standard' | 'large';
    breadcrumbs: { label: string; href?: string }[];
    centered?: boolean;
    showEnquire?: boolean;
    onEnquire?: () => void;
}


export default function DynamicPageBanner({ 
    title,
    subtitle,
    fallbackTitle, 
    fallbackSubtitle, 
    fallbackPreTitle,
    fallbackImage,
    variant = 'standard',
    breadcrumbs,
    centered = false,
    showEnquire = false,
    onEnquire
}: DynamicPageBannerProps) {
    const pathname = usePathname();
    const [banner, setBanner] = useState<BannerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBanner() {
            try {
                // Remove trailing slash if exists, but keep leading slash
                const path = pathname === '/' ? '/' : pathname.replace(/\/$/, "");
                const pathStr = path.substring(1) || 'home';
                
                const [bRes, pRes] = await Promise.all([
                    fetch(`${API_URL}/banners/path/${pathStr}`),
                    fetch(`${API_URL}/pages/${pathStr}`)
                ]);
                
                let bData: any = {};
                let pData: any = {};

                if (bRes.headers.get('content-type')?.includes('application/json')) {
                    bData = await bRes.json();
                }
                
                if (pRes.headers.get('content-type')?.includes('application/json')) {
                    pData = await pRes.json();
                }
                
                const merged: BannerData = {};
                
                if (bData.success && bData.data) {
                    merged.image = bData.data.image;
                }
                
                if (pData.success && pData.data) {
                    merged.title = pData.data.banner_title || pData.data.title;
                    merged.subtitle = pData.data.banner_subtitle || pData.data.subtitle;
                    merged.preTitle = pData.data.banner_pre_title;
                }
                
                setBanner(Object.keys(merged).length > 0 ? merged : null);
            } catch (err) {
                console.error('Error fetching banner:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchBanner();
    }, [pathname]);

    const finalTitle = title || banner?.title || fallbackTitle;
    
    // If we're loading and have no title yet, we can return a skeleton or a themed loader
    if (!finalTitle && loading) return (
        <div className={`pageBanner noImage variant-${variant}`}>
            <div className="pageBannerInner h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin" />
            </div>
        </div>
    );

    return (
        <PageBanner
            title={finalTitle || "Explore"} 
            subtitle={subtitle || banner?.subtitle || fallbackSubtitle}
            preTitle={banner?.preTitle || fallbackPreTitle || (breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : 'Explore')}
            backgroundImage={banner?.image || fallbackImage}
            breadcrumbs={breadcrumbs}
            variant={variant}
            centered={centered}
            showEnquire={showEnquire}
            onEnquire={onEnquire}
        />
    );
}


