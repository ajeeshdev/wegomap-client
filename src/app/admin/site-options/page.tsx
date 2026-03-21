"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { ExternalLink, ShieldCheck } from 'lucide-react';
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
        maintenance_mode: false,
        site_logo: '',
        site_favicon: ''
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
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label">Site name</label>
                                <input 
                                    type="text" 
                                    value={general.site_title}
                                    onChange={e => setGeneral({...general, site_title: e.target.value})}
                                    className="admin-form-input" 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Site logo</label>
                                    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                                        <ImageUpload 
                                            value={general.site_logo}
                                            onChange={url => setGeneral({...general, site_logo: url})}
                                            label=""
                                            size="small"
                                            hideUrlInput
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Transparent PNG. Used for login and header.</p>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Favicon</label>
                                    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                                        <ImageUpload 
                                            value={general.site_favicon}
                                            onChange={url => setGeneral({...general, site_favicon: url})}
                                            label=""
                                            size="icon"
                                            hideUrlInput
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Square icon (32×32 or 64×64). Browser tab.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Google rating</label>
                                    <input 
                                        type="text" 
                                        value={general.google_rating}
                                        onChange={e => setGeneral({...general, google_rating: e.target.value})}
                                        className="admin-form-input"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Total reviews</label>
                                    <input 
                                        type="text" 
                                        value={general.google_reviews}
                                        onChange={e => setGeneral({...general, google_reviews: e.target.value})}
                                        className="admin-form-input"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Google Analytics / tracking scripts</label>
                                <textarea 
                                    value={general.analytics_script}
                                    onChange={e => setGeneral({...general, analytics_script: e.target.value})}
                                    rows={5}
                                    className="admin-form-input font-mono text-sm bg-slate-900 text-slate-300 border-slate-700"
                                />
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                                <div>
                                    <label className="admin-form-label block">Maintenance mode</label>
                                    <p className="text-xs text-slate-500 mt-0.5">Show &quot;Under Construction&quot; on the site</p>
                                </div>
                                <label className="relative inline-block w-11 h-6 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={general.maintenance_mode === true || String(general.maintenance_mode) === 'true' || String(general.maintenance_mode) === '1'}
                                        onChange={e => setGeneral({...general, maintenance_mode: e.target.checked})}
                                        className="sr-only peer"
                                    />
                                    <span className="block w-full h-full bg-slate-200 rounded-full peer-checked:bg-rose-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:transition-transform peer-checked:after:translate-x-5"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <h3 className="admin-form-section-title text-base font-semibold text-slate-800">Contact</h3>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Address</label>
                                <textarea 
                                    value={contact.address}
                                    onChange={e => setContact({...contact, address: e.target.value})}
                                    rows={2}
                                    className="admin-form-input"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Phone (primary)</label>
                                    <input type="text" value={contact.phone1} onChange={e => setContact({...contact, phone1: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Phone (support)</label>
                                    <input type="text" value={contact.phone2} onChange={e => setContact({...contact, phone2: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">WhatsApp</label>
                                    <input type="text" value={contact.whatsapp} onChange={e => setContact({...contact, whatsapp: e.target.value})} className="admin-form-input" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Email (info)</label>
                                    <input type="email" value={contact.email1} onChange={e => setContact({...contact, email1: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Email (booking)</label>
                                    <input type="email" value={contact.email2} onChange={e => setContact({...contact, email2: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Email (admin)</label>
                                    <input type="email" value={contact.email3} onChange={e => setContact({...contact, email3: e.target.value})} className="admin-form-input" />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Social Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <h3 className="admin-form-section-title text-base font-semibold text-slate-800">Social links</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Facebook</label>
                                    <input type="url" value={social.facebook} onChange={e => setSocial({...social, facebook: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Instagram</label>
                                    <input type="url" value={social.instagram} onChange={e => setSocial({...social, instagram: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Pinterest</label>
                                    <input type="url" value={social.pinterest} onChange={e => setSocial({...social, pinterest: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">LinkedIn</label>
                                    <input type="url" value={social.linkedin} onChange={e => setSocial({...social, linkedin: e.target.value})} className="admin-form-input" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <h3 className="admin-form-section-title text-base font-semibold text-slate-800">Footer</h3>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Quote text</label>
                                <textarea value={footer.footer_quote} onChange={e => setFooter({...footer, footer_quote: e.target.value})} rows={2} className="admin-form-input" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Quote author</label>
                                    <input type="text" value={footer.footer_author} onChange={e => setFooter({...footer, footer_author: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Footer subtitle</label>
                                    <input type="text" value={footer.footer_reveal_text} onChange={e => setFooter({...footer, footer_reveal_text: e.target.value})} className="admin-form-input" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA title</label>
                                    <input type="text" value={footer.footer_cta_title} onChange={e => setFooter({...footer, footer_cta_title: e.target.value})} className="admin-form-input" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA subtitle</label>
                                    <input type="text" value={footer.footer_cta_subtitle} onChange={e => setFooter({...footer, footer_cta_subtitle: e.target.value})} className="admin-form-input" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Copyright</label>
                                <input type="text" value={footer.footer_copyright} onChange={e => setFooter({...footer, footer_copyright: e.target.value})} className="admin-form-input" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}
