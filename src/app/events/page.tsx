"use client";

import { useEffect, useState } from 'react';
import { MoveRight, PartyPopper, CalendarClock, Globe, ShieldCheck } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

interface EventPlan {
    _id: string;
    title: string;
    heroHeading: string;
    description: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<EventPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getEvents() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                const data = await res.json();
                if (data.success) {
                    setEvents(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getEvents();
    }, []);

    return (
        <div className="eventsPage">
            <PageBanner
                title="Events"
                subtitle="Corporate outings, family reunions & celebrations handled with style."
                breadcrumbs={[{ label: 'Events' }]}
            />

            <div className="homeContainer">
                <div className="headerRow animate-in fade-in slide-in-from-left duration-700">
                    <span className="subTitle">Corporate &amp; Family Events</span>
                    <h2>Memorable <br /><span>Celebrations.</span></h2>
                    <p className="description">Whether it&apos;s a corporate team outing or a grand family reunion, we handle every detail with precision and style.</p>

                    <div className="featuresRow">
                        <div className="featureItem">
                            <div className="iconBox"><CalendarClock size={20} /></div>
                            <span>Seamless Planning</span>
                        </div>
                        <div className="featureItem">
                            <div className="iconBox"><Globe size={20} /></div>
                            <span>Global Venues</span>
                        </div>
                        <div className="featureItem">
                            <div className="iconBox"><ShieldCheck size={20} /></div>
                            <span>Certified Team</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loadingWrapper">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="eventsList">
                        {events.map((event, idx) => (
                            <div key={event._id} className={`eventItem group ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                                <div className="visualArea">
                                    <div className="placeholder">
                                        <PartyPopper size={64} />
                                    </div>
                                    <div className="badge">Premium Service</div>
                                </div>

                                <div className="contentArea">
                                    <h3>{event.title}</h3>
                                    <div className="heroHeading">{event.heroHeading || 'Turning moments into memories'}</div>
                                    <p className="description">{event.description || "Exciting event planning experience with professional management."}</p>

                                    <div className="btnWrapper">
                                        <button onClick={() => alert('Event Enquiry feature coming soon!')} className="enquireBtn">
                                            Enquire for Event <MoveRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && events.length === 0 && (
                    <div className="emptyState">
                        <h3>Coming soon...</h3>
                    </div>
                )}
            </div>

            <div className="bgDecor top"></div>
            <div className="bgDecor bottom"></div>
        </div>
    );
}
