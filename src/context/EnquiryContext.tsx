"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import EnquireModal from '@/components/EnquireModal';

interface EnquiryContextType {
    openEnquiry: (packageName?: string) => void;
    closeEnquiry: () => void;
    hideLayout: boolean;
    setHideLayout: (hide: boolean) => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pkgName, setPkgName] = useState('General Inquiry');
    const [hideLayout, setHideLayout] = useState(false);

    const openEnquiry = (packageName?: string) => {
        setPkgName(packageName || 'General Inquiry');
        setIsOpen(true);
    };

    const closeEnquiry = () => {
        setIsOpen(false);
    };

    return (
        <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry, hideLayout, setHideLayout }}>
            {children}
            <EnquireModal 
                isOpen={isOpen} 
                onClose={closeEnquiry} 
                packageName={pkgName} 
            />
        </EnquiryContext.Provider>
    );
}

export function useEnquiry() {
    const context = useContext(EnquiryContext);
    if (context === undefined) {
        throw new Error('useEnquiry must be used within an EnquiryProvider');
    }
    return context;
}
