"use client";

import React from 'react';

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/918590370566" // Replaced with actual phone number if one exists, using the one from Footer (+918590370566)
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label="Chat on WhatsApp"
        >
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
