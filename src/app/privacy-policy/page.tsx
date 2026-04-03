"use client";

import { useEffect, useState } from 'react';
import DynamicPageBanner from '@/components/DynamicPageBanner';
import { API_URL } from '@/config';

export default function PrivacyPolicyPage() {
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_URL}/pages/privacy-policy`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPageData(data.data);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="privacyPolicyPage">
            <DynamicPageBanner
                fallbackTitle={pageData?.title || "Privacy\nPolicy"}
                fallbackSubtitle="How we protect your data and privacy."
                fallbackPreTitle="Policies"
                breadcrumbs={[{ label: pageData?.title || 'Privacy Policy' }]}
            />

            <div className="policyBody homeContainer commonPadding">
                <h2 className="sliderTitle">{pageData?.title || "Privacy"} <span className="highlight">Details</span></h2>
                
                <div className="tour-description-content">
                    {pageData?.content ? (
                        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
