"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Mail, Lock, ArrowRight, UserPlus, Heart, Briefcase } from 'lucide-react';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success && data.token) {
                // For users, we set specific flags in localStorage for the Header
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true');
                
                // Get user info and store it
                const meRes = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${data.token}` }
                });
                const meData = await meRes.json();
                
                if (meData.success) {
                    localStorage.setItem('userProfile', JSON.stringify({
                        name: meData.data.name,
                        email: meData.data.email,
                        role: meData.data.role
                    }));
                }

                window.dispatchEvent(new Event('authChange'));
                
                // Redirect based on role or just to home/wishlist
                if (meData.data.role === 'admin' || meData.data.role === 'manager') {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }
            } else {
                setError(data.error || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row">
            {/* Left Side: Illustration & Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="relative z-10 max-w-md">
                    <h1 className="text-5xl font-black italic mb-6">Explore <br/>the World with Us.</h1>
                    <p className="text-xl text-blue-100 mb-8 font-medium">
                        Log in to manage your travel bookings, access your wishlist, and plan your next adventure.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Heart className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Your Wishlist</h3>
                                <p className="text-sm text-blue-100">Save destinations you love for later.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Briefcase className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Manage Bookings</h3>
                                <p className="text-sm text-blue-100">View and track your previous and upcoming trips.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary/30 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 bg-slate-50/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1 flex justify-between">
                                Password
                                <Link href="#" className="text-primary hover:underline font-semibold">Forgot?</Link>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 bg-slate-50/50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-200 disabled:opacity-70"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 font-medium">
                            New to Wegomap?{' '}
                            <Link href="/signup" className="text-primary hover:underline font-bold inline-flex items-center gap-1">
                                Create an account <UserPlus size={16} />
                            </Link>
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-12 flex justify-center gap-6 text-sm text-slate-400 font-medium">
                        <Link href="/about" className="hover:text-slate-600 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-slate-600 transition-colors">Support</Link>
                        <Link href="/admin-login" className="hover:text-slate-600 transition-colors">Admin Portal</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
