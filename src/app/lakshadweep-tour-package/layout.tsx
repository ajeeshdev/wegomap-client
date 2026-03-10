
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lakshadweep Tour Package | Pristine Island Holidays from Kerala | Wegomap',
    description: 'Explore crystal-clear waters and untouched islands with Wegomap\'s Lakshadweep tour packages. As a trusted Kochi-based Kerala tour operator, we offer personalized island holidays with best prices, reliable services, and expert planning for a seamless travel experience.',
    keywords: 'Lakshadweep tour package',
    openGraph: {
        title: 'Lakshadweep Tour Package',
        description: '3N Agatti island',
        images: ['/uploads/categories/vjy7xslqm4mc1yqd6utmyochqman4xalxjfiyzoa240820042745.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/lakshadweep-tour-package',
    },
};

export default function LakshadweepLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
