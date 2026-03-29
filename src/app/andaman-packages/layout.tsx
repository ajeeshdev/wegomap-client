import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Andaman Tour Packages from Kerala | Best Andaman Holiday – WEGOMAP',
    description: "Explore the stunning Andaman Islands with WEGOMAP. Enjoy pristine beaches, coral reefs, and underwater adventures with verified island hotels, best prices, and 24/7 support from a Kochi-based tour operator.",
    keywords: 'Andaman tour packages, Andaman packages from Kerala, Andaman packages from Kochi',
    openGraph: {
        title: 'Andaman Packages',
        description: 'Andaman Holidays',
        images: ['/uploads/categories/x8mupizywhx0lbujzpvsk6qrznf18bixirysodea240904050124.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/andaman-packages',
    },
};

export default function AndamanLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
