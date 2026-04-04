import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Briefcase, Calendar, User, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pressingIndex, setPressingIndex] = useState<number | null>(null);

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
        { name: 'Myra AI', href: '#', icon: MessageCircle, isCentral: true },
        { name: 'Events', href: '/events', icon: Calendar },
        { name: 'Account', href: isLoggedIn ? '/dashboard' : '/login', icon: User },
    ];

    const activeIndex = navItems.findIndex(item => 
        item.href === '#' ? false : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
    );

    return (
        <div className="mobileBottomNavWrapper mmt-final-style">
            <nav className="mobileBottomNav">
                <div className="navContainer">
                    {navItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive = idx === activeIndex;
                        
                        if (item.isCentral) {
                            return (
                                <div key={item.name} className="centralNavItemWrapper">
                                    <a 
                                        href="https://wa.me/918590370566"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="centralNavItem animated"
                                    >
                                        <img 
                                            src="https://promos.makemytrip.com/images/circular_cropped_cleaned_animation.webp" 
                                            alt="Chat Assistant"
                                            className="centralAnimatedIcon"
                                        />
                                    </a>
                                    <span className="navLabel centralLabel">Chat with us</span>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`navItem ${isActive ? 'active' : ''}`}
                            >
                                <div className="iconWrapper">
                                    <Icon size={24} />
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
