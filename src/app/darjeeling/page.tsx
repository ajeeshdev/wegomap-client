import TourCategoryPage from '@/components/TourCategoryPage';

export default function DarjeelingPage() {
    return (
        <TourCategoryPage
            title="Darjeeling Tour Package"
            subtitle="DARJEELING"
            bannerImage="https://www.wegomap.com/uploads/categories/2z1agsq6wrwibgatjiamea7pftxta7cgalenltcc240904030146.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/2z1agsq6wrwibgatjiamea7pftxta7cgalenltcc240904030146.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Gangtok Darjeeling Package',
                    location: '2N GANGTOK / 2N DARJEELING',
                    price: '₹ 18,999',
                    originalPrice: '₹ 22,000',
                    strip: 'SPECIAL PACKAGE',
                    detailUrl: 'tours/special-gangtok-darjeeling-packages/',
                },
            ]}
        />
    );
}
