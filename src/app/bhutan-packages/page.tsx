import TourCategoryPage from '@/components/TourCategoryPage';

export default function BhutanPage() {
    return (
        <TourCategoryPage
            title="Bhutan Package"
            subtitle="6N 7D Bhutan"
            bannerImage="https://www.wegomap.com/uploads/categories/5z2forothrchrzckhauy3hq8zxsxchlbx2rncnzx240904035922.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/5z2forothrchrzckhauy3hq8zxsxchlbx2rncnzx240904035922.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Bhutan Package',
                    location: '2N PHUENTSHOLING / 1N THIMPHU / 1N PUNAKHA / 2N PARO',
                    price: '₹ 35,999',
                    originalPrice: '₹ 44,000',
                    strip: 'BEST SELLER',
                    detailUrl: 'bhutan-packages/tours/special-6n7d-bhutan-package/',
                },
            ]}
        />
    );
}
