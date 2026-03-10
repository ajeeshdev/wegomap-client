import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/wayanad-budget-package.jpg',
        duration: '2N Wayanad',
        title: '2N3D Wayanad Budget Package',
        location: 'Wayanad',
        price: '₹ 6,500',
        originalPrice: '₹ 8,000',
        detailUrl: 'kerala-tour-packages/tours/wayanad-budget-package/',
        strip: 'Popular from Bangalore'
    },
    {
        image: 'uploads/tours/3-days-2-night-kerala-package.jpg',
        duration: '2N Munnar Hillstations',
        title: '2N3D Munnar Budget Package',
        location: 'Munnar',
        price: '₹ 5,999',
        originalPrice: '₹ 7,500',
        detailUrl: 'kerala-tour-packages/tours/3-days-2-night-kerala-package/'
    },
    {
        image: 'uploads/tours/kerala-budget-package.jpg',
        duration: '2N Munnar / 1N Aleppey',
        title: '3N4D Hills & Backwater',
        location: 'Munnar, Alleppey',
        price: '₹ 8,499',
        originalPrice: '₹ 9,100',
        detailUrl: 'kerala-tour-packages/tours/kerala-budget-package/'
    }
];

export default function BangaloreTours() {
    return (
        <TourCategoryPage
            title="Kerala Tour Packages from Bangalore"
            subtitle="Convenient trips starting from the Garden City"
            bannerImage="https://www.wegomap.com/uploads/categories/scenic-road-trip-kerala.jpg"
            packages={packages}
            readMoreHeading="Plan your Kerala Trip from Bangalore"
            readMoreContent={
                <>
                    <p>Wegomap offers specialized Kerala tour packages for travelers from Bangalore. With easy road and rail connectivity, destinations like Wayanad, Munnar, and Coorg are just a short trip away.</p>
                    <p>Our Bangalore-special packages include pickup and drop options from major transit points, ensuring a hassle-free journey. Whether it's a weekend getaway or a long holiday, we have the right itinerary for you.</p>
                </>
            }
        />
    );
}
