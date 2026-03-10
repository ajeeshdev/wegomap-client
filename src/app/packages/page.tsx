"use client";

import { useEffect, useState } from 'react';
import { MapPin, IndianRupee, MoveRight } from 'lucide-react';
import Link from 'next/link';

interface Package {
    _id: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    category: string;
}

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        async function getPackages() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`);
                const data = await res.json();
                if (data.success) {
                    setPackages(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getPackages();
    }, []);

    const filteredPackages = filter === 'All'
        ? packages
        : packages.filter(p => p.category === filter);

    const categories = ['All', 'Kerala', 'Domestic', 'International'];

    return (
        <div className="packagesPage">
            <div className="homeContainer">
                <div className="headerRow">
                    <div className="headerContent animate-in fade-in slide-in-from-bottom duration-700">
                        <span className="subTitle">Handpicked Tours</span>
                        <h1>Discover your next <br /><span>Adventure.</span></h1>
                    </div>

                    <div className="filterGroup animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? 'active' : ''}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="loadingWrapper">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="packagesGrid">
                        {filteredPackages.map((pkg) => (
                            <div key={pkg._id} className="packageItem">
                                <div className="imageArea">
                                    <div className="placeholder"></div>
                                    {/* Status */}
                                    <div className="durationBadge">
                                        <span>{pkg.duration.split('N')[0]}N / {pkg.duration.split('D')[0].split('/')[1] || '3D'}</span>
                                    </div>
                                    <div className="priceBadge">
                                        <div className="label">Starting From</div>
                                        <div className="price"><IndianRupee size={16} />{pkg.price}</div>
                                    </div>
                                </div>

                                <div className="contentArea">
                                    <div className="locRow">
                                        <MapPin size={14} /> {pkg.location}
                                    </div>
                                    <h3>{pkg.title}</h3>

                                    <div className="tagsRow">
                                        <span className="tag">Houseboat</span>
                                        <span className="tag">Sightseeing</span>
                                        <span className="tag">Hotel Stay</span>
                                    </div>

                                    <Link href={`/packages/${pkg._id}`} className="detailsBtn">
                                        View Details <MoveRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredPackages.length === 0 && (
                    <div className="notFound">
                        <div className="icon">🏝️</div>
                        <h3>No packages found for this category.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
