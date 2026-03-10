"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, MapPin, Search, MoveRight, User, Hash, PartyPopper, CalendarClock, Globe, ShieldCheck, ArrowLeft, Check, Sparkles, Building2, Car, Utensils, Send, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Blog {
    _id: string;
    title: string;
    author: string;
    publishDate: string;
    category: string;
    excerpt: string;
    content: string;
}

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBlog() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setBlog(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (slug) getBlog();
    }, [slug]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-20 h-20 border-8 border-gray-50 border-t-[#FFD52B] rounded-full animate-spin"></div>
        </div>
    );

    if (!blog) return <div className="pt-40 text-center text-gray-400 font-bold tracking-widest italic animate-bounce">STORY NOT FOUND</div>;

    return (
        <article className="pt-20 bg-white">
            {/* Hero Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0f172a]">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 opacity-10"></div>
                {/* Background pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 font-black text-[200px] text-white/5 whitespace-nowrap overflow-hidden pointer-events-none italic tracking-tighter uppercase select-none">WEGOMAP STORIES</div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center animate-in fade-in zoom-in duration-1000">
                    <Link href="/blogs" className="inline-flex items-center gap-2 mb-10 text-xs font-black tracking-widest uppercase text-[#FFD52B] hover:text-white transition-all bg-white/5 py-3 px-6 rounded-full border border-white/5 backdrop-blur-md">
                        <ArrowLeft size={16} /> All Stories
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">{blog.title}</h1>
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="flex flex-col items-center">
                            <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Author</div>
                            <div className="text-white font-black text-lg flex items-center gap-2 uppercase tracking-widest"><User size={16} className="text-[#FFD52B]" /> {blog.author || 'Admin'}</div>
                        </div>
                        <div className="flex items-center gap-3 border-x border-white/10 px-10">
                            <div className="flex flex-col items-center">
                                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Published</div>
                                <div className="text-white font-black text-lg flex items-center gap-2"><Clock size={16} className="text-[#FFD52B]" /> {new Date(blog.publishDate).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Category</div>
                            <div className="text-white font-black text-lg text-[#FFD52B] uppercase tracking-widest">{blog.category || 'Travel'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 animate-in fade-in slide-in-from-bottom duration-700">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Left Share Sidebar */}
                        <aside className="lg:col-span-1 hidden lg:flex flex-col items-center gap-8 sticky top-40 h-fit">
                            <div className="text-gray-300 font-black text-xs uppercase vertical-text">Share Story</div>
                            <div className="flex flex-col gap-4">
                                <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:bg-[#FFD52B] hover:text-black transition-all shadow-sm"><Share2 size={20} /></button>
                                <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:bg-[#FFD52B] hover:text-black transition-all shadow-sm"><Hash size={20} /></button>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <div className="lg:col-span-8 lg:col-start-2">
                            <div className="prose prose-lg prose-slate max-w-none mb-20 italic">
                                <div className="p-12 bg-gray-50 rounded-[60px] border border-gray-100/50 mb-16 text-gray-400 font-medium italic border border-gray-100 bg-gray-50 rounded-[40px] text-xl leading-relaxed italic border border-gray-100">
                                    &quot;{blog.excerpt || "Exciting story of travel experiences with deep insights into the local culture."}&quot;
                                </div>

                                <div className="text-gray-800 text-lg leading-relaxed space-y-8 italic font-medium">
                                    {blog.content?.split('\n').map((para: string, i: number) => (
                                        <p key={i}>{para}</p>
                                    )) || "Content is being loaded..."}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-12 border-t border-gray-50">
                                <span className="px-6 py-2 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-full">Kerala Tourism</span>
                                <span className="px-6 py-2 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-full">Wegomap Guide</span>
                                <span className="px-6 py-2 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-full">Adventure</span>
                            </div>
                        </div>

                        {/* Right Sidebar Newsletter */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-40 space-y-8">
                                <div className="p-10 bg-[#0f172a] text-white rounded-[50px] shadow-2xl relative overflow-hidden group border border-white/5 space-y-8">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD52B]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h4 className="text-xl font-black mb-6 leading-tight">Join Our <br /><span className="text-[#FFD52B]">Travel Newsletter.</span></h4>
                                    <p className="text-gray-400 text-xs leading-relaxed italic">Get weekly travel inspiration and exclusive deals delivered to your inbox.</p>
                                    <form className="space-y-4">
                                        <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#FFD52B] transition-all" />
                                        <button onClick={(e) => { e.preventDefault(); alert('Subscribed!') }} className="w-full py-5 bg-[#FFD52B] text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl shadow-yellow-500/10 active:scale-95 text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                                            Subscribe <Send size={14} />
                                        </button>
                                    </form>
                                </div>

                                <div className="p-10 bg-white border border-gray-100 rounded-[50px] shadow-sm space-y-8">
                                    <h4 className="text-lg font-black text-[#0f172a] tracking-tight italic underline decoration-8 decoration-[#FFD52B]/10 underline-offset-8 transition-all hover:decoration-[#FFD52B]/20">Related Tours.</h4>
                                    <div className="space-y-8">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-4 rounded-3xl transition-all border border-transparent hover:border-gray-100">
                                                <div className="w-20 h-20 bg-gray-100 rounded-2xl transition-all group-hover:scale-90"></div>
                                                <div>
                                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Munnar Package</div>
                                                    <div className="text-sm font-black text-[#0f172a] group-hover:text-[#FFD52B] transition-colors leading-tight">Explore the misty hills of Munnar</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </article>
    );
}
