import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/dubai-package.jpg',
        duration: '3 Nights 4 Days',
        title: 'Dubai Package (3N)',
        location: 'City View, Marina',
        price: '₹ 38,900',
        originalPrice: '₹ 53,200',
        detailUrl: 'tours/dubai-package/'
    },
    {
        image: 'uploads/tours/dubai-tour-package.jpg',
        duration: '4 Nights 5 Days',
        title: 'Dubai Tour Package (4N)',
        location: 'Burj Khalifa, Desert Safari',
        price: '₹ 41,600',
        originalPrice: '₹ 56,600',
        detailUrl: 'tours/dubai-tour-package/',
        strip: 'Best Seller'
    },
    {
        image: 'uploads/tours/dubai-package-2.jpg',
        duration: '5 Nights 6 Days',
        title: 'Dubai Package (5N)',
        location: 'Dhow Cruise, City Tour',
        price: '₹ 44,800',
        originalPrice: '₹ 59,800',
        detailUrl: 'tours/dubai-package-2/'
    },
    {
        image: 'uploads/tours/dubai-package-1.jpg',
        duration: '6 Nights 7 Days',
        title: 'Dubai Package (6N)',
        location: 'Global Village, Miracle Garden',
        price: '₹ 50,400',
        originalPrice: '₹ 65,100',
        detailUrl: 'tours/dubai-package-1/',
        strip: 'Popular'
    }
];

export default function DubaiTours() {
    return (
        <TourCategoryPage
            title="Dubai Tour Packages"
            subtitle="Explore the futuristic city of gold"
            bannerImage="https://www.wegomap.com/uploads/categories/dubai-banner.jpg"
            packages={packages}
            readMoreHeading="Plan your Dubai Journey"
            readMoreContent={
                <>
                    <p>Dubai is a city of super-latives, from the world's tallest building, Burj Khalifa, to the largest shopping malls and stunning man-made islands. Our Dubai tour packages from Kochi and other cities offer a complete experience of this glamorous destination.</p>
                    <p>Whether it's a thrilling desert safari, a dinner on a traditional dhow cruise, or an evening at the spectacular fountain show, we ensure you don't miss any highlights. We also provide assistance with Dubai visas and air tickets.</p>
                </>
            }
        />
    );
}
