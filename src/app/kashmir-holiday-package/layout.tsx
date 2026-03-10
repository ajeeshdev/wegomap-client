import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kashmir Holiday Package | Best Deals on Kashmir Tours – Wegomap',
    description: "Book Kashmir holiday packages with Wegomap, a trusted Kochi-based tour operator. Explore Srinagar's valleys, Dal Lake, Gulmarg, and Pahalgam with verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Kashmir holiday package, Kashmir tour packages from Kerala',
    openGraph: {
        title: 'Kashmir Holiday Package',
        description: '5N Srinagar',
        images: ['https://www.wegomap.com/uploads/categories/vsgopcdmooaxqkjltfnahzvl4vqe1fdioxawg2yt240829024046.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/kashmir-holiday-package',
    },
};

export default function KashmirLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
