"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
    {
        title: "Gods Own Kerala",
        subtitle: "A Journey Through Paradise",
        buttonText: "Kerala Packages",
        buttonHref: "/kerala-tour-packages",
        imgDesktop: "/uploads/sliders/u4Ls79zJPPnZeU9jFEzsHRnCLiXvXeqdovdlckqM260226031959.jpg",
        imgMobile: "/uploads/sliders/u4Ls79zJPPnZeU9jFEzsHRnCLiXvXeqdovdlckqM260226031959-985x500.jpg",
        imgPortrait: "/uploads/sliders/u4Ls79zJPPnZeU9jFEzsHRnCLiXvXeqdovdlckqM260226031959-412x915.jpg"
    },
    {
        title: "Amazing Thailand",
        subtitle: "The Land of Smiles Awaits",
        buttonText: "Thailand Packages",
        buttonHref: "/international-packages",
        imgDesktop: "/uploads/sliders/VXL3I4Y7Rvrn4oVcX2IjQXxniHzV4jdbFaFGcFIq250715061723.jpg",
        imgMobile: "/uploads/sliders/VXL3I4Y7Rvrn4oVcX2IjQXxniHzV4jdbFaFGcFIq250715061723-985x500.jpg",
        imgPortrait: "/uploads/sliders/VXL3I4Y7Rvrn4oVcX2IjQXxniHzV4jdbFaFGcFIq250715061723-412x915.jpg"
    },
    {
        title: "Sail Away in Luxury",
        subtitle: "Relaxation with Ocean Views",
        buttonText: "View More",
        buttonHref: "/cruise-packages",
        imgDesktop: "/uploads/sliders/47i1zjrs0f2dSgQUuuIc3wIBajZyoqVIwDnybQ7L250901035243.jpg",
        imgMobile: "/uploads/sliders/47i1zjrs0f2dSgQUuuIc3wIBajZyoqVIwDnybQ7L250901035243-985x500.jpg",
        imgPortrait: "/uploads/sliders/47i1zjrs0f2dSgQUuuIc3wIBajZyoqVIwDnybQ7L250901035243-412x915.jpg"
    },
    {
        title: "Beautiful Malaysia",
        subtitle: "Tropical Trails of Malaysia",
        buttonText: "Malaysian Packages",
        buttonHref: "/international-packages",
        imgDesktop: "/uploads/sliders/fubJmwGlkYE1fIaZH8OHcrTQYp1ck3RDDSLhLA27250715061738.jpg",
        imgMobile: "/uploads/sliders/fubJmwGlkYE1fIaZH8OHcrTQYp1ck3RDDSLhLA27250715061738-985x500.jpg",
        imgPortrait: "/uploads/sliders/fubJmwGlkYE1fIaZH8OHcrTQYp1ck3RDDSLhLA27250715061738-412x915.jpg"
    },
    {
        title: "Corporate Events",
        subtitle: "Celebrate in Style",
        buttonText: "View more",
        buttonHref: "/corporate-event-management-company-kochi",
        imgDesktop: "/uploads/sliders/hA1u3jrSMYiQ4140gXAuTl3ZU0AKikjxagS1mnSy250901042122.jpg",
        imgMobile: "/uploads/sliders/hA1u3jrSMYiQ4140gXAuTl3ZU0AKikjxagS1mnSy250901042122-985x500.jpg",
        imgPortrait: "/uploads/sliders/hA1u3jrSMYiQ4140gXAuTl3ZU0AKikjxagS1mnSy250901042122-412x915.jpg"
    }
];

export default function Hero() {
    const searchRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (searchRef.current && window.innerWidth <= 768) {
                const parent = searchRef.current.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    if (parentRect.bottom <= 85) {
                        setIsSticky(true);
                        document.body.classList.add('mobile-search-sticky');
                    } else if (parentRect.bottom > 110) {
                        setIsSticky(false);
                        document.body.classList.remove('mobile-search-sticky');
                    }
                }
            } else {
                setIsSticky(false);
                document.body.classList.remove('mobile-search-sticky');
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="heroSection">
            <div className="homeContainer">
                <div className="heroBanner group">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        className="heroSwiper"
                    >
                        {slides.map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="slideContent">
                                    <div className="imageWrapper">
                                        <picture>
                                            <source media="(max-width: 480px)" srcSet={slide.imgPortrait} />
                                            <source media="(max-width: 768px)" srcSet={slide.imgMobile} />
                                            <Image
                                                src={slide.imgDesktop}
                                                alt={slide.title}
                                                fill
                                                className="object-cover"
                                                priority={idx === 0}
                                            />
                                        </picture>
                                        <div className="overlay" />
                                    </div>

                                    <div className="contentOverlay">
                                        <h1>{slide.title}</h1>
                                        <p className="heroSubheading">{slide.subtitle}</p>
                                        <Link href={slide.buttonHref} className="heroPackageBtn">{slide.buttonText}</Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Pill Search Bar overlapping bottom */}
                    <div className={`heroSearchWrapper ${isSticky ? 'is-sticky' : ''}`} ref={searchRef}>
                        <div className="searchPill">
                            <div className="inputArea">
                                <MapPin size={20} className="locationIcon" />
                                <input
                                    type="text"
                                    placeholder="Search Destination"
                                />
                            </div>
                            <button className="submitBtn">
                                <Search size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

