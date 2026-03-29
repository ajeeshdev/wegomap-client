import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ooty & Kodaikanal Tour Packages | Combined Hill Station Holiday – WEGOMAP',
    description: "Explore Ooty and Kodaikanal together with WEGOMAP's combined tour packages. Enjoy cool hills, scenic lakes, and nature trails with verified hotels, best prices, and 24/7 support.",
    keywords: 'Ooty Kodaikanal tour packages, Ooty and Kodaikanal packages',
    openGraph: {
        title: 'Ooty & Kodaikanal Packages',
        description: '2N Ooty, 2N Kodaikanal',
        images: ['/uploads/categories/gooqe4hpze2i6jmaewve7pyud8kofwvwpunfxgql240905041417.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/ooty-kodaikanal-tour-packages',
    },
};

export default function OotyKodaikanalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
