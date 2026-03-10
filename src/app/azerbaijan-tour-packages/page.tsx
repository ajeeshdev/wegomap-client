import TourCategoryPage from '@/components/TourCategoryPage';

export default function AzerbaijanPage() {
    return (
        <TourCategoryPage
            title="Azerbaijan Tour Packages"
            subtitle="3N 4D"
            bannerImage="https://www.wegomap.com/uploads/categories/twlgefqv2zwvq2gs99ix4ozzi3n9r41z9xbotxid250131024536.jpg"
            bookCount={26}
            packages={[
                {
                    image: 'uploads/packages/bngpjquzmy5datq8m8jfqwb8fgk5lprdnfefmbn3250131025302.jpg',
                    duration: '3 Nights 4 Days',
                    title: 'Budgeted Azerbaijan',
                    location: '3 Nights Baku',
                    price: '₹ 31,000',
                    originalPrice: '₹ 33,000',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/azerbaijan-tour-packages/',
                },
                {
                    image: 'uploads/packages/jp9ooiwngbh8movmdimg17ub2uzgpbpk1gkzieiv250203034840.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Peaceful Azerbaijan',
                    location: '4 Nights Baku',
                    price: '₹ 33,000',
                    originalPrice: '₹ 35,000',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/azerbaijan/',
                },
                {
                    image: 'uploads/packages/aimiy5pemefnkwre8qabxdtffsbhyleibck3xs92250131032303.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'charming Azerbaijan',
                    location: '4 Nights Baku',
                    price: '₹ 37,500',
                    originalPrice: '₹ 39,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/azerbaijan-tour-packages-3/',
                },
                {
                    image: 'uploads/packages/jqhwd7bmbliq4lkzlzp6ukvxmouljd5pufkrhnkn250131031610.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Magical Azerbaijan',
                    location: '5 Nights Baku',
                    price: '₹ 38,500',
                    originalPrice: '₹ 40,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/azerbaijan-tour-packages-1/',
                },
                {
                    image: 'uploads/packages/lfmcnumcedxxbxva70zglvqdljjqk7pjytkrwtyb250131031148.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Amazing Azerbaijan',
                    location: '5 Nights Baku',
                    price: '₹ 44,500',
                    originalPrice: '₹ 46,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/azerbaijan-tour-packages-2/',
                },
            ]}
        />
    );
}
