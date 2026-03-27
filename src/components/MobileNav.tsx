"use client";

import Link from 'next/link';
import { Home, Briefcase, Calendar, Bot, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Tours', href: '/packages', icon: Briefcase },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="mobileBottomNav">
            <div className="navContainer">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`navItem ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={18} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
