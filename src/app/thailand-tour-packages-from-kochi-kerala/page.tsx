import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/U58KmFr2waHgoZCqz2YiipHY43bHX1lDH2R4cWqg240822120232.jpg',
        duration: '3 Nights 4 Days',
        title: 'Thailand Delight',
        location: 'Bangkok, Pattaya',
        price: '₹ 22,000',
        originalPrice: '₹ 24,500',
        detailUrl: 'tours/thailand-tour-package-premium/'
    },
    {
        image: '/uploads/packages/zxlqmhgq71iv3xvevzebzywogiwwt6uv7zm2mgos220406082237.jpg',
        duration: '3 Nights 4 Days',
        title: 'Amazing Thailand',
        location: 'Bangkok, Pattaya',
        price: '₹ 24,400',
        originalPrice: '₹ 28,000',
        detailUrl: 'tours/3n4d-thailand-package/',
        strip: 'Best Seller'
    },
    {
        image: '/uploads/packages/3t7juwrgvdmth8malgvhehbwyx7ownmp8xjgiyla250603053815.jpg',
        duration: '4 Nights 5 Days',
        title: 'Thailand Premium',
        location: 'Bangkok, Pattaya, Coral Island',
        price: '₹ 29,500',
        originalPrice: '₹ 32,500',
        detailUrl: 'tours/thailand-premium/'
    },
    {
        image: '/uploads/packages/Uzi8MYAjx3MwWWmNS2soW9x9IzESbmt0I4wN42Xx240822120635.jpg',
        duration: '4 Nights 5 Days',
        title: 'Thailand Phuket & Krabi',
        location: 'Phuket, Krabi',
        price: '₹ 29,999',
        originalPrice: '₹ 34,000',
        detailUrl: 'tours/thailand-phuket-krabi/',
        strip: 'Trending'
    },
    {
        image: '/uploads/packages/ItyyJiyjRVdzXZVfc8LFGxEVs3MYHasDqQdY48Ff240822120710.jpg',
        duration: '6 Nights 7 Days',
        title: 'Thailand Tour Package',
        location: 'Bangkok, Pattaya, Phuket',
        price: '₹ 52,999',
        originalPrice: '₹ 56,000',
        detailUrl: 'tours/thailand-tour-package/'
    }
];

export default function ThailandTours() {
    return (
        <TourCategoryPage
            title="Thailand Tour Packages"
            subtitle="Land of smiles and beautiful beaches"
            bannerImage="/uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg"
            packages={packages}
            readMoreHeading="Explore the Best of Thailand"
            readMoreContent={
                <>
                    <p>Thailand is a versatile destination offering everything from vibrant city life to pristine beaches and rich cultural heritage. Our Thailand tour packages from Kochi and other parts of India are perfectly curated to give you an unforgettable holiday.</p>
                    <p>Experience the bustling markets of Bangkok, the beautiful shores of Pattaya, and the tropical paradise of Phuket and Krabi. We handle your flights, hotels, and local tours so you can enjoy a stress-free vacation.</p>
                </>
            }
        />
    );
}
