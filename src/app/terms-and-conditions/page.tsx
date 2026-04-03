"use client";

import { useEffect, useState } from 'react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { API_URL } from '@/config';

export default function TermsAndConditionsPage() {
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_URL}/pages/terms-and-conditions`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPageData(data.data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="termsPolicyPage">
            <DynamicPageBanner
                fallbackTitle={pageData?.title || "Terms and\nConditions"}
                fallbackSubtitle="Agreement between you and WEGOMAP."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: pageData?.title || 'Terms and Conditions' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <h2 className="sliderTitle">{pageData?.title || "Terms & Conditions"}</h2>
                 
                <div className="tour-description-content">
                    {pageData?.content ? (
                        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                    ) : (
                        <ul>
                            <li>In the event of unavailability of the specified room category, we reserve the right to offer alternative accommodations of similar or different standards, subject to availability. The room rate may vary accordingly.</li>
                            <li>Hotel selection is based on your preferred budget. Room rates are subject to change seasonally.</li>
                            <li>Standard hotel check-in time is 12:00 pm and check-out time is 10:00 am.</li>
                            <li>Please note that hotels may charge extra for:
                                <ul>
                                    <li>Lunch and dinner</li>
                                    <li>Additional persons above 5 years of age (not included in the original booking)</li>
                                </ul>
                            </li>
                            <li>These charges are payable directly to the hotel.</li>
                            <li>In hill stations, rooms are typically not air-conditioned due to the cold climate.</li>
                            <li>In the event of unforeseen circumstances such as bandhs, strikes, natural calamities, or pandemics, we will make alternative arrangements. Any additional expenses incurred due to these circumstances are not included in the package.</li>
                            <li>Please note that hotels may charge extra for early check-in or late check-out.</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
