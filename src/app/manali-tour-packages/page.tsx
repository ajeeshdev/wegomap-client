import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/j6cozrh2jgnksv5hsfoj9m6emdicmwtvtvqvnqu8240829050035.jpg',
        duration: '4 Nights 5 Days',
        title: 'Manali Package',
        location: 'Manali, Solang Valley, Rohtang Pass',
        price: '₹ 18,999',
        originalPrice: '₹ 20,100',
        detailUrl: 'trending/tours/manali-package/',
        strip: 'Trending'
    },
    {
        image: '/uploads/packages/j6cozrh2jgnksv5hsfoj9m6emdicmwtvtvqvnqu8240829050035.jpg',
        duration: '5 Nights 6 Days',
        title: 'Shimla Manali Package',
        location: 'Shimla, Manali',
        price: '₹ 18,999',
        originalPrice: '₹ 21,500',
        detailUrl: 'manali-tour-packages/'
    }
];

export default function ManaliTours() {
    return (
        <TourCategoryPage
            title="Manali Tour Packages"
            subtitle="Deep valleys and high mountain ranges"
            bannerImage="/uploads/categories/ofsorzqr2izti1rwgjqjaxxp4iws07ct9heovkwj220406065835.jpg"
            packages={packages}
            readMoreHeading="Explore the Beauty of Himachal"
            readMoreContent={
                <>
                    <p>Manali is one of the most popular hill stations in India, known for its stunning landscapes, snow-capped mountains, and adventure sports. Our Manali tour packages are designed to give you the best experience of this Himalayan paradise.</p>
                    <p>From the snow at Rohtang Pass to the serene Solang Valley and the ancient Hadimba Temple, we cover all the major attractions. We also offer customized packages for honeymooners and families.</p>
                </>
            }
        />
    );
}
