import TourCategoryPage from '@/components/TourCategoryPage';

export default function MeghalayaPage() {
    return (
        <TourCategoryPage
            title="Meghalaya Tour Package"
            subtitle="Meghalaya Tour Package"
            bannerImage="https://www.wegomap.com/uploads/categories/r34Bg3glSVPv3yNqrsdDu6ZdJpx9fBTtZnXmbXI4240904044934.jpg"
            bookCount={30}
            packages={[
                {
                    image: 'uploads/packages/7zw7tf5mlcanzfebdwxti9b3pmhjvoteniv5cozl240904043422.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Assam Meghalaya Tour',
                    location: '3N SHILLONG / 1N GUWAHATI',
                    price: '₹ 26,999',
                    originalPrice: '₹ 29,500',
                    strip: 'SUMMER SPECIAL',
                    detailUrl: 'tours/summer-special-assam-meghalaya-packages/',
                },
            ]}
        />
    );
}
