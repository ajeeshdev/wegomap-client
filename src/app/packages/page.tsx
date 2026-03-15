import { Suspense } from 'react';
import AllToursPage from '@/components/AllToursPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tour Packages | Wegomap — Kerala & International Tours',
    description: 'Browse all tour packages offered by Wegomap — Kerala, international, honeymoon, family, and adventure tours. Filter by category and find your perfect trip.',
    keywords: 'tour packages, kerala tours, international packages, honeymoon packages, wegomap',
};

export default function PackagesPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0f172a' }} />}>
            <AllToursPage />
        </Suspense>
    );
}
