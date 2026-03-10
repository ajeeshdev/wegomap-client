import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thailand Tour Packages from Kerala | Thailand Trip from Kochi – Wegomap',
    description: "Explore Thailand with Wegomap's affordable tour packages from Kerala. Discover Bangkok, Pattaya, Phuket & Krabi with verified hotels, expert planning, and 24/7 support from a Kochi-based tour operator.",
    keywords: 'Thailand tour packages from Kerala, Thailand tour packages from Kochi',
    openGraph: {
        title: 'Thailand Tour Packages',
        description: 'Explore with us',
        images: ['/uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/thailand-tour-packages-from-kochi-kerala',
    },
};

export default function ThailandLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
