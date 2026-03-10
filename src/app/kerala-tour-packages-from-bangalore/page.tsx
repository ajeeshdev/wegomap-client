import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Wayanad',
        title: '2N3D Wayanad Budget Package',
        location: 'Wayanad',
        price: '₹ 6,500',
        originalPrice: '₹ 8,000',
        detailUrl: 'kerala-tour-packages/tours/wayanad-budget-package/',
        strip: 'Popular from Bangalore'
    },
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar Hillstations',
        title: '2N3D Munnar Budget Package',
        location: 'Munnar',
        price: '₹ 5,999',
        originalPrice: '₹ 7,500',
        detailUrl: 'kerala-tour-packages/tours/3-days-2-night-kerala-package/'
    },
    {
        image: '/uploads/packages/omdijhppsytnyos9dzbgrdsw4psir2y12qnt0udf220424115201.jpg',
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
            bannerImage="/uploads/categories/0D5D01EuAa4VNFvV73Ny1Pepw8fd0KT3N7z6tXqW230904030332.jpg"
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
