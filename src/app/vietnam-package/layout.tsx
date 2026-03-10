import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vietnam Tour Package from Kerala | Best Vietnam Trips – Wegomap',
    description: 'Plan your Vietnam holiday with Wegomap, a trusted Kerala tour operator. Explore Hanoi, Halong Bay, Da Nang, and Ho Chi Minh City with affordable Vietnam tour packages, handpicked hotels, expert guidance, and 24/7 customer support. Book your customized Vietnam trip from Kerala today.',
    keywords: 'Vietnam tour package',
    openGraph: {
        title: 'Vietnam Package',
        description: 'Vietnam',
        images: ['/uploads/categories/6f5f3mvihdthwolvbykh1fxl0nbavck38y47ubvs250605123703.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/vietnam-package',
    },
};

export default function VietnamLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
