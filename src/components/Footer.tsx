"use client";

import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Phone, ArrowUpRight } from 'lucide-react';

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                                            src="/assests/site/assets/images/quote.png"
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
                                    <Link href="/enquire" className="luxeBtn luxury primary">
                                        <span>Enquire Now</span>
                                        <ArrowUpRight size={18} className="cta-icon" />
                                    </Link>
                                    <a href={`tel:${options.phone1 || '+918590370566'}`} className="luxeBtn luxury outline">
                                        <Phone size={18} />
                                        <span>Talk With Us</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="footer-bottom-v2 pt-3">

                                    <div className="footer-social-hub mt-4 mb-4">
                                        {options.fb && <a href={options.fb} className="social-pill" target="_blank" rel="noreferrer"><Facebook size={20} /></a>}
                                        {options.twitter && <a href={options.twitter} className="social-pill" target="_blank" rel="noreferrer"><Twitter size={20} /></a>}
                                        {options.instagram && <a href={options.instagram} className="social-pill" target="_blank" rel="noreferrer"><Instagram size={20} /></a>}
                                        {options.linkedin && <a href={options.linkedin} className="social-pill" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>}
                                        {!options.fb && !options.twitter && !options.instagram && !options.linkedin && (
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
                                        <p>{options.footer_copyright || "© 2026 Wegomap. All rights reserved."}</p>
                                        <button onClick={scrollToTop} className="back-to-top">
                                            <span>Back to Top</span>
                                            <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
