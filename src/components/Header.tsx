"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Tours', href: '/tours' },
    { name: 'Events', href: '/events' },
    { name: 'Cruises', href: '/cruise-packages' },
    { name: 'Payment', href: '/payment' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <div className="homeContainer">
                <div className="headerInner">
                    {/* Logo */}
                    <Link href="/" className="brand">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Wegomap"
                            width={180}
                            height={45}
                            className="h-8 md:h-11 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex">
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Action Buttons */}
                    <div className="button-wrapper hidden lg:flex">
                        <Link href="/enquire" className="enquire-link">
                            Enquire Now
                        </Link>
                        <Link href="/login" className="login-link">
                            Log In
                        </Link>

                        <button
                            className={`modernHamburger ${isOpen ? 'active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            <span className="line line-1"></span>
                            <span className="line line-2"></span>
                            <span className="line line-3"></span>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="mobileMenuToggle lg:hidden">
                        <button
                            className={`modernHamburger ${isOpen ? 'active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            <span className="line line-1"></span>
                            <span className="line line-2"></span>
                            <span className="line line-3"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Menu Backdrop */}
            {isOpen && (
                <div className="sideMenuBackdrop" onClick={() => setIsOpen(false)} />
            )}

            {/* Side Menu Panel */}
            <div className={`sideMenu ${isOpen ? 'open' : ''}`}>
                <div className="sideMenuContent">
                    <div className="sideMenuHeader">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Wegomap"
                            width={140}
                            height={35}
                            className="h-7 w-auto object-contain"
                        />
                        <button onClick={() => setIsOpen(false)} className="closeBtn">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="sideMenuNav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="sideMenuActions">
                        <Link
                            href="/enquire"
                            className="enquireBtn"
                            onClick={() => setIsOpen(false)}
                        >
                            Enquire Now
                        </Link>
                        <Link
                            href="/login"
                            className="loginBtn"
                            onClick={() => setIsOpen(false)}
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
