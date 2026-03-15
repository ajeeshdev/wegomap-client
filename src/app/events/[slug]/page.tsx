"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const slugOrId = params.slug;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Try from events (Corporate) first
                let res = await fetch(`${API_URL}/events/${slugOrId}`);
                let data = await res.json();
                
                if (data.success) {
                    setEvent(data.data);
                } else {
                    // Try from special-events (Fallback/Redirect if needed, but here we just try to find it)
                    res = await fetch(`${API_URL}/special-events/${slugOrId}`);
                    data = await res.json();
                    if (data.success) {
                        // If found in special-events but accessed via /events, we might want to redirect
                        // but for now let's just show it to avoid broken links
                        setEvent(data.data);
                    } else {
                        // Scan both for slug match
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
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24 overflow-hidden">
                <Image 
                    src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"} 
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
                    <div className="flex flex-col items-start gap-6 max-w-3xl">
                        <Link href="/events" className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-all">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        
                        <div className="flex items-center gap-4 text-purple-400 text-xs font-black uppercase tracking-[0.3em] bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                            <Calendar size={14} /> {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Upcoming Special Event'}
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
                            {event.heroHeading || event.title}
                        </h1>
                        
                        <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            {event.heroSubtext || "Join us for an unforgettable experience filled with tradition, excitement, and discovery."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        
                        {/* Main Description */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="flex items-center gap-8 border-b border-slate-100 pb-12">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</span>
                                    <span className="text-slate-900 font-black text-sm uppercase flex items-center gap-2">
                                        <MapPin size={16} className="text-purple-500" /> {event.location || 'Special Location'}
                                    </span>
                                </div>
                                <div className="w-px h-10 bg-slate-100"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</span>
                                    <span className="text-slate-900 font-black text-sm uppercase flex items-center gap-2">
                                        <Users size={16} className="text-blue-500" /> Group Friendly
                                    </span>
                                </div>
                            </div>

                            <div 
                                className="prose prose-slate max-w-none prose-h1:font-black prose-h1:uppercase prose-p:text-slate-600 prose-p:leading-loose prose-p:text-lg"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                                {[
                                    "Professional Event Coordination",
                                    "Custom Photography & Videography",
                                    "VIP Access & Seating Pools",
                                    "Traditional Refreshments Included"
                                ].map((inc, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="w-10 h-10 bg-white shadow-sm border border-slate-200/50 rounded-2xl flex items-center justify-center text-emerald-500">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span className="text-slate-700 font-bold uppercase text-[11px] tracking-widest">{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            <div className="p-10 bg-slate-900 rounded-[48px] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <h4 className="text-white font-black text-3xl uppercase tracking-tighter mb-4 leading-none">Book Your Experience</h4>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">Limited slots available for this special activity. Secure your spot now to avoid disappointment.</p>
                                    
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center justify-between text-slate-300 text-xs font-bold border-b border-white/10 pb-4">
                                            <span className="uppercase tracking-widest italic">Standard Admission</span>
                                            <span className="text-white font-black">ACTIVE</span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-300 text-xs font-bold border-b border-white/10 pb-4">
                                            <span className="uppercase tracking-widest italic">Booking Status</span>
                                            <span className="text-purple-400 font-black">OPEN NOW</span>
                                        </div>
                                    </div>

                                     <Link 
                                         href={`/contact?event=${encodeURIComponent(event.title)}`}
                                         className="w-full h-16 bg-purple-600 hover:bg-purple-500 text-white rounded-3xl flex items-center justify-center gap-3 transition-all active:scale-95 group/btn"
                                     >
                                         <span className="font-black uppercase tracking-[0.2em] text-xs">Enquire Now</span>
                                         <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                                     </Link>

                                    <div className="mt-8 text-center">
                                        <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-white transition-colors">
                                            <Share2 size={12} /> Share this experience
                                        </button>
                                    </div>
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
