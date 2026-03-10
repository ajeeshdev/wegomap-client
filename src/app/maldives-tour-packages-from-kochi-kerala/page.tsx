import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/maldives-3n4d.jpg',
        duration: '3 Nights 4 Days',
        title: 'Maldives Tour Package (3Night)',
        location: 'Island Resort / Beach Villa',
        price: '₹ 26,999',
        originalPrice: '₹ 29,000',
        detailUrl: 'tours/malaysia-3-nights-4-days/'
    },
    {
        image: 'uploads/tours/maldives-tour-package.jpg',
        duration: '4 Nights 5 Days',
        title: 'Maldives Tour Package (4N)',
        location: 'Water Villa / Private Resort',
        price: '₹ 73,999',
        originalPrice: '₹ 80,000',
        detailUrl: 'tours/maldives-tour-package/',
        strip: 'Luxury'
    }
];

export default function MaldivesTours() {
    return (
        <TourCategoryPage
            title="Maldives Tour Packages"
            subtitle="Pristine white beaches and turquoise lagoons"
            bannerImage="https://www.wegomap.com/uploads/categories/maldives-banner.jpg"
            packages={packages}
            readMoreHeading="Exclusive Maldives Holiday"
            readMoreContent={
                <>
                    <p>The Maldives is the ultimate romantic destination, offering seclusion, luxury, and breathtaking natural beauty. Our Maldives tour packages from Kochi are designed for honeymooners and travelers looking for a serene island escape.</p>
                    <p>Stay in stunning over-water villas, enjoy private beach dinners, and explore the vibrant underwater world with snorkeling and diving. We work with the best resorts in the Maldives to bring you all-inclusive packages at competitive prices.</p>
                </>
            }
        />
    );
}
