import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/tours/sedan-taxi.jpg',
        duration: 'Multiple Days',
        title: 'SEDAN (Swift Dzire/Etios)',
        location: 'Kerala City & Outstation',
        price: '₹ 8,000',
        originalPrice: '₹ 9,500',
        detailUrl: 'kerala-taxi-service/',
        strip: 'Eco'
    },
    {
        image: '/uploads/tours/innova-taxi.jpg',
        duration: 'Multiple Days',
        title: 'INNOVA / INNOVA CRYSTA',
        location: 'Kerala City & Outstation',
        price: '₹ 11,000',
        originalPrice: '₹ 13,000',
        detailUrl: 'kerala-taxi-service/',
        strip: 'Best Value'
    },
    {
        image: '/uploads/tours/tempo-traveller.jpg',
        duration: 'Multiple Days',
        title: '9/12/17 SEATER TEMPO TRAVELLER',
        location: 'Kerala Group Tours',
        price: '₹ 14,500',
        originalPrice: '₹ 16,500',
        detailUrl: 'kerala-taxi-service/',
        strip: 'For Groups'
    }
];

export default function TaxiService() {
    return (
        <TourCategoryPage
            title="Kerala Taxi Service"
            subtitle="Reliable and safe travel solutions across Kerala"
            bannerImage="/uploads/categories/taxi-service-banner.jpg"
            packages={packages}
            readMoreHeading="Wegomap Taxi Services in Kochi"
            readMoreContent={
                <>
                    <p>Wegomap provides the most reliable and affordable taxi services in Kerala. Whether شما are looking for a simple airport transfer or a multi-day tour across God's Own Country, we have the right vehicle for you.</p>
                    <p>Our fleet includes well-maintained Sedans, SUVs like Innova Crysta, and spacious Tempo Travellers for larger groups. Our drivers are professional, multi-lingual, and experienced in navigating the scenic routes of Kerala.</p>
                </>
            }
        />
    );
}
