"use client";

import { API_URL } from '@/config';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, Mail, PhoneCall, Send, Clock, Building, User, MailCheck, Smartphone, Captions } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    // Dynamic contact details from CMS options
    const [options, setOptions] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const data = await res.json();
                if (data.success) {
                    const mappedOptions: Record<string, string> = {};
                    data.data.forEach((opt: any) => {
                        mappedOptions[opt.key] = opt.value;
                    });
                    setOptions(mappedOptions);
                }
            } catch (err) {
                console.error("Failed to load options from CMS", err);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        // Minimum validation
        if (!formData.name.trim() || !formData.phone.trim()) {
            setStatus({ type: 'error', message: 'Name and Phone are required.' });
            setLoading(false);
            return;
        }

        if (!captchaToken) {
            setStatus({ type: 'error', message: 'Please verify that you are not a robot.' });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    source: 'Website Contact Page',
                    url: window.location.href,
                    captchaToken
                })
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will contact you soon.' });
                setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                setCaptchaToken(null);
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again later.' });
            }
        } catch (error: any) {
            console.error('Contact Form Error:', error);
            setStatus({ type: 'error', message: 'Failed to connect to the server. Please check your internet and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contactPage">
            <DynamicPageBanner
                fallbackTitle="Contact Us"
                fallbackSubtitle="We'd love to hear from you. Feel free to reach out for bookings and inquiries."
                fallbackPreTitle="Get In Touch"
                breadcrumbs={[{ label: 'Contact Us' }]}
            />

            <div className="contactBody homeContainer">

                {/* Main Split Layout */}
                <div className="contactSplitGrid">

                    {/* Left: Contact Info & Map */}
                    <div className="contactInfoColumn animate-in slide-in-from-left duration-700">
                        <div className="contactIntro">
                            <span className="subLabel">Get In Touch</span>
                            <h2>We are here to <span>help you</span></h2>
                            <p>Whether you're looking for a romantic honeymoon escape, a family adventure, or a serene backwater cruise, our experts are ready to plan your perfect getaway.</p>
                        </div>

                        <div className="contactCards">
                            <div className="cCard">
                                <div className="cIcon red"><MapPin size={24} /></div>
                                <div className="cDetails">
                                    <h3>Our Office</h3>
                                    <p
                                        dangerouslySetInnerHTML={{ 
                                            __html: options.address || '1st Floor, Manjooran Centre,<br />Parakkal Cir, Hospital Junction,<br />Aluva, Kochi, Kerala 683101'
                                        }} 
                                    />
                                </div>
                            </div>

                            <div className="cCard">
                                <div className="cIcon green"><PhoneCall size={24} /></div>
                                <div className="cDetails">
                                    <h3>Call Us</h3>
                                    <p><a href={`tel:${options.phone1 || '+918590370566'}`} className="hoverLink">{options.phone1 || '+91 85903 70566'}</a></p>
                                    <p><a href={`tel:${options.phone2 || '+918113998989'}`} className="hoverLink">{options.phone2 || '+91 81139 98989'}</a></p>
                                </div>
                            </div>

                            <div className="cCard">
                                <div className="cIcon blue"><Mail size={24} /></div>
                                <div className="cDetails">
                                    <h3>Email Us</h3>
                                    <p><a href={`mailto:${options.email1 || 'mailwegomap@gmail.com'}`} className="hoverLink">{options.email1 || 'mailwegomap@gmail.com'}</a></p>
                                    <p><a href={`mailto:${options.email2 || 'mail@wegomap.in'}`} className="hoverLink">{options.email2 || 'mail@wegomap.in'}</a></p>
                                </div>
                            </div>

                            <div className="cCard">
                                <div className="cIcon orange"><Clock size={24} /></div>
                                <div className="cDetails">
                                    <h3>Working Hours</h3>
                                    <p
                                        dangerouslySetInnerHTML={{ 
                                            __html: options.hours || 'Monday - Saturday: 9:30 AM - 6:30 PM<br/>Sunday: Closed'
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="contactMapWrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.028987342686!2d76.35332307584166!3d10.108253071378125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080f55cfbf53d7%3A0xc3f958fce4c4be6!2sWEGOMAP%20Tours%20%26%20Events!5e0!3m2!1sen!2sin!4v1700483533804!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="contactFormColumn animate-in slide-in-from-right duration-700">
                        <div className="formBox">
                            <h3>Send a Message</h3>
                            <p>Fill out the form below and our travel experts will get back to you shortly.</p>

                            <form onSubmit={handleSubmit} className="cForm">
                                <div className="formRow split">
                                    <div className="inputGroup">
                                        <label>Full Name <span>*</span></label>
                                        <div className="inputWrapper">
                                            <User size={18} className="iIcon" />
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                        </div>
                                    </div>
                                    <div className="inputGroup">
                                        <label>Phone Number <span>*</span></label>
                                        <div className="inputWrapper">
                                            <Smartphone size={18} className="iIcon" />
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="formRow split">
                                    <div className="inputGroup">
                                        <label>Email Address</label>
                                        <div className="inputWrapper">
                                            <MailCheck size={18} className="iIcon" />
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="inputGroup">
                                        <label>Subject</label>
                                        <div className="inputWrapper">
                                            <Captions size={18} className="iIcon" />
                                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Trip Inquiry" />
                                        </div>
                                    </div>
                                </div>

                                <div className="formRow full">
                                    <div className="inputGroup">
                                        <label>Your Message</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your travel plans..."></textarea>
                                    </div>
                                </div>

                                {status.message && (
                                    <div className={`statusAlert ${status.type}`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="captchaWrapper mb-4">
                                    <ReCAPTCHA
                                        sitekey="6LeisK4sAAAAAEcMyZmRgYnmLPiwxHrE29Pzm4xL"
                                        onChange={(token) => setCaptchaToken(token)}
                                    />
                                </div>

                                <button type="submit" className="submitBtn" disabled={loading}>
                                    {loading ? (
                                        <span className="flex-center">Sending... <div className="spinner-small" /></span>
                                    ) : (
                                        <span className="flex-center">Send Message <Send size={18} /></span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Optional small trust badge below form */}
                        <div className="trustBadge">
                            <Building size={20} className="tbIcon" />
                            <div>
                                <strong>Registered Travel Operator</strong>
                                <p>We provide 100% genuine and safe travel experiences.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
