import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kerala Houseboat Service | Alleppey Backwaters | Wegomap',
    description: 'Book your Alleppey houseboat cruise with Wegomap. Deluxe, Premium & Luxury houseboats at the best rates — direct from owners.',
    alternates: {
        canonical: 'https://www.wegomap.com/kerala-alleppey-boat-house/',
    },
};

export default function HouseboatLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
