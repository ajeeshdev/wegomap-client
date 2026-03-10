import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/vb1q7giz8knrotcrratjypfxzoti0rjraf4quymy220406072547.jpg',
        duration: '4 Nights 5 Days',
        title: 'Nepal Tour Package',
        location: 'Kathmandu, Pokhara',
        price: '₹ 23,999',
        originalPrice: '₹ 26,000',
        detailUrl: 'nepal-tour-packages/',
        strip: 'Popular'
    }
];

export default function NepalTours() {
    return (
        <TourCategoryPage
            title="Nepal Tour Packages"
            subtitle="Explore the roof of the world"
            bannerImage="/uploads/categories/zuq5qozfb1bxlyyr84azxkajfabeigl2udrfhhxa220406065441.jpg"
            packages={packages}
            readMoreHeading="A Trip to the Himalayas"
            readMoreContent={
                <>
                    <p>Nepal is a land of spiritual heritage, diverse cultures, and the world's highest mountains. Our Nepal tour packages offer a perfect introduction to this beautiful country.</p>
                    <p>Visit the ancient temples of Kathmandu, enjoy the lakeside views of Pokhara, and witness the stunning sunrise over the Himalayas. Wegomap provides hassle-free travel plans for a memorable Nepal holiday.</p>
                </>
            }
        />
    );
}
