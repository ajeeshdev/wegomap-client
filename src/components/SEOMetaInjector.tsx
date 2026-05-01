import { API_URL } from '@/config';
import parse from 'html-react-parser';

export default async function SEOMetaInjector({ slug }: { slug: string }) {
    try {
        const res = await fetch(`${API_URL}/pages?slug=${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const json = await res.json();
        if (json.success && json.data) {
            const page = json.data.find((p: any) => p.slug === slug);
            if (page && page.seo_meta) {
                return <>{parse(page.seo_meta)}</>;
            }
        }
    } catch (e) {
        // Silent catch
    }
    return null;
}
