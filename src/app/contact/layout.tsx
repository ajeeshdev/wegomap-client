import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('contact', 'Contact Us');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
