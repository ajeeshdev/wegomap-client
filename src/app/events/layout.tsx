import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Corporate Event Management & Special Events Kochi | Wegomap',
    description: 'Premier event management in Kochi, Kerala. From corporate conferences and product launches to cultural special events, Wegomap handles every detail with excellence.',
    keywords: 'corporate event management Kochi, event planners Kerala, special events Kochi, product launch Kochi, team building activities Kerala, cultural festivals Kerala',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
