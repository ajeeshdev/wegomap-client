"use client";

import { useEffect, useState } from 'react';
import { Clock, MoveRight, User } from 'lucide-react';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    author: string;
    publishDate: string;
    excerpt: string;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBlogs() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
                const data = await res.json();
                if (data.success) {
                    setBlogs(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getBlogs();
    }, []);

    return (
        <div className="blogsPage">
            <PageBanner
                title="Travel Blogs"
                subtitle="Insider tips, destination guides, and travel stories to inspire your next journey."
                breadcrumbs={[{ label: 'Blogs' }]}
            />
            <div className="homeContainer">
                <div className="headerSection animate-in fade-in slide-in-from-bottom duration-700">
                    <span className="subTitle">Our Stories</span>
                    <h2>Travel <span>Blogs.</span></h2>
                    <p className="description">Insider tips, destination guides, and travel stories to inspire your next journey.</p>
                </div>

                {loading ? (
                    <div className="loadingWrapper">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="blogsGrid">
                        {blogs.map((blog) => (
                            <article key={blog._id} className="blogArticle">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <div className="imageWrapper">
                                        <div className="patternBg">
                                            <div className="text">WEGOMAP TRAVEL STORIES</div>
                                        </div>
                                        <div className="categoryBadge">
                                            {blog.category || 'Travel Guide'}
                                        </div>
                                    </div>

                                    <div className="blogContent">
                                        <div className="metaRow">
                                            <span className="metaItem"><User size={14} /> {blog.author || 'Admin'}</span>
                                            <span className="metaItem"><Clock size={14} /> {new Date(blog.publishDate).toLocaleDateString()}</span>
                                        </div>
                                        <h3>{blog.title}</h3>
                                        <p className="excerpt">{blog.excerpt || "Exciting story of travel experiences..."}</p>

                                        <div className="readMore">
                                            Read Full Story <MoveRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {!loading && blogs.length === 0 && (
                    <div className="emptyState">
                        <h3>Stories are being written...</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
