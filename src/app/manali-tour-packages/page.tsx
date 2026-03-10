import TourCategoryPage from '@/components/TourCategoryPage';

export default function ManaliPage() {
    return (
        <TourCategoryPage
            title="Manali Tour Packages"
            subtitle="Explore with us"
            bannerImage="https://www.wegomap.com/uploads/categories/ofsorzqr2izti1rwgjqjaxxp4iws07ct9heovkwj220406065835.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/ofsorzqr2izti1rwgjqjaxxp4iws07ct9heovkwj220406065835.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Manali Package',
                    location: '4N Manali',
                    price: '₹ 18,999',
                    originalPrice: '₹ 22,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'manali-tour-packages/tours/manali-package/',
                },
                {
                    image: 'uploads/categories/ofsorzqr2izti1rwgjqjaxxp4iws07ct9heovkwj220406065835.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Shimla Manali Package',
                    location: '3N Manali / 2N Shimla',
                    price: '₹ 22,999',
                    originalPrice: '₹ 28,000',
                    strip: 'BEST WINTER PLAN',
                    detailUrl: 'manali-tour-packages/tours/5n6d-manali-package/',
                },
            ]}
        />
    );
}
