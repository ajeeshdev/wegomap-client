import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Briefcase, Calendar, User, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Tours', href: '/packages', icon: Briefcase },
        { name: 'Events', href: '/events', icon: Calendar },
        { name: 'Profile', href: isLoggedIn ? '/dashboard' : '/login', icon: User },
    ];

    return (
        <div className="mobileBottomNavWrapper">
            <nav className="mobileBottomNav">
                <div className="navContainer">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === '/' 
                            ? pathname === '/' 
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`navItem ${isActive ? 'active' : ''}`}
                            >
                                <div className="iconWrapper">
                                    <Icon size={22} />
                                </div>
                                <span className="navLabel">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
