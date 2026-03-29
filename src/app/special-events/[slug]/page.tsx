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

export default function SpecialEventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const slugOrId = params.slug;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                let res = await fetch(`${API_URL}/special-events/${slugOrId}`);
                let data = await res.json();
                
                if (data.success) {
                    setEvent(data.data);
                } else {
                    res = await fetch(`${API_URL}/events/${slugOrId}`);
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
                console.error("Failed to fetch special event detail:", err);
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
            toast.success("Interest expressed successfully!");
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
                <Info size={64} className="text-blue-500 mb-8" />
                <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Activity Not Found</h1>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">This special event might have been rescheduled or removed from our curative calendar.</p>
                <Link href="/special-events" className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                    View Special Events
                </Link>
            </div>
        );
    }

    const descriptionLines = (event.description || "").split('</p>');
    const firstPara = descriptionLines[0] || "Discover the magic of this curated special event across Kerala.";
    const remainingParas = descriptionLines.slice(1).join('</p>') || `
        <p>This special activity at our premium destination offers a unique blend of culture, luxury, and unforgettable activities. Meticulously planned by the experts at WEGOMAP, we ensure every detail is handled with precision.</p>
        <p>Experience local traditions combined with modern comforts, managed by our dedicated on-site coordination team. Whether you're here for leisure or celebration, we guarantee a premium experience that stays with you forever.</p>
    `;

    return (
        <main className="eventsPage detail-v3">
            
            <DynamicPageBanner
                fallbackTitle={event.title}
                fallbackSubtitle={event.location || "Special Event Destination"}
                fallbackImage={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1500"}
                breadcrumbs={[
                    { label: 'Special Events', href: '/special-events' },
                    { label: event.title }
                ]}
                variant="standard"
            />

            <div className="homeContainer">
                <div className="ed-stats-bar">
                    <div className="ed-stat-grid">
                        <div className="ed-stat-item">
                            <span className="ed-stat-label">Activity Date</span>
                            <div className="ed-stat-value">
                                <Calendar size={16} /> 
                                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Join Upcoming'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Destination</span>
                            <div className="ed-stat-value">
                                <MapPin size={16} /> {event.location || 'Kerala, India'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Timeline</span>
                            <div className="ed-stat-value">
                                <Clock size={16} /> {event.duration || 'Session Based'}
                            </div>
                        </div>
                        <div className="ed-stat-item ed-stat-bordered">
                            <span className="ed-stat-label">Experience</span>
                            <div className="ed-stat-value">
                                <Sparkles size={16} /> Curated Luxury
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
                                    <Sparkles size={32} /> Special Highlights.
                                </h1>
                                <div className="ed-description">
                                    <div dangerouslySetInnerHTML={{ __html: firstPara }} className="lead" />
                                    <div dangerouslySetInnerHTML={{ __html: remainingParas }} />
                                </div>

                                <div className="ed-info-pills">
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-blue"><Users size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Exclusive</span><span className="val">Curated Group</span></div>
                                    </div>
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-orange"><Zap size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Activity</span><span className="val">High Energy</span></div>
                                    </div>
                                    <div className="ed-pill">
                                        <div className="ed-pill-icon ed-pill-emerald"><ShieldCheck size={24} /></div>
                                        <div className="ed-pill-text"><span className="lbl">Concierge</span><span className="val">Premium Policy</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="ed-highlights">
                                <h3 className="ed-h-title">Included Event Professionals.</h3>
                                <div className="ed-h-grid">
                                    {[
                                        "Professional On-site Coordination",
                                        "Traditional Activity Guidance",
                                        "Premium Cultural Catering",
                                        "Modern Technical Setup & AV",
                                        "Exclusive Guest Enclosure",
                                        "Commemorative Experience Gifts"
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
                                        <h5>Interest Expressed!</h5>
                                        <p>Our special event curators will contact you with the full details shortly.</p>
                                        <button onClick={() => setFormStatus('idle')} className="reset-btn">Enquire Again</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="ed-card-header">
                                            <h4>Express <span>Interest.</span></h4>
                                            <p>Register your interest to join our exclusive special event calendar.</p>
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
                                                <label>Contact Number</label>
                                                <div className="ed-input-group">
                                                    <Phone size={18} />
                                                    <input required type="tel" placeholder="Enter phone number" />
                                                </div>
                                            </div>
                                            <div className="ed-field">
                                                <label>Member Count</label>
                                                <div className="ed-input-group">
                                                    <Users size={18} />
                                                    <input required type="number" min="1" placeholder="Number of members" />
                                                </div>
                                            </div>
                                            <button disabled={formStatus === 'loading'} type="submit" className="ed-submit-btn" >
                                                {formStatus === 'loading' ? 'Processing...' : 'Express Interest Now'}
                                                <Send size={16} />
                                            </button>
                                            <span className="ed-privacy">Managed by WEGOMAP Premium Concierge</span>
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
