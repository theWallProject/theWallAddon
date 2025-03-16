import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// 配置参数
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

// 确保输出目录存在
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 创建输出流
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`ZIP包已创建，大小：${archive.pointer()} bytes`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('文件未找到警告:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// 添加文件到压缩包
filesToAdd.forEach(item => {
  if (typeof item === 'string') {
    archive.file(item, { name: path.basename(item) });
  } else if (item.wildcard) {
    archive.directory(item.path, path.basename(item.path));
  }
});

archive.finalize();