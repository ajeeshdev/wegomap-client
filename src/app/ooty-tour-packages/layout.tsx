import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ooty Tour Packages from Kerala | Best Ooty Holiday – WEGOMAP',
    description: "Book Ooty tour packages from Kerala with WEGOMAP, a trusted Kochi-based tour operator. Enjoy the Nilgiris, tea gardens, and cool weather with verified hotels, best prices, and 24/7 support.",
    keywords: 'Ooty tour packages, Ooty tour packages from Kerala',
    openGraph: {
        title: 'Ooty Tour Packages',
        description: '2 Nights Ooty',
        images: ['/uploads/categories/xivejtmsap5g34sse6prhfkyykvxzhw9lanygtbt240905034008.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/ooty-tour-packages',
    },
};

export default function OotyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
