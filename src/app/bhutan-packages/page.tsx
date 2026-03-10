import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/bhutan-7d.jpg',
        duration: '6 Nights 7 Days',
        title: 'Bhutan Package',
        location: 'Paro, Thimphu, Punakha',
        price: '₹ 44,999',
        originalPrice: '₹ 48,000',
        detailUrl: 'bhutan-packages/',
        strip: 'Recommended'
    }
];

export default function BhutanTours() {
    return (
        <TourCategoryPage
            title="Bhutan Packages"
            subtitle="Explore the land of the thunder dragon"
            bannerImage="https://www.wegomap.com/uploads/categories/bhutan-banner.jpg"
            packages={packages}
            readMoreHeading="A Spiritual Journey to Bhutan"
            readMoreContent={
                <>
                    <p>Bhutan is one of the most serene and spiritually rich destinations in the world. Our Bhutan tour packages take you into the heart of the Himalayas, where happiness is the ultimate goal.</p>
                    <p>Experience the stunning views of Paro Taktsang (Tiger's Nest Monastery), the cultural heritage of Thimphu and Punakha, and the pristine mountain landscapes. We arrange your visa, sustainable tourism fees, and local stays for a seamless experience.</p>
                </>
            }
        />
    );
}
