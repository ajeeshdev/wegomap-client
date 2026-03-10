"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/* ── Data ── */
const vehicles = [
    {
        name: 'SEDAN',
        image: 'https://www.wegomap.com/assests/site/img/taxi/sedan-image.jpg',
        rates: [
            { label: '2 Nights 3 Days', price: '₹ 8,000' },
            { label: '3 Nights 4 Days', price: '₹ 10,600' },
            { label: '4 Nights 5 Days', price: '₹ 13,200' },
            { label: '5 Nights 6 Days', price: '₹ 15,900' },
            { label: '6 Nights 7 Days', price: '₹ 18,500' },
        ],
    },
    {
        name: 'INNOVA',
        image: 'https://www.wegomap.com/assests/site/img/taxi/innova-image.jpg',
        rates: [
            { label: '2 Nights 3 Days', price: '₹ 11,000' },
            { label: '3 Nights 4 Days', price: '₹ 14,500' },
            { label: '4 Nights 5 Days', price: '₹ 18,000' },
            { label: '5 Nights 6 Days', price: '₹ 21,600' },
            { label: '6 Nights 7 Days', price: '₹ 25,200' },
        ],
    },
    {
        name: '9/12 SEATER',
        image: 'https://www.wegomap.com/assests/site/img/taxi/9-12seater-image.jpg',
        rates: [
            { label: '2 Nights 3 Days', price: '₹ 14,500' },
            { label: '3 Nights 4 Days', price: '₹ 19,200' },
            { label: '4 Nights 5 Days', price: '₹ 24,000' },
            { label: '5 Nights 6 Days', price: '₹ 28,800' },
            { label: '6 Nights 7 Days', price: '₹ 33,600' },
        ],
    },
    {
        name: '17 SEATER',
        image: 'https://www.wegomap.com/assests/site/img/taxi/17seater-image.jpg',
        rates: [
            { label: '2 Nights 3 Days', price: '₹ 16,500' },
            { label: '3 Nights 4 Days', price: '₹ 21,600' },
            { label: '4 Nights 5 Days', price: '₹ 27,000' },
            { label: '5 Nights 6 Days', price: '₹ 32,400' },
            { label: '6 Nights 7 Days', price: '₹ 37,800' },
        ],
    },
];

const importantInfo = [
    'Km. will be calculated from Cochin Airport to Cochin Airport basis.',
    '8 Hours vehicle',
    'Toll, Parking extras',
    'Subject to availability',
    'Festival Season hike of 25%',
    'Additional km charges may apply',
];

const testimonials = [
    { name: 'Imran Shariff', img: 'https://www.wegomap.com/uploads/testimonials/lECdwnqz0sFj4Pcwi4IenLB5m6kVr82TaOfU35Ib260228022926.png', text: 'Exploring munnar without wegomap was impossible... It was great experience to share everything was awesome service and specially tempo traveler driver binu bhai was very honest and humble in whole trip. I recommend to everyone.' },
    { name: 'Sumit Kumar Sinha', img: 'https://www.wegomap.com/uploads/testimonials/e9LVL1MpqxfB7dYYZjbfgT9c6PctXAF277MdMGPt260228022430.png', text: 'Wegomaps provided an outstanding Kerala experience, surpassing expectations. From well-curated itineraries to impeccable accommodations, every detail was meticulously planned. Knowledgeable and friendly driver Mr Prajeesh added delight to the journey.' },
    { name: 'Komanpally Ravindra', img: 'https://www.wegomap.com/uploads/testimonials/qX82Z9vyeZBLSPm0L3VseevrrkLdPtcQSaNC8sHj260228021643.png', text: 'That was an awesome trip to Kerala with WEGOMAP. Fathima really helped us a lot in every aspect and the driver Ajmal was too friendly and made our journey with comfort and safety.' },
    { name: 'Suresh K', img: 'https://www.wegomap.com/uploads/testimonials/5KYj0KGZVjbwoQFwps9kcGMQLjyZkW0s6IMbzUrN260228021237.png', text: 'Wegomap tour and events was very well organized our trip, very good hotel, boathouse and trip route map in Kerala. We enjoy very well. Thanks to team and special thanks to Fathima, she supporting well throughout.' },
    { name: 'V T Vishwanath', img: 'https://www.wegomap.com/uploads/testimonials/GMzo4CeZOh1IOz5n8gGAor2nPKlQCqURaIoTsyyE260226040945.png', text: 'Really good travel service by WEGOMAP. Athira from WEGOMAP helped us to plan Munnar and Thekkady Kerala honeymoon trip. It was a really good experience. Nice driver cum tour guide provided.' },
    { name: 'Pooja Singh', img: 'https://www.wegomap.com/uploads/testimonials/ZRyfMmqrgi6Hd4QW1Pv2Op6vPqTeAC5qhuJQOUuw260226035449.png', text: 'Had a fabulous experience, the itinerary was well planned. Fathima was amazing the way she explained the package. We have not faced any issues in any way in our entire trip. I have already suggested a few of my friends to plan their trips with Wegomap.' },
    { name: 'Ravina Vaishnav', img: 'https://www.wegomap.com/uploads/testimonials/58IAT9y5Gjf79jB6uTSuvSgQI7aaPZ4XYnWaoasI260226035056.png', text: 'Whole trip was good and our driver jithin methew was too good and friendly and our adviser miss fatima was very cooperative. Best service ever. We enjoyed too much — very memorable trip for us.' },
    { name: 'Prakash Kamath', img: 'https://www.wegomap.com/uploads/testimonials/jjL4Qm93bdEIbxXgHnPCGtrz6Gx9LS6N8QU3hvEj260226034728.png', text: 'Tour was very fantastic and wego tour advisor was easily approachable whenever required. Daily feedback calls were given by Mr Jithin from wegomap and cab driver Mr Jahfar was very humble with a safe ride.' },
    { name: 'Vishesh Maity', img: 'https://www.wegomap.com/uploads/testimonials/5gx8E8RQimgCGiohTY51b6YPb7vd4CWNYgn13X7A260226033830.jpg', text: 'We booked a 6N/7D package with Wegomap Tour, and it was an absolutely amazing experience! Everything — from the stay, food, and transportation to the overall planning — was perfectly organized.' },
];

