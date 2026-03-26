"use client";

import Link from 'next/link';
import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect, useRef } from 'react';
import {
    X, ChevronDown, ChevronRight, User, Heart, Info, Users, Contact,
    Home, Search, Phone, Mail, MapPin, Package, Calendar,
    Ship, Globe, Zap, MessageSquare, HelpCircle, Compass, Star, FileText
} from 'lucide-react';
import Image from 'next/image';
import EnquireModal from './EnquireModal';


const IconMap: Record<string, any> = {
    Home, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar,
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact, ClipboardList: FileText
};

const DynamicIcon = ({ name, size = 16, className = "" }: { name: string, size?: number, className?: string }) => {
    const IconComponent = IconMap[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} />;
};

const keralaSubItems = [
    { name: 'Kerala Honeymoon Packages', href: '/kerala-honeymoon-packages' },
    { name: 'Kerala Family Tour Packages', href: '/kerala-family-tour-packages' },
    { name: 'Kerala Packages from Bangalore', href: '/kerala-tour-packages-from-bangalore' },
];

const domesticItems = [
    { name: 'Manali Tour Packages', href: '/manali-tour-packages' },
    { name: 'Goa Tour Packages', href: '/goa-tour-packages-from-kerala' },
    { name: 'Ooty Tour Packages', href: '/ooty-tour-packages' },
    { name: 'Kodaikanal Tour Packages', href: '/kodaikanal-tour-packages' },
    { name: 'Coorg Tour Package', href: '/coorg-tour-package' },
    { name: 'Ooty & Kodaikanal Packages', href: '/ooty-kodaikanal-tour-packages' },
    { name: 'Coorg / Mysore / Ooty', href: '/coorg-mysore-ooty' },
    { name: 'Andaman Packages', href: '/andaman-packages' },
    { name: 'Varanasi Package', href: '/varanasi-package' },
    { name: 'Leh Ladakh Tour Package', href: '/leh-ladakh-tour-package' },
    { name: 'Kashmir Holiday Package', href: '/kashmir-holiday-package' },
    { name: 'Rajasthan Tour package', href: '/rajasthan-tour-package' },
    { name: 'Golden Triangle Tour Package', href: '/golden-triangle-tour-package' },
    { name: 'Meghalaya Tour Package', href: '/meghalaya-tour-package' },
    { name: 'Lakshadweep Tour Package', href: '/lakshadweep-tour-package' },
    { name: 'Darjeeling Tour Package', href: '/darjeeling' },
];

const internationalItems = [
    { name: 'Maldives Tour Packages', href: '/maldives-tour-packages-from-kochi-kerala' },
    { name: 'Thailand Tour Packages', href: '/thailand-tour-packages-from-kochi-kerala' },
    { name: 'Bali Tour Packages', href: '/bali-tour-packages-from-kochi-kerala' },
    { name: 'Dubai Tour Packages', href: '/dubai-tour-packages' },
    { name: 'Malaysia Tour Packages', href: '/malaysia-tour-packages-from-kochi-kerala' },
    { name: 'Singapore Tour Package', href: '/singapore-tour-package' },
    { name: 'Azerbaijan Tour Packages', href: '/azerbaijan-tour-packages' },
    { name: 'Vietnam Package', href: '/vietnam-package' },
    { name: 'Bhutan Package', href: '/bhutan-packages' },
    { name: 'Nepal Tour Packages', href: '/nepal-tour-packages' },
    { name: 'Sri Lanka Tour Package', href: '/sri-lanka' },
];

