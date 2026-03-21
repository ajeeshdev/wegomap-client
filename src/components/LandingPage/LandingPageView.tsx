"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock,
  Heart,
  Sparkles,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { API_URL } from "@/config";
import { toast } from "react-hot-toast";

interface LandingPageContent {
  _id: string;
  title: string;
  slug: string;
  banner_title?: string;
  banner_amount?: string;
  banner_old_amount?: string;
  banner_description?: string;
  banner_image?: string;
  about_title?: string;
  about_description?: string;
  about_image?: string;
  end_title?: string;
  end_description?: string;
  end_image?: string;
  hero_badge_1?: string;
  hero_badge_2?: string;
  hero_starting_label?: string;
  hero_per_person?: string;
  hero_cta_button?: string;
  hero_cta_note?: string;
  instant_kicker?: string;
  instant_title?: string;
  instant_feature_1?: string;
  instant_feature_2?: string;
  instant_feature_3?: string;
  instant_button?: string;
  packages_heading?: string;
  packages_lead?: string;
  packages_quote_button?: string;
  packages_card_cta?: string;
  packages_details_link?: string;
  packages_empty_text?: string;
  testimonials_kicker?: string;
  testimonials_title?: string;
  testimonials_verified_label?: string;
  why_kicker?: string;
  why_title?: string;
  cta_kicker?: string;
  great_places_heading?: string;
  cta_title?: string;
  cta_lead?: string;
  cta_button_label?: string;
  cta_call_label?: string;
  cta_phone?: string;
  cta_email?: string;
  faq_kicker?: string;
  faq_title?: string;
  faq_read_more?: string;
  package_ids?: unknown[];
}

type PackageCard = {
  _id?: string;
  slug: string;
  title: string;
  duration?: string;
  location?: string;
  price?: number | string;
  oldamt?: number | string;
  per?: string;
  thumb?: string;
  images?: string[];
};

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

function formatINR(input: unknown): string {
  if (input === null || input === undefined || input === "") return "";
  const raw =
    typeof input === "number"
      ? input
      : Number(String(input).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(raw)) return "";
  try {
    return raw.toLocaleString("en-IN");
  } catch {
    return String(raw);
  }
}

function maybeHtml(text?: string) {
  if (!text) return null;
  const t = String(text).trim();
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(t);
  if (!isHtml) return null;
  return { __html: t };
}

