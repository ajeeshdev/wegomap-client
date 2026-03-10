import TourCategoryPage from '@/components/TourCategoryPage';

export default function KashmirPage() {
    return (
        <TourCategoryPage
            title="Kashmir Holiday Package"
            subtitle="5N Srinagar"
            bannerImage="https://www.wegomap.com/uploads/categories/vsgopcdmooaxqkjltfnahzvl4vqe1fdioxawg2yt240829024046.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/vsgopcdmooaxqkjltfnahzvl4vqe1fdioxawg2yt240829024046.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Kashmir Holiday',
                    location: '4N SRINAGAR',
                    price: '₹ 22,999',
                    originalPrice: '₹ 28,000',
                    strip: 'BEST WINTER PLAN',
                    detailUrl: 'kashmir-holiday-package/tours/4n5d-kashmir-holiday-package/',
                },
                {
                    image: 'uploads/categories/vsgopcdmooaxqkjltfnahzvl4vqe1fdioxawg2yt240829024046.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Kashmir Holiday Package',
                    location: '5N Srinagar',
                    price: '₹ 27,999',
                    originalPrice: '₹ 34,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'kashmir-holiday-package/tours/kashmir-holiday-package/',
                },
            ]}
        />
    );
}
