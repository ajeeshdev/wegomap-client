import TourCategoryPage from '@/components/TourCategoryPage';

export default function AndamanPage() {
    return (
        <TourCategoryPage
            title="Andaman Packages"
            subtitle="Andaman Holidays"
            bannerImage="https://www.wegomap.com/uploads/categories/x8mupizywhx0lbujzpvsk6qrznf18bixirysodea240904050124.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/x8mupizywhx0lbujzpvsk6qrznf18bixirysodea240904050124.jpg',
                    duration: '4 Nights 5 Days',
                    title: '4N5D Andaman Tour Packages',
                    location: 'Stunning Andaman',
                    price: '₹ 19,999',
                    originalPrice: '₹ 25,000',
                    detailUrl: 'andaman-packages/tours/4n5d-andaman-tour-packages/',
                },
                {
                    image: 'uploads/categories/x8mupizywhx0lbujzpvsk6qrznf18bixirysodea240904050124.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Andaman Packages',
                    location: '6N Andaman',
                    price: '₹ 28,999',
                    originalPrice: '₹ 35,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'andaman-packages/tours/andaman-packages/',
                },
            ]}
        />
    );
}
