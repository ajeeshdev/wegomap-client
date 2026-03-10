import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dubai Tour Packages from Kerala | Best Dubai Holiday – Wegomap',
    description: "Experience luxury and adventure with Wegomap's Dubai tour packages. Explore the Burj Khalifa, desert safaris, and world-class malls with verified hotels, best prices, and 24/7 support.",
    keywords: 'Dubai tour packages, Dubai tour packages from Kerala, Dubai tour packages from Kochi',
    openGraph: {
        title: 'Dubai Tour Packages',
        description: 'Dubai Holidays',
        images: ['/uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/dubai-tour-packages',
    },
};

export default function DubaiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
