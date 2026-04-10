"use client";

import Link from 'next/link';
import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
    X, ChevronDown, ChevronRight, User, Heart, Info, Users, Contact,
    Home, Search, Phone, Mail, MapPin, Package, Calendar, Building2,
    Ship, Globe, Zap, MessageSquare, HelpCircle, Compass, Star, FileText
} from 'lucide-react';
import Image from 'next/image';
import EnquireModal from './EnquireModal';


const IconMap: Record<string, any> = {
    Home, Info, Users, Phone, Mail, MapPin, Heart, Package, Calendar, Building2,
    Ship, Globe, Zap, MessageSquare, HelpCircle, Star, Compass, FileText, Search, Contact, ClipboardList: FileText
};

const DynamicIcon = ({ name, size = 16, className = "" }: { name: string, size?: number, className?: string }) => {
    const IconComponent = IconMap[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} />;
};

const initialTourItems = [
    {
        name: 'Kerala Tour Packages',
        href: '/kerala-tour-packages',
        dropdown: []
    },
    {
        name: 'Domestic Tour Packages',
        href: '/domestic-tour-packages',
        dropdown: []
    },
    {
        name: 'International Tour Packages',
        href: '/international-tour-packages',
        dropdown: []
    },
    { name: 'Trending Destinations', href: '/trending' },
];

