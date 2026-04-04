"use client";

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MyraBot from "@/components/MyraBot";

import { useEnquiry } from '@/context/EnquiryContext';

import CommonTestimonials from "@/components/CommonTestimonials";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { hideLayout } = useEnquiry();
    
    const isAuthPage = pathname === '/login';
    const isAdminPage = pathname?.startsWith('/admin');
    const showLayout = !isAuthPage && !isAdminPage && !hideLayout;

    return (
        <>
            {showLayout && <Header />}
            <main>{children}</main>
            {showLayout && (
                <>
                    <CommonTestimonials />
                    <Footer />
                    <MobileNav />
                    <FloatingWhatsApp />
                    <MyraBot />
                </>
            )}
        </>
    );
}
