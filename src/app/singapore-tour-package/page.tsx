import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/jyky2rsv6qbalqwelupkbrpng8vrykhooekvnvz0240828045640.jpg',
        duration: '3 Nights 4 Days',
        title: 'Singapore Tour Package (3N Singapore)',
        location: 'Sentosa, City Tour',
        price: '₹ 40,999',
        originalPrice: '₹ 45,000',
        detailUrl: 'singapore-tour-package/'
    },
    {
        image: '/uploads/packages/jyky2rsv6qbalqwelupkbrpng8vrykhooekvnvz0240828045640.jpg',
        duration: '4 Nights 5 Days',
        title: 'Singapore Tour Package (4N Singapore)',
        location: 'Universal Studios, Gardens by the Bay',
        price: '₹ 57,999',
        originalPrice: '₹ 63,000',
        detailUrl: 'singapore-tour-package/',
        strip: 'Best Seller'
    }
];

export default function SingaporeTours() {
    return (
        <TourCategoryPage
            title="Singapore Tour Package"
            subtitle="The lion city awaits you"
            bannerImage="/uploads/categories/KENL2OFT3a7kTbcVoTO8SQYucDDNMiWvx6DeaIEk240827110728.jpg"
            packages={packages}
            readMoreHeading="Modern Singapore Experience"
            readMoreContent={
                <>
                    <p>Singapore is a world-class destination that offers a perfect blend of modern architecture, lush greenery, and exciting attractions. Our Singapore tour packages are ideal for families and honeymooners alike.</p>
                    <p>Visit the stunning Gardens by the Bay, have a blast at Universal Studios Singapore, and explore the vibrant shopping districts. We provide complete packages including visas, flights, and premium stays.</p>
                </>
            }
        />
    );
}
