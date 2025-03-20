import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// config
const outputPath = './build/firefox.zip';
const filesToAdd = [
  'tsconfig.json',
  'README.md',
  'package.json',
  '.prettierrc.mjs',
  'package-lock.json',
  { path: 'TRANSLATIONS/', wildcard: true },
  { path: 'src/', wildcard: true },
  { path: 'locales/', wildcard: true },
  { path: 'assets/', wildcard: true }
];

// make sure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// create a file to stream archive data to.
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`ZIP package created, size: ${archive.pointer()} bytes`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('File not found warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// add files to archive
filesToAdd.forEach(item => {
  if (typeof item === 'string') {
    archive.file(item, { name: path.basename(item) });
  } else if (item.wildcard) {
    archive.directory(item.path, path.basename(item.path));
  }
});

archive.finalize();