import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('about', 'About Us');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
