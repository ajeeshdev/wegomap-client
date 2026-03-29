import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Maldives Tour Packages from Kochi Kerala | Best Maldives Holiday – WEGOMAP',
    description: "Explore paradise with WEGOMAP's Maldives tour packages from Kochi. Enjoy overwater bungalows, crystal-clear lagoons, and pristine beaches with verified resorts, best prices, and 24/7 customer support.",
    keywords: 'Maldives tour packages from Kochi, Maldives tour packages from Kerala',
    openGraph: {
        title: 'Maldives Tour Packages',
        description: 'Explore with us',
        images: ['/uploads/categories/nyuzwvgb639wz6mbjratshvfzdtm9tgxbpivpjqs220406065555.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/maldives-tour-packages-from-kochi-kerala',
    },
};

export default function MaldivesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
