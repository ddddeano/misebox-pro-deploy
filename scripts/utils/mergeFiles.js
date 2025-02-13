import fs from "fs";
import path from "path";

/**
 * Merges specified files into a single output file named `merged.<extension>`.
 * @param {string[]} files - Array of file paths to merge.
 * @param {string} extension - File extension for the output file (e.g., "vue", "js").
 */
export const mergeFiles = (files, extension) => {
  const outputFile = `./scripts/merged/merged.${extension}`; // Output file path

  const validFiles = files.filter((filePath) => {
    if (fs.existsSync(filePath)) return true;
    console.warn(`[⚠️ Warning] File not found: ${filePath}`);
    return false;
  });

  if (!validFiles.length) {
    console.warn("[⚠️ Warning] No valid files to merge. Check your file paths.");
    return;
  }

  let mergedContent = "";

  validFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const commentBlock = `// ============================\n// ${filePath}\n// ============================`;
      mergedContent += `\n${commentBlock}\n\n${content}\n`;
    } catch (err) {
      console.error(`[❌ Error] Unable to read file: ${filePath}`, err);
    }
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, mergedContent, "utf-8");
  console.log(`✅ Merged files written to: ${outputFile}`);
};
