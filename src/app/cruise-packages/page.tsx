import Link from 'next/link';
import Image from 'next/image';

export default function CruisePage() {
    return (
        <div className="cruisePage">
            {/* ── Banner ── */}
            <section className="cruiseBanner">
                <div className="cruiseBannerImg">
                    <Image
                        src="https://www.wegomap.com/uploads/categories/cruise-ship-banner.jpg"
                        alt="Luxury Cruises"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="cruiseOverlay" />
                </div>
                <div className="cruiseContent">
                    <h1 className="cruiseTitle">Discover Luxury on the Sea</h1>
                    <p className="cruiseSub">Best Cruise Experiences Guaranteed</p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="cruiseMain">
                <div className="homeContainer">
                    <div className="cruiseGrid">
                        <div className="cruiseText">
                            <h2>Luxury Cruises with Wegomap</h2>
                            <p>Wegomap specializes in luxury sea travel, offering curated cruise packages to the most beautiful destinations around the world. Whether it's a short 3-night cruise to Singapore or a grand 14-night Mediterranean voyage, we have you covered.</p>
                            <p>We partner with major cruise lines including Royal Caribbean, Star Cruises, and Genting Dream to provide you with top-notch amenities, world-class dining, and unforgettable entertainment.</p>

                            <div className="cruiseFeatures">
                                <div className="featItem">🛳️ <span>Premium Accommodations</span></div>
                                <div className="featItem">🍽️ <span>Gourmet Dining Options</span></div>
                                <div className="featItem">🎭 <span>Live Shows & Entertainment</span></div>
                                <div className="featItem">💰 <span>All-Inclusive Value Plans</span></div>
                            </div>

                            <Link href="/contact" className="cruiseEnquire">
                                Enquire Now for Special Offers
                            </Link>
                        </div>
                        <div className="cruiseSideImg">
                            <Image
                                src="https://www.wegomap.com/uploads/categories/royal-caribbean-ship.jpg"
                                alt="Cruise Ship"
                                width={600}
                                height={400}
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
