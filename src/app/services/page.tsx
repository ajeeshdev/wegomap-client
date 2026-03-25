"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Check, Scissors, Layers, Settings, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

// Mock Icon Display Component
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

const pageContent = {
    title: "Comprehensive",
    highlightText: "Solutions.",
    subtitle: "YOUR JOURNEY, YOUR EXPERTISE.",
    description: "Discover our range of professional travel services designed to make your journey seamless, from hotel bookings to event management and private transport."
};

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/services`);
                
                // Safety check for JSON content-type
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
        fetchServices();
    }, []);

    return (
        <div className="servicesListingPage">
            <DynamicPageBanner
                fallbackTitle="Our Services"
                fallbackSubtitle="Traveling – It leaves you speechless, then turns you into a storyteller."
                fallbackPreTitle="Premium Offerings"
                fallbackImage="/assets/images/banners/about-banner.png"
                breadcrumbs={[{ label: 'Services' }]}
                variant="standard"
            />

            {/* Main Content */}
            <section className="infoBodySection px-4 md:px-0 py-20 pb-40">
                <div className="homeContainer">
                    <div className="sectionHeader flex items-center justify-center mb-20">
                        <div className="titleArea">
                            <span className="sectionSubtitle">{pageContent.subtitle}</span>
                            <h2 className="sliderTitle">
                                {pageContent.title} <span className="text-orange-500 italic">{pageContent.highlightText}</span>
                            </h2>
                            <div className="sectionHeaderDescription mt-4 max-w-3xl text-slate-500 font-medium leading-relaxed">
                                {pageContent.description}
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

                    {/* Additional Sub-services or CTA */}
        
                </div>
            </section>
        </div>
    );
}
