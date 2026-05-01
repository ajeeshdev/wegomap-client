import SEOMetaInjector from '@/components/SEOMetaInjector';
import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('hotels', 'Hotels & Resorts');

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
    return <><SEOMetaInjector slug="hotels" />{children}</>;
}
