import { Metadata } from 'next';
import { API_URL } from '@/config';

export async function generatePageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
    try {
        const [pageRes, optsRes] = await Promise.all([
            fetch(`${API_URL}/pages?slug=${slug}`, { next: { revalidate: 60 } }),
            fetch(`${API_URL}/options`, { next: { revalidate: 60 } })
        ]);
        
        let globalKeywords = undefined;
        if (optsRes.ok) {
            const optsJson = await optsRes.json();
            if (optsJson.success && optsJson.data) {
                const keysOpt = optsJson.data.find((o: any) => o.key === 'site_keywords');
                if (keysOpt?.value) globalKeywords = keysOpt.value;
            }
        }

        if (!pageRes.ok) return { title: `${fallbackTitle} | WEGOMAP`, keywords: globalKeywords };
        
        const json = await pageRes.json();
        
        if (json.success && json.data) {
            const page = json.data.find((p: any) => p.slug === slug);
            if (page) {
                if (page.seo_title || page.seo_description || page.seo_keys) {
                    return {
                        title: page.seo_title || page.title || fallbackTitle,
                        description: page.seo_description || undefined,
                        keywords: page.seo_keys || globalKeywords,
                        alternates: page.seo_canonical ? { canonical: page.seo_canonical } : undefined,
                    };
                }
                return {
                    title: `${page.title || fallbackTitle} | WEGOMAP`,
                    keywords: globalKeywords,
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
