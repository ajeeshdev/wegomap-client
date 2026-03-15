import type { Metadata } from "next";
import { Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import "../../scss/style.scss";
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

export const metadata: Metadata = {
  title: "Best Kerala Tour Packages | Wegomap",
  description: "Experience the magic of God’s Own Country with Wegomap, your reliable Kerala travel partner.",
};

import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dancingScript.variable} font-sans antialiased text-slate-900 bg-white`}>
        <AppGoogleAuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <BootstrapClient />
          <Toaster position="top-right" containerStyle={{ zIndex: 999999999 }} />
        </AppGoogleAuthProvider>
      </body>
    </html>
  );
}
