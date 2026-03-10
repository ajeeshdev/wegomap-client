import TourCategoryPage from '@/components/TourCategoryPage';

export default function VietnamPage() {
    return (
        <TourCategoryPage
            title="Vietnam Package"
            subtitle="Vietnam"
            bannerImage="https://www.wegomap.com/uploads/categories/6f5f3mvihdthwolvbykh1fxl0nbavck38y47ubvs250605123703.jpg"
            bookCount={30}
            packages={[
                {
                    image: 'uploads/packages/7J1QWWJ0sjoMbiKxSyAxxtIQgWgPeauAN0sLEU7a250527121157.jpeg',
                    duration: '3 Nights 4 Days',
                    title: 'Budgeted Vietnam',
                    location: '2N Hanoi - 1N Saigon',
                    price: '₹ 18,500',
                    originalPrice: '₹ 20,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/budgeted-vietnam-package/',
                },
                {
                    image: 'uploads/packages/LbdQh1glU8sAHOeRv6CziNxX5ABPavpMW3dp6J5f250527123910.jpeg',
                    duration: '3 Nights 4 Days',
                    title: 'Basic Vietnam',
                    location: '1N Halong - 2N Ninh Binh',
                    price: '₹ 20,500',
                    originalPrice: '₹ 22,500',
                    strip: 'Special Packages',
                    detailUrl: 'tours/basic-vietnam-package/',
                },
                {
                    image: 'uploads/packages/5lxwwbdd0mh4yklmgl5kfizrzumz99exjffdhnpj250603054551.jpg',
                    duration: '4 Nights 5 Days',
                    title: 'Magical Vietnam',
                    location: '3N Nha trang - 1N Saigon',
                    price: '₹ 28,500',
                    originalPrice: '₹ 30,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/magical-vietnam-package/',
                },
                {
                    image: 'uploads/packages/oskhdoun5lxwuoqzmh3p7u5bgs1ghwg5ofeqocky250603055959.jpg',
                    duration: '5 Nights 6 Days',
                    title: 'Fabulous Vietnam',
                    location: '3N Hanoi - 2N Hochiminh',
                    price: '₹ 35,500',
                    originalPrice: '₹ 38,500',
                    strip: 'Best Seller',
                    detailUrl: 'tours/fabulous-vietnam-package/',
                },
                {
                    image: 'uploads/packages/yul08VVfF0hPMk6d0YHIfKXkKyos5Bvpw6c2VYEV250527031610.jpg',
                    duration: '6 Nights 7 Days',
                    title: 'Popular Vietnam',
                    location: '2N Hanoi - 2N Sapa - 2N Danag',
                    price: '₹ 38,500',
                    originalPrice: '₹ 42,500',
                    strip: 'Trending Packages',
                    detailUrl: 'tours/popular-vietnam-package/',
                },
                {
                    image: 'uploads/packages/9qvmqhqgvhvl5ai2jd2vernedifnqeivdxdgaldk250603061801.jpg',
                    duration: '7 Nights 8 Days',
                    title: 'Charming Vietnam',
                    location: '2N Siem Reip - 3N Hanoi - 2N Danag',
                    price: '₹ 40,500',
                    originalPrice: '₹ 44,500',
                    strip: 'Wegomap Choice',
                    detailUrl: 'tours/charming-vietnam/',
                },
            ]}
        />
    );
}
