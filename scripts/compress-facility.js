/**
 * HEIC/JPEG圧縮スクリプト（sharp使用）
 * sharpのデフォルトJPEGエンコーダーで処理
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const BACKUP = path.join(__dirname, '..', 'public_backup');

// 施設ギャラリーで使用している画像
const TARGET_FILES = [
    'image10.jpeg', 'image12.jpeg', 'image14.jpeg', 'image16.jpeg',
    'image18.jpeg', 'image24.jpeg', 'image25.jpeg', 'image6.jpeg',
    'image9.jpeg', 'image5.jpeg', 'image8.jpeg', 'image30.jpeg'
];

async function compressOne(filename) {
    const filePath = path.join(PUBLIC, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`[スキップ] ${filename} - ファイルなし`);
        return 0;
    }

    const stat = fs.statSync(filePath);
    const originalSize = stat.size;
    console.log(`[処理中] ${filename} (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);

    // バックアップ
    const backupPath = path.join(BACKUP, filename);
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
    }

    try {
        // 画像をバッファに読み込み
        const inputBuffer = fs.readFileSync(filePath);

        // sharpで処理（リサイズ＆JPEG再エンコード）
        const outputBuffer = await sharp(inputBuffer)
            .rotate() // EXIFに基づく回転を適用
            .resize(1600, 1600, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 70,
                progressive: true,
                chromaSubsampling: '4:2:0'
            })
            .toBuffer();

        const newSize = outputBuffer.length;
        const savedBytes = originalSize - newSize;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

        if (newSize < originalSize) {
            fs.writeFileSync(filePath, outputBuffer);
            console.log(`  → ${(newSize / 1024).toFixed(0)}KB (${reduction}% 削減)`);
            return savedBytes;
        } else {
            console.log(`  → 圧縮効果なし`);
            return 0;
        }
    } catch (err) {
        console.error(`  → エラー: ${err.message}`);
        return 0;
    }
}

async function main() {
    console.log('=== 施設画像圧縮スクリプト ===\n');

    if (!fs.existsSync(BACKUP)) {
        fs.mkdirSync(BACKUP, { recursive: true });
    }

    let totalSaved = 0;

    for (const file of TARGET_FILES) {
        const saved = await compressOne(file);
        totalSaved += saved;
    }

    console.log(`\n=== 完了 ===`);
    console.log(`合計削減: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

main();
