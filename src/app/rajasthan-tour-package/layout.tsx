
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rajasthan Tour Packages | Best Deals on Rajasthan Trips | WEGOMAP',
    description: 'Explore the royal heritage of India with WEGOMAP\'s Rajasthan tour packages. Discover forts, palaces, deserts, and cultural experiences with trusted hotels, great prices, and 24/7 support from a Kochi-based tour operator. Custom packages available to suit your needs and budget.',
    keywords: 'Rajasthan tour packages',
    openGraph: {
        title: 'Rajasthan Tour package',
        description: 'Rajasthan Tour package',
        images: ['/uploads/categories/twhsfbqthmna28zogfp3kpedhqd692qv29cqe85u240904024319.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/rajasthan-tour-package',
    },
};

export default function RajasthanLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
