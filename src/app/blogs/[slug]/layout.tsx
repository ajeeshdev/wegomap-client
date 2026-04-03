import type { Metadata } from 'next';
import { API_URL } from '@/config';
import { siteData } from '@/data/siteData';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    let blog: any = null;
    try {
        // Try to fetch from API first
        const res = await fetch(`${API_URL}/blogs/slug/${slug}`, { next: { revalidate: 3600 } });
        const data = await res.json();
        if (data.success && data.data) {
            blog = Array.isArray(data.data) ? data.data[0] : data.data;
        }
    } catch (err) {
        console.error('Metadata fetch error:', err);
    }

    // Fallback to siteData if not found in DB
    if (!blog) {
        blog = (siteData.blogs as any[]).find((b) => b.slug === slug);
    }

    if (blog) {
        const title = blog.seo_title || blog.title;
        const description = blog.seo_meta || blog.excerpt?.slice(0, 160) || 'Explore travel stories and tips from WEGOMAP.';

        return {
            title: `${title} | WEGOMAP Travel Blog`,
            description: description,
            openGraph: {
                title: title,
                description: description,
                images: blog.featuredImage || blog.image ? [blog.featuredImage || blog.image] : [],
            },
            alternates: {
                canonical: `https://www.wegomap.com/blogs/${slug}/`,
            },
        };
    }

    // Fallback metadata
    return {
        title: 'Travel Blog | WEGOMAP Tours & Events',
        description: 'Read travel stories and destination guides from WEGOMAP.',
        alternates: {
            canonical: `https://www.wegomap.com/blogs/${slug}/`,
        },
    };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
