import Image from 'next/image';
import { MapPin, Mail, PhoneCall, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="infoPageWrapper">
            {/* Banner Section */}
            <section className="infoPageBanner">
                <div className="infoBannerImg">
                    <Image
                        src="/uploads/categories/twhsfbqthmna28zogfp3kpedhqd692qv29cqe85u240904024319.jpg"
                        alt="Contact Us"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="infoBannerOverlay" />
                </div>
                <div className="infoBannerContent">
                    <h1 className="infoTitle">Contact Us</h1>
                    <p className="infoSubtitle">Feel free to contact us</p>
                </div>
            </section>

            <section className="infoBodySection">
                <div className="infoContainer" style={{ maxWidth: '1000px' }}>

                    <div className="contactGrid">

                        {/* Company Address */}
                        <div className="contactBox">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin color="#ef4444" /> Our Office
                            </h2>
                            <p>
                                <strong>Address:</strong>
                                <span>
                                    1st Floor, Manjooran Centre, <br />
                                    Parakkal Cir, Hospital Junction, <br />
                                    Aluva, Kochi, Kerala 683101
                                </span>
                            </p>
                        </div>

                        {/* Contact Channels */}
                        <div className="contactBox">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <PhoneCall color="#10b981" /> Reach Out
                            </h2>
                            <p>
                                <strong>Phone 1:</strong>
                                <a href="tel:+918590370566">+91 8590370566</a>
                            </p>
                            <p>
                                <strong>Phone 2:</strong>
                                <a href="tel:+918113998989">+91 8113998989</a>
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <a href="mailto:mailwegomap@gmail.com">mailwegomap@gmail.com</a>
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <a href="mailto:mail@wegomap.in">mail@wegomap.in</a>
                            </p>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div style={{ marginTop: '4rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', height: '400px', backgroundColor: '#e2e8f0' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.028987342686!2d76.35332307584166!3d10.108253071378125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080f55cfbf53d7%3A0xc3f958fce4c4be6!2sWegomap%20Tours%20%26%20Events!5e0!3m2!1sen!2sin!4v1700483533804!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </section>
        </div>
    );
}
