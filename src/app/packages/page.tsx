import { Suspense } from 'react';
import AllToursPage from '@/components/AllToursPage';
import type { Metadata } from 'next';

import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('packages', 'All Tour Packages');

export default function ToursPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0f172a' }} />}>
            <AllToursPage />
        </Suspense>
    );
}
