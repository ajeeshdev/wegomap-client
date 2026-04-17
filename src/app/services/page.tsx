"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Check, Scissors, Layers, Settings, HelpCircle } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

// Icon Display Component
const IconDisplay = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
        case 'Plus': return <Plus size={32} />;
        case 'Check': return <Check size={32} />;
        case 'Scissors': return <Scissors size={32} />;
        case 'Layers': return <Layers size={32} />;
        case 'Settings': return <Settings size={32} />;
        case 'HelpCircle': return <HelpCircle size={32} />;
        default: return <Settings size={32} />;
    }
};

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [bannerData, setBannerData] = useState<any>({});
    const [introData, setIntroData] = useState({
        subtitle: "YOUR JOURNEY, YOUR EXPERTISE.",
        title: "Comprehensive",
        highlightText: "Solutions.",
        description: "Discover our range of professional travel services designed to make your journey seamless, from hotel bookings to event management and private transport."
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/services`);
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`API returned non-JSON response: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                if (data.success) {
                    setServices(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch services:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchCmsData = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const json = await res.json();
                if (json.success && json.data) {
                    const opt = json.data.find((o: any) => o.key === 'services_page_content');
                    if (opt) {
                        const parsed = JSON.parse(opt.value);
                        if (parsed.banner) setBannerData(parsed.banner);
                        if (parsed.intro) setIntroData(prev => ({ ...prev, ...parsed.intro }));
                    }
                }
            } catch (err) { console.error(err); }
        };

        fetchServices();
        fetchCmsData();
    }, []);

    return (
        <div className="servicesListingPage">
            <DynamicPageBanner
                title={bannerData.title || undefined}
                subtitle={bannerData.subtitle || undefined}
                preTitle={bannerData.preTitle || undefined}
                fallbackTitle="Our Services"
                fallbackSubtitle="Traveling – It leaves you speechless, then turns you into a storyteller."
                fallbackPreTitle="Premium Offerings"
                fallbackImage={bannerData.image || "/assets/images/banners/about-banner.png"}
                breadcrumbs={[{ label: 'Services' }]}
                variant="standard"
                skipApiFetch={true}
            />

            {/* Main Content */}
            <section className="infoBodySection px-4 md:px-0 py-20 pb-40">
                <div className="homeContainer">
                    <div className="sectionHeader flex items-center justify-center mb-20">
                        <div className="titleArea">
                            <span className="sectionSubtitle">{introData.subtitle}</span>
                            <h2 className="sliderTitle">
                                {introData.title} {introData.highlightText}
                            </h2>
                            <div className="sectionHeaderDescription mt-0 max-w-3xl text-slate-500 font-medium leading-relaxed">
                                {introData.description}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="infoGrid">
                            {services.map((s, i) => (
                                <div key={s._id} className="infoCard group hover:scale-[1.02] transition-all duration-500">
                                    <Link href={s.link || '/contact'} style={{ display: 'block', textDecoration: 'none' }}>
                                        <div className="infoCardNumber">{(i + 1).toString().padStart(2, '0')}</div>
                                        <div className="infoCardIcon transition-transform group-hover:scale-110 duration-500">
                                            <IconDisplay iconName={s.icon} />
                                        </div>
                                        <h2 className="infoCardTitle group-hover:text-orange-500 transition-colors">{s.title}</h2>
                                        <p className="infoCardDesc text-slate-500 font-medium">{s.description}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
