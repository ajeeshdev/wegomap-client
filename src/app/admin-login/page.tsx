"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Mail, Lock, ArrowRight, User, Globe, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
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

            if (data.token) {
                localStorage.setItem('token', data.token);
                
                // Get user info to check role
                const meRes = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${data.token}` }
                });
                const meData = await meRes.json();
                
                if (meData.success) {
                    if (meData.data.role === 'admin' || meData.data.role === 'manager') {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userProfile', JSON.stringify({
                            name: meData.data.name,
                            email: meData.data.email,
                            role: meData.data.role
                        }));
                        window.dispatchEvent(new Event('authChange'));
                        router.push('/admin');
                    } else {
                        setError('Access denied. Admin privileges required.');
                        localStorage.removeItem('token');
                    }
                }
            } else {
                setError(data.error || 'Invalid admin credentials');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cosmic-orange/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            
            <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl relative z-10">
                
                {/* Visual Side */}
                <div className="p-12 hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border-r border-slate-800">
                    <div>
                        <div className="flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-cosmic-orange rounded-xl flex items-center justify-center">
                                <Globe className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black italic text-white tracking-tighter">WEGOMAP</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Control Center for <br/>Your <span className="text-primary">Travel Business</span>.
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">
                            Effortlessly manage your travel packages, respond to customer inquiries, and grow your brand with the Wegomap CMS.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-slate-300">
                            <ShieldCheck className="text-emerald-500" size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Safe & Secure Official Access</span>
                        </div>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                            <div className="pl-6 text-[10px] font-bold text-slate-500 flex items-center uppercase tracking-widest">
                                Recent Admin Logins
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-white lg:bg-transparent">
                    <div className="mb-10 lg:hidden text-center">
                        <h1 className="text-2xl font-black italic text-primary">WEGOMAP CMS</h1>
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white lg:text-white text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Please sign in to access your dashboard</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 lg:bg-slate-800/50 border border-slate-200 lg:border-slate-700 text-slate-900 lg:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Security Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 lg:bg-slate-800/50 border border-slate-200 lg:border-slate-700 text-slate-900 lg:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/5 disabled:opacity-50"
                        >
                            {loading ? 'Confirming...' : 'Sign In Now'}
                            {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <Link href="/" className="text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <User size={14} /> Finish & Exit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
