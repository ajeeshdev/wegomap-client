"use client";

import { useEffect, useState } from 'react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { API_URL } from '@/config';

export default function RefundPolicyPage() {
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_URL}/pages/refund-policy`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPageData(data.data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="refundPolicyPage">
            <DynamicPageBanner
                fallbackTitle={pageData?.title || "Cancellation &\nRefund Policy"}
                fallbackSubtitle="Our transparent approach to cancellations and refunds."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: pageData?.title || 'Refund Policy' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <h2 className="sliderTitle">{pageData?.title || "Cancellation"} <span className="highlight">Policy</span></h2>
               
                <div className="tour-description-content">
                    {pageData?.content ? (
                        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
