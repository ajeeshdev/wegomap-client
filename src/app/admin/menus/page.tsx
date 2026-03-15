"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Plus, Trash2, Link as LinkIcon, Sparkles, Layers, List,
    Home, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar, 
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const IconMap: Record<string, any> = {
    Home, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar, 
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact
};

const DynamicIcon = ({ name, size = 18, className = "" }: { name: string, size?: number, className?: string }) => {
    const IconComponent = IconMap[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} />;
};

export default function MenusPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [sidebarLinks, setSidebarLinks] = useState<any[]>([]);
    const [stickyLinks, setStickyLinks] = useState<any[]>([]);
    const [footerLinks, setFooterLinks] = useState<any[]>([]);
    const [stickySettings, setStickySettings] = useState({ brandTitle: 'Your world', brandSubtitle: 'Your way' });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const slOpt = json.data.find((o: any) => o.key === 'sidebar_links');
                if (slOpt) try { setSidebarLinks(JSON.parse(slOpt.value)); } catch (e) { setSidebarLinks([]); }

                const styOpt = json.data.find((o: any) => o.key === 'sticky_links');
                if (styOpt) try { setStickyLinks(JSON.parse(styOpt.value)); } catch (e) { setStickyLinks([]); }

                const footOpt = json.data.find((o: any) => o.key === 'footer_links');
                if (footOpt) try { setFooterLinks(JSON.parse(footOpt.value)); } catch (e) { setFooterLinks([]); }

                const stySetOpt = json.data.find((o: any) => o.key === 'sticky_settings');
                if (stySetOpt) try { setStickySettings(JSON.parse(stySetOpt.value)); } catch (e) { }
            }
        } catch (err) {
            console.error('Failed to fetch menus', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const allOptions = [
                { key: 'sidebar_links', value: JSON.stringify(sidebarLinks) },
                { key: 'sticky_links', value: JSON.stringify(stickyLinks) },
                { key: 'footer_links', value: JSON.stringify(footerLinks) },
                { key: 'sticky_settings', value: JSON.stringify(stickySettings) }
            ];

            const res = await fetch(`${API_URL}/options/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ options: allOptions })
            });
            
            const json = await res.json();
            if (json.success) {
                toast.success('Menus updated successfully!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to save menus.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading navigation menus...</p>
        </div>
    );

    return (
        <div className="pb-24 space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator bg-indigo-600"></div>
                        Navigation Menus
                    </h2>
                    <p className="admin-page-subtitle mt-1">Configure your website's header, mobile hamburger and footer navigation</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-11 px-8"
                    >
                        <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save Menus'}
                    </button>
                </div>
            </div>

            <div className="">
                <div className="space-y-10">
                    
                    {/* Mobile Hamburger Menu Section */}
                    <div className="admin-form-card">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-indigo-500"></div>
                                    Hamburger Menu (Mobile)
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium ml-4 mt-1">Links appearing in the mobile sidebar drawer</p>
                            </div>
                            <button 
                                onClick={() => setSidebarLinks([...sidebarLinks, { name: '', href: '', icon: 'ChevronRight' }])}
                                className="admin-btn-small bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2.5"
                            >
                                <Plus size={14} strokeWidth={2.5} /> Add Menu Item
                            </button>
                        </div>

                        <div className="space-y-3">
                            {sidebarLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col md:flex-row items-end gap-x-4 gap-y-6 p-6 bg-slate-50/50  hover:border-indigo-200 hover:bg-white transition-all duration-300 group">
                                    <div className="w-full md:w-1/4 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Label</label>
                                        <input 
                                            type="text"
                                            value={item.name}
                                            onChange={e => {
                                                const newNav = [...sidebarLinks];
                                                newNav[idx].name = e.target.value;
                                                setSidebarLinks(newNav);
                                            }}
                                            placeholder="e.g. About Us"
                                            className="admin-form-input !bg-white !h-11 !text-sm"
                                        />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target URL</label>
                                        <div className="relative">
                                            <LinkIcon size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...sidebarLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setSidebarLinks(newNav);
                                                }}
                                                placeholder="/about"
                                                className="admin-form-input !bg-white !pl-9 !h-11 !text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Icon</label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-indigo-500 shadow-sm group-hover:border-indigo-300 transition-colors">
                                                <DynamicIcon name={item.icon} size={18} />
                                            </div>
                                            <select 
                                                value={item.icon || ''}
                                                onChange={e => {
                                                    const newNav = [...sidebarLinks];
                                                    newNav[idx].icon = e.target.value;
                                                    setSidebarLinks(newNav);
                                                }}
                                                className="admin-form-input !bg-white !h-11 !text-sm flex-1"
                                            >
                                                <option value="">None</option>
                                                <option value="Home">Home</option>
                                                <option value="Info">Info</option>
                                                <option value="Users">Users</option>
                                                <option value="Phone">Phone</option>
                                                <option value="Mail">Mail</option>
                                                <option value="MapPin">Location</option>
                                                <option value="Heart">Heart</option>
                                                <option value="Package">Package</option>
                                                <option value="Calendar">Calendar</option>
                                                <option value="Ship">Cruises</option>
                                                <option value="Globe">Globe</option>
                                                <option value="Zap">Zap</option>
                                                <option value="MessageSquare">Blogs</option>
                                                <option value="HelpCircle">FAQ</option>
                                                <option value="Contact">Contact</option>
                                                <option value="Star">Star</option>
                                                <option value="Compass">Trending</option>
                                                <option value="FileText">Document/Blog</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => setSidebarLinks(sidebarLinks.filter((_, i) => i !== idx))}
                                            className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {sidebarLinks.length === 0 && (
                                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl opacity-60">
                                    <List size={32} className="text-slate-300 mb-3" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">No Hamburger items defined.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary Sticky Nav Section */}
                    <div className="admin-form-card">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-rose-500"></div>
                                    Secondary Sticky Nav (Desktop Home)
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium ml-4 mt-1">Shortcuts appearing below the hero on scroll</p>
                            </div>
                            
                            <div className="flex flex-wrap items-end gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                                        <Sparkles size={11} strokeWidth={2.5} className="text-rose-400" /> Brand Main Title
                                    </label>
                                    <input 
                                        className="admin-form-input !h-11 !py-1 !text-sm w-48 !bg-white shadow-sm focus:border-rose-300"
                                        value={stickySettings.brandTitle}
                                        onChange={e => setStickySettings({...stickySettings, brandTitle: e.target.value})}
                                        placeholder="e.g. Your world"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Brand Subtext</label>
                                    <input 
                                        className="admin-form-input !h-11 !py-1 !text-sm w-48 !bg-white shadow-sm focus:border-rose-300"
                                        value={stickySettings.brandSubtitle}
                                        onChange={e => setStickySettings({...stickySettings, brandSubtitle: e.target.value})}
                                        placeholder="e.g. Your way"
                                    />
                                </div>
                                <div className="border-l border-slate-200 pl-6 h-11 flex items-center">
                                    <button 
                                        onClick={() => setStickyLinks([...stickyLinks, { name: '', href: '', icon: 'Compass' }])}
                                        className="admin-btn-small bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white h-11 px-6 shadow-sm"
                                    >
                                        <Plus size={16} strokeWidth={2.5} /> Add Shortcut Link
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {stickyLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col md:flex-row items-end gap-x-4 gap-y-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-white transition-all duration-300 group">
                                    <div className="w-full md:w-1/4 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Label</label>
                                        <input 
                                            type="text"
                                            value={item.name}
                                            onChange={e => {
                                                const newNav = [...stickyLinks];
                                                newNav[idx].name = e.target.value;
                                                setStickyLinks(newNav);
                                            }}
                                            placeholder="e.g. Offers"
                                            className="admin-form-input !bg-white !h-11 !text-sm"
                                        />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target URL</label>
                                        <div className="relative">
                                            <LinkIcon size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...stickyLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setStickyLinks(newNav);
                                                }}
                                                placeholder="/offers"
                                                className="admin-form-input !bg-white !pl-9 !h-11 !text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Icon</label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-rose-500 shadow-sm group-hover:border-rose-300 transition-colors">
                                                <DynamicIcon name={item.icon} size={18} />
                                            </div>
                                            <select 
                                                value={item.icon || ''}
                                                onChange={e => {
                                                    const newNav = [...stickyLinks];
                                                    newNav[idx].icon = e.target.value;
                                                    setStickyLinks(newNav);
                                                }}
                                                className="admin-form-input !bg-white !h-11 !text-sm flex-1"
                                            >
                                                <option value="">None</option>
                                                <option value="Home">Home</option>
                                                <option value="Info">Info</option>
                                                <option value="Users">Users</option>
                                                <option value="Phone">Phone</option>
                                                <option value="Mail">Mail</option>
                                                <option value="MapPin">Location</option>
                                                <option value="Heart">Heart</option>
                                                <option value="Package">Package</option>
                                                <option value="Calendar">Calendar</option>
                                                <option value="Ship">Cruises</option>
                                                <option value="Globe">Globe</option>
                                                <option value="Zap">Zap</option>
                                                <option value="MessageSquare">Blogs</option>
                                                <option value="HelpCircle">FAQ</option>
                                                <option value="Star">Star</option>
                                                <option value="Compass">Compass</option>
                                                <option value="FileText">Document/Blog</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => setStickyLinks(stickyLinks.filter((_, i) => i !== idx))}
                                            className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {stickyLinks.length === 0 && (
                                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl opacity-60">
                                    <List size={32} className="text-slate-300 mb-3" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">No Sticky items defined.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Menu Section */}
                    <div className="admin-form-card">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-emerald-500"></div>
                                    Footer Menu
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium ml-4 mt-1">Links appearing in the website footer</p>
                            </div>
                            <button 
                                onClick={() => setFooterLinks([...footerLinks, { name: '', href: '' }])}
                                className="admin-btn-small bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2.5"
                            >
                                <Plus size={14} strokeWidth={2.5} /> Add Footer Link
                            </button>
                        </div>

                        <div className="space-y-3">
                            {footerLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col md:flex-row items-end gap-x-4 gap-y-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-white transition-all duration-300 group">
                                    <div className="w-full md:w-1/3 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Label</label>
                                        <input 
                                            type="text"
                                            value={item.name}
                                            onChange={e => {
                                                const newNav = [...footerLinks];
                                                newNav[idx].name = e.target.value;
                                                setFooterLinks(newNav);
                                            }}
                                            placeholder="e.g. Terms & Conditions"
                                            className="admin-form-input !bg-white !h-11 !text-sm"
                                        />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-2.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target URL</label>
                                        <div className="relative">
                                            <LinkIcon size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...footerLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setFooterLinks(newNav);
                                                }}
                                                placeholder="/terms"
                                                className="admin-form-input !bg-white !pl-9 !h-11 !text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => setFooterLinks(footerLinks.filter((_, i) => i !== idx))}
                                            className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {footerLinks.length === 0 && (
                                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl opacity-60">
                                    <List size={32} className="text-slate-300 mb-3" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">No Footer items defined.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Aesthetic Tip */}
                    <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-indigo-900 font-bold mb-0.5 mt-0.5">Pro Tip: Streamlined Navigation</p>
                            <p className="text-[12px] text-indigo-700/80 leading-relaxed italic">
                                Keep labels short and descriptive. Visual icons help users scan navigation faster. 
                                The <strong>Secondary Sticky Nav</strong> is specifically designed to drive engagement for high-traffic pages like Blogs, Trending, or Contact on Desktop.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
