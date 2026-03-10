import TourCategoryPage from '@/components/TourCategoryPage';

export default function LakshadweepPage() {
    return (
        <TourCategoryPage
            title="Lakshadweep Tour Package"
            subtitle="3N Agatti island"
            bannerImage="https://www.wegomap.com/uploads/categories/vjy7xslqm4mc1yqd6utmyochqman4xalxjfiyzoa240820042745.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/packages/rqeuFriCXbjmlMkRh6UmXGJka06Jt1bLAWQFexJD240821035047.jpeg',
                    duration: '3 Nights 4 Days',
                    title: 'Lakshadweep Package',
                    location: '3N Agatti island',
                    price: '₹ 22,999',
                    originalPrice: '₹ 24,500',
                    strip: 'Best Selling Packages',
                    detailUrl: 'tours/lakshadweep-package/',
                },
            ]}
            readMoreHeading="EXPLORE LAKSHADWEEP ISLANDS"
            readMoreContent={
                <p>Lakshadweep Islands, a tropical archipelago in the Arabian Sea, is a hidden gem waiting to be explored.</p>
            }
        />
    );
}
