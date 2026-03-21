"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import HotelLandingPageView from '@/components/HotelLandingPage/HotelLandingPageView';
import LandingPageHeader from '@/components/LandingPage/LandingPageHeader';

export default function HotelLandingPage() {
    const { slug } = useParams();
    const hotelSlug = Array.isArray(slug) ? slug[0] : slug;
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHotelPage() {
            if (!hotelSlug) return;
            try {
                // Fetch the page with isCampaign: true and explicitly checking for hotel type if necessary
                // Our Page model has type: { type: String, default: 'landing' }
                // We'll filter for type: 'hotel' when creating it.
                const res = await fetch(`${API_URL}/pages?slug=${hotelSlug}&type=hotel`);
                const json = await res.json();
                
                if (json.success && json.data) {
                    // Match the specific slug and type
                    const page = json.data.find((p: any) => p.slug === hotelSlug && p.type === 'hotel');
                    if (page) {
                        setPageData(page);
                    }
                }
            } catch (err) {
                console.error("Hotel page fetch failed", err);
            } finally {
                setLoading(false);
            }
        }
        fetchHotelPage();
    }, [hotelSlug]);

    if (!hotelSlug) return null;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (pageData) {
        return (
            <HotelLandingPageView data={pageData} />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
            <h1 className="text-4xl font-serif text-slate-800">404 - Hotel Not Found</h1>
            <p className="text-slate-500">The hotel page you are looking for does not exist or has been moved.</p>
            <Link href="/" className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold">Back to Home</Link>
        </div>
    );
}

// Minimal missing Link import fix
import Link from 'next/link';
