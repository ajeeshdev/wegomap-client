"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Ship, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';




/* ── Data ── */
const heroSlides = [
    'https://www.wegomap.com/assests/site/img/houseboat/1.jpg',
    'https://www.wegomap.com/assests/site/img/houseboat/2.jpg',
];

const boatTypes = [
    {
        image: 'https://www.wegomap.com/assests/site/img/houseboat/deluxe.jpg',
        title: 'Deluxe Houseboat',
        price: '₹ 15,999',
        originalPrice: '₹ 19,999',
        desc: 'Deluxe houseboats in Alleppey are budget-compatible and include standard facilities like living area, A/C bedrooms, attached bathrooms, and kitchen. A/C works from 9:00 PM to 6:00 AM. Perfect for families looking to travel on a budget.',
    },
    {
        image: 'https://www.wegomap.com/assests/site/img/houseboat/premium.jpg',
        title: 'Premium Houseboat',
        price: '₹ 20,999',
        originalPrice: '₹ 25,999',
        desc: 'Premium houseboats in Alleppey are partially or fully glass-covered with a wooden ceiling. Includes living area, bedrooms, attached bathrooms, and an independent kitchen. 24 hrs. AC facility is available.',
    },
    {
        image: 'https://www.wegomap.com/assests/site/img/houseboat/luxury.jpg',
        title: 'Luxury Houseboat',
        price: '₹ 25,999',
        originalPrice: '₹ 29,999',
        desc: 'Luxury houseboats in Alleppey are similar to five-star hotels. Fully glass-covered so that you can enjoy the views fully. Includes amenities like living area, balcony, kitchen, bedrooms, and attached bathrooms.',
    },
];

const rules = [
    'Check-in: 12:30 hours and check out 08:30 hours next day',
    'Stay includes: 3 meals and 01 tea snacks (Lunch, dinner, breakfast)',
    'Cruise hours: Cruise starts from 12:30 hours to 17:00 hours, with a one-hour break for lunch in between',
    'Check In: 12:30 hrs | Cruise time from: 12:30 hrs. to 17:30 hrs.',
    'Lunch break: 1.5 hrs. | Dinner: 20:00 hrs. to 21:30 hrs | Morning Cruise: 08:00 to 08:45 hrs | Check Out: 08:45 hrs',
    'Since the houseboat is moving through countryside and paddy fields, there may be possibilities of pests in the houseboats.',
    'Always close doors and windows to avoid mosquitoes entering the bedrooms.',
    'Food will be a preset traditional Kerala menu, breakfast will be light e.g.: idly, omelette, bread and jam.',
    'Since there is no storage facility, last-minute food orders will be difficult once the boat leaves the boarding point.',
    'Crews in the houseboats are not professionally trained by any hospitality institutions; most of them are oarsmen of erstwhile goods canoes, which may cause language issues.',
    'There may be chances of unexpected power failure and technical issues at any time.',
    'TV channels are not available.',
    'Shoes and slippers are not allowed on boats (they have to be kept in the common area after entering the houseboat).',
    'All houseboat crews belong to a trade union, and trade union influence is higher than the management.',
    'All guests have to sleep by 22:00 hours since the crew sleeps in the common area of the same boat.',
    'Crews may insist you to buy fish and prawns from the shops on the way; buy it if you are comfortable with rates and quality.',
    'Facilities, cleanliness, quality of linen, towel, and toiletries are not comparable to hotels and resorts.',
    'Crews may insist you to hire shikhara boats, speed boats, or any other water sports activities; go ahead if you are comfortable with rates and safety concerns.',
    'A/C will work from 21:00 hours to 06:00 hours in bedrooms in deluxe boats; in premium boats, A/C is available in the bedroom on request; in the luxury boats, A/C is available in rooms and dining area on request.',
];

const testimonials = [
    { name: 'Imran Shariff', img: 'https://www.wegomap.com/uploads/testimonials/lECdwnqz0sFj4Pcwi4IenLB5m6kVr82TaOfU35Ib260228022926.png', text: 'Exploring munnar without wegomap was impossible... It was great experience to share everything was awesome service provided by them and specially tempo traveler driver binu bhai was very honest and humble in whole trip and made it true ... I recommend to everyone..' },
    { name: 'Sumit Kumar Sinha', img: 'https://www.wegomap.com/uploads/testimonials/e9LVL1MpqxfB7dYYZjbfgT9c6PctXAF277MdMGPt260228022430.png', text: 'Wegomaps provided an outstanding Kerala experience, surpassing expectations. From well-curated itineraries showcasing diverse landscapes to impeccable accommodations, every detail was meticulously planned.' },
    { name: 'Komanpally Ravindra', img: 'https://www.wegomap.com/uploads/testimonials/qX82Z9vyeZBLSPm0L3VseevrrkLdPtcQSaNC8sHj260228021643.png', text: 'That was an awesome trip to Kerala with WEGOMAP fathima really helped us a lot in every aspect….and the driver Ajmal was too friendly and made our journey with comfort and safety.' },
    { name: 'Suresh K', img: 'https://www.wegomap.com/uploads/testimonials/5KYj0KGZVjbwoQFwps9kcGMQLjyZkW0s6IMbzUrN260228021237.png', text: 'wegompa tour and events was very well organized our trip, very good hotel, boathouse and trip route map in kerala we enjoy very well thanks to team and special thanks to fathim, she supporting well.' },
    { name: 'V T Vishwanath', img: 'https://www.wegomap.com/uploads/testimonials/GMzo4CeZOh1IOz5n8gGAor2nPKlQCqURaIoTsyyE260226040945.png', text: 'Really good travel service by WEGOMAP. Athira from WEGOMAP helped us to plan Munnar and Thekkady Kerala honeymoon trip. It was a really good experience.' },
    { name: 'Pooja Singh', img: 'https://www.wegomap.com/uploads/testimonials/ZRyfMmqrgi6Hd4QW1Pv2Op6vPqTeAC5qhuJQOUuw260226035449.png', text: 'Had a fabulous experience, the itinerary was well planned. The hotels were located at best places. Fathima was amazing the way she explained the package. We have not faced any issues in any way in our entire trip.' },
    { name: 'Ravina Vaishnav', img: 'https://www.wegomap.com/uploads/testimonials/58IAT9y5Gjf79jB6uTSuvSgQI7aaPZ4XYnWaoasI260226035056.png', text: 'Whole trip was good and our driver jithin methew was too good and friendly and our advisers miss fatima will very cooperative. Best service ever.. we will enjoy too much very memorable trip for us ...' },
    { name: 'Vishesh Maity', img: 'https://www.wegomap.com/uploads/testimonials/5gx8E8RQimgCGiohTY51b6YPb7vd4CWNYgn13X7A260226033830.jpg', text: 'We booked a 6N/7D package with Wegomap Tour, and it was an absolutely amazing experience! Everything — from the stay, food, and transportation to the overall planning — was perfectly organized.' },
];

