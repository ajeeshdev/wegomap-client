import type { Metadata } from "next";
import { Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import "../../scss/style.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dancingScript.variable} font-sans antialiased text-slate-900 bg-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
