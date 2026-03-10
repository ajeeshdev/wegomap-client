import TourCategoryPage from '@/components/TourCategoryPage';

export default function OotyKodaikanalPage() {
    return (
        <TourCategoryPage
            title="Ooty & Kodaikanal Packages"
            subtitle="2N Ooty, 2N Kodaikanal"
            bannerImage="https://www.wegomap.com/uploads/categories/gooqe4hpze2i6jmaewve7pyud8kofwvwpunfxgql240905041417.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/gooqe4hpze2i6jmaewve7pyud8kofwvwpunfxgql240905041417.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Ooty Kodaikanal Package',
                    location: '2N Ooty / 2N Kodaikanal',
                    price: '₹ 14,999',
                    originalPrice: '₹ 18,000',
                    strip: 'TRENDING',
                    detailUrl: 'ooty-kodaikanal-tour-packages/tours/ooty-kodaikanal-tour-package/',
                },
            ]}
        />
    );
}
