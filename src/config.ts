export const API_URL = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '')  
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '').trim() // Remove any trailing slashes
    : 'http://127.0.0.1:5001/api';

// Derive uploads base URL from API URL (remove /api suffix)
// If API_URL is https://api.domain.com/api -> UPLOADS_URL is https://api.domain.com
export const UPLOADS_URL = API_URL.replace(/\/api\/?$/, '');

/**
 * Resolves an image path to a full URL using the correct base.
 * - Handles absolute URLs from www.wegomap.com -> replaces with current UPLOADS_URL (api-demo.wegomap.com)
 * - Handles relative /uploads/... paths -> prepends UPLOADS_URL
 * - Handles already-correct absolute URLs -> returns as-is
 */
export const getImageUrl = (src: string | null | undefined): string => {
    if (!src) return '/bg-placeholder.jpg';
    
    let resolved = src;

    // 1. Handle production domain migration
    // If it points to the old site, rewrite it to our uploads base
    if (resolved.includes('www.wegomap.com')) {
        resolved = resolved.replace('https://www.wegomap.com', UPLOADS_URL);
    }
    
    // 2. Handle relative paths starting with /uploads or uploads/
    if (resolved.startsWith('/uploads/') || resolved.startsWith('uploads/')) {
        const cleanPath = resolved.startsWith('/') ? resolved : `/${resolved}`;
        resolved = `${UPLOADS_URL}${cleanPath}`;
    }
    
    // 3. Fallback for potential double slashes and protocol issues
    return resolved.replace(/([^:]\/)\/+/g, "$1");
};


