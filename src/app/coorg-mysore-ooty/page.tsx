import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/vbpwushzobsqylb8s1z1uhvlgken5enhwzdly3x5240905024552.jpg',
        duration: '5 Nights 6 Days',
        title: 'Coorg Mysore Ooty Package',
        location: 'Coorg, Mysore, Ooty',
        price: '₹ 23,999',
        originalPrice: '₹ 25,700',
        detailUrl: 'coorg-mysore-ooty/',
        strip: 'Best Seller'
    }
];

export default function CoorgMysoreOoty() {
    return (
        <TourCategoryPage
            title="Coorg Mysore Ooty"
            subtitle="The spice capital and the queen of hills"
            bannerImage="/uploads/categories/neqghtvqmhem7lqiiniilprz8hoskpvtcyb82xo1240905031746.jpg"
            packages={packages}
            readMoreHeading="Complete South India Tour"
            readMoreContent={
                <>
                    <p>Experience the best of Karnataka and Tamil Nadu with our Coorg, Mysore, and Ooty tour package. This itinerary takes you through the coffee plantations of Coorg, the royal heritage of Mysore, and the scenic beauty of Ooty.</p>
                    <p>Wegomap ensures a comfortable journey with premium hotel stays, private vehicle transfers, and well-planned sightseeing tours. Ideal for families and nature lovers.</p>
                </>
            }
        />
    );
}
