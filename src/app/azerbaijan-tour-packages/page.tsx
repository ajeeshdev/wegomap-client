import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/budgeted-azerbaijan.jpg',
        duration: '3 Nights 4 Days',
        title: 'Budgeted Azerbaijan',
        location: 'Baku City',
        price: '₹ 31,000',
        originalPrice: '₹ 33,000',
        detailUrl: 'azerbaijan-tour-packages/'
    },
    {
        image: 'uploads/tours/peaceful-azerbaijan.jpg',
        duration: '4 Nights 5 Days',
        title: 'Peaceful Azerbaijan',
        location: 'Baku, Gabala',
        price: '₹ 33,000',
        originalPrice: '₹ 35,000',
        detailUrl: 'azerbaijan-tour-packages/',
        strip: 'Best Seller'
    },
    {
        image: 'uploads/tours/charming-azerbaijan.jpg',
        duration: '4 Nights 5 Days',
        title: 'Charming Azerbaijan',
        location: 'Baku, Guba, Gabala',
        price: '₹ 37,500',
        originalPrice: '₹ 39,500',
        detailUrl: 'azerbaijan-tour-packages/',
        strip: 'Premium'
    }
];

export default function AzerbaijanTours() {
    return (
        <TourCategoryPage
            title="Azerbaijan Tour Packages"
            subtitle="Explore the Land of Fire"
            bannerImage="https://www.wegomap.com/uploads/categories/azerbaijan-banner.jpg"
            packages={packages}
            readMoreHeading="Discover Azerbaijan with Wegomap"
            readMoreContent={
                <>
                    <p>Azerbaijan is a fascinating destination where Eastern tradition meets Western modernity. Our Azerbaijan tour packages from Kochi and other cities offer a unique glimpse into this beautiful country.</p>
                    <p>Explore the futuristic skyline of Baku, the ancient cobblestoned streets of Icherisheher, and the stunning mountain landscapes of Gabala and Guba. We provide full support for Azerbaijan visas and customized itineraries.</p>
                </>
            }
        />
    );
}
