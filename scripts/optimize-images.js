/**
 * 画像最適化スクリプト v2 - JPEG圧縮強化
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(__dirname, '..', 'public_backup');

const TARGET_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const SIZE_THRESHOLD = 300 * 1024;

// 圧縮設定（より積極的）
const JPEG_QUALITY = 70;
const PNG_QUALITY = 70;
const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;

async function optimizeImage(filePath, ext) {
    let processor = sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
            fit: 'inside',
            withoutEnlargement: true
        });

    if (ext === '.png') {
        return await processor
            .png({ quality: PNG_QUALITY, compressionLevel: 9 })
            .toBuffer();
    } else {
        return await processor
            .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
            .toBuffer();
    }
}

async function main() {
    console.log('=== 画像最適化スクリプト v2 ===\n');

    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const files = fs.readdirSync(PUBLIC_DIR);
    let processedCount = 0;
    let totalSaved = 0;

    for (const file of files) {
        const filePath = path.join(PUBLIC_DIR, file);
        const ext = path.extname(file).toLowerCase();

        try {
            const stat = fs.statSync(filePath);
            if (!stat.isFile() || !TARGET_EXTENSIONS.includes(ext)) continue;

            const originalSize = stat.size;
            if (originalSize < SIZE_THRESHOLD) {
                console.log(`[スキップ] ${file} (${(originalSize / 1024).toFixed(0)}KB)`);
                continue;
            }

            console.log(`[処理中] ${file} (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);

            // バックアップ（存在しなければ）
            const backupPath = path.join(BACKUP_DIR, file);
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(filePath, backupPath);
            }

            const outputBuffer = await optimizeImage(filePath, ext);
            const newSize = outputBuffer.length;

            if (newSize < originalSize) {
                fs.writeFileSync(filePath, outputBuffer);
                const saved = originalSize - newSize;
                totalSaved += saved;
                console.log(`  → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(1)}% 削減)`);
                processedCount++;
            } else {
                console.log(`  → 圧縮効果なし`);
            }
        } catch (err) {
            console.error(`  → エラー: ${err.message}`);
        }
    }

    console.log('\n=== 完了 ===');
    console.log(`処理: ${processedCount}件`);
    console.log(`削減: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

main();
