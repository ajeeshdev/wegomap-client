export const API_URL = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '')  
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '').trim() 
    : (typeof window !== 'undefined' && window.location.hostname === 'localhost')
        ? 'http://localhost:5001/api'
        : 'https://api-demo.wegomap.com/api';


// Derive uploads base URL from API URL (remove /api suffix)
// Special handling: if relative or localhost, ensure we define a solid base for production uploads
export const UPLOADS_URL = API_URL.startsWith('http') 
    ? API_URL.replace(/\/api\/?$/, '') 
    : 'https://api-demo.wegomap.com';

/**
 * Resolves an image path to a full URL using the correct base.
 * - Handles absolute URLs from wegomap.com -> replaces with current UPLOADS_URL
 * - Handles relative /uploads/... paths -> prepends UPLOADS_URL
 * - Handles already-correct absolute URLs -> returns as-is
 */
export const getImageUrl = (src: string | null | undefined): string => {
    if (!src) return '/bg-placeholder.jpg';
    
    // Convert to string and trim
    let resolved = String(src).trim();

    // 1. Handle production domain migration (absolute URLs)
    // Strip any localhost or wegomap domain to convert to relative first
    const migrationPatterns = [
        /^https?:\/\/([a-z0-9-]+\.)*wegomap\.com/i,
        /^http:\/\/localhost:5001/i,
        /^http:\/\/127\.0.0\.1:5001/i
    ];

    for (const pattern of migrationPatterns) {
        if (pattern.test(resolved)) {
            resolved = resolved.replace(pattern, '');
            break;
        }
    }
    
    // 2. Remove leading slash and handle potential '/api/' prefix in saved paths
    resolved = resolved.replace(/^\/?api\//i, '/').replace(/^\/+/, '');

    // 3. Handle paths starting with uploads/
    // This ensures that even if no domain was provided (relative path), it resolves to the UPLOADS_URL.
    if (resolved.startsWith('uploads/')) {
        resolved = `${UPLOADS_URL}/${resolved}`;
    }
    
    // 3. Absolute URL without protocol? Prepend https
    if (resolved.includes('wegomap.com') && !resolved.startsWith('http')) {
        resolved = 'https://' + resolved;
    }

    // 3. Fallback for potential double slashes (e.g., https://domain.com//uploads)
    // but preserving the protocol's double slash
    resolved = resolved.replace(/([^:]\/)\/+/g, "$1");

    // Final safety check: if resolved starts with /assets or similar root folders, assume it's a public asset
    if (resolved.startsWith('/') && !resolved.startsWith('/uploads/')) {
        return resolved;
    }
    
    return resolved;
};
