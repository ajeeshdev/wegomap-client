import type { Metadata } from 'next';
import { siteData } from '@/data/siteData';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Try to find in siteData
    const blog = (siteData.blogs as any[]).find((b) => b.slug === slug);

    if (blog) {
        return {
            title: `${blog.title} | Wegomap Travel Blog`,
            description: blog.excerpt?.slice(0, 160) || 'Explore travel stories and tips from Wegomap.',
            openGraph: {
                title: blog.title,
                description: blog.excerpt?.slice(0, 160),
                images: blog.image ? [blog.image] : [],
            },
            alternates: {
                canonical: `https://www.wegomap.com/blogs/${slug}/`,
            },
        };
    }

    // Fallback metadata
    return {
        title: 'Travel Blog | Wegomap Tours & Events',
        description: 'Read travel stories and destination guides from Wegomap.',
        alternates: {
            canonical: `https://www.wegomap.com/blogs/${slug}/`,
        },
    };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
