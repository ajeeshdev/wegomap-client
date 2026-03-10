import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Azerbaijan Tour Packages from India | Best Azerbaijan Trips – Wegomap',
    description: "Discover the beauty of Azerbaijan with Wegomap's affordable and customizable tour packages. Explore Baku, mountain landscapes, cultural heritage, Caspian Sea views, and unforgettable experiences. Trusted hotels, expert planning, and 24/7 support — book your dream Azerbaijan holiday today!",
    keywords: 'Azerbaijan tour packages',
    openGraph: {
        title: 'Azerbaijan Tour Packages',
        description: '3N 4D',
        images: ['https://www.wegomap.com/uploads/categories/twlgefqv2zwvq2gs99ix4ozzi3n9r41z9xbotxid250131024536.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/azerbaijan-tour-packages',
    },
};

export default function AzerbaijanLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
