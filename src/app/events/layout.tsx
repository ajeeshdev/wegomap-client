import type { Metadata } from 'next';

import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('events', 'Corporate Events');

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
