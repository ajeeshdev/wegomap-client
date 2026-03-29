"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
   ArrowRight, ChevronRight, Heart, ShieldCheck, Users, X, MapPin,
   Star, Check, Wifi, Coffee, Waves, Music, Tv, Clock, Phone,
   MessageSquare, Sun, Navigation as LucideNavigation, Utensils, Mountain, Car, Wind, Zap, Plane, Camera, Calendar, User, Info, Mail, Flame, Menu, ChevronLeft
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import "../../../scss/components/_hotel-landing-page.scss";
import { API_URL, getImageUrl } from "@/config";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
   Wifi, Coffee, Utensils, Mountain, Car, ShieldCheck, Wind, Zap, Plane, Camera, Check, Star, MessageSquare, Flame, Clock, Navigation: LucideNavigation, Sun, Tv
};

const AVATAR_COLORS = ["#1673b8", "#8cc647", "#ff6b35", "#6366f1", "#ec4899", "#f59e0b"];
const DEFAULT_ATTRACTIONS = [
   { title: "Eravikulam National Park", distance: "8.5 KM", description: "Home to the endangered Nilgiri Tahr and famous for the blooming of Neelakurinji flowers every 12 years." },
   { title: "Mattupetty Dam", distance: "12.0 KM", description: "A beautiful picnic spot offering boat rides and views of the surrounding hills and elephant sightings." },
   { title: "Tea Museum", distance: "2.5 KM", description: "Learn about the history and processing of tea in this century-old museum, a legacy of Munnar's hills." },
   { title: "Anamudi Peak", distance: "13.0 KM", description: "The highest peak in South India, perfect for trekking and panoramic views of the entire Western Ghats." },
   { title: "Pothamedu Viewpoint", distance: "4.0 KM", description: "Offers stunning views of tea, coffee, and cardamom plantations, an ideal spot for sunset lovers." },
   { title: "Attukal Waterfalls", distance: "7.0 KM", description: "A scenic waterfall surrounded by hills, ideal for trekking enthusiasts and nature photography." },
   { title: "Kundala Lake", distance: "20.0 KM", description: "A picturesque lake famous for the Cherry Blossom trees and offering unique pedal boating experiences." },
   { title: "Top Station", distance: "32.0 KM", description: "The highest point in Munnar offering a breathtaking view along the border of Kerala and Tamil Nadu." },
   { title: "Blossom Park", distance: "3.0 KM", description: "A beautiful garden with exotic flowers and cycling paths, perfect for a calm and refreshing stroll." },
   { title: "Lakkam Waterfalls", distance: "25.0 KM", description: "A crystal clear waterfall nestled in the forest, perfect for a refreshing dip and quiet meditation." }
];

interface HotelLandingPageContent {
   _id: string;
   title: string;
   slug: string;
   banner_title?: string;
   subtitle?: string;
   banner_amount?: string;
   banner_old_amount?: string;
   banner_description?: string;
   banner_image?: string;

   hero_video?: string;
   hero_subtitle?: string;
   hero_cta_text?: string;
   hero_cta_note?: string;
   hero_badge_1?: string;
   hero_badge_2?: string;
   hero_starting_label?: string;
   hero_per_person?: string;

   // Multiple Banner Images for Hero Slider
   banner_images?: string[];

   about_title?: string;
   about_subtitle?: string;
   about_description?: string;
   about_image?: string;
   about_badge_text?: string;
   about_features?: string[];

   hotel_rooms?: {
      title: string;
      description: string;
      images: string[];
      facilities: string[];
   }[];

   hotel_facilities?: {
      icon: string;
      title: string;
      description: string;
   }[];

   why_choose_subtitle?: string;
   why_choose_title?: string;
   why_choose_image?: string;
   why_choose_points?: {
      icon: string;
      title: string;
      description: string;
   }[];

   gallery_subtitle?: string;
   gallery_title?: string;
   gallery_images?: string[];

   testimonials?: {
      content: string;
      author: string;
      date: string;
   }[];

