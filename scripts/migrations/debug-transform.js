#!/usr/bin/env node

/**
 * Debug script to see what data is being transformed
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

// Normalize
const normalizedRecords = records.map((record) => {
  const normalized = {};
  for (const key in record) {
    const normalizedKey = key.toLowerCase().trim();
    normalized[normalizedKey] = record[key];
  }
  return normalized;
});

// Load tag mapping
const tagMappingData = fs.readFileSync(TAG_MAPPING_FILE, "utf8");
const tagMapping = JSON.parse(tagMappingData);

// Test with FORGING (second record)
const testRow = normalizedRecords[1];

console.log("\n=== CSV Row Data (FORGING - second record) ===\n");
console.log("Title:", testRow.title);
console.log("ID:", testRow.id);
console.log("Page Types:", testRow["page types"]);
console.log("Domains:", testRow.domains);
console.log("Methods:", testRow.methods);
console.log("Project Organisation:", testRow["project organisation"]);

console.log("\n=== All Fields in CSV Row ===\n");
const fields = Object.keys(testRow).filter(
  (k) => testRow[k] && testRow[k].trim() !== "" && k !== "_originalkeys"
);
fields.forEach((field) => {
  const value = testRow[field];
  if (value.length > 100) {
    console.log(`${field}: [${value.length} chars]`);
  } else {
    console.log(`${field}: ${value}`);
  }
});

// Test tag resolution
console.log("\n=== Testing Tag Resolution ===\n");

function parseTagIds(fieldValue) {
  if (!fieldValue || fieldValue.trim() === "") return [];
  try {
    const parsed = JSON.parse(fieldValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// Check Page Types
const pageTypeIds = parseTagIds(testRow["page types"]);
console.log("Page Type IDs:", pageTypeIds);
pageTypeIds.forEach((id) => {
  const tag = tagMapping.wixToBuilder[id];
  console.log(`  ${id} → ${tag ? tag.name : "NOT FOUND"}`);
});

// Check Domains
const domainIds = parseTagIds(testRow.domains);
console.log("\nDomain IDs:", domainIds);
domainIds.forEach((id) => {
  const tag = tagMapping.wixToBuilder[id];
  console.log(`  ${id} → ${tag ? tag.name : "NOT FOUND"}`);
});

// Check Methods
const methodIds = parseTagIds(testRow.methods);
console.log("\nMethod IDs:", methodIds);
methodIds.forEach((id) => {
  const tag = tagMapping.wixToBuilder[id];
  console.log(`  ${id} → ${tag ? tag.name : "NOT FOUND"}`);
});

console.log("\n");
