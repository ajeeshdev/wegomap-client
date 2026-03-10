import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/k7ksmqay9clwp5rfdoeab7b3ucmsrsijxaxstr6d240904032017.png',
        duration: '5 Nights 6 Days',
        title: 'Leh Ladakh Tour Package',
        location: 'Leh, Nubra Valley, Pangong Lake',
        price: '₹ 16,999',
        originalPrice: '₹ 22,000',
        detailUrl: 'leh-ladakh-tour-package/',
        strip: 'Adventurous'
    }
];

export default function LehTours() {
    return (
        <TourCategoryPage
            title="Leh Ladakh Tour Package"
            subtitle="The land of high passes"
            bannerImage="/uploads/categories/d4rzq89o8xu3a9ejgnhkfes4r5lpqvsfgtldzmoi240904033509.jpg"
            packages={packages}
            readMoreHeading="Adventure in Ladakh"
            readMoreContent={
                <>
                    <p>Leh Ladakh is a destination like no other, offering dramatic landscapes, high-altitude passes, and ancient monasteries. Our Ladakh tour packages are designed for those seeking both adventure and peace.</p>
                    <p>Cross the world's highest motorable roads, witness the stunning blue waters of Pangong Lake, and explore the unique desert landscape of Nubra Valley. Wegomap ensures a safe and well-planned journey with experienced local guides.</p>
                </>
            }
        />
    );
}
