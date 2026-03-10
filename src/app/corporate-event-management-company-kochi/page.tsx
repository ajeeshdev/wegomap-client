import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Mic, Presentation, Phone } from 'lucide-react';

export default function EventsPage() {
    return (
        <div className="infoPageWrapper">
            {/* Banner Section */}
            <section className="infoPageBanner">
                <div className="infoBannerImg">
                    <Image
                        src="/uploads/categories/ubqf5mc4ve1g6yqwmnsyiyek9fkld9akyp6g2lar220406065334.jpg"
                        alt="Corporate Events"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="infoBannerOverlay" />
                </div>
                <div className="infoBannerContent">
                    <h1 className="infoTitle" style={{ fontSize: '3rem' }}>Corporate Event Management Company in Kochi</h1>
                    <p className="infoSubtitle">Planning Impactful & Seamless Corporate Events</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="infoBodySection">
                <div className="infoContainer">

                    <div className="contactGrid">
                        <div className="infoTextRow">
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
                                The Best Corporate Event Planners in Kerala
                            </h2>
                            <p>
                                Planning impactful corporate events requires expertise, precision, and creativity. At Wegomap, we are a premier corporate event management company in Kochi, offering tailored solutions to make your business gatherings seamless and unforgettable.
                            </p>
                            <p>
                                From product launches and conferences to team-building activities and annual celebrations, our expert team ensures that every event is executed flawlessly. We specialize in delivering customized experiences that align with your brand’s values and goals, ensuring a lasting impression on your audience.
                            </p>
                            <p>
                                As a trusted corporate event management company, Wegomap takes care of every detail, including venue selection, event design, logistics, and technology integration.
                            </p>
                            <p>
                                Kochi, known for its vibrant culture and modern infrastructure, is the perfect destination for hosting world-class corporate events. At Wegomap, we combine the charm of this bustling city with our exceptional planning skills to create memorable experiences that inspire and connect.
                            </p>

                            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFD52B', color: '#000', padding: '1rem 2rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', marginTop: '1.5rem' }}>
                                <Phone size={20} /> Let's Plan Your Next Event
                            </Link>

                        </div>

                        {/* Visual Right Column */}
                        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                            <Image
                                src="/uploads/categories/event-setup-beach.jpg"
                                alt="Event Setup"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                    </div>

                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '5rem', marginBottom: '2rem', textAlign: 'center' }}>
                        Our Event Expertise Include
                    </h3>

                    <div className="infoGrid">
                        <div className="infoCard">
                            <div className="infoCardIcon"><Mic size={32} /></div>
                            <h4 className="infoCardTitle">Product Launches</h4>
                            <p className="infoCardDesc">Create an unforgettable buzz for your new offerings with perfectly executed launch events.</p>
                        </div>
                        <div className="infoCard">
                            <div className="infoCardIcon"><Presentation size={32} /></div>
                            <h4 className="infoCardTitle">Industry Conferences</h4>
                            <p className="infoCardDesc">End-to-end logistics for large-scale professional gatherings and seminars.</p>
                        </div>
                        <div className="infoCard">
                            <div className="infoCardIcon"><Users size={32} /></div>
                            <h4 className="infoCardTitle">Team Building Retreats</h4>
                            <p className="infoCardDesc">Engaging off-site activities designed to boost employee morale and teamwork.</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
