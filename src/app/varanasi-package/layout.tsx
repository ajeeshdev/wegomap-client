import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Varanasi Tour Package from Kerala | Best Varanasi Holiday – Wegomap',
    description: "Experience the spiritual capital of India with Wegomap's Varanasi tour packages. Explore the ghats, temples, and sacred Ganges with verified hotels, best prices, and 24/7 customer support.",
    keywords: 'Varanasi tour package, Varanasi packages from Kerala',
    openGraph: {
        title: 'Varanasi Package',
        description: 'Varanasi Holiday Package',
        images: ['/uploads/categories/5QFjERrKbfZ74TopsTis4EdOnNVTyfs6B5yRQBwc240904040753.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/varanasi-package',
    },
};

export default function VaranasiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
