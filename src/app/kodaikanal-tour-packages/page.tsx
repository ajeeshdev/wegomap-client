import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/zz78tl2qmhwn8woqay4nx44kn3c6nj9bdbfqq11u240906103238.jpg',
        duration: '2 Nights 3 Days',
        title: 'Kodaikanal Tour Packages',
        location: 'Kodaikanal',
        price: '₹ 11,500',
        originalPrice: '₹ 13,000',
        detailUrl: 'kodaikanal-tour-packages/',
        strip: 'Popular'
    }
];

export default function KodaikanalTours() {
    return (
        <TourCategoryPage
            title="Kodaikanal Tour Packages"
            subtitle="The gift of the forest"
            bannerImage="/uploads/categories/umwfsgcys5bekqzaaga7nsholfjuuhiqvnal5r4o240905034708.jpg"
            packages={packages}
            readMoreHeading="A Refreshing Trip to Kodaikanal"
            readMoreContent={
                <>
                    <p>Kodaikanal is a beautiful hill station in Tamil Nadu, known for its cool climate, scenic lakes, and diverse flora. It's a perfect destination for honeymooners and families looking for a peaceful getaway.</p>
                    <p>Enjoy boating in Kodaikanal Lake, visit the Coaker's Walk for stunning valley views, and explore the unique Pillar Rocks. Our packages offer a relaxed itinerary with the best hotel options.</p>
                </>
            }
        />
    );
}
