import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coorg Mysore Ooty Tour Package | South India Hill Station Trip – WEGOMAP',
    description: "Explore the best of South India with WEGOMAP's Coorg, Mysore & Ooty combined tour packages. Enjoy coffee estates, royal palaces, and Nilgiri hills with verified hotels and 24/7 support.",
    keywords: 'Coorg Mysore Ooty tour package, South India hill station packages',
    openGraph: {
        title: 'Coorg / Mysore / Ooty',
        description: '2N Coorg /1N Mysore /2N Ooty',
        images: ['/uploads/categories/neqghtvqmhem7lqiiniilprz8hoskpvtcyb82xo1240905031746.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/coorg-mysore-ooty',
    },
};

export default function CoorgMysoreOotyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
