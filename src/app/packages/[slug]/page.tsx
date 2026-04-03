import type { Metadata } from 'next';
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
    
    // Check if it's a package
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
