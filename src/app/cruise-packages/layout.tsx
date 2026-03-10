import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Luxury Cruise Packages',
    description: 'Book luxury cruise packages with Wegomap. Explore Singapore, Dubai, and Europe on the finest sea voyages with Royal Caribbean and more.',
    keywords: 'cruise packages, luxury cruise, Singapore cruise, Royal Caribbean India, sea holiday',
};

export default function CruiseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
