import type { Metadata } from 'next';
import { API_URL } from '@/config';
import BlogDetailView from '@/components/BlogDetailView';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    try {
        const res = await fetch(`${API_URL}/blogs/slug/${slug}`, { next: { revalidate: 3600 } });
        const data = await res.json();
        
        if (data.success && data.data) {
            const blog = Array.isArray(data.data) ? data.data[0] : data.data;
            return {
                title: blog.seo_title || `${blog.title} | WEGOMAP Blog`,
                description: blog.seo_meta || blog.excerpt || blog.content?.substring(0, 160),
                keywords: blog.seo_keys || 'travel, kerala, holiday, wegomap',
                alternates: {
                    canonical: blog.canonical || `https://www.wegomap.com/blogs/${slug}`,
                },
                openGraph: {
                    title: blog.seo_title || blog.title,
                    description: blog.seo_meta || blog.excerpt,
                    images: [blog.featuredImage || blog.image].filter(Boolean),
                }
            };
        }
    } catch (err) {
        console.error('Metadata fetch error:', err);
    }

    return {
        title: 'Travel Blog | WEGOMAP Tours & Events',
        description: 'Explore travel stories and destination guides from WEGOMAP.',
    };
}

export default async function BlogPage({ params }: PageProps) {
    const { slug } = await params;
    return <BlogDetailView slug={slug} />;
}
