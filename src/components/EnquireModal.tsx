"use client";

import { useState, useEffect } from 'react';
import { MapPin, User, Mail, Phone, X, Send, ShieldCheck, MessageSquare } from 'lucide-react';
import { API_URL } from '@/config';
import { toast } from 'react-hot-toast';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface EnquireModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageName?: string;
}

export default function EnquireModal({ isOpen, onClose, packageName = 'General Inquiry' }: EnquireModalProps) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            toast.error('reCAPTCHA not loaded. Please try again.');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = await executeRecaptcha('enquire_modal');
            const res = await fetch(`${API_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    destination: packageName,
                    source: 'Website Global Enquire',
                    url: typeof window !== "undefined" ? window.location.href : "",
                    captchaToken: token
                })
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Your inquiry has been sent! Our expert will contact you shortly.');
                onClose();
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                toast.error(data.error || 'Failed to send inquiry');
            }
        } catch (err) {
            toast.error('Failed to send inquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`enquireOverlay ${isOpen ? 'active' : ''}`}>
            <div className="enquireBackdrop" onClick={onClose} />
            
            <div className={`enquireContainer ${isOpen ? 'active' : ''}`}>
                <button onClick={onClose} className="enquireCloseBtn">
                    <X size={20} />
                </button>

                <div className="enquireFormSide">
                    <div className="enquireFormHeader">
                        <span className="enquireLabel">Get a Free Quote</span>
                        <h2 className="enquireTitle">Quick Enquiry.</h2>
                    </div>

                    <form onSubmit={handleFormSubmit} className="enquireForm">
                        <div className="enquireInterestBadge">
                            <div className="enquireInterestIcon">
                                <MapPin size={24} />
                            </div>
                            <div className="enquireInterestInfo">
                                <label>Interested In</label>
                                <div>{packageName}</div>
                            </div>
                        </div>

                        <div className="enquireFormGrid">
                            <div className="enquireInputGroup">
                                <label>Your Full Name</label>
                                <div className="enquireInputWrapper">
                                    <div className="enquireInputIcon"><User size={18} /></div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="enquireInputGroup">
                                <label>Phone Number</label>
                                <div className="enquireInputWrapper">
                                    <div className="enquireInputIcon"><Phone size={18} /></div>
                                    <input
                                        type="tel"
                                        placeholder="+91 80860 00000"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="enquireInputGroup">
                                <label>Email Address</label>
                                <div className="enquireInputWrapper">
                                    <div className="enquireInputIcon"><Mail size={18} /></div>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="enquireInputGroup">
                            <label>Additional Requirements</label>
                            <div className="enquireInputWrapper textarea">
                                <div className="enquireInputIcon"><MessageSquare size={18} /></div>
                                <textarea
                                    placeholder="Tell us about your trip details..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={2}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`enquireSubmitBtn ${isSubmitting ? 'loading' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Send Inquiry Request
                                    <Send size={16} className="sendIcon" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="enquirePrivacyNote">
                        We value your privacy. No spam, only travel.
                    </p>
                </div>
            </div>
        </div>
    );
}
