import TourCategoryPage from '@/components/TourCategoryPage';

export default function CoorgMysoreOotyPage() {
    return (
        <TourCategoryPage
            title="Coorg / Mysore / Ooty"
            subtitle="2N Coorg /1N Mysore /2N Ooty"
            bannerImage="https://www.wegomap.com/uploads/categories/neqghtvqmhem7lqiiniilprz8hoskpvtcyb82xo1240905031746.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/neqghtvqmhem7lqiiniilprz8hoskpvtcyb82xo1240905031746.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Coorg Mysore Ooty Package',
                    location: '2N Coorg / 1N Mysore / 2N Ooty',
                    price: '₹ 16,999',
                    originalPrice: '₹ 21,000',
                    detailUrl: 'coorg-mysore-ooty/tours/coorg-mysore-ooty-package/',
                },
            ]}
        />
    );
}
