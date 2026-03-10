import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/zzgxrdjxnq0idmh5x2eypanfj6cpoqfz5dz1jntu220406041956.jpg',
        duration: '3N4D Bali',
        title: 'Bali Budget Tour Plan',
        location: 'Indonesia',
        price: '₹ 16,999',
        originalPrice: '₹ 19,000',
        detailUrl: 'bali-tour-packages-from-kochi-kerala/',
        strip: 'Best Seller'
    },
    {
        image: '/uploads/packages/zzgxrdjxnq0idmh5x2eypanfj6cpoqfz5dz1jntu220406041956.jpg',
        duration: '4N5D Vietnam',
        title: 'Vietnam Tour Package',
        location: 'Vietnam',
        price: '₹ 44,499',
        originalPrice: '₹ 48,000',
        detailUrl: 'vietnam-package/',
        strip: 'Most Booked'
    },
    {
        image: '/uploads/packages/zxlqmhgq71iv3xvevzebzywogiwwt6uv7zm2mgos220406082237.jpg',
        duration: '3N4D Thailand',
        title: 'Amazing Thailand',
        location: 'Thailand',
        price: '₹ 24,400',
        originalPrice: '₹ 28,000',
        detailUrl: 'thailand-tour-packages-from-kochi-kerala/'
    },
    {
        image: '/uploads/packages/tq8vaehurvgrtwpipapx8i5mro0yy5ctudzkakxl240905095614.jpg',
        duration: '4N5D Dubai',
        title: 'Dubai Tour Package',
        location: 'UAE',
        price: '₹ 41,600',
        originalPrice: '₹ 56,600',
        detailUrl: 'dubai-tour-packages/'
    }
];

export default function TrendingTours() {
    return (
        <TourCategoryPage
            title="Trending Destinations"
            subtitle="Explore the most sought-after holiday spots"
            bannerImage="/uploads/categories/RGxMvYvzCLbM6yh3pdugbvHbBKzFH2R2lBzRjA2d260225042331.jpg"
            packages={packages}
            readMoreHeading="What's Hot in Travel?"
            readMoreContent={
                <>
                    <p>Stay updated with our list of trending destinations. These are the places currently capturing the hearts of travelers worldwide. Whether it's the cultural richness of Bali or the stunning landscapes of Vietnam, we have the best deals for you.</p>
                    <p>Wegomap ensures you are always in sync with the latest travel trends, providing high-quality experiences at unbeatable prices. Book your trending trip today!</p>
                </>
            }
        />
    );
}
