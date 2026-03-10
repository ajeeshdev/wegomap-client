import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kerala Tour Packages from Bangalore',
    description: 'Explore Kerala with our affordable tour packages from Bangalore. Custom itineraries for Wayanad, Munnar, and more with easy travel options.',
    keywords: 'Kerala tour packages from Bangalore, Bangalore to Wayanad, Bangalore to Munnar, weekend trips from Bangalore',
};

export default function BangaloreLayout({ children }: { children: React.ReactNode }) {
    return children;
}
