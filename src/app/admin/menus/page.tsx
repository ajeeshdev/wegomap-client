"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Plus, Trash2, Link as LinkIcon, Sparkles, Layers, List,
    Home, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar, 
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact,
    ChevronUp, ChevronDown
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

    const handleMove = (list: any[], setList: any, index: number, direction: 'up' | 'down') => {
        const newList = [...list];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newList.length) return;
        
        const temp = newList[index];
        newList[index] = newList[targetIndex];
        newList[targetIndex] = temp;
        setList(newList);
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
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading navigation menus...</p>
        </div>
    );

    return (
        <div className="pb-24 space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator bg-blue-600"></div>
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
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-blue-600"></div>
                                    Hamburger Menu (Mobile)
                                </h3>
                            </div>
                            <button 
                                onClick={() => setSidebarLinks([...sidebarLinks, { name: '', href: '', icon: 'ChevronRight' }])}
                                className="admin-btn-small bg-slate-900 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors d-flex align-items-center"
                            >
                                <Plus size={14} /> Add Item
                            </button>
                        </div>

                        <div className="space-y-1">
                            {sidebarLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-transparent hover:bg-white hover:border-slate-100 rounded-lg group">
                                    <div className="flex flex-col gap-1 pr-2 border-r border-slate-200">
                                        <button 
                                            onClick={() => handleMove(sidebarLinks, setSidebarLinks, idx, 'up')}
                                            className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                                            disabled={idx === 0}
                                        >
                                            <ChevronUp size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleMove(sidebarLinks, setSidebarLinks, idx, 'down')}
                                            className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30"
                                            disabled={idx === sidebarLinks.length - 1}
                                        >
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-12 gap-4">
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Label</label>
                                            <input 
                                                type="text"
                                                value={item.name}
                                                onChange={e => {
                                                    const newNav = [...sidebarLinks];
                                                    newNav[idx].name = e.target.value;
                                                    setSidebarLinks(newNav);
                                                }}
                                                placeholder="About Us"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target URL</label>
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...sidebarLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setSidebarLinks(newNav);
                                                }}
                                                placeholder="/about"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Icon</label>
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded border border-slate-200 shrink-0">
                                                    <DynamicIcon name={item.icon} size={15} />
                                                </div>
                                                <select 
                                                    value={item.icon || ''}
                                                    onChange={e => {
                                                        const newNav = [...sidebarLinks];
                                                        newNav[idx].icon = e.target.value;
                                                        setSidebarLinks(newNav);
                                                    }}
                                                    className="admin-form-input !h-9 !text-[11px] !bg-white border-slate-200 flex-1 px-1"
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
                                    </div>
                                    <button 
                                        onClick={() => setSidebarLinks(sidebarLinks.filter((_, i) => i !== idx))}
                                        className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
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
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-emerald-500"></div>
                                    Secondary Sticky Nav (Desktop Home)
                                </h3>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-slate-50 p-2 px-3 rounded-lg border border-slate-200">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Brand Title</label>
                                        <input 
                                            className="admin-form-input !h-8 !text-[11px] w-32 !bg-white"
                                            value={stickySettings.brandTitle}
                                            onChange={e => setStickySettings({...stickySettings, brandTitle: e.target.value})}
                                            placeholder="Your world"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Brand Subtext</label>
                                        <input 
                                            className="admin-form-input !h-8 !text-[11px] w-32 !bg-white"
                                            value={stickySettings.brandSubtitle}
                                            onChange={e => setStickySettings({...stickySettings, brandSubtitle: e.target.value})}
                                            placeholder="Your way"
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setStickyLinks([...stickyLinks, { name: '', href: '', icon: 'Compass' }])}
                                    className="admin-btn-small bg-slate-900 text-white hover:bg-emerald-600 h-9 px-4 rounded-md"
                                >
                                    <Plus size={14} /> Add Link
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            {stickyLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-transparent hover:bg-white hover:border-slate-100 rounded-lg group">
                                    <div className="flex flex-col gap-1 pr-2 border-r border-slate-200">
                                        <button 
                                            onClick={() => handleMove(stickyLinks, setStickyLinks, idx, 'up')}
                                            className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                                            disabled={idx === 0}
                                        >
                                            <ChevronUp size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleMove(stickyLinks, setStickyLinks, idx, 'down')}
                                            className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                                            disabled={idx === stickyLinks.length - 1}
                                        >
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-12 gap-4">
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Label</label>
                                            <input 
                                                type="text"
                                                value={item.name}
                                                onChange={e => {
                                                    const newNav = [...stickyLinks];
                                                    newNav[idx].name = e.target.value;
                                                    setStickyLinks(newNav);
                                                }}
                                                placeholder="e.g. Offers"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target URL</label>
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...stickyLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setStickyLinks(newNav);
                                                }}
                                                placeholder="/offers"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                        <div className="col-span-4">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Icon</label>
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded shrink-0">
                                                    <DynamicIcon name={item.icon} size={15} />
                                                </div>
                                                <select 
                                                    value={item.icon || ''}
                                                    onChange={e => {
                                                        const newNav = [...stickyLinks];
                                                        newNav[idx].icon = e.target.value;
                                                        setStickyLinks(newNav);
                                                    }}
                                                    className="admin-form-input !h-9 !text-[11px] !bg-white border-slate-200 flex-1 px-1"
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
                                    </div>
                                    <button 
                                        onClick={() => setStickyLinks(stickyLinks.filter((_, i) => i !== idx))}
                                        className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
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
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="admin-form-section-title">
                                    <div className="admin-page-title-indicator bg-emerald-500"></div>
                                    Footer Menu
                                </h3>
                            </div>
                            <button 
                                onClick={() => setFooterLinks([...footerLinks, { name: '', href: '' }])}
                                className="admin-btn-small bg-slate-900 text-white hover:bg-emerald-600 px-4 py-2 rounded-md"
                            >
                                <Plus size={14} /> Add Link
                            </button>
                        </div>

                        <div className="space-y-1">
                            {footerLinks.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-transparent hover:bg-white hover:border-slate-100 rounded-lg group">
                                    <div className="flex flex-col gap-1 pr-2 border-r border-slate-200">
                                        <button 
                                            onClick={() => handleMove(footerLinks, setFooterLinks, idx, 'up')}
                                            className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                                            disabled={idx === 0}
                                        >
                                            <ChevronUp size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleMove(footerLinks, setFooterLinks, idx, 'down')}
                                            className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                                            disabled={idx === footerLinks.length - 1}
                                        >
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Label</label>
                                            <input 
                                                type="text"
                                                value={item.name}
                                                onChange={e => {
                                                    const newNav = [...footerLinks];
                                                    newNav[idx].name = e.target.value;
                                                    setFooterLinks(newNav);
                                                }}
                                                placeholder="Terms & Conditions"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target URL</label>
                                            <input 
                                                type="text"
                                                value={item.href}
                                                onChange={e => {
                                                    const newNav = [...footerLinks];
                                                    newNav[idx].href = e.target.value;
                                                    setFooterLinks(newNav);
                                                }}
                                                placeholder="/terms"
                                                className="admin-form-input !h-9 !text-sm !bg-white border-slate-200"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setFooterLinks(footerLinks.filter((_, i) => i !== idx))}
                                        className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
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
                    <div className="p-5 bg-orange-50/50 rounded-2xl  border-orange-100 flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-orange-100 text-blue-600 rounded-xl shrink-0">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-orange-900 font-bold mb-0.5 mt-0.5">Pro Tip: Streamlined Navigation</p>
                            <p className="text-[12px] text-orange-700/80 leading-relaxed italic">
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
