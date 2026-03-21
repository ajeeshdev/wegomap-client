import Link from 'next/link';
import Image from 'next/image';
import { Ship, Star, Award, Map, Anchor } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

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
        <div className="cruisePackagesPage">
            <DynamicPageBanner
                fallbackTitle="Cruise Packages"
                fallbackSubtitle="Discover Luxury on the Sea"
                fallbackPreTitle="Luxury Voyages"
                fallbackImage="/uploads/categories/kenl2oft3a7ktbcvoTO8SQYucDDNMiWvx6DeaIEk240827110728.jpg"
                breadcrumbs={[{ label: 'Cruise Packages' }]}
            />

            <section className="infoBodySection">
                <div className="homeContainer">
                    <center>
                        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                            <div className="headerSection">
                                <span className="subTitle">Sea Voyages</span>
                                <h2>Our Cruise <span>Services.</span></h2>
                                <p className="description">
                                    Unforgettable journeys on world-class cruise ships. Embark on an adventure unlike any other across exotic destinations globe-wide.
                                </p>
                            </div>
                            <br />
                            <Link href="/contact" className="actionBtn" style={{ background: '#FF6B35', color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>
                                Enquire Now
                            </Link>
                        </div>
                    </center>

                    <div className="headerSection" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <span className="subTitle" style={{ marginLeft: '0' }}>Highlights</span>
                        <h2 style={{ fontSize: '2rem' }}>Cruise <span>Highlights.</span></h2>
                    </div>

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
