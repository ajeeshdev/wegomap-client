import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Building, Plane, Globe, MapPin, Anchor } from 'lucide-react';

const services = [
    {
        title: 'Tour Packages',
        desc: 'We can plan holidays to the destinations around the world tailored to your budget and preferences.',
        icon: <Globe size={32} />,
        link: '/domestic-international-packages',
        number: '01'
    },
    {
        title: 'Events',
        desc: 'We can host events with your family, friends or colleagues at any destination. Professional event management in Kochi for product launches, conferences, and celebrations.',
        icon: <Briefcase size={32} />,
        link: '/corporate-event-management-company-kochi',
        number: '02'
    },
    {
        title: 'Hotels',
        desc: 'We have good relationship in between so many resorts and hotels across India to provide you the best stays.',
        icon: <Building size={32} />,
        link: '/contact',
        number: '03'
    },
    {
        title: 'Flights',
        desc: 'We can book domestic and international flights with our professional Ticketing team at competitive rates.',
        icon: <Plane size={32} />,
        link: '/contact',
        number: '04'
    },
    {
        title: 'Visa',
        desc: 'We can provide you Tourist Visa assistance for major destinations including UAE, Thailand, and Europe.',
        icon: <MapPin size={32} />,
        link: '/contact',
        number: '05'
    },
    {
        title: 'Cruises',
        desc: 'Unforgettable journeys on world-class cruise ships. Experience luxury at sea with our premium cruise packages.',
        icon: <Anchor size={32} />,
        link: '/cruise-packages',
        number: '06'
    }
];

export default function ServicesPage() {
    return (
        <div className="infoPageWrapper">
            {/* Banner Section */}
            <section className="infoPageBanner">
                <div className="infoBannerImg">
                    <Image
                        src="/uploads/categories/xivejtmsap5g34sse6prhfkyykvxzhw9lanygtbt240905034008.jpg"
                        alt="Our Services"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="infoBannerOverlay" />
                </div>
                <div className="infoBannerContent">
                    <h1 className="infoTitle">Our Services</h1>
                    <p className="infoSubtitle">Traveling – It leaves you speechless, then turns you into a storyteller.</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="infoBodySection">
                <div className="infoContainer">
                    <center>
                        <p className="infoLeadText">
                            Wegomap offers comprehensive solutions for all your travel needs. From booking your initial transport to finding the perfect accommodation, our dedicated team manages everything so you can focus on building beautiful memories.
                        </p>
                    </center>

                    <div className="infoGrid">
                        {services.map((s, i) => (
                            <div key={i} className="infoCard">
                                <Link href={s.link} style={{ display: 'block', textDecoration: 'none' }}>
                                    <div className="infoCardNumber">{s.number}</div>
                                    <div className="infoCardIcon">{s.icon}</div>
                                    <h2 className="infoCardTitle">{s.title}</h2>
                                    <p className="infoCardDesc">{s.desc}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
