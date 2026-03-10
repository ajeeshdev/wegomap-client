import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Leh Ladakh Tour Package from Kerala | Best Price Adventure Trips – Wegomap',
    description: "Experience the land of high passes with Wegomap's Leh Ladakh tour packages. Explore monasteries, mountain lakes, and breathtaking valleys with verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Leh Ladakh tour package, Leh Ladakh packages from Kerala',
    openGraph: {
        title: 'Leh Ladakh Tour Package',
        description: 'Leh Ladakh Holidays',
        images: ['/uploads/categories/d4rzq89o8xu3a9ejgnhkfes4r5lpqvsfgtldzmoi240904033509.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/leh-ladakh-tour-package',
    },
};

export default function LehLadakhLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
