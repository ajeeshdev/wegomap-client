import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/malaysia.jpg',
        duration: '3 Nights 4 Days',
        title: 'Malaysia Tour Package',
        location: 'Kuala Lumpur, Genting Highlands',
        price: '₹ 19,499',
        originalPrice: '₹ 22,500',
        detailUrl: 'malaysia-tour-packages-from-kochi-kerala/',
        strip: 'Best Seller'
    }
];

export default function MalaysiaTours() {
    return (
        <TourCategoryPage
            title="Malaysia Tour Packages"
            subtitle="Truly Asia experience"
            bannerImage="https://www.wegomap.com/uploads/categories/malaysia-banner.jpg"
            packages={packages}
            readMoreHeading="Explore Malaysia with Wegomap"
            readMoreContent={
                <>
                    <p>Malaysia is a melting pot of cultures, offering everything from futuristic skyscrapers to tropical rainforests. Our Malaysia tour packages from Kochi are curated to give you the best of city life and nature.</p>
                    <p>Visit the iconic Petronas Twin Towers in Kuala Lumpur, enjoy the world-class theme parks in Genting Highlands, and experience the cultural diversity of the region. We provide assistance with Malaysia visas and flights.</p>
                </>
            }
        />
    );
}
