<?php
/**
 * 🚀 WEGOMAP - HIGH SPEED DEPLOY EXTRACTOR
 * This script unzips the 'deploy.zip' file uploaded by GitHub Actions.
 */

$zipFile = 'deploy.zip';
$targetDir = './';

if (isset($_GET['run'])) {
    if (file_exists($zipFile)) {
        $zip = new ZipArchive;
        if ($zip->open($zipFile) === TRUE) {
            $zip->extractTo($targetDir);
            $zip->close();
            echo "<h1>🎉 Extraction Successful!</h1>";
            echo "<p>Your Next.js app has been updated. Please **RESTART** your Node.js app in Hostinger hPanel now.</p>";
            // Optional: delete files after extraction for security
            // unlink($zipFile);
            // unlink(__FILE__);
        } else {
            echo "<h1>❌ Error: Could not open $zipFile</h1>";
        }
    } else {
        echo "<h1>❌ Error: $zipFile not found. Wait for GitHub Action to finish!</h1>";
    }
} else {
    echo "<h1>🚀 Ready for extraction?</h1>";
    echo "<p>Make sure GitHub Action has finished uploading 'deploy.zip'.</p>";
    echo "<a href='?run=1' style='padding: 10px 20px; background: #2563eb; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;'>RUN EXTRACTION NOW</a>";
}
?>
