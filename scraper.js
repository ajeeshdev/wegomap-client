const https = require('https');
const urls = [
  'https://www.wegomap.com/services/',
  'https://www.wegomap.com/corporate-event-management-company-kochi/',
  'https://www.wegomap.com/cruise-packages/',
  'https://www.wegomap.com/payment/',
  'https://www.wegomap.com/contact/'
];
urls.forEach(url => {
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => {
       const start = data.indexOf('<section class="banner');
       let end = data.indexOf('<section class="footer">');
       if(end === -1) end = data.indexOf('<footer');
       console.log("===", url, "===");
       console.log(data.substring(start > 0 ? start : 0, end > 0 ? end : 1000).replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 1500));
    });
  });
});
