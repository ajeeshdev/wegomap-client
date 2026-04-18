import type { Metadata } from 'next';

import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('blogs', 'Travel Blogs');

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
