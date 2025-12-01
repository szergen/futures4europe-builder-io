#!/usr/bin/env node

/**
 * Detailed test to find records with tag references and structured roles
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { parse } = require("csv-parse/sync");

const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

console.log(
  `\n${colors.cyan}Finding records with rich data...${colors.reset}\n`
);

// Load CSV
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

// Find records with tag references
console.log("Searching for records with tag references...");
const recordsWithRefs = normalizedRecords.filter(
  (r) =>
    r["post domain"] ||
    r["post geo"] ||
    r["post tag"] ||
    r["post type"] ||
    r["person organisation"] ||
    r["person project"] ||
    r["organisation project"] ||
    r["project domain"]
);

console.log(
  `${colors.green}Found ${recordsWithRefs.length} records with tag references${colors.reset}`
);
if (recordsWithRefs.length > 0) {
  const sample = recordsWithRefs[0];
  console.log(`\nSample: ${colors.magenta}${sample.title}${colors.reset}`);

  const refFields = [
    "post domain",
    "post geo",
    "post tag",
    "post type",
    "person organisation",
    "person project",
    "organisation project",
    "project domain",
  ];

  for (const field of refFields) {
    if (sample[field]) {
      try {
        const parsed = JSON.parse(sample[field]);
        console.log(
          `  ${field}: ${colors.green}${JSON.stringify(parsed).substring(
            0,
            80
          )}...${colors.reset}`
        );
      } catch (e) {
        console.log(`  ${field}: ${sample[field].substring(0, 80)}`);
      }
    }
  }
}

// Find records with structured roles
console.log("\n\nSearching for records with structured roles...");
const recordsWithRoles = normalizedRecords.filter(
  (r) =>
    r["person organisation role"] ||
    r["person project role"] ||
    r["project person role"] ||
    r["project organisation role"] ||
    r["organisation person role"]
);

console.log(
  `${colors.green}Found ${recordsWithRoles.length} records with structured roles${colors.reset}`
);
if (recordsWithRoles.length > 0) {
  const sample = recordsWithRoles[0];
  console.log(`\nSample: ${colors.magenta}${sample.title}${colors.reset}`);

  const roleFields = [
    "person organisation role",
    "person project role",
    "project person role",
    "project organisation role",
    "organisation person role",
  ];

  for (const field of roleFields) {
    if (sample[field]) {
      try {
        const parsed = JSON.parse(sample[field]);
        console.log(`  ${field}:`);
        console.log(
          `    ${colors.green}${JSON.stringify(parsed, null, 2).substring(
            0,
            200
          )}...${colors.reset}`
        );
      } catch (e) {
        console.log(`  ${field}: ${colors.yellow}[Parse Error]${colors.reset}`);
      }
    }
  }
}

// Count by page type
console.log("\n\nRecords by page type:");
const personRecords = normalizedRecords.filter((r) => {
  try {
    if (!r["page types"]) return false;
    const parsed = JSON.parse(r["page types"]);
    return parsed.includes("ff988067-2fee-41f2-9b33-7eb14d282b17"); // person info
  } catch (e) {
    return false;
  }
});

const orgRecords = normalizedRecords.filter((r) => {
  try {
    if (!r["page types"]) return false;
    const parsed = JSON.parse(r["page types"]);
    return parsed.includes("7c076d4e-36d7-4f9e-8b5d-6d0fca9e7a05"); // organisation info (guessing ID)
  } catch (e) {
    return false;
  }
});

const projectRecords = normalizedRecords.filter((r) => {
  try {
    if (!r["page types"]) return false;
    const parsed = JSON.parse(r["page types"]);
    return parsed.includes("fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85"); // project info
  } catch (e) {
    return false;
  }
});

console.log(
  `  ${colors.magenta}Person${colors.reset}: ${personRecords.length}`
);
console.log(
  `  ${colors.cyan}Organisation${colors.reset}: ${orgRecords.length}`
);
console.log(`  ${colors.cyan}Project${colors.reset}: ${projectRecords.length}`);

console.log(`\n${colors.green}✓ Analysis complete!${colors.reset}\n`);
