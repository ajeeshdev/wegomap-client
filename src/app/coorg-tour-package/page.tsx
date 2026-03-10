import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/coorg-package.jpg',
        duration: '2 Nights 3 Days',
        title: 'Coorg Tour Package',
        location: 'Coorg / Madikeri',
        price: '₹ 11,500',
        originalPrice: '₹ 13,000',
        detailUrl: 'coorg-tour-package/',
        strip: 'Popular'
    }
];

export default function CoorgTours() {
    return (
        <TourCategoryPage
            title="Coorg Tour Package"
            subtitle="The Scotland of India"
            bannerImage="https://www.wegomap.com/uploads/categories/coorg-banner.jpg"
            packages={packages}
            readMoreHeading="Explore Coorg with Wegomap"
            readMoreContent={
                <>
                    <p>Coorg is a paradise for those who love nature and tranquility. Known as the 'Scotland of India', it offers lush green landscapes, mist-covered hills, and vast coffee estates.</p>
                    <p>Our Coorg tour packages include visits to Raja's Seat, Abbey Falls, and the Golden Temple (Bylakuppe). We offer cozy homestays and luxurious resorts to make your trip special.</p>
                </>
            }
        />
    );
}
