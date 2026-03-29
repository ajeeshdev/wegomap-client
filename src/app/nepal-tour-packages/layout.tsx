import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nepal Tour Packages from Kerala | Best Nepal Trip – WEGOMAP',
    description: "Explore the Himalayas with WEGOMAP's Nepal tour packages. Visit Kathmandu and Pokhara with verified hotels, expert planning, great prices, and 24/7 support from a Kochi-based tour operator.",
    keywords: 'Nepal tour packages, Nepal tour packages from Kerala',
    openGraph: {
        title: 'Nepal Tour Packages',
        description: 'Explore with us',
        images: ['/uploads/categories/zuq5qozfb1bxlyyr84azxkajfabeigl2udrfhhxa220406065441.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/nepal-tour-packages',
    },
};

export default function NepalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
