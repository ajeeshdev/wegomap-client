"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Save, Building2, Phone, Mail, FileText, MapPin, Share2, Globe, Clock, Zap, ExternalLink, ShieldAlert, Sparkles, MessageSquare, ShieldCheck, Terminal, Layers, Image as ImageIcon, Link as LinkIcon, Plus, Trash2, User } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';

export default function SiteOptionsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Group states to match the tabs
    const [general, setGeneral] = useState({
        site_title: '',
        analytics_script: '',
        google_rating: '',
        google_reviews: '',
        maintenance_mode: false
    });

    const [contact, setContact] = useState({
        address: '',
        phone1: '',
        phone2: '',
        whatsapp: '',
        email1: '',
        email2: '',
        email3: ''
    });

    const [social, setSocial] = useState({
        facebook: '',
        pinterest: '',
        instagram: '',
        linkedin: ''
    });

    const [footer, setFooter] = useState({
        footer_quote: '',
        footer_author: '',
        footer_reveal_text: '',
        footer_cta_title: '',
        footer_cta_subtitle: '',
        footer_copyright: ''
    });

    // Navigation states removed as they are now in the Menus module

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            
            if (json.success && json.data) {
                const gen = { ...general };
                const con = { ...contact };
                const soc = { ...social };
                const foo = { ...footer };
                
                json.data.forEach((opt: { key: string, value: string }) => {
                    if (opt.key in gen) (gen as Record<string, string | boolean>)[opt.key] = opt.value === 'true' ? true : opt.value;
                    if (opt.key in con) (con as Record<string, string>)[opt.key] = opt.value;
                    if (opt.key in soc) (soc as Record<string, string>)[opt.key] = opt.value;
                    if (opt.key in foo) (foo as Record<string, string>)[opt.key] = opt.value;
                });
                
                setGeneral(gen);
                setContact(con);
                setSocial(soc);
                setFooter(foo);

                setSocial(soc);
            }
        } catch (err) {
            console.error('Failed to fetch options', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const allOptions = [
                ...Object.entries(general).map(([k, v]) => ({ key: k, value: String(v) })),
                ...Object.entries(contact).map(([k, v]) => ({ key: k, value: String(v) })),
                ...Object.entries(social).map(([k, v]) => ({ key: k, value: String(v) })),
                ...Object.entries(footer).map(([k, v]) => ({ key: k, value: String(v) }))
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
                toast.success('Settings saved!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };


    if (loading) return (
        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading...</p>
        </div>
    );

    return (
        <div className="pb-24 space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator"></div>
                        General Settings
                    </h2>
                    <p className="admin-page-subtitle mt-1">Manage site-wide configuration, contact info, and social links</p>
                </div>
                <div className="flex items-center gap-6">
                    <Link 
                        href="/"
                        target="_blank"
                        className="admin-btn-small bg-slate-100 text-slate-600 hover:bg-slate-200 px-5"
                    >
                         <ExternalLink size={14} /> View Live Site
                    </Link>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-11 px-10 shadow-lg shadow-blue-200/50"
                    >
                        <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </div>

            <div className="">
                {/* Main Content Area */}
                <div className="space-y-10">
                    
                    {/* General Section */}
                    <div className="admin-form-card">
                        <div className="space-y-8">
                            <h3 className="admin-form-section-title">
                                <div className="admin-page-title-indicator bg-blue-600"></div>
                                General Settings
                            </h3>
                            
                            <div className="admin-form-group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Globe size={12} className="text-blue-500" /> Site Name
                                </label>
                                <input 
                                    type="text" 
                                    value={general.site_title}
                                    onChange={e => setGeneral({...general, site_title: e.target.value})}
                                    className="admin-form-input text-lg font-bold h-12 focus:border-blue-500/50" 
                                    placeholder="e.g. Wegomap International"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-3 flex items-center gap-2">
                                        <Sparkles size={12} strokeWidth={2.5} className="text-amber-500" /> Google Rating
                                    </label>
                                    <input 
                                        type="text" 
                                        value={general.google_rating}
                                        onChange={e => setGeneral({...general, google_rating: e.target.value})}
                                        className="admin-form-input !bg-slate-50/50 h-11 font-bold focus:border-amber-500/50"
                                        placeholder="e.g. 4.9"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-3 flex items-center gap-2">
                                        <MessageSquare size={12} strokeWidth={2.5} className="text-indigo-500" /> Total Reviews
                                    </label>
                                    <input 
                                        type="text" 
                                        value={general.google_reviews}
                                        onChange={e => setGeneral({...general, google_reviews: e.target.value})}
                                        className="admin-form-input !bg-slate-50/50 h-11 font-bold focus:border-indigo-500/50"
                                        placeholder="e.g. 1024"
                                    />
                                </div>
                            </div>

                             <div className="admin-form-group pt-6">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-3 flex items-center gap-2">
                                    <Terminal size={12} strokeWidth={2.5} className="text-slate-500" /> Google Analytics / Tracking Scripts
                                </label>
                                <div className="bg-slate-900 rounded-2xl p-1.5 shadow-inner">
                                    <textarea 
                                        value={general.analytics_script}
                                        onChange={e => setGeneral({...general, analytics_script: e.target.value})}
                                        rows={6}
                                        className="admin-form-input !bg-transparent !border-none !text-slate-300 font-mono text-[11px] p-5 min-h-[180px] focus:ring-0"
                                        placeholder="Paste Google Analytics or Facebook Pixel code here..."
                                    />
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between bg-rose-50/30 -mx-7 -mb-7 p-7 transition-colors rounded-b-2xl">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100 shadow-sm">
                                        <ShieldAlert size={22} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-black text-rose-900 block uppercase tracking-tight">Maintenance Mode</label>
                                        <p className="text-[11px] text-rose-700/60 font-medium">Instantly put the entire site into "Under Construction" mode</p>
                                    </div>
                                </div>
                                <label className="relative cursor-pointer group scale-125 mr-2">
                                    <input 
                                        type="checkbox" 
                                        checked={general.maintenance_mode}
                                        onChange={e => setGeneral({...general, maintenance_mode: e.target.checked})}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:bg-rose-500 transition-all after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-7 shadow-sm"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="admin-form-card">
                        <div className="space-y-8">
                            <h3 className="admin-form-section-title">
                                <div className="admin-page-title-indicator bg-emerald-500"></div>
                                Contact Information
                            </h3>

                            <div className="admin-form-group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <MapPin size={12} className="text-emerald-500" /> Address
                                </label>
                                <textarea 
                                    value={contact.address}
                                    onChange={e => setContact({...contact, address: e.target.value})}
                                    rows={3}
                                    className="admin-form-input !bg-slate-50/30 p-5 min-h-[110px] focus:border-emerald-500/50 leading-relaxed" 
                                    placeholder="Enter physical address..."
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Phone size={12} className="text-blue-500" /> Phone 1 (Primary)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={contact.phone1}
                                        onChange={e => setContact({...contact, phone1: e.target.value})}
                                        className="admin-form-input h-11 focus:border-blue-500/50"
                                        placeholder="+91..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Phone size={12} className="text-slate-400" /> Phone 2 (Support)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={contact.phone2}
                                        onChange={e => setContact({...contact, phone2: e.target.value})}
                                        className="admin-form-input h-11 focus:border-slate-400/50"
                                        placeholder="+91..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Layers size={12} className="text-emerald-500" /> WhatsApp Number
                                    </label>
                                    <input 
                                        type="text" 
                                        value={contact.whatsapp}
                                        onChange={e => setContact({...contact, whatsapp: e.target.value})}
                                        className="admin-form-input h-11 font-bold text-emerald-600 focus:border-emerald-600/50"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Mail size={12} className="text-indigo-500" /> Email 1 (Info)
                                    </label>
                                    <input 
                                        type="email" 
                                        value={contact.email1}
                                        onChange={e => setContact({...contact, email1: e.target.value})}
                                        className="admin-form-input h-11 focus:border-indigo-500/50"
                                        placeholder="info@..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Mail size={12} className="text-rose-500" /> Email 2 (Booking)
                                    </label>
                                    <input 
                                        type="email" 
                                        value={contact.email2}
                                        onChange={e => setContact({...contact, email2: e.target.value})}
                                        className="admin-form-input h-11 focus:border-rose-500/50"
                                        placeholder="booking@..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Mail size={12} className="text-slate-400" /> Email 3 (Admin)
                                    </label>
                                    <input 
                                        type="email" 
                                        value={contact.email3}
                                        onChange={e => setContact({...contact, email3: e.target.value})}
                                        className="admin-form-input h-11 focus:border-slate-400/50"
                                        placeholder="admin@..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Social Section */}
                    <div className="admin-form-card">
                        <div className="space-y-8">
                            <h3 className="admin-form-section-title">
                                <div className="admin-page-title-indicator bg-amber-500"></div>
                                Social Media Links
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Share2 size={12} className="text-blue-600" /> Facebook URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={social.facebook}
                                        onChange={e => setSocial({...social, facebook: e.target.value})}
                                        className="admin-form-input h-11 focus:border-blue-600/50"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Share2 size={12} className="text-pink-500" /> Instagram URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={social.instagram}
                                        onChange={e => setSocial({...social, instagram: e.target.value})}
                                        className="admin-form-input h-11 focus:border-pink-500/50"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Share2 size={12} className="text-rose-600" /> Pinterest URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={social.pinterest}
                                        onChange={e => setSocial({...social, pinterest: e.target.value})}
                                        className="admin-form-input h-11 focus:border-rose-600/50"
                                        placeholder="https://pinterest.com/..."
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Share2 size={12} className="text-blue-700" /> LinkedIn URL
                                    </label>
                                    <input 
                                        type="url" 
                                        value={social.linkedin}
                                        onChange={e => setSocial({...social, linkedin: e.target.value})}
                                        className="admin-form-input h-11 focus:border-blue-700/50"
                                        placeholder="https://linkedin.com/..."
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 flex items-center justify-center">
                                <div className="flex items-center gap-3 py-3 px-6 bg-slate-50 rounded-2xl border border-slate-100 italic opacity-80 text-[11px] text-slate-500">
                                    <Zap size={14} className="text-amber-500" />
                                    Changes will be reflected across the entire website instantly after saving.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="admin-form-card mt-10">
                        <div className="space-y-8">
                            <h3 className="admin-form-section-title">
                                <div className="admin-page-title-indicator bg-indigo-500"></div>
                                Footer Configuration
                            </h3>

                            <div className="admin-form-group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <MessageSquare size={12} className="text-indigo-500" /> Animated Quote Text
                                </label>
                                <textarea 
                                    value={footer.footer_quote}
                                    onChange={e => setFooter({...footer, footer_quote: e.target.value})}
                                    rows={2}
                                    className="admin-form-input !bg-slate-50/30 p-5 focus:border-indigo-500/50 leading-relaxed font-serif text-lg italic" 
                                    placeholder="Traveling – It leaves you speechless..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <User size={12} className="text-slate-400" /> Quote Author
                                    </label>
                                    <input 
                                        type="text" 
                                        value={footer.footer_author}
                                        onChange={e => setFooter({...footer, footer_author: e.target.value})}
                                        className="admin-form-input h-11 focus:border-indigo-500/50"
                                        placeholder="e.g. Ibn Battuta"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Sparkles size={12} className="text-amber-500" /> Footer Subtitle
                                    </label>
                                    <input 
                                        type="text" 
                                        value={footer.footer_reveal_text}
                                        onChange={e => setFooter({...footer, footer_reveal_text: e.target.value})}
                                        className="admin-form-input h-11 focus:border-amber-500/50 uppercase tracking-widest"
                                        placeholder="GREAT PLACES TO VISIT"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Building2 size={12} className="text-blue-500" /> Call to Action Title
                                    </label>
                                    <input 
                                        type="text" 
                                        value={footer.footer_cta_title}
                                        onChange={e => setFooter({...footer, footer_cta_title: e.target.value})}
                                        className="admin-form-input h-11 font-bold focus:border-blue-500/50"
                                        placeholder="Planning your next trip?"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Zap size={12} className="text-blue-400" /> Call to Action Subtitle
                                    </label>
                                    <input 
                                        type="text" 
                                        value={footer.footer_cta_subtitle}
                                        onChange={e => setFooter({...footer, footer_cta_subtitle: e.target.value})}
                                        className="admin-form-input h-11 focus:border-blue-400/50"
                                        placeholder="Talk to our experts..."
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group pt-4">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-emerald-500" /> Copyright Notice
                                </label>
                                <input 
                                    type="text" 
                                    value={footer.footer_copyright}
                                    onChange={e => setFooter({...footer, footer_copyright: e.target.value})}
                                    className="admin-form-input h-11 focus:border-emerald-500/50"
                                    placeholder="© 2026 Wegomap. All rights reserved."
                                />
                            </div>

                            <div className="pt-8 border-t border-slate-50 flex items-center justify-center">
                                <div className="flex items-center gap-3 py-3 px-6 bg-slate-50 rounded-2xl border border-slate-100 italic opacity-80 text-[11px] text-slate-500">
                                    <Layers size={14} className="text-indigo-500" />
                                    Footer content updates will be reflected across all pages immediately.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}
