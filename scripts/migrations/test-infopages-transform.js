#!/usr/bin/env node

/**
 * Test script for info pages transformation logic
 * Tests field transformation, tag references, and structured roles WITHOUT making API calls
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { parse } = require("csv-parse/sync");

// Load the transformation functions from migrate-infopages.js
const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";

// Colors for output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

console.log(
  `\n${colors.cyan}Testing Info Pages Transformation Logic${colors.reset}\n`
);

// Load CSV
console.log("Loading CSV...");
const fileContent = fs.readFileSync(CSV_FILE, "utf8");
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  bom: true,
  relax_quotes: true,
});

// Normalize column names
const normalizedRecords = records.map((record) => {
  const normalized = {};
  for (const key in record) {
    const normalizedKey = key.toLowerCase().trim();
    normalized[normalizedKey] = record[key];
  }
  return normalized;
});

console.log(
  `${colors.green}✓${colors.reset} Found ${normalizedRecords.length} records\n`
);

// Load tag mapping
console.log("Loading tag mapping...");
const tagMappingData = fs.readFileSync(TAG_MAPPING_FILE, "utf8");
const tagMapping = JSON.parse(tagMappingData);
console.log(
  `${colors.green}✓${colors.reset} Loaded ${
    Object.keys(tagMapping.wixToBuilder).length
  } tags\n`
);

// Test with first 3 records of each type
const testRecords = normalizedRecords.slice(0, 10);

for (let i = 0; i < testRecords.length; i++) {
  const record = testRecords[i];

  console.log(
    `${colors.cyan}─────────────────────────────────────────${colors.reset}`
  );
  console.log(
    `Record ${i + 1}: ${colors.magenta}${record.title || "Untitled"}${
      colors.reset
    }`
  );
  console.log(`Wix ID: ${record.id}`);
  console.log(`Slug: ${record.slug}`);

  // Check page type
  if (record["page types"]) {
    try {
      const pageTypeIds = JSON.parse(record["page types"]);
      console.log(`Page Types (Wix IDs): ${pageTypeIds.join(", ")}`);

      // Resolve to tag names
      const tagNames = [];
      for (const wixId of pageTypeIds) {
        const tagData = tagMapping.wixToBuilder[wixId];
        if (tagData && tagData.name) {
          tagNames.push(tagData.name);
        }
      }
      console.log(
        `Page Types (Names): ${colors.yellow}${tagNames.join(", ")}${
          colors.reset
        }`
      );
    } catch (e) {
      console.log(`Page Types: ${colors.yellow}[Parse Error]${colors.reset}`);
    }
  }

  // Check for tag references
  const refFields = ["post domain", "post geo", "post tag", "post type"];
  console.log(`\nTag Reference Fields:`);
  for (const field of refFields) {
    if (record[field]) {
      try {
        const tagIds = JSON.parse(record[field]);
        console.log(`  ${field}: ${tagIds.length} tags`);
      } catch (e) {
        console.log(`  ${field}: ${colors.yellow}[Parse Error]${colors.reset}`);
      }
    }
  }

  // Check for structured roles
  const roleFields = [
    "person organisation role",
    "person project role",
    "project person role",
    "project organisation role",
  ];

  console.log(`\nStructured Roles:`);
  let hasRoles = false;
  for (const field of roleFields) {
    if (record[field]) {
      try {
        const roles = JSON.parse(record[field]);
        console.log(
          `  ${field}: ${colors.green}${roles.length} roles${colors.reset}`
        );
        if (roles.length > 0 && roles[0]) {
          console.log(`    Example: ${JSON.stringify(roles[0])}`);
        }
        hasRoles = true;
      } catch (e) {
        console.log(`  ${field}: ${colors.yellow}[Parse Error]${colors.reset}`);
      }
    }
  }
  if (!hasRoles) {
    console.log(`  ${colors.yellow}No structured roles found${colors.reset}`);
  }

  console.log("");
}

console.log(
  `${colors.cyan}─────────────────────────────────────────${colors.reset}`
);
console.log(`\n${colors.green}✓ Test complete!${colors.reset}\n`);
console.log("Review the output above to verify:");
console.log("  1. Page types are correctly identified");
console.log("  2. Tag reference fields are present and parseable");
console.log("  3. Structured roles are present and parseable");
console.log("");
