"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, Info, Sparkles, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';

interface BlogsPageContent {
    banner: {
        title: string;
        subtitle: string;
        preTitle: string;
        image: string;
    };
}

const DEFAULT_CONTENT: BlogsPageContent = {
    banner: {
        title: "Travel Blogs",
        subtitle: "Insider tips, destination guides, and travel stories to inspire your next journey.",
        preTitle: "Insider Stories",
        image: ""
    }
};

export default function BlogsSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<BlogsPageContent>(DEFAULT_CONTENT);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const opt = json.data.find((o: { key: string }) => o.key === 'blogs_page_settings');
                if (opt) {
                    try {
                        const savedContent = JSON.parse(opt.value);
                        setContent({
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
                        { key: 'blogs_page_settings', value: JSON.stringify(content) }
                    ]
                })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('Blogs page settings updated successfully!');
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
        <div className="space-y-10 animate-in fade-in duration-500 font-sans">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title admin-page-title--section">
                        <div className="admin-page-title-indicator"></div>
                        Blogs Page <span className="text-black">Configuration</span>
                    </h2>
                    <p className="admin-page-subtitle text-slate-500 font-bold">Manage the hero banner and header details for the travel blogs section</p>
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

            <div className="max-w-5xl mx-auto space-y-8">
                <div className="admin-form-card !p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                             <Sparkles size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Main Page Banner</h3>
                            <p className="text-xs text-slate-400 font-bold">Hero section details for /blogs</p>
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
                                    placeholder="Insider Stories"
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
                                    placeholder="Travel Blogs"
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
                                    placeholder="Insider tips and guides..."
                                />
                            </div>
                        </div>
                        <div>
                             <label className="admin-form-label mb-2 flex items-center gap-2">
                                     <span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Background Image</span>
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
            </div>
        </div>
    );
}
