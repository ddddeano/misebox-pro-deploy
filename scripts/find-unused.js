import fs from 'fs';
import path from 'path';

// Directories to scan
const COMPONENTS_DIR = './components';
const COMPOSABLES_DIR = './composables';

// Directories to search for usage
const SEARCH_DIRS = ['./pages', './components', './composables'];

// File extensions
const ALLOWED_EXTENSIONS = ['.vue', '.js', '.ts'];

// Helper: Recursively get all files
const getAllFiles = (dir, extensions = ALLOWED_EXTENSIONS) => {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (extensions.some((ext) => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
};

// Helper: Check if a file is used, ignoring self-references
const isFileUsed = (filePath, allSearchFiles) => {
  const baseName = path.basename(filePath, path.extname(filePath));
  const exactImportRegex = new RegExp(`\\b${baseName}\\b`, 'g'); // Match exact name

  return allSearchFiles.some((file) => {
    if (file === filePath) return false; // Skip self-reference
    const content = fs.readFileSync(file, 'utf-8');
    return exactImportRegex.test(content);
  });
};

// Find unused files
const findUnusedFiles = () => {
  const components = getAllFiles(COMPONENTS_DIR);
  const composables = getAllFiles(COMPOSABLES_DIR);

  const allSearchFiles = SEARCH_DIRS.flatMap((dir) => getAllFiles(dir));

  // Filter unused components and composables
  const unusedComponents = components.filter((file) => !isFileUsed(file, allSearchFiles));
  const unusedComposables = composables.filter((file) => !isFileUsed(file, allSearchFiles));

  console.log('\n🔍 Unused Components:');
  unusedComponents.length
    ? unusedComponents.forEach((file) => console.log(`- ${file}`))
    : console.log('✅ All components are used.');

  console.log('\n🔍 Unused Composables:');
  unusedComposables.length
    ? unusedComposables.forEach((file) => console.log(`- ${file}`))
    : console.log('✅ All composables are used.');

  console.log('\n✅ Scan complete.');
};

// Run the script
findUnusedFiles();
