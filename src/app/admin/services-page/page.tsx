"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, Layout, FileText, Briefcase, Globe, ShieldCheck, Zap, Info, Type, AlignLeft, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface ServicesPageContent {
    intro: {
        subtitle: string;
        title: string;
        highlightText: string;
        description: string;
    }
}

const DEFAULT_CONTENT: ServicesPageContent = {
    intro: {
        subtitle: "Comprehensive Solutions",
        title: "Your journey,",
        highlightText: "our expertise.",
        description: "WEGOMAP offers comprehensive solutions for all your travel needs. From booking your initial transport to finding the perfect accommodation, our dedicated team manages everything so you can focus on building beautiful memories."
    }
};

export default function ServicesSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<ServicesPageContent>(DEFAULT_CONTENT);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const servicesContentOpt = json.data.find((opt: { key: string }) => opt.key === 'services_page_content');
                if (servicesContentOpt) {
                    try {
                        const savedContent = JSON.parse(servicesContentOpt.value);
                        setContent({ ...DEFAULT_CONTENT, ...savedContent });
                    } catch (e) {
                        console.error('Failed to parse services_page_content', e);
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
                        { key: 'services_page_content', value: JSON.stringify(content) }
                    ]
                })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('Services page content updated successfully!');
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
            <p className="loading-text">Loading services page configuration...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title admin-page-title--section">
                        <div className="admin-page-title-indicator"></div>
                        Services Page <span className="text-black">Configuration</span>
                    </h2>
                    <p className="admin-page-subtitle text-slate-500 font-bold">Configure the welcome text and headings for the services page</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/admin/services" className="admin-btn admin-btn-secondary">
                        <Briefcase size={16} /> Manage All Services
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

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Main Content Area */}
                <div className="admin-form-card">
                    <h3 className="admin-form-section-title">
                        <div className="admin-section-icon admin-section-icon--sm admin-section-icon--amber"></div>
                        <span className="text-black font-black">Main Page Headers</span>
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2 flex items-center gap-2">
                                <Info size={14} className="text-blue-600" /> <span className="text-black font-black">Section Subtitle</span>
                            </label>
                            <input 
                                type="text"
                                value={content.intro.subtitle}
                                onChange={e => setContent({ ...content, intro: { ...content.intro, subtitle: e.target.value } })}
                                className="admin-form-input font-black text-black"
                                placeholder="e.g. Comprehensive Solutions"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Type size={14} className="text-slate-400" /> <span className="text-black font-black">Title (First Part)</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.intro.title}
                                    onChange={e => setContent({ ...content, intro: { ...content.intro, title: e.target.value } })}
                                    className="admin-form-input font-black text-black"
                                    placeholder="e.g. Your journey,"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2 flex items-center gap-2">
                                    <Sparkles size={14} className="text-blue-600" /> <span className="text-black font-black">Title (Highlight Part)</span>
                                </label>
                                <input 
                                    type="text"
                                    value={content.intro.highlightText}
                                    onChange={e => setContent({ ...content, intro: { ...content.intro, highlightText: e.target.value } })}
                                    className="admin-form-input font-black text-blue-600 border-orange-100 bg-orange-50/10"
                                    placeholder="e.g. our expertise."
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2 flex items-center gap-2">
                                <AlignLeft size={14} className="text-slate-400" /> <span className="text-black font-black">Main Description</span>
                            </label>
                            <textarea 
                                rows={5}
                                value={content.intro.description}
                                onChange={e => setContent({ ...content, intro: { ...content.intro, description: e.target.value } })}
                                className="admin-form-input font-bold text-black leading-relaxed"
                                placeholder="Describe your services scope..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
