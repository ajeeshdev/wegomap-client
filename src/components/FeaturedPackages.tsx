"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL, getImageUrl } from '@/config';
import { IndianRupee, MapPin, ArrowRight, Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Package {
    _id: string;
    slug?: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    oldPrice?: number;
    category: string;
    description: string;
    isBestSeller: boolean;
    rating: number;
    images: string[];
}

export default function FeaturedPackages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState<string[]>([]);
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
        async function getPackages() {
            try {
                const res = await fetch(`${API_URL}/packages`);
                if (res.headers.get('content-type')?.includes('application/json')) {
                    const data = await res.json();
                    if (data.success) {
                        setPackages(data.data);
                    }
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        }
        getPackages();
    }, []);

    const keralaPackages = packages.filter((p: Package) => p.category === 'Kerala Tour');
    const otherPackages = packages.filter((p: Package) => p.category !== 'Kerala Tour').slice(0, 4);

    if (loading) return (
        <div className="homeContainer mx-auto px-4 py-32 text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <div className="text-gray-400 font-bold uppercase tracking-widest text-sm text-blue-500">Discovering the World...</div>
        </div>
    );

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="homeContainer mx-auto px-4 md:px-6">

                {/* Kerala Section Carousel */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row justify-center items-center mb-12 text-center relative">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
                                <span className="text-blue-600">Kerala Tour</span> Operator
                            </h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl italic mx-auto">
                                Experience the beauty of God&apos;s Own Country with Kerala&apos;s best tour operator. As a trusted Kerala travel agency, we specialize in crafting unforgettable journeys tailored to your desires.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-8 md:mt-0 md:absolute md:right-0 md:bottom-2">
                            <button className="swiper-prev-kerala w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="swiper-next-kerala w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        navigation={{
                            prevEl: '.swiper-prev-kerala',
                            nextEl: '.swiper-next-kerala',
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1280: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        className="!pb-16"
                    >
                        {keralaPackages.map((pkg: Package) => (
                            <SwiperSlide key={pkg._id}>
                                <div className="group relative bg-[#f1f5f9] rounded-[2.5rem] overflow-hidden border border-transparent hover:border-blue-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                                    {/* Image Area */}
                                    <div className="aspect-square relative overflow-hidden">
                                        {pkg.images && pkg.images.length > 0 ? (
                                            <Image
                                                src={getImageUrl(pkg.images?.[0] || (pkg as any).image || (pkg as any).thumb)}
                                                alt={pkg.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center italic font-black text-white/20 text-4xl -rotate-12 select-none uppercase">
                                                {pkg.location}
                                            </div>
                                        )}

                                        {/* Price Badge */}
                                        <div className="absolute top-6 left-6 z-10">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                                                {pkg.oldPrice && (
                                                    <span className="text-[10px] text-slate-400 line-through block font-bold decoration-2 mb-0.5 tracking-tighter decoration-red-400/50">
                                                        ₹{pkg.oldPrice.toLocaleString()}
                                                    </span>
                                                )}
                                                <div className="flex items-center gap-0.5 text-slate-900 font-black tracking-tighter text-lg">
                                                    <span className="text-xs">₹</span>{pkg.price.toLocaleString()}
                                                    <small className="text-[10px] text-slate-500 font-bold italic ml-0.5">/Person</small>
                                                </div>
                                            </div>
                                        </div>

                                        {pkg.isBestSeller && (
                                            <div className="absolute top-6 right-6">
                                                <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                    Bestseller
                                                </div>
                                            </div>
                                        )}

                                        {/* Wishlist Heart Icon */}
                                        <button 
                                            onClick={(e) => toggleWishlist(pkg._id, e)}
                                            className={`absolute ${pkg.isBestSeller ? 'top-16' : 'top-6'} right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 ${wishlist.includes(pkg._id) ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500'}`}
                                        >
                                            <Heart size={18} fill={wishlist.includes(pkg._id) ? "currentColor" : "none"} />
                                        </button>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8">
                                        <h3 className="text-xl font-black text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors uppercase italic tracking-tight">{pkg.title}</h3>
                                        <p className="text-slate-500 text-xs font-semibold mb-8 line-clamp-1 italic leading-relaxed">
                                            {pkg.description}
                                        </p>
                                        <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                                            <div className="flex gap-1 text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < Math.floor(pkg.rating) ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                            <Link href={`/packages/${pkg.slug || pkg._id}`} className="w-10 h-10 bg-white group-hover:bg-blue-600 group-hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all border border-slate-100">
                                                <ChevronRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Other Destinations Grid */}
                <div>
                    <div className="flex flex-col md:flex-row justify-center items-center mb-16 px-4 text-center relative">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter underline decoration-8 decoration-blue-100 underline-offset-8 italic uppercase mb-4">
                                Domestic & International
                            </h2>
                            <p className="text-slate-500 font-medium">Explore the World all the way you can. Grab the best destination offers and getaway!</p>
                        </div>
                        <Link href="/packages" className="hidden md:flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors group absolute right-4 bottom-2">
                            Explore More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {otherPackages.map((pkg: Package) => (
                            <div key={pkg._id} className="group flex flex-col items-center text-center">
                                <div className="aspect-square w-full bg-slate-100 rounded-[3rem] overflow-hidden mb-8 relative border border-slate-50 hover:border-blue-100 transition-all">
                                    {pkg.images && pkg.images.length > 0 ? (
                                        <Image
                                            src={getImageUrl(pkg.images?.[0] || (pkg as any).image || (pkg as any).thumb)}
                                            alt={pkg.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center italic font-black text-slate-400 opacity-20 uppercase -rotate-12 select-none">
                                            {pkg.location}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                    <Link href={`/packages/${pkg.slug || pkg._id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                                        <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center text-black">
                                            <ArrowRight size={24} />
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={(e) => toggleWishlist(pkg._id, e)}
                                        className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 ${wishlist.includes(pkg._id) ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100'}`}
                                    >
                                        <Heart size={18} fill={wishlist.includes(pkg._id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                                    <MapPin size={10} /> {pkg.location}
                                </div>
                                <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors italic uppercase">{pkg.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
