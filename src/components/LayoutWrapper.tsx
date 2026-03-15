"use client";

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MyraBot from "@/components/MyraBot";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Pages that should NOT show the main header/footer
    const isAuthPage = pathname === '/login' || pathname === '/admin-login';
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAuthPage || isAdminPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <MobileNav />
            <FloatingWhatsApp />
            <MyraBot />
        </>
    );
}
