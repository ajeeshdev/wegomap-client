"use client";

import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function PrivacyPolicyPage() {
    return (
        <div className="privacyPolicyPage">
            <DynamicPageBanner
                fallbackTitle="Privacy\nPolicy"
                fallbackSubtitle="How we protect your data and privacy."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: 'Privacy Policy' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <div className="max-w-4xl mx-auto">
                    <div className="sectionHeader flex items-center justify-center mb-12">
                        <div className="titleArea">
                            <span className="sectionSubtitle">Policy</span>
                            <h2 className="sliderTitle">Privacy <span className="highlight">Details</span></h2>
                        </div>
                    </div>
                    <div className="tour-description-content">
                        <p>
                            The Personal Information that we gather are utilized for giving and working on the Service.
                            We won't utilize or impart your data to anybody besides as depicted in this Privacy Policy.
                            While requesting or enrolling on our site, as appropriate, you might be approached to enter
                            your name, email address, telephone number or different subtleties to assist you with your experience.
                        </p>

                        <h2>Cookies</h2>
                        <p>
                            Yes, we use cookies. They are additionally used to assist us with understanding your
                            inclinations in light of past or current site movement, which empowers us to give you
                            further developed administrations. We additionally use treats (cookies) to assist us with
                            incorporating total information about site traffic and site communication so we can
                            offer better site encounters and devices later on.
                        </p>
                        <p>
                            Assuming you switch treats (cookies) off, some of the highlights that make your site experience
                            more productive may not work properly. However, it won't affect the client's overall
                            experience that make your site experience more proficient.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
