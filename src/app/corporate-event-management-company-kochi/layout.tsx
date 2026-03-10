import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Corporate Event Management Kochi, Kerala | Wegomap',
    description: 'Looking for top corporate event planners in Kochi? Wegomap offers complete event management solutions including conferences, product launches, and team building.',
    keywords: 'corporate event management Kochi, event planners Kerala, product launch Kochi, team building activities Kerala',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
