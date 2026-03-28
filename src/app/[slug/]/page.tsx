"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import LandingPageView from '@/components/LandingPage/LandingPageView';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MyraBot from '@/components/MyraBot';
import { useEnquiry } from '@/context/EnquiryContext';

export default function LandingPageCatchAll() {
    const { slug } = useParams();
    const packageSlug = Array.isArray(slug) ? slug[0] : slug;
    const [landingPage, setLandingPage] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { setHideLayout } = useEnquiry();
    const router = useRouter();

    useEffect(() => {
        setHideLayout(true);
        return () => setHideLayout(false);
    }, [setHideLayout]);

    useEffect(() => {
        async function checkLanding() {
            if (!packageSlug) return;
            try {
                // Fetch to check if it's a campaign landing page
                const res = await fetch(`${API_URL}/pages?slug=${packageSlug}`);
                const json = await res.json();
                if (json.success && json.data) {
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
                <Header />
                <LandingPageView data={landingPage} />
                <Footer />
                <MobileNav />
                <FloatingWhatsApp />
                <MyraBot />
            </>
        );
    }

    // Fallback if no landing page found at this slug
    return (
        <div className="pt-40 text-center min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <div className="text-8xl mb-6">🏝️</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Page Not Found</h2>
            <p className="text-slate-500 font-medium max-w-md mx-auto mt-4">
                The campaign page you are looking for doesn't exist or has moved.
            </p>
            <button 
                onClick={() => router.push('/')}
                className="mt-10 px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 transition-all"
            >
                Back to Home
            </button>
        </div>
    );
}
