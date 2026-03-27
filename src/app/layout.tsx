import type { Metadata } from "next";
import { Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import AppGoogleAuthProvider from "@/components/GoogleAuthProvider";
import BootstrapClient from "@/components/BootstrapClient";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-writing",
});

import { API_URL, getImageUrl } from "@/config";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}/options`, { next: { revalidate: 60 } });
    const json = await res.json();
    
    if (json.success && json.data) {
      const titleOpt = json.data.find((o: any) => o.key === 'site_title');
      const favOpt = json.data.find((o: any) => o.key === 'site_favicon');
      const descOpt = json.data.find((o: any) => o.key === 'site_description');
      
      return {
        metadataBase: new URL('https://demo.wegomap.com'),
        title: titleOpt?.value || "Best Kerala Tour Packages | Wegomap",
        description: descOpt?.value || "Experience the magic of God’s Own Country with Wegomap, your reliable Kerala travel partner.",
        robots: "noindex, nofollow",
        icons: {
          icon: getImageUrl(favOpt?.value) || "/favicon.ico",
          shortcut: getImageUrl(favOpt?.value) || "/favicon.ico",
          apple: getImageUrl(favOpt?.value) || "/favicon.ico",
        }
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return {
    title: "Best Kerala Tour Packages | Wegomap",
    description: "Experience the magic of God’s Own Country with Wegomap, your reliable Kerala travel partner.",
    robots: "noindex, nofollow",
  };
}

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from 'react-hot-toast';
import { EnquiryProvider } from '@/context/EnquiryContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/scss/style.css" />
      </head>
      <body className={`${outfit.variable} ${dancingScript.variable} font-sans antialiased text-slate-900 bg-white`}>
        <AppGoogleAuthProvider>
          <EnquiryProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </EnquiryProvider>
          <BootstrapClient />
          <Toaster position="top-right" containerStyle={{ zIndex: 999999999 }} />
        </AppGoogleAuthProvider>
      </body>
    </html>
  );
}
