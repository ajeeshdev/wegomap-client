import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/deluxe-houseboat.jpg',
        duration: '1 Night / 21 Hours',
        title: 'Deluxe Houseboat',
        location: 'Alleppey / Kumarakom',
        price: '₹ 15,999',
        originalPrice: '₹ 18,000',
        detailUrl: 'kerala-alleppey-boat-house/',
        strip: 'Popular'
    },
    {
        image: 'uploads/tours/premium-houseboat.jpg',
        duration: '1 Night / 21 Hours',
        title: 'Premium Houseboat',
        location: 'Alleppey Backwaters',
        price: '₹ 20,999',
        originalPrice: '₹ 23,000',
        detailUrl: 'kerala-alleppey-boat-house/',
        strip: 'Top Rated'
    },
    {
        image: 'uploads/tours/luxury-houseboat.jpg',
        duration: '1 Night / 21 Hours',
        title: 'Luxury Houseboat',
        location: 'Alleppey / Kumarakom',
        price: '₹ 25,999',
        originalPrice: '₹ 28,000',
        detailUrl: 'kerala-alleppey-boat-house/',
        strip: 'Exclusive'
    }
];

export default function BoatHouse() {
    return (
        <TourCategoryPage
            title="Kerala Alleppey Boat House"
            subtitle="Cruise through the serene backwaters"
            bannerImage="https://www.wegomap.com/uploads/categories/houseboat-banner.jpg"
            packages={packages}
            readMoreHeading="Houseboat Packages in Alleppey"
            readMoreContent={
                <>
                    <p>Experience the magic of Kerala backwaters with our Alleppey houseboat packages. A stay in a traditional Kettuvallam (houseboat) is a must-do experience when visiting God's Own Country.</p>
                    <p>Our houseboats range from Deluxe to Luxury, all equipped with modern amenities, attached bathrooms, and an on-board chef who will serve you authentic Kerala cuisine. Enjoy the beautiful views of paddy fields, coconut groves, and local life as you cruise through the canals.</p>
                </>
            }
        />
    );
}
