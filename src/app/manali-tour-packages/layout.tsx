import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manali Tour Packages from Kerala | Kullu Manali Packages – Wegomap',
    description: "Book Manali tour packages from Kerala with Wegomap, a trusted Kochi-based tour operator. Explore snow-capped peaks, valleys and adventure with verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Manali tour packages, Kullu Manali packages from Kerala',
    openGraph: {
        title: 'Manali Tour Packages',
        description: 'Explore with us',
        images: ['https://www.wegomap.com/uploads/categories/ofsorzqr2izti1rwgjqjaxxp4iws07ct9heovkwj220406065835.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/manali-tour-packages',
    },
};

export default function ManaliLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
