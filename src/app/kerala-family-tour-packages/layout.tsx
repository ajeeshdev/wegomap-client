import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kerala Family Tour Packages',
    description: 'Book the best Kerala family tour packages with WEGOMAP. Safe, comfortable, and fun holidays for groups and families of all sizes.',
    keywords: 'Kerala family tour packages, family holiday Kerala, group tours Kerala, family vacation packages',
};

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
