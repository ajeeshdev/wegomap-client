"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Mail, Lock, User, Globe, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';

import './user-signup.css';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Info, 2: Verify Code
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (data.success) {
                toast.success('Registration successful! Please check your email for a verification code.');
                setStep(2);
            } else {
                setError(data.error || 'Registration failed.');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/auth/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code })
            });
            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true');
                
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
                toast.success('Email verified! Welcome to WEGOMAP.');
                router.push('/dashboard');
            } else {
                setError(data.error || 'Verification failed. Please check the code.');
            }
        } catch (err) {
            setError('Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-signup-wrapper">
            <div className="user-signup-visual">
                <div className="user-signup-visual-content">
                    <h1>Join the <br/>Adventure with <span style={{ color: '#000' }}>WEGOMAP</span>.</h1>
                    <p>Create your account and start exploring the world's most beautiful destinations.</p>
                    <div className="signup-feature-list">
                        <div className="signup-feature-item">
                            <div className="signup-feature-icon"><ShieldCheck className="text-white" size={24} /></div>
                            <div className="signup-feature-text"><h3>Verified Access</h3><p>Secure verification to keep your account safe from spam.</p></div>
                        </div>
                        <div className="signup-feature-item">
                            <div className="signup-feature-icon"><Globe className="text-white" size={24} /></div>
                            <div className="signup-feature-text"><h3>Global Community</h3><p>Join thousands of travelers exploring the globe.</p></div>
                        </div>
                    </div>
                </div>
                <div className="signup-visual-glow-1"></div>
                <div className="signup-visual-glow-2"></div>
            </div>

            <div className="user-signup-form-side">
                <div className="user-signup-form-container">
                    <div className="user-signup-header">
                        <h2>{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
                        <p>{step === 1 ? 'Join WEGOMAP today and start your journey' : `We've sent a code to ${email}`}</p>
                    </div>

                    {error && <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '1rem', marginBottom: '2rem', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>{error}</div>}

                    {step === 1 ? (
                        <form onSubmit={handleSignup} className="user-form">
                            <div className="signup-form-group">
                                <label className="signup-form-label">Full Name</label>
                                <div className="signup-input-relative">
                                    <User className="signup-input-icon" size={20} />
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="signup-input-field" placeholder="John Doe" />
                                </div>
                            </div>
                            <div className="signup-form-group">
                                <label className="signup-form-label">Email Address</label>
                                <div className="signup-input-relative">
                                    <Mail className="signup-input-icon" size={20} />
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input-field" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div className="signup-form-group">
                                <label className="signup-form-label">Password</label>
                                <div className="signup-input-relative">
                                    <Lock className="signup-input-icon" size={20} />
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input-field" placeholder="••••••••" minLength={6} />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="user-signup-btn">
                                {loading ? 'Processing...' : 'Sign Up Now'}
                                {!loading && <ArrowRight style={{ marginLeft: '4px' }} size={20} />}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} className="user-form">
                            <div className="signup-form-group">
                                <label className="signup-form-label">Verification Code</label>
                                <div className="signup-input-relative">
                                    <MessageSquare className="signup-input-icon" size={20} />
                                    <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} className="signup-input-field" placeholder="Enter 6-digit code" maxLength={6} />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="user-signup-btn">
                                {loading ? 'Verifying...' : 'Verify Email'}
                                {!loading && <ArrowRight style={{ marginLeft: '4px' }} size={20} />}
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: '700', cursor: 'pointer' }}>Wait, wrong email?</button>
                            </div>
                        </form>
                    )}

                    <div className="user-login-redirect">
                        Traveling already? <Link href="/login">Sign in here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
