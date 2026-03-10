"use client";

import { MoveRight, Heart, Target, Rocket, Users, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import PageBanner from '@/components/PageBanner';

const carouselImages = [
    { src: 'https://www.wegomap.com/assests/site/assets/images/about-1.jpg', alt: 'About Wegomap 1' },
    { src: 'https://www.wegomap.com/assests/site/assets/images/about-3.jpg', alt: 'About Wegomap 2' },
    { src: 'https://www.wegomap.com/assests/site/assets/images/about-2.jpg', alt: 'About Wegomap 3' },
];

export default function AboutPage() {
    return (
        <div className="aboutPage">

            {/* ── Page Banner ── */}
            <PageBanner
                title="We plan your
Dream Destinations.!"
                subtitle="Learn about Wegomap — your trusted travel partner since 2012."
                breadcrumbs={[{ label: 'About Us' }]}
            />

            {/* ── Full-width Carousel ── */}
            <div className="aboutCarouselWrap">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop
                    className="aboutSwiper"
                >
                    {carouselImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="aboutSlideImg">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority={i === 0}
                                    unoptimized
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Two-column Content ── */}
            <div className="aboutContentSection homeContainer">
                <div className="aboutContentGrid">

                    {/* Left column */}
                    <div className="aboutColLeft">
                        <h2 className="aboutColHeading">
                            Wegomap is a one-stop travel solution to destinations around the world.
                        </h2>
                        <p className="aboutColText">
                            We have a dedicated team of travel professionals who can cater to all your travel
                            needs. Our team will be just one ring away from all your travel-related enquiries.
                            We customise both Indian and International Tour packages within your budget. Our
                            company maintains good relationship with Resorts, Hotels and Transportation team.
                            The company is located near Cochin Airport and all the tour package operations are
                            managed by our Kerala Team.
                        </p>
                    </div>

                    {/* Right column */}
                    <div className="aboutColRight">
                        <p className="aboutColText">
                            We can offer you the best Kerala Honeymoon Packages and Kerala Family packages
                            which include Munnar Hill station, Thekkady Wildlife, Aleppey Backwater and
                            houseboat. We are highly dedicated to delivering you the best service in the
                            industry. Suggestions and complaints will be treated with due respect &amp;
                            rectifications will be made.
                        </p>
                        <p className="aboutColText mt-sm">
                            You can contact us at any time — our 24/7 support team will be available to
                            answer your queries.
                        </p>
                        <a className="aboutTalkBtn" href="tel:+918590370566">
                            <Phone size={18} />
                            Talk to an expert
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Values Section ── */}
            <div className="homeContainer">
                <section className="valuesSection">
                    <h2>Our Core Values.</h2>
                    <div className="valuesGrid">
                        <div className="valueItem">
                            <div className="iconCircle"><Heart size={40} /></div>
                            <div>
                                <h4>Customer First</h4>
                                <p>Your satisfaction is our ultimate priority during your journey.</p>
                            </div>
                        </div>
                        <div className="valueItem">
                            <div className="iconCircle"><Target size={40} /></div>
                            <div>
                                <h4>Professionalism</h4>
                                <p>Highly managed logs and assistance for a smooth travel experience.</p>
                            </div>
                        </div>
                        <div className="valueItem">
                            <div className="iconCircle"><Rocket size={40} /></div>
                            <div>
                                <h4>Innovation</h4>
                                <p>Constantly creating new ways to experience God&apos;s Own Country.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Stats Row ── */}
                <div className="aboutStatsRow">
                    {[
                        { icon: <Heart size={24} />, count: '5,000+', label: 'Happy Customers' },
                        { icon: <Users size={24} />, count: '10,000+', label: 'Miles Traveled' },
                        { icon: <Target size={24} />, count: '100+', label: 'Tour Packages' },
                        { icon: <Rocket size={24} />, count: '12+', label: 'Years Experience' },
                    ].map((s, i) => (
                        <div key={i} className="aboutStatItem">
                            <div className="aboutStatIcon">{s.icon}</div>
                            <div className="aboutStatCount">{s.count}</div>
                            <div className="aboutStatLabel">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── CTA ── */}
                <div className="planTripCta">
                    <h3>Ready to see the beauty of Kerala?</h3>
                    <Link href="/contact" className="ctaBtn">
                        Plan Your Trip Now <MoveRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
