"use client";

import { API_URL, getImageUrl } from '@/config';
import { MoveRight, Heart, Target, Rocket, Users, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import DynamicPageBanner from '@/components/DynamicPageBanner';

import { useEffect, useState } from 'react';

const carouselImages = [
    { src: '/assets/site/assets/images/about-1.jpg', alt: 'About WEGOMAP 1' },
    { src: '/assets/site/assets/images/about-3.jpg', alt: 'About WEGOMAP 2' },
    { src: '/assets/site/assets/images/about-2.jpg', alt: 'About WEGOMAP 3' },
];

interface AboutData {
    banner: { title: string; subtitle: string; image?: string; };
    story: { heading: string; leftText: string; rightText: string; };
    values: { title: string; description: string; }[];
    stats: { label: string; count: string; }[];
}

const DEFAULT_DATA: AboutData = {
    banner: {
        title: "We plan your\nDream Destinations.!",
        subtitle: "Learn about WEGOMAP — your trusted travel partner since 2012."
    },
    story: {
        heading: "WEGOMAP is a one-stop travel solution to destinations around the world.",
        leftText: "We have a dedicated team of travel professionals who can cater to all your travel needs. Our team will be just one ring away from all your travel-related enquiries. We customise both Indian and International Tour packages within your budget. Our company maintains good relationship with Resorts, Hotels and Transportation team. The company is located near Cochin Airport and all the tour package operations are managed by our Kerala Team.",
        rightText: "We can offer you the best Kerala Honeymoon Packages and Kerala Family packages which include Munnar Hill station, Thekkady Wildlife, Aleppey Backwater and houseboat. We are highly dedicated to delivering you the best service in the industry. Suggestions and complaints will be treated with due respect & rectifications will be made.\n\nYou can contact us at any time — our 24/7 support team will be available to answer your queries."
    },
    values: [
        { title: "Customer First", description: "Your satisfaction is our ultimate priority during your journey." },
        { title: "Professionalism", description: "Highly managed logs and assistance for a smooth travel experience." },
        { title: "Innovation", description: "Constantly creating new ways to experience God's Own Country." }
    ],
    stats: [
        { label: "Happy Customers", count: "5,000+" },
        { label: "Miles Traveled", count: "10,000+" },
        { label: "Tour Packages", count: "100+" },
        { label: "Years Experience", count: "12+" }
    ]
};

export default function AboutPage() {
    const [data, setData] = useState<AboutData>(DEFAULT_DATA);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const json = await res.json();
                if (json.success && json.data) {
                    const opt = json.data.find((o: any) => o.key === 'about_page_content');
                    if (opt) setData(JSON.parse(opt.value));
                }
            } catch (err) {
                console.error('Failed to fetch about data', err);
            }
        };
        fetchData();
    }, []);

    const valueIcons = [
        <Heart key="h" size={32} strokeWidth={2.5} />, 
        <Target key="t" size={32} strokeWidth={2.5} />, 
        <Rocket key="r" size={32} strokeWidth={2.5} />
    ];

    const statIcons = [
        <Heart key="s1" size={28} />,
        <Users key="s2" size={28} />,
        <Target key="s3" size={28} />,
        <Rocket key="s4" size={28} />
    ];

    return (
        <div className="aboutPage selection:bg-orange-500/10">

            {/* ── Page Banner (Custom fallback for About) ── */}
            <DynamicPageBanner
                category="about"
                title={data.banner.title}
                subtitle={data.banner.subtitle}
                fallbackPreTitle="Our Legacy"
                fallbackImage={data.banner.image || "/assets/images/banners/about-banner.png"}
                breadcrumbs={[{ label: 'About Us' }]}
            />

            {/* ── Carousel Slider ── */}
            <div className="aboutCarouselWrap homeContainer">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    className="aboutSwiper"
                >
                    {carouselImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="aboutSlideImg">
                                <Image
                                    src={getImageUrl(img.src)}
                                    alt={img.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority={i === 0}
                                    
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── The Narrative Section ── */}
            <div className="aboutContentSection homeContainer">
                <div className="aboutContentGrid">

                    {/* Left: Heading & Main Story */}
                    <div className="aboutColLeft">
                        <div className="aboutBadge mb-6">
                            <span>Our Legacy</span>
                        </div>
                        
                        <h2 className="aboutColHeading whitespace-pre-line">
                            {data.story.heading}
                        </h2>
                        
                        <div className="storyParagraphs whitespace-pre-line">
                            {data.story.leftText.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>

                    {/* Right: Side Narrative Card */}
                    <div className="aboutColRight">
                        <div className="sideCard group">
                            <div className="relative z-10">
                                <div className="aboutColText whitespace-pre-line italic text-slate-500 mb-10">
                                    "{data.story.rightText}"
                                </div>
                                
                                <a className="aboutTalkBtn" href="tel:+918590370566">
                                    <Phone size={20} fill="currentColor" />
                                    <span>Connect with Experts</span>
                                </a>
                                
                                <div className="mt-2 pt-8 border-t border-slate-200/60 ">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="img-box w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative">
                                                    <Image src={`/assets/site/assets/images/about-${i}.jpg`} alt="Team" fill  style={{ objectFit: 'cover' }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none mb-1">24/7 Support Team</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Always here for you</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Values Deck ── */}
            <div className="homeContainer px-4 sm:px-0">
                <section className="valuesSection">
                    <div className="sectionHeader flex items-center justify-center mb-12">
                        <div className="titleArea">
                            <span className="sectionSubtitle">The WEGOMAP Way</span>
                            <h2 className="sliderTitle">Our Core <span className="highlight">Philosophy</span></h2>
                        </div>
                    </div>
                    
                    <div className="valuesGrid">
                        {data.values.map((val, i) => (
                            <div key={i} className="valueItem">
                                <div className="iconCircle">
                                    {valueIcons[i % 3]}
                                </div>
                                <h4>{val.title}</h4>
                                <p>{val.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Impact Stats ── */}
                <div className="aboutStatsRow">
                    {data.stats.map((s, i) => (
                        <div key={i} className="aboutStatItem group">
                            <div className="aboutStatIcon transform group-hover:scale-110 transition-transform">
                                {statIcons[i % 4]}
                            </div>
                            <div className="aboutStatCount">{s.count}</div>
                            <div className="aboutStatLabel">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Action Box ── */}
                <div className="planTripCta relative group">
                    <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10">
                        <h3>Ready to explore God's Own Country?</h3>
                        <Link href="/contact" className="ctaBtn">
                            <span>Get Started Now</span>
                            <MoveRight size={20} className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
