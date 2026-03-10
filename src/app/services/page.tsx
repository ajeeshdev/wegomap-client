import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        title: 'Tour Packages',
        desc: 'Customized domestic and international tour plans tailored to your budget and preferences.',
        icon: '🌴',
        link: '/packages'
    },
    {
        title: 'Corporate Events',
        desc: 'Professional event management in Kochi for product launches, conferences, and team-building.',
        icon: '🤝',
        link: '/corporate-event-management-company-kochi'
    },
    {
        title: 'Hotel Booking',
        desc: 'Partnered with over 500+ handpicked hotels across India to provide you the best stays.',
        icon: '🏨',
        link: '/contact'
    },
    {
        title: 'Flight Booking',
        desc: 'Instant flight tickets for domestic and international sectors at competitive rates.',
        icon: '✈️',
        link: '/contact'
    },
    {
        title: 'Visa Assistance',
        desc: 'Hassle-free visa processing for major tourist destinations including UAE, Thailand, and Europe.',
        icon: '🛂',
        link: '/contact'
    },
    {
        title: 'Taxi Service',
        desc: 'Reliable and safe taxi services across Kerala with experienced multi-lingual drivers.',
        icon: '🚕',
        link: '/kerala-taxi-service'
    }
];

export default function ServicesPage() {
    return (
        <div className="servicesPage">
            <section className="servicesBanner">
                <div className="servicesBannerImg">
                    <Image
                        src="https://www.wegomap.com/uploads/categories/services-banner.jpg"
                        alt="Our Services"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="servicesOverlay" />
                </div>
                <div className="servicesBannerContent">
                    <h1 className="servicesTitle">Our Services</h1>
                    <p className="servicesSub">Comprehensive Solutions for All Your Travel Needs</p>
                </div>
            </section>

            <section className="servicesGridSection">
                <div className="homeContainer">
                    <div className="servicesGrid">
                        {services.map((s, i) => (
                            <div key={i} className="serviceCard">
                                <span className="serviceIcon">{s.icon}</span>
                                <h2 className="serviceCardTitle">{s.title}</h2>
                                <p className="serviceCardDesc">{s.desc}</p>
                                <Link href={s.link} className="serviceLink">
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="servicesCTA">
                <div className="homeContainer">
                    <div className="servicesCTABox">
                        <h2>Need a custom solution?</h2>
                        <p>Talk to our experts today and let us help you plan your next big event or trip.</p>
                        <Link href="/contact" className="servicesEnquire">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
