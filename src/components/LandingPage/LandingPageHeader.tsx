"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { API_URL, getImageUrl } from "@/config";

const SCROLL_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "packages", label: "Packages" },
  { id: "testimonials", label: "Reviews" },
  { id: "about", label: "About" },
  { id: "why-choose", label: "Why Choose Us" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function LandingPageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState("/assets/images/logo.png");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${API_URL}/options`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success) {
          const logoOpt = json.data.find((o: any) => o.key === "site_logo");
          if (logoOpt && logoOpt.value) setLogo(getImageUrl(logoOpt.value));
        }
      } catch (err) {
        console.error("Failed to fetch logo", err);
      }
    };
    fetchLogo();
  }, []);

  return (
    <header className="lp-header">
      <div className="lp-header-inner homeContainer">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="lp-header-brand"
          aria-label="Scroll to top"
        >
          <Image
            src={logo}
            alt="Wegomap"
            width={160}
            height={40}
            className="lp-header-logo"
            unoptimized
          />
        </button>

        <nav className="lp-header-nav">
          <ul className="lp-header-nav-list">
            {SCROLL_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="lp-header-nav-link"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="lp-header-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="lp-header-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
      <div className={`lp-header-mobile ${menuOpen ? "lp-header-mobile--open" : ""}`}>
        <ul className="lp-header-mobile-list">
          {SCROLL_SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  scrollToSection(id);
                  setMenuOpen(false);
                }}
                className="lp-header-mobile-link"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
