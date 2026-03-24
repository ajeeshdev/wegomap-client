"use client";
import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import { API_URL, getImageUrl } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function OfferBanner() {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef<any>(null);

    useEffect(() => {
        fetch(`${API_URL}/offer-banners`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBanners(data.data.filter((b: any) => b.active));
                }
            })
            .catch(err => console.error("Failed to load offer banners:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading || banners.length === 0) return null;

    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: "12%", 
        slidesToShow: 1,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.165, 0.84, 0.44, 1)",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerPadding: "8%",
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: "5%",
                }
            }
        ]
    };

    return (
        <section className="offerBannerSection py-6 md:py-10 overflow-hidden bg-white">
            <div className="relative group slickFullWidth">
                <Slider ref={sliderRef} {...settings}>
                    {banners.map((banner, idx) => (
                        <div key={idx} className="px-2 md:px-4 focus:outline-none">
                            <div className="bannerWrapper relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                                {banner.link ? (
                                    <Link href={banner.link} className="block w-full h-full relative">
                                        <Image
                                            src={getImageUrl(banner.image)}
                                            alt={banner.title || 'Offer'}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            unoptimized
                                        />
                                    </Link>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={getImageUrl(banner.image)}
                                            alt={banner.title || 'Offer'}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Custom Slick Navigation */}
                <button 
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="offer-prev absolute left-4 md:left-[8%] top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-600 hover:text-white border border-slate-100"
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    onClick={() => sliderRef.current?.slickNext()}
                    className="offer-next absolute right-4 md:right-[8%] top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-600 hover:text-white border border-slate-100"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            <style jsx global>{`
                .slickFullWidth .slick-list {
                    overflow: visible !important;
                }
                .slickFullWidth .slick-slide {
                    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                    opacity: 0.5;
                    transform: scale(0.9);
                    filter: blur(1px);
                    padding: 0 10px;
                }
                .slickFullWidth .slick-center {
                    opacity: 1;
                    transform: scale(1);
                    filter: blur(0);
                    z-index: 10;
                }
                .slick-dots {
                    bottom: -40px !important;
                }
                .slick-dots li button:before {
                    font-size: 10px !important;
                    color: #cbd5e1 !important;
                    opacity: 1 !important;
                }
                .slick-dots li.slick-active button:before {
                    color: #f97316 !important;
                    font-size: 12px !important;
                }

                @media (max-width: 768px) {
                    .offer-prev, .offer-next {
                        opacity: 1 !important;
                        width: 44px !important;
                        height: 44px !important;
                    }
                }
            `}</style>
        </section>
    );
}
