#!/usr/bin/env node

/**
 * Verify camelCase conversion for field names
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { parse } = require("csv-parse/sync");

const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";

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

// Load tag mapping
const tagMapping = JSON.parse(fs.readFileSync(TAG_MAPPING_FILE, "utf8"));

function toCamelCase(fieldName) {
  return fieldName
    .replace(/[-\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) => char.toLowerCase());
}

function parseTagIds(value) {
  if (!value || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    return [];
  }
}

function resolveTagReferences(wixTagIds, tagMapping, wrapperKey) {
  const resolved = [];
  for (const wixTagId of wixTagIds) {
    const tagData = tagMapping.wixToBuilder[wixTagId];
    if (tagData && tagData.builderId) {
      const ref = {
        "@type": "@builder.io/core:Reference",
        id: tagData.builderId,
        model: "tag",
      };
      resolved.push({ [wrapperKey]: ref });
    }
  }
  return resolved;
}

// Test with first record
const row = normalizedRecords[0];

console.log("\n=== Testing Field Name Conversion ===\n");

const commonRefFields = [
  { field: "domains", wrapper: "domainsItem" },
  { field: "country tag", wrapper: "countryTagItem" },
  { field: "author", wrapper: "authorItem" },
  { field: "activity", wrapper: "activityItem" },
];

const refs = {};

for (const { field, wrapper } of commonRefFields) {
  const wixTagIds = parseTagIds(row[field]);
  if (wixTagIds.length > 0) {
    const fieldName = toCamelCase(field);
    refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
    console.log(
      `✓ '${field}' -> '${fieldName}' (${wixTagIds.length} references)`
    );
  }
}

console.log("\n=== Generated Data Object Keys ===\n");
console.log(Object.keys(refs).join(", "));

console.log("\n=== countryTag Structure ===\n");
if (refs.countryTag) {
  console.log(JSON.stringify(refs.countryTag, null, 2));
} else {
  console.log("❌ countryTag not found in refs!");
}

console.log("\n");
