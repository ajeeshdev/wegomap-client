"use client";

import {
  Heart,
  Search,
  Star,
  ChevronRight,
  MapPin,
  Package,
  Plane,
  Building2,
  Ship,
  FileCheck,
  Car,
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileText,
  Phone,
  Info,
  Users,
  Twitter,
  Globe,
  Zap,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Compass,
  ShieldCheck,
  Mail,
  Home as HomeIcon,
  Contact
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import Hero from "@/components/Hero";
import { API_URL, getImageUrl } from "@/config";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function WishlistButton({ id, wishlist, toggleWishlist }: { id: string, wishlist: string[], toggleWishlist: (id: string, e: React.MouseEvent) => void }) {
  const isSelected = wishlist.includes(id);
  return (
    <button
      className={`wishlistBtn ${isSelected ? 'selected' : ''}`}
      aria-label="Add to wishlist"
      onClick={(e) => toggleWishlist(id, e)}
    >
      <Heart size={18} fill={isSelected ? "currentColor" : "none"} />
    </button>
  );
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stickyLinks, setStickyLinks] = useState<any[]>([]);
  const [stickySettings, setStickySettings] = useState({ brandTitle: 'Your world', brandSubtitle: 'Your way' });

  const [packages, setPackages] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [homePage, setHomePage] = useState<any>(null);
  const [corporatePage, setCorporatePage] = useState<any>(null);
  const [homeSections, setHomeSections] = useState<any[]>([]);
  const [corporateEvents, setCorporateEvents] = useState<any[]>([]);
  const [specialEvents, setSpecialEvents] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json();
          if (data.success && data.data.wishlist) {
            setWishlist(data.data.wishlist);
          }
        }
      } catch (e) {
        console.error('Error fetching wishlist status:', e);
      }
    }
  };

  const toggleWishlist = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to save tours');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/wishlist/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setWishlist(data.data);
          toast.success(data.message);
        }
      }
    } catch (err) {
      toast.error('Failed to update wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const services = [
    { name: "Services", icon: "Info", href: "/services" },
    { name: "Tours", icon: "MapPin", active: true, href: "/tours" },
    { name: "Events", icon: "Calendar", href: "/events" },
    { name: "Cruises", icon: "Ship", href: "/cruise-packages" },
    { name: "Blogs", icon: "FileText", href: "/blogs" },
    { name: "Contact", icon: "Phone", href: "/contact" },
  ];

  const IconMap: Record<string, any> = {
    Home: HomeIcon, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar, 
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact, ClipboardList: FileText
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [pkgsRes, destsRes, testRes, pagesRes, optsRes, corpEventsRes, specEventsRes] = await Promise.all([
          fetch(`${API_URL}/packages`),
          fetch(`${API_URL}/destinations`),
          fetch(`${API_URL}/testimonials`),
          fetch(`${API_URL}/pages`),
          fetch(`${API_URL}/options`),
          fetch(`${API_URL}/events`),
          fetch(`${API_URL}/special-events`)
        ]);

        const safeJson = async (res: Response) => {
            if (res.headers.get('content-type')?.includes('application/json')) {
                return await res.json();
            }
            return { success: false, data: [] };
        };

        const pkgsData = await safeJson(pkgsRes);
        const destsData = await safeJson(destsRes);
        const testData = await safeJson(testRes);
        const pagesData = await safeJson(pagesRes);
        const optsData = await safeJson(optsRes);
        const corpEventsData = await safeJson(corpEventsRes);
        const specEventsData = await safeJson(specEventsRes);

        if (pkgsData.success) setPackages(pkgsData.data);
        if (destsData.success) setDestinations(destsData.data);
        if (corpEventsData.success) setCorporateEvents(corpEventsData.data);
        if (specEventsData.success) setSpecialEvents(specEventsData.data);
        
        if (testData.success) {
            const apiUrl = API_URL || '';
            setTestimonials(testData.data.map((t: any) => ({
                name: t.name || t.title,
                role: t.location || t.designation || 'Verified Traveler',
                avatar: getImageUrl(t.image) || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
                quote: t.review || t.text || t.description || 'Great experience!'
            })));
        }

        if (pagesData.success) {
            const home = pagesData.data.find((p: any) => p.slug === 'home');
            const corporate = pagesData.data.find((p: any) => p.slug === 'events');
            if (home) setHomePage(home);
            if (corporate) setCorporatePage(corporate);

            if (home && typeof document !== 'undefined') {
                document.title = home.seo_title || document.title;
            }
        }

        if (optsData.success) {
            const styOpt = optsData.data.find((o: any) => o.key === 'sticky_links');
            if (styOpt) try { setStickyLinks(JSON.parse(styOpt.value)); } catch(e) {}

            const stySetOpt = optsData.data.find((o: any) => o.key === 'sticky_settings');
            if (stySetOpt) try { setStickySettings(JSON.parse(stySetOpt.value)); } catch(e) {}

            const homeSecOpt = optsData.data.find((o: any) => o.key === 'home_sections');
            if (homeSecOpt) try { setHomeSections(JSON.parse(homeSecOpt.value)); } catch(e) {}
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute categorized packages based on dynamic data
  // Convert _id to href and extract basic features
  const parsedPackages = packages.map(pkg => ({
      ...pkg,
      title: pkg.title,
      price: pkg.price ? `₹${pkg.price.toLocaleString()}` : 'N/A',
      oldPrice: pkg.oldamt ? `₹${Number(pkg.oldamt).toLocaleString()}` : null,
      image: getImageUrl(pkg.thumb || (pkg.images && pkg.images[0]) || '/bg-placeholder.jpg'),
      href: `/packages/${pkg.slug || pkg._id}`
  }));

  const firstMinuteOffers = parsedPackages.filter(p => p.onoffer).slice(0, 8);
  
  const isInternational = (title: string, category: string, location: string) => {
      const search = `${title} ${category} ${location}`.toLowerCase();
      return search.includes('dubai') || search.includes('thailand') || 
             search.includes('singapore') || search.includes('malaysia') || 
             search.includes('bali') || search.includes('vietnam') || 
             search.includes('bhutan') || search.includes('nepal') || 
             search.includes('international');
  };

  const isKerala = (title: string, category: string, location: string) => {
      const search = `${title} ${category} ${location}`.toLowerCase();
      return search.includes('kerala') || search.includes('kochi') || 
             search.includes('munnar') || search.includes('alleppey') || 
             search.includes('wayanad');
  };

  const internationalPackages = parsedPackages.filter(p => isInternational(p.title, p.category || '', p.location || '')).slice(0, 10);
  const keralaPackages = parsedPackages.filter(p => isKerala(p.title, p.category || '', p.location || '')).slice(0, 10);
  
  // Anything else is domestic (or just those that aren't international or kerala)
  const domesticPackages = parsedPackages.filter(p => 
      !isInternational(p.title, p.category || '', p.location || '') && 
      !isKerala(p.title, p.category || '', p.location || '')
  ).slice(0, 10);

  // Map destinations
  const kochiExperiences = destinations.map(d => ({
      title: d.name || d.title || 'Experience',
      image: getImageUrl(d.image || d.thumb || '/bg-placeholder.jpg'),
      href: `/tours?q=${encodeURIComponent(d.name || d.title || '')}`
  }));

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-white flex-col gap-4">
              <div className="w-16 h-16 border-4 border-cosmic-orange border-t-transparent rounded-full animate-spin"></div>
              <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Loading Experience...</p>
          </div>
      );
  }

  return (
    <div className="flex flex-col bg-white">
      <Hero />

      {/* Secondary Sticky Navigation Strip */}
      <div className="secondaryStickyNav">
        <div className="homeContainer">
          <div className="navInner">
            <div className="brandTag">
              <span>{stickySettings.brandSubtitle}</span>
              <strong>{stickySettings.brandTitle}</strong>
            </div>

            <nav className="quickNav">
              {(stickyLinks.length > 0 ? stickyLinks : services).map((service, index) => {
                const Icon = IconMap[service.icon] || Info;
                return (
                  <Link
                    key={index}
                    href={service.href}
                    className={`navItem ${service.active ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{service.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Kerala Tour Operator Section */}
      {(homeSections.find(s => s.id === 'kerala')?.enabled ?? true) && keralaPackages.length > 0 && (
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'kerala')?.subtitle || "Explore Our Best"}</span>
              <h2 className="sliderTitle">
                {homeSections.find(s => s.id === 'kerala')?.title || "Kerala Tour Operator"}
              </h2>
              <div 
                className="sectionHeaderDescription mt-2 mb-0 max-w-2xl text-[13px] leading-relaxed italic text-slate-500"
                dangerouslySetInnerHTML={{ __html: homeSections.find(s => s.id === 'kerala')?.description || "Experience the beauty of God's Own Country with Kerala's best tour operator." }}
              />
            </div>
            <Link href="/kerala-tour-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.kerala-prev',
              nextEl: '.kerala-next',
            }}
            loop={keralaPackages.length > 3}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.kerala-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              // Forced update to ensure dynamic elements are picked up
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.kerala-prev';
                    swiper.params.navigation.nextEl = '.kerala-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.kerala-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {keralaPackages.map((item: any, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={item.href || "/packages"} className="block h-full">
                  <div className="packageCardKerala group">
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    <div className="overlay"></div>
                    <div className="cardContent">
                      <div className="topSection">
                        <h4 className="packageTitle">{item.title.replace(/ Package$/i, '')}</h4>
                        <p className="packageSubtitle">Package</p>
                      </div>
                      <div className="bottomSection">
                        {item.oldPrice && <span className="oldPrice">{item.oldPrice}</span>}
                        <span className="currentPrice">{item.price}<small> / Person</small></span>
                      </div>
                      <WishlistButton id={item._id} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="kerala-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn kerala-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn kerala-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/kerala-tour-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* First Minute Offers */}
      {(homeSections.find(s => s.id === 'offers')?.enabled ?? true) && firstMinuteOffers.length > 0 && (
      <section className="sectionPadding bg-white">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'offers')?.subtitle || "Limited Time Offers"}</span>
              <h2 className="sliderTitle">{homeSections.find(s => s.id === 'offers')?.title || "First Minute Offers"}</h2>
              {homeSections.find(s => s.id === 'offers')?.description && (
                <p className="mt-2 text-slate-500 max-w-2xl text-[13px] leading-relaxed italic">{homeSections.find(s => s.id === 'offers')?.description}</p>
              )}
            </div>
            <Link href="/trending" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.first-prev',
              nextEl: '.first-next',
            }}
            loop={firstMinuteOffers.length > 3}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.first-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.first-prev';
                    swiper.params.navigation.nextEl = '.first-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.first-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="packageSlider"
          >
            {firstMinuteOffers.map((item: any, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={item.href || "/packages"} className="block h-full">
                  <div className="packageCardSmall group">
                    <div className="imageWrapper">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      <div className="priceTag">
                        {item.oldPrice && <span className="oldPrice">{item.oldPrice}</span>}
                        <span className="currentPrice">{item.price}<small>/ PERSON</small></span>
                      </div>
                      <WishlistButton id={item._id} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    </div>
                    <div className="cardContent">
                      <h4 className="packageTitle">{item.title}</h4>
                      <div className="actionIcon"><ChevronRight size={20} /></div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="first-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn first-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn first-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/trending" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}


      {/* Domestic Packages Slider */}
      {(homeSections.find(s => s.id === 'domestic')?.enabled ?? true) && domesticPackages.length > 0 && (
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'domestic')?.subtitle || "Incredible India"}</span>
              <h2 className="sliderTitle">{homeSections.find(s => s.id === 'domestic')?.title || "Domestic Packages"}</h2>
              {homeSections.find(s => s.id === 'domestic')?.description && (
                <p className="mt-2 text-slate-500 max-w-2xl text-[13px] leading-relaxed">{homeSections.find(s => s.id === 'domestic')?.description}</p>
              )}
            </div>
            <Link href="/domestic-tour-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.domestic-prev',
              nextEl: '.domestic-next',
            }}
            loop={domesticPackages.length > 3}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.domestic-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.domestic-prev';
                    swiper.params.navigation.nextEl = '.domestic-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.domestic-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {domesticPackages.map((item: any, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={item.href || "/packages"} className="block h-full">
                  <div className="packageCardSmall group">
                    <div className="imageWrapper">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      <div className="priceTag">
                        {item.oldPrice && <span className="oldPrice">{item.oldPrice}</span>}
                        <span className="currentPrice">{item.price}<small>/ PERSON</small></span>
                      </div>
                      <WishlistButton id={item._id} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    </div>
                    <div className="cardContent">
                      <h4 className="packageTitle">{item.title}</h4>
                      <div className="actionIcon"><ChevronRight size={20} /></div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="domestic-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn domestic-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn domestic-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/domestic-tour-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* International Packages Slider */}
      {(homeSections.find(s => s.id === 'international')?.enabled ?? true) && internationalPackages.length > 0 && (
      <section className="sectionPadding bg-slate-50">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'international')?.subtitle || "Explore The World"}</span>
              <h2 className="sliderTitle">{homeSections.find(s => s.id === 'international')?.title || "International Packages"}</h2>
              {homeSections.find(s => s.id === 'international')?.description && (
                <p className="mt-2 text-slate-500 max-w-2xl text-[13px] leading-relaxed">{homeSections.find(s => s.id === 'international')?.description}</p>
              )}
            </div>
            <Link href="/international-tour-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.intl-prev',
              nextEl: '.intl-next',
            }}
            loop={internationalPackages.length > 3}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.intl-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.intl-prev';
                    swiper.params.navigation.nextEl = '.intl-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.intl-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {internationalPackages.map((item: any, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={item.href || "/packages"} className="block h-full">
                  <div className="packageCardSmall group">
                    <div className="imageWrapper">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      <div className="priceTag">
                        {item.oldPrice && <span className="oldPrice">{item.oldPrice}</span>}
                        <span className="currentPrice">{item.price}<small>/ PERSON</small></span>
                      </div>
                      <WishlistButton id={item._id} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    </div>
                    <div className="cardContent">
                      <h4 className="packageTitle">{item.title}</h4>
                      <div className="actionIcon"><ChevronRight size={20} /></div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="intl-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn intl-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn intl-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/international-tour-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Kochi Based Travel Agency Section */}
      {homeSections.find(s => s.id === 'kochi')?.enabled && kochiExperiences.length > 0 && (
      <section className="sectionPadding bg-gradient-bottom">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'kochi')?.subtitle || "Local Expertise"}</span>
              <h2 className="sliderTitle">
                {homeSections.find(s => s.id === 'kochi')?.title || "Kochi Based Travel Agency"}
              </h2>
              {homeSections.find(s => s.id === 'kochi')?.description && (
                <p className="mt-2 text-slate-500 max-w-2xl text-[13px] leading-relaxed italic">{homeSections.find(s => s.id === 'kochi')?.description}</p>
              )}
            </div>
            <Link href="/kerala-tour-packages" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.kochi-prev',
              nextEl: '.kochi-next',
            }}
            loop={kochiExperiences.length > 4}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.kochi-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.kochi-prev';
                    swiper.params.navigation.nextEl = '.kochi-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.kochi-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="packageSlider"
          >
            {kochiExperiences.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={item.href} className="block h-full cursor-pointer">
                    <div className="packageCardLocation group">
                    <div className="imageWrapper">
                        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="cardContent">
                        <h4 className="locationTitle">{item.title}</h4>
                        <div className="actionIcon">
                        <ChevronRight size={20} />
                        </div>
                    </div>
                    </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="kochi-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn kochi-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn kochi-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/kerala-tour-packages" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}



      {/* Refined Corporate Events Section */}
      {(homeSections.find(s => s.id === 'corporate')?.enabled ?? true) && (
      <section className="corporateModernSection sectionPadding">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'corporate')?.subtitle || "MICE & Events"}</span>
              <h2 className="sliderTitle">{homeSections.find(s => s.id === 'corporate')?.title || "Redefining Corporate Experiences"}</h2>
              <div 
                  className="sectionHeaderDescription mt-2 mb-0 max-w-2xl text-[13px] leading-relaxed italic text-slate-500"
                  dangerouslySetInnerHTML={{ __html: homeSections.find(s => s.id === 'corporate')?.description || "Wegomap delivers world-class event management services in Kochi and beyond." }}
              />
            </div>
            <Link href="/events" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.event-prev',
              nextEl: '.event-next',
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.event-pagination',
              type: 'progressbar',
            }}
            breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.event-prev';
                    swiper.params.navigation.nextEl = '.event-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.event-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            className="eventSlider"
          >
            {corporateEvents.map((event: any, idx: number) => {
              const Icon = Calendar;
              return (
                <SwiperSlide key={idx} className="h-auto">
                  <Link href={`/events/${event.slug || event._id}`} className="block h-full cursor-pointer">
                    <div className="packageCardSmall eventCard group h-full">
                      <div className="imageWrapper">
                        <Image
                          src={event.images?.[0] || "/assests/site/assets/images/event.jpg"}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="cardIcon">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="cardContent">
                        <h4 className="title">{event.title}</h4>
                        <div className="footer">
                         <div className="actionIcon"><ChevronRight size={20} /></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="event-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn event-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn event-next"><ArrowRight size={20} /></div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Special Events Section */}
      {homeSections.find(s => s.id === 'special_events')?.enabled && specialEvents.length > 0 && (
      <section className="sectionPadding bg-slate-50/50">
        <div className="homeContainer">
          <div className="sectionHeader flex items-center justify-center mb-8">
            <div className="titleArea">
              <span className="sectionSubtitle">{homeSections.find(s => s.id === 'special_events')?.subtitle || "Experience More"}</span>
              <h2 className="sliderTitle">
                {homeSections.find(s => s.id === 'special_events')?.title || "Special Events & Activities"}
              </h2>
              {homeSections.find(s => s.id === 'special_events')?.description && (
                <p className="mt-2 text-slate-500 max-w-2xl text-[13px] leading-relaxed italic">{homeSections.find(s => s.id === 'special_events')?.description}</p>
              )}
            </div>
            <Link href="/special-events" className="viewAllBtn">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.special-prev',
              nextEl: '.special-next',
            }}
            loop={specialEvents.length > 3}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              el: '.special-pagination',
              type: 'progressbar',
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper && !swiper.destroyed && swiper.params) {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = '.special-prev';
                    swiper.params.navigation.nextEl = '.special-next';
                  }
                  if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                    swiper.params.pagination.el = '.special-pagination';
                  }
                  swiper.navigation?.init();
                  swiper.navigation?.update();
                  swiper.pagination?.init();
                  swiper.pagination?.update();
                }
              });
            }}
            breakpoints={{
           640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 }
            }}
            className="specialEventsSlider"
          >
            {specialEvents.map((event: any, idx: number) => (
              <SwiperSlide key={idx} className="h-auto">
                <Link href={`/special-events/${event.slug || event._id}`} className="block h-full">
                  <div className="packageCardSmall group h-full">
                    <div className="imageWrapper">
                      <Image 
                        src={event.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"} 
                        alt={event.title} 
                        fill 
                        className="object-cover" 
                        unoptimized 
                      />
                      <div className="priceTag">
                        <span className="currentPrice" style={{ color: '#fff', fontSize: '0.75rem' }}>
                          {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'SPECIAL'}
                        </span>
                      </div>
                    </div>
                    <div className="cardContent">
                      <h4 className="packageTitle line-clamp-1">{event.title || event.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-tight">
                        <MapPin size={10} className="text-purple-500" /> {event.location || 'Special Location'}
                      </p>
                      <div className="actionIcon"><ChevronRight size={20} /></div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sliderNavigation">
            <div className="progressWrapper">
              <div className="special-pagination customPagination"></div>
            </div>
            <div className="navButtons">
              <div className="navBtn special-prev"><ArrowLeft size={20} /></div>
              <div className="navBtn special-next"><ArrowRight size={20} /></div>
            </div>
          </div>

          <div className="viewAllMobileContainer">
            <Link href="/special-events" className="viewAllBtnMobile">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}



      {/* Requested Kerala Specialist Thin Section */}
      {(homeSections.find(s => s.id === 'seo')?.enabled ?? true) && (
      <section className="services-list readmore-section commonPadding bg-white">
        <div className="homeContainer">
          <div className="row">
            <div className="col-xl-12 mx-auto">
              <div className="sectionHeader">
                <span className="sectionSubtitle">{homeSections.find(s => s.id === 'seo')?.subtitle || "Kerala Specialist"}</span>
                <h2 className="sliderTitle mb-8">{homeSections.find(s => s.id === 'seo')?.title || homePage?.title || "Best Tour Operator in Kerala"}</h2>
              </div>
              <div className="readMoreWrapper text-center">
                <div className={`readmore-content ${showMore ? 'is-expanded' : ''}`}>
                  <div 
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: homeSections.find(s => s.id === 'seo')?.description || (homePage?.content && homePage.content !== 'file' ? homePage.content : "Experience the magic of God's Own Country with Wegomap.") }}
                  />
                  <div className="extraText">
                    <p>
                        At Wegomap, we pride ourselves on being the best travel agency for personalized tours that cater to your interests. Our packages include everything from romantic honeymoons and adventurous treks to relaxing family vacations and rejuvenating wellness retreats. As a Kochi-based tour operator, we have in-depth local knowledge to provide you with the most authentic experiences. We offer a range of services to make your trip seamless, including transportation, accommodation, and guided tours. Our team of experts is here to ensure every detail is taken care of, so you can focus on making memories. Whether you're exploring Kerala for the first time or revisiting its wonders, we strive to make your journey seamless and unforgettable. With Wegomap, you're not just booking a trip; you're investing in a lifetime of memories. Contact us today and let the best Kerala travel agency plan your perfect getaway. Explore Kerala with Wegomap and see why we're recognized as a leading Kerala tour operator!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

    </div>
  );
}
