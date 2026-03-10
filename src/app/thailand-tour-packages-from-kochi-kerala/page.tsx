import TourCategoryPage from '@/components/TourCategoryPage';

export default function ThailandPage() {
    return (
        <TourCategoryPage
            title="Thailand Tour Packages"
            subtitle="Explore with us"
            bannerImage="https://www.wegomap.com/uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Thailand Delight',
                    location: '2N Pattaya / 1N Bangkok',
                    price: '₹ 29,999',
                    originalPrice: '₹ 36,000',
                    strip: 'BEST SELLER',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/thailand-tour-package-premium/',
                },
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Amazing Thailand',
                    location: '2N Pattaya / 1N Bangkok',
                    price: '₹ 32,999',
                    originalPrice: '₹ 40,000',
                    strip: 'WEGOMAP CHOICE',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/3n4d-thailand-package/',
                },
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Thailand Premium',
                    location: '2N Pattaya / 2N Bangkok',
                    price: '₹ 38,999',
                    originalPrice: '₹ 46,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/thailand-premium/',
                },
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Thailand Phuket & Krabi',
                    location: '2N Phuket / 2N Krabi',
                    price: '₹ 42,999',
                    originalPrice: '₹ 50,000',
                    strip: 'TRENDING PACKAGE',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/thailand-phuket-krabi/',
                },
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Thailand Tour Package',
                    location: '2N Phuket / 2N Pattaya / 2N Bangkok',
                    price: '₹ 55,999',
                    originalPrice: '₹ 65,000',
                    strip: 'TRENDING PACKAGE',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/thailand-tour-package/',
                },
                {
                    image: 'uploads/categories/8fimn8i11x1d6lhyiqx3s8dw9ang49kfv6ayvhxt220406065511.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Thailand Premium Package',
                    location: '2N Phuket / 2N Pattaya / 2N Bangkok',
                    price: '₹ 62,999',
                    originalPrice: '₹ 75,000',
                    strip: 'SPECIAL PACKAGE',
                    detailUrl: 'thailand-tour-packages-from-kochi-kerala/tours/thailand-tour-package-premium-1/',
                },
            ]}
        />
    );
}
