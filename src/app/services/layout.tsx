import type { Metadata } from 'next';

import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('services', 'Travel Services');

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
