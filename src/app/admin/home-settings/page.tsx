"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, ShieldCheck, Layout, Zap, Globe, MapPin, Users, MessageSquare, Anchor, FileText, Sparkles, Compass, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface HomeSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    enabled: boolean;
}

const DEFAULT_SECTIONS: HomeSection[] = [
    { id: 'kerala', title: 'Kerala Tour Operator', subtitle: 'Explore Our Best', description: "Experience the beauty of God's Own Country with Kerala's best tour operator. As a trusted Kerala travel agency, we specialize in crafting unforgettable journeys.", enabled: true },
    { id: 'offers', title: 'First Minute Offers', subtitle: 'Limited Time Offers', description: 'Exclusive early bird discounts on upcoming travel seasons.', enabled: true },
    { id: 'domestic', title: 'Domestic Packages', subtitle: 'Incredible India', description: 'Explore the diverse landscapes and cultures across India.', enabled: true },
    { id: 'international', title: 'International Packages', subtitle: 'Explore The World', description: 'Curated international destinations for your dream vacation.', enabled: true },
    { id: 'kochi', title: 'Kochi Based Travel Agency', subtitle: 'Local Expertise', description: "As a premier travel agency in Kerala, we craft personalized tours that immerse you in the cultural and natural wonders of the region.", enabled: false },
    { id: 'corporate', title: 'Redefining Corporate Experiences', subtitle: 'MICE & Events', description: 'WEGOMAP delivers world-class event management. We curate bespoke experiences that define your business legacy.', enabled: true },
    { id: 'special_events', title: 'Special Events & Activities', subtitle: 'Experience More', description: 'Discover unique events, festivals, and activities curated special for you.', enabled: true },
    { id: 'testimonials', title: 'What our clients say', subtitle: 'Review', description: '', enabled: true },
    { id: 'seo', title: 'Best Tour Operator in Kerala', subtitle: 'Kerala Specialist', description: "Experience the magic of God's Own Country with WEGOMAP, your reliable Kerala travel partner.", enabled: true }
];

export default function HomeSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sections, setSections] = useState<HomeSection[]>(DEFAULT_SECTIONS);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const homeSectionsOpt = json.data.find((opt: { key: string }) => opt.key === 'home_sections');
                if (homeSectionsOpt) {
                    try {
                        const savedSections = JSON.parse(homeSectionsOpt.value);
                        const merged = DEFAULT_SECTIONS.map(def => {
                            const saved = savedSections.find((s: HomeSection) => s.id === def.id);
                            return saved ? { ...def, ...saved } : def;
                        });
                        setSections(merged);
                    } catch (e) {
                        console.error('Failed to parse home_sections', e);
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
                        { key: 'home_sections', value: JSON.stringify(sections) }
                    ]
                })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('Home sections updated successfully!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    const toggleSection = (id: string) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    const updateSection = (id: string, field: keyof HomeSection, value: any) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const sectionIcons: Record<string, any> = {
        kerala: <MapPin size={22} />,
        offers: <Zap size={22} />,
        domestic: <Compass size={22} />,
        international: <Globe size={22} />,
        kochi: <Anchor size={22} />,
        corporate: <Users size={22} />,
        special_events: <Sparkles size={22} />,
        testimonials: <MessageSquare size={22} />,
        seo: <FileText size={22} />
    };

    const iconColors: Record<string, string> = {
        kerala: "#1673B8",
        offers: "#f59e0b",
        domestic: "#3b82f6",
        international: "#6366f1",
        kochi: "#06b6d4",
        corporate: "#f43f5e",
        special_events: "#a855f7",
        testimonials: "#f97316",
        seo: "#64748b"
    };

    if (loading) return (
        <div className="admin-loading-screen">
            <div className="spinner"></div>
            <p className="loading-text">Syncing home configuration...</p>
        </div>
    );

    return (
        <div className="home-settings-wrap">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator"></div>
                        Home Section Performance
                    </h2>
                    <p className="admin-page-subtitle">Configure global visibility and narrative content for homepage modules</p>
                </div>
                <div className="header-actions">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary"
                        style={{ height: '50px', padding: '0 30px' }}
                    >
                        <Save size={18} /> {saving ? 'Syncing...' : 'Publish Update'}
                    </button>
                </div>
            </div>

            <div className="home-sections-grid">
                {sections.map((section) => (
                    <div key={section.id} className={`home-section-card ${!section.enabled ? 'is-disabled' : ''}`}>
                        <div className="section-card-inner">
                            <div className="section-card-sidebar">
                                <div className="module-header">
                                    <div className="module-icon" style={{ color: section.enabled ? iconColors[section.id] : '#94a3b8' }}>
                                        {sectionIcons[section.id]}
                                    </div>
                                    <div className="module-info">
                                        <h3>{section.id}</h3>
                                    </div>
                                </div>

                                <div className={`module-status-box ${section.enabled ? 'is-active' : ''}`}>
                                    <div className="module-status-header">
                                        <div className="status-indicator">
                                            <div className="status-dot"></div>
                                            <span className="status-text">{section.enabled ? 'Live' : 'Hidden'}</span>
                                        </div>
                                        <label className="admin-toggle">
                                            <input 
                                                type="checkbox" 
                                                checked={section.enabled}
                                                onChange={() => toggleSection(section.id)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p className="status-desc">
                                        {section.enabled ? 'Section is actively being rendered.' : 'Section is dormant.'}
                                    </p>
                                </div>
                            </div>

                            <div className="section-card-main">
                                <div className="form-group-row">
                                    <div className="admin-form-group">
                                        <label className="premium-label">Marketing Title</label>
                                        <input 
                                            type="text" 
                                            value={section.title}
                                            onChange={e => updateSection(section.id, 'title', e.target.value)}
                                            className="premium-input"
                                            placeholder="Enter display heading..."
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="premium-label">Section Subtitle / Label</label>
                                        <input 
                                            type="text" 
                                            value={section.subtitle}
                                            onChange={e => updateSection(section.id, 'subtitle', e.target.value)}
                                            className="premium-input"
                                            placeholder="Small label..."
                                            style={{ textTransform: section.id === 'kerala' ? 'none' : 'uppercase' }}
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label className="premium-label">Narrative Description</label>
                                    <textarea 
                                        rows={4}
                                        value={section.description}
                                        onChange={e => updateSection(section.id, 'description', e.target.value)}
                                        className="premium-textarea"
                                        placeholder="Craft a compelling story..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="floating-action-footer">
                <button onClick={handleSave} disabled={saving} className="deploy-btn">
                    <div className="btn-icon"><Save size={20} /></div>
                    <div className="btn-text-wrap">
                        <p className="btn-small-label">Live Update</p>
                        <p className="btn-main-label">{saving ? 'SYNCING...' : 'DEPLOY CONFIGURATION'}</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
