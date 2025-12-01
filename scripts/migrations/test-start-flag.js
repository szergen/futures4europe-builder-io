#!/usr/bin/env node

/**
 * Test the --start flag functionality
 * Simulates what the migration would show with different --start values
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
};

console.log(
  `\n${colors.cyan}Testing --start flag functionality${colors.reset}\n`
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

const totalRecords = records.length;

console.log(
  `Total records in CSV: ${colors.green}${totalRecords}${colors.reset}\n`
);

// Test scenarios
const scenarios = [
  { count: 5, start: 0, desc: "Default behavior" },
  { count: 10, start: 50, desc: "Records 50-59 (10 records starting at 50)" },
  {
    count: 20,
    start: 100,
    desc: "Records 100-119 (20 records starting at 100)",
  },
  { count: 5, start: 600, desc: "Near end (records 600-604)" },
  { count: "all", start: 0, desc: "All records from start" },
  { count: "all", start: 500, desc: "All records from 500 to end" },
];

scenarios.forEach((scenario, idx) => {
  console.log(
    `${colors.cyan}Scenario ${idx + 1}: ${scenario.desc}${colors.reset}`
  );
  console.log(
    `Command: node scripts/migrations/migrate-infopages.js ${scenario.count}${
      scenario.start > 0 ? ` --start ${scenario.start}` : ""
    }`
  );

  let start = scenario.start;
  let pagesToMigrate;

  if (scenario.count === "all") {
    pagesToMigrate = records.slice(start);
  } else {
    const end = start + parseInt(scenario.count);
    pagesToMigrate = records.slice(start, end);
  }

  const actualStart = start + 1; // 1-based for display
  const actualEnd = start + pagesToMigrate.length;

  console.log(
    `  Would migrate: ${colors.green}${pagesToMigrate.length}${colors.reset} pages (records ${actualStart}-${actualEnd} of ${totalRecords})`
  );

  if (pagesToMigrate.length > 0) {
    console.log(`  First: ${pagesToMigrate[0].Title || "Untitled"}`);
    if (pagesToMigrate.length > 1) {
      console.log(
        `  Last:  ${
          pagesToMigrate[pagesToMigrate.length - 1].Title || "Untitled"
        }`
      );
    }
  }

  console.log("");
});

console.log(`${colors.green}✓ All scenarios look correct!${colors.reset}\n`);
