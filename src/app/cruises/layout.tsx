import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('cruises', 'Houseboats & Cruises');

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
