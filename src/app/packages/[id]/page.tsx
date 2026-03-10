"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, MapPin, Search, MoveRight, User, Hash, PartyPopper, CalendarClock, Globe, ShieldCheck, ArrowLeft, Check, Sparkles, Building2, Car, Utensils } from 'lucide-react';

interface Package {
    _id: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    description: string;
    highlights: string[];
    itinerary: { day: string; activity: string }[];
}

export default function PackageDetailPage() {
    const { id } = useParams();
    const [pkg, setPkg] = useState<Package | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPackage() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPkg(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (id) getPackage();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-20 h-20 border-8 border-gray-50 border-t-[#FFD52B] rounded-full animate-spin"></div>
        </div>
    );

    if (!pkg) return <div className="pt-40 text-center text-gray-400 font-bold tracking-widest italic">PACKAGE NOT FOUND</div>;

    return (
        <div className="packageDetailPage">
            {/* Hero Header */}
            <section className="heroHeader">
                <div className="overlay"></div>
                {/* Background pattern */}
                <div className="bgText">WEGOMAP TRAVEL</div>

                <div className="heroContent animate-in fade-in zoom-in duration-1000">
                    <Link href="/packages" className="backBtn">
                        <ArrowLeft size={16} /> Back to All Tours
                    </Link>
                    <h1>{pkg.title}</h1>
                    <div className="infoGrid">
                        <div className="infoItem">
                            <div className="label">Duration</div>
                            <div className="value"><Clock size={16} /> {pkg.duration}</div>
                        </div>
                        <div className="infoItem borderSide">
                            <div className="label">Location</div>
                            <div className="value"><MapPin size={16} /> {pkg.location}</div>
                        </div>
                        <div className="infoItem">
                            <div className="label">Budget starting from</div>
                            <div className="value priceValue">₹{pkg.price}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="mainContent animate-in fade-in slide-in-from-bottom duration-700">
                <div className="homeContainer">
                    <div className="contentGrid">
                        {/* Left Column Description */}
                        <div className="detailsCol">
                            <div className="overviewBox group">
                                <div className="blurBg"></div>
                                <h2><Sparkles /> Overview.</h2>
                                <p className="description">&quot;{pkg.description || "Experience the breathtaking beauty of this destination with our carefully curated tour package."}&quot;</p>
                                <div className="amenitiesGrid">
                                    <div className="amenity">
                                        <div className="iconBox blue"><Building2 size={20} /></div>
                                        <span>3-Star Hotels</span>
                                    </div>
                                    <div className="amenity">
                                        <div className="iconBox rose"><Utensils size={20} /></div>
                                        <span>Daily Meals</span>
                                    </div>
                                    <div className="amenity">
                                        <div className="iconBox emerald"><Car size={20} /></div>
                                        <span>A/C Transfers</span>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-20">
                                <h3 className="sectionTitle">Trip Highlights.</h3>
                                <div className="highlightsGrid">
                                    {pkg.highlights?.length > 0 ? pkg.highlights.map((h, i) => (
                                        <div key={i} className="highlightItem group">
                                            <div className="checkIcon"><Check size={16} /></div>
                                            <span>{h}</span>
                                        </div>
                                    )) : [
                                        'Expert Local Guide Assistance',
                                        'Entrance to major sightseeing spots',
                                        'Welcome drink upon arrival',
                                        '24/7 support during travel'
                                    ].map((h, i) => (
                                        <div key={i} className="highlightItem">
                                            <div className="checkIcon"><Check size={16} /></div>
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            {pkg.itinerary?.length > 0 && (
                                <div className="itinerarySection">
                                    <h3 className="itineraryTitle">Itinerary Plan.</h3>
                                    <div className="itineraryTimeline">
                                        {pkg.itinerary.map((item, i) => (
                                            <div key={i} className="timelineItem group">
                                                <div className="dot"></div>
                                                <div className="dayLabel">Day 0{i + 1}</div>
                                                <h4>{item.day}</h4>
                                                <p>{item.activity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column Booking Card */}
                        <div className="bookingCol">
                            <div className="bookingCard group">
                                <div className="decorCircle"></div>
                                <h4>Book This <br /><span>Adventure.</span></h4>

                                <div className="priceRow">
                                    <div className="priceWrap"><span>₹</span>{pkg.price}</div>
                                    <div className="perPerson">Per <br />Person</div>
                                    <div className="iconBox">
                                        <Clock size={24} />
                                    </div>
                                </div>

                                <div className="actions">
                                    <Link href="/contact" className="enquireBtn">
                                        Enquire Now
                                    </Link>
                                    <button className="pdfBtn">
                                        Download PDF
                                    </button>
                                </div>

                                <div className="badges">
                                    <div className="badgeItem">
                                        <div className="dot green"></div>
                                        <span>Available All Year</span>
                                    </div>
                                    <div className="badgeItem">
                                        <div className="dot blue"></div>
                                        <span>Best Price Guaranteed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
