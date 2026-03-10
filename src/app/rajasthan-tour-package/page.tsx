import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/rajasthan-5n6d.jpg',
        duration: '5 Nights 6 Days',
        title: 'Rajasthan Tour Package',
        location: 'Jaipur, Jodhpur, Udaipur',
        price: '₹ 21,999',
        originalPrice: '₹ 29,000',
        detailUrl: 'rajasthan-tour-package/',
        strip: 'Royal'
    }
];

export default function RajasthanTours() {
    return (
        <TourCategoryPage
            title="Rajasthan Tour Package"
            subtitle="The land of kings and colorful traditions"
            bannerImage="https://www.wegomap.com/uploads/categories/rajasthan-banner.jpg"
            packages={packages}
            readMoreHeading="Royal Rajasthan Holiday"
            readMoreContent={
                <>
                    <p>Rajasthan is a land of magnificent forts, royal palaces, and vibrant culture. Our Rajasthan tour packages take you through the historic "Pink City" of Jaipur, the "Blue City" of Jodhpur, and the romantic city of lakes, Udaipur.</p>
                    <p>Experience the grand hospitality, explore the desert sands of Jaisalmer, and witness the rich architectural heritage of India. Wegomap curated these plans for a truly royal travel experience.</p>
                </>
            }
        />
    );
}
