"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, Calendar, Sparkles, Type, AlignLeft, PartyPopper, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';

interface EventsConfiguration {
    corporate: {
        subtitle: string;
        title: string;
        description1: string;
        description2: string;
        statLabel: string;
        statCount: string;
        introImage: string;
    };
    special: {
        subtitle: string;
        title: string;
        description: string;
    };
    banner: {
        title: string;
        subtitle: string;
        preTitle: string;
        image: string;
    };
}

const DEFAULT_CONTENT: EventsConfiguration = {
    corporate: {
        subtitle: "Event Specialists",
        title: "PREMIUM EVENT MANAGEMENT IN KERALA.",
        description1: "At WEGOMAP, we redefine what it means to host an extraordinary gathering. Whether you're orchestrating a flagship corporate summit in Kochi or a milestone cultural celebration, our event management team blends creative vision with flawless technical execution.",
        description2: "From high-impact venue selection and advanced staging to seamless guest logistics and digital engagement, we manage every layer of the experience. We don't just plan events; we create lasting impressions.",
        statLabel: "Venues Partnered",
        statCount: "100+",
        introImage: ""
    },
    special: {
        subtitle: "Curative Calendar",
        title: "DISCOVER OUR CURATED CALENDAR.",
        description: "Explore our exclusive calendar of signature activities and seasonal events. From luxury houseboat retreats to cultural immersive experiences, we curate every detail to ensure your special moments are truly unforgettable."
    },
    banner: {
        title: "Events & Experiences",
        subtitle: "Crafting moments that matter. From corporate excellence to cultural celebrations.",
        preTitle: "Curated Events",
        image: ""
    }
};

