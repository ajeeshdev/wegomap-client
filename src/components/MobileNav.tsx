"use client";

import Link from 'next/link';
import { Briefcase, Calendar, Ship, CreditCard, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Tours', href: '/packages', icon: Briefcase },
    { name: 'Events', href: '/corporate-event-management-company-kochi', icon: Calendar },
    { name: 'Cruises', href: '/cruise-packages', icon: Ship },
    { name: 'Payment', href: '/payment', icon: CreditCard },
    { name: 'Contact', href: '/contact', icon: Phone },
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
