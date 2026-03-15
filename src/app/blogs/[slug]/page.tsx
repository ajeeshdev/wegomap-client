"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, Hash, User, ArrowLeft, Send, Share2, Tag, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { siteData } from '@/data/siteData';

interface Blog {
    _id?: string;
    id?: string;
    title: string;
    author?: string;
    publishDate?: string;
    date?: string;
    category?: string;
    excerpt: string;
    content: string;
    image?: string;
    featuredImage?: string;
    slug: string;
}

// Map siteData blogs to unified Blog shape
const staticBlogs: Blog[] = (siteData.blogs as any[]).map((b) => ({
    id: b.id,
    _id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    image: b.image,
    date: b.date,
    content: b.content || '',
    category: 'Travel Guide',
    author: 'Wegomap',
}));

function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBlog() {
            try {
                const res = await fetch(`${API_URL}/blogs/slug/${slug}`);
                const data = await res.json();
                if (data.success && data.data) {
                    const blogData = Array.isArray(data.data) ? data.data[0] : data.data;
                    if (blogData && blogData.title) {
                        setBlog(blogData);
                        setLoading(false);
                        return;
                    }
                }
            } catch {
                // Network error — fall through to static data
            }

            // Fallback: find in static siteData
            const found = staticBlogs.find((b) => b.slug === slug);
            setBlog(found || null);
            setLoading(false);
        }

        if (slug) getBlog();
    }, [slug]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '6px solid #f3f3f3',
                borderTop: '6px solid #FF6B35',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (!blog) return (
        <div style={{ paddingTop: 160, textAlign: 'center', color: '#999', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Blog post not found
        </div>
    );

    const publishDate = formatDate(blog.publishDate || blog.date);

    return (
        <article style={{ paddingTop: 80, background: '#fff' }}>
            {/* Hero */}
            <section style={{
                position: 'relative',
                minHeight: '55vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#0f172a'
            }}>
                {(blog.featuredImage || blog.image) && (
                    <Image
                        src={blog.featuredImage || blog.image || ''}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover', opacity: 0.3 }}
                        unoptimized
                    />
                )}
                {/* gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.95) 100%)'
                }} />

                {/* watermark */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 160, fontWeight: 900, color: 'rgba(255,255,255,0.03)',
                    pointerEvents: 'none', userSelect: 'none',
                    letterSpacing: '-0.05em', textTransform: 'uppercase', fontStyle: 'italic'
                }}>
                    WEGOMAP
                </div>

                <div style={{
                    position: 'relative', zIndex: 10,
                    maxWidth: 900, margin: '0 auto', padding: '60px 24px',
                    textAlign: 'center'
                }}>
                    <Link href="/blogs" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        marginBottom: 32,
                        color: '#FF6B35', fontWeight: 800, fontSize: '0.75rem',
                        textTransform: 'uppercase', letterSpacing: '0.15em',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '10px 20px', borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s'
                    }}>
                        <ArrowLeft size={14} /> All Stories
                    </Link>

                    <span style={{
                        display: 'inline-block', marginBottom: 20,
                        background: 'rgba(255,107,53,0.15)',
                        color: '#FF6B35', fontWeight: 800, fontSize: '0.7rem',
                        textTransform: 'uppercase', letterSpacing: '0.15em',
                        padding: '6px 16px', borderRadius: 999,
                        border: '1px solid rgba(255,107,53,0.25)'
                    }}>
                        {blog.category || 'Travel Guide'}
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                        fontWeight: 900, color: '#fff',
                        lineHeight: 1.15, marginBottom: 32,
                        letterSpacing: '-0.02em'
                    }}>
                        {blog.title}
                    </h1>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Author</span>
                            <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <User size={14} color="#FF6B35" /> {blog.author || 'Wegomap'}
                            </span>
                        </div>

                        {publishDate && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Published</span>
                                <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Calendar size={14} color="#FF6B35" /> {publishDate}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: '80px 0' }}>
                <div className="homeContainer" style={{ maxWidth: 1200 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
                        {/* on wider screens use CSS grid */}
                        <style>{`
                            @media (min-width: 1024px) {
                                .blogDetailGrid { display: grid !important; grid-template-columns: 60px 1fr 340px !important; gap: 48px !important; }
                            }
                        `}</style>

                        <div className="blogDetailGrid" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            {/* Share sidebar (hidden on mobile) */}
                            <aside style={{ display: 'none' }} className="blogShareSidebar">
                                <style>{`.blogShareSidebar { display: none; } @media (min-width: 1024px) { .blogShareSidebar { display: flex !important; flex-direction: column; align-items: center; gap: 24px; position: sticky; top: 100px; height: fit-content; padding-top: 8px; } }`}</style>
                                <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '0.6rem', fontWeight: 800, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Share</span>
                                <button style={{ padding: 14, background: '#f8f8f8', borderRadius: 16, color: '#999', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                                    onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}>
                                    <Share2 size={18} />
                                </button>
                                <button style={{ padding: 14, background: '#f8f8f8', borderRadius: 16, color: '#999', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                                    <Hash size={18} />
                                </button>
                            </aside>

                            {/* Article body */}
                            <main>
                                {/* Excerpt highlight */}
                                <blockquote style={{
                                    padding: '32px 40px',
                                    background: '#fafafa',
                                    borderRadius: 24,
                                    borderLeft: '4px solid #FF6B35',
                                    marginBottom: 48,
                                    fontStyle: 'italic',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: '#555',
                                    fontWeight: 500
                                }}>
                                    "{blog.excerpt || 'Exciting story of travel experiences with deep insights into the local culture.'}"
                                </blockquote>

                                {/* Blog content – render HTML from backend or siteData */}
                                <div
                                    className="blogContent"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                    style={{
                                        fontSize: '1rem',
                                        lineHeight: 1.9,
                                        color: '#333'
                                    }}
                                />

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
                                    {['Kerala Tourism', 'Wegomap Guide', 'Travel Tips'].map(tag => (
                                        <span key={tag} style={{
                                            padding: '6px 18px',
                                            background: '#f5f5f5',
                                            borderRadius: 999,
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            color: '#666'
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </main>

                            {/* Right sidebar */}
                            <aside>
                                <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    {/* Newsletter */}
                                    <div style={{
                                        padding: 36, background: '#0f172a', color: '#fff',
                                        borderRadius: 28, overflow: 'hidden', position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute', top: -20, right: -20,
                                            width: 100, height: 100,
                                            background: 'rgba(255,107,53,0.12)',
                                            borderRadius: '50%', filter: 'blur(20px)'
                                        }} />
                                        <h4 style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: 12, lineHeight: 1.4 }}>
                                            Join Our<br />
                                            <span style={{ color: '#FF6B35' }}>Travel Newsletter.</span>
                                        </h4>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: 20 }}>
                                            Get weekly travel inspiration and exclusive deals.
                                        </p>
                                        <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                style={{
                                                    padding: '12px 16px',
                                                    background: 'rgba(255,255,255,0.07)',
                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                    borderRadius: 12,
                                                    color: '#fff',
                                                    fontSize: '0.85rem',
                                                    outline: 'none'
                                                }}
                                            />
                                            <button style={{
                                                padding: '14px 0',
                                                background: '#FF6B35',
                                                color: '#fff',
                                                fontWeight: 800, fontSize: '0.8rem',
                                                borderRadius: 12, border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                                letterSpacing: '0.05em', textTransform: 'uppercase'
                                            }}>
                                                Subscribe <Send size={14} />
                                            </button>
                                        </form>
                                    </div>

                                    {/* Related Blogs */}
                                    <div style={{
                                        padding: 28, background: '#fff',
                                        borderRadius: 28, border: '1px solid #f0f0f0',
                                        boxShadow: '0 4px 24px rgba(0,0,0,0.05)'
                                    }}>
                                        <h4 style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 20, color: '#1a1a1a' }}>Related Stories</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                            {staticBlogs
                                                .filter(b => b.slug !== slug)
                                                .slice(0, 4)
                                                .map(relBlog => (
                                                    <Link key={relBlog.id} href={`/blogs/${relBlog.slug}`} style={{
                                                        display: 'flex', alignItems: 'center', gap: 12,
                                                        padding: 12, borderRadius: 16,
                                                        textDecoration: 'none',
                                                        transition: 'all 0.2s',
                                                        border: '1px solid transparent'
                                                    }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                                    >
                                                        <div style={{
                                                            width: 56, height: 56, borderRadius: 12,
                                                            overflow: 'hidden', flexShrink: 0,
                                                            background: '#f0f0f0', position: 'relative'
                                                        }}>
                                                            {relBlog.image && (
                                                                <Image src={relBlog.image} alt={relBlog.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                                                                Travel Guide
                                                            </div>
                                                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>
                                                                {relBlog.title.length > 50 ? relBlog.title.slice(0, 50) + '…' : relBlog.title}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog content styles */}
            <style>{`
                .blogContent p { margin-bottom: 1.2em; }
                .blogContent h1, .blogContent h2, .blogContent h3, .blogContent h4 {
                    font-weight: 800; color: #1a1a1a; margin: 2em 0 0.8em;
                    line-height: 1.3;
                }
                .blogContent h2 { font-size: 1.5rem; }
                .blogContent h3 { font-size: 1.25rem; }
                .blogContent h4 { font-size: 1.1rem; }
                .blogContent ul, .blogContent ol { padding-left: 1.5em; margin-bottom: 1.2em; }
                .blogContent li { margin-bottom: 0.5em; }
                .blogContent a { color: #FF6B35; text-decoration: none; font-weight: 600; }
                .blogContent a:hover { text-decoration: underline; }
                .blogContent strong { font-weight: 700; color: #1a1a1a; }
                .blogContent img { max-width: 100%; border-radius: 16px; margin: 1.5em 0; }
                .blogContent blockquote { border-left: 3px solid #FF6B35; padding-left: 1em; color: #666; }
            `}</style>
        </article>
    );
}
