import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/thailand-delight.jpg',
        duration: '3 Nights 4 Days',
        title: 'Thailand Delight',
        location: 'Bangkok, Pattaya',
        price: '₹ 22,000',
        originalPrice: '₹ 24,500',
        detailUrl: 'tours/thailand-tour-package-premium/'
    },
    {
        image: 'uploads/tours/3n4d-thailand-package.jpg',
        duration: '3 Nights 4 Days',
        title: 'Amazing Thailand',
        location: 'Bangkok, Pattaya',
        price: '₹ 24,400',
        originalPrice: '₹ 28,000',
        detailUrl: 'tours/3n4d-thailand-package/',
        strip: 'Best Seller'
    },
    {
        image: 'uploads/tours/thailand-premium.jpg',
        duration: '4 Nights 5 Days',
        title: 'Thailand Premium',
        location: 'Bangkok, Pattaya, Coral Island',
        price: '₹ 29,500',
        originalPrice: '₹ 32,500',
        detailUrl: 'tours/thailand-premium/'
    },
    {
        image: 'uploads/tours/thailand-phuket-krabi.jpg',
        duration: '4 Nights 5 Days',
        title: 'Thailand Phuket & Krabi',
        location: 'Phuket, Krabi',
        price: '₹ 29,999',
        originalPrice: '₹ 34,000',
        detailUrl: 'tours/thailand-phuket-krabi/',
        strip: 'Trending'
    },
    {
        image: 'uploads/tours/thailand-tour-package.jpg',
        duration: '6 Nights 7 Days',
        title: 'Thailand Tour Package',
        location: 'Bangkok, Pattaya, Phuket',
        price: '₹ 52,999',
        originalPrice: '₹ 56,000',
        detailUrl: 'tours/thailand-tour-package/'
    }
];

export default function ThailandTours() {
    return (
        <TourCategoryPage
            title="Thailand Tour Packages"
            subtitle="Land of smiles and beautiful beaches"
            bannerImage="https://www.wegomap.com/uploads/categories/thailand-banner.jpg"
            packages={packages}
            readMoreHeading="Explore the Best of Thailand"
            readMoreContent={
                <>
                    <p>Thailand is a versatile destination offering everything from vibrant city life to pristine beaches and rich cultural heritage. Our Thailand tour packages from Kochi and other parts of India are perfectly curated to give you an unforgettable holiday.</p>
                    <p>Experience the bustling markets of Bangkok, the beautiful shores of Pattaya, and the tropical paradise of Phuket and Krabi. We handle your flights, hotels, and local tours so you can enjoy a stress-free vacation.</p>
                </>
            }
        />
    );
}
