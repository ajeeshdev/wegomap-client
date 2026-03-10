import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bhutan Tour Packages from Kerala | Peaceful Bhutan Trips – Wegomap',
    description: "Discover the Land of Thunder Dragon with Wegomap's Bhutan tour packages. Explore monasteries, dzongs, and pristine nature with verified hotels, expert planning, best prices, and 24/7 support.",
    keywords: 'Bhutan tour packages, Bhutan packages from Kerala',
    openGraph: {
        title: 'Bhutan Package',
        description: '6N 7D Bhutan',
        images: ['/uploads/categories/5z2forothrchrzckhauy3hq8zxsxchlbx2rncnzx240904035922.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/bhutan-packages',
    },
};

export default function BhutanLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
