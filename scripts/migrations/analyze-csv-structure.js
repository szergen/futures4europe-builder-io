#!/usr/bin/env node

/**
 * Analyze CSV structure to understand all fields and page types
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { parse } = require("csv-parse/sync");

const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

console.log(`\n${colors.cyan}CSV Structure Analysis${colors.reset}\n`);

// Load CSV
const fileContent = fs.readFileSync(CSV_FILE, "utf8");
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  bom: true,
  relax_quotes: true,
});

// Load tag mapping
const tagMappingData = fs.readFileSync(TAG_MAPPING_FILE, "utf8");
const tagMapping = JSON.parse(tagMappingData);

console.log(`Total records: ${records.length}\n`);

// Get all column names
console.log(
  `${colors.cyan}All Column Names (${Object.keys(records[0]).length} columns):${
    colors.reset
  }`
);
const columns = Object.keys(records[0]);
columns.sort();
columns.forEach((col, i) => {
  console.log(`  ${i + 1}. ${col}`);
});

// Find all unique page type IDs
console.log(`\n${colors.cyan}All Unique Page Types:${colors.reset}`);
const pageTypeIds = new Set();

records.forEach((record) => {
  try {
    if (record["Page Types"]) {
      const parsed = JSON.parse(record["Page Types"]);
      parsed.forEach((id) => pageTypeIds.add(id));
    }
  } catch (e) {
    // ignore
  }
});

console.log(`Found ${pageTypeIds.size} unique page type IDs:\n`);
Array.from(pageTypeIds).forEach((id) => {
  const tagData = tagMapping.wixToBuilder[id];
  const tagName = tagData ? tagData.name : "Unknown";
  console.log(`  ${colors.yellow}${id}${colors.reset}`);
  console.log(`    → ${colors.green}${tagName}${colors.reset}`);
});

// Find fields that contain "role" in their name
console.log(
  `\n${colors.cyan}Fields containing "role" (case-insensitive):${colors.reset}`
);
const roleFields = columns.filter((col) => col.toLowerCase().includes("role"));
roleFields.forEach((field) => {
  // Count non-empty values
  const nonEmpty = records.filter(
    (r) => r[field] && r[field].trim() !== ""
  ).length;
  console.log(
    `  ${field}: ${colors.green}${nonEmpty}${colors.reset} non-empty values`
  );

  // Show sample if exists
  const sample = records.find((r) => r[field] && r[field].trim() !== "");
  if (sample && sample[field]) {
    console.log(`    Sample: ${sample[field].substring(0, 100)}...`);
  }
});

console.log(`\n${colors.green}✓ Analysis complete!${colors.reset}\n`);
