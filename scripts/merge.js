import fs from "fs";
import path from "path";
import { mergeFiles } from "./utils/mergeFiles.js";

/**
 * Define Ingredient pages to merge.
 */
const filesToMerge = [
  "pages/ingredients/[ingredientId]/dashboard.vue",
  "pages/ingredients/[ingredientId]/edit.vue",
  "pages/ingredients/[ingredientId]/index.vue",
  "pages/ingredients/create.vue",
  "pages/ingredients/index.vue",
];

/**
 * Define the extension for the merged file.
 */
const extension = "vue";

/**
 * Run the merge function.
 */
mergeFiles(filesToMerge, extension);
