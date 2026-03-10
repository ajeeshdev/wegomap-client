import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/OVelXuVa9Ge2qLrMY1o1mfCD1n7qiYDQ9LJWeqos250527122712.webp',
        duration: '4 Nights 5 Days',
        title: 'Stunning Andaman',
        location: 'Port Blair, Havelock Island',
        price: '₹ 25,000',
        originalPrice: '₹ 28,000',
        detailUrl: 'andaman-packages/'
    },
    {
        image: '/uploads/packages/OVelXuVa9Ge2qLrMY1o1mfCD1n7qiYDQ9LJWeqos250527122712.webp',
        duration: '6 Nights 7 Days',
        title: '6N Andaman',
        location: 'Port Blair, Havelock, Neil Island',
        price: '₹ 30,999',
        originalPrice: '₹ 34,000',
        detailUrl: 'andaman-packages/',
        strip: 'Popular'
    }
];

export default function AndamanTours() {
    return (
        <TourCategoryPage
            title="Andaman Packages"
            subtitle="Explore the emerald islands of India"
            bannerImage="/uploads/categories/x8mupizywhx0lbujzpvsk6qrznf18bixirysodea240904050124.jpg"
            packages={packages}
            readMoreHeading="Plan your Andaman Getaway"
            readMoreContent={
                <>
                    <p>Andaman and Nicobar Islands are a dream destination for beach lovers and water sports enthusiasts. Our Andaman tour packages offer a perfect mix of history, adventure, and relaxation.</p>
                    <p>Visit the historic Cellular Jail, relax on the world-famous Radhanagar Beach in Havelock, and explore the coral reefs of Neil Island. We provide complete packages including ferry transfers, hotel stays, and sightseeing tours.</p>
                </>
            }
        />
    );
}
