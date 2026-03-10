import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Goa Tour Packages from Kerala | Goa Holiday Packages – Wegomap',
    description: "Book Goa tour packages from Kerala with Wegomap. Enjoy beaches, nightlife, and heritage with comfortable stays, best prices, and 24/7 customer support from a trusted Kochi-based tour operator.",
    keywords: 'Goa tour packages from Kerala, Goa tour packages from Kochi',
    openGraph: {
        title: 'Goa Tour Packages',
        description: 'Explore with us',
        images: ['https://www.wegomap.com/uploads/categories/86wg9d29vhkflmuwtyrsof3rfqtcapzgva0ynqlp220406065630.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/goa-tour-packages-from-kerala',
    },
};

export default function GoaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
