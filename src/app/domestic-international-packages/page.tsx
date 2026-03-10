import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/j6cozrh2jgnksv5hsfoj9m6emdicmwtvtvqvnqu8240829050035.jpg',
        duration: '4N5D Manali',
        title: 'Manali Tour Packages',
        location: 'Himachal Pradesh',
        price: '₹ 18,999',
        originalPrice: '₹ 20,100',
        detailUrl: 'manali-tour-packages/',
        strip: 'Trending'
    },
    {
        image: '/uploads/packages/q2zgcmko8vaz9urxqizdz53eyfbc8vnjxe2uis9a240905105822.jpg',
        duration: '2N3D Goa',
        title: 'Goa Tour Packages',
        location: 'Goa',
        price: '₹ 8,499',
        originalPrice: '₹ 10,500',
        detailUrl: 'goa-tour-packages-from-kerala/',
        strip: 'Best Seller'
    },
    {
        image: '/uploads/packages/scjv80siga8jttcsryrjx5hfckuzsflpd6ten4ld240827103913.jpg',
        duration: '3N4D Bali',
        title: 'Bali Tour Packages',
        location: 'Indonesia',
        price: '₹ 16,999',
        originalPrice: '₹ 19,000',
        detailUrl: 'bali-tour-packages-from-kochi-kerala/'
    },
    {
        image: '/uploads/packages/ItyyJiyjRVdzXZVfc8LFGxEVs3MYHasDqQdY48Ff240822120710.jpg',
        duration: '3N4D Thailand',
        title: 'Thailand Tour Packages',
        location: 'Thailand',
        price: '₹ 24,400',
        originalPrice: '₹ 28,000',
        detailUrl: 'thailand-tour-packages-from-kochi-kerala/'
    },
    {
        image: '/uploads/packages/kbtqjlCKQNNuhMP0GPgbaNNl1ewhvNSCNEVgh0Vm260130012049.jpg',
        duration: '4N5D Dubai',
        title: 'Dubai Tour Packages',
        location: 'UAE',
        price: '₹ 41,600',
        originalPrice: '₹ 56,600',
        detailUrl: 'dubai-tour-packages/'
    },
    {
        image: '/uploads/packages/h1xw5ekx8qsl0hyos8pethtm6u8fjkbjksewkdyd240905033121.jpg',
        duration: '4N5D Maldives',
        title: 'Maldives Tour Packages',
        location: 'Maldives',
        price: '₹ 73,999',
        originalPrice: '₹ 80,000',
        detailUrl: 'maldives-tour-packages-from-kochi-kerala/'
    }
];

export default function DomesticIntlTours() {
    return (
        <TourCategoryPage
            title="Domestic & International Packages"
            subtitle="Explore breathtaking destinations across the globe"
            bannerImage="/uploads/categories/auvy9thxlogxhhxy3zqofaonrhj91o4babncqjvi220406070159.jpg"
            packages={packages}
            readMoreHeading="Custom International Holidays"
            readMoreContent={
                <>
                    <p>Wegomap provides exceptional travel experiences beyond Kerala. From the snow-capped mountains of Manali to the exotic beaches of Bali and the futuristic skyline of Dubai, we bring the world closer to you.</p>
                    <p>Our international tour packages are curated with attention to detail, including visa assistance, insurance, and local guided tours. We bridge the gap between your dream destination and your budget.</p>
                </>
            }
        />
    );
}
