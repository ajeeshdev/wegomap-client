
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Singapore Tour Package | Best Deals on Singapore Trips | Wegomap',
    description: 'Wegomap is a Kochi-based tour operator in Kerala offering top-quality travel services at the best prices. Enjoy safe holidays with trusted hotel partners, 24/7 customer support, and custom tour packages tailored to your needs and budget.',
    keywords: 'Singapore tour package, Kochi travel agency',
    openGraph: {
        title: 'Singapore Tour Package',
        description: 'Singapore Tour Package',
        images: ['/uploads/categories/KENL2OFT3a7kTbcVoTO8SQYucDDNMiWvx6DeaIEk240827110728.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/singapore-tour-package',
    },
};

export default function SingaporeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
