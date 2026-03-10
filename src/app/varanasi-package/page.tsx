import TourCategoryPage from '@/components/TourCategoryPage';

export default function VaranasiPage() {
    return (
        <TourCategoryPage
            title="Varanasi Package"
            subtitle="Varanasi Holiday Package"
            bannerImage="https://www.wegomap.com/uploads/categories/5QFjERrKbfZ74TopsTis4EdOnNVTyfs6B5yRQBwc240904040753.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/5QFjERrKbfZ74TopsTis4EdOnNVTyfs6B5yRQBwc240904040753.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Varanasi Package',
                    location: '2N Varanasi / 1N Ayodya',
                    price: '₹ 14,999',
                    originalPrice: '₹ 18,500',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'varanasi-package/tours/varanasi-package/',
                },
            ]}
        />
    );
}
