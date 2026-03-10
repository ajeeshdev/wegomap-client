import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/sy0vagizrdt3llotbebojqwemftmafovkq0umv8s220406032045.jpg',
        duration: '2N Munnar / 1N Houseboat',
        title: '3N4D Kerala Standard Honeymoon',
        location: 'Munnar, Alleppey',
        price: '₹ 13,999',
        originalPrice: '₹ 14,500',
        detailUrl: 'kerala-tour-packages/tours/3n4d-kerala-honeymoon-package/',
        strip: 'Best Seller'
    },
    {
        image: '/uploads/packages/cyf2pdk4hgscfe1ycccv9vomyxa2ouxijfumcvet220406031111.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Houseboat',
        title: '4N5D Kerala Romantic Honeymoon',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 17,999',
        originalPrice: '₹ 20,000',
        detailUrl: 'kerala-tour-packages/tours/5-days-4-night-kerala-package/',
        strip: 'Romantic'
    },
    {
        image: '/uploads/packages/rsz2kjlf4gfysupoyaqzjgsug665nqxnjcgapu71220406030620.jpg',
        duration: '2N Munnar / 1N Houseboat',
        title: '3N4D Kerala Budget Honeymoon',
        location: 'Munnar, Alleppey',
        price: '₹ 11,999',
        originalPrice: '₹ 13,500',
        detailUrl: 'kerala-tour-packages/tours/4-days-3-night-kerala-package/'
    },
    {
        image: '/uploads/packages/qfhrulmsizm7j0pr8zsw7moxvjs7kcerxcppvmll220406033026.jpg',
        duration: '1N Cherai / 2N Munnar / 1N Thekkady',
        title: '5N6D Kerala Beach Plan',
        location: 'Cherai, Munnar, Thekkady',
        price: '₹ 14,999',
        originalPrice: '₹ 17,000',
        detailUrl: 'kerala-tour-packages/tours/5n6d-kerala-honeymoon-pacakge/'
    },
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Houseboat',
        title: '4N5D Kerala Premium Private Pool',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 23,899',
        originalPrice: '₹ 25,700',
        detailUrl: 'kerala-tour-packages/tours/4n5d-kerala-premium-private-pool-package/',
        strip: 'Premium'
    }
];

export default function HoneymoonTours() {
    return (
        <TourCategoryPage
            title="Kerala Honeymoon Packages"
            subtitle="Plan your romantic getaway in God's Own Country"
            bannerImage="/uploads/categories/ubqf5mc4ve1g6yqwmnsyiyek9fkld9akyp6g2lar220406065334.jpg"
            packages={packages}
            readMoreHeading="Romantic Kerala Honeymoon Trips"
            readMoreContent={
                <>
                    <p>Experience the most romantic moments of your life with our specially curated Kerala honeymoon packages. From the misty hills of Munnar to the serene backwaters of Alleppey, we offer the perfect setting for your love story.</p>
                    <p>Our packages include romantic candle-lit dinners, flower decorations, and stays in premium resorts and houseboats. We ensure that every detail of your honeymoon is handled with care so you can focus on making memories.</p>
                </>
            }
        />
    );
}
