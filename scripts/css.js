import fs from 'fs';
import path from 'path';

// Base directories to scan
const BASE_DIRECTORIES = [

  './assets/design-system', // Add this for the example structure
];

// Extensions to include
const FILE_EXTENSIONS = ['.vue', '.scss'];

// Helper function to recursively get all files in a directory
const getFilesFromDirectory = (directoryPath, extensions) => {
  let fileList = [];
  const items = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directoryPath, item.name);
    if (item.isDirectory()) {
      fileList = fileList.concat(getFilesFromDirectory(fullPath, extensions));
    } else if (item.isFile() && extensions.some(ext => fullPath.endsWith(ext))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
};

// Generate the smart file list
const generateFileList = () => {
  let filesToMerge = [];
  for (const baseDir of BASE_DIRECTORIES) {
    if (fs.existsSync(baseDir)) {
      filesToMerge = filesToMerge.concat(getFilesFromDirectory(baseDir, FILE_EXTENSIONS));
    } else {
      console.warn(`[Warning] Directory not found: ${baseDir}`);
    }
  }
  return filesToMerge;
};

// List of specific files or directories to merge
const FILES_TO_MERGE = generateFileList();

// Output file path
const OUTPUT_FILE = './scripts/merged/design.vue';

// Merge the files and add comments with file paths
const mergeFiles = () => {
  let mergedContent = '';

  for (const filePath of FILES_TO_MERGE) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      mergedContent += `\n/* === ${filePath} === */\n`;
      mergedContent += content + '\n';
    } else {
      console.warn(`[Warning] File or directory not found: ${filePath}`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, mergedContent, 'utf-8');
  console.log(`Merged files written to: ${OUTPUT_FILE}`);
};

// Run the merge function
mergeFiles();
