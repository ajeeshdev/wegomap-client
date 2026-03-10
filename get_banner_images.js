const fs = require('fs');
const path = require('path');
const https = require('https');

const pagesDir = '/Users/ajeeshrajan/Documents/wegomap/frontend/src/app';

// 1. Get all routes
const routes = fs.readdirSync(pagesDir).filter(dir => {
    const p = path.join(pagesDir, dir, 'page.tsx');
    return fs.existsSync(p) && fs.readFileSync(p, 'utf8').includes('TourCategoryPage');
});

// 2. Scrape category banner based on the HTML
async function fetchBannerImage(route) {
    return new Promise((resolve, reject) => {
        let url = `https://www.wegomap.com/${route}`;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                // Find any image in the HTML that matches uploads/categories
                const catRegex = /https?:\/\/(?:www\.)?wegomap\.com\/uploads\/categories\/[^"'\s\)]+\.(?:jpg|png|jpeg)/gi;
                const match = data.match(catRegex);
                if (match && match.length > 0) {
                    // sometimes there are multiple, usually the first is the banner
                    resolve(match[0]);
                } else {
                    // Also check relative /uploads/categories
                    const relRegex = /uploads\/categories\/[^"'\s\)]+\.(?:jpg|png|jpeg)/gi;
                    const relMatch = data.match(relRegex);
                    if (relMatch && relMatch.length > 0) {
                        resolve(`https://www.wegomap.com/${relMatch[0]}`);
                    } else {
                        resolve(null);
                    }
                }
            });
        }).on('error', reject);
    });
}

// 3. Update the page.tsx
async function processAll() {
    for (const route of routes) {
        try {
            const bannerUrl = await fetchBannerImage(route);
            if (bannerUrl) {
                const tsxPath = path.join(pagesDir, route, 'page.tsx');
                let content = fs.readFileSync(tsxPath, 'utf8');

                // Replace any bannerImage="..." with the new URL
                const updatedContent = content.replace(/bannerImage="[^"]*"/, `bannerImage="${bannerUrl}"`);

                if (updatedContent !== content) {
                    fs.writeFileSync(tsxPath, updatedContent);
                    console.log(`Updated banner for ${route} -> ${bannerUrl}`);
                } else {
                    console.log(`No banner change needed for ${route}`);
                }
            } else {
                console.log(`Could not find banner image in live site for ${route}`);
            }
        } catch (e) {
            console.error(`Error processing ${route}:`, e);
        }
    }
}
processAll();
