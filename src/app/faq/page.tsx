"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import DynamicPageBanner from '@/components/DynamicPageBanner';

interface FaqItem {
    question: string;
    answer: string;
    category: string;
}

interface FaqCategory {
    category: string;
    icon: string;
    items: FaqItem[];
}

const CATEGORY_ICONS: { [key: string]: string } = {
    'Booking & Packages': '🗓️',
    'Payments & Pricing': '💳',
    'Cancellations & Refunds': '🔄',
    'Travel & Accommodation': '🏨',
    'Kerala & Houseboats': '🌴',
    'General': '❓',
    'International & General': '🌍'
};

export default function FaqPage() {
    const [faqData, setFaqData] = useState<FaqCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [openCategory, setOpenCategory] = useState<number | null>(0);
    const [openItem, setOpenItem] = useState<string | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch(`${API_URL}/faqs`);
                const json = await res.json();
                if (json.success) {
                    const grouped = json.data.reduce((acc: any, item: FaqItem) => {
                        const cat = item.category || 'General';
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(item);
                        return acc;
                    }, {});

                    const formattedData: FaqCategory[] = Object.keys(grouped).map(cat => ({
                        category: cat,
                        icon: CATEGORY_ICONS[cat] || '❓',
                        items: grouped[cat]
                    }));
                    setFaqData(formattedData);
                }
            } catch (err) {
                console.error('Failed to fetch FAQs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const toggleCategory = (index: number) => {
        setOpenCategory(openCategory === index ? null : index);
        setOpenItem(null);
    };

    const toggleItem = (key: string) => {
        setOpenItem(openItem === key ? null : key);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading FAQs...</div>;
    }

    return (
        <div className="faqPage">
            <DynamicPageBanner
                fallbackTitle="Frequently Asked\nQuestions"
                fallbackSubtitle="Everything you need to know before you travel with WEGOMAP."
                fallbackPreTitle="Common Queries"
                breadcrumbs={[{ label: 'FAQ' }]}
            />

            <div className="faqBody homeContainer">
                {/* Intro */}
                <div className="sectionHeader flex items-center justify-center mb-12">
                    <div className="titleArea">
                        <span className="sectionSubtitle">Got Questions?</span>
                        <h2 className="sliderTitle">We Have <span className="highlight">Answers</span></h2>
                        <p className="text-slate-500 max-w-2xl text-[13px] leading-relaxed mx-auto">Browse through the most common questions our travellers ask. Can't find what you're looking for? Reach out to our team — we're always happy to help.</p>
                    </div>
                </div>

                {/* Accordion Categories */}
                <div className="faqAccordion">
                    {faqData.map((cat, catIdx) => (
                        <div key={catIdx} className={`faqCategory ${openCategory === catIdx ? 'open' : ''}`}>
                            {/* Category Header */}
                            <button
                                className="faqCatHeader"
                                onClick={() => toggleCategory(catIdx)}
                                aria-expanded={openCategory === catIdx}
                            >
                                <span className="faqCatIcon">{cat.icon}</span>
                                <span className="faqCatTitle">{cat.category}</span>
                                <span className="faqCatCount">{cat.items.length} questions</span>
                                <ChevronDown size={20} className="faqCatChevron" />
                            </button>

                            {/* Category Items */}
                            {openCategory === catIdx && (
                                <div className="faqItems">
                                    {cat.items.map((item, itemIdx) => {
                                        const key = `${catIdx}-${itemIdx}`;
                                        const isOpen = openItem === key;
                                        return (
                                            <div key={key} className={`faqItem ${isOpen ? 'open' : ''}`}>
                                                <button
                                                    className="faqQuestion"
                                                    onClick={() => toggleItem(key)}
                                                    aria-expanded={isOpen}
                                                >
                                                    <span>{item.question}</span>
                                                    <ChevronDown size={18} className="faqItemChevron" />
                                                </button>
                                                {isOpen && (
                                                    <div className="faqAnswer">
                                                        <p>{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Strip */}
                <div className="faqCta">
                    <div className="faqCtaContent">
                        <h3>Still have questions?</h3>
                        <p>Our travel experts are here to help you plan the perfect trip.</p>
                    </div>
                    <div className="faqCtaButtons">
                        <a href="tel:+918590370566" className="faqCtaBtn primary">
                            <Phone size={18} />
                            Call Us
                        </a>
                        <a href="https://wa.me/918590370566" target="_blank" rel="noreferrer" className="faqCtaBtn whatsapp">
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                        <Link href="/contact" className="faqCtaBtn outline">
                            <Mail size={18} />
                            Send Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
