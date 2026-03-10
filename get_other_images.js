const https = require('https');

const urls = [
    'https://www.wegomap.com/corporate-event-management-company-kochi/',
    'https://www.wegomap.com/cruise-packages/',
    'https://www.wegomap.com/services/'
];

urls.forEach(url => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
             const bannerRegex = /background-image:\s*url\(([^)]+)\)/i;
             const banner = data.match(bannerRegex);
             console.log(url, "Banner:", banner ? banner[1] : "none");
             
             const imgRegex = /<img[^>]+src="([^">]+)"/g;
             let m;
             while ((m = imgRegex.exec(data)) !== null) {
                 if (m[1].includes('uploads') || m[1].includes('assests')) {
                     console.log("  img:", m[1]);
                 }
             }
        });
    });
});
