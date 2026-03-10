const https = require('https');
https.get('https://www.wegomap.com/kerala-alleppey-boat-house/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
         const bannerRegex = /background-image:\s*url\(([^)]+)\)/i;
         const banner = data.match(bannerRegex);
         console.log("Banner:", banner ? banner[1] : "none");
         
         const imgRegex = /<img[^>]+src="([^">]+)"/g;
         let m;
         while ((m = imgRegex.exec(data)) !== null) {
             if (m[1].includes('uploads') || m[1].includes('assests')) {
                 console.log("  img:", m[1]);
             }
         }
    });
});
