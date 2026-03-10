"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, User, Heart, Info, Users, Contact } from 'lucide-react';
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Auth State
    useEffect(() => {
        const checkAuth = () => {
            const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedIn);
            if (loggedIn) {
                const profile = localStorage.getItem('userProfile');
                if (profile) {
                    try {
                        setUserProfile(JSON.parse(profile));
                    } catch (e) { }
                }
            } else {
                setUserProfile(null);
            }
        };
        checkAuth(); // Initial check

        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userProfile');
        setIsLoggedIn(false);
        setUserProfile(null);
        setIsProfileOpen(false);
        window.dispatchEvent(new Event('authChange'));
    };

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
                    <div className="button-wrapper hidden lg:flex" ref={profileRef}>
                        {isLoggedIn ? (
                            <div className="profileWrapper">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="profileBtn"
                                    aria-label="Profile Menu"
                                    style={{ padding: userProfile?.picture ? '0' : '0.4rem', overflow: 'hidden' }}
                                >
                                    {userProfile?.picture ? (
                                        <Image
                                            src={userProfile.picture}
                                            alt={userProfile.name || "Profile"}
                                            width={36}
                                            height={36}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <User size={28} strokeWidth={1.5} />
                                    )}
                                </button>

                                {isProfileOpen && (
                                    <div className="profileDropdown">
                                        {userProfile?.name && (
                                            <div className="dropdownItem" style={{ pointerEvents: 'none', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0f172a' }}>{userProfile.name}</span>
                                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{userProfile.email}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="dropdownItem">
                                            <Link href="/wishlist" onClick={() => setIsProfileOpen(false)}>
                                                <Heart size={20} /> wishlist
                                            </Link>
                                        </div>
                                        <div className="dropdownItem">
                                            <Link href="/my-booking" onClick={() => setIsProfileOpen(false)}>
                                                <Info size={20} /> My booking
                                            </Link>
                                        </div>
                                        <div className="dropdownItem">
                                            <Link href="/partner-with-us" onClick={() => setIsProfileOpen(false)}>
                                                <Users size={20} /> Partner with us
                                            </Link>
                                        </div>
                                        <div className="dropdownItem">
                                            <Link href="/contact" onClick={() => setIsProfileOpen(false)}>
                                                <Contact size={20} /> Contact us
                                            </Link>
                                        </div>
                                        <div className="dropdownDivider"></div>
                                        <div className="dropdownItem">
                                            <button onClick={handleLogout} className="logoutBtn">
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/enquire" className="enquire-link">
                                    Enquire Now
                                </Link>
                                <Link href="/login" className="login-link">
                                    Log In
                                </Link>
                            </>
                        )}

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
