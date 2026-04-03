"use client";

import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function TermsAndConditionsPage() {
    return (
        <div className="termsPolicyPage">
            <DynamicPageBanner
                fallbackTitle="Terms and\nConditions"
                fallbackSubtitle="Agreement between you and WEGOMAP."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: 'Terms and Conditions' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <div className="max-w-4xl mx-auto">
                    <div className="sectionHeader flex items-center justify-center mb-12">
                        <div className="titleArea">
                            <span className="sectionSubtitle">Policy</span>
                            <h2 className="sliderTitle">Terms & <span className="highlight">Conditions</span></h2>
                        </div>
                    </div>
                    <div className="tour-description-content">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
