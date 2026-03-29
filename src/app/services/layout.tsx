import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Travel Services | WEGOMAP',
    description: 'Explore the wide range of travel and event services offered by WEGOMAP in Kochi. From hotel bookings to visa assistance and corporate event management.',
    keywords: 'travel services, Kochi event management, hotel booking Kerala, taxi service Kochi, flight booking India',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
