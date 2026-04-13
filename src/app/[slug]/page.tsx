import type { Metadata } from 'next';
import { API_URL, getImageUrl } from '@/config';
import { categoryData } from '@/data/categoryData';
import { categoryMappings } from '@/data/categoryMappings';
import { packagesData } from '@/data/packages';
import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';
import LandingPageWrapper from './LandingPageWrapper';
import { redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    // 1. Check if it's a Category
    const staticMeta = categoryData[slug];
    if (staticMeta) {
        return {
            title: staticMeta.seoTitle || staticMeta.title,
            description: staticMeta.seoMeta || staticMeta.subtitle,
            keywords: staticMeta.seoKeys,
        };
    }

    try {
        const catRes = await fetch(`${API_URL}/categories/slug/${slug}`, { next: { revalidate: 60 } });
        const catJson = await catRes.json();
        if (catJson.success && catJson.data) {
            const cat = catJson.data;
            return {
                title: cat.seoTitle || cat.title || `${cat.name} | WEGOMAP`,
                description: cat.seoMeta || cat.description?.substring(0, 160),
            };
        }

        // 2. Check if it's a Landing Page
        const pageRes = await fetch(`${API_URL}/pages?slug=${slug}`);
        const pageJson = await pageRes.json();
        if (pageJson.success && pageJson.data) {
            const page = pageJson.data.find((p: any) => p.slug === slug && p.isCampaign);
            if (page) {
                return {
                    title: page.title,
                    description: page.description?.substring(0, 160),
                };
            }
        }
    } catch (e) {
        console.error("Meta fetch error at root [slug]:", e);
    }

    return {
        title: 'WEGOMAP | Trusted Travel Partner',
    };
}

export default async function RootSlugPage({ params }: PageProps) {
    const { slug } = await params;

    if (slug === 'cruise-packages') {
        redirect('/cruises');
    }

    if (slug === 'kerala-taxi-service') {
        redirect('/cabs');
    }

    let dynamicCategory = null;
    let isCategory = false;

    // 1. Check if it's a Category (API first)
    try {
        const catRes = await fetch(`${API_URL}/categories/slug/${slug}`, { next: { revalidate: 60 } });
        const catJson = await catRes.json();
        if (catJson.success && catJson.data) {
            dynamicCategory = catJson.data;
            isCategory = true;
        }
    } catch (e) {}

    const staticData = categoryData[slug] || {};
    const isStaticCategory = !!categoryData[slug];

    if (isCategory || isStaticCategory) {
        let dynamicPackages: TourPackage[] = [];
        try {
            const pkgRes = await fetch(`${API_URL}/packages`, { next: { revalidate: 60 } });
            const pkgJson = await pkgRes.json();
            if (pkgJson.success && pkgJson.data) {
                const catTitle = (dynamicCategory?.title || staticData.title)?.toLowerCase();
                const catName = dynamicCategory?.name?.toLowerCase();
                const catSlug = (dynamicCategory?.slug || slug).toLowerCase();
                const assignedPackageIds = dynamicCategory?.packages || [];

                const filtered = pkgJson.data.filter((pkg: any) => {
                    // 1. If packages are explicitly assigned to the category in CMS
                    if (assignedPackageIds.length > 0) {
                        return assignedPackageIds.includes(pkg._id);
                    }

                    // 2. Fallback to automatic matching (robust)
                    const pCat = pkg.category?.toLowerCase() || '';
                    const pCats = (Array.isArray(pkg.categories) ? pkg.categories : [])
                                    .map((c: string) => c.toLowerCase());
                    
                    const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ').trim();
                    const nCatSlug = normalize(catSlug);
                    const nCatTitle = catTitle ? normalize(catTitle) : '';
                    const nCatName = dynamicCategory?.name ? normalize(dynamicCategory.name) : '';

                    const matches = (target: string) => {
                        const nTarget = normalize(target);
                        return nTarget === nCatSlug || nTarget === nCatTitle || nTarget === nCatName;
                    };

                    const slugMatches = matches(pCat) || pCats.some((c: string) => matches(c));
                    return slugMatches;
                });

                dynamicPackages = filtered.map((pkg: any) => ({
                    _id: pkg._id,
                    slug: pkg.slug,
                    image: getImageUrl(pkg.thumb || (pkg.images && pkg.images[0]) || pkg.image || '/bg-placeholder.jpg'),
                    duration: pkg.duration,
                    title: pkg.title,
                    location: pkg.location,
                    price: pkg.price ? `₹${pkg.price.toLocaleString()}` : 'N/A',
                    originalPrice: pkg.oldamt ? `₹${Number(pkg.oldamt).toLocaleString()}` : null,
                    detailUrl: `/packages/${pkg.slug || pkg._id}`,
                    // Pass through additional fields for PackageCard
                    highlights: pkg.highlights || [],
                    subtitle: pkg.subtitle || '',
                    itinerary: pkg.itinerary || [],
                    averageRating: pkg.averageRating,
                    reviewCount: pkg.reviewCount,
                    noCostEmi: pkg.noCostEmi,
                    totalPrice: pkg.totalPrice,
                    per: pkg.per,
                    onoffer: pkg.onoffer,
                    slabel: pkg.slabel,
                    order: pkg.order
                }));
            }
        } catch (e) {}


        const combinedPackages = [...dynamicPackages].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

        return (
            <TourCategoryPage
                title={dynamicCategory?.title || staticData.title || "Tours"}
                subtitle={dynamicCategory?.subtitle || staticData.subtitle || ""}
                bannerImage={dynamicCategory?.bannerImage || staticData.bannerImage || "/uploads/categories/default.jpg"}
                packages={combinedPackages}
                readMoreHeading={dynamicCategory?.contentTitle || staticData.contentTitle || ""}
                readMoreContent={dynamicCategory?.contentDesc || staticData.contentDesc}
                description={dynamicCategory?.description || staticData.description}
            />
        );
    }

    // 2. Check if it's a Landing Page (Campaign)
    try {
        const pageRes = await fetch(`${API_URL}/pages?slug=${slug}`);
        const pageJson = await pageRes.json();
        if (pageJson.success && pageJson.data) {
            const page = pageJson.data.find((p: any) => p.slug === slug && p.isCampaign);
            if (page) {
                return <LandingPageWrapper data={page} />;
            }
        }
    } catch (e) {}

    // 3. Fallback: Check if it's a blog or package for redirect
    try {
        const blogRes = await fetch(`${API_URL}/blogs/slug/${slug}`);
        const blogJson = await blogRes.json();
        if (blogJson.success && blogJson.data) {
             redirect(`/blogs/${slug}`);
        }

        const pkgRes = await fetch(`${API_URL}/packages/slug/${slug}`);
        const pkgJson = await pkgRes.json();
        if (pkgJson.success && pkgJson.data) {
             redirect(`/packages/${slug}`);
        }
    } catch (e) {}

    // 404 roughly
    redirect('/');
}
