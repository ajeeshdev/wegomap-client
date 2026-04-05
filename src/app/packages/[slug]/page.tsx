import type { Metadata } from 'next';
import { API_URL } from '@/config';
import { categoryData } from '@/data/categoryData';
import { categoryMappings } from '@/data/categoryMappings';
import { packagesData } from '@/data/packages';
import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';
import TourDetailView from '@/components/TourDetail/TourDetailView';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    // Check if it's a category
    if (categoryData[slug]) {
        const data = categoryData[slug];
        return {
            title: data.seoTitle || data.title,
            description: data.seoMeta || data.subtitle,
            keywords: data.seoKeys,
        };
    }
    
    // Check API for Package data
    try {
        const res = await fetch(`${API_URL}/packages/slug/${slug}`, { next: { revalidate: 3600 } });
        const json = await res.json();
        const p = json.data;
        
        if (json.success && p) {
            return {
                title: p.seo_title || `${p.title} | WEGOMAP`,
                description: p.seo_meta || p.description?.substring(0, 160),
                keywords: p.seo_keys || 'kerala, travel, package, holiday',
                openGraph: {
                    title: p.seo_title || p.title,
                    description: p.seo_meta || p.description,
                    images: [p.image].filter(Boolean),
                }
            };
        }

        // Secondary fallback: Match by Title if slug fails (Legacy Redirect Support)
        if (packagesData[slug]) {
            const staticTitle = packagesData[slug].title;
            const searchRes = await fetch(`${API_URL}/packages`);
            const searchJson = await searchRes.json();
            if (searchJson.success && searchJson.data) {
                const matchedPkg = searchJson.data.find((p: any) => p.title.trim().toLowerCase() === staticTitle.trim().toLowerCase());
                if (matchedPkg) {
                    const p = matchedPkg;
                    return {
                        title: p.seo_title || `${p.title} | WEGOMAP`,
                        description: p.seo_meta || p.description?.substring(0, 160),
                        keywords: p.seo_keys || 'kerala, travel, package, holiday',
                        openGraph: {
                            title: p.seo_title || p.title,
                            description: p.seo_meta || p.description,
                            images: [p.image].filter(Boolean),
                        }
                    };
                }
            }
        }
    } catch (e) {
        console.error("Meta fetch error:", e);
    }

    // Fallback: Check if it's a static package
    if ((packagesData as any)[slug]) {
        const pkg = (packagesData as any)[slug];
        return {
            title: `${pkg.title} | WEGOMAP`,
            description: pkg.description?.substring(0, 160),
        };
    }

    return {
        title: 'Tour Packages | WEGOMAP',
    };
}

export default async function DynamicPackagePage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Is it a category?
    if (categoryMappings[slug]) {
        const data = categoryData[slug] || {};
        const packageSlugs = categoryMappings[slug] || [];

        const packages: TourPackage[] = packageSlugs.map(pSlug => {
            const pkg = (packagesData as any)[pSlug];
            if (!pkg) return null;
            return {
                image: pkg.image,
                duration: pkg.duration || pkg.location,
                title: pkg.title,
                location: pkg.location,
                price: pkg.price,
                originalPrice: pkg.oldPrice,
                detailUrl: `/packages/${pSlug}`
            };
        }).filter((p): p is TourPackage => p !== null);

        return (
            <TourCategoryPage
                title={data.title || "Tours"}
                subtitle={data.subtitle || ""}
                bannerImage={data.bannerImage || "/uploads/categories/default.jpg"}
                packages={packages}
                readMoreHeading={data.contentTitle || ""}
                readMoreContent={data.contentDesc}
            />
        );
    }

    // 2. Otherwise assume it's a tour detail
    return <TourDetailView id={slug} />;
}
