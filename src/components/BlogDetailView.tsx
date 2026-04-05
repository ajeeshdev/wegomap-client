"use client";

import { API_URL, getImageUrl } from '@/config';
import { useEffect, useState } from 'react';
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
    author: 'WEGOMAP',
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

export default function BlogDetailView({ slug }: { slug: string }) {
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
                // Network error fall through to static
            }

            const found = staticBlogs.find((b) => b.slug === slug);
            setBlog(found || null);
            setLoading(false);
        }

        if (slug) getBlog();
    }, [slug]);

    if (loading) return (
        <div className="blog-detail-page">
            <div className="loading-container">
                <div className="spinner" />
            </div>
        </div>
    );

    if (!blog) return (
        <div className="blog-detail-page">
            <div className="not-found-container">
                Blog post not found
            </div>
        </div>
    );

    const publishDate = formatDate(blog.publishDate || blog.date);

    return (
        <article className="blog-detail-page">
            {/* Hero */}
            <section className="hero-section">
                {(blog.featuredImage || blog.image) && (
                    <Image
                        src={getImageUrl(blog.featuredImage || blog.image || '')}
                        alt={blog.title}
                        fill
                        className="hero-image"
                    />
                )}
                {/* gradient overlay */}
                <div className="hero-overlay" />

                {/* watermark */}
                <div className="hero-watermark">
                    WEGOMAP
                </div>

                <div className=" hero-content homeContainer">
                    <Link href="/blogs" className="back-link">
                        <ArrowLeft size={14} /> All Stories
                    </Link>

                    <span className="category-badge">
                        {blog.category || 'Travel Guide'}
                    </span>

                    <h1 className="hero-title">
                        {blog.title}
                    </h1>

                    <div className="meta-info">
                        <div className="meta-item">
                            <span className="label">Author</span>
                            <span className="value">
                                <User size={14} color="#FF6B35" /> {blog.author || 'WEGOMAP'}
                            </span>
                        </div>

                        {publishDate && (
                            <div className="meta-item">
                                <span className="label">Published</span>
                                <span className="value">
                                    <Calendar size={14} color="#FF6B35" /> {publishDate}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="main-content">
                <div className="homeContainer">
                    <div className="blog-detail-grid">
                        {/* Share sidebar (hidden on mobile) */}
                        <aside className="share-sidebar">
                            <span className="share-label">Share</span>
                            <button className="share-btn"
                                onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}>
                                <Share2 size={18} />
                            </button>
                            <button className="share-btn">
                                <Hash size={18} />
                            </button>
                        </aside>

                        {/* Article body */}
                        <main className="article-body">
                            {/* Excerpt highlight */}
                            <blockquote className="excerpt-quote">
                                "{blog.excerpt || 'Exciting story of travel experiences with deep insights into the local culture.'}"
                            </blockquote>

                            {/* Blog content render HTML */}
                            <div
                                className="blog-content-render"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Tags */}
                            <div className="tags-container">
                                {['Kerala Tourism', 'WEGOMAP Guide', 'Travel Tips'].map(tag => (
                                    <span key={tag} className="tag-badge">{tag}</span>
                                ))}
                            </div>
                        </main>

                        {/* Right sidebar */}
                        <aside className="right-sidebar">
                            <div className="sidebar-sticky">
                                {/* Newsletter */}
                                <div className="newsletter-card">
                                    <div className="decoration-glow" />
                                    <h4>
                                        Join Our<br />
                                        <span>Travel Newsletter.</span>
                                    </h4>
                                    <p>
                                        Get weekly travel inspiration and exclusive deals.
                                    </p>
                                    <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} className="newsletter-form">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                        />
                                        <button className="submit-btn">
                                            Subscribe <Send size={14} />
                                        </button>
                                    </form>
                                </div>

                                {/* Related Blogs */}
                                <div className="related-blogs-card">
                                    <h4>Related Stories</h4>
                                    <div className="related-list">
                                        {staticBlogs
                                            .filter(b => b.slug !== slug)
                                            .slice(0, 4)
                                            .map(relBlog => (
                                                <Link key={relBlog.id} href={`/blogs/${relBlog.slug}`} className="related-item">
                                                    <div className="image-wrap">
                                                        {relBlog.image && (
                                                            <Image src={getImageUrl(relBlog.image)} alt={relBlog.title} fill />
                                                        )}
                                                    </div>
                                                    <div className="content-wrap">
                                                        <div className="tag">
                                                            Travel Guide
                                                        </div>
                                                        <div className="title">
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
            </section>
        </article>
    );
}
