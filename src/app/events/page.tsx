"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, Clock, Users, Ticket, Phone, ShieldCheck, Globe, Zap, MessageSquare, ChevronRight } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function EventsCombinedPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageContent, setPageContent] = useState<any>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [eventsRes, specRes, optionsRes] = await Promise.all([
                    fetch(`${API_URL}/events`),
                    fetch(`${API_URL}/special-events`),
                    fetch(`${API_URL}/options`)
                ]);
                const eventsData = await eventsRes.json();
                const specData = await specRes.json();
                const optionsData = await optionsRes.json();
                
                let allEvents: any[] = [];
                if (eventsData.success) allEvents = [...allEvents, ...eventsData.data.map((e: any) => ({ ...e, type: 'Corporate' }))];
                if (specData.success) allEvents = [...allEvents, ...specData.data.map((e: any) => ({ ...e, type: 'Special' }))];
                
                setEvents(allEvents);

                if (optionsData.success && optionsData.data) {
                    const opt = optionsData.data.find((o: any) => o.key === 'events_page_settings');
                    if (opt) setPageContent(JSON.parse(opt.value));
                }
            } catch (err) {
                console.error("Failed to fetch events data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const corporate = pageContent?.corporate || {
        subtitle: "Event Specialists",
        title: "PREMIUM EVENT MANAGEMENT IN KERALA.",
        description1: "At Wegomap, we redefine what it means to host an extraordinary gathering. Whether you're orchestrating a flagship corporate summit in Kochi or a milestone cultural celebration, our event management team blends creative vision with flawless technical execution.",
        description2: "From high-impact venue selection and advanced staging to seamless guest logistics and digital engagement, we manage every layer of the experience. We don't just plan events; we create lasting impressions.",
        statLabel: "Venues Partnered",
        statCount: "100+"
    };

    const special = pageContent?.special || {
        subtitle: "Curative Calendar",
        title: "DISCOVER OUR CURATED CALENDAR.",
        description: "From niche networking summits to grand public festivities, explore the events defined by Wegomap's signature excellence."
    };

    return (
        <main className="eventsPage bg-white">
            
            {/* 1. Hero Banner */}
            <DynamicPageBanner
                fallbackTitle="Experience the\nUnforgettable"
                fallbackSubtitle="Wegomap orchestrates world-class corporate summits, cultural festivals, and bespoke celebrations across Kerala."
                fallbackPreTitle="Premium Event Management"
                fallbackImage="/uploads/categories/ubqf5mc4ve1g6yqwmnsyiyek9fkld9akyp6g2lar220406065334.jpg"
                breadcrumbs={[{ label: 'Events' }]}
                variant="standard"
            />

            {/* 2. Intro Section */}
            <section className="events-intro">
                <div className="homeContainer">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="introContent">
                            <div className="sectionHeader">
                                <span className="sectionSubtitle">{corporate.subtitle}</span>
                                <h2 className="sliderTitle">
                                    {corporate.title}
                                </h2>
                            </div>
                            
                            <div className="contentBody">
                                <p>{corporate.description1}</p>
                                <p>{corporate.description2}</p>
                            </div>
                        </div>

                        {/* Image Column on Right */}
                        <div className="introImage">
                            <div className="imageContainer">
                                <Image
                                    src="/uploads/premium-event-setup.png"
                                    alt="Premium Corporate Event Specialist"
                                    fill
                                    
                                />
                            </div>
                            
                            {/* Floating Highlight Card */}
                            <div className="floatingStat">
                                <div className="icon">
                                    <Users size={28} />
                                </div>
                                <div className="info">
                                    <span className="count">{corporate.statCount}</span>
                                    <span className="label">{corporate.statLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Event Listing Section */}
            <section className="events-listing">
                <div className="homeContainer">
                    <div className="sectionHeader !text-center !mx-auto mb-20 max-w-2xl">
                        <div className="titleArea">
                            <span className="sectionSubtitle">{special.subtitle}</span>
                            <h2 className="sliderTitle">{special.title}</h2>
                            <p className="sectionHeaderDescription mt-4 opacity-70">
                                {special.description}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="eventsGrid">
                            {events.map((event, idx) => (
                                <Link 
                                    key={event._id} 
                                    href={event.type === 'Special' ? `/special-events/${event.slug || event._id}` : `/events/${event.slug || event._id}`}
                                    className="block h-full"
                                >
                                    <div className="premiumEventCard group h-full">
                                        <div className="imageWrapper eventWrapper">
                                            <Image
                                                src={event.images?.[0] || "/assets/site/assets/images/event.jpg"}
                                                alt={event.title}
                                                fill
                                                className="img-premium"
                                            />
                                            {/* Category Tag */}
                                            <div className={`category-tag ${event.type === 'Corporate' ? 'corporate' : 'special'}`}>
                                                {event.type}
                                            </div>
                                            
                                            <div className="card-overlay">
                                                <div className="action-pill">
                                                    Explore details <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="cardContent">
                                            <div className="location-meta">
                                                <MapPin size={12} /> {event.location || 'Kochi, Kerala'}
                                            </div>
                                            <h4 className="packageTitle">
                                                {event.title}
                                            </h4>
                                            
                                            <div className="event-footer">
                                                <div className="join-event">
                                                    JOIN EVENT
                                                </div>
                                                <div className="actionIcon-premium">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && events.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-24 h-24 bg-white border border-slate-100 rounded-[3rem] shadow-2xl flex items-center justify-center mx-auto mb-8 relative">
                                <Ticket size={40} className="text-slate-200" />
                                <div className="absolute top-0 right-0 w-6 h-6 bg-orange-500 rounded-full border-4 border-white"></div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Active Events Found</h3>
                            <p className="text-slate-400 font-medium max-w-md mx-auto">We're currently curating more premium experiences. Our calendar updates weekly!</p>
                            <Link href="/contact" className="inline-block mt-8 text-xs font-black uppercase tracking-widest text-orange-500 border-b-2 border-orange-500 pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">
                                Get Early Access &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
