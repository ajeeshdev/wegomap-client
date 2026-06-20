"use client";

import { useEffect } from "react";

interface ClientAnalyticsProps {
  html: string;
}

/**
 * Parses HTML analytics snippets (containing <script> tags) from the CMS
 * and injects them into the document after hydration, so they don't block rendering.
 */
export default function ClientAnalytics({ html }: ClientAnalyticsProps) {
  useEffect(() => {
    if (!html) return;
    const container = document.createElement("div");
    container.innerHTML = html;

    const scripts = container.querySelectorAll("script");
    scripts.forEach((original) => {
      const script = document.createElement("script");
      // Copy all attributes (src, async, defer, data-* etc.)
      Array.from(original.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      if (!original.src) {
        script.textContent = original.textContent;
      }
      document.body.appendChild(script);
    });
  }, []);

  return null;
}
