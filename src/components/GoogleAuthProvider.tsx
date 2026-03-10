"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AppGoogleAuthProvider({ children }: { children: React.ReactNode }) {
    // Try to use environment variable, fallback to a public demo client ID (only for localhost testing)
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '734491034440-qfom4lso3c6a0c02l0ngotem7aauo8u5.apps.googleusercontent.com';

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
