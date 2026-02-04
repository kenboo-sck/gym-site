const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = './public';
const BACKUP = './public_backup';

async function compress() {
    const files = fs.readdirSync(PUBLIC);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ext !== '.jpeg' && ext !== '.jpg') continue;

        const filePath = path.join(PUBLIC, file);
        const stat = fs.statSync(filePath);

        if (stat.size < 500000) {
            console.log('Skip:', file, Math.round(stat.size / 1024), 'KB');
            continue;
        }

        console.log('Processing:', file, Math.round(stat.size / 1024 / 1024 * 100) / 100, 'MB');

        // Backup
        const backupPath = path.join(BACKUP, file);
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
        }

        try {
            const buf = await sharp(filePath)
                .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 65, mozjpeg: true })
                .toBuffer();

            fs.writeFileSync(filePath, buf);
            console.log('  -> Done:', Math.round(buf.length / 1024), 'KB');
        } catch (e) {
            console.log('  -> Error:', e.message);
        }
    }

    console.log('Complete!');
}

compress();
