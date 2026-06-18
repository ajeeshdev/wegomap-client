"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Phone, ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function Footer() {
    const [options, setOptions] = useState<Record<string, string>>({});
    const fullText = options.footer_quote || "Traveling – It leaves you speechless, then turns you into a storyteller.";
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
                }
                const data = await res.json();

                if (data.success) {
                    const mappedOptions: Record<string, string> = {};
                    data.data.forEach((opt: any) => {
                        mappedOptions[opt.key] = opt.value;
                    });
                    setOptions(mappedOptions);
                }
            } catch (err) {
                console.error("Failed to load options from CMS", err);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        const handleTyping = () => {
            const currentText = fullText;
            const updatedText = isDeleting
                ? currentText.substring(0, displayedText.length - 1)
                : currentText.substring(0, displayedText.length + 1);

            setDisplayedText(updatedText);

            if (!isDeleting && updatedText === currentText) {
                setTypingSpeed(4000); // Wait 4 seconds after finishing typing
                setIsDeleting(true);
            } else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setTypingSpeed(500);
            } else {
                setTypingSpeed(isDeleting ? 40 : 80);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, typingSpeed, fullText]);

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { openEnquiry } = useEnquiry();

    useEffect(() => {
        const interval = setInterval(() => {
            openEnquiry("General Inquiry");
        }, 30000); // every 30 seconds
        return () => clearInterval(interval);
    }, [openEnquiry]);

    return (
        <footer className="mainFooter">
            <div className="homeContainer">
                <div className="footerWrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="quotes mb-5">
                                    <div className="quoteIconWrapper">
                                        <img
                                            src="/assets/site/assets/images/quote.png"
                                            className="d-block mx-auto quote-img"
                                            height="20"
                                            width="20"
                                            alt="Quote"
                                        />
                                    </div>
                                    <h3 className="primary-font quote-h3 mt-3">
                                        {displayedText}
                                        <span className="typing-cursor">|</span>
                                    </h3>
                                    <div className="quoteAuthorWrapper">
                                        <span className="authorLine"></span>
                                        <p className="authorName">{options.footer_author || "Ibn Battuta"}</p>
                                        <span className="authorLine"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 mx-auto mt-4">
                                <p className="special-reveal-text">{options.footer_reveal_text || "GREAT PLACES TO VISIT"}</p>
                                <h2 className="premium-title">{options.footer_cta_title || "Planning your next trip?"}</h2>
                                <p className="premium-subtitle">
                                    {options.footer_cta_subtitle || "Talk to our experts and get a detailed plan for your next trip"}
                                </p>

                                <div className="cta-container pt-4">
                                    <button 
                                        onClick={() => openEnquiry("General Inquiry")}
                                        className="luxeBtn luxury primary"
                                    >
                                        <span>Enquire Now</span>
                                        <ArrowUpRight size={18} className="cta-icon" />
                                    </button>
                                    <a href={`tel:${options.phone1 || '+918590370566'}`} className="luxeBtn luxury outline">
                                        <Phone size={18} />
                                        <span>Talk With Us</span>
                                    </a>
                                    <a 
                                        href={`https://wa.me/${(options.whatsapp || '918113998989').replace(/\D/g, '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="luxeBtn luxury outline whatsapp-cta-btn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                        </svg>
                                        <span>WhatsApp Us</span>
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="footer-bottom-v2 pt-3">

                                    <div className="footer-social-hub mt-4 mb-4">
                                        {options.facebook && <a href={options.facebook} className="social-pill" target="_blank" rel="noreferrer"><Facebook size={20} /></a>}
                                        {options.pinterest && <a href={options.pinterest} className="social-pill" target="_blank" rel="noreferrer"><Twitter size={20} /></a>}
                                        {options.instagram && <a href={options.instagram} className="social-pill" target="_blank" rel="noreferrer"><Instagram size={20} /></a>}
                                        {options.linkedin && <a href={options.linkedin} className="social-pill" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>}
                                        {!options.facebook && !options.pinterest && !options.instagram && !options.linkedin && (
                                            <>
                                                <a href="https://facebook.com/wegomap" className="social-pill" target="_blank" rel="noreferrer"><Facebook size={20} /></a>
                                                <a href="https://twitter.com/wegomap" className="social-pill" target="_blank" rel="noreferrer"><Twitter size={20} /></a>
                                                <a href="https://instagram.com/wegomap" className="social-pill" target="_blank" rel="noreferrer"><Instagram size={20} /></a>
                                                <a href="https://linkedin.com/company/wegomap" className="social-pill" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
                                            </>
                                        )}
                                    </div>
                                    <div className="footer-links-row">
                                        <ul className="premium-footer-links">
                                            {options.footer_links ? (() => {
                                                try {
                                                    const links = JSON.parse(options.footer_links);
                                                    return links.length > 0 ? links.map((link: any, idx: number) => (
                                                        <li key={idx}><Link href={link.href}>{link.name}</Link></li>
                                                    )) : (
                                                        <>
                                                            <li><Link href="/">Home</Link></li>
                                                            <li><Link href="/blogs">Blog</Link></li>
                                                            <li><Link href="/faq">FAQ</Link></li>
                                                            <li><Link href="/contact">Contact us</Link></li>
                                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                                            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                                                            <li><Link href="/refund-policy">Refund Policy</Link></li>
                                                        </>
                                                    );
                                                } catch (e) {
                                                    return (
                                                        <>
                                                            <li><Link href="/">Home</Link></li>
                                                            <li><Link href="/blogs">Blog</Link></li>
                                                            <li><Link href="/faq">FAQ</Link></li>
                                                            <li><Link href="/contact">Contact us</Link></li>
                                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                                            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                                                            <li><Link href="/refund-policy">Refund Policy</Link></li>
                                                        </>
                                                    );
                                                }
                                            })() : (
                                                <>
                                                    <li><Link href="/">Home</Link></li>
                                                    <li><Link href="/blogs">Blog</Link></li>
                                                    <li><Link href="/faq">FAQ</Link></li>
                                                    <li><Link href="/contact">Contact us</Link></li>
                                                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                                    <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                                                    <li><Link href="/refund-policy">Refund Policy</Link></li>
                                                </>
                                            )}
                                        </ul>
                                    </div>


                                    <div className="footer-copyright-v2 pb-4">
                                        <p>© {new Date().getFullYear()} WEGOMAP crafted with love.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Sticky Back to Top with Scroll Progress */}
            <button 
                onClick={scrollToTop} 
                className={`back-to-top-sticky ${scrollProgress > 5 ? 'visible' : ''}`}
                aria-label="Back to top"
            >
                <svg className="progress-circle" width="56" height="56" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="4"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="url(#progressGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="301.59"
                        strokeDashoffset={301.59 - (301.59 * scrollProgress) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FB923C" />
                            <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="arrow-icon">
                    <ArrowUpRight size={24} />
                </div>
            </button>
        </footer>
    );
}
