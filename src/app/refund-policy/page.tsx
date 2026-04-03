"use client";

import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function RefundPolicyPage() {
    return (
        <div className="refundPolicyPage">
            <DynamicPageBanner
                fallbackTitle="Cancellation & \nRefund Policy"
                fallbackSubtitle="Our transparent approach to cancellations and refunds."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: 'Refund Policy' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <div className="max-w-4xl mx-auto">
                    <div className="sectionHeader flex items-center justify-center mb-12">
                        <div className="titleArea">
                            <span className="sectionSubtitle">Policy</span>
                            <h2 className="sliderTitle">Cancellation Policy <span className="highlight">for Kerala</span></h2>
                        </div>
                    </div>
                    <div className="tour-description-content">
                        <p>
                            To initiate a cancellation, please submit your request at least 30 days prior to the travel date.
                            This policy applies to packages with a minimum 30% advance payment. The cancellation charge
                            applies in certain cases as it completely depends on the amount we might recover from the
                            vendors like hoteliers, Flights and other vendors.
                        </p>

                        <h2>Refund Terms</h2>
                        <ul>
                            <li><strong>Cancellations received 30+ days prior to arrival:</strong> Full refund excluding tax</li>
                            <li><strong>Cancellations received 30-14 days prior to arrival:</strong> 50% cancellation charge, balance amount refunded</li>
                            <li><strong>Cancellations received less than 13 days prior to arrival:</strong> 100% cancellation charge, no refund</li>
                        </ul>

                        <p>
                            Refunds will be processed via online transactions within 30 days of receiving your cancellation request.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
