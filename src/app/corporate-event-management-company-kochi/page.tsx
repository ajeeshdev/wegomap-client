import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Mic, Presentation, Phone } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function EventsPage() {
    return (
        <div className="corporateEventsPage">
            <DynamicPageBanner
                fallbackTitle="Corporate Event Management\nCompany in Kochi"
                fallbackSubtitle="Planning Impactful & Seamless Corporate Events"
                fallbackImage="/uploads/categories/ubqf5mc4ve1g6yqwmnsyiyek9fkld9akyp6g2lar220406065334.jpg"
                breadcrumbs={[{ label: 'Corporate Events' }]}
            />

            <section className="infoBodySection">
                <div className="homeContainer">

                    <div className="contactGrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div className="infoTextRow">
                            <div className="headerSection" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                <span className="subTitle" style={{ marginLeft: '0' }}>Trusted Planners</span>
                                <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>The Best Corporate <span>Event Planners</span> in Kerala</h2>
                            </div>
                            
                            <div className="contentBody" style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Planning impactful corporate events requires expertise, precision, and creativity. At Wegomap, we are a premier corporate event management company in Kochi, offering tailored solutions to make your business gatherings seamless and unforgettable.
                                </p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    From product launches and conferences to team-building activities and annual celebrations, our expert team ensures that every event is executed flawlessly. We specialize in delivering customized experiences that align with your brand’s values and goals, ensuring a lasting impression on your audience.
                                </p>
                                <p>
                                    As a trusted corporate event management company, Wegomap takes care of every detail, including venue selection, event design, logistics, and technology integration.
                                </p>
                            </div>

                            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#FF6B35', color: '#fff', padding: '1.25rem 2.5rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', marginTop: '2.5rem', boxShadow: '0 10px 20px rgba(255,107,53,0.2)' }}>
                                <Phone size={20} /> Let's Plan Your Next Event
                            </Link>

                        </div>

                        {/* Visual Right Column */}
                        <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '550px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)' }}>
                            <Image
                                src="/uploads/categories/event-setup-beach.jpg"
                                alt="Event Setup"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="headerSection" style={{ marginTop: '8rem', marginBottom: '4rem' }}>
                        <span className="subTitle">Excellence in Execution</span>
                        <h2>Why Partner with <span>Wegomap?</span></h2>
                    </div>

                    <div className="infoGrid">
                        <div className="infoCard">
                            <div className="infoCardNumber">01</div>
                            <h4 className="infoCardTitle">Strategic Planning</h4>
                            <p className="infoCardDesc">We align every event detail with your corporate objectives, ensuring ROI and brand consistency.</p>
                        </div>
                        <div className="infoCard">
                            <div className="infoCardNumber">02</div>
                            <h4 className="infoCardTitle">Venue Mastery</h4>
                            <p className="infoCardDesc">Access to exclusive luxury hotels and unconventional spaces in Kochi and across Kerala.</p>
                        </div>
                        <div className="infoCard">
                            <div className="infoCardNumber">03</div>
                            <h4 className="infoCardTitle">Tech Integration</h4>
                            <p className="infoCardDesc">State-of-the-art AV solutions, interactive apps, and hybrid event capabilities.</p>
                        </div>
                    </div>

                    {/* Our Process Section */}
                    <section style={{ padding: '6rem 4rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', margin: '8rem 0', borderRadius: '4rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#FF6B35', opacity: '0.03', borderRadius: '50%' }}></div>
                        
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <span className="subTitle" style={{ color: '#FF6B35' }}>Our Methodology</span>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginTop: '1rem' }}>Our 4-Step Planning Matrix</h3>
                            <p style={{ color: '#64748b', fontSize: '1.2rem', marginTop: '1rem' }}>How we turn your vision into a landmark event</p>
                        </div>
                        
                        <div className="infoGrid">
                            {[
                                { n: 1, t: 'Discovery', d: 'Understanding your goals, audience, and the message you want to convey.' },
                                { n: 2, t: 'Curation', d: 'Customizing themes, venues, and tech stacks tailored to your requirements.' },
                                { n: 3, t: 'Execution', d: 'On-ground management with military precision and real-time coordination.' },
                                { n: 4, t: 'Post-Event Analysis', d: 'Comprehensive reporting and feedback loop to measure success.' }
                            ].map(step => (
                                <div key={step.n} style={{ textAlign: 'center', padding: '0 1rem' }}>
                                    <div style={{ width: '90px', height: '90px', background: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', borderRadius: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2rem', fontWeight: '900', color: '#FF6B35' }}>{step.n}</div>
                                    <h4 style={{ fontWeight: '900', marginBottom: '1.25rem', fontSize: '1.25rem' }}>{step.t}</h4>
                                    <p style={{ color: '#64748b', lineHeight: '1.7' }}>{step.d}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Expertise Section */}
                    <div className="headerSection" style={{ marginBottom: '4rem' }}>
                        <span className="subTitle">Core Competencies</span>
                        <h2>Specific Event <span>Expertise.</span></h2>
                    </div>

                    <div className="infoGrid">
                        {[
                            { icon: <Mic size={32} />, t: 'Product Launches', d: 'Create an unforgettable buzz for your new offerings with perfectly executed launch events.' },
                            { icon: <Presentation size={32} />, t: 'Industry Conferences', d: 'End-to-end logistics for large-scale professional gatherings and seminars.' },
                            { icon: <Users size={32} />, t: 'Team Building Retreats', d: 'Engaging off-site activities designed to boost employee morale and teamwork.' },
                            { icon: <Calendar size={32} />, t: 'Gala Award Nights', d: 'Celebrate achievements with high-production value celebrations and red carpet logicstics.' },
                            { icon: <Users size={32} />, t: 'Client Hospitality', d: 'Bespoke experiences designed to nurture key business relationships in luxury settings.' },
                            { icon: <Mic size={32} />, t: 'CSR Initiatives', d: 'Corporate Social Responsibility events that make a real impact on local communities.' }
                        ].map((item, i) => (
                            <div key={i} className="infoCard" style={{ padding: '3.5rem 2.5rem' }}>
                                <div className="infoCardIcon" style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}>{item.icon}</div>
                                <h4 className="infoCardTitle" style={{ marginTop: '1.5rem' }}>{item.t}</h4>
                                <p className="infoCardDesc">{item.d}</p>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div style={{ marginTop: '10rem', paddingBottom: '5rem' }}>
                        <div className="headerSection" style={{ marginBottom: '4rem' }}>
                            <span className="subTitle">Common Queries</span>
                            <h2>Corporate Event <span>FAQs.</span></h2>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                { q: 'What types of corporate events do you manage?', a: 'We handle everything from small executive meetings and team-building sessions to massive international conferences and high-glamour product launches across Kerala.' },
                                { q: 'Do you provide equipment and technology support?', a: 'Yes, we provide full AV support, translation services, live streaming capabilities, and interactive event technology as part of our package.' },
                                { q: 'How early should we start planning?', a: 'For large conferences, we recommend at least 3-6 months. For smaller events, 4-8 weeks is usually sufficient for high-quality execution.' },
                                { q: 'Can you handle venue selection?', a: 'Absolutely. We have partnerships with top luxury hotels and unique event spaces across South India to give you the best options within your budget.' }
                            ].map((faq, i) => (
                                <div key={i} style={{ padding: '2.5rem', background: '#fff', borderRadius: '2rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                    <h5 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.15rem', display: 'flex', gap: '1rem', color: '#0f172a' }}>
                                        <span style={{ color: '#FF6B35' }}>Q.</span> {faq.q}
                                    </h5>
                                    <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '2.25rem' }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
