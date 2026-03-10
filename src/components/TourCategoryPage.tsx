"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export interface TourPackage {
    image: string;
    duration: string;
    title: string;
    location: string;
    price: string;
    originalPrice: string;
    strip?: string;
    detailUrl: string;
    packCode?: string;
}

export interface TourCategoryPageProps {
    title: string;
    subtitle: string;
    bannerImage: string;
    bookCount?: number;
    packages: TourPackage[];
    readMoreContent?: React.ReactNode;
    readMoreHeading?: string;
}

const testimonials = [
    { name: 'Imran Shariff', img: '/uploads/testimonials/lECdwnqz0sFj4Pcwi4IenLB5m6kVr82TaOfU35Ib260228022926.png', text: 'Exploring Munnar without wegomap was impossible... It was a great experience. Everything was awesome — service, the tempo traveler driver Binu bhai was very honest and humble in the whole trip. I recommend to everyone.' },
    { name: 'Sumit Kumar Sinha', img: '/uploads/testimonials/e9LVL1MpqxfB7dYYZjbfgT9c6PctXAF277MdMGPt260228022430.png', text: 'Wegomaps provided an outstanding Kerala experience, surpassing expectations. From well-curated itineraries to impeccable accommodations, every detail was meticulously planned. I highly recommend Wegomap.' },
    { name: 'Komanpally Ravindra', img: '/uploads/testimonials/qX82Z9vyeZBLSPm0L3VseevrrkLdPtcQSaNC8sHj260228021643.png', text: 'That was an awesome trip to Kerala with WEGOMAP. Fathima really helped us a lot in every aspect. The driver Ajmal was too friendly and made our journey with comfort and safety. Thank you Wegomap.' },
    { name: 'Suresh K', img: '/uploads/testimonials/5KYj0KGZVjbwoQFwps9kcGMQLjyZkW0s6IMbzUrN260228021237.png', text: 'Wegomap tour and events was very well organized our trip. Very good hotel, boathouse and trip route in Kerala. We enjoyed very well. Thanks to team and special thanks to Fathima, she was very supportive.' },
    { name: 'V T Vishwanath', img: '/uploads/testimonials/GMzo4CeZOh1IOz5n8gGAor2nPKlQCqURaIoTsyyE260226040945.png', text: 'Really good travel service by WEGOMAP. Athira from WEGOMAP helped us to plan our Munnar and Thekkady Kerala honeymoon trip. Nice driver cum tour guide. Good accommodation and car provided. Thanks!' },
    { name: 'Pooja Singh', img: '/uploads/testimonials/ZRyfMmqrgi6Hd4QW1Pv2Op6vPqTeAC5qhuJQOUuw260226035449.png', text: 'Had a fabulous experience, the itinerary was well planned. The hotels were located at best places. Fathima was amazing. We have not faced any issues in our entire trip. Thanks Wegomap!' },
    { name: 'Ravina Vaishnav', img: '/uploads/testimonials/58IAT9y5Gjf79jB6uTSuvSgQI7aaPZ4XYnWaoasI260226035056.png', text: 'Whole trip was good and our driver Jithin Mathew was too good and friendly and our adviser Miss Fatima was very cooperative. Best service ever. We enjoyed too much — very memorable trip for us.' },
    { name: 'Vishesh Maity', img: '/uploads/testimonials/5gx8E8RQimgCGiohTY51b6YPb7vd4CWNYgn13X7A260226033830.jpg', text: 'We booked a 6N/7D package with Wegomap Tour, and it was an absolutely amazing experience! Everything — from the stay, food, and transportation to the overall planning — was perfectly organized.' },
];

