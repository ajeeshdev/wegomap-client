"use client";

import { API_URL, getImageUrl } from '@/config';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Car, Star, ChevronRight, X, MapPin, ShieldCheck, Clock, Users } from 'lucide-react';
import DynamicPageBanner from '@/components/DynamicPageBanner';

export default function CabsListingPage() {
    const [cabs, setCabs] = useState<any[]>([]);
    const [pricing, setPricing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const durations = [
        { key: 'n2d3', label: '2N/3D' },
        { key: 'n3d4', label: '3N/4D' },
        { key: 'n4d5', label: '4N/5D' },
        { key: 'n5d6', label: '5N/6D' },
        { key: 'n6d7', label: '6N/7D' }
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const [cabsRes, pricingRes] = await Promise.all([
                    fetch(`${API_URL}/cabs`),
                    fetch(`${API_URL}/options?key=cab_pricing`)
                ]);
                
                const cabsJson = await cabsRes.json();
                const pricingJson = await pricingRes.json();

                if (cabsJson.success) setCabs(cabsJson.data);
                if (pricingJson.success && pricingJson.data.length > 0) {
                    setPricing(pricingJson.data[0].value);
                }
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredCabs = cabs.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="hotels-listing-wrapper cabs-listing-wrapper">
            <DynamicPageBanner 
                fallbackTitle={"Premium Taxi\n& Car Rentals."}
                fallbackSubtitle="Reliable, safe, and comfortable transport solutions for your Kerala journey."
                fallbackPreTitle="Travel with WEGOMAP"
                fallbackImage="/uploads/categories/taxi-service-banner.jpg" 
                breadcrumbs={[{ label: 'Cabs' }]}
            />

            <div className="homeContainer cabs-listing-container">
                {/* Pricing Table Section */}
                {pricing && (
                    <section className="pricing-matrix-section pb-20 pt-10">
                        <div className="section-header text-center mb-16 px-4">
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px]">Transparent Pricing</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4">Transport Rate Card</h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="pricing-table-container">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th>Vehicle Type</th>
                                        {durations.map(d => (
                                            <th key={d.key}>{d.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(pricing)
                                        .filter(k => isNaN(Number(k))) // Filter out any corruption
                                        .map((vehicleKey) => (
                                        <tr key={vehicleKey}>
                                            <td>
                                                <div className="vehicle-info">
                                                    <div className="v-avatar">
                                                        {vehicleKey.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="v-details">
                                                        <div className="v-name">{vehicleKey.replace(/_/g, ' ')}</div>
                                                        <div className="v-tag">Premium Fleet</div>
                                                    </div>
                                                </div>
                                            </td>
                                            {durations.map(d => (
                                                <td key={d.key}>
                                                    <div className="price-val">
                                                        {pricing[vehicleKey][d.key] ? `₹${pricing[vehicleKey][d.key]}` : <span className="text-slate-200">--</span>}
                                                    </div>
                                                    <div className="price-label">Net Rate</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="custom-quote-banner">
                           <div className="banner-content">
                                <h4>Need a custom itinerary?</h4>
                                <p>Our transport experts can build a personalized travel plan with specialized vehicle requirements, multi-city routes, and professional chauffeur services.</p>
                                <Link href="/contact" className="cta-btn">
                                    Request Custom Quote
                                    <ChevronRight size={20} />
                                </Link>
                           </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
