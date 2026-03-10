import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
    return (
        <div className="eventsPage">
            <section className="eventsBanner">
                <div className="eventsBannerImg">
                    <Image
                        src="https://www.wegomap.com/uploads/categories/corporate-event-banner.jpg"
                        alt="Corporate Events"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="eventsOverlay" />
                </div>
                <div className="eventsContent">
                    <h1 className="eventsTitle">Corporate Events Management in Kochi</h1>
                    <p className="eventsSub">Planning Impactful & Seamless Corporate Events</p>
                </div>
            </section>

            <section className="eventsIntro">
                <div className="homeContainer">
                    <div className="eventsRow">
                        <div className="eventsColText">
                            <h2>The Best Corporate Event Planners in Kerala</h2>
                            <p>Wegomap Tour & Events is a leading name in management of corporate events in Kochi. We specialize in conceptualizing and executing events that align with your brand's vision and goals.</p>
                            <p>From high-profile product launches and industry conferences to team-building retreats and annual celebrations, our team handles every detail with precision. We take care of venue selection, stage management, audio-visual setups, catering, and guest logistics.</p>

                            <ul className="eventsList">
                                <li><strong>Product Launches</strong> - Create a buzz for your new offerings.</li>
                                <li><strong>Industry Conferences</strong> - Seamless logistics for professional gatherings.</li>
                                <li><strong>Team Building</strong> - Engaging activities to boost employee morale.</li>
                                <li><strong>Award Ceremonies</strong> - Elegant celebrations for excellence.</li>
                            </ul>

                            <Link href="/contact" className="eventsEnquire">
                                Get a Proposal for your Event
                            </Link>
                        </div>
                        <div className="eventsColImg">
                            <Image
                                src="https://www.wegomap.com/uploads/categories/event-setup-beach.jpg"
                                alt="Event Setup"
                                width={600}
                                height={450}
                                className="rounded-2xl shadow-xl"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
