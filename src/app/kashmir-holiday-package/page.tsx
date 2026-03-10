import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/hgksm2sl24ngdvpsh5ovizl3otpxu35iimuvjuni240829022035.jpg',
        duration: '4 Nights 5 Days',
        title: 'Kashmir Holiday',
        location: 'Srinagar, Gulmarg, Pahalgam',
        price: '₹ 21,999',
        originalPrice: '₹ 25,000',
        detailUrl: 'kashmir-holiday-package/'
    },
    {
        image: '/uploads/packages/hgksm2sl24ngdvpsh5ovizl3otpxu35iimuvjuni240829022035.jpg',
        duration: '5 Nights 6 Days',
        title: 'Kashmir Holiday Package',
        location: 'Srinagar, Gulmarg, Sonamarg, Pahalgam',
        price: '₹ 27,999',
        originalPrice: '₹ 30,000',
        detailUrl: 'kashmir-holiday-package/',
        strip: 'Best Seller'
    }
];

export default function KashmirTours() {
    return (
        <TourCategoryPage
            title="Kashmir Holiday Package"
            subtitle="Paradise on Earth"
            bannerImage="/uploads/categories/vsgopcdmooaxqkjltfnahzvl4vqe1fdioxawg2yt240829024046.jpg"
            packages={packages}
            readMoreHeading="Plan your Kashmir Trip"
            readMoreContent={
                <>
                    <p>Kashmir is often described as heaven on earth, and for good reason. Our Kashmir holiday packages take you through the stunning valleys, serene lakes, and snow-capped peaks of the Himalayas.</p>
                    <p>Enjoy a Shikara ride on Dal Lake, explore the meadows of Gulmarg, and visit the beautiful river-side town of Pahalgam. We offer comfortable houseboat stays and premium hotel options for an unforgettable Kashmiri experience.</p>
                </>
            }
        />
    );
}