/* ── Component ── */
export default function HouseboatPage() {
    return (
        <div className="houseboatPage">

            {/* ── Hero Slider ── */}
            <div className="hbHero">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    className="hbHeroSwiper"
                >
                    {heroSlides.map((src, i) => (
                        <SwiperSlide key={i}>
                            <div className="hbHeroSlide" style={{ backgroundImage: `url(${src})` }}>
                                <div className="hbHeroOverlay" />
                                <div className="homeContainer hbHeroContent">
                                    <span className="hbWelcome">Welcome to WEGOMAP</span>
                                    <h1 className="hbHeroTitle">Houseboat Cruise</h1>
                                    <p className="hbHeroSub">
                                        Invites You to A Slow Motion Pleasure Hunt in A Heaven of Peace and
                                        Tranquility Away from The Dins and Bustles of Towns and Cities
                                    </p>
                                    <a href="tel:+918590370566" className="hbEnquireBtn">
                                        <Phone size={16} /> Enquire Now
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Breadcrumb over hero */}
                <div className="hbBreadcrumb">
                    <div className="homeContainer">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/services">Services</Link>
                        <span>/</span>
                        <span className="active">Kerala Houseboat Service</span>
                    </div>
                </div>
            </div>

            {/* ── About ── */}
            <section className="hbAbout homeContainer">
                <p>
                    Houseboats have been serving the backwaters of Alleppey for more than 7 successful years
                    and still counting more years to cherish its dominance in the field. We provide
                    ultra-luxurious services with immense pleasure at a very reasonable rate.
                </p>
                <p>
                    We provide the best-in-class luxury houseboat services in Alleppey no matter who the
                    competitors are in this field. We provide our services at a price which is lower than any
                    other such service providers when compared in Alleppey. We do so as we are the real owners
                    of the houseboats and not an intermediary.
                </p>
            </section>

            {/* ── Boat Types ── */}
            <section className="hbTypes">
                <div className="homeContainer">
                    <h2 className="hbSectionTitle">
                        Different Types Of House Boat <Ship size={28} className="hbTitleIcon" />
                    </h2>
                    <div className="hbTypesGrid">
                        {boatTypes.map((boat, i) => (
                            <div key={i} className="hbBoatCard">
                                <div className="hbBoatImg">
                                    <Image src={boat.image} alt={boat.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                </div>
                                <div className="hbBoatBody">
                                    <h3>{boat.title}</h3>
                                    <div className="hbPriceRow">
                                        <span className="hbPrice">{boat.price}</span>
                                        <span className="hbOrigPrice">{boat.originalPrice}</span>
                                        <span className="hbOnwards">Onwards</span>
                                    </div>
                                    <p>{boat.desc}</p>
                                    <a href="tel:+918590370566" className="hbEnquireCardBtn">
                                        Enquire Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Sharing Houseboat ── */}
            <section className="hbSharing">
                <div className="homeContainer">
                    <h2 className="hbSectionTitle white">Sharing House Boat</h2>
                    <div className="hbSharingGrid">
                        <div className="hbSharingImg">
                            <Image
                                src="https://www.wegomap.com/assests/site/img/houseboat/shared-houseboat.jpg"
                                alt="Shared Houseboat"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                        <div className="hbSharingText">
                            <p>
                                Discover the perfect blend of relaxation and adventure with our shared houseboat
                                experiences. Whether you&apos;re planning a getaway with friends, family, or fellow
                                adventurers, sharing a houseboat offers a unique and cost-effective way to enjoy
                                life on the water.
                            </p>
                            <p>
                                Immerse yourself in the tranquility of nature, explore scenic waterways, and create
                                unforgettable memories, all while sharing the comfort and luxury of a fully equipped
                                houseboat.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Rules ── */}
            <section className="hbRules">
                <div className="homeContainer">
                    <h2 className="hbSectionTitle">Houseboat Rules</h2>
                    <div className="hbRulesBox">
                        <ul>
                            {rules.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                        <p className="hbHoneymoon">
                            <strong>Honeymoon Delights:</strong> Flower Bed Decoration, Candle light dinner &amp; cake
                        </p>
                        <p className="hbNote">
                            <strong>*Note:</strong> Season rates / Hike rates for Pooja, Onam, Diwali, and other Public Holidays
                        </p>
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
                                    <Image src="https://www.wegomap.com/assests/site/assets/images/google-review.svg" alt="Google Review" width={80} height={28} unoptimized className="hbGoogleBadge" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

        </div>
    );
}
