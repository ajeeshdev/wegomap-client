"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, Layout, FileText, Heart, Target, Sparkles, ArrowRight, ShieldCheck, Globe, Star, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface AboutContent {
    banner: {
        title: string;
        subtitle: string;
    };
    story: {
        heading: string;
        leftText: string;
        rightText: string;
    };
    values: {
        title: string;
        description: string;
    }[];
    stats: {
        label: string;
        count: string;
    }[];
}

const DEFAULT_CONTENT: AboutContent = {
    banner: {
        title: "We plan your\nDream Destinations.!",
        subtitle: "Learn about Wegomap — your trusted travel partner since 2012."
    },
    story: {
        heading: "Wegomap is a one-stop travel solution to destinations around the world.",
        leftText: "We have a dedicated team of travel professionals who can cater to all your travel needs. Our team will be just one ring away from all your travel-related enquiries. We customise both Indian and International Tour packages within your budget. Our company maintains good relationship with Resorts, Hotels and Transportation team. The company is located near Cochin Airport and all the tour package operations are managed by our Kerala Team.",
        rightText: "We can offer you the best Kerala Honeymoon Packages and Kerala Family packages which include Munnar Hill station, Thekkady Wildlife, Aleppey Backwater and houseboat. We are highly dedicated to delivering you the best service in the industry. Suggestions and complaints will be treated with due respect & rectifications will be made.\n\nYou can contact us at any time — our 24/7 support team will be available to answer your queries."
    },
    values: [
        { title: "Customer First", description: "Your satisfaction is our ultimate priority during your journey." },
        { title: "Professionalism", description: "Highly managed logs and assistance for a smooth travel experience." },
        { title: "Innovation", description: "Constantly creating new ways to experience God's Own Country." }
    ],
    stats: [
        { label: "Happy Customers", count: "5,000+" },
        { label: "Miles Traveled", count: "10,000+" },
        { label: "Tour Packages", count: "100+" },
        { label: "Years Experience", count: "12+" }
    ]
};

export default function AboutSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<AboutContent>(DEFAULT_CONTENT);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const aboutContentOpt = json.data.find((opt: { key: string }) => opt.key === 'about_page_content');
                if (aboutContentOpt) {
                    try {
                        const savedContent = JSON.parse(aboutContentOpt.value);
                        setContent({ ...DEFAULT_CONTENT, ...savedContent });
                    } catch (e) {
                        console.error('Failed to parse about_page_content', e);
                    }
                }
            }
        } catch (err) {
            console.error('Failed to fetch settings', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/options/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    options: [
                        { key: 'about_page_content', value: JSON.stringify(content) }
                    ]
                })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('About page content updated successfully!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="admin-loading-screen">
            <div className="spinner"></div>
            <p className="loading-text">Loading about page configuration...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title admin-page-title--section">
                        <div className="admin-page-title-indicator"></div>
                        About Us
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages/69b2119212e7a77684ef09ff/edit" className="admin-btn admin-btn-secondary">
                        <Globe size={16} /> SEO Settings
                    </Link>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-12 px-8"
                    >
                        <Save size={18} className={saving ? 'animate-spin' : ''} />
                        {saving ? 'Saving...' : 'Publish Content'}
                    </button>
                </div>
            </div>

            <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 360px' }}>
                {/* Main Content Column */}
                <div className="space-y-8">
                    
                    {/* Hero Section */}
                    <div className="admin-form-card">
                        <h3 className="admin-form-section-title">
                            Hero Banner Content
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2">Main Headline</label>
                                <textarea 
                                    rows={2}
                                    value={content.banner.title}
                                    onChange={e => setContent({ ...content, banner: { ...content.banner, title: e.target.value } })}
                                    className="admin-form-input text-lg font-bold"
                                    placeholder="e.g. We plan your Dream Destinations"
                                />
                                <p className="text-[10px] text-slate-400 mt-2 font-medium italic">Tip: Use \n for a manual line break in the design.</p>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2">Banner Subtitle</label>
                                <textarea 
                                    rows={3}
                                    value={content.banner.subtitle}
                                    onChange={e => setContent({ ...content, banner: { ...content.banner, subtitle: e.target.value } })}
                                    className="admin-form-input"
                                    placeholder="Describe your company's core essence..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Storytelling Section */}
                    <div className="admin-form-card">
                        <h3 className="admin-form-section-title">
                            Our Story Narrative
                        </h3>

                        <div className="space-y-8">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2">Introductory Heading</label>
                                <input 
                                    type="text"
                                    value={content.story.heading}
                                    onChange={e => setContent({ ...content, story: { ...content.story, heading: e.target.value } })}
                                    className="admin-form-input font-bold"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="admin-form-group">
                                    <label className="admin-form-label mb-2">Column One (Top Narrative)</label>
                                    <textarea 
                                        rows={10}
                                        value={content.story.leftText}
                                        onChange={e => setContent({ ...content, story: { ...content.story, leftText: e.target.value } })}
                                        className="admin-form-input text-sm leading-relaxed"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label mb-2">Column Two (Bottom Details)</label>
                                    <textarea 
                                        rows={10}
                                        value={content.story.rightText}
                                        onChange={e => setContent({ ...content, story: { ...content.story, rightText: e.target.value } })}
                                        className="admin-form-input text-sm leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    
                    {/* Core Values */}
                    <div className="admin-form-card">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
                            Core Values
                        </h4>

                        <div className="admin-space-y-4">
                            {content.values.map((value, index) => (
                                <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-rose-500 uppercase">Value 0{index + 1}</span>
                                        <ShieldCheck size={14} className="text-slate-300" />
                                    </div>
                                    <input 
                                        type="text"
                                        value={value.title}
                                        onChange={e => {
                                            const newValues = [...content.values];
                                            newValues[index].title = e.target.value;
                                            setContent({ ...content, values: newValues });
                                        }}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-rose-500 transition-colors"
                                        placeholder="Title"
                                    />
                                    <textarea 
                                        rows={2}
                                        value={value.description}
                                        onChange={e => {
                                            const newValues = [...content.values];
                                            newValues[index].description = e.target.value;
                                            setContent({ ...content, values: newValues });
                                        }}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[10px] font-medium text-slate-500 outline-none focus:border-rose-500 transition-colors resize-none"
                                        placeholder="Description..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="admin-form-card">
                        <h4 className="text-[10px] mt-4 font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
                            Publicity Stats
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                            {content.stats.map((stat, index) => (
                                <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
                                    <input 
                                        type="text"
                                        value={stat.count}
                                        onChange={e => {
                                            const newStats = [...content.stats];
                                            newStats[index].count = e.target.value;
                                            setContent({ ...content, stats: newStats });
                                        }}
                                        className="w-full bg-transparent border-none p-0 text-base font-black text-slate-900 text-center outline-none tracking-tight"
                                    />
                                    <input 
                                        type="text"
                                        value={stat.label}
                                        onChange={e => {
                                            const newStats = [...content.stats];
                                            newStats[index].label = e.target.value;
                                            setContent({ ...content, stats: newStats });
                                        }}
                                        className="w-full bg-transparent border-none p-0 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
