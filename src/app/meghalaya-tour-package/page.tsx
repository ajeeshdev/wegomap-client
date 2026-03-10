import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/meghalaya.jpg',
        duration: '4 Nights 5 Days',
        title: 'Assam Meghalaya Tour',
        location: 'Shillong, Guwahati',
        price: '₹ 26,999',
        originalPrice: '₹ 29,500',
        detailUrl: 'meghalaya-tour-package/',
        strip: 'Nature'
    }
];

export default function MeghalayaTours() {
    return (
        <TourCategoryPage
            title="Meghalaya Tour Package"
            subtitle="The abode of clouds"
            bannerImage="https://www.wegomap.com/uploads/categories/meghalaya-banner.jpg"
            packages={packages}
            readMoreHeading="Explore the Beauty of Meghalaya & Assam"
            readMoreContent={
                <>
                    <p>Meghalaya is famous for its stunning waterfalls, mysterious caves, and the cleanest village in Asia. Our tour package takes you to the heart of North East India, covering both Assam and Meghalaya.</p>
                    <p>Visit the Kamakhya Temple in Guwahati, relax in the "Scotland of the East" - Shillong, and experience the natural wonders of Cherrapunji and Mawlynnong. Wegomap provides well-managed tours for nature lovers and families.</p>
                </>
            }
        />
    );
}