const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    {
        name: 'Tours',
        href: '#',
        dropdown: initialTourItems
    },
    { name: 'Events', href: '/events' },
    { name: 'Hotels', icon: 'Building2', href: '/hotels' },
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
    const [tourItems, setTourItems] = useState(initialTourItems);
    const pathname = usePathname();

    const [finalHeaderLinks, setFinalHeaderLinks] = useState<any[]>([]);
    const [finalSidebarLinks, setFinalSidebarLinks] = useState<any[]>([]);

    // Single sequential fetch: categories first, then nav options
    useEffect(() => {
        const fetchAll = async () => {
            // Step 1: Fetch categories and build populated tourItems
            let populatedTourItems = [...initialTourItems];
            try {
                const catRes = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
                const catJson = await catRes.json();

                if (catJson.success && Array.isArray(catJson.data)) {
                    const allCats = catJson.data;

                    const findChildren = (searchTerm: string) => {
                        const parent = allCats.find((c: any) =>
                            c.name?.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        if (!parent) return [];
                        const parentId = String(parent._id);
                        return allCats
                            .filter((c: any) => c.parent && String(c.parent) === parentId)
                            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                            .map((c: any) => ({
                                name: c.name || c.title || (c.slug ? c.slug.replace(/-/g, ' ').toUpperCase() : 'Unnamed'),
                                href: `/${c.slug}`,
                            }));
                    };

                    populatedTourItems = initialTourItems.map(item => {
                        const lname = (item.name || '').toLowerCase();
                        if (lname.includes('kerala')) return { ...item, dropdown: findChildren('kerala') };
                        if (lname.includes('domestic')) return { ...item, dropdown: findChildren('domestic') };
                        if (lname.includes('international')) return { ...item, dropdown: findChildren('international') };
                        return item;
                    });
                    setTourItems(populatedTourItems);
                }
            } catch (err) {
                console.error('Header categories fetch failed', err);
            }

            // Step 2: Build navLinks snapshot with fresh categories already injected
            const navWithCategories = navLinks.map(link =>
                link.name?.toLowerCase() === 'tours'
                    ? { ...link, dropdown: populatedTourItems }
                    : link
            );

            // Step 3: Fetch nav options and inject populated tourItems
            try {
                const res = await fetch(`${API_URL}/options`, { cache: 'no-store' });
                if (!res.headers.get('content-type')?.includes('application/json')) {
                    throw new Error(`Non-JSON response from ${res.url}`);
                }
                const json = await res.json();

                if (json.success) {
                    const hlOpt = json.data.find((o: any) => o.key === 'header_links');
                    if (hlOpt?.value) {
                        const dynamicH = JSON.parse(hlOpt.value);
                        if (Array.isArray(dynamicH) && dynamicH.length > 0) {
                            const mergedH = dynamicH.map((dl: any) => {
                                const match = navWithCategories.find(sl => sl.name?.toLowerCase() === dl.name?.toLowerCase());
                                return { ...dl, dropdown: match ? match.dropdown : undefined };
                            });
                            setFinalHeaderLinks(mergedH);
                        } else {
                            setFinalHeaderLinks(navWithCategories);
                        }
                    } else {
                        setFinalHeaderLinks(navWithCategories);
                    }

                    const slOpt = json.data.find((o: any) => o.key === 'sidebar_links');
                    if (slOpt?.value) {
                        const dynamicS = JSON.parse(slOpt.value);
                        if (Array.isArray(dynamicS) && dynamicS.length > 0) {
                            const mergedS = dynamicS.map((dl: any) => {
                                const match = navWithCategories.find(sl => sl.name?.toLowerCase() === dl.name?.toLowerCase());
                                return { ...dl, dropdown: match ? match.dropdown : undefined };
                            });
                            setFinalSidebarLinks(mergedS);
                        } else {
                            setFinalSidebarLinks(navWithCategories);
                        }
                    } else {
                        setFinalSidebarLinks(navWithCategories);
                    }

                    const logoOpt = json.data.find((o: any) => o.key === 'site_logo');
                    if (logoOpt?.value) setLogo(getImageUrl(logoOpt.value));
                } else {
                    setFinalHeaderLinks(navWithCategories);
                    setFinalSidebarLinks(navWithCategories);
                }
            } catch (err) {
                console.error('Header nav fetch failed', err);
                setFinalHeaderLinks(navWithCategories);
                setFinalSidebarLinks(navWithCategories);
            }
        };

        fetchAll();
    }, []);


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

    const [isSearchSticky, setIsSearchSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            // Sync with mobile search sticky state
            if (window.innerWidth <= 768) {
                const isSticky = document.body.classList.contains('mobile-search-sticky');
                setIsSearchSticky(isSticky);
            } else {
                setIsSearchSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cleanup stuck classes and states on route change
    useEffect(() => {
        setIsSearchSticky(false);
        setIsOpen(false);
        document.body.classList.remove('mobile-search-sticky');
        document.body.classList.remove('header-scrolled-controls');
    }, [pathname]);

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
        <header 
            className={scrolled ? 'scrolled' : ''}
            style={isSearchSticky ? { 
                opacity: 0, 
                zIndex: -1, 
                pointerEvents: 'none',
                transform: 'translateY(-50%)',
                transition: 'opacity 0.4s ease-in-out'
            } : {}}
        >
            <div className="homeContainer">
                <div className="headerInner">
                    {/* Logo */}
                    <Link href="/" className="brand">
                        <img
                            src={logo}
                            alt="WEGOMAP"
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
                                                    <Link href={sub.href} prefetch={false}>
                                                        {sub.name} {sub.dropdown && <ChevronRight size={14} className="ml-auto" />}
                                                    </Link>
                                                    {sub.dropdown && (
                                                        <ul className="dropdownMenu secondLevel">
                                                            {sub.dropdown.map((leaf: any) => (
                                                                <li key={leaf.name}>
                                                                    <Link href={leaf.href} prefetch={false}>{leaf.name}</Link>
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
                                            src={getImageUrl(userProfile.picture)}
                                            alt={userProfile.name || "Profile"}
                                            width={36}
                                            height={36}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <User size={30} strokeWidth={1.5} />
                                    )}

                                </button>

                                {isProfileOpen && (
                                    <div className="profileDropdown">
                                        <button 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                            aria-label="Close Profile Menu"
                                        >
                                            <X size={18} />
                                        </button>
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
                                    width={70}
                                    height={70}
                                    className="w-11 h-11 md:w-14 md:h-14 object-contain p-1"
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
                                    width={70}
                                    height={70}
                                    className="w-11 h-11 md:w-14 md:h-14 object-contain p-1"
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
                            alt="WEGOMAP"
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
                                <div className="mobileItemHeader" onClick={(e) => {
                                    if (!link.dropdown) setIsOpen(false);
                                }}>
                                    {link.dropdown ? (
                                        <div className="flex items-center w-full">
                                            {link.href && link.href !== '#' ? (
                                                <Link href={link.href} className="mobileLink flex-1" onClick={() => setIsOpen(false)}>
                                                    {link.name}
                                                </Link>
                                            ) : (
                                                <span className="mobileLink flex-1" onClick={() => toggleMobileMenu(link.name)}>
                                                    {link.name}
                                                </span>
                                            )}
                                            <button 
                                                className="p-2 -mr-2"
                                                onClick={(e) => { e.stopPropagation(); toggleMobileMenu(link.name); }}
                                            >
                                                <ChevronDown size={18} className={`transform transition-transform ${activeMobileMenu === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Link href={link.href} className="flex items-center w-full">
                                            {link.icon && <DynamicIcon name={link.icon} size={20} className="mr-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />}
                                            {link.name}
                                        </Link>
                                    )}
                                </div>

                                {link.dropdown && activeMobileMenu === link.name && (
                                    <div className="mobileSubMenu">
                                        {link.dropdown.map((sub: any) => (
                                            <div key={sub.name} className="mobileSubItem">
                                                <div className="mobileSubHeader">
                                                    {sub.dropdown ? (
                                                        <div className="flex items-center w-full">
                                                            {sub.href && sub.href !== '#' ? (
                                                                <Link href={sub.href} className="mobileSubLink flex-1" onClick={() => setIsOpen(false)}>
                                                                    {sub.name}
                                                                </Link>
                                                            ) : (
                                                                <span className="mobileSubLink flex-1" onClick={(e) => toggleSubMenu(e, sub.name)}>
                                                                    {sub.name}
                                                                </span>
                                                            )}
                                                            <button 
                                                                className="p-2 -mr-2"
                                                                onClick={(e) => toggleSubMenu(e, sub.name)}
                                                            >
                                                                <ChevronDown size={16} className={`transform transition-transform ${activeSubMenu === sub.name ? 'rotate-180' : ''}`} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Link href={sub.href} onClick={() => setIsOpen(false)}>{sub.name}</Link>
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

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="loginBtn"
                                style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }}
                            >
                                Log Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="loginBtn"
                                onClick={() => setIsOpen(false)}
                            >
                                Log In
                            </Link>
                        )}
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
