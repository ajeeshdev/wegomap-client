"use client";

import { API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Briefcase, Building, Plane, Globe, MapPin, Anchor } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    order: number;
}

const IconDisplay = ({ iconName }: { iconName: string }) => {
    // @ts-ignore
    const IconComponent = LucideIcons[iconName] || LucideIcons.Globe;
    return <IconComponent size={32} />;
};

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [pageContent, setPageContent] = useState({
        subtitle: "Comprehensive Solutions",
        title: "Your journey,",
        highlightText: "our expertise.",
        description: "Wegomap offers comprehensive solutions for all your travel needs. From booking your initial transport to finding the perfect accommodation, our dedicated team manages everything so you can focus on building beautiful memories."
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadContent() {
            try {
                const [servicesRes, optionsRes] = await Promise.all([
                    fetch(`${API_URL}/services`),
                    fetch(`${API_URL}/options`)
                ]);

                const servicesData = await servicesRes.json();
                if (servicesData.success) {
                    setServices(servicesData.data.filter((s: any) => s.status === 'Active'));
                }

                const optionsData = await optionsRes.json();
                if (optionsData.success) {
                    const contentOpt = optionsData.data.find((o: any) => o.key === 'services_page_content');
                    if (contentOpt) {
                        try {
                            const parsed = JSON.parse(contentOpt.value);
                            if (parsed.intro) setPageContent(parsed.intro);
                        } catch (e) {}
                    }
                }
            } catch (err) {
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, []);

    return (
        <div className="servicesListingPage">
            <DynamicPageBanner
                fallbackTitle="Our Services"
                fallbackSubtitle="Traveling – It leaves you speechless, then turns you into a storyteller."
                fallbackImage="/assets/images/banners/about-banner.png"
                breadcrumbs={[{ label: 'Services' }]}
            />

            {/* Main Content */}
            <section className="infoBodySection px-4 md:px-0 py-20 pb-40">
                <div className="homeContainer">
                    <div className="max-w-3xl mx-auto text-center mb-24">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">{pageContent.subtitle}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-8 leading-[1.1]">
                            {pageContent.title} <br />
                            <span className="text-orange-500">{pageContent.highlightText}</span>
                        </h2>
                        <p className="text-slate-500 font-bold text-lg leading-relaxed">
                            {pageContent.description}
                        </p>
                    </div>

                    {loading ? (
                        <div className="w-full py-20 flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Service Grid...</p>
                        </div>
                    ) : (
                        <div className="infoGrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
