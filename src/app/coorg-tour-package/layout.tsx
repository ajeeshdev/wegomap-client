import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coorg Tour Package from Kerala | Best Coorg Holiday – WEGOMAP',
    description: "Explore the Scotland of India with WEGOMAP's Coorg tour packages. Enjoy coffee plantations, waterfalls, and lush hills with verified hotels, best prices, and 24/7 support from a Kochi-based tour operator.",
    keywords: 'Coorg tour package, Coorg tour packages from Kerala',
    openGraph: {
        title: 'Coorg Tour Package',
        description: '2N Coorg',
        images: ['/uploads/categories/l4zbbjoyo4v19xzlzb4flec9ddgsenpvfhqgyzsg240906100043.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/coorg-tour-package',
    },
};

export default function CoorgLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
