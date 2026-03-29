import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trending Destinations',
    description: 'Check out the most trending travel destinations for your next holiday. From Bali to Vietnam, find the best deals on popular tours with WEGOMAP.',
    keywords: 'trending travel, Bali tour, Vietnam tour, popular destinations, holiday trends',
};

export default function TrendingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
