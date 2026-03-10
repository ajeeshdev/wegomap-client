import TourCategoryPage from '@/components/TourCategoryPage';

export default function MalaysiaPage() {
    return (
        <TourCategoryPage
            title="Malaysia Tour Packages"
            subtitle="Malaysia Tour Package"
            bannerImage="https://www.wegomap.com/uploads/categories/7Er9MHHpU4tIDnHWJm9rmvpELUno6GQ2zdd7pozR240821040000.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/7Er9MHHpU4tIDnHWJm9rmvpELUno6GQ2zdd7pozR240821040000.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Malaysia Tour Package',
                    location: '3N Malaysia',
                    price: '₹ 35,999',
                    originalPrice: '₹ 42,000',
                    strip: 'TRENDING',
                    detailUrl: 'malaysia-tour-packages-from-kochi-kerala/tours/malaysia-tour-package/',
                },
                {
                    image: 'uploads/categories/7Er9MHHpU4tIDnHWJm9rmvpELUno6GQ2zdd7pozR240821040000.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Malaysia with Penang',
                    location: '3N Kuala Lampur / 2N Penang',
                    price: '₹ 49,999',
                    originalPrice: '₹ 58,000',
                    strip: 'TRENDING',
                    detailUrl: 'malaysia-tour-packages-from-kochi-kerala/tours/malaysia-with-penang/',
                },
            ]}
        />
    );
}
