<?php
// WEGOMAP Deployment Helper
// This script extracts the deploy.zip and cleans up.

$zipFile = 'deploy.zip';
$password = 'wegomap_deploy_2026'; // Simple security check

if (!isset($_GET['token']) || $_GET['token'] !== $password) {
    die('Unauthorized');
}

if (!file_exists($zipFile)) {
    die('Error: deploy.zip not found');
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo('./');
    $zip->close();
    echo "✅ Extraction complete!\n";
    
    // Cleanup
    unlink($zipFile);
    unlink(__FILE__);
    echo "🧹 Cleanup complete!\n";
} else {
    echo "❌ Extraction failed!";
}
?>
