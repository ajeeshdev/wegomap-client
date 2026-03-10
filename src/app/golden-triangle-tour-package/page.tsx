import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/golden-triangle.jpg',
        duration: '5 Nights 6 Days',
        title: 'Golden Triangle Package',
        location: 'Delhi, Agra, Jaipur',
        price: '₹ 23,999',
        originalPrice: '₹ 25,950',
        detailUrl: 'golden-triangle-tour-package/',
        strip: 'Culture'
    }
];

export default function GoldenTriangleTours() {
    return (
        <TourCategoryPage
            title="Golden Triangle Tour Package"
            subtitle="Explore the historic heart of India"
            bannerImage="https://www.wegomap.com/uploads/categories/golden-triangle-banner.jpg"
            packages={packages}
            readMoreHeading="India's Iconic Golden Triangle"
            readMoreContent={
                <>
                    <p>The Golden Triangle is the most popular tourist circuit in India, connecting the capital city of Delhi, the city of Taj Mahal - Agra, and the vibrant Pink City of Jaipur.</p>
                    <p>Witness the architectural brilliance of the Mughals and the Rajputs. Our package covers all the major landmarks including the Red Fort, India Gate, Taj Mahal, and Amer Fort. Wegomap provides premium guides and comfortable stays for this cultural journey.</p>
                </>
            }
        />
    );
}
