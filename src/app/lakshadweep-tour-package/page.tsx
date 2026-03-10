import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/lakshadweep.jpg',
        duration: '3 Nights 4 Days',
        title: 'Lakshadweep Package',
        location: 'Agatti Island',
        price: '₹ 22,999',
        originalPrice: '₹ 24,500',
        detailUrl: 'lakshadweep-tour-package/',
        strip: 'Exclusive'
    }
];

export default function LakshadweepTours() {
    return (
        <TourCategoryPage
            title="Lakshadweep Tour Package"
            subtitle="The untouched beauty of coral islands"
            bannerImage="https://www.wegomap.com/uploads/categories/lakshadweep-banner.jpg"
            packages={packages}
            readMoreHeading="Paradise at Lakshadweep"
            readMoreContent={
                <>
                    <p>Lakshadweep offers an unparalleled experience of pristine blue waters and white sand beaches. Our Lakshadweep tour packages mainly focus on Agatti Island, providing a tranquil and exclusive holiday experience.</p>
                    <p>Wegomap handles all the necessary permits and flight booking to make your journey to these remote islands smooth and enjoyable. Perfect for water sports enthusiasts and those seeking peace.</p>
                </>
            }
        />
    );
}
