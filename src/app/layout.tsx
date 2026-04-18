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
    const [optsRes, pagesRes] = await Promise.all([
      fetch(`${API_URL}/options`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/pages?slug=home`, { next: { revalidate: 60 } })
    ]);
    
    const optsJson = await optsRes.json();
    const pagesJson = await pagesRes.json();

    let defaultTitle = "Best Kerala Tour Packages | WEGOMAP";
    let defaultDesc = "Experience the magic of God’s Own Country with WEGOMAP, your reliable Kerala travel partner.";
    let favIconUrl = "/favicon.ico";

    if (optsJson.success && optsJson.data) {
      const titleOpt = optsJson.data.find((o: any) => o.key === 'site_title');
      const favOpt = optsJson.data.find((o: any) => o.key === 'site_favicon');
      const descOpt = optsJson.data.find((o: any) => o.key === 'site_description');
      
      if (titleOpt?.value) defaultTitle = titleOpt.value;
      if (descOpt?.value) defaultDesc = descOpt.value;
      if (favOpt?.value) favIconUrl = getImageUrl(favOpt.value);
    }

    // Try to get specific 'home' page SEO overrides
    if (pagesJson.success && pagesJson.data) {
      const homePage = pagesJson.data.find((p: any) => p.slug === 'home');
      if (homePage) {
        if (homePage.seo_title) defaultTitle = homePage.seo_title;
        if (homePage.seo_description || homePage.seo_meta) {
          defaultDesc = homePage.seo_description || homePage.seo_meta;
        }
      }
    }

    return {
      metadataBase: new URL('https://www.wegomap.com'),
      title: defaultTitle,
      description: defaultDesc,
      robots: "index, follow",
      icons: {
        icon: favIconUrl,
        shortcut: favIconUrl,
        apple: favIconUrl,
      }
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return {
    title: "Best Kerala Tour Packages | WEGOMAP",
    description: "Experience the magic of God’s Own Country with WEGOMAP, your reliable Kerala travel partner.",
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
import CaptchaProvider from '@/components/CaptchaProvider';


import "../../scss/style.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${outfit.variable} ${dancingScript.variable} font-sans antialiased text-slate-900 bg-white`}>
        <AppGoogleAuthProvider>
          <CaptchaProvider>
            <EnquiryProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </EnquiryProvider>
          </CaptchaProvider>

          <BootstrapClient />
          <Toaster position="top-right" containerStyle={{ zIndex: 999999999 }} />
        </AppGoogleAuthProvider>
      </body>
    </html>
  );
}
