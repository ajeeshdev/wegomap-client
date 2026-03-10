import TourCategoryPage from '@/components/TourCategoryPage';

export default function RajasthanPage() {
    return (
        <TourCategoryPage
            title="Rajasthan Tour package"
            subtitle="Rajasthan Tour package"
            bannerImage="https://www.wegomap.com/uploads/categories/twhsfbqthmna28zogfp3kpedhqd692qv29cqe85u240904024319.jpg"
            bookCount={26}
            packages={[
                {
                    image: 'uploads/packages/pxckp21pd9jsmx7demeb2jbi7zgowvjuac5dbkys240904024249.png',
                    duration: '5 Nights 6 Days',
                    title: 'Rajasthan Tour Package',
                    location: '2N JAIPUR / 1N JODHPUR / 2N UDAIPUR',
                    price: '₹ 21,999',
                    originalPrice: '₹ 29,000',
                    strip: 'Best Summer Plan',
                    detailUrl: 'tours/5n6d-rajasthan-tour-package/',
                },
            ]}
        />
    );
}
