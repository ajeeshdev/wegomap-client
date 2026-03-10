import TourCategoryPage, { TourPackage } from '@/components/TourCategoryPage';

const packages: TourPackage[] = [
    {
        image: '/uploads/packages/dw03erik9i4urenemjauu0deqjpcxjf4dsvsaejq220406030155.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Houseboat',
        title: '4N5D Kerala Family Package',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 19,799',
        originalPrice: '₹ 21,700',
        detailUrl: 'kerala-tour-packages/tours/4n5d-kerala-honeymoon-package/',
        strip: 'Best for Family'
    },
    {
        image: '/uploads/packages/tctld65d4pjbk5tipatqzm302pzzgx9l6vbxqf5v220406034142.jpg',
        duration: '2N Munnar / 1N Thekkady / 2N Kovalam',
        title: '6N7D Kerala Complete Plan',
        location: 'Munnar, Thekkady, Kovalam, Alleppey',
        price: '₹ 21,899',
        originalPrice: '₹ 24,500',
        detailUrl: 'kerala-tour-packages/tours/6n7d-kerala-budget-tour-package/'
    },
    {
        image: '/uploads/packages/jnjaha72rrtbo4dafxxt9gftp2nsqoaecncm136c220406035704.jpg',
        duration: '1N Athirapilly / 2N Munnar / 2N Kovalam',
        title: '7N8D Kerala Premium Holiday',
        location: 'Athirapilly, Munnar, Kovalam, Thekkady',
        price: '₹ 43,999',
        originalPrice: '₹ 46,000',
        detailUrl: 'kerala-tour-packages/tours/7n8d-kerala-tour-package/',
        strip: 'Premium'
    },
    {
        image: '/uploads/packages/rTyOuCPG9NxzaC3QrYXuqrJ6EE1uxfPijXWaXQyX221128120851.jpg',
        duration: '2N Munnar / 1N Thekkady / 1N Aleppey',
        title: 'Kerala Season Plan',
        location: 'Munnar, Thekkady, Alleppey',
        price: '₹ 10,999',
        originalPrice: '₹ 12,550',
        detailUrl: 'kerala-tour-packages/tours/kerala-season-plan/'
    }
];

export default function FamilyTours() {
    return (
        <TourCategoryPage
            title="Kerala Family Tour Packages"
            subtitle="Perfect holidays for you and your loved ones"
            bannerImage="/uploads/categories/o6xdubpsa3zfofx28b8iqnzym9zajlm3uau8ouuu220406065405.jpg"
            packages={packages}
            readMoreHeading="Memorable Family Holidays in Kerala"
            readMoreContent={
                <>
                    <p>Create lasting memories with your family with our custom-designed Kerala family tour packages. We offer child-friendly itineraries, comfortable group accommodations, and spacious vehicles to ensure everyone has a great time.</p>
                    <p>Our family packages include visits to wildlife sanctuaries, amusement parks like Wonderla, beach activities, and cultural shows. We focus on providing a balanced mix of adventure, relaxation, and learning for all age groups.</p>
                </>
            }
        />
    );
}
