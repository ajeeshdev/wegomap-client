"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { API_URL, getImageUrl } from "@/config";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CommonTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [homeSections, setHomeSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [testRes, optsRes] = await Promise.all([
                    fetch(`${API_URL}/testimonials`),
                    fetch(`${API_URL}/options`)
                ]);

                const testData = await testRes.json();
                const optsData = await optsRes.json();

                if (testData.success) {
                    setTestimonials(testData.data.map((t: any) => ({
                        name: t.name || t.title,
                        role: t.location || t.designation || 'Verified Traveler',
                        avatar: t.image ? getImageUrl(t.image) : null,
                        quote: t.message || t.review || t.text || t.description || 'Great experience!'
                    })));
                }

                if (optsData.success) {
                    const homeSecOpt = optsData.data.find((o: any) => o.key === 'home_sections');
                    if (homeSecOpt) try { setHomeSections(JSON.parse(homeSecOpt.value)); } catch(e) {}
                }
            } catch (err) {
                console.error("Failed to load testimonials:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const section = homeSections.find(s => s.id === 'testimonials');
    const isEnabled = section?.enabled ?? true;

    if (loading || !isEnabled || testimonials.length === 0) return null;

    return (
        <section className="commonPadding bg-slate-50 testimonialSection" id="testimonials">
            <div className="homeContainer">
                <div className="sectionHeader flex items-center justify-center mb-6">
                    <div className="titleArea">
                        <span className="sectionSubtitle">{section?.subtitle || "Guest Experiences"}</span>
                        <h2 className="sliderTitle">{section?.title || "What Travelers Are Saying"}</h2>
                    </div>
                </div>
                
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={testimonials.length > 2}
                    autoplay={{ delay: 6000 }}
                    pagination={{ clickable: true, el: '.test-pagination' }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 }
                    }}
                    className="testimonialSwiper"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="testimonialCard">
                                <div className="quoteIcon"><MessageSquare size={24} /></div>
                                <p className="testimonialText">"{t.quote || "Exceptional service and unforgettable memories. Highly recommend WEGOMAP!"}"</p>
                                <div className="authorArea">
                                    <div className="authorImg">
                                        <Image 
                                            src={t.avatar || "/assets/site/assets/images/google-review.svg"} 
                                            alt={t.name} 
                                            width={32} 
                                            height={32} 
                                            className="rounded-full"
                                        />
                                    </div>

                                    <div className="authorInfo">
                                        <h4 className="authorName">{t.name || "Happy Traveler"}</h4>
                                        <div className="authorStars flex gap-0.5">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#fbbf24" color="#fbbf24" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="test-pagination mt-8 flex justify-center"></div>
            </div>
        </section>
    );
}
