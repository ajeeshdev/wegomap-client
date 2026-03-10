import TourCategoryPage from '@/components/TourCategoryPage';

export default function LehLadakhPage() {
    return (
        <TourCategoryPage
            title="Leh Ladakh Tour Package"
            subtitle="Leh Ladakh Holidays"
            bannerImage="https://www.wegomap.com/uploads/categories/d4rzq89o8xu3a9ejgnhkfes4r5lpqvsfgtldzmoi240904033509.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/d4rzq89o8xu3a9ejgnhkfes4r5lpqvsfgtldzmoi240904033509.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Leh Ladakh Tour Package',
                    location: '3N Leh / 2N Ladakh',
                    price: '₹ 27,999',
                    originalPrice: '₹ 34,000',
                    strip: 'TRENDING',
                    detailUrl: 'leh-ladakh-tour-package/tours/leh-ladakh-tour-package/',
                },
            ]}
        />
    );
}
