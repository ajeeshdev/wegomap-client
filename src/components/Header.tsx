"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const keralaSubItems = [
    { name: 'Kerala Honeymoon Packages', href: '/kerala-honeymoon-packages' },
    { name: 'Kerala Family Tour Packages', href: '/kerala-family-tour-packages' },
    { name: 'Kerala Packages from Bangalore', href: '/kerala-tour-packages-from-bangalore' },
];

const domesticInternationalItems = [
    { name: 'Manali Tour Packages', href: '/manali-tour-packages' },
    { name: 'Goa Tour Packages', href: '/goa-tour-packages-from-kerala' },
    { name: 'Maldives Tour Packages', href: '/maldives-tour-packages-from-kochi-kerala' },
    { name: 'Thailand Tour Packages', href: '/thailand-tour-packages-from-kochi-kerala' },
    { name: 'Nepal Tour Packages', href: '/nepal-tour-packages' },
    { name: 'Ooty Tour Packages', href: '/ooty-tour-packages' },
    { name: 'Kodaikanal Tour Packages', href: '/kodaikanal-tour-packages' },
    { name: 'Coorg Tour Package', href: '/coorg-tour-package' },
    { name: 'Ooty & Kodaikanal Packages', href: '/ooty-kodaikanal-tour-packages' },
    { name: 'Coorg / Mysore / Ooty', href: '/coorg-mysore-ooty' },
    { name: 'Bali Tour Packages', href: '/bali-tour-packages-from-kochi-kerala' },
    { name: 'Dubai Tour Packages', href: '/dubai-tour-packages' },
    { name: 'Andaman Packages', href: '/andaman-packages' },
    { name: 'Varanasi Package', href: '/varanasi-package' },
    { name: 'Leh Ladakh Tour Package', href: '/leh-ladakh-tour-package' },
    { name: 'Kashmir Holiday Package', href: '/kashmir-holiday-package' },
    { name: 'Bhutan Package', href: '/bhutan-packages' },
    { name: 'Darjeeling Tour Package', href: '/darjeeling' },
    { name: 'Malaysia Tour Packages', href: '/malaysia-tour-packages-from-kochi-kerala' },
    { name: 'Sri Lanka Tour Package', href: '/sri-lanka' },
    { name: 'Lakshadweep Tour Package', href: '/lakshadweep-tour-package' },
    { name: 'Singapore Tour Package', href: '/singapore-tour-package' },
    { name: 'Rajasthan Tour package', href: '/rajasthan-tour-package' },
    { name: 'Golden Triangle Tour Package', href: '/golden-triangle-tour-package' },
    { name: 'Meghalaya Tour Package', href: '/meghalaya-tour-package' },
    { name: 'Azerbaijan Tour Packages', href: '/azerbaijan-tour-packages' },
    { name: 'Vietnam Package', href: '/vietnam-package' },
];

const tourItems = [
    {
        name: 'Kerala Tour Packages',
        href: '/kerala-tour-packages',
        dropdown: keralaSubItems
    },
    {
        name: 'Domestic & International Packages',
        href: '/domestic-international-packages',
        dropdown: domesticInternationalItems
    },
    { name: 'Trending Destinations', href: '/trending' },
];

const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    {
        name: 'Tours',
        href: '#',
        dropdown: tourItems
    },
    { name: 'Events', href: '/corporate-event-management-company-kochi' },
    { name: 'Cruises', href: '/cruise-packages' },
    { name: 'Payment', href: '/payment' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = (name: string) => {
        setActiveMobileMenu(activeMobileMenu === name ? null : name);
    };

    const toggleSubMenu = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        setActiveSubMenu(activeSubMenu === name ? null : name);
    };

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
                        <ul className="mainNav">
                            {navLinks.map((link) => (
                                <li key={link.name} className={link.dropdown ? 'hasDropdown' : ''}>
                                    <Link href={link.href} className="navLink">
                                        {link.name} {link.dropdown && <ChevronDown size={14} className="ml-1" />}
                                    </Link>

                                    {link.dropdown && (
                                        <ul className="dropdownMenu firstLevel">
                                            {link.dropdown.map((sub) => (
                                                <li key={sub.name} className={sub.dropdown ? 'hasSubDropdown' : ''}>
                                                    <Link href={sub.href}>
                                                        {sub.name} {sub.dropdown && <ChevronRight size={14} className="ml-auto" />}
                                                    </Link>
                                                    {sub.dropdown && (
                                                        <ul className="dropdownMenu secondLevel">
                                                            {sub.dropdown.map((leaf) => (
                                                                <li key={leaf.name}>
                                                                    <Link href={leaf.href}>{leaf.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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
                            <div key={link.name} className="mobileMenuItem">
                                <div className="mobileItemHeader" onClick={() => link.dropdown ? toggleMobileMenu(link.name) : setIsOpen(false)}>
                                    {link.dropdown ? (
                                        <span className="mobileLink">
                                            {link.name}
                                            <ChevronDown size={18} className={`transform transition-transform ${activeMobileMenu === link.name ? 'rotate-180' : ''}`} />
                                        </span>
                                    ) : (
                                        <Link href={link.href}>{link.name}</Link>
                                    )}
                                </div>

                                {link.dropdown && activeMobileMenu === link.name && (
                                    <div className="mobileSubMenu">
                                        {link.dropdown.map((sub) => (
                                            <div key={sub.name} className="mobileSubItem">
                                                <div className="mobileSubHeader" onClick={(e) => sub.dropdown ? toggleSubMenu(e, sub.name) : setIsOpen(false)}>
                                                    {sub.dropdown ? (
                                                        <span className="mobileSubLink">
                                                            {sub.name}
                                                            <ChevronDown size={16} className={`transform transition-transform ${activeSubMenu === sub.name ? 'rotate-180' : ''}`} />
                                                        </span>
                                                    ) : (
                                                        <Link href={sub.href}>{sub.name}</Link>
                                                    )}
                                                </div>

                                                {sub.dropdown && activeSubMenu === sub.name && (
                                                    <div className="mobileLeafMenu">
                                                        {sub.dropdown.map((leaf) => (
                                                            <Link key={leaf.name} href={leaf.href} onClick={() => setIsOpen(false)}>
                                                                {leaf.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
