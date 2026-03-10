import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/leh-ladakh.jpg',
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
            bannerImage="https://www.wegomap.com/uploads/categories/leh-banner.jpg"
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
