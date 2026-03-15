import type { Metadata } from 'next';
import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';
import { categoryMappings } from '@/data/categoryMappings';
import { packagesData } from '@/data/packages';
import { categoryData } from '@/data/categoryData';

const categorySlug = 'kerala-tour-packages';
const data = categoryData[categorySlug] || {};

export const metadata: Metadata = {
  title: data.seoTitle || data.title,
  description: data.seoMeta || data.subtitle,
  keywords: data.seoKeys,
};

const packageSlugs = categoryMappings[categorySlug] || [];

const packages: TourPackage[] = packageSlugs.map(slug => {
    const pkg = (packagesData as any)[slug];
    if (!pkg) return null;
    return {
        image: pkg.image,
        duration: pkg.duration || pkg.location,
        title: pkg.title,
        location: pkg.location,
        price: pkg.price,
        originalPrice: pkg.oldPrice,
        detailUrl: `/packages/${slug}`
    };
}).filter((p): p is TourPackage => p !== null);

export default function Page() {
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
