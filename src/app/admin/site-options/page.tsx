"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';
import { ExternalLink, ShieldCheck, FileCode2, RefreshCw, CheckCircle2, AlertCircle, Copy, ExternalLink as OpenIcon, Globe2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-hot-toast';

export default function SiteOptionsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sitemapGenerating, setSitemapGenerating] = useState(false);
    const [sitemapResult, setSitemapResult] = useState<{ urlCount: number; xml: string; path: string } | null>(null);
    const [sitemapError, setSitemapError] = useState<string | null>(null);
    const [showXmlPreview, setShowXmlPreview] = useState(false);

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

    const [payment, setPayment] = useState({
        razorpay_button_id: '',
        upi_id: '',
        upi_phone: '',
        bank_accounts: [] as any[]
    });

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

                    if (opt.key === 'payment_details') {
                        try {
                            const parsed = JSON.parse(opt.value);
                            setPayment(parsed);
                        } catch(e) {}
                    }
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
                ...Object.entries(footer).map(([k, v]) => ({ key: k, value: String(v) })),
                { key: 'payment_details', value: JSON.stringify(payment) }
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


        <div className="admin-form-card flex flex-col items-center justify-center p-24 gap-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading Settings...</p>
        </div>

    return (
        <div className="pb-24 space-y-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">
                        <div className="admin-page-title-indicator bg-blue-600"></div>
                        General Settings
                    </h2>
                    <p className="admin-page-subtitle mt-1">Manage site-wide configuration, contact info, and social links</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link 
                        href="/"
                        target="_blank"
                        className="admin-btn h-10 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                         <ExternalLink size={14} /> View Live Site
                    </Link>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="admin-btn admin-btn-primary h-10 px-8"
                    >
                        <ShieldCheck size={18} /> {saving ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">


                    {/* General Section */}
                    <div className="admin-form-card">
                        <div className="space-y-4">
                            <div className="admin-form-grid-3">
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Site name</label>
                                    <input 
                                        type="text" 
                                        value={general.site_title}
                                        onChange={e => setGeneral({...general, site_title: e.target.value})}
                                        className="admin-form-input !h-9" 
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Google rating</label>
                                    <input 
                                        type="text" 
                                        value={general.google_rating}
                                        onChange={e => setGeneral({...general, google_rating: e.target.value})}
                                        className="admin-form-input !h-9"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Total reviews</label>
                                    <input 
                                        type="text" 
                                        value={general.google_reviews}
                                        onChange={e => setGeneral({...general, google_reviews: e.target.value})}
                                        className="admin-form-input !h-9"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-grid-2 col-lg-7">
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Site logo</label>
                                    <div className="border border-slate-100 rounded-lg p-2 bg-slate-50/30">
                                        <ImageUpload 
                                            value={general.site_logo}
                                            onChange={url => setGeneral({...general, site_logo: url})}
                                            label=""
                                            size="landscape"
                                            objectFit="contain"
                                            hideUrlInput
                                            dimensions="500 x 200"
                                        />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Favicon</label>
                                    <div className="border border-slate-100 rounded-lg p-2 bg-slate-50/30">
                                        <ImageUpload 
                                            value={general.site_favicon}
                                            onChange={url => setGeneral({...general, site_favicon: url})}
                                            label=""
                                            size="icon"
                                            hideUrlInput
                                            dimensions="32 x 32"
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="admin-form-group">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Tracking scripts</label>
                                <textarea 
                                    value={general.analytics_script}
                                    onChange={e => setGeneral({...general, analytics_script: e.target.value})}
                                    rows={3}
                                    className="admin-form-input font-mono text-[11px] bg-slate-900 text-slate-300 border-slate-700"
                                />
                            </div>

                            <div className="py-2 flex items-center justify-between border-t border-slate-50">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Maintenance mode</label>
                                    <p className="text-[10px] text-slate-400">Under Construction mode</p>
                                </div>
                                <label className="relative inline-block w-10 h-5 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={general.maintenance_mode === true || String(general.maintenance_mode) === 'true'}
                                        onChange={e => setGeneral({...general, maintenance_mode: e.target.checked})}
                                        className="sr-only peer"
                                    />
                                    <span className="block w-full h-full bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow after:transition-transform peer-checked:after:translate-x-5"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="admin-form-card">
                        <div className="space-y-4">
                            <h3 className="admin-form-section-title text-sm border-b border-slate-50 pb-2 mb-4">Contact Details</h3>

                            <div className="admin-form-group">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Physical Address</label>
                                <textarea 
                                    value={contact.address}
                                    onChange={e => setContact({...contact, address: e.target.value})}
                                    rows={1}
                                    className="admin-form-input !h-auto min-h-[40px] py-2"
                                />
                            </div>
                            
                            <div className="admin-form-grid-3">
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Phone Primary</label>
                                    <input type="text" value={contact.phone1} onChange={e => setContact({...contact, phone1: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Phone Support</label>
                                    <input type="text" value={contact.phone2} onChange={e => setContact({...contact, phone2: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">WhatsApp</label>
                                    <input type="text" value={contact.whatsapp} onChange={e => setContact({...contact, whatsapp: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                            </div>
                            
                            <div className="admin-form-grid-3 pt-2">
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Email Info</label>
                                    <input type="email" value={contact.email1} onChange={e => setContact({...contact, email1: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Email Booking</label>
                                    <input type="email" value={contact.email2} onChange={e => setContact({...contact, email2: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Email Admin</label>
                                    <input type="email" value={contact.email3} onChange={e => setContact({...contact, email3: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Social Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <h3 className="admin-form-section-title text-base font-semibold text-slate-800">Social links</h3>

                            <div className="admin-form-grid-4">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Facebook</label>
                                    <input type="url" value={social.facebook} onChange={e => setSocial({...social, facebook: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Instagram</label>
                                    <input type="url" value={social.instagram} onChange={e => setSocial({...social, instagram: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Pinterest</label>
                                    <input type="url" value={social.pinterest} onChange={e => setSocial({...social, pinterest: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">LinkedIn</label>
                                    <input type="url" value={social.linkedin} onChange={e => setSocial({...social, linkedin: e.target.value})} className="admin-form-input !h-9" />
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

                            <div className="admin-form-grid-4 gap-4">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Quote author</label>
                                    <input type="text" value={footer.footer_author} onChange={e => setFooter({...footer, footer_author: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Footer sub</label>
                                    <input type="text" value={footer.footer_reveal_text} onChange={e => setFooter({...footer, footer_reveal_text: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA title</label>
                                    <input type="text" value={footer.footer_cta_title} onChange={e => setFooter({...footer, footer_cta_title: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">CTA sub</label>
                                    <input type="text" value={footer.footer_cta_subtitle} onChange={e => setFooter({...footer, footer_cta_subtitle: e.target.value})} className="admin-form-input !h-9" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label className="admin-form-label">Copyright</label>
                                <input type="text" value={footer.footer_copyright} onChange={e => setFooter({...footer, footer_copyright: e.target.value})} className="admin-form-input" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <h3 className="admin-form-section-title text-base font-semibold text-slate-800 border-b border-slate-50 pb-2">Payment Details</h3>

                            <div className="admin-form-grid-3">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Razorpay Button ID</label>
                                    <input 
                                        type="text" 
                                        value={payment.razorpay_button_id} 
                                        onChange={e => setPayment({...payment, razorpay_button_id: e.target.value})} 
                                        className="admin-form-input !h-9 font-mono text-[11px]" 
                                        placeholder="pl_XXXXXXX"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">UPI ID</label>
                                    <input 
                                        type="text" 
                                        value={payment.upi_id} 
                                        onChange={e => setPayment({...payment, upi_id: e.target.value})} 
                                        className="admin-form-input !h-9" 
                                        placeholder="9778734488@obizaxis"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">UPI Phone</label>
                                    <input 
                                        type="text" 
                                        value={payment.upi_phone} 
                                        onChange={e => setPayment({...payment, upi_phone: e.target.value})} 
                                        className="admin-form-input !h-9" 
                                        placeholder="+91 9778734488"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Bank Accounts</label>
                                    <button 
                                        onClick={() => setPayment({
                                            ...payment, 
                                            bank_accounts: [...payment.bank_accounts, { 
                                                name: '', accountName: 'WEGOMAP', accountNo: '', ifsc: '', branch: '', acctType: 'Current Account', color: '#004B92' 
                                            }]
                                        })}
                                        className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded hover:bg-slate-800 transition-colors"
                                    >
                                        + Add Bank
                                    </button>
                                </div>

                                <div className="space-y-4 row">
                                    {payment.bank_accounts.map((bank, bIdx) => (
                                        <div key={bIdx} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 relative group col-lg-4">
                                            <button 
                                                onClick={() => {
                                                    const updated = [...payment.bank_accounts];
                                                    updated.splice(bIdx, 1);
                                                    setPayment({...payment, bank_accounts: updated});
                                                }}
                                                className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Bank Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={bank.name} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].name = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px]" 
                                                    />
                                                </div>
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Account Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={bank.accountName} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].accountName = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px]" 
                                                    />
                                                </div>
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Account No</label>
                                                    <input 
                                                        type="text" 
                                                        value={bank.accountNo} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].accountNo = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px] font-mono" 
                                                    />
                                                </div>
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">IFSC Code</label>
                                                    <input 
                                                        type="text" 
                                                        value={bank.ifsc} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].ifsc = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px] font-mono" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Branch</label>
                                                    <input 
                                                        type="text" 
                                                        value={bank.branch} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].branch = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px]" 
                                                    />
                                                </div>
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                                                    <select 
                                                        value={bank.acctType} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].acctType = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="admin-form-input !h-8 text-[12px]"
                                                    >
                                                        <option value="Current Account">Current Account</option>
                                                        <option value="Savings Account">Savings Account</option>
                                                    </select>
                                                </div>
                                                <div className="admin-form-group">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Brand Color</label>
                                                    <input 
                                                        type="color" 
                                                        value={bank.color} 
                                                        onChange={e => {
                                                            const updated = [...payment.bank_accounts];
                                                            updated[bIdx].color = e.target.value;
                                                            setPayment({...payment, bank_accounts: updated});
                                                        }}
                                                        className="h-8 w-full rounded border border-slate-100 p-0 overflow-hidden cursor-pointer" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {payment.bank_accounts.length === 0 && (
                                        <div className="text-center py-8 border-2 border-dashed border-slate-50 rounded-2xl text-slate-300 text-[11px] font-bold uppercase tracking-widest">
                                            No bank accounts added
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sitemap Generator Section */}
                    <div className="admin-form-card">
                        <div className="space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="admin-form-section-title text-base font-semibold text-slate-800 flex items-center gap-2 border-none pb-0 mb-0">
                                        <FileCode2 size={16} className="text-emerald-500" /> XML Sitemap Generator
                                    </h3>
                                    <p className="text-[11px] text-slate-400 mt-1">Auto-generates sitemap.xml from all pages, packages, blogs &amp; hotels and saves it to the site root.</p>
                                </div>
                                <button
                                    onClick={async () => {
                                        setSitemapGenerating(true);
                                        setSitemapResult(null);
                                        setSitemapError(null);
                                        setShowXmlPreview(false);
                                        try {
                                            const siteUrl = window.location.origin;
                                            const res = await fetch('/api/generate-sitemap', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ siteUrl })
                                            });
                                            const data = await res.json();
                                            if (data.success) {
                                                setSitemapResult(data);
                                                toast.success(`Sitemap generated! ${data.urlCount} URLs indexed.`);
                                            } else {
                                                setSitemapError(data.error || 'Generation failed');
                                                toast.error(data.error || 'Generation failed');
                                            }
                                        } catch (err: any) {
                                            const msg = err.message || 'Request failed';
                                            setSitemapError(msg);
                                            toast.error(msg);
                                        } finally {
                                            setSitemapGenerating(false);
                                        }
                                    }}
                                    disabled={sitemapGenerating}
                                    className="admin-btn admin-btn-primary h-10 px-5 shrink-0 flex items-center gap-2"
                                >
                                    <RefreshCw size={14} className={sitemapGenerating ? 'animate-spin' : ''} />
                                    {sitemapGenerating ? 'Generating...' : 'Generate Sitemap'}
                                </button>
                            </div>

                            {sitemapResult && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-bold text-emerald-700">Sitemap saved to <span className="font-mono">/sitemap.xml</span></p>
                                            <p className="text-[11px] text-emerald-600">{sitemapResult.urlCount} URLs indexed successfully</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(sitemapResult.xml);
                                                    toast.success('XML copied!');
                                                }}
                                                className="admin-btn h-8 px-3 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-[10px] flex items-center gap-1.5"
                                            >
                                                <Copy size={11} /> Copy XML
                                            </button>
                                            <a
                                                href="/sitemap.xml"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="admin-btn h-8 px-3 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-[10px] flex items-center gap-1.5"
                                            >
                                                <OpenIcon size={11} /> View Live
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowXmlPreview(!showXmlPreview)}
                                        className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <FileCode2 size={12} />
                                        {showXmlPreview ? 'Hide' : 'Preview'} XML
                                    </button>

                                    {showXmlPreview && (
                                        <pre className="bg-slate-900 text-emerald-400 text-[10px] font-mono p-4 rounded-xl overflow-x-auto max-h-64 leading-relaxed border border-slate-700">
                                            {sitemapResult.xml.substring(0, 4000)}{sitemapResult.xml.length > 4000 ? '\n...(truncated)' : ''}
                                        </pre>
                                    )}
                                </div>
                            )}

                            {sitemapError && (
                                <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 p-4 rounded-xl">
                                    <AlertCircle size={18} className="text-rose-500 shrink-0" />
                                    <p className="text-[12px] font-bold text-rose-700">{sitemapError}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: 'Static Pages', icon: Globe2, note: 'Home, Packages, Blogs...', color: 'blue' },
                                    { label: 'Tour Packages', icon: RefreshCw, note: 'All package slugs', color: 'emerald' },
                                    { label: 'Blog Posts', icon: FileCode2, note: 'All blog slugs', color: 'amber' },
                                    { label: 'Hotels', icon: Globe2, note: 'All hotel/houseboat slugs', color: 'violet' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                            <item.icon size={13} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-700">{item.label}</p>
                                            <p className="text-[9px] text-slate-400 mt-0.5">{item.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );

}
