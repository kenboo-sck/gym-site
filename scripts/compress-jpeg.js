/**
 * JPEG強制圧縮スクリプト
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(__dirname, '..', 'public_backup');

const JPEG_QUALITY = 65;
const MAX_WIDTH = 1600;

async function main() {
    console.log('=== JPEG強制圧縮 ===\n');

    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const files = fs.readdirSync(PUBLIC_DIR);
    let totalSaved = 0;

    for (const file of files) {
        const filePath = path.join(PUBLIC_DIR, file);
        const ext = path.extname(file).toLowerCase();

        // .jpegと.jpg両方処理
        if (ext !== '.jpeg' && ext !== '.jpg') continue;

        try {
            const stat = fs.statSync(filePath);
            if (!stat.isFile()) continue;

            const originalSize = stat.size;
            if (originalSize < 500 * 1024) {
                console.log(`[スキップ] ${file} (${(originalSize / 1024).toFixed(0)}KB)`);
                continue;
            }

            console.log(`[処理] ${file} (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);

            // バックアップ
            const backupPath = path.join(BACKUP_DIR, file);
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(filePath, backupPath);
            }

            const outputBuffer = await sharp(filePath)
                .resize(MAX_WIDTH, MAX_WIDTH, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
                .toBuffer();

            const newSize = outputBuffer.length;

            if (newSize < originalSize) {
                fs.writeFileSync(filePath, outputBuffer);
                const saved = originalSize - newSize;
                totalSaved += saved;
                console.log(`  → ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(1)}% 削減)`);
            }
        } catch (err) {
            console.error(`  → エラー: ${err.message}`);
        }
    }

    console.log(`\n合計削減: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

main();
