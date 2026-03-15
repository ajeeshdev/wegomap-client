"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageBanner from './PageBanner';

interface BannerData {
    title?: string;
    subtitle?: string;
    image?: string;
    showBack?: boolean;
}

interface DynamicPageBannerProps {
    fallbackTitle?: string;
    fallbackSubtitle?: string;
    fallbackImage?: string;
    breadcrumbs: { label: string; href?: string }[];
}

export default function DynamicPageBanner({ 
    fallbackTitle, 
    fallbackSubtitle, 
    fallbackImage,
    breadcrumbs 
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

    return (
        <PageBanner
            title={banner?.title || fallbackTitle || "Explore Your Journey"}
            subtitle={banner?.subtitle || fallbackSubtitle}
            backgroundImage={banner?.image || fallbackImage}
            breadcrumbs={breadcrumbs}
            showBack={banner?.showBack ?? true}
        />
    );
}
