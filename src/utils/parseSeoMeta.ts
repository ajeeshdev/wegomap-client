/**
 * Parses an arbitrary HTML string of <meta>, <link>, <script> tags
 * and returns a Next.js Metadata-compatible `other` object.
 *
 * Supports:
 *  - <meta name="..." content="..." />
 *  - <meta property="..." content="..." />
 *  - <link rel="..." href="..." />
 *  - <script type="application/ld+json">...</script>  (JSON-LD)
 */
export function parseSeoMeta(html: string): {
    other?: Record<string, string | string[]>;
    openGraph?: Record<string, string>;
    alternates?: { canonical?: string };
} {
    if (!html || !html.trim()) return {};

    const other: Record<string, string | string[]> = {};
    const openGraph: Record<string, string> = {};
    let canonical: string | undefined;

    // Match self-closing and normal tags
    const tagPattern = /<(meta|link|script)[^>]*>(?:[\s\S]*?<\/\1>)?/gi;
    const attrPattern = /(\w[\w:-]*)=["']([^"']*)["']/g;

    let tagMatch;
    while ((tagMatch = tagPattern.exec(html)) !== null) {
        const tagStr = tagMatch[0];
        const tagName = tagMatch[1].toLowerCase();

        // Extract all attributes
        const attrs: Record<string, string> = {};
        let attrMatch;
        attrPattern.lastIndex = 0;
        while ((attrMatch = attrPattern.exec(tagStr)) !== null) {
            attrs[attrMatch[1].toLowerCase()] = attrMatch[2];
        }

        if (tagName === 'meta') {
            const name = attrs['name'] || attrs['property'];
            const content = attrs['content'];
            if (name && content !== undefined) {
                // Handle OG tags via openGraph
                if (name.startsWith('og:')) {
                    const ogKey = name.replace('og:', '') as string;
                    openGraph[ogKey] = content;
                } else if (name === 'robots') {
                    // robots is handled separately by Next.js, but we can put it in other
                    other['robots'] = content;
                } else {
                    // Push as `other` for Next.js metadata
                    other[name] = content;
                }
            }
        } else if (tagName === 'link') {
            const rel = attrs['rel'];
            const href = attrs['href'];
            if (rel === 'canonical' && href) {
                canonical = href;
            } else if (rel && href) {
                other[`link-${rel}`] = href;
            }
        } else if (tagName === 'script') {
            // JSON-LD schema support
            const type = attrs['type'];
            if (type === 'application/ld+json') {
                const contentMatch = tagStr.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
                if (contentMatch) {
                    other['application/ld+json'] = contentMatch[1].trim();
                }
            }
        }
    }

    return {
        other: Object.keys(other).length ? other : undefined,
        openGraph: Object.keys(openGraph).length ? openGraph : undefined,
        alternates: canonical ? { canonical } : undefined,
    };
}
