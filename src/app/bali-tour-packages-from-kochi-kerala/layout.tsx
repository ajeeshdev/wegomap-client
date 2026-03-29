import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bali Tour Packages from Kochi Kerala | Best Bali Holiday – WEGOMAP',
    description: "Discover Bali with WEGOMAP's affordable tour packages from Kochi. Explore temples, terraced rice fields, pristine beaches, and vibrant culture with verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Bali tour packages from Kochi, Bali tour packages from Kerala',
    openGraph: {
        title: 'Bali Tour Packages',
        description: 'Bali Holidays',
        images: ['/uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/bali-tour-packages-from-kochi-kerala',
    },
};

export default function BaliLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
