import Image from 'next/image';
import { Building2, IndianRupee, CreditCard, Hash } from 'lucide-react';

const banks = [
    {
        name: 'HDFC BANK',
        accountName: 'WEGOMAP',
        accountNo: '50200063067397',
        ifsc: 'HDFC0000310',
        branch: 'Aluva Branch'
    },
    {
        name: 'KOTAK MAHINDRA BANK',
        accountName: 'WEGOMAP',
        accountNo: '0948413528',
        ifsc: 'KKBK0009290',
        branch: 'Aluva Branch'
    },
    {
        name: 'YES BANK',
        accountName: 'WEGOMAP',
        accountNo: '074563200000021',
        ifsc: 'YESB0000745',
        branch: 'Padivattom Branch'
    }
];

export default function PaymentPage() {
    return (
        <div className="infoPageWrapper">
            <section className="infoPageBanner">
                <div className="infoBannerImg">
                    <Image
                        src="/uploads/categories/umwfsgcys5bekqzaaga7nsholfjuuhiqvnal5r4o240905034708.jpg"
                        alt="Payment Options"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="infoBannerOverlay" />
                </div>
                <div className="infoBannerContent">
                    <h1 className="infoTitle">Payment Options</h1>
                    <p className="infoSubtitle">Secure and hassle-free payment channels for your trips</p>
                </div>
            </section>

            <section className="infoBodySection" style={{ backgroundColor: '#ffffff' }}>
                <div className="infoContainer" style={{ maxWidth: '900px' }}>

                    <div className="paymentRow" style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}>
                        <div className="paymentBankData">
                            <h2 className="bankName" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <IndianRupee color="#0ea5e9" /> UPI Payment
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.125rem', marginBottom: '1rem' }}>
                                Scan this QR code with any active UPI App (Google Pay, PhonePe, Paytm, BHIM) to instantly pay <strong>Wegomap Tours & Events</strong> (+919778734488).
                            </p>
                        </div>
                        <div className="paymentScan">
                            <Image
                                src="/assests/site/assets/images/google-logo.svg"
                                alt="UPI QR"
                                width={180}
                                height={180}
                                unoptimized
                                style={{ borderRadius: '1rem' }}
                            />
                        </div>
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '4rem 0 2rem 0', textAlign: 'center' }}>
                        Direct Bank Transfers (NEFT / RTGS)
                    </h2>

                    <div className="contactGrid">
                        {banks.map((b, i) => (
                            <div key={i} className="contactBox" style={{ borderTop: '4px solid #FFD52B' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Building2 /> {b.name}
                                </h3>

                                <p><strong style={{ width: '120px' }}>Account Name</strong> {b.accountName}</p>
                                <p><strong style={{ width: '120px' }}><Hash size={18} /> Account No</strong> {b.accountNo}</p>
                                <p><strong style={{ width: '120px' }}>IFSC Code</strong> {b.ifsc}</p>
                                <p><strong style={{ width: '120px' }}>Branch</strong> {b.branch}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
