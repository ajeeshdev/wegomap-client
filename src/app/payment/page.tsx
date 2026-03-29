"use client";
import { getImageUrl } from "@/config";

import Image from 'next/image';
import { useState } from 'react';
import { Building2, Copy, CheckCheck, ShieldCheck, Phone, Smartphone, CreditCard, Landmark } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

const banks = [
    {
        name: 'HDFC Bank',
        shortName: 'HDFC',
        accountName: 'WEGOMAP',
        accountNo: '50200063067397',
        ifsc: 'HDFC0000310',
        branch: 'Aluva Branch',
        acctType: 'Current Account',
        color: '#004B92',
        logo: '/assets/site/assets/images/hdfc-logo-small.png',
        banner: '/assets/site/assets/images/hdfc-bank.jpg',
    },
    {
        name: 'Kotak Mahindra Bank',
        shortName: 'Kotak',
        accountName: 'WEGOMAP',
        accountNo: '0948413528',
        ifsc: 'KKBK0009290',
        branch: 'Aluva Branch',
        acctType: 'Current Account',
        color: '#ED1C24',
        logo: '/assets/site/assets/images/kotak-mahindra-small.png',
        banner: '/assets/site/assets/images/kotak-mahindra.png',
    },
    {
        name: 'YES Bank',
        shortName: 'YES',
        accountName: 'WEGOMAP',
        accountNo: '074563200000021',
        ifsc: 'YESB0000745',
        branch: 'Padivattom Branch',
        acctType: 'Current Account',
        color: '#1C32D6',
        logo: '/assets/site/assets/images/yes-bank-small.png',
        banner: '/assets/site/assets/images/yes-bank.png',
    },
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
                <div className="paySectionHeader">
                    <span className="payLabel">Quick & Instant</span>
                    <h2>UPI &amp; Online <span>Payments</span></h2>
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
                                <div className="qrPhone">+91 9778734488</div>
                                <Image
                                    src="/assets/site/assets/images/qr.png"
                                    alt="UPI QR Code"
                                    width={150}
                                    height={150}
                                    style={{ objectFit: 'contain' }}
                                    
                                />
                                <div className="qrUpiId">9778734488@obizaxis</div>
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
                                <form>
                                    <script
                                        src="https://checkout.razorpay.com/v1/payment-button.js"
                                        data-payment_button_id="pl_JGttaKgo6K875Z"
                                        async
                                    />
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
                <div className="paySectionHeader" style={{ marginTop: '5rem' }}>
                    <span className="payLabel">NEFT / RTGS</span>
                    <h2>Direct Bank <span>Transfers</span></h2>
                </div>

                <div className="payBankGrid">
                    {banks.map((bank, i) => (
                        <div key={i} className="payBankCard" style={{ '--bank-color': bank.color } as React.CSSProperties}>
                            {/* Card Header with bank color */}
                            <div className="payBankHeader" style={{ backgroundColor: bank.color }}>
                                <Image
                                    src={getImageUrl(bank.logo)}
                                    alt={bank.name}
                                    width={80}
                                    height={32}
                                    style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                                    
                                />
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
