"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Globe, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [codeFocused, setCodeFocused] = useState(false);
    const [newPasswordFocused, setNewPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [btnHover, setBtnHover] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const router = useRouter();

    const handlePasswordLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.notVerified) {
                toast.error('Email not verified. Please check your email.');
                setStep(2);
                setLoading(false);
                return;
            }
            handleAuthSuccess(data);
        } catch {
            setError('Login failed. Please check your credentials.');
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
                handleAuthSuccess(data);
            } else {
                setError(data.error || 'Verification failed. Please check the code.');
            }
        } catch {
            setError('Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Reset code sent! Check your email.');
                setStep(4);
                setCode('');
            } else {
                setError(data.error || 'Could not send reset email.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code, password: newPassword })
            });
            const data = await res.json();
            if (data.success && data.token) {
                toast.success('Password reset successfully! Signing you in…');
                handleAuthSuccess(data);
            } else {
                setError(data.error || 'Reset failed. Please check the code.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAuthSuccess = async (data: any) => {
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
            toast.success('Successfully logged in!');
            if (meData.data.role === 'admin' || meData.data.role === 'manager') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } else {
            setError(data.error || 'Authentication failed.');
        }
    };

    const inputBase: React.CSSProperties = {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0.875rem 1rem 0.875rem 3.25rem',
        borderRadius: '14px',
        fontSize: '0.9375rem',
        fontWeight: 500,
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        fontFamily: 'inherit',
    };

    const inputActive = (focused: boolean): React.CSSProperties => ({
        ...inputBase,
        border: `1.5px solid ${focused ? '#FF6B35' : '#e2e8f0'}`,
        background: focused ? '#ffffff' : '#f8fafc',
        color: '#0f172a',
        boxShadow: focused ? '0 0 0 4px rgba(255,107,53,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
    });

    const iconColor = (focused: boolean) => focused ? '#FF6B35' : '#94a3b8';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Inter', sans-serif; }
                @media (min-width: 1024px) {
                    .wm-visual { display: flex !important; }
                    .wm-mobile-badge { display: none !important; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .wm-form-container { animation: fadeUp 0.5s ease both; }
                .wm-float { animation: float 6s ease-in-out infinite; }
                .wm-float-slow { animation: float 9s ease-in-out infinite; }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                fontFamily: "'Inter', -apple-system, sans-serif",
                background: '#f1f5f9',
            }}>

                {/* ───────── LEFT VISUAL PANEL ───────── */}
                <div className="wm-visual" style={{
                    display: 'none',
                    width: '52%',
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 3.5rem',
                }}>
                    {/* Background gradient */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(155deg, #1a0a00 0%, #3d1400 35%, #FF6B35 80%, #ff9a6c 100%)',
                    }} />

                    {/* Subtle noise-like overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(ellipse at 70% 20%, rgba(255,180,100,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,69,0,0.25) 0%, transparent 50%)',
                    }} />

                    {/* Grid lines */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }} />

                    {/* Floating orbs */}
                    <div className="wm-float" style={{
                        position: 'absolute', top: '10%', right: '8%',
                        width: 280, height: 280,
                        background: 'radial-gradient(circle, rgba(255,150,80,0.45) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(40px)',
                    }} />
                    <div className="wm-float-slow" style={{
                        position: 'absolute', bottom: '12%', left: '5%',
                        width: 220, height: 220,
                        background: 'radial-gradient(circle, rgba(255,80,20,0.35) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(50px)',
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: 480, width: '100%' }}>

                        {/* Brand chip */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '0.45rem 1.25rem',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.9)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                        }}>
                            <Globe size={13} strokeWidth={2.5} />
                            Wegomap Travel
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.4rem, 3.8vw, 3.75rem)',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            color: '#ffffff',
                            lineHeight: 1.06,
                            letterSpacing: '-0.035em',
                            marginBottom: '1.5rem',
                        }}>
                            Discover &<br />
                            Book Your<br />
                            <span style={{
                                background: 'linear-gradient(90deg, #ffe0c2, #ffb380)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Dream Trip.
                            </span>
                        </h1>

                        <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 1.7,
                            maxWidth: 380,
                            marginBottom: '3rem',
                            fontWeight: 500,
                        }}>
                            Premium travel management at your fingertips. Plan, track, and enjoy every journey with ease.
                        </p>

                        {/* Stats row */}
                        <div style={{
                            display: 'flex', gap: '2rem',
                            marginBottom: '2.5rem',
                        }}>
                            {[
                                { value: '10K+', label: 'Travelers' },
                                { value: '200+', label: 'Destinations' },
                                { value: '4.9★', label: 'Rating' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{s.value}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Testimonial card */}
                        <div style={{
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '20px',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ffb380, #ff6b35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.1rem', flexShrink: 0,
                            }}>
                                🌍
                            </div>
                            <div>
                                <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontStyle: 'italic' }}>
                                    "Wegomap made planning our honeymoon an absolute breeze. Highly recommend!"
                                </p>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 6, fontWeight: 600 }}>
                                    — Priya M., Kerala
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ───────── RIGHT FORM PANEL ───────── */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    background: '#ffffff',
                    position: 'relative',
                }}>
                    {/* Subtle pattern */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(255,107,53,0.05) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(255,107,53,0.04) 0%, transparent 50%)',
                        pointerEvents: 'none',
                    }} />

                    <div className="wm-form-container" style={{
                        width: '100%',
                        maxWidth: 420,
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        {/* Mobile brand badge */}
                        <div className="wm-mobile-badge" style={{
                            textAlign: 'center',
                            marginBottom: '1.75rem',
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'linear-gradient(135deg, #ff7043, #FF6B35)',
                                color: '#fff',
                                fontWeight: 800,
                                fontSize: '0.75rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '0.4rem 1.2rem',
                                borderRadius: '999px',
                            }}>
                                <Globe size={12} />
                                Wegomap
                            </span>
                        </div>

                        {/* Header */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.875rem',
                                fontWeight: 900,
                                color: '#0f172a',
                                letterSpacing: '-0.04em',
                                lineHeight: 1.15,
                                marginBottom: '0.4rem',
                            }}>
                                {step === 1 ? 'Sign in to Wegomap'
                                    : step === 2 ? 'Check Your Email'
                                    : step === 3 ? 'Reset Your Password'
                                    : 'Enter Reset Code'}
                            </h2>
                            <p style={{
                                color: '#64748b',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                lineHeight: 1.5,
                            }}>
                                {step === 1
                                    ? 'Enter your credentials to access your account'
                                    : step === 2
                                    ? `We sent a 6-digit code to ${email}`
                                    : step === 3
                                    ? 'Enter your email to receive a reset code'
                                    : `Enter the 6-digit code sent to ${email} and your new password`}
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#fff1f0',
                                border: '1.5px solid #fca5a5',
                                color: '#b91c1c',
                                padding: '0.875rem 1rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}>
                                <span>⚠</span> {error}
                            </div>
                        )}

                        {/* STEP 1 */}
                        {step === 1 ? (
                            <form onSubmit={handlePasswordLogin}>
                                {/* Email field */}
                                <div style={{ marginBottom: '1.125rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                        letterSpacing: '0.005em',
                                    }}>
                                        Email Address
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail
                                            size={16}
                                            strokeWidth={2}
                                            style={{
                                                position: 'absolute',
                                                left: '1.0625rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: iconColor(emailFocused),
                                                pointerEvents: 'none',
                                                transition: 'color 0.2s',
                                            }}
                                        />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            placeholder="your@email.com"
                                            style={inputActive(emailFocused)}
                                        />
                                    </div>
                                </div>

                                {/* Password field */}
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock
                                            size={16}
                                            strokeWidth={2}
                                            style={{
                                                position: 'absolute',
                                                left: '1.0625rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: iconColor(passwordFocused),
                                                pointerEvents: 'none',
                                                transition: 'color 0.2s',
                                            }}
                                        />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            placeholder="••••••••"
                                            style={{ ...inputActive(passwordFocused), paddingRight: '3rem' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            style={{
                                                position: 'absolute',
                                                right: '1rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#94a3b8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: 0,
                                            }}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot password link */}
                                <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setError(''); setStep(3); }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#FF6B35',
                                            fontWeight: 600,
                                            fontSize: '0.8125rem',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            padding: 0,
                                        }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onMouseEnter={() => setBtnHover(true)}
                                    onMouseLeave={() => setBtnHover(false)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.9375rem 1.5rem',
                                        borderRadius: '14px',
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '0.9375rem',
                                        fontWeight: 800,
                                        fontFamily: 'inherit',
                                        color: '#ffffff',
                                        background: loading
                                            ? '#f0c9b8'
                                            : btnHover
                                                ? 'linear-gradient(135deg, #e8521c, #e55a20)'
                                                : 'linear-gradient(135deg, #ff7043, #FF6B35)',
                                        boxShadow: loading || !btnHover
                                            ? '0 4px 18px rgba(255,107,53,0.28)'
                                            : '0 8px 28px rgba(255,107,53,0.42)',
                                        transform: !loading && btnHover ? 'translateY(-1px)' : 'translateY(0)',
                                        transition: 'all 0.2s ease',
                                        letterSpacing: '0.01em',
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span style={{
                                                width: 16, height: 16, borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.4)',
                                                borderTopColor: '#fff',
                                                display: 'inline-block',
                                                animation: 'spin 0.7s linear infinite',
                                            }} />
                                            Signing in…
                                        </>
                                    ) : (
                                        <>Sign In <ArrowRight size={16} strokeWidth={2.5} /></>
                                    )}
                                </button>
                            </form>
                        ) : step === 2 ? (
                            /* STEP 2 — Email Verification */
                            <form onSubmit={handleVerify}>
                                <div style={{ marginBottom: '1.875rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Verification Code
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                left: '1.0625rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: iconColor(codeFocused),
                                                pointerEvents: 'none',
                                            }}
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={code}
                                            maxLength={6}
                                            onChange={e => setCode(e.target.value)}
                                            onFocus={() => setCodeFocused(true)}
                                            onBlur={() => setCodeFocused(false)}
                                            placeholder="Enter 6-digit code"
                                            style={inputActive(codeFocused)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.9375rem',
                                        borderRadius: '14px',
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '0.9375rem',
                                        fontWeight: 800,
                                        fontFamily: 'inherit',
                                        color: '#fff',
                                        background: loading ? '#f0c9b8' : 'linear-gradient(135deg, #ff7043, #FF6B35)',
                                        boxShadow: '0 4px 18px rgba(255,107,53,0.28)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {loading ? 'Verifying…' : (<>Verify & Continue <ArrowRight size={16} /></>)}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setError(''); setStep(1); }}
                                        style={{
                                            background: 'none', border: 'none',
                                            color: '#64748b', fontWeight: 700,
                                            cursor: 'pointer', fontSize: '0.875rem',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        ← Back to Login
                                    </button>
                                </div>
                            </form>
                        ) : step === 3 ? (
                            /* STEP 3 — Forgot Password: enter email */
                            <form onSubmit={handleForgotPassword}>
                                <div style={{ marginBottom: '1.875rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Email Address
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                left: '1.0625rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: iconColor(emailFocused),
                                                pointerEvents: 'none',
                                            }}
                                        />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            placeholder="your@email.com"
                                            style={inputActive(emailFocused)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onMouseEnter={() => setBtnHover(true)}
                                    onMouseLeave={() => setBtnHover(false)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.9375rem',
                                        borderRadius: '14px',
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '0.9375rem',
                                        fontWeight: 800,
                                        fontFamily: 'inherit',
                                        color: '#fff',
                                        background: loading ? '#f0c9b8' : btnHover ? 'linear-gradient(135deg, #e8521c, #e55a20)' : 'linear-gradient(135deg, #ff7043, #FF6B35)',
                                        boxShadow: '0 4px 18px rgba(255,107,53,0.28)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {loading ? 'Sending…' : (<>Send Reset Code <ArrowRight size={16} /></>)}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setError(''); setStep(1); }}
                                        style={{
                                            background: 'none', border: 'none',
                                            color: '#64748b', fontWeight: 700,
                                            cursor: 'pointer', fontSize: '0.875rem',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        ← Back to Login
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* STEP 4 — Enter reset code + new password */
                            <form onSubmit={handleResetPassword}>
                                {/* Code */}
                                <div style={{ marginBottom: '1.125rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Reset Code
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail
                                            size={16}
                                            style={{
                                                position: 'absolute',
                                                left: '1.0625rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: iconColor(codeFocused),
                                                pointerEvents: 'none',
                                            }}
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={code}
                                            maxLength={6}
                                            onChange={e => setCode(e.target.value)}
                                            onFocus={() => setCodeFocused(true)}
                                            onBlur={() => setCodeFocused(false)}
                                            placeholder="Enter 6-digit code"
                                            style={inputActive(codeFocused)}
                                        />
                                    </div>
                                </div>
                                {/* New password */}
                                <div style={{ marginBottom: '1.125rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        New Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={16} style={{
                                            position: 'absolute', left: '1.0625rem', top: '50%',
                                            transform: 'translateY(-50%)', color: iconColor(newPasswordFocused),
                                            pointerEvents: 'none', transition: 'color 0.2s',
                                        }} />
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            required
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            onFocus={() => setNewPasswordFocused(true)}
                                            onBlur={() => setNewPasswordFocused(false)}
                                            placeholder="••••••••"
                                            style={{ ...inputActive(newPasswordFocused), paddingRight: '3rem' }}
                                        />
                                        <button type="button" onClick={() => setShowNewPassword(p => !p)}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: 0 }}>
                                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                {/* Confirm password */}
                                <div style={{ marginBottom: '1.875rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Confirm New Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={16} style={{
                                            position: 'absolute', left: '1.0625rem', top: '50%',
                                            transform: 'translateY(-50%)', color: iconColor(confirmPasswordFocused),
                                            pointerEvents: 'none', transition: 'color 0.2s',
                                        }} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            onFocus={() => setConfirmPasswordFocused(true)}
                                            onBlur={() => setConfirmPasswordFocused(false)}
                                            placeholder="••••••••"
                                            style={{ ...inputActive(confirmPasswordFocused), paddingRight: '3rem' }}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: 0 }}>
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onMouseEnter={() => setBtnHover(true)}
                                    onMouseLeave={() => setBtnHover(false)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.9375rem',
                                        borderRadius: '14px',
                                        border: 'none',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '0.9375rem',
                                        fontWeight: 800,
                                        fontFamily: 'inherit',
                                        color: '#fff',
                                        background: loading ? '#f0c9b8' : btnHover ? 'linear-gradient(135deg, #e8521c, #e55a20)' : 'linear-gradient(135deg, #ff7043, #FF6B35)',
                                        boxShadow: '0 4px 18px rgba(255,107,53,0.28)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {loading ? 'Resetting…' : (<>Reset Password <ArrowRight size={16} /></>)}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setError(''); setStep(3); }}
                                        style={{
                                            background: 'none', border: 'none',
                                            color: '#64748b', fontWeight: 700,
                                            cursor: 'pointer', fontSize: '0.875rem',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Divider */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.875rem',
                            margin: '1.75rem 0',
                        }}>
                            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', letterSpacing: '0.05em' }}>NEW HERE?</span>
                            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                        </div>

                        {/* Create account */}
                        <Link
                            href="/signup"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                width: '100%',
                                padding: '0.9rem',
                                borderRadius: '14px',
                                border: '1.5px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#0f172a',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                letterSpacing: '0.01em',
                            }}
                        >
                            Create a free account
                        </Link>

                        {/* Footer */}
                        <div style={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '2rem',
                        }}>
                            {[
                                { label: 'About', href: '/about' },
                                { label: 'Support', href: '/contact' },
                            ].map(l => (
                                <Link key={l.label} href={l.href} style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
