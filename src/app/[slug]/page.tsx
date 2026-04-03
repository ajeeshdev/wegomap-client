"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import TourDetailView from '@/components/TourDetail/TourDetailView';
import LandingPageView from '@/components/LandingPage/LandingPageView';
import LandingPageHeader from '@/components/LandingPage/LandingPageHeader';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MyraBot from '@/components/MyraBot';
import { useEnquiry } from '@/context/EnquiryContext';

import { redirect } from 'next/navigation';
import { categoryMappings } from '@/data/categoryMappings';

export default function PackageDetailPage() {
    const { slug } = useParams();
    const packageSlug = Array.isArray(slug) ? slug[0] : slug;
    const [landingPage, setLandingPage] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { setHideLayout } = useEnquiry();

    useEffect(() => {
        if (!loading) {
            setHideLayout(!!landingPage);
        }
        return () => setHideLayout(false);
    }, [loading, landingPage, setHideLayout]);


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

    // Root slug now ONLY handles landing pages (campaigns). 
    // If it matches a category mapping, redirect to /packages/[slug]
    if (categoryMappings[packageSlug]) {
        redirect(`/packages/${packageSlug}`);
    }

    // Otherwise standard tours should also be at /packages/[slug]
    // redirect(`/packages/${packageSlug}`); 
    // Wait, let's just 404 if not found at all, but for now we'll allow redirecting package detail too if they were at root
    // But most tours are only at /packages/ anyway.
    
    return null;
}

