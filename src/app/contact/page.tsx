"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        destination: '',
        message: '',
        source: 'NextJS Website'
    });
    const [status, setStatus] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', destination: '', message: '', source: 'NextJS Website' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    }

    return (
        <div className="contactPage">
            <PageBanner
                title="Contact Us"
                subtitle="Our experts are ready to help you plan the perfect trip."
                breadcrumbs={[{ label: 'Contact' }]}
            />
            <div className="homeContainer">
                <div className="contactGrid">
                    <div className="contactInfo animate-in fade-in slide-in-from-left duration-700">
                        <span className="subTitle">Get in Touch</span>
                        <h2>Start your <br /><span>Journey.</span></h2>
                        <p className="description">Our team of travel experts is ready to help you plan your next unforgettable adventure. Reach out to us for any queries or customized packages.</p>

                        <div className="contactDetailList">
                            <div className="detailGroup group">
                                <div className="iconBox">
                                    <Phone size={24} />
                                </div>
                                <div className="detailContent">
                                    <div className="label">Call Us Directly</div>
                                    <div className="value">+91 8590370566 / 8113998989</div>
                                </div>
                            </div>

                            <div className="detailGroup group">
                                <div className="iconBox">
                                    <Mail size={24} />
                                </div>
                                <div className="detailContent">
                                    <div className="label">Email Our Support</div>
                                    <div className="value">
                                        <Link href="mailto:mailwegomap@gmail.com">mailwegomap@gmail.com</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="detailGroup group border-t border-gray-50 pt-10">
                                <div className="iconBox">
                                    <MapPin size={24} />
                                </div>
                                <div className="detailContent">
                                    <div className="label">Visit Our Office</div>
                                    <div className="address">1st Floor, Manjooran Centre, Hospital Junction, Aluva, Kochi, Kerala 683101</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contactFormCard animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                        <h2>Send a <span>Message.</span></h2>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="fieldGroup">
                                    <label>Your Name</label>
                                    <input name="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required />
                                </div>
                                <div className="fieldGroup">
                                    <label>Phone Number</label>
                                    <input name="phone" type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 1234567890" required />
                                </div>
                            </div>
                            <div className="fieldGroup">
                                <label>Email Address</label>
                                <input name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                            </div>
                            <div className="fieldGroup">
                                <label>Preferred Destination</label>
                                <input name="destination" type="text" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="Munnar, Kerala" />
                            </div>
                            <div className="fieldGroup">
                                <label>Message / Requirements</label>
                                <textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="I'm planning a trip with my family..." required></textarea>
                            </div>

                            <button type="submit" disabled={status === 'sending'} className="submitBtn">
                                {status === 'sending' ? 'Sending Journey...' : status === 'success' ? 'Enquiry Sent!' : 'Send Message'} <Send size={18} />
                            </button>

                            {status === 'success' && <div className="statusMessage success">We&apos;ve received your enquiry. Our team will contact you shortly!</div>}
                            {status === 'error' && <div className="statusMessage error">Something went wrong. Please try again.</div>}
                        </form>
                    </div>
                </div>
            </div>

            <div className="bgDecor">
                <div className="circle1" />
                <div className="circle2" />
            </div>
        </div>
    );
}
