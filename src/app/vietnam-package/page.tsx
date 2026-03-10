import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/budgeted-vietnam-package.jpg',
        duration: '3 Nights 4 Days',
        title: 'Budgeted Vietnam',
        location: 'Hanoi, Halong Bay',
        price: '₹ 18,500',
        originalPrice: '₹ 20,500',
        detailUrl: 'tours/budgeted-vietnam-package/',
        strip: 'Best Value'
    },
    {
        image: 'uploads/tours/basic-vietnam-package.jpg',
        duration: '3 Nights 4 Days',
        title: 'Basic Vietnam',
        location: 'Hanoi, Ninh Binh',
        price: '₹ 20,500',
        originalPrice: '₹ 22,500',
        detailUrl: 'tours/basic-vietnam-package/'
    },
    {
        image: 'uploads/tours/magical-vietnam-package.jpg',
        duration: '4 Nights 5 Days',
        title: 'Magical Vietnam',
        location: 'Da Nang, Hoi An',
        price: '₹ 28,500',
        originalPrice: '₹ 30,500',
        detailUrl: 'tours/magical-vietnam-package/',
        strip: 'Trending'
    },
    {
        image: 'uploads/tours/fabulous-vietnam-package.jpg',
        duration: '5 Nights 6 Days',
        title: 'Fabulous Vietnam',
        location: 'Ho Chi Minh City, Mekong Delta',
        price: '₹ 35,500',
        originalPrice: '₹ 38,500',
        detailUrl: 'tours/fabulous-vietnam-package/'
    },
    {
        image: 'uploads/tours/popular-vietnam-package.jpg',
        duration: '6 Nights 7 Days',
        title: 'Popular Vietnam',
        location: 'Hanoi, Sapa, Halong Bay',
        price: '₹ 38,500',
        originalPrice: '₹ 42,500',
        detailUrl: 'tours/popular-vietnam-package/'
    },
    {
        image: 'uploads/tours/charming-vietnam.jpg',
        duration: '7 Nights 8 Days',
        title: 'Charming Vietnam',
        location: 'North & Central Vietnam',
        price: '₹ 40,500',
        originalPrice: '₹ 44,500',
        detailUrl: 'tours/charming-vietnam/',
        strip: 'Premium'
    }
];

export default function VietnamTours() {
    return (
        <TourCategoryPage
            title="Vietnam Package"
            subtitle="Discover the timeless charm of Vietnam"
            bannerImage="https://www.wegomap.com/uploads/categories/vietnam-banner.jpg"
            packages={packages}
            readMoreHeading="Explore Vietnam with Wegomap"
            readMoreContent={
                <>
                    <p>Vietnam is a country of breathtaking natural beauty and incredible cultural heritage. Our Vietnam tour packages from Kochi and Kerala offer a perfectly balanced itinerary covering the best of North, Central, and South Vietnam.</p>
                    <p>Cruise through the limestone pillars of Halong Bay, explore the historic streets of Hanoi and Hoi An, and experience the vibrant life of Ho Chi Minh City. We provide customized plans that include local stays, authentic meals, and expert-guided tours.</p>
                </>
            }
        />
    );
}
