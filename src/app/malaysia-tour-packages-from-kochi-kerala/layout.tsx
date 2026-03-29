import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Malaysia Tour Packages from Kochi Kerala | Affordable Malaysia Holiday – WEGOMAP',
    description: "Affordable Malaysia Tour Packages from Kerala - WEGOMAP offer vibrant cities, stunning islands, and rich culture. Enjoy comfortable stays, great deals, and memorable travel moments.",
    keywords: 'malaysia tour packages, malaysia tour packages from kochi, malaysia tour packages from kerala',
    openGraph: {
        title: 'Malaysia Tour Packages',
        description: 'Malaysia Tour Package',
        images: ['/uploads/categories/7Er9MHHpU4tIDnHWJm9rmvpELUno6GQ2zdd7pozR240821040000.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/malaysia-tour-packages-from-kochi-kerala',
    },
};

export default function MalaysiaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
