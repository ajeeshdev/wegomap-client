import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/klidzvonwfqlp6nyvhmnkkon6g6cobwkxaxxloxn240904040120.png',
        duration: '4 Nights 5 Days',
        title: 'Gangtok Darjeeling Package',
        location: 'Gangtok, Darjeeling',
        price: '₹ 23,999',
        originalPrice: '₹ 26,500',
        detailUrl: 'darjeeling/',
        strip: 'Popular'
    }
];

export default function DarjeelingTours() {
    return (
        <TourCategoryPage
            title="Darjeeling Tour Package"
            subtitle="The queen of hill stations"
            bannerImage="/uploads/categories/2z1agsq6wrwibgatjiamea7pftxta7cgalenltcc240904030146.jpg"
            packages={packages}
            readMoreHeading="Explore North East India"
            readMoreContent={
                <>
                    <p>Darjeeling and Gangtok are the jewels of North East India. Our tour packages offer a perfect escape into the lush tea gardens and the majestic views of Mt. Kanchenjunga.</p>
                    <p>Experience the toy train ride in Darjeeling, visit the serene monasteries of Gangtok, and enjoy the beautiful mountain culture of the Eastern Himalayas. Wegomap provides customized itineraries for families and explorers.</p>
                </>
            }
        />
    );
}
