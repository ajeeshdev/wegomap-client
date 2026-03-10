import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar Hillstations',
        title: '2N3D Kerala Budget Package',
        location: 'Munnar',
        price: '₹ 5,999',
        originalPrice: '₹ 7,500',
        detailUrl: 'kerala-tour-packages/tours/3-days-2-night-kerala-package/'
    },
    {
        image: '/uploads/packages/omdijhppsytnyos9dzbgrdsw4psir2y12qnt0udf220424115201.jpg',
        duration: '1N Athirapilly / 1N Aleppey',
        title: '2N3D Backwater & Waterfalls',
        location: 'Athirapilly, Alleppey',
        price: '₹ 7,299',
        originalPrice: '₹ 7,800',
        detailUrl: 'kerala-tour-packages/tours/2n3d-kerala-budget-package/'
    },
    {
        image: '/uploads/packages/omdijhppsytnyos9dzbgrdsw4psir2y12qnt0udf220424115201.jpg',
        duration: '2N Munnar / 1N Aleppey',
        title: '3N4D Hills & Backwater',
        location: 'Munnar, Alleppey',
        price: '₹ 8,499',
        originalPrice: '₹ 9,100',
        detailUrl: 'kerala-tour-packages/tours/kerala-budget-package/'
    },
    {
        image: '/uploads/packages/I47gsL6i77YHg3EspxbupTtCT3FaV5RzBCjNwAxN240907044833.jpg',
        duration: '1N Aleppey / 1N Kochi',
        title: '2N3D Alleppey & Wonderla',
        location: 'Alleppey, Kochi',
        price: '₹ 9,799',
        originalPrice: '₹ 11,200',
        detailUrl: 'kerala-tour-packages/tours/2n3d-alleppey-wonderla-park/'
    },
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar Hillstations',
        title: '2N3D Luxury Hill station Plan',
        location: 'Munnar',
        price: '₹ 9,999',
        originalPrice: '₹ 11,700',
        detailUrl: 'kerala-tour-packages/tours/2n3d-kerala-luxury-package/'
    },
    {
        image: '/uploads/packages/rTyOuCPG9NxzaC3QrYXuqrJ6EE1uxfPijXWaXQyX221128120851.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Aleppey',
        title: 'Kerala Season Plan',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 10,999',
        originalPrice: '₹ 12,550',
        detailUrl: 'kerala-tour-packages/tours/kerala-season-plan/'
    },
    {
        image: '/uploads/packages/rsz2kjlf4gfysupoyaqzjgsug665nqxnjcgapu71220406030620.jpg',
        duration: '2N Munnar / 1N Houseboat',
        title: '3N4D Kerala Budget Honeymoon',
        location: 'Munnar, Alleppey',
        price: '₹ 11,999',
        originalPrice: '₹ 13,500',
        detailUrl: 'kerala-tour-packages/tours/4-days-3-night-kerala-package/'
    },
    {
        image: '/uploads/packages/zghmnaohkngpzisdeoffkgyescgmxmzzeymhixt1220424093908.jpg',
        duration: '1N Cherai / 1N Houseboat',
        title: 'Kerala Standard Beach & Houseboat',
        location: 'Cherai, Alleppey',
        price: '₹ 12,999',
        originalPrice: '₹ 14,150',
        detailUrl: 'kerala-tour-packages/tours/2n3d-kerala-standard-package/'
    },
    {
        image: '/uploads/packages/sy0vagizrdt3llotbebojqwemftmafovkq0umv8s220406032045.jpg',
        duration: '2N Munnar / 1N Houseboat',
        title: '3N4D Kerala Standard Honeymoon',
        location: 'Munnar, Alleppey',
        price: '₹ 13,999',
        originalPrice: '₹ 14,500',
        detailUrl: 'kerala-tour-packages/tours/3n4d-kerala-honeymoon-package/'
    },
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Houseboat',
        title: '4N5D Kerala Budget (Waterfalls)',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 14,299',
        originalPrice: '₹ 15,450',
        detailUrl: 'kerala-tour-packages/tours/4n5d-kerala-budget-package/'
    }
];

export default function KeralaTours() {
    return (
        <TourCategoryPage
            title="Kerala Tour Packages"
            subtitle="Explore god's own country with us"
            bannerImage="/uploads/categories/mkofb4my0uzjne7xzy1gnoaxbdwiovxvoot9eklr220410092321.jpg"
            packages={packages}
            readMoreHeading="Best Kerala Tour Packages from Kochi"
            readMoreContent={
                <>
                    <p>Wegomap is a leading tour operator in Kochi, offering a wide range of Kerala tour packages at affordable prices. Our tour packages are designed to provide you with the best experience of Kerala's natural beauty, culture, and hospitality.</p>
                    <p>Whether you are looking for a honeymoon trip, a family vacation, or a solo adventure, we have the perfect plan for you. Our packages cover popular destinations like Munnar, Thekkady, Alleppey, Wayanad, and more.</p>
                </>
            }
        />
    );
}
