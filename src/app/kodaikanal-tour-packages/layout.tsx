import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kodaikanal Tour Packages from Kerala | Best Kodai Holiday – WEGOMAP',
    description: "Book Kodaikanal tour packages from Kerala with WEGOMAP. Explore the Princess of Hill Stations with mist, waterfalls, and scenic valleys. Verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Kodaikanal tour packages, Kodaikanal tour packages from Kerala',
    openGraph: {
        title: 'Kodaikanal Tour Packages',
        description: '2N Kodaikanal',
        images: ['/uploads/categories/umwfsgcys5bekqzaaga7nsholfjuuhiqvnal5r4o240905034708.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/kodaikanal-tour-packages',
    },
};

export default function KodaikanalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
