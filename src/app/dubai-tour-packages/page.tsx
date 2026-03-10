import TourCategoryPage from '@/components/TourCategoryPage';

export default function DubaiPage() {
    return (
        <TourCategoryPage
            title="Dubai Tour Packages"
            subtitle="Dubai Holidays"
            bannerImage="https://www.wegomap.com/uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Dubai Package',
                    location: '3N Dubai',
                    price: '₹ 42,999',
                    originalPrice: '₹ 52,000',
                    strip: 'WEGOMAP CHOICE',
                    detailUrl: 'dubai-tour-packages/tours/dubai-package/',
                },
                {
                    image: 'uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Dubai Tour Package',
                    location: '4N Dubai',
                    price: '₹ 52,999',
                    originalPrice: '₹ 63,000',
                    strip: 'TRENDING',
                    detailUrl: 'dubai-tour-packages/tours/dubai-tour-package/',
                },
                {
                    image: 'uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Dubai Package',
                    location: '5N Dubai',
                    price: '₹ 62,999',
                    originalPrice: '₹ 75,000',
                    strip: 'MAGICAL PACKAGE',
                    detailUrl: 'dubai-tour-packages/tours/dubai-package-2/',
                },
                {
                    image: 'uploads/categories/y7acfjy1zi0t3c9rpn4ftogqxtwytpflgfocfmrq240905095417.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Dubai Package',
                    location: '6N Dubai',
                    price: '₹ 72,999',
                    originalPrice: '₹ 88,000',
                    strip: 'TRENDING PACKAGES',
                    detailUrl: 'dubai-tour-packages/tours/dubai-package-1/',
                },
            ]}
        />
    );
}
