"use client";

import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';

export default function FloatingWhatsApp() {
    const [whatsappNumber, setWhatsappNumber] = useState('918590370566');

    useEffect(() => {
        const fetchWhatsApp = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const data = await res.json();
                if (data.success) {
                    const whatsappOpt = data.data.find((opt: any) => opt.key === 'whatsapp');
                    if (whatsappOpt?.value) {
                        // Clean the number from any non-numeric characters for the wa.me link
                        const cleaned = whatsappOpt.value.replace(/\D/g, '');
                        setWhatsappNumber(cleaned);
                    }
                }
            } catch (err) {
                console.error("Failed to load WhatsApp number from CMS", err);
            }
        };
        fetchWhatsApp();
    }, []);

    return (
        <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label="Chat on WhatsApp"
        >
            <span className="tooltip-text">Chat with us</span>
            <img
                src="/assets/images/myrabot.webp"
                alt="Myra bot"
                width={60}
                height={60}
                className="bot-image"
            />
        </a>
    );
}
