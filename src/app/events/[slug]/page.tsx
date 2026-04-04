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
    const firstPara = descriptionLines[0] || "Experience this exclusive event managed by WEGOMAP.";
    const remainingParas = descriptionLines.slice(1).join('</p>') || `
        <p>Join us for an unforgettable experience at our selected venue. This event is meticulously planned to ensure every guest enjoys a seamless and premium experience, featuring world-class amenities and professional coordination.</p>
        <p>Our team at WEGOMAP specializes in creating moments that matter. From technical production to guest hospitality, we handle every detail so you can focus on the experience itself.</p>
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
                                <h2 className="ed-overview-header">
                                    Event Overview
                                </h2>
                                <div className="ed-description-v3">
                                    <div dangerouslySetInnerHTML={{ __html: firstPara }} className="ed-lead-text" />
                                    <div dangerouslySetInnerHTML={{ __html: remainingParas }} />
                                </div>


                            </div>


                        </div>

                        <div className="lg:col-span-4 ed-sidebar">
                            <div className="ed-booking-card">
                                {formStatus === 'success' ? (
                                    <div className="ed-success">
                                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                                        <h5 className="font-bold text-xl uppercase">Registration Sent!</h5>
                                        <p className="text-slate-500 mt-2">Our team will contact you shortly.</p>
                                        <button onClick={() => setFormStatus('idle')} className="mt-8 text-primary font-bold uppercase text-xs">Register Custom Guest</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="ed-card-header">
                                            <h4>Apply for <span>Admission.</span></h4>
                                            <p>Secure your spot at this curated experience.</p>
                                        </div>
                                        <form onSubmit={handleFormSubmit} className="ed-form space-y-5">
                                            <div className="ed-field">
                                                <label>Full Name</label>
                                                <div className="ed-input-group">
                                                    <User size={18} />
                                                    <input required type="text" placeholder="Your name" />
                                                </div>
                                            </div>
                                            <div className="ed-field">
                                                <label>Email Address</label>
                                                <div className="ed-input-group">
                                                    <ShieldCheck size={18} />
                                                    <input required type="email" placeholder="Your email" />
                                                </div>
                                            </div>
                                            <button disabled={formStatus === 'loading'} type="submit" className="ed-submit-btn">
                                                {formStatus === 'loading' ? 'Processing...' : 'Reserve my Spot'}
                                            </button>
                                            <span className="ed-verified-text">Verified by WEGOMAP Events</span>
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
