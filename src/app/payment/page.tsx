import Image from 'next/image';

export default function PaymentPage() {
    return (
        <div className="paymentPage">
            <section className="paymentHeader">
                <div className="homeContainer">
                    <h1 className="paymentTitle">Secure Payment Options</h1>
                    <p className="paymentSub">Choose your preferred method to complete your booking</p>
                </div>
            </section>

            <section className="paymentBody">
                <div className="homeContainer">
                    <div className="paymentGrid">
                        {/* QR / Online */}
                        <div className="paymentCard">
                            <h2>Online Payment</h2>
                            <div className="paymentMethod">
                                <p>UPI / Google Pay / PhonePe</p>
                                <div className="qrPlaceholder">
                                    <p className="text-gray-500">Scan to Pay via UPI</p>
                                    <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <span className="text-xs text-center px-4">UPI QR Code will be provided during booking</span>
                                    </div>
                                </div>
                                <p className="upiId">UPI ID: <strong>wegomap@hdfcbank</strong></p>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="paymentCard">
                            <h2>Bank Transfer (NEFT/IMPS)</h2>
                            <div className="bankDetails">
                                <div className="bankInfo">
                                    <h3>HDFC Bank</h3>
                                    <p>Account Name: <strong>Wegomap Tour & Events</strong></p>
                                    <p>Account Number: <strong>502000XXXXXXX</strong></p>
                                    <p>IFSC Code: <strong>HDFC000XXXX</strong></p>
                                    <p>Branch: <strong>Kochi, Kerala</strong></p>
                                </div>
                                <div className="bankInfo mt-6 border-t pt-6">
                                    <h3>Kotak Mahindra Bank</h3>
                                    <p>Account Name: <strong>Wegomap Tour & Events</strong></p>
                                    <p>Account Number: <strong>6711XXXXXXX</strong></p>
                                    <p>IFSC Code: <strong>KKBK000XXXX</strong></p>
                                    <p>Branch: <strong>Ernakulam</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="paymentNotice">
                        <p><strong>Note:</strong> Please share the transaction screenshot with your travel consultant after successful payment for confirmation. All payments are secured via industry-standard encryption.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
