

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Kerala Tour Packages Under 10000 | Kerala Holiday Packages',
    description: 'Explore handpicked Kerala tour packages with Wegomap. Experience expert planning, great value, and unforgettable journeys across God\'s Own Country.',
    keywords: 'best kerala tour packages, kerala tour packages under 10000, kerala holiday packages',
    openGraph: {
        title: 'Kerala Tour Packages',
        description: "Explore god's own country with us",
        images: ['https://www.wegomap.com/uploads/categories/mkofb4my0uzjne7xzy1gnoaxbdwiovxvoot9eklr220410092321.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/kerala-tour-packages/',
    },
};

export default function KeralaPackagesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