export default function TourCategoryPage({
    title,
    subtitle,
    bannerImage,
    bookCount = 25,
    packages,
    readMoreContent,
    readMoreHeading,
}: TourCategoryPageProps) {
    return (
        <div className="tourCatPage">

            {/* ── Banner / Hero ── */}
            <section className="tourCatBanner">
                <div className="tourCatBannerImg">
                    <Image
                        src={bannerImage}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="tourCatBannerOverlay" />
                </div>
                <div className="tourCatBannerContent">
                    <h1 className="tourCatBannerTitle">{title}</h1>
                    <p className="tourCatBannerSub">{subtitle}</p>
                    <div className="tourCatRating">
                        <Image
                            src="/assests/site/assets/images/google-logo.svg"
                            alt="Google"
                            width={60}
                            height={20}
                            unoptimized
                        />
                        <span className="tourCatRatingScore">4.8</span>
                        <span className="tourCatStars">★★★★★</span>
                        <span className="tourCatReviewCount">450 Google reviews</span>
                    </div>
                </div>
            </section>

            {/* ── Package Listings ── */}
            <section className="tourCatPackages">
                <div className="tourCatContainer">
                    <div className="tourCatBookedBadge">
                        <span className="tourCatBookedNum">{bookCount}</span> tours booked in the last 24 hours.
                    </div>
                    <p className="tourCatIntro">
                        Wegomap is a Kochi-based tour operator in Kerala, offering top-quality travel services at best prices.
                        We partner with trusted hotels and travel services to ensure a safe and enjoyable holiday,
                        backed by 24/7 customer support. Contact us for custom tour packages tailored to fit your needs and budget.
                    </p>

                    <div className="tourCatGrid">
                        {packages.map((pkg, i) => (
                            <div key={i} className="tourCatCard">
                                <Link href={`https://www.wegomap.com/${pkg.detailUrl}`} target="_blank" className="tourCatCardImgWrap">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                    {pkg.strip && (
                                        <span className="tourCatCardStrip">
                                            🏷️ {pkg.strip}
                                        </span>
                                    )}
                                </Link>
                                <div className="tourCatCardBody">
                                    <p className="tourCatCardDuration">{pkg.duration}</p>
                                    <Link href={`https://www.wegomap.com/${pkg.detailUrl}`} target="_blank">
                                        <h2 className="tourCatCardTitle">{pkg.title}</h2>
                                    </Link>
                                    <div className="tourCatCardLocation">
                                        <span className="tourCatDot">●</span> {pkg.location}
                                    </div>
                                    <div className="tourCatCardPricing">
                                        <span className="tourCatPrice">{pkg.price}</span>
                                        <span className="tourCatOrigPrice">{pkg.originalPrice}</span>
                                        <span className="tourCatPerPerson">per Person</span>
                                    </div>
                                    <div className="tourCatCardBtns">
                                        <Link href="/contact" className="tourCatEnquireBtn">
                                            Get a Quick Plan
                                        </Link>
                                        <Link href={`https://www.wegomap.com/${pkg.detailUrl}`} target="_blank" className="tourCatDetailsBtn">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Read More Content (optional) ── */}
            {readMoreContent && (
                <section className="tourCatReadMore">
                    <div className="tourCatContainer">
                        {readMoreHeading && (
                            <h2 className="tourCatReadMoreHeading">
                                <span className="tourCatHeadingHighlight">{readMoreHeading}</span>
                            </h2>
                        )}
                        <div className="tourCatReadMoreBody">
                            {readMoreContent}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Testimonials ── */}
            <section className="tourCatReviews">
                <div className="tourCatContainer">
                    <h2 className="tourCatReviewsTitle">Our Happy Clients</h2>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop
                        slidesPerView={1}
                        spaceBetween={24}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="tourCatReviewSwiper"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="tourCatReviewCard">
                                    <div className="tourCatReviewAvatar">
                                        <Image
                                            src={t.img}
                                            alt={t.name}
                                            width={56}
                                            height={56}
                                            unoptimized
                                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <p className="tourCatReviewName">{t.name}</p>
                                    <div className="tourCatReviewStars">★★★★★</div>
                                    <p className="tourCatReviewText">{t.text}</p>
                                    <Image
                                        src="/assests/site/assets/images/google-review.svg"
                                        alt="Google Review"
                                        width={80}
                                        height={28}
                                        unoptimized
                                        className="tourCatGoogleBadge"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* ── Footer CTA ── */}
            <section className="tourCatCTA">
                <div className="tourCatContainer">
                    <p className="tourCatCTALabel">GREAT PLACES TO VISIT</p>
                    <h2 className="tourCatCTATitle">Planning your next trip?</h2>
                    <p className="tourCatCTASub">Talk to our experts and get a detailed plan for your next trip</p>
                    <div className="tourCatCTABtns">
                        <Link href="/contact" className="tourCatCTAEnquire">Enquire Now</Link>
                        <a href="tel:+918590370566" className="tourCatCTACall">
                            📞 Talk With Us
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
