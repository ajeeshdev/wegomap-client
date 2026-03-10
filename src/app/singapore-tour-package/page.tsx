import TourCategoryPage from '@/components/TourCategoryPage';

export default function SingaporePage() {
    return (
        <TourCategoryPage
            title="Singapore Tour Package"
            subtitle="Singapore Tour Package"
            bannerImage="https://www.wegomap.com/uploads/categories/KENL2OFT3a7kTbcVoTO8SQYucDDNMiWvx6DeaIEk240827110728.jpg"
            bookCount={28}
            packages={[
                {
                    image: 'uploads/packages/UyAaRcBgpPlkxEK3RrWnka7GXHewlsUUSR01LFce240827051128.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Singapore Tour Package',
                    location: '3N Singapore',
                    price: '₹ 40,999',
                    originalPrice: '₹ 45,000',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/singapore-tour-package/',
                },
                {
                    image: 'uploads/packages/jyky2rsv6qbalqwelupkbrpng8vrykhooekvnvz0240828045640.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Singapore Tour Package',
                    location: '4N Singapore',
                    price: '₹ 57,999',
                    originalPrice: '₹ 63,000',
                    strip: 'Best Summer Plan',
                    detailUrl: 'tours/singapore-tour-package-1/',
                },
            ]}
        />
    );
}
