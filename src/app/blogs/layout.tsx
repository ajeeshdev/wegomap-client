import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Travel Blogs | WEGOMAP Tours & Events',
    description: 'Explore travel stories, destination guides, and insider tips from WEGOMAP — your trusted Kerala travel partner.',
    keywords: 'travel blogs, kerala travel guide, wegomap blogs, travel stories india',
    openGraph: {
        title: 'Travel Blogs | WEGOMAP Tours & Events',
        description: 'Explore travel stories, destination guides, and insider tips.',
        images: ['https://www.wegomap.com/uploads/blogs/R4ma3fObGZPA3966ndEgm2tFKfLUx2bmj4NyByXJ220406090021.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/blogs/',
    },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
