"use client";

import { API_URL, getImageUrl } from '@/config';
import { useEffect, useState } from 'react';
import { Clock, MoveRight, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { siteData } from '@/data/siteData';

interface Blog {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    category?: string;
    author?: string;
    publishDate?: string;
    date?: string;
    excerpt: string;
    image?: string;
    featuredImage?: string;
}

// Map siteData blogs to a unified shape, sorted newest-first
function sortByDateDesc(blogs: Blog[]): Blog[] {
    return [...blogs].sort((a, b) => {
        const da = new Date(a.publishDate || a.date || 0).getTime();
        const db = new Date(b.publishDate || b.date || 0).getTime();
        return db - da;
    });
}

const staticBlogs: Blog[] = sortByDateDesc(
    siteData.blogs.map((b: any) => ({
        id: b.id,
        _id: b.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        image: b.image,
        date: b.date,
        category: 'Travel Guide',
        author: 'WEGOMAP',
    }))
);

function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>(staticBlogs);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch(`${API_URL}/blogs`);
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setBlogs(sortByDateDesc(data.data));
                }
                // else keep the static blogs
            } catch (err) {
                // Network error – static blogs are already set
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getBlogs();
    }, []);

    return (
        <div className="blogsPage">
            <DynamicPageBanner
                fallbackTitle="Travel Blogs"
                fallbackSubtitle="Insider tips, destination guides, and travel stories to inspire your next journey."
                fallbackPreTitle="Insider Stories"
                breadcrumbs={[{ label: 'Blogs' }]}
            />
            <div className="homeContainer">
                <div className="sectionHeader flex items-center justify-center mb-12  pb-0">
                    <div className="titleArea">
                        <span className="sectionSubtitle">Our Stories</span>
                        <h2 className="sliderTitle">Travel <span className="highlight">Blogs</span></h2>
                        <p className="text-slate-500 max-w-2xl text-[13px] leading-relaxed mx-auto">Insider tips, destination guides, and travel stories to inspire your next journey.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="loadingWrapper">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="blogsGrid">
                        {blogs.map((blog, idx) => (
                            <article key={blog._id || blog.id || idx} className="blogArticle">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <div className="imageWrapper">
                                        {(blog.featuredImage || blog.image) ? (
                                            <Image
                                                src={getImageUrl(blog.featuredImage || blog.image || '')}
                                                alt={blog.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="patternBg">
                                                <div className="text">WEGOMAP TRAVEL STORIES</div>
                                            </div>
                                        )}
                                        <div className="categoryBadge">
                                            {blog.category || 'Travel Guide'}
                                        </div>
                                    </div>

                                    <div className="blogContent">
                                        <div className="metaRow">
                                            <span className="metaItem">
                                                <Tag size={13} />
                                                {blog.author || 'WEGOMAP'}
                                            </span>
                                            <span className="metaItem">
                                                <Calendar size={13} />
                                                {formatDate(blog.publishDate || blog.date)}
                                            </span>
                                        </div>
                                        <h3>{blog.title}</h3>
                                        <p className="excerpt">{blog.excerpt || 'Exciting story of travel experiences...'}</p>

                                        <div className="readMore">
                                            Read Full Story <MoveRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
