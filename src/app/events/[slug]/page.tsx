"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Calendar, MapPin, Share2, Clock, Users, 
    ArrowRight, Zap, CheckCircle2, Sparkles, Phone, User, 
    Send, ShieldCheck, Info, ArrowLeft
} from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { toast } from 'react-hot-toast';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const slugOrId = params.slug;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                let res = await fetch(`${API_URL}/events/${slugOrId}`);
                let data = await res.json();
                
                if (data.success) {
                    setEvent(data.data);
                } else {
                    res = await fetch(`${API_URL}/special-events/${slugOrId}`);
                    data = await res.json();
                    if (data.success) {
                        setEvent(data.data);
                    } else {
                        const [allEventsRes, allSpecRes] = await Promise.all([
                            fetch(`${API_URL}/events`),
                            fetch(`${API_URL}/special-events`)
                        ]);
                        const allEventsData = await allEventsRes.json();
                        const allSpecData = await allSpecRes.json();
                        
                        let allEvents: any[] = [];
                        if (allEventsData.success) allEvents = [...allEvents, ...allEventsData.data];
                        if (allSpecData.success) allEvents = [...allSpecData.data];
                        
                        const found = allEvents.find((e: any) => e.slug === slugOrId || e._id === slugOrId);
                        if (found) setEvent(found);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch event detail:", err);
            } finally {
                setLoading(false);
            }
        };
        if (slugOrId) fetchEvent();
    }, [slugOrId]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');
        setTimeout(() => {
            setFormStatus('success');
            toast.success("Application received successfully!");
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-32 px-6 text-center bg-white">
                <Zap size={64} className="text-rose-500 mb-8" />
                <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Event Unavailable</h1>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">This experience is no longer active or its entry point has shifted.</p>
                <Link href="/events" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                    View Other Events
                </Link>
            </div>
        );
    }

    const descriptionLines = (event.description || "").split('</p>');
    const firstPara = descriptionLines[0] || "Experience this exclusive event managed by Wegomap.";
    const remainingParas = descriptionLines.slice(1).join('</p>') || `
        <p>Join us for an unforgettable experience at our selected venue. This event is meticulously planned to ensure every guest enjoys a seamless and premium experience, featuring world-class amenities and professional coordination.</p>
        <p>Our team at Wegomap specializes in creating moments that matter. From technical production to guest hospitality, we handle every detail so you can focus on the experience itself.</p>
    `;

    return (
        <main className="eventsPage detail-v3">
            
            <DynamicPageBanner
                fallbackTitle={event.title}
                fallbackSubtitle={event.location || "Kerala, India"}
                fallbackImage={event.images?.[0] || "/uploads/categories/ubqf5mc4ve1g6yqwmnsyiyek9fkld9akyp6g2lar220406065334.jpg"}
                breadcrumbs={[
                    { label: 'Events', href: '/events' },
                    { label: event.title }
                ]}
                variant="standard"
            />

            <div className="homeContainer">
                <div className="ed-stats-bar">
                    <div className="ed-stat-grid">
                        <div className="ed-stat-item">
                            <span className="ed-stat-label">Event Date</span>
                            <div className="ed-stat-value">
                                <Calendar size={16} /> 
                                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Join Now'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Venue Location</span>
                            <div className="ed-stat-value">
                                <MapPin size={16} /> {event.location || 'Kochi, Kerala'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Event Timeline</span>
                            <div className="ed-stat-value">
                                <Clock size={16} /> {event.duration || 'Session Based'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Booking Status</span>
                            <div className="ed-stat-value">
                                <CheckCircle2 size={16} /> Applications Open
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="ed-main-content">
                <div className="homeContainer">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        
                        <div className="lg:col-span-8">
                            <div className="ed-overview-card">
                                <h1 className="ed-card-title">
                                    <Sparkles size={32} /> Experience Overview.
                                </h1>
                                <div className="ed-description">
                                    <div dangerouslySetInnerHTML={{ __html: firstPara }} className="lead" />
                                    <div dangerouslySetInnerHTML={{ __html: remainingParas }} />
                                </div>

                                <div className="ed-info-pills">
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-blue"><ShieldCheck size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Assurance</span><span className="val">Verified Event</span></div>
                                    </div>
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-orange"><Zap size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Production</span><span className="val">Pro Staging</span></div>
                                    </div>
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-emerald"><Users size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Guest Policy</span><span className="val">VIP Protocol</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="ed-highlights">
                                <h3 className="ed-h-title">Included Event Essentials.</h3>
                                <div className="ed-h-grid">
                                    {[
                                        "Professional Event Management",
                                        "High-Definition Media Coverage",
                                        "Premium Catering & Hospitality",
                                        "Advanced Audio-Visual Production",
                                        "Venue Logistics & VIP Support",
                                        "Digital Attendance Solutions"
                                    ].map((inc, i) => (
                                        <div key={i} className="ed-h-item">
                                            <div className="ed-h-check"><CheckCircle2 size={14} /></div>
                                            <span className="ed-h-text">{inc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 ed-sidebar">
                            <div className="ed-booking-card">
                                {formStatus === 'success' ? (
                                    <div className="ed-success">
                                        <div className="icon"><CheckCircle2 size={36} /></div>
                                        <h5>Registration Sent!</h5>
                                        <p>Our team will contact you shortly with the event manual.</p>
                                        <button onClick={() => setFormStatus('idle')} className="reset-btn">Register Next Guestslot</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="ed-card-header">
                                            <h4>Join this <span>Experience.</span></h4>
                                            <p>Secure your presence at our next curated event series.</p>
                                        </div>
                                        <form onSubmit={handleFormSubmit} className="ed-form">
                                            <div className="ed-field">
                                                <label>Full Name</label>
                                                <div className="ed-input-group">
                                                    <User size={18} />
                                                    <input required type="text" placeholder="Enter your full name" />
                                                </div>
                                            </div>
                                            <div className="ed-field">
                                                <label>Work Email</label>
                                                <div className="ed-input-group">
                                                    <ShieldCheck size={18} />
                                                    <input required type="email" placeholder="Enter your email" />
                                                </div>
                                            </div>
                                            <div className="ed-field">
                                                <label>Contact Number</label>
                                                <div className="ed-input-group">
                                                    <Phone size={18} />
                                                    <input required type="tel" placeholder="Enter contact number" />
                                                </div>
                                            </div>
                                            <button disabled={formStatus === 'loading'} type="submit" className="ed-submit-btn" >
                                                {formStatus === 'loading' ? 'Processing...' : 'Apply for Spot'}
                                                <Send size={16} />
                                            </button>
                                            <span className="ed-privacy">Privacy protected by Wegomap Premium</span>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
