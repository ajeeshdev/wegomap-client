import Link from 'next/link';
import Image from 'next/image';
import { Ship, Star, Award, Map, Anchor } from 'lucide-react';

const cruiseOptions = [
    {
        title: 'Largest Fleet in the World',
        desc: 'Royal Caribbean Cruise proudly operates 29 ships, with Utopia of the Seas launching in July 2024.',
        number: '01',
        icon: <Anchor size={32} />
    },
    {
        title: 'Celebrity Cruises',
        desc: '15 ships including 4 Edge Class vessels, redefining modern luxury at sea.',
        number: '02',
        icon: <Star size={32} />
    },
    {
        title: 'Azamara Luxury Fleet',
        desc: '4 boutique-style luxury ships: Quest, Journey, Pursuit & Onward, designed for immersive travel experiences.',
        number: '03',
        icon: <Ship size={32} />
    },
    {
        title: 'Silversea Yachts',
        desc: '11 ultra-luxury, yacht-like cruise ships. Silver Ray joins the fleet in 2024 for next-level opulence.',
        number: '04',
        icon: <Ship size={32} />
    },
    {
        title: 'Global Destinations',
        desc: 'Explore over 300 destinations worldwide, from tropical islands to cultural capitals.',
        number: '05',
        icon: <Map size={32} />
    },
    {
        title: '24/7 Concierge Support',
        desc: 'Unparalleled personal service, ensuring unforgettable cruise experiences from start to finish.',
        number: '06',
        icon: <Award size={32} />
    }
];

export default function CruisePackagesPage() {
    return (
        <div className="infoPageWrapper">
            <section className="infoPageBanner">
                <div className="infoBannerImg">
                    <Image
                        src="/uploads/categories/kenl2oft3a7ktbcvoTO8SQYucDDNMiWvx6DeaIEk240827110728.jpg"
                        alt="Cruise Packages"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="infoBannerOverlay" />
                </div>
                <div className="infoBannerContent">
                    <h1 className="infoTitle">Cruise Packages</h1>
                    <p className="infoSubtitle">Discover Luxury on the Sea</p>
                </div>
            </section>

            <section className="infoBodySection">
                <div className="infoContainer">
                    <center>
                        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                            <h2 className="infoLeadText" style={{ color: '#0f172a', fontWeight: '800', fontSize: '2rem', marginBottom: '1rem' }}>Our Cruise Services</h2>
                            <p className="infoTextRow" style={{ color: '#475569', fontSize: '1.25rem' }}>
                                Unforgettable journeys on world-class cruise ships. Embark on an adventure unlike any other across exotic destinations globe-wide.
                            </p>
                            <br />
                            <Link href="/contact" style={{ background: '#FFD52B', color: '#000', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none' }}>
                                Enquire Now
                            </Link>
                        </div>
                    </center>

                    <h2 className="infoLeadText" style={{ color: '#0f172a', fontWeight: '800', fontSize: '1.8rem', marginBottom: '1rem' }}>Royal Caribbean Cruise Highlights</h2>
                    <div className="infoGrid">
                        {cruiseOptions.map((opt, i) => (
                            <div key={i} className="infoCard">
                                <div className="infoCardNumber">{opt.number}</div>
                                <div className="infoCardIcon">{opt.icon}</div>
                                <h3 className="infoCardTitle">{opt.title}</h3>
                                <p className="infoCardDesc">{opt.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
