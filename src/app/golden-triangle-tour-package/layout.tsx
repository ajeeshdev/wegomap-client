import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Golden Triangle Tour Package | Delhi, Agra & Jaipur Tours | Wegomap',
    description: "Explore India's iconic Golden Triangle with Wegomap's tailored tour packages covering Delhi, Agra, and Jaipur. Enjoy trusted hotels, expert planning, great prices, and 24/7 support from a Kochi-based tour operator. Custom packages available for families, couples, and groups.",
    keywords: 'Golden Triangle tour package',
    openGraph: {
        title: 'Golden Triangle Tour Package',
        description: 'Golden Triangle',
        images: ['https://www.wegomap.com/uploads/categories/1cs3jcryqwyeiskhq76sy33is8ico6qqnulbrskv240905024238.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/golden-triangle-tour-package',
    },
};

export default function GoldenTriangleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
