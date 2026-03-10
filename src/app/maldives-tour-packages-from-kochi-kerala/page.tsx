import TourCategoryPage from '@/components/TourCategoryPage';

export default function MaldivesPage() {
    return (
        <TourCategoryPage
            title="Maldives Tour Packages"
            subtitle="Explore with us"
            bannerImage="https://www.wegomap.com/uploads/categories/nyuzwvgb639wz6mbjratshvfzdtm9tgxbpivpjqs220406065555.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/nyuzwvgb639wz6mbjratshvfzdtm9tgxbpivpjqs220406065555.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Maldives Tour Package',
                    location: '3Night Maldives',
                    price: '₹ 55,999',
                    originalPrice: '₹ 65,000',
                    strip: 'BEST SUMMER PLAN',
                    detailUrl: 'maldives-tour-packages-from-kochi-kerala/tours/malaysia-3-nights-4-days/',
                },
                {
                    image: 'uploads/categories/nyuzwvgb639wz6mbjratshvfzdtm9tgxbpivpjqs220406065555.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Maldives Tour Package',
                    location: '4N Maldives',
                    price: '₹ 68,999',
                    originalPrice: '₹ 80,000',
                    strip: 'TRENDING PACKAGES',
                    detailUrl: 'maldives-tour-packages-from-kochi-kerala/tours/maldives-tour-package/',
                },
            ]}
        />
    );
}
