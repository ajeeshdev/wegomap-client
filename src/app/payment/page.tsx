"use client";
import { getImageUrl } from "@/config";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Building2, Copy, CheckCheck, ShieldCheck, Phone, Smartphone, CreditCard, Landmark } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { QRCodeSVG } from 'qrcode.react';
import { API_URL } from '@/config';

// Banks will be loaded from CMS
const defaultBanks = [
    {
        name: 'HDFC Bank',
        accountName: 'WEGOMAP',
        accountNo: '50200063067397',
        ifsc: 'HDFC0000310',
        branch: 'Aluva Branch',
        acctType: 'Current Account',
        color: '#004B92',
    }
];

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button className="copyBtn" onClick={handleCopy} title="Copy">
            {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
        </button>
    );
}

export default function PaymentPage() {
    const razorpayFormRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState({
        razorpay_button_id: 'pl_JGttaKgo6K875Z',
        upi_id: '9778734488@obizaxis',
        upi_phone: '+91 9778734488',
        bank_accounts: defaultBanks
    });

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const json = await res.json();
                if (json.success && json.data) {
                    const opt = json.data.find((o: any) => o.key === 'payment_details');
                    if (opt) {
                        const parsed = JSON.parse(opt.value);
                        setPaymentDetails(prev => ({
                            ...prev,
                            ...parsed,
                            // Ensure valid values for critical fields
                            razorpay_button_id: parsed.razorpay_button_id || prev.razorpay_button_id,
                            bank_accounts: (parsed.bank_accounts && parsed.bank_accounts.length > 0) ? parsed.bank_accounts : prev.bank_accounts
                        }));
                    }
                }
            } catch (e) {
                console.error("Failed to fetch payment details", e);
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentDetails();
    }, []);

    useEffect(() => {
        // Initialize Razorpay button manually - only if ID is provided
        if (!loading && paymentDetails.razorpay_button_id && razorpayFormRef.current && razorpayFormRef.current.children.length === 0) {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/payment-button.js";
            script.setAttribute("data-payment_button_id", paymentDetails.razorpay_button_id);
            script.async = true;
            razorpayFormRef.current.appendChild(script);
        }
    }, [loading, paymentDetails.razorpay_button_id]);

    return (
        <div className="paymentPage">
            <DynamicPageBanner
                fallbackTitle="Payment Options"
                fallbackSubtitle="Secure and hassle-free payment channels for your dream trip."
                fallbackPreTitle="Secure Transactions"
                breadcrumbs={[{ label: 'Payment' }]}
            />

            <div className="paymentBody homeContainer">

                {/* Trust Strip */}
                <div className="payTrustStrip">
                    {[
                        { icon: <ShieldCheck size={20} />, label: '100% Secure Payments' },
                        { icon: <Smartphone size={20} />, label: 'UPI / Google Pay / PhonePe' },
                        { icon: <CreditCard size={20} />, label: 'Credit & Debit Cards' },
                        { icon: <Landmark size={20} />, label: 'NEFT / RTGS Bank Transfer' },
                    ].map((item, i) => (
                        <div key={i} className="trustItem">
                            <span className="trustIcon">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Section: UPI & Online ── */}
                <div className="sectionHeader flex items-center justify-center mb-12">
                    <div className="titleArea">
                        <span className="sectionSubtitle">Quick & Instant</span>
                        <h2 className="sliderTitle">UPI & Online Payments</h2>
                    </div>
                </div>

                <div className="payUpiGrid">
                    {/* GPay / UPI QR Card */}
                    <div className="payUpiCard qrCard">
                        <div className="payUpiCardInner">
                            {/* Front */}
                            <div className="payUpiCardFront">
                                <Image
                                    src="/assets/site/assets/images/gpay.png"
                                    alt="Google Pay / UPI"
                                    width={200}
                                    height={120}
                                    style={{ objectFit: 'contain' }}
                                    
                                />
                                <span className="hoverHint">Hover to scan QR</span>
                            </div>
                            {/* Back */}
                            <div className="payUpiCardBack">
                                <Image
                                    src="/assets/site/assets/images/gpay-logo-small.png"
                                    alt="GPay"
                                    width={60}
                                    height={30}
                                    style={{ objectFit: 'contain' }}
                                    
                                />
                                <div className="qrName">WEGOMAP Tours &amp; Events</div>
                                <div className="qrPhone">{paymentDetails.upi_phone}</div>
                                <div className="qrWrapper bg-white p-2 rounded-lg mt-2 flex items-center justify-center">
                                    <QRCodeSVG 
                                        value={`upi://pay?pa=${paymentDetails.upi_id}&pn=WEGOMAP&cu=INR`} 
                                        size={140}
                                        level="H"
                                        includeMargin
                                    />
                                </div>
                                <div className="qrUpiId">{paymentDetails.upi_id}</div>
                            </div>
                        </div>
                        <div className="payUpiLabel">
                            <Smartphone size={16} />
                            Google Pay / PhonePe / BHIM / Paytm
                        </div>
                    </div>

                    {/* Razorpay Online Card */}
                    <div className="payUpiCard razorCard">
                        <div className="payUpiCardInner">
                            {/* Front */}
                            <div className="payUpiCardFront">
                                <Image
                                    src="/assets/site/assets/images/pay-online.png"
                                    alt="Pay Online"
                                    width={220}
                                    height={120}
                                    style={{ objectFit: 'contain' }}
                                    
                                />
                                <span className="hoverHint">Hover to pay online</span>
                            </div>
                            {/* Back */}
                            <div className="payUpiCardBack">
                                <Image
                                    src="/assets/site/assets/images/razorpay-logo.svg"
                                    alt="Razorpay"
                                    width={140}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                    
                                />
                                <p className="razorDesc">Pay securely using Credit Card, Debit Card, Net Banking, or UPI via Razorpay.</p>
                                <form ref={razorpayFormRef}>
                                    {/* Script will be injected here by useEffect */}
                                </form>
                                <small>Click above to pay online</small>
                            </div>
                        </div>
                        <div className="payUpiLabel">
                            <CreditCard size={16} />
                            Credit Card / Debit Card / Net Banking
                        </div>
                    </div>
                </div>

                {/* ── Section: Bank Transfers ── */}
                <div className="sectionHeader flex items-center justify-center mb-12" style={{ marginTop: '5rem' }}>
                    <div className="titleArea">
                        <span className="payLabel sectionSubtitle">NEFT / RTGS</span>
                        <h2 className="sliderTitle">Direct Bank Transfers</h2>
                    </div>
                </div>

                <div className="payBankGrid">
                    {paymentDetails.bank_accounts.map((bank, i) => (
                        <div key={i} className="payBankCard" style={{ '--bank-color': bank.color } as React.CSSProperties}>
                            {/* Card Header with bank color */}
                             <div className="payBankHeader" style={{ backgroundColor: bank.color }}>
                                <div className="payBankName">{bank.name}</div>
                            </div>

                            {/* Card Body */}
                            <div className="payBankBody">
                                <div className="payBankRow">
                                    <span className="payBankLabel">Account Name</span>
                                    <span className="payBankVal">
                                        {bank.accountName}
                                        <CopyButton text={bank.accountName} />
                                    </span>
                                </div>
                                <div className="payBankRow">
                                    <span className="payBankLabel">Account No</span>
                                    <span className="payBankVal mono">
                                        {bank.accountNo}
                                        <CopyButton text={bank.accountNo} />
                                    </span>
                                </div>
                                <div className="payBankRow">
                                    <span className="payBankLabel">IFSC Code</span>
                                    <span className="payBankVal mono">
                                        {bank.ifsc}
                                        <CopyButton text={bank.ifsc} />
                                    </span>
                                </div>
                                <div className="payBankRow">
                                    <span className="payBankLabel">Branch</span>
                                    <span className="payBankVal">{bank.branch}</span>
                                </div>
                                <div className="payBankRow">
                                    <span className="payBankLabel">Type</span>
                                    <span className="payBankVal">{bank.acctType}</span>
                                </div>
                            </div>

                            <div className="payBankFooter">
                                <Building2 size={14} />
                                Transfer via NEFT / RTGS / IMPS
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Help Strip ── */}
                <div className="payHelpStrip">
                    <div className="payHelpContent">
                        <h3>Need help with payment?</h3>
                        <p>Call or WhatsApp us and our team will guide you through the process.</p>
                    </div>
                    <div className="payHelpActions">
                        <a href="tel:+918590370566" className="payHelpBtn primary">
                            <Phone size={16} />
                            +91 85903 70566
                        </a>
                        <a href="https://wa.me/918590370566" target="_blank" rel="noreferrer" className="payHelpBtn whatsapp">
                            <Smartphone size={16} />
                            WhatsApp Us
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