/* ── Component ── */
export default function TaxiPage() {
    return (
        <div className="taxiPage">

            {/* ── Hero Banner ── */}
            <div className="taxiHero">
                <div className="taxiHeroImg">
                    <Image
                        src="https://www.wegomap.com/assests/site/img/taxi/banner1.jpg"
                        alt="Kerala Taxi Service"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="taxiHeroOverlay" />
                </div>

                {/* Breadcrumb */}
                <div className="hbBreadcrumb">
                    <div className="homeContainer">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/services">Services</Link>
                        <span>/</span>
                        <span className="active">Kerala Taxi Service</span>
                    </div>
                </div>

                <div className="homeContainer taxiHeroContent">
                    <h1 className="taxiHeroTitle">Kerala Taxi Service</h1>
                    <a href="tel:+918590370566" className="hbEnquireBtn">
                        <Phone size={16} /> Enquire Now
                    </a>
                </div>
            </div>

            {/* ── Pricing Table ── */}
            <section className="taxiPricing homeContainer">
                <div className="taxiPricingHeader">
                    <h2>Kerala Taxi Packages</h2>
                    <p>Reliable and comfortable taxi service for your travel needs across Kerala.</p>
                </div>

                <div className="taxiVehicleGrid">
                    {vehicles.map((v, i) => (
                        <div key={i} className="taxiVehicleCard">
                            <div className="taxiVehicleImg">
                                <Image src={v.image} alt={v.name} fill style={{ objectFit: 'cover' }} unoptimized />
                            </div>
                            <div className="taxiVehicleHeader">{v.name}</div>
                            <div className="taxiVehicleBody">
                                <ul>
                                    {v.rates.map((r, j) => (
                                        <li key={j}>
                                            <span className="rateLabel">{r.label}:</span>
                                            <span className="ratePrice">{r.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="tel:+918590370566" className="taxiEnquireBtn">Enquire Now</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Important Info */}
                <div className="taxiInfoBox">
                    <h3>Important Information</h3>
                    <ul>
                        {importantInfo.map((info, i) => (
                            <li key={i}>{info}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Explore Kerala ── */}
            <section className="taxiExplore">
                <div className="homeContainer taxiExploreGrid">
                    <div className="taxiExploreText">
                        <h2>Explore Kerala with Our Taxi Services</h2>
                        <p>Experience the beauty of Kerala with our reliable taxi services. Whether you are planning a short trip or a long vacation, our fleet of well-maintained vehicles ensures a comfortable and enjoyable ride. Our experienced drivers are knowledgeable about the local attractions and can provide valuable insights during your journey.</p>
                        <p>Book your taxi now and enjoy hassle-free transportation while exploring the breathtaking landscapes, backwaters, and culture of Kerala!</p>
                        <a href="tel:+918590370566" className="hbEnquireBtn" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                            <Phone size={16} /> Book Now
                        </a>
                    </div>
                    <div className="taxiExploreImg">
                        <Image
                            src="https://www.wegomap.com/assests/site/img/taxi/banner2.png"
                            alt="Kerala Taxi Services"
                            fill
                            style={{ objectFit: 'contain' }}
                            unoptimized
                        />
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="hbReviews">
                <div className="homeContainer">
                    <h2 className="hbSectionTitle">Our Happy Clients</h2>
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
                        className="hbReviewSwiper"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="hbReviewCard">
                                    <div className="hbReviewAvatar">
                                        <Image src={t.img} alt={t.name} width={56} height={56} unoptimized style={{ borderRadius: '50%', objectFit: 'cover' }} />
                                    </div>
                                    <p className="hbReviewName">{t.name}</p>
                                    <div className="hbStars">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#FB7F33" color="#FB7F33" />)}
                                    </div>
                                    <p className="hbReviewText">{t.text}</p>
                                    <Image
                                        src="https://www.wegomap.com/assests/site/assets/images/google-review.svg"
                                        alt="Google Review"
                                        width={80}
                                        height={28}
                                        unoptimized
                                        className="hbGoogleBadge"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

        </div>
    );
}