export default function EventsSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<EventsConfiguration>(DEFAULT_CONTENT);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const opt = json.data.find((o: { key: string }) => o.key === 'events_page_settings');
                if (opt) {
                    try {
                        const savedContent = JSON.parse(opt.value);
                        setContent({
                            corporate: { ...DEFAULT_CONTENT.corporate, ...savedContent.corporate },
                            special: { ...DEFAULT_CONTENT.special, ...savedContent.special },
                            banner: { ...DEFAULT_CONTENT.banner, ...savedContent.banner }
                        });
                    } catch (e) {
                        console.error('Failed to parse settings', e);
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
                        { key: 'events_page_settings', value: JSON.stringify(content) }
                    ]
                })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('Events page settings updated successfully!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="admin-loading-screen h-[400px] flex items-center justify-center">
            <div className="spinner"></div>
            <p className="ml-3 font-bold text-black">Loading page settings...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title admin-page-title--section">
                        <div className="admin-page-title-indicator"></div>
                        Events Page Configuration
                    </h2>
                    <p className="admin-page-subtitle text-slate-500 font-bold">Manage landing text and headers for Events & Special Events</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-12 px-8 !rounded-xl"
                    >
                        <Save size={18} className={saving ? 'animate-spin mr-2 mb-1' : 'mr-2 mb-1'} />
                        {saving ? 'Saving...' : 'Publish Changes'}
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
                {/* 0. Page Banner Information */}
                <div className="admin-form-card !p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                             <Sparkles size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Main Page Banner</h3>
                            <p className="text-xs text-slate-400 font-bold">Hero section details for /events</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                     <span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Pre-Title</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.banner?.preTitle}
                                    onChange={e => setContent({ ...content, banner: { ...content.banner, preTitle: e.target.value } })}
                                    className="admin-form-input font-bold text-black"
                                    placeholder="Curated Events"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                     <span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Title</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.banner?.title}
                                    onChange={e => setContent({ ...content, banner: { ...content.banner, title: e.target.value } })}
                                    className="admin-form-input font-bold text-black"
                                    placeholder="Events & Experiences"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                     <span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Subtitle</span>
                                </label>
                                <textarea 
                                    rows={2}
                                    value={content.banner?.subtitle}
                                    onChange={e => setContent({ ...content, banner: { ...content.banner, subtitle: e.target.value } })}
                                    className="admin-form-input font-bold text-black"
                                    placeholder="Crafting moments that matter..."
                                />
                            </div>
                        </div>
                        <div>
                             <label className="admin-form-label mb-2 flex items-center gap-2">
                                     <span className="text-black font-black text-[11px] uppercase tracking-wider">Background Image</span>
                            </label>
                            <ImageUpload 
                                value={content.banner?.image}
                                onChange={url => setContent({ ...content, banner: { ...content.banner, image: url } })}
                                label="Banner Image"
                                dimensions="1920 x 600"
                            />
                        </div>
                    </div>
                </div>

                {/* 1. Corporate Events Panel */}
                <div className="admin-form-card !p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-blue-600">
                             <Calendar size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Corporate Events Intro</h3>
                            <p className="text-xs text-slate-400 font-bold">The header section on /events</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Type size={14} className="text-blue-600" /> <span className="text-black font-black">Section Subtitle</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.corporate.subtitle}
                                    onChange={e => setContent({ ...content, corporate: { ...content.corporate, subtitle: e.target.value } })}
                                    className="admin-form-input font-black text-black"
                                    placeholder="e.g. Event Specialists"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <AlignLeft size={14} className="text-slate-400" /> <span className="text-black font-black">Main Title</span>
                                </label>
                                <textarea 
                                    rows={2}
                                    value={content.corporate.title}
                                    onChange={e => setContent({ ...content, corporate: { ...content.corporate, title: e.target.value } })}
                                    className="admin-form-input font-black text-black leading-tight"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="admin-form-group">
                                    <label className="admin-form-label mb-2 flex items-center gap-2">
                                        <Sparkles size={14} className="text-blue-600" /> <span className="text-black font-black">Stat Label</span>
                                    </label>
                                    <input 
                                        type="text"
                                        value={content.corporate.statLabel}
                                        onChange={e => setContent({ ...content, corporate: { ...content.corporate, statLabel: e.target.value } })}
                                        className="admin-form-input font-bold text-black"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label mb-2 flex items-center gap-2 text-black font-bold">
                                        Stat Count
                                    </label>
                                    <input 
                                        type="text"
                                        value={content.corporate.statCount}
                                        onChange={e => setContent({ ...content, corporate: { ...content.corporate, statCount: e.target.value } })}
                                        className="admin-form-input font-bold text-black"
                                    />
                                </div>
                            </div>

                            {/* Intro Section Image */}
                            <div className="admin-form-group pt-2">
                                <label className="admin-form-label mb-2">
                                    <span className="text-black font-black text-[11px] uppercase tracking-wider">Intro Section Image</span>
                                    <span className="block text-[10px] text-slate-400 font-medium mt-0.5">The photo shown on the right side of the intro section</span>
                                </label>
                                <ImageUpload
                                    value={content.corporate.introImage}
                                    onChange={url => setContent({ ...content, corporate: { ...content.corporate, introImage: url } })}
                                    label="Intro Image"
                                    dimensions="800 x 600"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Info size={14} className="text-slate-400" /> <span className="text-black font-black">Description Paragraph 1</span>
                                </label>
                                <textarea 
                                    rows={4}
                                    value={content.corporate.description1}
                                    onChange={e => setContent({ ...content, corporate: { ...content.corporate, description1: e.target.value } })}
                                    className="admin-form-input font-medium text-black leading-relaxed"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Info size={14} className="text-slate-400" /> <span className="text-black font-black">Description Paragraph 2</span>
                                </label>
                                <textarea 
                                    rows={4}
                                    value={content.corporate.description2}
                                    onChange={e => setContent({ ...content, corporate: { ...content.corporate, description2: e.target.value } })}
                                    className="admin-form-input font-medium text-black leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Special Events Panel */}
                <div className="admin-form-card !p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-blue-600">
                             <PartyPopper size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Special Events Intro</h3>
                            <p className="text-xs text-slate-400 font-bold">The header section on /special-events</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Type size={14} className="text-blue-600" /> <span className="text-black font-black">Subtitle</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.special.subtitle}
                                    onChange={e => setContent({ ...content, special: { ...content.special, subtitle: e.target.value } })}
                                    className="admin-form-input font-black text-black"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <AlignLeft size={14} className="text-slate-400" /> <span className="text-black font-black">Main Title</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.special.title}
                                    onChange={e => setContent({ ...content, special: { ...content.special, title: e.target.value } })}
                                    className="admin-form-input font-black text-black"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2 flex items-center gap-2">
                                <AlignLeft size={14} className="text-slate-400" /> <span className="text-black font-black">Description</span>
                            </label>
                            <textarea 
                                rows={3}
                                value={content.special.description}
                                onChange={e => setContent({ ...content, special: { ...content.special, description: e.target.value } })}
                                className="admin-form-input font-medium text-black leading-relaxed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
