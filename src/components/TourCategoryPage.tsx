"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, User, Mail, Phone, X, Heart } from 'lucide-react';
import { API_URL, getImageUrl } from '@/config';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import EnquireModal from './EnquireModal';


export interface TourPackage {
    _id?: string;
    slug?: string;
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
    preTitle?: string;
    bannerImage: string;
    bookCount?: number;
    packages: TourPackage[];
    readMoreContent?: React.ReactNode;
    readMoreHeading?: string;
}

import DynamicPageBanner from './DynamicPageBanner';
import { testimonialsData as testimonials } from '@/data/testimonialsData';

export default function TourCategoryPage({
    title,
    subtitle,
    preTitle,
    bannerImage,
    bookCount = 25,
    packages,
    readMoreContent,
    readMoreHeading,
}: TourCategoryPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success && data.data.wishlist) {
                        setWishlist(data.data.wishlist);
                    }
                } catch (e) {
                    console.error('Error fetching wishlist status:', e);
                }
            }
        };
        fetchWishlist();
    }, []);

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
            const data = await res.json();
            if (data.success) {
                setWishlist(data.data);
                toast.success(data.message);
            }
        } catch (err) {
            toast.error('Failed to update wishlist');
        }
    };

    const handleQuickPlan = (pkgTitle: string) => {
        setSelectedPackage(pkgTitle);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        // Redundant as we now use EnquireModal, but kept for compatibility if needed
    };


    return (
        <div className="tourCatPage">

            {/* ── Banner / Hero ── */}
            <DynamicPageBanner
                fallbackTitle={title}
                fallbackSubtitle={subtitle}
                fallbackPreTitle={preTitle}
                fallbackImage={getImageUrl(bannerImage)}
                breadcrumbs={[{ label: title }]}
            />

            {/* ── Package Listings ── */}
            <section className="tourCatPackages">
                <div className="homeContainer">
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
                                <Link href={pkg.detailUrl ? (pkg.detailUrl.startsWith('/') ? pkg.detailUrl : `/${pkg.detailUrl}`) : `/packages/${pkg.slug || pkg._id || ''}`} className="tourCatCardImgWrap">
                                    <Image
                                        src={getImageUrl(pkg.image)}
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
                                    <button 
                                        onClick={(e) => toggleWishlist(pkg._id || '', e)}
                                        className={`tourCatWishlistBtn ${wishlist.includes(pkg._id || '') ? 'active' : ''}`}
                                    >
                                        <Heart size={18} fill={wishlist.includes(pkg._id || '') ? "currentColor" : "none"} />
                                    </button>
                                </Link>
                                <div className="tourCatCardBody">
                                    <p className="tourCatCardDuration">{pkg.duration}</p>
                                    <Link href={pkg.detailUrl ? (pkg.detailUrl.startsWith('/') ? pkg.detailUrl : `/${pkg.detailUrl}`) : `/packages/${pkg.slug || pkg._id || ''}`}>
                                        <h2 className="tourCatCardTitle">{pkg.title}</h2>
                                    </Link>
                                    <div className="tourCatCardLocation">
                                        <span className="tourCatDot">•</span> {pkg.location}
                                    </div>
                                    <div className="tourCatCardPricing">
                                        <span className="tourCatPrice">{pkg.price}</span>
                                        <span className="tourCatOrigPrice">{pkg.originalPrice}</span>
                                        <span className="tourCatPerPerson">per Person</span>
                                    </div>
                                    <div className="tourCatCardBtns">
                                        <button
                                            type="button"
                                            onClick={() => handleQuickPlan(pkg.title)}
                                            className="tourCatEnquireBtn"
                                            style={{ backgroundColor: '#FF6B35' }}
                                        >
                                            Get a Quick Plan
                                        </button>
                                        <Link href={pkg.detailUrl ? (pkg.detailUrl.startsWith('/') ? pkg.detailUrl : `/${pkg.detailUrl}`) : `/packages/${pkg.slug || pkg._id || ''}`} className="tourCatDetailsBtn">
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
                            {typeof readMoreContent === 'string' ? (
                                <div dangerouslySetInnerHTML={{ __html: readMoreContent }} />
                            ) : (
                                readMoreContent
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Testimonials ── */}
            <section className="tourCatReviews">
                <div className="homeContainer">
                    <h2 className="tourCatReviewsTitle">Our Happy Clients</h2>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop
                        slidesPerView={1}
                        spaceBetween={24}
                        breakpoints={{
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3 },
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
                                        src="/assets/site/assets/images/google-review.svg"
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
                <div className="homeContainer">
                    <p className="tourCatCTALabel" style={{ color: '#FF6B35' }}>GREAT PLACES TO VISIT</p>
                    <h2 className="tourCatCTATitle">Planning your next trip?</h2>
                    <p className="tourCatCTASub">Talk to our experts and get a detailed plan for your next trip</p>
                    <div className="tourCatCTABtns">
                        <button 
                            onClick={() => handleQuickPlan('General Inquiry')}
                            className="tourCatCTAEnquire" 
                            style={{ backgroundColor: '#FF6B35' }}
                        >
                            Enquire Now
                        </button>
                        <a href="tel:+918590370566" className="tourCatCTACall">
                            📞 Talk With Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Plan Modal Popup */}
            <EnquireModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                packageName={selectedPackage} 
            />
        </div>

    );
}
