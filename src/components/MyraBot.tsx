"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Bot, ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export default function MyraBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const quickOptions = [
        { label: 'Plan a Kerala Trip', icon: MapPin },
        { label: 'Best Time to Visit', icon: Calendar },
        { label: 'Special Offers', icon: Tag },
    ];

    useEffect(() => {
        // Initial Greeting
        if (messages.length === 0) {
            setMessages([{
                id: '1',
                text: "Hi! I'm Myra, your AI Travel Assistant. How can I help you plan your dream vacation today?",
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let botText = "That's a great question! I'm currently learning more about our latest packages. Would you like me to connect you with a travel expert for personalized advice?";
            
            if (text.toLowerCase().includes('kerala')) {
                botText = "Kerala is a breathtaking destination! We have some amazing 5-night packages covering Munnar, Thekkady, and Alleppey. Would you like to see them?";
            } else if (text.toLowerCase().includes('offer') || text.toLowerCase().includes('discount')) {
                botText = "We have an early bird discount of 15% on all summer bookings! Type 'PROMO15' during enquiry to avail it.";
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(inputText);
    };

    return (
        <div className="myra-bot-fixed">
            {/* Pulsing Trigger Button */}
            <div 
                className={`myra-trigger ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X size={28} className="text-slate-600" />
                ) : (
                    <>
                        <div className="bot-icon-wrapper">
                           <Image 
                                src="/assets/images/go-globe.png" 
                                alt="Myra" 
                                width={45} 
                                height={45}
                                className="object-contain"
                            />
                        </div>
                        <div className="pulse"></div>
                    </>
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="myra-window">
                    <div className="myra-header">
                        <div className="header-info">
                            <div className="bot-avatar-small">
                                <Image src="/assets/images/go-globe.png" alt="Bot" width={30} height={30} />
                            </div>
                            <div className="bot-title">
                                <h4>Myra</h4>
                                <p>Online | AI Travel Assistant</p>
                            </div>
                        </div>
                        <div className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </div>
                    </div>

                    <div className="myra-messages" ref={scrollRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                    </div>

                    {messages.length < 5 && messages[messages.length - 1]?.sender === 'bot' && (
                        <div className="myra-quick-options">
                            {quickOptions.map((opt, i) => (
                                <div 
                                    key={i} 
                                    className="option-pill"
                                    onClick={() => handleSend(opt.label)}
                                >
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    )}

                    <form className="myra-input-area" onSubmit={handleFormSubmit}>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Ask Myra anything..." 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                disabled={isTyping}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="send-btn"
                            disabled={!inputText.trim() || isTyping}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
