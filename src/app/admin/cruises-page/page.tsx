"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Save, Sparkles, Plus, Trash2, Heart, Info, ListTodo } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/Editor';

interface CruisesPageContent {
    banner: { title: string; subtitle: string; preTitle: string; image: string; };
    rules?: string[];
    honeymoonDelights?: string;
    rulesNote?: string;
    additionalDetails?: string;
    listingTitle?: string;
    listingSubtitle?: string;
}

const DEFAULT_RULES = [
    "Check-in: 12:30 hours and check out 08:30 hours next day",
    "Stay includes: 3 meals and 01 tea snacks (Lunch, dinner, breakfast)",
    "Cruise hours: Cruise starts from 12:30 hours to 17:00 hours, with a one-hour break for lunch in between",
    "Check In: 12:30 hrs",
    "Cruise time from: 12:30 hrs. to 17:30 hrs.",
    "Lunch break: 1.5 hrs.",
    "Dinner: 20:00 hrs. to 21:30 hrs",
    "Morning Cruise: 08:00 to 08:45 hrs",
    "Check Out: 08:45 hrs",
    "Since the houseboat is moving through countryside and paddy fields, there may be possibilities of pests in the houseboats.",
    "Always close doors and windows to avoid mosquitoes entering the bedrooms.",
    "Food will be a preset traditional Kerala menu, breakfast will be light e.g.: idly, omelette, bread and jam.",
    "Since there is no storage facility, last-minute food orders will be difficult once the boat leaves the boarding point.",
    "Crews in the houseboats are not professionally trained by any hospitality institutions; most of them are oarsmen of erstwhile goods canoes, which may cause language issues.",
    "There may be chances of unexpected power failure and technical issues at any time.",
    "TV channels are not available.",
    "Shoes and slippers are not allowed on boats (they have to be kept in the common area after entering the houseboat).",
    "All houseboat crews belong to a trade union, and trade union influence is higher than the management.",
    "All guests have to sleep by 22:00 hours since the crew sleeps in the common area of the same boat.",
    "Crews may insist you to buy fish and prawns from the shops on the way; buy it if you are comfortable with rates and quality.",
    "Facilities, cleanliness, quality of linen, towel, and toiletries are not comparable to hotels and resorts.",
    "Crews may insist you to hire shikhara boats, speed boats, or any other water sports activities; go ahead if you are comfortable with rates and safety concerns.",
    "A/C will work from 21:00 hours to 06:00 hours in bedrooms in deluxe boats; in premium boats, A/C is available in the bedroom on request during the stay; in the luxury boats, A/C is available in rooms and dining area on request during the stay."
];

const DEFAULT_CONTENT: CruisesPageContent = {
    banner: {
        title: "Luxury Backwater Cruises",
        subtitle: "Experience the serene backwaters of Alleppey and Kumarakom on our premium houseboats.",
        preTitle: "Cruises & Houseboats",
        image: ""
    },
    rules: DEFAULT_RULES,
    honeymoonDelights: "Flower Bed Decoration, Candle light dinner & cake",
    rulesNote: "Season rates / Hike rates for Pooja, Onam, Diwali, and other Public Holidays",
    additionalDetails: "",
    listingTitle: "Available Houseboats",
    listingSubtitle: "From traditional deluxe boats to modern luxury cruisers, find your perfect stay on the water."
};

