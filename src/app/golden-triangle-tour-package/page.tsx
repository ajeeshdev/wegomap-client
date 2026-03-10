import TourCategoryPage from '@/components/TourCategoryPage';

export default function GoldenTrianglePage() {
    return (
        <TourCategoryPage
            title="Golden Triangle Tour Package"
            subtitle="Golden Triangle"
            bannerImage="https://www.wegomap.com/uploads/categories/1cs3jcryqwyeiskhq76sy33is8ico6qqnulbrskv240905024238.jpg"
            bookCount={22}
            packages={[
                {
                    image: 'uploads/packages/aiwgy8tafcpau9dgatsmnlnk1yfvugillle8yzbh240905024128.png',
                    duration: '5 Nights 6 Days',
                    title: 'Golden Triangle Package',
                    location: '2N Delhi / 1N Agra / 2N Jaipur',
                    price: '₹ 23,999',
                    originalPrice: '₹ 25,950',
                    strip: 'Trending Package',
                    detailUrl: 'tours/golden-triangle-package/',
                },
            ]}
        />
    );
}
