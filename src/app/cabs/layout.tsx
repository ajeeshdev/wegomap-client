import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = () => generatePageMetadata('cabs', 'Taxi & Cab Services');

export default function CabsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
