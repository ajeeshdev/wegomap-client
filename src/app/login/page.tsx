"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication for standard form
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('authChange'));
        router.push('/');
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await res.json();

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userProfile', JSON.stringify(userInfo));
                window.dispatchEvent(new Event('authChange'));
                router.push('/');
            } catch (err) {
                console.error("Failed to fetch user info", err);
            }
        },
        onError: () => console.error("Google Login Failed"),
    });

    return (
        <div className="authPage">

            {/* Left Image Section */}
            <div className="authLeft">
                <div className="authImageWrapper">
                    <Image
                        src="/uploads/categories/twlgefqv2zwvq2gs99ix4ozzi3n9r41z9xbotxid250131024536.jpg"
                        alt="Login Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div className="authOverlay"></div>
                </div>

                <Link href="/" className="authBrand" style={{ textDecoration: 'none' }}>
                    <div className="logoText">wego<span>map</span></div>
                </Link>

                <div className="authQuoteBox">
                    <p className="quoteText">
                        "Wegomaps provided an outstanding Kerala experience, surpassing expectations. From well-curated itineraries to impeccable accommodations, every detail was meticulously planned."
                    </p>
                    <p className="quoteAuthor">Sumit Kumar Sinha</p>
                    <p className="quoteRole">Happy Traveler</p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="authRight">
                <div className="authFormContainer">

                    <Link href="/" className="authMobileLogo" style={{ textDecoration: 'none' }}>
                        <div className="logoText" style={{ textAlign: 'center' }}>wego<span>map</span></div>
                    </Link>

                    <div className="authHeader">
                        <h1>Welcome back</h1>
                        <p>We're glad to see you again. Sign in to your account below.</p>
                    </div>

                    <form className="authForm" onSubmit={handleLogin}>

                        <div className="formGroup">
                            <label htmlFor="email">Email address</label>
                            <div className="inputWrap">
                                <Mail className="inputIcon" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <div className="inputWrap">
                                <Lock className="inputIcon" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="passwordToggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="formOptions">
                            <label className="rememberCheckbox">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link href="/login" className="forgotLink">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="submitBtn">
                            Sign in to your account
                        </button>
                    </form>

                    <div className="authDivider">Or continue with</div>

                    <div className="socialAuth">
                        <button type="button" className="socialBtn" onClick={() => loginWithGoogle()}>
                            <Image
                                src="/assests/site/assets/images/google-logo.svg"
                                alt="Google"
                                width={24}
                                height={24}
                                unoptimized
                            />
                            Sign In with Google
                        </button>
                    </div>

                    <div className="authFooter">
                        Don't have an account?
                        <Link href="/login">
                            Sign up here
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}
