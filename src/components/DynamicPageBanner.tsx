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
    imageAlt?: string;
    whatsappNumber?: string;
}

interface DynamicPageBannerProps {
    title?: string;
    subtitle?: string;
    preTitle?: string;
    fallbackTitle?: string;
    fallbackSubtitle?: string;
    fallbackPreTitle?: string;
    fallbackImage?: string;
    fallbackImageAlt?: string;
    variant?: 'standard' | 'large';
    breadcrumbs: { label: string; href?: string }[];
    centered?: boolean;
    showEnquire?: boolean;
    onEnquire?: () => void;
    category?: string;
    skipApiFetch?: boolean;
}


export default function DynamicPageBanner({
    title,
    subtitle,
    preTitle,
    fallbackTitle,
    fallbackSubtitle,
    fallbackPreTitle,
    fallbackImage,
    fallbackImageAlt,
    variant = 'standard',
    breadcrumbs,
    centered = false,
    showEnquire = false,
    onEnquire,
    category,
    skipApiFetch = false
}: DynamicPageBannerProps) {
    const pathname = usePathname();
    const [banner, setBanner] = useState<BannerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip API fetch if we have explicit title passed (options-managed pages)
        if (skipApiFetch || title) {
            setLoading(false);
            return;
        }
        async function fetchBanner() {
            try {
                // Use category if provided, otherwise use pathname
                const path = category || (pathname === '/' ? '/' : pathname.replace(/\/$/, ""));
                const pathStr = category ? category : (path.substring(1) || 'home');

                const [bRes, pRes, oRes] = await Promise.all([
                    fetch(`${API_URL}/banners/path/${pathStr}?t=${Date.now()}`, { cache: 'no-store' }),
                    fetch(`${API_URL}/pages/${pathStr}?t=${Date.now()}`, { cache: 'no-store' }),
                    fetch(`${API_URL}/options?t=${Date.now()}`, { cache: 'no-store' })
                ]);

                let bData: any = {};
                let pData: any = {};
                let oData: any = {};

                if (bRes.headers.get('content-type')?.includes('application/json')) {
                    bData = await bRes.json();
                }

                if (pRes.headers.get('content-type')?.includes('application/json')) {
                    pData = await pRes.json();
                }

                if (oRes.headers.get('content-type')?.includes('application/json')) {
                    oData = await oRes.json();
                }

                const merged: BannerData = {};

                if (bData.success && bData.data) {
                    merged.image = bData.data.image;
                    merged.imageAlt = bData.data.banner_image_alt || bData.data.imageAlt;
                }

                if (pData.success && pData.data) {
                    merged.title = pData.data.banner_title || pData.data.title;
                    merged.subtitle = pData.data.banner_subtitle || pData.data.subtitle;
                    merged.preTitle = pData.data.banner_pre_title;
                    if (pData.data.banner_image) merged.image = pData.data.banner_image;
                    if (pData.data.banner_image_alt) merged.imageAlt = pData.data.banner_image_alt;
                }

                if (oData.success && oData.data) {
                    const whatsappOpt = oData.data.find((opt: any) => opt.key === 'whatsapp');
                    if (whatsappOpt?.value) {
                        merged.whatsappNumber = whatsappOpt.value.replace(/\D/g, '');
                    }
                }

                setBanner(Object.keys(merged).length > 0 ? merged : null);
            } catch (err) {
                console.error('Error fetching banner:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchBanner();
    }, [pathname, category]);

    // Priority: explicitly passed props > API/pages data > fallback values
    const finalTitle = title || banner?.title || fallbackTitle;
    const finalSubtitle = subtitle || banner?.subtitle || fallbackSubtitle;
    const finalPreTitle = preTitle || banner?.preTitle || fallbackPreTitle || (breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : 'Explore');
    const finalImage = banner?.image || fallbackImage;
    const finalImageAlt = banner?.imageAlt || fallbackImageAlt;
    const finalWhatsappNumber = banner?.whatsappNumber || '918113998989';

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
            subtitle={finalSubtitle}
            preTitle={finalPreTitle}
            backgroundImage={finalImage}
            imageAlt={finalImageAlt}
            breadcrumbs={breadcrumbs}
            variant={variant}
            centered={centered}
            showEnquire={showEnquire}
            onEnquire={onEnquire}
            whatsappNumber={finalWhatsappNumber}
        />
    );
}


