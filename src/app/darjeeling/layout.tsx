import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Darjeeling Tour Package from Kerala | Best Darjeeling Trip – Wegomap',
    description: "Book your Darjeeling tour package with Wegomap, a trusted Kochi-based tour operator. Enjoy scenic tea gardens, verified hotels, best prices, safe travel services, and 24/7 customer support with custom packages to suit your budget.",
    keywords: 'Darjeeling tour package',
    openGraph: {
        title: 'Darjeeling Tour Package',
        description: 'DARJEELING',
        images: ['/uploads/categories/2z1agsq6wrwibgatjiamea7pftxta7cgalenltcc240904030146.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/darjeeling',
    },
};

export default function DarjeelingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
