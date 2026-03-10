import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/sri-lanka.jpg',
        duration: '4 Nights 5 Days',
        title: 'Sri Lanka Package',
        location: 'Colombo, Kandy, Bentota',
        price: '₹ 53,999',
        originalPrice: '₹ 57,200',
        detailUrl: 'sri-lanka/',
        strip: 'Trending'
    }
];

export default function SriLankaTours() {
    return (
        <TourCategoryPage
            title="Sri Lanka"
            subtitle="Explore the pearl of the Indian Ocean"
            bannerImage="https://www.wegomap.com/uploads/categories/sri-lanka-banner.jpg"
            packages={packages}
            readMoreHeading="Discover Sri Lanka with Wegomap"
            readMoreContent={
                <>
                    <p>Sri Lanka is a tropical paradise with a history that spans thousands of years. Our Sri Lanka tour packages offer a mix of pristine beaches, lush tea plantations, and ancient cultural sites.</p>
                    <p>Visit the hill city of Kandy, relax on the gold-en beaches of Bentota, and explore the bustling streets of Colombo. Wegomap provides customized tour plans that include flights, visa assistance, and private transfers.</p>
                </>
            }
        />
    );
}
