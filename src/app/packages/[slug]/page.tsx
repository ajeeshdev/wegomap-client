"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import TourDetailView from '@/components/TourDetail/TourDetailView';
import LandingPageView from '@/components/LandingPage/LandingPageView';
import LandingPageHeader from '@/components/LandingPage/LandingPageHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MyraBot from '@/components/MyraBot';

export default function PackageDetailPage() {
    const { slug } = useParams();
    const packageSlug = Array.isArray(slug) ? slug[0] : slug;
    const [landingPage, setLandingPage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkLanding() {
            if (!packageSlug) return;
            try {
                // Check if this slug points to a landing page/campaign
                const res = await fetch(`${API_URL}/pages?slug=${packageSlug}`);
                const json = await res.json();
                
                if (json.success && json.data) {
                    // find exact match in case query param is loose
                    const page = json.data.find((p: any) => p.slug === packageSlug && p.isCampaign);
                    if (page) {
                        setLandingPage(page);
                    }
                }
            } catch (err) {
                console.error("Landing check failed", err);
            } finally {
                setLoading(false);
            }
        }
        checkLanding();
    }, [packageSlug]);

    if (!packageSlug) return null;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (landingPage) {
        return (
            <>
                <LandingPageHeader />
                <LandingPageView data={landingPage} />
                <Footer />
                <MobileNav />
                <FloatingWhatsApp />
                <MyraBot />
            </>
        );
    }

    // Default to the standard tour detail view
    return (
        <>
            <Header />
            <TourDetailView id={packageSlug} />
            <Footer />
            <MobileNav />
            <FloatingWhatsApp />
            <MyraBot />
        </>
    );
}
