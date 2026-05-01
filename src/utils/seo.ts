import { Metadata } from 'next';
import { API_URL } from '@/config';
import { parseSeoMeta } from './parseSeoMeta';

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
                // Parse any arbitrary seo_meta HTML tags (custom meta, link, scripts)
                const parsedMeta = page.seo_meta ? parseSeoMeta(page.seo_meta) : {};

                return {
                    title: page.seo_title || page.title || fallbackTitle,
                    description: page.seo_description || undefined,
                    keywords: page.seo_keys || globalKeywords,
                    alternates: page.seo_canonical
                        ? { canonical: page.seo_canonical }
                        : parsedMeta.alternates,
                    other: parsedMeta.other,
                    openGraph: parsedMeta.openGraph as any,
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
