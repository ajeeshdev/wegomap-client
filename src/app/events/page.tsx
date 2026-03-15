"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ChevronRight, ArrowRight, Sparkles, Clock, Users, Ticket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function EventsListingPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [eventsRes, specRes] = await Promise.all([
                    fetch(`${API_URL}/events`),
                    fetch(`${API_URL}/special-events`)
                ]);
                const eventsData = await eventsRes.json();
                const specData = await specRes.json();
                
                let allEvents: any[] = [];
                if (eventsData.success) allEvents = [...allEvents, ...eventsData.data.map((e: any) => ({ ...e, type: 'Corporate' }))];
                if (specData.success) allEvents = [...allEvents, ...specData.data.map((e: any) => ({ ...e, type: 'Special' }))];
                
                setEvents(allEvents);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Special Events...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <DynamicPageBanner
                fallbackTitle="Special\nEvents"
                fallbackSubtitle="Discover unique festivals, cultural celebrations, and exclusive activities across our destinations."
                fallbackImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                breadcrumbs={[{ label: 'Events' }]}
            />

            {/* Listing Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event, idx) => (
                            <Link 
                                key={event._id} 
                                href={event.type === 'Special' ? `/special-events/${event.slug || event._id}` : `/events/${event.slug || event._id}`}
                                className="group block"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200/50 group-hover:shadow-purple-200/50 transition-all duration-700">
                                    <Image 
                                        src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"} 
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={12} className="text-purple-400" />
                                        {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Upcoming'}
                                    </div>

                                    {/* Type Badge */}
                                    <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                        event.type === 'Corporate' 
                                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' 
                                        : 'bg-purple-500/20 border-purple-500/30 text-purple-300'
                                    }`}>
                                        {event.type}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="flex items-center gap-3 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                            <MapPin size={12} /> {event.location || 'Special Location'}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-slate-300 text-[11px] font-bold uppercase tracking-widest border-t border-white/10 pt-4 w-full">
                                                <span className="flex items-center gap-2"><Clock size={12} /> Full Day</span>
                                                <span className="flex items-center gap-2"><Users size={12} /> Limited Slots</span>
                                                <div className="ml-auto w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowRight size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                                <Ticket size={40} className="text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Events Found</h3>
                            <p className="text-slate-400 font-medium">We're currently planning more amazing experiences. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
