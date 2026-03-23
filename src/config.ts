export const API_URL = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '')  
    ? process.env.NEXT_PUBLIC_API_URL.trim() 
    : 'http://127.0.0.1:5001/api';

// Derive uploads base URL from API URL (remove /api suffix, add /uploads)
export const UPLOADS_URL = API_URL.replace(/\/api$/, '');

/**
 * Resolves an image path to a full URL using the correct base.
 * - Handles absolute URLs from www.wegomap.com → replaces with demo API
 * - Handles relative /uploads/... paths → prepends uploads base URL
 * - Handles already-correct absolute URLs → returns as-is
 */
export const getImageUrl = (src: string | null | undefined): string => {
    if (!src) return '';
    
    // Replace old production domain with current API uploads base
    if (src.includes('www.wegomap.com')) {
        return src.replace('https://www.wegomap.com', UPLOADS_URL);
    }
    
    // Handle relative paths like /uploads/... or uploads/...
    if (src.startsWith('/uploads/') || src.startsWith('uploads/')) {
        const clean = src.startsWith('/') ? src : `/${src}`;
        return `${UPLOADS_URL}${clean}`;
    }
    
    // Already a full URL or a local asset
    return src;
};

