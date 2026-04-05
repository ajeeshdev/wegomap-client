"use client";

import { useEffect } from 'react';
import LandingPageView from '@/components/LandingPage/LandingPageView';
import LandingPageHeader from '@/components/LandingPage/LandingPageHeader';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MyraBot from '@/components/MyraBot';
import { useEnquiry } from '@/context/EnquiryContext';

export default function LandingPageWrapper({ data }: { data: any }) {
    const { setHideLayout } = useEnquiry();

    useEffect(() => {
        setHideLayout(true);
        return () => setHideLayout(false);
    }, [setHideLayout]);

    return (
        <div className="landing-page-root">
            <LandingPageHeader />
            <LandingPageView data={data} />
            <Footer />
            <MobileNav />
            <FloatingWhatsApp />
            <MyraBot />
        </div>
    );
}
