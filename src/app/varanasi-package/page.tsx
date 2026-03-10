import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: 'uploads/tours/varanasi.jpg',
        duration: '3 Nights 4 Days',
        title: 'Varanasi Package',
        location: 'Varanasi, Ayodhya',
        price: '₹ 21,999',
        originalPrice: '₹ 23,900',
        detailUrl: 'varanasi-package/',
        strip: 'Spiritual'
    }
];

export default function VaranasiTours() {
    return (
        <TourCategoryPage
            title="Varanasi Package"
            subtitle="The spiritual capital of India"
            bannerImage="https://www.wegomap.com/uploads/categories/varanasi-banner.jpg"
            packages={packages}
            readMoreHeading="A Spiritual Journey to Varanasi & Ayodhya"
            readMoreContent={
                <>
                    <p>Varanasi and Ayodhya are two of the most sacred cities in India. Our Varanasi tour package offers a deeply spiritual experience, taking you through the ancient ghats of the Ganges and the historic temples of Ayodhya.</p>
                    <p>Experience the mesmerising Ganga Aarti in the evening, enjoy a boat ride at sunrise, and explore the rich cultural heritage of one of the world's oldest continuously inhabited cities. Wegomap ensures a comfortable and well-guided spiritual tour.</p>
                </>
            }
        />
    );
}
