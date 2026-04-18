import { Metadata } from 'next';
import { API_URL } from '@/config';

export async function generatePageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
    try {
        const res = await fetch(`${API_URL}/pages?slug=${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return { title: `${fallbackTitle} | WEGOMAP` };
        
        const json = await res.json();
        
        if (json.success && json.data) {
            const page = json.data.find((p: any) => p.slug === slug);
            if (page) {
                if (page.seo_title || page.seo_description || page.seo_keys) {
                    return {
                        title: page.seo_title || page.title || fallbackTitle,
                        description: page.seo_description || undefined,
                        keywords: page.seo_keys || undefined,
                        alternates: page.seo_canonical ? { canonical: page.seo_canonical } : undefined,
                    };
                }
                return {
                    title: `${page.title || fallbackTitle} | WEGOMAP`,
                };
            }
        }
    } catch (e) {
        console.error(`Error fetching SEO for ${slug}:`, e);
    }
    
    return {
        title: `${fallbackTitle} | WEGOMAP`,
    };
}