export default function CruisesSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<CruisesPageContent>(DEFAULT_CONTENT);

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/options`);
            const json = await res.json();
            if (json.success && json.data) {
                const opt = json.data.find((o: any) => o.key === 'cruises_page_settings');
                if (opt) {
                    try {
                        const saved = JSON.parse(opt.value);
                        setContent({
                            banner: { ...DEFAULT_CONTENT.banner, ...saved.banner },
                            rules: saved.rules || DEFAULT_CONTENT.rules,
                            honeymoonDelights: saved.honeymoonDelights || DEFAULT_CONTENT.honeymoonDelights,
                            rulesNote: saved.rulesNote || DEFAULT_CONTENT.rulesNote,
                            additionalDetails: saved.additionalDetails || "",
                            listingTitle: saved.listingTitle || DEFAULT_CONTENT.listingTitle,
                            listingSubtitle: saved.listingSubtitle || DEFAULT_CONTENT.listingSubtitle
                        });
                    } catch (e) { console.error(e); }
                }
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/options/bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify({ options: [{ key: 'cruises_page_settings', value: JSON.stringify(content) }] })
            });
            const json = await res.json();
            if (json.success) toast.success('Cruises page settings updated!');
        } catch (err) { toast.error('Failed to save.'); }
        finally { setSaving(false); }
    };

    const handleRuleChange = (index: number, val: string) => {
        const updatedRules = [...(content.rules || [])];
        updatedRules[index] = val;
        setContent({ ...content, rules: updatedRules });
    };

    const handleAddRule = () => {
        setContent({ ...content, rules: [...(content.rules || []), ""] });
    };

    const handleRemoveRule = (index: number) => {
        const updatedRules = (content.rules || []).filter((_, i) => i !== index);
        setContent({ ...content, rules: updatedRules });
    };

    if (loading) return <div className="admin-loading-screen h-[400px] flex items-center justify-center"><div className="spinner"></div><p className="ml-3 font-bold text-black">Loading...</p></div>;

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-16">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title admin-page-title--section">
                        <div className="admin-page-title-indicator"></div>
                        Cruises Page <span className="text-black"></span>
                    </h2>
                    <p className="admin-page-subtitle text-slate-500 font-bold">Manage the hero banner and houseboat rules for the cruises &amp; houseboats page</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary h-12 px-8 !rounded-xl">
                    <Save size={18} className={saving ? 'animate-spin mr-2' : 'mr-2'} />
                    {saving ? 'Saving...' : 'Publish Changes'}
                </button>
            </div>

            <div className=" mx-auto space-y-10">
                {/* BANNER SECTION */}
                <div className="admin-form-card !p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Sparkles size={22} /></div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Main Page Banner</h3>
                            <p className="text-xs text-slate-400 font-bold">Hero section for /cruises</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Pre-Title</span></label>
                                <input type="text" value={content.banner?.preTitle} onChange={e => setContent({ ...content, banner: { ...content.banner, preTitle: e.target.value } })} className="admin-form-input font-bold text-black" placeholder="Cruises & Houseboats" />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Title</span></label>
                                <input type="text" value={content.banner?.title} onChange={e => setContent({ ...content, banner: { ...content.banner, title: e.target.value } })} className="admin-form-input font-bold text-black" placeholder="Luxury Backwater Cruises" />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Banner Subtitle</span></label>
                                <textarea rows={3} value={content.banner?.subtitle} onChange={e => setContent({ ...content, banner: { ...content.banner, subtitle: e.target.value } })} className="admin-form-input font-bold text-black" placeholder="Experience the serene backwaters..." />
                            </div>
                        </div>
                        <div>
                            <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Background Image</span></label>
                            <ImageUpload value={content.banner?.image} onChange={url => setContent({ ...content, banner: { ...content.banner, image: url } })} label="Banner Image" dimensions="1920 x 600" />
                        </div>
                    </div>
                </div>

                {/* LISTING HEADER SECTION */}
                <div className="admin-form-card !p-8" style={{ marginTop: '50px' }}>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Sparkles size={22} /></div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Fleet Listing Header</h3>
                            <p className="text-xs text-slate-400 font-bold">Configure the main title and introduction text showing above the houseboat listing</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Listing Main Title</span></label>
                            <input type="text" value={content.listingTitle || ''} onChange={e => setContent({ ...content, listingTitle: e.target.value })} className="admin-form-input font-bold text-black" placeholder="Available Houseboats" />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Listing Description Subtitle</span></label>
                            <textarea rows={3} value={content.listingSubtitle || ''} onChange={e => setContent({ ...content, listingSubtitle: e.target.value })} className="admin-form-input font-bold text-black" placeholder="From traditional deluxe boats to modern luxury cruisers, find your perfect stay on the water." />
                        </div>
                    </div>
                </div>

                {/* RULES & GUIDELINES SECTION */}
                <div className="admin-form-card !p-8" style={{ marginTop: '50px' }}>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><ListTodo size={22} /></div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Houseboat Rules & Guidelines</h3>
                            <p className="text-xs text-slate-400 font-bold">Configure onboard check-in times and stay policies</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {(content.rules || []).map((rule, idx) => (
                            <div key={idx} className="flex gap-3 items-center group">
                                <span className="text-xs font-black text-slate-300 w-6 text-right select-none">{idx + 1}.</span>
                                <input 
                                    type="text" 
                                    value={rule} 
                                    onChange={e => handleRuleChange(idx, e.target.value)} 
                                    className="admin-form-input font-medium text-black flex-1" 
                                    placeholder="Enter rule instruction..." 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveRule(idx)} 
                                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    title="Remove rule"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}

                        <div className="pt-4 flex justify-start">
                            <button 
                                type="button" 
                                onClick={handleAddRule} 
                                className="admin-btn admin-btn-secondary !h-10 !px-5 !rounded-lg flex items-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider"
                            >
                                <Plus size={14} /> Add New Rule
                            </button>
                        </div>
                    </div>
                </div>

                {/* HONEYMOON DELIGHTS & ADDITIONAL NOTES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginTop: '50px' }}>
                    {/* HONEYMOON DELIGHTS */}
                    <div className="admin-form-card !p-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                            <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500"><Heart size={18} /></div>
                            <div>
                                <h3 className="text-sm font-black text-black uppercase">Honeymoon Delights</h3>
                                <p className="text-[10px] text-slate-400 font-bold">Special highlights for honeymoon couple stay</p>
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Honeymoon Inclusions</span></label>
                            <input 
                                type="text" 
                                value={content.honeymoonDelights} 
                                onChange={e => setContent({ ...content, honeymoonDelights: e.target.value })} 
                                className="admin-form-input font-bold text-black" 
                                placeholder="Flower Bed Decoration, Candle light dinner & cake..." 
                            />
                        </div>
                    </div>

                    {/* ADDITIONAL WARNING NOTE */}
                    <div className="admin-form-card  !p-8" style={{ marginTop: '50px' }}>
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600"><Info size={18} /></div>
                            <div>
                                <h3 className="text-sm font-black text-black uppercase">Season Warning Note</h3>
                                <p className="text-[10px] text-slate-400 font-bold">Public holidays price warning description</p>
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label mb-2"><span className="text-black font-black text-[11px] uppercase tracking-wider">Note Text</span></label>
                            <input 
                                type="text" 
                                value={content.rulesNote} 
                                onChange={e => setContent({ ...content, rulesNote: e.target.value })} 
                                className="admin-form-input font-bold text-black" 
                                placeholder="Season rates / Hike rates for Pooja..." 
                            />
                        </div>
                    </div>
                </div>

                {/* ADDITIONAL DETAILS RICH TEXT EDITOR */}
                <div className="admin-form-card !p-8" style={{ marginTop: '50px' }}>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600"><ListTodo size={22} /></div>
                        <div>
                            <h3 className="text-lg font-black text-black uppercase">Additional Details</h3>
                            <p className="text-xs text-slate-400 font-bold">Write descriptions, FAQs, terms, or other rich content to render below rules</p>
                        </div>
                    </div>
                    <div className="admin-form-group animate-in fade-in duration-300">
                        <label className="admin-form-label mb-4"><span className="text-black font-black text-[11px] uppercase tracking-wider">Rich Text Content</span></label>
                        <RichTextEditor 
                            value={content.additionalDetails || ""} 
                            onChange={val => setContent({ ...content, additionalDetails: val })} 
                            height={400} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
