import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/goa-package-3-days-2-night.jpg',
        duration: '2 Nights 3 Days',
        title: 'Goa Tour Package',
        location: 'North Goa, South Goa',
        price: '₹ 8,499',
        originalPrice: '₹ 10,500',
        detailUrl: 'trending/tours/goa-package-3-days-2-night/',
        strip: 'Best Seller'
    },
    {
        image: 'uploads/tours/goa-package-4-days-3-night.jpg',
        duration: '3 Nights 4 Days',
        title: 'Goa Tour Package',
        location: 'Calangute, Baga, Old Goa',
        price: '₹ 12,899',
        originalPrice: '₹ 14,000',
        detailUrl: 'goa-tour-packages-from-kerala/'
    },
    {
        image: 'uploads/tours/goa-package-5-days-4-night.jpg',
        duration: '4 Nights 5 Days',
        title: 'Goa Tour Package',
        location: 'Panaji, Beaches, Cruises',
        price: '₹ 13,999',
        originalPrice: '₹ 15,500',
        detailUrl: 'goa-tour-packages-from-kerala/'
    }
];

export default function GoaTours() {
    return (
        <TourCategoryPage
            title="Goa Tour Packages"
            subtitle="Land of sun, sand, and sea"
            bannerImage="https://www.wegomap.com/uploads/categories/goa-banner.jpg"
            packages={packages}
            readMoreHeading="Plan your perfect Goa Getaway"
            readMoreContent={
                <>
                    <p>Goa is the ultimate destination for beach lovers and party enthusiasts. Our Goa tour packages from Kochi and other parts of Kerala offer a perfect blend of relaxation and excitement.</p>
                    <p>Explore the historic churches of Old Goa, relax on the pristine beaches of South Goa, or experience the vibrant nightlife of North Goa. We provide comfortable stays and customized itineraries to suit your preferences.</p>
                </>
            }
        />
    );
}
