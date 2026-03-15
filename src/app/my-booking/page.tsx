"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, ArrowLeft, ArrowRight, Package, Calendar } from 'lucide-react';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/dashboard" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-slate-600 hover:text-primary transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Bookings</h1>
                        <p className="text-slate-500 font-medium">Manage your previous and upcoming trips.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
                         <Briefcase size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No bookings yet</h3>
                    <p className="text-slate-500 max-w-xs font-medium mb-8">
                        You haven&apos;t booked any tours yet. When you book an experience, it will show up here.
                    </p>
                    <Link href="/tours" className="py-4 px-10 bg-primary hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-100 inline-flex items-center gap-2 group">
                        Start Exploring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
