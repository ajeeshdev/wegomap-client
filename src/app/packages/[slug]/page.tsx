"use client";

import { useParams } from 'next/navigation';
import TourDetailView from '@/components/TourDetail/TourDetailView';

export default function PackageDetailPage() {
    const { slug } = useParams();
    const packageSlug = Array.isArray(slug) ? slug[0] : slug;

    if (!packageSlug) return null;

    return <TourDetailView id={packageSlug} />;
}
