"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

const services = [
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-1.png',
        title: 'Tour Packages',
        description: 'We can plan holidays to the destinations around the world.',
        href: null,
    },
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-4.png',
        title: 'Events',
        description: 'We can host events with your family, friends or colleagues at any destination.',
        href: '/events',
    },
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-5.png',
        title: 'Hotels',
        description: 'We have good relationship in between so many resorts and hotels.',
        href: null,
    },
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-3.png',
        title: 'Flights',
        description: 'We can book domestic and international flights with our professional Ticketing team.',
        href: null,
    },
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-2.png',
        title: 'Visa',
        description: 'We can provide you Tourist Visa assistance.',
        href: null,
    },
    {
        icon: 'https://www.wegomap.com/assests/site/assets/images/icon-service-6.png',
        title: 'Shop',
        description: 'You can buy Kerala Spices and Souvenirs from our cart.',
        href: null,
    },
];

const subServices = [
    {
        title: 'Kerala Houseboat Service',
        description: 'Explore the tranquil backwaters of Alleppey aboard our curated houseboats — an experience unlike any other.',
        href: '/kerala-alleppey-boat-house',
        tag: 'Alleppey Backwaters',
    },
    {
        title: 'Kerala Taxi Service',
        description: 'Comfortable, reliable and affordable taxi and cab services across Kerala for all your travel needs.',
        href: '/kerala-taxi-service',
        tag: 'All Kerala',
    },
];

export default function ServicesPage() {
    return (
        <div className="servicesPage">
            <PageBanner
                title="Our Services"
                subtitle="Everything you need for a perfect trip — all under one roof."
                breadcrumbs={[{ label: 'Services' }]}
            />

            <div className="homeContainer">

                {/* Main 6-card grid */}
                <div className="servicesGrid">
                    {services.map((service, i) => (
                        <div key={i} className="serviceCard">
                            <div className="serviceIconWrap">
                                <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={56}
                                    height={56}
                                    unoptimized
                                />
                            </div>
                            <h3 className="serviceTitle">{service.title}</h3>
                            <p className="serviceDesc">{service.description}</p>
                            {service.href && (
                                <Link href={service.href} className="serviceLink">
                                    Learn more <MoveRight size={14} />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Sub-service detail pages */}
                <div className="subServicesSection">
                    <h2 className="subServicesHeading">Specialised Services</h2>
                    <div className="subServicesGrid">
                        {subServices.map((s, i) => (
                            <Link key={i} href={s.href} className="subServiceCard">
                                <span className="subServiceTag">{s.tag}</span>
                                <h3>{s.title}</h3>
                                <p>{s.description}</p>
                                <span className="subServiceCta">
                                    Explore <MoveRight size={16} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
