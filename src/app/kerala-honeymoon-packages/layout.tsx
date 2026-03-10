import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kerala Honeymoon Packages',
    description: 'Find the best Kerala honeymoon packages at affordable prices. Enjoy a romantic getaway in Munnar, Alleppey, and more with our custom tour plans.',
    keywords: 'Kerala honeymoon packages, Munnar honeymoon, Alleppey houseboat honeymoon, romantic Kerala trips',
};

export default function HoneymoonLayout({ children }: { children: React.ReactNode }) {
    return children;
}
