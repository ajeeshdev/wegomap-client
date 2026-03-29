
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sri Lanka Tour Packages | Best Deals on Sri Lanka Trips | WEGOMAP',
    description: 'Book Sri Lanka tour packages with WEGOMAP, a trusted Kochi-based tour operator. Explore beaches, heritage sites, and wildlife with verified hotels, best prices, safe travel services, and 24/7 customer support. Custom packages available.',
    keywords: 'Sri Lanka tour packages',
    openGraph: {
        title: 'Sri Lanka Tour Package',
        description: 'Sri Lanka',
        images: ['/uploads/categories/2fsdkcfcklfcdvyblurq0wzrrmyp0rhlhuamkriq240820031509.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/sri-lanka',
    },
};

export default function SriLankaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
