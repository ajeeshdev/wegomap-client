"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Mail, Lock, ArrowRight, User, Globe, ShieldCheck } from 'lucide-react';

import './login.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState('');
    const [siteTitle, setSiteTitle] = useState('WEGOMAP');
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/options`);
                const json = await res.json();
                if (json.success && json.data) {
                    const logoOpt = json.data.find((o: any) => o.key === 'site_logo');
                    const titleOpt = json.data.find((o: any) => o.key === 'site_title');
                    if (logoOpt) setLogo(logoOpt.value);
                    if (titleOpt) setSiteTitle(titleOpt.value);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

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
        <div className="login-screen-wrapper">
            {/* Background Glows */}
            <div className="login-glow-1"></div>
            <div className="login-glow-2"></div>
            
            <div className="login-card">
                
                {/* Brand Experience Side */}
                <div className="login-visual-side">
                    <div>
                        <div className="login-logo-area">
                            {logo ? (
                                <img src={logo} alt={siteTitle} style={{ height: '40px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                            ) : (
                                <div className="login-logo-box">
                                    <Globe className="text-white" size={24} />
                                </div>
                            )}
                            <div className="login-site-name">{siteTitle}</div>
                            <div style={{ fontSize: '9px', fontWeight: '900', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '4px' }}>Administration</div>
                        </div>
                        
                        <h1 className="login-welcome-text">
                            Command your <br/>
                            <span>Travel Empire</span>.
                        </h1>
                        <p className="login-subtitle">
                           High-performance management for your travel bookings, itineraries and customer experiences.
                        </p>
                    </div>

                    <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.6)' }}>
                            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck style={{ color: '#10b981' }} size={16} />
                            </div>
                            <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Verified Admin Access</span>
                        </div>
                    </div>
                </div>

                {/* Secure Authentication Side */}
                <div className="login-form-side">
                    {/* Mobile Logo Only */}
                    <div style={{ marginBottom: '3.5rem', textAlign: 'center', display: 'block' }} className="lg:hidden">
                        {logo ? (
                            <img src={logo} alt={siteTitle} style={{ height: '56px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} />
                        ) : (
                            <div className="login-logo-box" style={{ margin: '0 auto 1.5rem' }}>
                                <Globe className="text-white" size={32} />
                            </div>
                        )}
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>{siteTitle} CMS</h1>
                    </div>
                    
                    <div className="login-form-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your dashboard</p>
                    </div>

                    {error && (
                        <div className="login-error-msg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="login-input-group">
                            <label className="login-input-label">Admin Email</label>
                            <div className="login-input-wrapper">
                                <Mail className="login-input-icon" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-input-field"
                                    placeholder="admin@wegomap.com"
                                />
                            </div>
                        </div>

                        <div className="login-input-group">
                            <label className="login-input-label">Security Password</label>
                            <div className="login-input-wrapper">
                                <Lock className="login-input-icon" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login-input-field"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="login-submit-btn"
                        >
                            {loading ? 'Validating...' : 'Access Command Center'}
                            {!loading && <ArrowRight size={18} strokeWidth={3} />}
                        </button>
                    </form>

                    <div className="login-footer">
                        <Link href="/" className="login-exit-link">
                             <div className="login-exit-divider"></div>
                             Exit to Live Site
                             <div className="login-exit-divider"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
