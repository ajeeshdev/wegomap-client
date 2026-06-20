"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
    useEffect(() => {
        // Import top-level bootstrap package — has built-in TS types in v5
        void import("bootstrap").catch((err) =>
            console.error("Failed to load Bootstrap:", err)
        );
    }, []);

    return null;
}
