"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ChevronRight, ArrowRight, Sparkles, Clock, Users, Ticket } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function SpecialEventsListingPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const specRes = await fetch(`${API_URL}/special-events`);
                const specData = await specRes.json();
                
                if (specData.success) {
                  setEvents(specData.data.map((e: any) => ({ ...e, type: 'Special' })));
                }
            } catch (err) {
                console.error("Failed to fetch events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <main className="eventsPage bg-white min-h-screen">
            <DynamicPageBanner
                fallbackTitle="Signature\nExperiences"
                fallbackSubtitle="Wegomap's curated festive calendar, featuring cultural celebrations and exclusive local activities across Kerala."
                fallbackPreTitle="Memorable Moments"
                fallbackImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                breadcrumbs={[{ label: 'Special Events' }]}
                variant="standard"
            />

            {/* 2. Intro Section */}
            <section className="events-intro">
                <div className="homeContainer">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="introContent">
                            <div className="sectionHeader">
                                <span className="sectionSubtitle">Curative Calendar</span>
                                <h1 className="sliderTitle">
                                    DISCOVER EXCLUSIVE CELEBRATIONS.
                                </h1>
                            </div>
                            
                            <div className="contentBody">
                                <p>
                                    Our <span className="text-slate-900 font-bold">Special Events</span> are more than just dates on a calendar; they are shared moments of magic, culture, and luxury. From traditional Kerala festivals defined by signature craftsmanship to private beachside celebrations, we curate every detail.
                                </p>
                                <p>
                                    Experience God's Own Country through the eyes of a local connoisseur. We handle the logistics, the technical production, and the guest hospitality, allowing you to immerse yourself in the celebration without compromise.
                                </p>
                            </div>
                        </div>

                        <div className="introImage">
                            <div className="imageContainer">
                                <Image
                                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                                    alt="Special Events Specialist Kerala"
                                    fill
                                    
                                />
                            </div>
                            
                            <div className="floatingStat">
                                <div className="icon">
                                    <Sparkles size={28} />
                                </div>
                                <div className="info">
                                    <span className="count">50+</span>
                                    <span className="label">Annual Festivals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="events-listing">
                <div className="homeContainer">
                    <div className="sectionHeader !text-center !mx-auto mb-20 max-w-2xl">
                        <div className="titleArea">
                            <span className="sectionSubtitle">Signature Series</span>
                            <h2 className="sliderTitle">UNFORGETTABLE CALENDAR.</h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {events.map((event, idx) => (
                                <Link 
                                    key={event._id} 
                                    href={`/special-events/${event.slug || event._id}`}
                                    className="block h-full group"
                                >
                                    <div className="packageCardSmall group h-full flex flex-col">
                                        <div className="imageWrapper">
                                            <Image 
                                                src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"} 
                                                alt={event.title}
                                                fill
                                                
                                            />
                                            <div className="category-tag special">
                                                Special Activity
                                            </div>
                                        </div>

                                        <div className="cardContent flex-1 flex flex-col">
                                            <div className="location-meta flex items-center gap-2 mb-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                                                <MapPin size={12} className="text-orange-500" /> {event.location || 'Special Location'}
                                            </div>
                                            <h3 className="packageTitle line-clamp-2 text-lg font-black text-slate-900 leading-tight">
                                                {event.title}
                                            </h3>

                                            <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors">
                                                    Explore <ArrowRight size={14} />
                                                </div>
                                                <div className="actionIcon !relative !right-0 !top-0 !transform-none !m-0">
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
                            <div className="w-24 h-24 bg-white border border-slate-100 rounded-[3rem] shadow-xl flex items-center justify-center mx-auto mb-8">
                                <Ticket size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Events Currently Scheduled</h3>
                            <p className="text-slate-400 font-medium max-w-md mx-auto">We're curating more amazing experiences for you. Join our mailing list for early updates!</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
