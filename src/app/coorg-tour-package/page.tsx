import TourCategoryPage from '@/components/TourCategoryPage';

export default function CoorgPage() {
    return (
        <TourCategoryPage
            title="Coorg Tour Package"
            subtitle="2N Coorg"
            bannerImage="https://www.wegomap.com/uploads/categories/l4zbbjoyo4v19xzlzb4flec9ddgsenpvfhqgyzsg240906100043.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/l4zbbjoyo4v19xzlzb4flec9ddgsenpvfhqgyzsg240906100043.jpg',
                    duration: '2 Nights 3 Days',
                    title: 'Coorg Tour Package',
                    location: '2N Coorg',
                    price: '₹ 7,999',
                    originalPrice: '₹ 10,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'coorg-tour-package/tours/coorg-tour-package/',
                },
                {
                    image: 'uploads/categories/l4zbbjoyo4v19xzlzb4flec9ddgsenpvfhqgyzsg240906100043.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Coorg - Mysore',
                    location: '2N Coorg / 1N Mysore',
                    price: '₹ 10,999',
                    originalPrice: '₹ 14,000',
                    strip: 'TRENDING PACKAGE',
                    detailUrl: 'coorg-tour-package/tours/coorg-mysore/',
                },
            ]}
        />
    );
}
