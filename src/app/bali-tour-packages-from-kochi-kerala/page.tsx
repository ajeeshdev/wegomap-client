import TourCategoryPage from '@/components/TourCategoryPage';

export default function BaliPage() {
    return (
        <TourCategoryPage
            title="Bali Tour Packages"
            subtitle="Bali Holidays"
            bannerImage="https://www.wegomap.com/uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Bali Budget Tour Plan',
                    location: '3N Bali',
                    price: '₹ 32,999',
                    originalPrice: '₹ 40,000',
                    strip: 'WEGOMAP CHOICE',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/bali-tour-plan/',
                },
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Bali Tour Package',
                    location: '4N Bali',
                    price: '₹ 42,999',
                    originalPrice: '₹ 51,000',
                    strip: 'BEST SUMMER PLAN',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/4n5d-bali-tour-package/',
                },
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Bali Standard tour',
                    location: '5N Bali',
                    price: '₹ 49,999',
                    originalPrice: '₹ 60,000',
                    strip: 'BEST SELLING PACKAGES',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/bali-tour-package-1/',
                },
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Bali Premium Package',
                    location: '5N Bali',
                    price: '₹ 55,999',
                    originalPrice: '₹ 66,000',
                    strip: 'TRENDING',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/bali-package/',
                },
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Bali Premium Package',
                    location: '4N5D Bali',
                    price: '₹ 48,999',
                    originalPrice: '₹ 58,000',
                    strip: 'BEST SUMMER PLAN',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/4n5d-bali-tour-package-premium/',
                },
                {
                    image: 'uploads/categories/OxYqjL0LqhZkWDzbrEPHes80B62ydktSv747gXm0240827104701.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Bali Premium Tour Package',
                    location: '6N Bali',
                    price: '₹ 62,999',
                    originalPrice: '₹ 75,000',
                    detailUrl: 'bali-tour-packages-from-kochi-kerala/tours/bali-tour-package/',
                },
            ]}
        />
    );
}
