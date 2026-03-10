import TourCategoryPage from '@/components/TourCategoryPage';

export default function OotyPage() {
    return (
        <TourCategoryPage
            title="Ooty Tour Packages"
            subtitle="2 Nights Ooty"
            bannerImage="https://www.wegomap.com/uploads/categories/xivejtmsap5g34sse6prhfkyykvxzhw9lanygtbt240905034008.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/xivejtmsap5g34sse6prhfkyykvxzhw9lanygtbt240905034008.jpg',
                    duration: '2 Nights 3 Days',
                    title: 'Ooty Tour Packages',
                    location: '2N Ooty',
                    price: '₹ 8,999',
                    originalPrice: '₹ 11,000',
                    strip: 'TRENDING PACKAGES',
                    detailUrl: 'ooty-tour-packages/tours/ooty-tour-packages/',
                },
            ]}
        />
    );
}
