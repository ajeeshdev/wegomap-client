const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = '/Users/ajeeshrajan/Documents/wegomap/frontend/src';
const publicDir = '/Users/ajeeshrajan/Documents/wegomap/frontend/public';

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

const allFiles = getAllFiles(dir);

const urlsToDownload = new Set();
const fileReplacements = [];

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find https://www.wegomap.com/uploads/... or https://www.wegomap.com/assests/...
    const regex = /https:\/\/www\.wegomap\.com\/(uploads|assests)[^"'\s\)]+/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        urlsToDownload.add(match[0]);
    }
    
    // Also find just 'uploads/...'
    const regex2 = /['"](uploads\/[^"'\s]+)['"]/g;
    while ((match = regex2.exec(content)) !== null) {
        urlsToDownload.add("https://www.wegomap.com/" + match[1]);
    }
});

console.log(`Found ${urlsToDownload.size} unique image URLs to download.`);

async function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        // Path should be like /uploads/packages/foo.jpg
        const relativePath = decodeURIComponent(urlObj.pathname); 
        const destPath = path.join(publicDir, relativePath);
        
        if (fs.existsSync(destPath)) {
            return resolve(relativePath); // already downloaded
        }
        
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(destPath);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(relativePath);
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location).then(resolve).catch(reject);
            } else {
                resolve(null); // Just ignore 404s
            }
        }).on('error', (err) => {
            console.error(err);
            resolve(null);
        });
    });
}

async function processAll() {
    console.log("Downloading images...");
    let cnt = 0;
    for (const url of urlsToDownload) {
        await downloadImage(url);
        cnt++;
        if (cnt % 10 === 0) console.log(`Downloaded ${cnt} / ${urlsToDownload.size}`);
    }
    console.log("Downloads complete.");
    
    console.log("Updating TSX files to use local paths...");
    allFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Remove https://www.wegomap.com/
        const rx = /https:\/\/www\.wegomap\.com\//g;
        if (rx.test(content)) {
            content = content.replace(rx, '/');
            modified = true;
        }

        // Add leading slash to uploads/ packages if needed
        // For example: image: 'uploads/tours/...'
        const rx2 = /image:\s*'(uploads\/[^']+)'/g;
        if (rx2.test(content)) {
            content = content.replace(rx2, "image: '/$1'");
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        }
    });

    console.log("Done.");
}

processAll();
