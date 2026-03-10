import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/ooty-kodaikanal.jpg',
        duration: '4 Nights 5 Days',
        title: 'Ooty Kodaikanal Package',
        location: 'Ooty, Kodaikanal',
        price: '₹ 15,999',
        originalPrice: '₹ 19,000',
        detailUrl: 'ooty-kodaikanal-tour-packages/',
        strip: 'Popular'
    }
];

export default function OotyKodaikanalTours() {
    return (
        <TourCategoryPage
            title="Ooty Kodaikanal Tour Packages"
            subtitle="The best of Tamil Nadu hill stations"
            bannerImage="https://www.wegomap.com/uploads/categories/ooty-kodaikanal-banner.jpg"
            packages={packages}
            readMoreHeading="Complete Hill Station Experience"
            readMoreContent={
                <>
                    <p>Combine the beauty of the Nilgiris and the Palani Hills with our Ooty and Kodaikanal tour package. This itinerary is perfect for those who love the mountains and pleasant weather.</p>
                    <p>Wegomap provides well-planned transportation between the two hill stations and premium accommodations in both locations. Enjoy the lakes, gardens, and viewpoints with our expert local assistance.</p>
                </>
            }
        />
    );
}
