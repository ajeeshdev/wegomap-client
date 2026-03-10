import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/ooty-package.jpg',
        duration: '2 Nights 3 Days',
        title: 'Ooty Tour Packages',
        location: 'Ooty / Nilgiris',
        price: '₹ 14,599',
        originalPrice: '₹ 16,500',
        detailUrl: 'ooty-tour-packages/',
        strip: 'Popular'
    }
];

export default function OotyTours() {
    return (
        <TourCategoryPage
            title="Ooty Tour Packages"
            subtitle="The blue mountains"
            bannerImage="https://www.wegomap.com/uploads/categories/ooty-banner.jpg"
            packages={packages}
            readMoreHeading="A Refreshing Getaway to Ooty"
            readMoreContent={
                <>
                    <p>Ooty, also known as Udhagamandalam, is the most popular hill station in South India. Our Ooty tour packages take you through its sprawling tea gardens, beautiful botanical gardens, and scenic Ooty Lake.</p>
                    <p>Experience the heritage Nilgiri Mountain Railway (Toy Train) and enjoy the panoramic views from Doddabetta Peak. Wegomap ensures a memorable stay with the best hotel recommendations.</p>
                </>
            }
        />
    );
}
