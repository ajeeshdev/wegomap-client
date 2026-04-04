"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, Clock, Users, Ticket, Phone, ShieldCheck, Globe, Zap, MessageSquare, ChevronRight, Star } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function SpecialEventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API_URL}/special-events`);
                const data = await res.json();
                if (data.success) {
                    setEvents(data.data.filter((e: any) => e.status === 'Published' || !e.status));
                }
            } catch (err) {
                console.error("Failed to fetch special events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <main className="eventsPage bg-white">
            <DynamicPageBanner
                fallbackTitle="Special Events & \nExclusive Experiences"
                fallbackSubtitle="Discover our handpicked collection of curated events, from intimate networking summits to grand milestone celebrations."
                fallbackPreTitle="Experience More"
                fallbackImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                breadcrumbs={[
                    { label: 'Events', href: '/events' },
                    { label: 'Special Events' }
                ]}
                variant="standard"
            />

            <section className="events-listing commonPadding">
                <div className="homeContainer">
                    {loading ? (
                        <div className="flex items-center justify-center py-40">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {events.map((event) => (
                                    <Link key={event._id} href={`/special-events/${event.slug || event._id}`} className="block h-full">
                                        <div className="packageCardSmall group h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                                            <div className="imageWrapper relative aspect-[16/10] overflow-hidden">
                                                <Image 
                                                    src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"} 
                                                    alt={event.title} 
                                                    fill 
                                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                                />
                                                {event.averageRating > 0 && (
                                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/20">
                                                        <Star size={12} fill="#fbbf24" className="text-yellow-400" />
                                                        <span className="text-[11px] font-black text-slate-900 tracking-tight">{event.averageRating.toFixed(1)}</span>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10">
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                                                        {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Special'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="cardContent p-8 flex flex-col flex-1">
                                                <h4 className="packageTitle text-xl font-black text-slate-950 leading-tight mb-2 group-hover:text-primary transition-colors">{event.title}</h4>
                                                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2 uppercase tracking-widest font-bold">
                                                    <MapPin size={12} className="text-primary" /> {event.location || 'Special Location'}
                                                </p>
                                                <div className="mt-auto pt-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                                        Explore Detail <ArrowRight size={14} />
                                                    </div>
                                                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                        <ChevronRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 text-center">
                                <Ticket size={64} className="text-slate-100 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Active Special Events</h3>
                                <p className="text-slate-400 font-medium max-w-md mx-auto">We're currently curating more niche experiences. Stay tuned for updates!</p>
                                <Link href="/events" className="inline-block mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                                    View Corporate Events
                                </Link>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
