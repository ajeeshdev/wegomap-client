"use client";

import { useParams } from 'next/navigation';
import TourDetailView from '@/components/TourDetail/TourDetailView';

export default function CategoryTourDetailPage() {
    const { id } = useParams();
    const slug = Array.isArray(id) ? id[0] : id;

    if (!slug) return null;

    return <TourDetailView id={slug} />;
}
