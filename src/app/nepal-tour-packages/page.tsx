import TourCategoryPage from '@/components/TourCategoryPage';

export default function NepalPage() {
    return (
        <TourCategoryPage
            title="Nepal Tour Packages"
            subtitle="Explore with us"
            bannerImage="https://www.wegomap.com/uploads/categories/zuq5qozfb1bxlyyr84azxkajfabeigl2udrfhhxa220406065441.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/zuq5qozfb1bxlyyr84azxkajfabeigl2udrfhhxa220406065441.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Nepal Tour Package',
                    location: '1N Kathmandu / 2N Pokhara / 1N Kathmandu',
                    price: '₹ 22,999',
                    originalPrice: '₹ 28,000',
                    detailUrl: 'nepal-tour-packages/tours/4n5d-nepal-tour-package/',
                },
            ]}
        />
    );
}
