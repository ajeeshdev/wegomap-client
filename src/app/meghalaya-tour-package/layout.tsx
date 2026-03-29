import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meghalaya Tour Package from Kerala | Best Meghalaya Trip – WEGOMAP',
    description: "Explore the beauty of Meghalaya with WEGOMAP's affordable tour packages from Kerala. Enjoy waterfalls, living root bridges, caves, and scenic hills with trusted hotels, expert planning, and 24/7 customer support. Book your custom Meghalaya trip today.",
    keywords: 'Meghalaya tour package',
    openGraph: {
        title: 'Meghalaya Tour Package',
        description: 'Meghalaya Tour Package',
        images: ['/uploads/categories/r34Bg3glSVPv3yNqrsdDu6ZdJpx9fBTtZnXmbXI4240904044934.jpg'],
    },
    alternates: {
        canonical: 'https://www.wegomap.com/meghalaya-tour-package',
    },
};

export default function MeghalayaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
