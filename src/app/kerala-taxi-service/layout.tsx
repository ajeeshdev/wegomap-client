import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kerala Taxi Service | Kerala Taxi Packages | WEGOMAP',
    description: 'Looking for a reliable Kerala taxi service? WEGOMAP Tours offers affordable taxi packages for sightseeing, airport transfers, and outstation trips in Kerala.',
    keywords: 'kerala taxi service, kerala taxi packages',
    alternates: {
        canonical: 'https://www.wegomap.com/kerala-taxi-service/',
    },
};

export default function TaxiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