const tourItems = [
    {
        name: 'Kerala Tour Packages',
        href: '/kerala-tour-packages',
        dropdown: keralaSubItems
    },
    {
        name: 'Domestic Tour Packages',
        href: '/domestic-tour-packages',
        dropdown: domesticItems
    },
    {
        name: 'International Tour Packages',
        href: '/international-tour-packages',
        dropdown: internationalItems
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
    { name: 'Events', href: '/events' },
    { name: 'Cruises', href: '/cruise-packages' },
    { name: 'Payment', href: '/payment' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'FAQ', href: '/faq' },
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
    const [logo, setLogo] = useState('/assets/images/logo.png');
    const [isEnquireOpen, setIsEnquireOpen] = useState(false);
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
            const token = localStorage.getItem('token');
            const profile = localStorage.getItem('userProfile');

            if (token && profile) {
                setIsLoggedIn(true);
                try {
                    setUserProfile(JSON.parse(profile));
                } catch (e) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
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

    const [finalHeaderLinks, setFinalHeaderLinks] = useState(navLinks);
    const [finalSidebarLinks, setFinalSidebarLinks] = useState(navLinks);

    useEffect(() => {
        const fetchNav = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`API returned non-JSON response from ${res.url} (Status: ${res.status})`);
                }
                const json = await res.json();

                if (json.success) {
                    const hlOpt = json.data.find((o: any) => o.key === 'header_links');
                    if (hlOpt && hlOpt.value) {
                        const dynamicH = JSON.parse(hlOpt.value);
                        if (Array.isArray(dynamicH) && dynamicH.length > 0) {
                            const mergedH = dynamicH.map((dl: any) => {
                                const staticMatch = navLinks.find(sl => sl.name.toLowerCase() === dl.name.toLowerCase());
                                return { ...dl, dropdown: staticMatch ? staticMatch.dropdown : undefined };
                            });
                            setFinalHeaderLinks(mergedH);
                        }
                    }

                    const slOpt = json.data.find((o: any) => o.key === 'sidebar_links');
                    if (slOpt && slOpt.value) {
                        const dynamicS = JSON.parse(slOpt.value);
                        if (Array.isArray(dynamicS) && dynamicS.length > 0) {
                            const mergedS = dynamicS.map((dl: any) => {
                                const staticMatch = navLinks.find(sl => sl.name.toLowerCase() === dl.name.toLowerCase());
                                return { ...dl, dropdown: staticMatch ? staticMatch.dropdown : undefined };
                            });
                            setFinalSidebarLinks(mergedS);
                        }
                    }

                    const logoOpt = json.data.find((o: any) => o.key === 'site_logo');
                    if (logoOpt && logoOpt.value) {
                        setLogo(getImageUrl(logoOpt.value));
                    }
                }
            } catch (err) {
                console.error('Failed to fetch nav', err);
            }
        };
        fetchNav();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
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
                        <img
                            src={logo}
                            alt="Wegomap"
                            width={180}
                            height={45}
                            className="h-8 md:h-11 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex">
                        <ul className="mainNav">
                            {finalHeaderLinks.map((link: any) => (
                                <li key={link.name} className={link.dropdown ? 'hasDropdown' : ''}>
                                    <Link href={link.href} className="navLink">
                                        {link.icon && <DynamicIcon name={link.icon} size={14} className="mr-2" />}
                                        {link.name} {link.dropdown && <ChevronDown size={14} className="ml-1" />}
                                    </Link>

                                    {link.dropdown && (
                                        <ul className="dropdownMenu firstLevel">
                                            {link.dropdown.map((sub: any) => (
                                                <li key={sub.name} className={sub.dropdown ? 'hasSubDropdown' : ''}>
                                                    <Link href={sub.href}>
                                                        {sub.name} {sub.dropdown && <ChevronRight size={14} className="ml-auto" />}
                                                    </Link>
                                                    {sub.dropdown && (
                                                        <ul className="dropdownMenu secondLevel">
                                                            {sub.dropdown.map((leaf: any) => (
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
                                            <Link href="/dashboard" onClick={() => setIsProfileOpen(false)}>
                                                <User size={20} /> Dashboard
                                            </Link>
                                        </div>
                                        <div className="dropdownItem">
                                            <Link href="/wishlist" onClick={() => setIsProfileOpen(false)}>
                                                <Heart size={20} /> wishlist
                                            </Link>
                                        </div>
                                        {/* <div className="dropdownItem">
                                            <Link href="/my-booking" onClick={() => setIsProfileOpen(false)}>
                                                <Info size={20} /> My booking
                                            </Link>
                                        </div>
                                        <div className="dropdownItem">
                                            <Link href="/partner-with-us" onClick={() => setIsProfileOpen(false)}>
                                                <Users size={20} /> Partner with us
                                            </Link>
                                        </div> */}
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
                                <button 
                                    onClick={() => setIsEnquireOpen(true)} 
                                    className="enquire-link"
                                >
                                    Enquire Now
                                </button>

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
                            {isOpen ? (
                                <>
                                    <span className="line line-1"></span>
                                    <span className="line line-2"></span>
                                    <span className="line line-3"></span>
                                </>
                            ) : (
                                <Image
                                    src="/assets/images/go-globe.png"
                                    alt="Menu"
                                    width={40}
                                    height={40}
                                    className="w-small h-small object-contain p-1"
                                />
                            )}
                        </button>
                    </div>

                    <div className="mobileMenuToggle lg:hidden">
                        <button
                            className={`modernHamburger ${isOpen ? 'active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <>
                                    <span className="line line-1"></span>
                                    <span className="line line-2"></span>
                                    <span className="line line-3"></span>
                                </>
                            ) : (
                                <Image
                                    src="/assets/images/go-globe.png"
                                    alt="Menu"
                                    width={40}
                                    height={40}
                                    className="w-small h-small object-contain p-1"
                                />
                            )}
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
                        <img
                            src={logo}
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
                        {finalSidebarLinks.map((link: any) => (
                            <div key={link.name} className="mobileMenuItem">
                                <div className="mobileItemHeader" onClick={() => link.dropdown ? toggleMobileMenu(link.name) : setIsOpen(false)}>
                                    {link.dropdown ? (
                                        <span className="mobileLink">
                                            {link.name}
                                            <ChevronDown size={18} className={`transform transition-transform ${activeMobileMenu === link.name ? 'rotate-180' : ''}`} />
                                        </span>
                                    ) : (
                                        <Link href={link.href} className="flex items-center">
                                            {link.icon && <DynamicIcon name={link.icon} size={20} className="mr-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />}
                                            {link.name}
                                        </Link>
                                    )}
                                </div>

                                {link.dropdown && activeMobileMenu === link.name && (
                                    <div className="mobileSubMenu">
                                        {link.dropdown.map((sub: any) => (
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
                                                        {sub.dropdown.map((leaf: any) => (
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
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setIsEnquireOpen(true);
                            }}
                            className="enquireBtn"
                        >
                            Enquire Now
                        </button>

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
            <EnquireModal 
                isOpen={isEnquireOpen} 
                onClose={() => setIsEnquireOpen(false)} 
                packageName="General Inquiry" 
            />
        </header>

    );
}
