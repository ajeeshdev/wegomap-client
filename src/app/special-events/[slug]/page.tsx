"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const slugOrId = params.slug;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Try from special-events first
                let res = await fetch(`${API_URL}/special-events/${slugOrId}`);
                let data = await res.json();
                
                if (data.success) {
                    setEvent(data.data);
                } else {
                    // Try from events (fallback)
                    res = await fetch(`${API_URL}/events/${slugOrId}`);
                    data = await res.json();
                    if (data.success) {
                        setEvent(data.data);
                    } else {
                        // If still not found by ID, maybe it's a slug. Fetch all from both and find
                        const [allEventsRes, allSpecRes] = await Promise.all([
                            fetch(`${API_URL}/events`),
                            fetch(`${API_URL}/special-events`)
                        ]);
                        const allEventsData = await allEventsRes.json();
                        const allSpecData = await allSpecRes.json();
                        
                        let allEvents: any[] = [];
                        if (allEventsData.success) allEvents = [...allEvents, ...allEventsData.data];
                        if (allSpecData.success) allEvents = [...allEvents, ...allSpecData.data];
                        
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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Event Node...</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-white flex flex-col pt-32 items-center px-6 text-center">
                <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[32px] flex items-center justify-center mb-8">
                    <Zap size={40} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Event Not Found</h1>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">The event you are looking for might have been moved or its chronology has expired.</p>
                <Link href="/events" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3">
                    <ArrowLeft size={18} /> Back to All Events
                </Link>
            </div>
        );
    }

    return (
        <main className="eventDetailPage min-h-screen">
            <Header />
            
            {/* Hero Section */}
            <section className="eventHero">
                <div className="heroImageWrapper">
                    <Image 
                        src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"} 
                        alt={event.title}
                        fill
                        unoptimized
                    />
                </div>
                <div className="heroOverlay"></div>
                
                <div className="heroContent homeContainer mx-auto px-6 w-full">
                    <div className="flex flex-col items-start max-w-4xl">
                        <Link href="/events" className="backBtn">
                            <ArrowLeft size={14} /> <span>Back to Events</span>
                        </Link>
                        
                        <div className="dateBadge">
                            <Calendar size={14} /> {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Upcoming Special Event'}
                        </div>

                        <h1 className="mainTitle">
                            {event.heroHeading || event.title}
                        </h1>
                        
                        {event.heroSubtext && (
                            <span className="subheading">
                                {event.heroSubtext}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="eventContentBody">
                <div className="homeContainer mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        
                        {/* Main Description */}
                        <div className="lg:col-span-8">
                            <div className="metaGrid">
                                <div className="metaItem">
                                    <label>Location</label>
                                    <span>
                                        <MapPin size={16} /> {event.location || 'Special Location'}
                                    </span>
                                </div>
                                <div className="divider"></div>
                                <div className="metaItem">
                                    <label>Experience</label>
                                    <span>
                                        <Users size={16} /> Group Friendly
                                    </span>
                                </div>
                                <div className="divider"></div>
                                <div className="metaItem">
                                    <label>Duration</label>
                                    <span>
                                        <Clock size={16} /> {event.duration || 'Full Day'}
                                    </span>
                                </div>
                            </div>

                            <div 
                                className="descriptionArea"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />

                            <div className="featuresList">
                                {[
                                    "Professional Event Coordination",
                                    "Custom Photography & Videography",
                                    "VIP Access & Seating Pools",
                                    "Traditional Refreshments Included"
                                ].map((inc, i) => (
                                    <div key={i} className="featureCard">
                                        <div className="icon">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span>{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            <div className="bookingSidebar">
                                <h4>Book Your Experience</h4>
                                <p>Limited slots available for this special activity. Secure your spot now to avoid disappointment.</p>
                                
                                <div className="stats">
                                    <div className="statItem">
                                        <label>Special Event</label>
                                        <span>ACTIVE</span>
                                    </div>
                                    <div className="statItem">
                                        <label>Booking Status</label>
                                        <span>OPEN NOW</span>
                                    </div>
                                </div>

                                 <Link 
                                     href={`/contact?event=${encodeURIComponent(event.title)}`}
                                     className="bookBtn"
                                 >
                                     <span>Enquire Now</span>
                                     <ArrowRight size={18} />
                                 </Link>

                                <div className="mt-8 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:text-white transition-colors">
                                    <Share2 size={12} /> Share this experience
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
