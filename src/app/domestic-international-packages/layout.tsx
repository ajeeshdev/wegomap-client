import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Domestic & International Packages',
    description: 'Explore the best domestic and international tour packages from Wegomap. Custom tours for Manali, Goa, Dubai, Bali, and more at affordable prices.',
    keywords: 'Manali tour package, Goa tour package, Dubai tour package, Bali tour package, international holiday packages',
};

export default function DomesticIntlLayout({ children }: { children: React.ReactNode }) {
    return children;
}
