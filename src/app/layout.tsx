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
import { parseSeoMeta } from "@/utils/parseSeoMeta";

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

    let pageKeywords: string | undefined = undefined;
    let analyticsMeta: any = {};

    if (optsJson.success && optsJson.data) {
      const titleOpt = optsJson.data.find((o: any) => o.key === 'site_title');
      const favOpt = optsJson.data.find((o: any) => o.key === 'site_favicon');
      const descOpt = optsJson.data.find((o: any) => o.key === 'site_description');
      const keysOpt = optsJson.data.find((o: any) => o.key === 'site_keywords');
      const scriptOpt = optsJson.data.find((o: any) => o.key === 'analytics_script');
      
      if (titleOpt?.value) defaultTitle = titleOpt.value;
      if (descOpt?.value) defaultDesc = descOpt.value;
      if (favOpt?.value) favIconUrl = getImageUrl(favOpt.value);
      if (keysOpt?.value) pageKeywords = keysOpt.value;
      
      if (scriptOpt?.value) {
        analyticsMeta = parseSeoMeta(scriptOpt.value);
      }
    }

    // Try to get specific 'home' page SEO overrides
    let canonicalUrl: string | undefined = undefined;
    let parsedHomeMeta: ReturnType<typeof parseSeoMeta> = {};
    if (pagesJson.success && pagesJson.data) {
      const homePage = pagesJson.data.find((p: any) => p.slug === 'home');
      if (homePage) {
        if (homePage.seo_title) defaultTitle = homePage.seo_title;
        if (homePage.seo_description) {
          defaultDesc = homePage.seo_description;
        }
        if (homePage.seo_keys) {
          pageKeywords = homePage.seo_keys;
        }
        if (homePage.seo_canonical) {
          canonicalUrl = homePage.seo_canonical;
        }
        if (homePage.seo_meta) {
          parsedHomeMeta = parseSeoMeta(homePage.seo_meta);
          // seo_canonical takes priority over any canonical in seo_meta
          if (!canonicalUrl && parsedHomeMeta.alternates?.canonical) {
            canonicalUrl = parsedHomeMeta.alternates.canonical;
          }
        }
      }
    }

    const getGoogleVerification = (metaObj: any) => {
      const gv = metaObj?.['google-site-verification'];
      if (!gv) return undefined;
      return Array.isArray(gv) ? gv : [gv];
    };

    let googleVerifications = [
      ...(getGoogleVerification(analyticsMeta.other) || []),
      ...(getGoogleVerification(parsedHomeMeta.other) || [])
    ];
    
    // remove duplicates
    googleVerifications = Array.from(new Set(googleVerifications));

    return {
      metadataBase: new URL('https://www.wegomap.com'),
      title: defaultTitle,
      description: defaultDesc,
      keywords: pageKeywords,
      robots: "index, follow",
      icons: {
        icon: favIconUrl,
        shortcut: favIconUrl,
        apple: favIconUrl,
      },
      alternates: canonicalUrl ? {
        canonical: canonicalUrl,
      } : undefined,
      verification: googleVerifications.length > 0 ? {
        google: googleVerifications.length === 1 ? googleVerifications[0] : googleVerifications,
      } : undefined,
      other: {
        ...analyticsMeta.other,
        ...parsedHomeMeta.other,
      },
      openGraph: {
        ...analyticsMeta.openGraph,
        ...parsedHomeMeta.openGraph,
      } as any,
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return {
    title: "Best Kerala Tour Packages | WEGOMAP",
    description: "Experience the magic of God’s Own Country with WEGOMAP, your reliable Kerala travel partner.",
    robots: "index, follow",
  };
}

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from 'react-hot-toast';
import { EnquiryProvider } from '@/context/EnquiryContext';
import CaptchaProvider from '@/components/CaptchaProvider';
import ClientAnalytics from '@/components/ClientAnalytics';


import "../../scss/style.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let analyticsScript = '';
  try {
    const res = await fetch(`${API_URL}/options`, { next: { revalidate: 60 } });
    const json = await res.json();
    if (json.success && json.data) {
      const scriptOpt = json.data.find((o: any) => o.key === 'analytics_script');
      if (scriptOpt?.value) analyticsScript = scriptOpt.value;
    }
  } catch (err) {
    console.error("Failed to load tracking scripts:", err);
  }

  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS-prefetch for CMS API */}
        <link rel="dns-prefetch" href="https://api-demo.wegomap.com" />
        <link rel="preconnect" href="https://api-demo.wegomap.com" />
      </head>
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
        {/* Analytics injected after hydration so it doesn't block rendering */}
        {analyticsScript && <ClientAnalytics html={analyticsScript} />}
      </body>
    </html>
  );
}
