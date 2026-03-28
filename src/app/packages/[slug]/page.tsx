"use client";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import TourDetailView from '@/components/TourDetail/TourDetailView';
import { useEnquiry } from '@/context/EnquiryContext';

export default function StandardPackagePage() {
    const { slug } = useParams();
    const packageSlug = Array.isArray(slug) ? slug[0] : slug;
    const { setHideLayout } = useEnquiry();
    
    useEffect(() => {
        setHideLayout(false);
    }, [setHideLayout]);


    if (!packageSlug) return null;

    return <TourDetailView id={packageSlug} />;
}
