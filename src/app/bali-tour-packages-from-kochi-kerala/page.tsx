import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/bali-tour-plan.jpg',
        duration: '3 Nights 4 Days',
        title: 'Bali Budget Tour Plan',
        location: 'Ubud, Kuta',
        price: '₹ 16,999',
        originalPrice: '₹ 19,000',
        detailUrl: 'tours/bali-tour-plan/',
        strip: 'Best Seller'
    },
    {
        image: 'uploads/tours/4n5d-bali-tour-package.jpg',
        duration: '4 Nights 5 Days',
        title: 'Bali Tour Package',
        location: 'Seminyak, Jimbaran',
        price: '₹ 21,999',
        originalPrice: '₹ 25,000',
        detailUrl: 'tours/4n5d-bali-tour-package/'
    },
    {
        image: 'uploads/tours/bali-tour-package-1.jpg',
        duration: '5 Nights 6 Days',
        title: 'Bali Standard tour',
        location: 'Uluwatu, Nusadua',
        price: '₹ 27,999',
        originalPrice: '₹ 32,000',
        detailUrl: 'tours/bali-tour-package-1/'
    },
    {
        image: 'uploads/tours/bali-package.jpg',
        duration: '5 Nights 6 Days',
        title: 'Bali Premium Package',
        location: 'Lempuyang, Tirta Gangga',
        price: '₹ 33,999',
        originalPrice: '₹ 36,300',
        detailUrl: 'tours/bali-package/',
        strip: 'Premium'
    },
    {
        image: 'uploads/tours/4n5d-bali-tour-package-premium.jpg',
        duration: '4 Nights 5 Days',
        title: 'Bali Premium Package (Best Summer Plan)',
        location: 'Ubud Swing, Tegenungan',
        price: '₹ 34,999',
        originalPrice: '₹ 38,500',
        detailUrl: 'tours/4n5d-bali-tour-package-premium/'
    }
];

export default function BaliTours() {
    return (
        <TourCategoryPage
            title="Bali Tour Packages"
            subtitle="The island of gods and stunning sunsets"
            bannerImage="https://www.wegomap.com/uploads/categories/bali-banner.jpg"
            packages={packages}
            readMoreHeading="Plan your Bali Escape"
            readMoreContent={
                <>
                    <p>Bali is a tropical paradise that offers a unique blend of adventure, culture, and relaxation. Our Bali tour packages from Kochi and other cities in India are designed to give you the most authentic Balinese experience.</p>
                    <p>From the iconic rice terraces of Ubud and the ancient temples of Tanah Lot and Uluwatu to the pristine beaches of Kuta and Seminyak, we cover all the highlights. Enjoy customized itineraries, premium accommodations, and professional guides with Wegomap.</p>
                </>
            }
        />
    );
}
