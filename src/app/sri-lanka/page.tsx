import TourCategoryPage from '@/components/TourCategoryPage';

export default function SriLankaPage() {
    return (
        <TourCategoryPage
            title="Sri Lanka Tour Package"
            subtitle="Sri Lanka"
            bannerImage="https://www.wegomap.com/uploads/categories/2fsdkcfcklfcdvyblurq0wzrrmyp0rhlhuamkriq240820031509.jpg"
            bookCount={26}
            packages={[
                {
                    image: 'uploads/packages/7mCmQivsI7l0TYGuG2vOOJ6dBjrrM5TevOHyvtq1240820125113.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Sri Lanka Package',
                    location: '1N Kandy / 1N Nuwara Eliya / 1N Bentota / Kosgoda',
                    price: '₹ 53,999',
                    originalPrice: '₹ 57,200',
                    strip: 'Wegomap Choice',
                    detailUrl: 'tours/sri-lanka/',
                },
            ]}
        />
    );
}
