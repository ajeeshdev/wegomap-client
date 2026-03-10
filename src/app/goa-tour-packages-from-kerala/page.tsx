import TourCategoryPage from '@/components/TourCategoryPage';

export default function GoaPage() {
    return (
        <TourCategoryPage
            title="Goa Tour Packages"
            subtitle="Explore with us"
            bannerImage="https://www.wegomap.com/uploads/categories/86wg9d29vhkflmuwtyrsof3rfqtcapzgva0ynqlp220406065630.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/86wg9d29vhkflmuwtyrsof3rfqtcapzgva0ynqlp220406065630.jpg',
                    duration: '2 Nights 3 Days',
                    title: 'Goa Tour Package',
                    location: '1N South Goa / 1N North Goa',
                    price: '₹ 9,999',
                    originalPrice: '₹ 12,500',
                    strip: 'BEST SUMMER PLAN',
                    detailUrl: 'goa-tour-packages-from-kerala/tours/goa-package-3-days-2-night/',
                },
                {
                    image: 'uploads/categories/86wg9d29vhkflmuwtyrsof3rfqtcapzgva0ynqlp220406065630.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Goa Tour Package',
                    location: '1N South Goa / 2N North Goa',
                    price: '₹ 12,999',
                    originalPrice: '₹ 16,000',
                    strip: 'BEST SELLER',
                    detailUrl: 'goa-tour-packages-from-kerala/tours/goa-tour-package-1/',
                },
                {
                    image: 'uploads/categories/86wg9d29vhkflmuwtyrsof3rfqtcapzgva0ynqlp220406065630.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Goa Tour Package',
                    location: '2N South Goa / 2N North Goa',
                    price: '₹ 15,999',
                    originalPrice: '₹ 20,000',
                    strip: 'TRENDING',
                    detailUrl: 'goa-tour-packages-from-kerala/tours/goa-tour-package/',
                },
            ]}
        />
    );
}