function RichContent({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const html = maybeHtml(text);
  if (html) {
    return <div className={className} dangerouslySetInnerHTML={html} />;
  }

  if (!text) return null;
  return (
    <div className={`${className || ""} lp-whitespacePreLine`}>{text}</div>
  );
}

function WishlistButton({
  id,
  wishlist,
  toggleWishlist,
}: {
  id: string;
  wishlist: string[];
  toggleWishlist: (id: string, e: React.MouseEvent) => void;
}) {
  const isSelected = wishlist.includes(id);
  return (
    <button
      type="button"
      className={`wishlistBtn ${isSelected ? "selected" : ""}`}
      aria-label="Add to wishlist"
      onClick={(e) => toggleWishlist(id, e)}
    >
      <Heart size={18} fill={isSelected ? "currentColor" : "none"} />
    </button>
  );
}

export default function LandingPageView({
  data,
}: {
  data: LandingPageContent;
}) {
  const packages: PackageCard[] =
    Array.isArray(data?.package_ids) && data.package_ids.length > 0
      ? (data.package_ids as PackageCard[])
      : [];
  const [quickPlanOpen, setQuickPlanOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [testimonialItems, setTestimonialItems] = useState<
    { name: string; img: string; text: string; rating?: number }[]
  >([]);

  const destinationLabel = useMemo(() => {
    const src = `${data.title || ""} ${data.slug || ""}`.toLowerCase();
    if (src.includes("kerala")) return "Kerala";
    if (src.includes("thailand")) return "Thailand";
    if (src.includes("maldives")) return "Maldives";
    if (src.includes("dubai")) return "Dubai";
    return "Popular";
  }, [data.title, data.slug]);

  const heroTitle = data.banner_title || data.title;

  const bannerStart = formatINR(data.banner_amount);
  const bannerOld = formatINR(data.banner_old_amount);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = "0px";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadFaq() {
      try {
        const res = await fetch(`${API_URL}/faqs`);
        const json = await res.json();
        if (!mounted) return;

        if (json?.success && Array.isArray(json.data)) {
          const keralaFaqs = json.data.filter((f: FaqItem) =>
            /kerala/i.test(f.category || "")
          );

          const picked =
            keralaFaqs.length > 0 ? keralaFaqs.slice(0, 3) : json.data.slice(0, 3);

          setFaqItems(picked);
        }
      } catch (e) {
        console.error("Failed to load FAQs", e);
      }
    }

    loadFaq();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadTestimonials() {
      try {
        const res = await fetch(`${API_URL}/testimonials`);
        const json = await res.json();
        if (!mounted) return;
        if (json?.success && Array.isArray(json.data)) {
          const published = json.data.filter((t: { status?: string }) => (t.status || "published") === "published");
          const mapped = published.map((t: { name?: string; image?: string; review?: string; rating?: number }) => ({
            name: t.name || "",
            img: t.image || "",
            text: t.review || "",
            rating: typeof t.rating === "number" ? t.rating : undefined,
          }));
          setTestimonialItems(mapped);
        }
      } catch (e) {
        console.error("Failed to load testimonials", e);
      }
    }
    loadTestimonials();
    return () => { mounted = false; };
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.headers.get("content-type")?.includes("application/json")) {
          const data = await res.json();
          if (data.success && data.data.wishlist) {
            setWishlist(data.data.wishlist);
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch wishlist", e);
    }
  };

  const toggleWishlist = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please login to save tours");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/wishlist/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (data.success) {
          setWishlist(data.data);
          toast.success(data.message);
        }
      }
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleOpenQuickPlan = (pkgTitle?: string) => {
    setSelectedPackage(pkgTitle || "");
    setQuickPlanOpen(true);
  };

  const handleQuickPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request sent for: ${selectedPackage || "package"}`);
    setQuickPlanOpen(false);
  };

  const testimonialSliderSettings = {
    dots: true,
    arrows: false,
    infinite: testimonialItems.length > 1,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
    <div className="landingPageLayout">
      {/* Hero */}
      <section id="hero" className="lp-hero">
        <div className="lp-hero-overlay" />
        <div className="lp-hero-glow lp-hero-glow-1" aria-hidden="true" />
        <div className="lp-hero-glow lp-hero-glow-2" aria-hidden="true" />
        <div className="lp-hero-glow lp-hero-glow-3" aria-hidden="true" />
        <Image
          src={data.banner_image || "/bg-placeholder.jpg"}
          alt=""
          fill
          className="lp-img-cover"
          priority
          unoptimized
        />

        <div className="homeContainer lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-main">
              <h1 className="lp-hero-title">
                {heroTitle || ""}
              </h1>
              {data.banner_description && (
                <p className="lp-hero-description">
                  {data.banner_description}
                </p>
              )}

              <div className="lp-hero-booking-strip">
                <div className="lp-hero-price-info">
                  <span className="lp-hero-price-label">Planning from</span>
                  <div className="lp-hero-price-value">
                    {bannerOld && <span className="lp-hero-price-old">₹{bannerOld}</span>}
                    <span className="lp-hero-price-now">₹{bannerStart || "—"}</span>
                    <span className="lp-hero-price-unit">/ Person</span>
                  </div>
                </div>

                <div className="lp-hero-actions">
                  <button
                    type="button"
                    onClick={() => handleOpenQuickPlan(data.title)}
                    className="lp-hero-cta-main"
                  >
                    {data.hero_cta_button || "Customize My Plan"}
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                  <div className="lp-hero-trust">
                    <Sparkles size={16} className="text-yellow-400" />
                    <span>Free expert advice</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-hero-floating-tags">
              <div className="lp-hero-tag">
                <ShieldCheck size={18} />
                Secure Booking
              </div>
              <div className="lp-hero-tag">
                <Users size={18} />
                24/7 Support
              </div>
              <div className="lp-hero-tag">
                <Clock size={18} />
                Instant Callback
              </div>
            </div>
          </div>
        </div>
      
      </section>

      {/* Popular Packages */}
      <section id="packages" className="lp-packagesSection">
        <div className="homeContainer lp-packagesInner">
          <div className="sectionHeader">
            <span className="sectionSubtitle">Destinations</span>
            <h2 className="sliderTitle">
              {(data.packages_heading || "Popular {destination} Holiday Packages").replace("{destination}", destinationLabel)}
            </h2>
            <p className="sectionHeaderDescription">
              {data.packages_lead || "Explore god's own country with us"}
            </p>
          </div>

          <div className="lp-packagesGrid">
            {packages.length === 0 ? (
              <div className="lp-packages-empty">
                {data.packages_empty_text || "No packages linked to this campaign."}
              </div>
            ) : (
              packages.map((pkg) => {
                const current = formatINR(pkg.price);
                const old = formatINR(pkg.oldamt);

                return (
                  <Link
                    key={pkg._id || pkg.slug}
                    href={`/packages/${pkg.slug}`}
                    className="block h-full"
                  >
                    <div className="packageCardSmall group">
                      <div className="imageWrapper">
                        <Image
                          src={
                            pkg.thumb ||
                            (pkg.images && pkg.images[0]) ||
                            "/bg-placeholder.jpg"
                          }
                          alt={pkg.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />

                        <div className="priceTag">
                          {old && <span className="oldPrice">₹{old}</span>}
                          <span className="currentPrice">
                            ₹{current || "—"}
                            <small>/ PERSON</small>
                          </span>
                        </div>
                        <WishlistButton
                          id={pkg._id || pkg.slug}
                          wishlist={wishlist}
                          toggleWishlist={toggleWishlist}
                        />
                      </div>

                      <div className="cardContent">
                        <h4 className="packageTitle">{pkg.title}</h4>
                        <div className="actionIcon">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="lp-packages-quoteRow">
            <button
              type="button"
              onClick={() => handleOpenQuickPlan(data.title)}
              className="lp-packages-quoteButton"
            >
              {data.packages_quote_button || "Get a Quote"}
            </button>
          </div>
        </div>
      </section>

      {testimonialItems.length > 0 && (
        <section id="testimonials" className="lp-testimonialsSection">
          <div className="homeContainer lp-testimonialsInner">
            <div className="sectionHeader">
              <span className="sectionSubtitle">
                {data.testimonials_kicker || "Reviews"}
              </span>
              <h2 className="sliderTitle">
                {data.testimonials_title || "Our Happy clients"}
              </h2>
            </div>

            <Slider {...testimonialSliderSettings} className="lp-testimonialsSlider">
              {testimonialItems.map((t, i) => {
                const starCount = Math.max(
                  1,
                  Math.min(
                    5,
                    typeof t.rating === "number" ? Math.round(t.rating) : 5
                  )
                );
                const stars = "★★★★★".slice(0, starCount);
                return (
                  <div key={i} className="lp-testimonialSlideWrap">
                    <div className="lp-testimonialCard">
                      <div className="lp-testimonialHead">
                        <div className="lp-testimonialAvatar">
                          <Image
                            src={t.img || "/bg-placeholder.jpg"}
                            alt={t.name || "Traveler"}
                            fill
                            className="lp-img-cover"
                            unoptimized
                          />
                        </div>

                        <div>
                          <div className="lp-testimonialName">
                            {t.name || ""}
                          </div>
                          <div className="lp-testimonialRating">{stars}</div>
                        </div>
                      </div>

                      <div className="lp-testimonialText">
                        <RichContent text={t.text} className="" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>
      )}

      {/* About / Kerala Tourism – Parallax Effect */}
      <section id="about" className="lp-aboutSection">
        <div className="lp-about-parallax">
          <Image
            src={data.about_image || data.banner_image || "/bg-placeholder.jpg"}
            alt="About Background"
            fill
            className="lp-img-cover"
            unoptimized
          />
          <div className="lp-about-overlay" aria-hidden="true" />
        </div>

        <div className="homeContainer lp-aboutInner">
          <div className="lp-aboutCard">
            <div className="lp-aboutContent">
              <div className="sectionHeader" style={{ margin: '0 auto 1.5rem', maxWidth: 'none' }}>
                <span className="sectionSubtitle">
                  {data.about_title || "Kerala Tourism"}
                </span>

                <h2 className="sliderTitle">
                  {data.about_title || "Kerala Tourism"}
                </h2>
              </div>

              <div className="tour-description-content lp-aboutDescription">
                <RichContent text={data.about_description} className="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section id="partners" className="lp-partnersSection">
        <div className="homeContainer">
          <div className="sectionHeader">
            <span className="sectionSubtitle">Associations</span>
            <h2 className="sliderTitle">Trusted Partners</h2>
          </div>
          
          <div className="lp-partnersGrid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="lp-partnerLogoWrap">
                <Image 
                  src={`https://www.wegomap.com/assests/site/lp/images/logo-${num}.webp`}
                  alt={`Partner Logo ${num}`}
                  width={140}
                  height={70}
                  className="lp-partnerLogo"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us – two-column layout with paragraph + image */}
      <section id="why-choose" className="lp-whySection">
        <div className="homeContainer lp-whyLayout">
          <div className="sectionHeader">
            <span className="sectionSubtitle">Comparison</span>
            <h2 className="sliderTitle">
              {data.why_title || data.end_title || "Why Choose Us?"}
            </h2>
          </div>

          <div className="lp-whyColumns">
            <div className="lp-whyContent">
              <div className="lp-whyCard">
                <div className="lp-whyCardBody tour-description-content">
                  {data.end_description ? (
                    <RichContent text={data.end_description} />
                  ) : (
                    <>
                      <p>
                        Kerala is known as God&apos;s own country because it offers stunning backwaters, misty hill
                        stations, exciting culture, and warm-hearted locals. Wegomap builds Kerala tour
                        packages to connect you with the beauty of God&apos;s own country—whether you&apos;re looking
                        for a relaxing holiday, a romantic getaway, or an adventurous vacation filled with fun
                        activities.
                      </p>
                      <p>
                        Our experts have experience planning tours for honeymooning couples, families, solo
                        travelers, and group travelers. You&apos;ll get a well-planned itinerary with comfortable
                        accommodation, reliable transfers, and 24/7 support—so your Kerala trip feels smooth
                        from booking to return.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="lp-whyImageWrap">
              <div className="lp-whyImageFrame">
                <Image
                  src={
                    data.end_image || data.about_image || data.banner_image || "/bg-placeholder.jpg"
                  }
                  alt="Why choose us"
                  fill
                  className="lp-img-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqItems.length > 0 && (
        <section className="lp-faqSection" id="faqs">
          <div className="homeContainer lp-faqInner">
            <div className="sectionHeader">
              <span className="sectionSubtitle">
                {data.faq_kicker || "Knowledge"}
              </span>
              <h2 className="sliderTitle">
                {data.faq_title || "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="lp-faqList">
              {faqItems.map((item, idx) => {
                const open = openFaqIndex === idx;
                return (
                  <div
                    key={`${idx}-${item.question}`}
                    className={`lp-faqItem ${open ? "lp-faqItem--open" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(open ? null : idx)}
                      className="lp-faqButton"
                    >
                      <span className="lp-faqQuestion">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`lp-faqChevron ${
                          open ? "lp-faqChevron--open" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="lp-faqAnswer">
                        <RichContent
                          text={item.answer}
                          className="tour-description-content"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            
          </div>
        </section>
      )}

      {/* Inquiry Banner – specifically for next trip planning */}
      <section className="lp-inquirySection">
        <div className="lp-inquiry-parallax">
          <Image
            src={data.banner_image || data.about_image || "/bg-placeholder.jpg"}
            alt="Inquiry Background"
            fill
            className="lp-img-cover"
            unoptimized
          />
          <div className="lp-inquiry-overlay" aria-hidden="true" />
        </div>

        <div className="homeContainer">
          <div className="lp-inquiryBanner">
            <div className="sectionHeader" style={{ textAlign: 'center', margin: '0 auto 2.5rem' }}>
              <span className="sectionSubtitle" >
                Exclusive Offer: Save 10%
              </span>
              <h2 className="sliderTitle" style={{ color: 'white', marginBottom: '1.25rem', fontSize: '2.75rem' }}>
                Planning your next trip?
              </h2>
              <p className="sectionHeaderDescription" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto' }}>
                Talk to our experts and get a detailed plan for your next journey. Custom itineraries tailored to your preferences.
              </p>
            </div>
            
            <div className="lp-inquiryActions">
              <button
                type="button"
                onClick={() => handleOpenQuickPlan(data.title)}
                className="lp-inquiryBtnPrimary"
              >
                Plan My Trip
              </button>
              <a href={`tel:${data.cta_phone?.replace(/\s/g, "") || "+918590370566"}`} className="lp-inquiryBtnSecondary">
                Call Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact section */}
      <section id="contact" className="lp-ctaSection">
        <div className="homeContainer lp-ctaInner">
            <div className="sectionHeader" style={{ textAlign: 'center', margin: '0 0 3rem' }}>
              <span className="sectionSubtitle">
                {data.cta_kicker || "Get in touch"}
              </span>
              <h2 className="sliderTitle text-white">
                {data.cta_title || "Ready to plan your trip?"}
              </h2>
              <p className="sectionHeaderDescription">
                {data.cta_lead || "Talk to our travel experts for a custom itinerary, best prices, and 24/7 support. Get a free quote in minutes."}
              </p>
            </div>
            <div className="lp-ctaActions">
              <button
                type="button"
                onClick={() => handleOpenQuickPlan(data.title)}
                className="lp-ctaButton lp-ctaButton--primary"
              >
                {data.cta_button_label || "Enquire Now"}
              </button>
              <a
                href={data.cta_phone ? `tel:${data.cta_phone.replace(/\s/g, "")}` : "tel:+914844236363"}
                className="lp-ctaButton lp-ctaButton--secondary"
              >
                {data.cta_call_label || "Talk With Us"}
              </a>
            </div>
            <div className="lp-ctaContactRow">
              <a href={data.cta_phone ? `tel:${data.cta_phone.replace(/\s/g, "")}` : "tel:+914844236363"} className="lp-ctaContactLink">
                {data.cta_phone || "+91 484 423 6363"}
              </a>
              <span className="lp-ctaContactSep">|</span>
              <a href={`mailto:${data.cta_email || "info@wegomap.com"}`} className="lp-ctaContactLink">
                {data.cta_email || "info@wegomap.com"}
              </a>
            </div>
          </div>
        </section>

      {/* Quick Plan Modal */}
      {quickPlanOpen && (
        <div className="lp-modalOverlay">
          <div
            className="lp-modalBackdrop"
            onClick={() => setQuickPlanOpen(false)}
          />

          <div className="lp-modalCard">
            <div className="lp-modalHeader">
              <div className="lp-modalHeaderStack">
                <div className="lp-sectionKickerBlue">
                  Quick Plan Request
                </div>
                <h3 className="lp-modalTitle">
                  Get a Quick Plan
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setQuickPlanOpen(false)}
                className="lp-modalCloseButton"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="lp-modalBodyPad">
              <div className="lp-modalPackageRow">
                <div className="lp-modalPackageStack">
                  <div className="lp-modalLabelTiny">
                    Destination Package
                  </div>
                  <div className="lp-modalPackageName">
                    {selectedPackage || data.title}
                  </div>
                </div>

                <div className="lp-modalPackageIconWrap">
                  <Users size={18} />
                </div>
              </div>
            </div>

            <form onSubmit={handleQuickPlanSubmit} className="lp-modalForm">
              <div className="lp-modalFormGrid">
                <div className="lp-modalFieldStack">
                  <label className="lp-modalFieldLabel">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="lp-modalInput"
                  />
                </div>

                <div className="lp-modalFieldStack">
                  <label className="lp-modalFieldLabel">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 9876543210"
                    className="lp-modalInput"
                  />
                </div>
              </div>

              <div className="lp-modalFieldStack lp-modalFieldStack--spaced">
                <label className="lp-modalFieldLabel">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="lp-modalInput"
                />
              </div>

              <div className="lp-modalSubmitRow">
                <button
                  type="submit"
                  className="lp-modalSubmitButton"
                >
                 Book Now
                </button>
              </div>

              <p className="lp-modalSubmitNote">
                You will get a response within 2 hours.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

