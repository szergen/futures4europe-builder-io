#!/usr/bin/env node

/**
 * Verify structured roles field conversion
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { parse } = require("csv-parse/sync");

const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";

// Load CSV
const fileContent = fs.readFileSync(CSV_FILE, "utf8");
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  bom: true,
  relax_quotes: true,
});

// Normalize column names to lowercase
const normalizedRecords = records.map((record) => {
  const normalized = {};
  for (const key in record) {
    const normalizedKey = key.toLowerCase().trim();
    normalized[normalizedKey] = record[key];
  }
  return normalized;
});

function toCamelCase(fieldName) {
  return fieldName
    .replace(/[-\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) => char.toLowerCase());
}

// Test with FORGING (record 2)
const forging = normalizedRecords[1];

console.log("\n=== Testing Structured Roles Field ===\n");
console.log("Page:", forging.title);

const field = "project organisation roles";
const fieldValue = forging[field];

console.log("\nRaw CSV value:");
console.log(fieldValue);

if (fieldValue && fieldValue.trim() !== "") {
  try {
    const parsed = JSON.parse(fieldValue);
    const fieldName = toCamelCase(field);

    console.log("\n✓ Successfully parsed");
    console.log("Field name (old method):", field.replace(/\s+/g, ""));
    console.log("Field name (camelCase):", fieldName);
    console.log("\nParsed data:");
    console.log(JSON.stringify(parsed, null, 2));

    console.log("\nData object structure:");
    console.log(`{`);
    console.log(`  "${fieldName}": ${JSON.stringify(parsed)}`);
    console.log(`}`);
  } catch (e) {
    console.log("\n❌ Failed to parse:", e.message);
  }
} else {
  console.log("\n❌ Field is empty");
}

console.log("\n");