   nearby_subtitle?: string;
   nearby_title?: string;
   nearby_attractions?: {
      title: string;
      distance: string;
      description: string;
   }[];

   location?: string;
   whatsapp_number?: string;
   cta_phone?: string;
   cta_email?: string;
   footer_address?: string;
   footer_email?: string;
   google_maps_iframe?: string;

   hero_title?: string;
   packages_heading?: string;
   packages_lead?: string;
   package_ids?: any[];
}

function formatINR(input: any): string {
   if (input === null || input === undefined || input === "") return "";
   const raw = typeof input === "number" ? input : parseFloat(input.toString().replace(/,/g, ""));
   if (isNaN(raw)) return input.toString();
   return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
   }).format(raw);
}

export default function HotelLandingPageView({ data }: { data: HotelLandingPageContent }) {
   const [hydrated, setHydrated] = useState(false);
   const [logo, setLogo] = useState<string>("/assets/images/logo.png");
   const [temp, setTemp] = useState<string>("...");
   const [condition, setCondition] = useState<string>("Loading Weather...");
   const [weatherIcon, setWeatherIcon] = useState<string>("Sun");
   const [weatherLoading, setWeatherLoading] = useState(false);
   const [openGallery, setOpenGallery] = useState<string | null>(null);
   const [heroSearch, setHeroSearch] = useState({ checkIn: '', checkOut: '', adults: '2 Adults', children: '0 Children' });
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   useEffect(() => {
      setHydrated(true);

      // Fetch Site Logo
      const fetchLogo = async () => {
         try {
            const res = await fetch(`${API_URL}/options`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Network response was not ok");
            const json = await res.json();
            if (json.success) {
               const logoOpt = json.data.find((o: any) => o.key === 'site_logo');
               if (logoOpt && logoOpt.value) setLogo(getImageUrl(logoOpt.value));
               else setLogo('/assets/images/logo.png');
            }
         } catch (err) {
            // Silent failure for options fetch - use default
            setLogo('/assets/images/logo.png');
         }
      };
      fetchLogo();

      // Fetch Weather Logic
      const fetchWeather = async () => {
         if (!data.location) {
            setCondition("Munnar, Kerala");
            setTemp("24°C");
            return;
         }
         try {
            setWeatherLoading(true);
            let lat = 10.0889; let lon = 77.0595; // Default Munnar
            const loc = data.location.toLowerCase();
            if (loc.includes('kochi') || loc.includes('cochin')) { lat = 9.9312; lon = 76.2673; }
            else if (loc.includes('thekkady')) { lat = 9.6031; lon = 77.1615; }
            else if (loc.includes('alleppey')) { lat = 9.4981; lon = 76.3329; }
            else if (loc.includes('wayanad')) { lat = 11.6854; lon = 76.1320; }
            else if (loc.includes('varkala')) { lat = 8.7305; lon = 76.7077; }

            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {
               signal: AbortController ? new AbortController().signal : undefined
            });
            if (!res.ok) return;
            const wJson = await res.json();
            if (wJson.current_weather) {
               setTemp(`${Math.round(wJson.current_weather.temperature)}°C`);
               const code = wJson.current_weather.weathercode;

               // Weather code to text mapping
               if (code === 0) { setCondition("Clear Sky"); setWeatherIcon("Sun"); }
               else if (code <= 3) { setCondition("Partly Cloudy"); setWeatherIcon("Wind"); }
               else if (code >= 51 && code <= 67) { setCondition("Rainy Day"); setWeatherIcon("Waves"); }
               else if (code >= 80 && code <= 82) { setCondition("Rain Showers"); setWeatherIcon("Waves"); }
               else if (code >= 95) { setCondition("Thunderstorm"); setWeatherIcon("Zap"); }
               else { setCondition("Overcast"); setWeatherIcon("Wind"); }
            }
         } catch (e) {
            // Weather fetch failed - silent fallback
         } finally { setWeatherLoading(false); }
      };
      fetchWeather();

      const meta = document.createElement('meta');
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
      document.body.style.paddingBottom = "0px";

      // Swiper doesn't typically need a manual resize event on mount for hydration
      // but if issues arise, a small timeout might be considered.

      return () => {
         document.head.removeChild(meta);
         document.body.style.paddingBottom = "";
      };
   }, []);

   const heroSettings = useMemo(() => ({
      modules: [EffectFade, Autoplay],
      effect: 'fade',
      loop: true,
      speed: 1200,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: 1,
   }), []);

   const aSliderSettings = useMemo(() => ({
      modules: [Navigation, Pagination, Autoplay],
      spaceBetween: 30,
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { clickable: true },
      navigation: {
         nextEl: '.next-attraction',
         prevEl: '.prev-attraction',
      },
      breakpoints: {
         1024: { slidesPerView: 3 },
      }
   }), []);

   const tSliderSettings = useMemo(() => ({
      modules: [Pagination, Autoplay],
      spaceBetween: 30,
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { clickable: true },
      breakpoints: {
         1024: { slidesPerView: 3 },
      }
   }), []);


   const handleHeroSubmit = () => {
      const { checkIn, checkOut, adults, children } = heroSearch;
      if (!checkIn || !checkOut) {
         toast.error("Please select your check-in and check-out dates.");
         return;
      }

      if (!data.whatsapp_number) return;
      const message = `Hi, I'm interested in booking a stay at ${data.title}.\n\n` +
         `📅 Check-in: ${checkIn}\n` +
         `📅 Check-out: ${checkOut}\n` +
         `👥 Guests: ${adults}, ${children}\n\n` +
         `Please let me know about availability.`;
      const waUrl = `https://wa.me/${data.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
   };

   const heroImages = data.banner_images?.length ? data.banner_images.map(img => getImageUrl(img)) : (data.banner_image ? [getImageUrl(data.banner_image)] : ["/bg-placeholder.jpg"]);
   const fallbackTestimonials = [
      { content: "The most peaceful stay I've ever had. The mountain views from the balcony are simply surreal, and the campfire evenings were the highlight of our trip.", author: "Sarah Johnson", date: "March 2026" },
      { content: "Professional service and authentic Kerala cuisine. Aroma Hills is a gem in Munnar. Highly recommend for families and nature lovers.", author: "David Chen", date: "February 2026" },
      { content: "A perfect blend of luxury and nature. The housekeeping was impeccable, and the guided treks showed us parts of Munnar we'd never seen before.", author: "Priya Nair", date: "January 2026" },
      { content: "Exceeded all expectations. The level of detail in the room design and the warmth of the staff made us feel truly at home.", author: "Michael Roe", date: "December 2025" },
      { content: "Watching the sunrise over the hills with a hot cup of local coffee was a spiritual experience. Already planning our next visit!", author: "Anjali Gupta", date: "November 2025" },
      { content: "The curated treks were fantastic. Our guide was knowledgeable and the views were worth every step. A must-visit resort.", author: "Robert Wilson", date: "October 2025" }
   ];
   const testimonialsToDisplay = (data.testimonials && data.testimonials.length > 0) ? data.testimonials : fallbackTestimonials;
   const attractionsToDisplay = (data.nearby_attractions && data.nearby_attractions.length > 0) ? data.nearby_attractions : DEFAULT_ATTRACTIONS;


   if (!hydrated) return null;

   return (
      <div className="hotel-lp-container aroma-hills-theme">
         {/* Custom Header Removed - using global Header instead */}
         {/* Hero Slider */}
         <section className="hotel-hero-centered" id="home">
            <div className="hero-slider-container">
               <Swiper {...heroSettings} className="hero-slider">
                  {heroImages.map((img: string, i: number) => (
                     <SwiperSlide key={i} className="hero-slide">
                        <div className="hero-bg">
                           <Image src={img || "/assets/images/placeholder.jpg"} alt={`Slide ${i}`} fill className="object-cover" priority={i === 0} />
                           <div className="hero-overlay" />
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>

            <div className="hero-content container-ctn text-center">
               {data.subtitle && (
                  <div className="hero-badge-wrap animate-up">
                     <span className="hero-badge-text uppercase">{data.subtitle}</span>
                  </div>
               )}
               <div className="weather-widget mx-auto animate-up delay-1">
                  {weatherIcon === 'Sun' ? <Sun size={18} className="text-amber-400" /> :
                     weatherIcon === 'Zap' ? <Zap size={18} className="text-amber-400" /> :
                        weatherIcon === 'Waves' ? <Waves size={18} className="text-amber-400" /> :
                           <Wind size={18} className="text-amber-400" />}
                  <span className="temp">{weatherLoading ? "..." : temp}</span>
                  <span className="condition">{condition}</span>
               </div>
               <h1 className="hero-title serif animate-up delay-2">{data.hero_title || data.banner_title}</h1>
               <div className="hero-description-box mx-auto max-w-2xl animate-up delay-3">
                  <p>{data.banner_description}</p>
               </div>
               <div className="hero-action-buttons animate-up delay-4">
                  <a href="#rooms" className="btn-primary">{data.hero_cta_text || 'Get a quick plan'}</a>
                  <a href="#gallery" className="btn-outline">Call Reservations</a>
               </div>
               {data.hero_cta_note && <p className="mt-4 text-[10px] uppercase font-bold tracking-widest opacity-60 animate-up delay-5">* {data.hero_cta_note}</p>}
            </div>

            <div className="hero-search-bar-wrap animate-up-large desktop-only">
               <div className="container-ctn">
                  <div className="search-bar">
                     <div className="search-col"><label>Check In</label><input type="text" placeholder="Select Date" onFocus={e => e.target.type = 'date'} onChange={e => setHeroSearch({ ...heroSearch, checkIn: e.target.value })} /></div>
                     <div className="search-col"><label>Check Out</label><input type="text" placeholder="Select Date" onFocus={e => e.target.type = 'date'} onChange={e => setHeroSearch({ ...heroSearch, checkOut: e.target.value })} /></div>
                     <div className="search-col"><label>Adults</label><select onChange={e => setHeroSearch({ ...heroSearch, adults: e.target.value })} value={heroSearch.adults}><option>2 Adults</option><option>1 Adult</option><option>3 Adults</option></select></div>
                     <div className="search-col"><label>Children</label><select onChange={e => setHeroSearch({ ...heroSearch, children: e.target.value })} value={heroSearch.children}><option>0 Children</option><option>1 Child</option><option>2 Children</option></select></div>
                     <div className="search-col btn-col">
                        <button className="book-now-btn-hero" onClick={handleHeroSubmit}>Book Now</button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Mobile-Only Booking Section */}
         <section className="mobile-only-booking-bar lg:hidden">
            <div className="container-ctn">
               <div className="search-bar-mobile-standalone shadow-xl">
                  <div className="search-col-mobile"><label>Check In Date</label><input type="date" onChange={e => setHeroSearch({ ...heroSearch, checkIn: e.target.value })} /></div>
                  <div className="search-col-mobile"><label>Check Out Date</label><input type="date" onChange={e => setHeroSearch({ ...heroSearch, checkOut: e.target.value })} /></div>
                  <div className="search-flex-row">
                     <div className="search-col-mobile flex-1"><label>Adults</label><select onChange={e => setHeroSearch({ ...heroSearch, adults: e.target.value })} value={heroSearch.adults}><option>2 Adults</option><option>1 Adult</option><option>3 Adults</option></select></div>
                     <div className="search-col-mobile flex-1"><label>Children</label><select onChange={e => setHeroSearch({ ...heroSearch, children: e.target.value })} value={heroSearch.children}><option>0 Children</option><option>1 Child</option><option>2 Children</option></select></div>
                  </div>
                  <button className="mobile-submit-btn" onClick={handleHeroSubmit}>Reserve Your Stay</button>
               </div>
            </div>
         </section>

         {/* About Section */}
         <section className="hotel-about commonPadding" id="about">
            <div className="container-ctn">
               <div className="about-grid">
                  <div className="about-img-wrap">
                     <img src={getImageUrl(data.about_image)} className="main-img" alt="Lobby" />
                     {data.about_badge_text && (
                        <div className="privacy-badge">
                           <span className="number">100%</span>
                           {data.about_badge_text}
                        </div>
                     )}
                  </div>
                  <div className="about-text">
                     <span className="subtitle">{data.about_subtitle}</span>
                     <h2 className="title serif">{data.about_title}</h2>
                     <p className="description">{data.about_description}</p>
                     <div className="features-list">
                        {(data.about_features || []).map((f, i) => (
                           <div key={i} className="feature-item">{f}</div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Facilities Section */}
         <section className="hotel-facilities commonPadding" id="amenities">
            <div className="container-ctn">
               <div className="section-head text-center">
                  <span className="subtitle">Curated Amenities</span>
                  <h2 className="title serif">Elevating Your Stay Experience</h2>
               </div>
               <div className="facilities-grid">
                  {[
                     ...(data.hotel_facilities?.length ? data.hotel_facilities : []),
                     { icon: 'Wifi', title: 'Free High-Speed Wi-Fi', description: 'Stay connected with high-speed internet available in all rooms and common areas.' },
                     { icon: 'Flame', title: 'Cozy Night Campfire', description: 'Enjoy warm, cozy evenings under the stars with our professionally arranged campfire.' },
                     { icon: 'Utensils', title: 'In-House Restaurant', description: 'Authentic local delicacies and international cuisines prepared with fresh, local ingredients.' },
                     { icon: 'Mountain', title: 'Panoramic Mountain Views', description: 'Wake up to breathtaking views of the lush green mountains right from your balcony.' },
                     { icon: 'Car', title: 'Safe & Private Parking', description: 'Spacious and secure parking facilities for all our guests within the resort premises.' },
                     { icon: 'ShieldCheck', title: '24/7 Premium Security', description: 'Your safety is our priority with round-the-clock security and CCTV surveillance.' },
                     { icon: 'Clock', title: 'Premium Room Service', description: 'Professional housekeeping and prompt room service for a worry-free stay experience.' },
                     { icon: 'Navigation', title: 'Guided Nature Treks', description: 'Experience the beauty of Munnar with our expert-guided nature walks and treks.' }
                  ].slice(0, 8).map((fac, i) => {
                     const IconComp = ICON_MAP[fac.icon] || Info;
                     return (
                        <div key={i} className="facility-card">
                           <div className="icon-box"><IconComp /></div>
                           <h4 className="f-title serif">{fac.title}</h4>
                           <p className="f-desc">{fac.description}</p>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Rooms Selection */}
         <section className="hotel-rooms bg-stone-50 commonPadding" id="rooms">
            <div className="container-ctn">
               <div className="section-head text-center mb-8">
                  <span className="subtitle">Accommodations</span>
                  <h2 className="title serif text-4xl">{data.packages_heading || 'Our Premium Rooms'}</h2>
                  <p >{data.packages_lead || 'Each room is a blend of traditional Kerala charm and modern boutique luxury.'}</p>
               </div>

               <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                  {data.hotel_rooms?.map((room, i) => (
                     <div key={i} className="room-card-modern bg-white">
                        <div className="img-wrap relative aspect-[4/3]">
                           <Image src={getImageUrl(room.images?.[0])} alt={room.title} fill className="object-cover transition-transform duration-700 hover:scale-110" />
                           <div className="badge">Limited Stock</div>
                        </div>
                        <div className="p-8">
                           <h3 className="serif text-2xl mb-4">{room.title}</h3>
                           <p className="text-sm opacity-60 line-clamp-2 mb-6">{room.description}</p>
                           <div className="flex flex-wrap gap-2 mb-8">
                              {room.facilities.slice(0, 4).map((f, fi) => (
                                 <span key={fi} className="text-[10px] font-bold bg-sage-light text-sage px-3 py-1 rounded-full uppercase tracking-wider">{f}</span>
                              ))}
                           </div>
                           <a href="#contact" className="book-now-btn w-full block text-center">Request Availability</a>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Why Choose Section */}
         <section className="why-choose-aroma commonPadding">
            <div className="container-ctn">
               <div className="why-wrapper">
                  <div className="why-content">
                     <span className="subtitle text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Aroma Difference</span>
                     <h2 className="title serif">{data.why_choose_title || 'What Makes Us Exceptional?'}</h2>
                     <div className="points-list">
                        {data.why_choose_points?.map((pt, i) => {
                           const IconC = ICON_MAP[pt.icon] || Star;
                           return (
                              <div key={i} className="point-item">
                                 <h4 className="p-title serif"><IconC size={20} /> {pt.title}</h4>
                                 <p className="p-desc">{pt.description}</p>
                              </div>
                           );
                        })}
                     </div>
                  </div>
                  <div className="why-image">
                     <img src={getImageUrl(data.why_choose_image)} alt="Why Choose" className="side-img" />
                  </div>
               </div>
            </div>
         </section>

         {/* Gallery Photo Grid */}
         {data.gallery_images && data.gallery_images.length > 0 && (
            <section className="hotel-gallery commonPadding" id="gallery">
               <div className="container-ctn">
                  <div className="section-head text-center">
                     <span className="subtitle">{data.gallery_subtitle || 'Visual Journey'}</span>
                     <h2 className="title serif">{data.gallery_title || 'A Glimpse of Paradise'}</h2>
                  </div>
                  <div className="gallery-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
                     {data.gallery_images.map((img, i) => (
                        <div key={i} className="gallery-item group" onClick={() => setOpenGallery(img)}>
                           <img src={getImageUrl(img)} alt={`Gallery ${i}`} className="transition-all duration-700 group-hover:scale-110" />
                           <div className="overlay"><div className="plus-btn"><Camera size={24} /></div></div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         )}

         {/* Testimonials Slider */}
         {testimonialsToDisplay.length > 0 && (
            <section className="hotel-testimonials commonPadding">
               <div className="container-ctn">
                  <div className="section-head text-center">
                     <span className="subtitle">Guest Stories</span>
                     <h2 className="title serif">Echoes of a Beautiful Stay</h2>
                  </div>
                  <div className="testimonial-slider-wrap lg:px-12 px-2 relative">
                     <Swiper {...tSliderSettings}>
                        {testimonialsToDisplay.map((t: any, i: number) => (
                           <SwiperSlide key={i}>
                              <div className="testimonial-card">
                                 <span className="quote-icon">“</span>
                                 <p className="t-content">{t.content}</p>
                                 <div className="t-meta">
                                    <div
                                       className="avatar"
                                       style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length], color: '#fff' }}
                                    >
                                       {t.author?.charAt(0)}
                                    </div>
                                    <div className="info">
                                       <span className="name serif">{t.author}</span>
                                       <span className="date uppercase tracking-widest">{t.date}</span>
                                    </div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            </section>
         )}

         {/* Nearby Attractions Slider */}
         <section className="nearby-attractions commonPadding">
            <div className="container-ctn">
               <div className="bg-box">
                  <span className="subtitle">{data.nearby_subtitle || 'Explore Nature'}</span>
                  <h2 className="title serif">{data.nearby_title || 'Around the Property'}</h2>
                  <div className="attraction-slider-wrap relative">
                     <Swiper {...aSliderSettings}>
                        {attractionsToDisplay.map((att, i) => (
                           <SwiperSlide key={i}>
                              <div className="attraction-card">
                                 <h4 className="a-title serif">{att.title}</h4>
                                 <span className="a-dist">{att.distance}</span>
                                 <p className="a-desc">{att.description}</p>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>

                     {/* Custom Arrows for Attractions */}
                     <div className="prev-attraction absolute top-1/2 -left-12 z-20 cursor-pointer w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 hover:bg-slate-50 desktop-only -translate-y-1/2 shadow-lg">
                        <ChevronLeft size={20} />
                     </div>
                     <div className="next-attraction absolute top-1/2 -right-12 z-20 cursor-pointer w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 hover:bg-slate-50 desktop-only -translate-y-1/2 shadow-lg">
                        <ChevronRight size={20} />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Contact & Map Integration */}
         <section className="contact-location commonPadding" id="contact">
            <div className="container-ctn">
               <div className="contact-final-wrapper">
                  {/* Row 1: Quick Info Cards */}
                  <div className="info-cards-grid">
                     <div className="info-card-final shadow-sm">
                        <div className="icon"><MapPin size={22} /></div>
                        <div className="details">
                           <h6>Our Resort</h6>
                           <p>{data.footer_address}</p>
                        </div>
                     </div>
                     <div className="info-card-final shadow-sm">
                        <div className="icon"><Phone size={22} /></div>
                        <div className="details">
                           <h6>Reservations</h6>
                           <p>{data.cta_phone}</p>
                        </div>
                     </div>
                     <div className="info-card-final shadow-sm">
                        <div className="icon"><Mail size={22} /></div>
                        <div className="details">
                           <h6>Email Us</h6>
                           <p>{data.footer_email}</p>
                        </div>
                     </div>
                  </div>

                  {/* Row 2: Form & Map Split */}
                  <div className="form-map-final-grid">
                     <div className="form-column-final">
                        <div className="form-card-final shadow-2xl">
                           <div className="card-header">
                              <h4 className="serif">Send a Request</h4>
                              <p>Complete the details below for a customized quote.</p>
                           </div>
                           <div className="form-fields">
                              <div className="field-triple-row">
                                 <div className="admin-form-group">
                                    <label>Your Name</label>
                                    <input type="text" placeholder="John Doe" />
                                 </div>
                                 <div className="admin-form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" />
                                 </div>
                                 <div className="admin-form-group">
                                    <label>Phone Number</label>
                                    <input type="text" placeholder="+91 000 000 0000" />
                                 </div>
                              </div>
                              <div className="admin-form-group mt-6">
                                 <label>Tell us your requirements</label>
                                 <textarea rows={4} placeholder="Number of guests, room preferences..."></textarea>
                              </div>
                              <div className="flex items-center justify-between gap-6 flex-wrap mt-8">
                                 <button className="submit-btn-final">Send Request</button>
                                 {data.whatsapp_number && (
                                    <a href={`https://wa.me/${data.whatsapp_number.replace(/\D/g, '')}`} className="wa-final-link" target="_blank">
                                       <MessageSquare size={16} /> WhatsApp Inquiry
                                    </a>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="map-column-final">
                        <div className="map-container-final shadow-xl">
                           {data.google_maps_iframe ? (
                              <div dangerouslySetInnerHTML={{ __html: data.google_maps_iframe }} className="h-full w-full" />
                           ) : (
                              <iframe
                                 src={`https://www.google.com/maps/embed/v1/place?key=AIzaSy...&q=${encodeURIComponent(data.location || 'Munnar')}`}
                                 className="h-full w-full border-none"
                                 allowFullScreen
                              />
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Custom Footer Removed - using global Footer instead */}
         {/* Lightbox Wrapper */}
         {openGallery && (
            <div className="fixed inset-0 z-[5000] bg-black/98 flex items-center justify-center p-10 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setOpenGallery(null)}>
               <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-all"><X size={48} /></button>
               <div className="relative max-w-6xl w-full aspect-video">
                  <Image src={openGallery} className="object-contain rounded-2xl shadow-2xl" fill alt="Gallery Zoom" />
               </div>
            </div>
         )}

         {/* Custom Floating Action Buttons Removed - using global floating WhatsApp/Chatbot instead */}    </div>
   );
}
