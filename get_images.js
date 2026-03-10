const fs = require('fs');
const path = require('path');
const https = require('https');

const pagesDir = '/Users/ajeeshrajan/Documents/wegomap/frontend/src/app';

// 1. Get all routes
const routes = fs.readdirSync(pagesDir).filter(dir => {
    return fs.existsSync(path.join(pagesDir, dir, 'page.tsx')) &&
        fs.readFileSync(path.join(pagesDir, dir, 'page.tsx'), 'utf8').includes('TourCategoryPage');
});

// 2. Scrape each route
async function fetchImages(route) {
    return new Promise((resolve, reject) => {
        let url = `https://www.wegomap.com/${route}`;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                const imgRegex = /<img[^>]*src="([^"]*uploads\/packages[^"]*)"[^>]*>/gi;
                let match;
                const images = {};
                while ((match = imgRegex.exec(data)) !== null) {
                    const imgTag = match[0];
                    const altMatch = imgTag.match(/alt="([^"]*)"/i);
                    const src = match[1];
                    // Also check if src has anything before uploads
                    const cleanSrc = src.substring(src.indexOf('uploads/'));
                    if (altMatch) {
                        const title = altMatch[1].replace(/Package/gi, '').trim().toLowerCase();
                        images[title] = cleanSrc;
                    }
                }

                // If there's a banner image we should also grab it
                const bannerRegex = /background-image:\s*url\(([^)]+)\)/i;
                const bannerMatch = data.match(bannerRegex);
                if (bannerMatch) {
                    let bImg = bannerMatch[1].replace(/['"]/g, '');
                    const cleanBannerSrc = bImg.includes('http') ? bImg : `https://www.wegomap.com/${bImg.startsWith('/') ? bImg.slice(1) : bImg}`;
                    images['_banner'] = cleanBannerSrc;
                }

                resolve(images);
            });
        }).on('error', reject);
    });
}

// 3. Update the page.tsx
async function processAll() {
    for (const route of routes) {
        try {
            const liveImages = await fetchImages(route);
            const tsxPath = path.join(pagesDir, route, 'page.tsx');
            let content = fs.readFileSync(tsxPath, 'utf8');
            let modified = false;

            // Update Banner Image
            if (liveImages['_banner']) {
                const updatedBanner = content.replace(/bannerImage="https:\/\/www\.wegomap\.com\/[^"]*"/, `bannerImage="${liveImages['_banner']}"`);
                if (updatedBanner !== content) {
                    content = updatedBanner;
                    modified = true;
                }
            }

            const titleRegex = /title:\s*'([^']+)'/g;
            let m;
            const updates = [];
            while ((m = titleRegex.exec(content)) !== null) {
                const title = m[1].replace(/Package/gi, '').trim().toLowerCase();
                let foundSrc = null;

                // Find best matching alt
                for (const alt of Object.keys(liveImages)) {
                    if (alt === '_banner') continue;
                    if (alt === title || alt.includes(title) || title.includes(alt)) {
                        foundSrc = liveImages[alt];
                        break;
                    }
                }

                if (!foundSrc) {
                    const titleWords = title.split(' ').filter(w => w.length > 3);
                    for (const alt of Object.keys(liveImages)) {
                        if (alt === '_banner') continue;
                        if (titleWords.some(w => alt.includes(w))) {
                            foundSrc = liveImages[alt];
                            break;
                        }
                    }
                }

                if (foundSrc) {
                    updates.push({ title: m[1], newSrc: foundSrc });
                }
            }

            for (const upd of updates) {
                const escapedTitle = upd.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // The structure is typically:
                // image: '...',
                // duration: '...',
                // title: '...'
                // We use a regex that matches from image: to title: allowing for random spacing/fields
                const blockRegex = new RegExp(`image:\\s*'[^']+',\\s*(?:[^}]+)?title:\\s*'${escapedTitle}'`, 'g');

                content = content.replace(blockRegex, (match) => {
                    return match.replace(/image:\s*'[^']+'/, `image: '${upd.newSrc}'`);
                });
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(tsxPath, content);
                console.log(`Updated ${route}`);
            } else {
                console.log(`No images matched for ${route} (possibly already correctly set or mismatched)`);
            }

        } catch (e) {
            console.error(`Error processing ${route}:`, e);
        }
    }
}
processAll();
