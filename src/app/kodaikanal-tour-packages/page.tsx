import TourCategoryPage from '@/components/TourCategoryPage';

export default function KodaikanalPage() {
    return (
        <TourCategoryPage
            title="Kodaikanal Tour Packages"
            subtitle="2N Kodaikanal"
            bannerImage="https://www.wegomap.com/uploads/categories/umwfsgcys5bekqzaaga7nsholfjuuhiqvnal5r4o240905034708.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/umwfsgcys5bekqzaaga7nsholfjuuhiqvnal5r4o240905034708.jpg',
                    duration: '2 Nights 3 Days',
                    title: 'Kodaikanal Tour Package',
                    location: '2N Kodaikanal',
                    price: '₹ 8,999',
                    originalPrice: '₹ 11,000',
                    strip: 'TRENDING PACKAGE',
                    detailUrl: 'kodaikanal-tour-packages/tours/kodaikanal-tour-package/',
                },
            ]}
        />
    );
}
