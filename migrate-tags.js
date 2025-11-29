#!/usr/bin/env node

/**
 * Wix Tags to Builder.io Migration Script
 *
 * Usage:
 *   node migrate-tags.js <count> [migrateMasterTags]
 *
 * Arguments:
 *   count              - Number of entries to migrate (1, 2, 100, or "all")
 *   migrateMasterTags  - Optional flag to update masterTag references
 *
 * Examples:
 *   node migrate-tags.js 10                    # Migrate first 10 tags
 *   node migrate-tags.js all                   # Migrate all tags
 *   node migrate-tags.js all migrateMasterTags # Update masterTag references
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");

// Configuration
// Note: Use PRIVATE API KEY for write operations, not the public key
const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const MODEL_NAME = "tag";
const CSV_FILE = "./Tags_wix.csv";
const MAPPING_FILE = "./tag-migration-mapping.json";
const BUILDER_API_URL = "https://builder.io/api/v1";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Helper function to make API requests using fetch
async function makeRequest(method, endpoint, data = null) {
  const url = `${BUILDER_API_URL}/${endpoint}`;

  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${PRIVATE_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${JSON.stringify(responseData)}`
      );
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}

// Load or initialize mapping file
function loadMapping() {
  if (fs.existsSync(MAPPING_FILE)) {
    const data = fs.readFileSync(MAPPING_FILE, "utf8");
    return JSON.parse(data);
  }
  return {
    wixToBuilder: {},
    builderToWix: {},
    migratedCount: 0,
    lastMigrated: null,
  };
}

// Save mapping file
function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
}

// Read and parse CSV file
function readCSV() {
  try {
    const fileContent = fs.readFileSync(CSV_FILE, "utf8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true, // Handle UTF-8 BOM (Byte Order Mark)
      relax_quotes: true, // More lenient quote handling
    });
    return records;
  } catch (error) {
    log.error(`Failed to read CSV: ${error.message}`);
    process.exit(1);
  }
}

// Transform Wix CSV row to Builder.io format
function transformTagData(csvRow) {
  const data = {
    name: csvRow.Name,
    tagType: csvRow["Tag Type"] || "",
    tagLine: csvRow["Tag Line"] || "",
    picture: csvRow.Picture || "",
    tagPageLink: csvRow["Tag Page Link"] || "",
    wixId: csvRow.ID, // Store original Wix ID for reference
  };

  // Clean up empty values
  Object.keys(data).forEach((key) => {
    if (data[key] === "") {
      delete data[key];
    }
  });

  return {
    name: csvRow.Name,
    published: "published",
    data: data,
  };
}

// Create a tag in Builder.io
async function createTag(tagData, index, total) {
  try {
    const response = await makeRequest("POST", `write/${MODEL_NAME}`, tagData);

    log.success(
      `[${index + 1}/${total}] Created: ${tagData.name} (ID: ${response.id})`
    );
    return response;
  } catch (error) {
    log.error(
      `[${index + 1}/${total}] Failed to create ${tagData.name}: ${
        error.message
      }`
    );
    return null;
  }
}

// Update a tag's masterTag reference
async function updateMasterTag(builderId, masterTagBuilderId, tagName) {
  try {
    const updateData = {
      data: {
        masterTag: {
          "@type": "@builder.io/core:Reference",
          id: masterTagBuilderId,
          model: "tag",
        },
      },
    };

    await makeRequest("PUT", `write/${MODEL_NAME}/${builderId}`, updateData);

    log.success(`Updated masterTag for: ${tagName}`);
    return true;
  } catch (error) {
    log.error(`Failed to update masterTag for ${tagName}: ${error.message}`);
    return false;
  }
}

// Main migration function
async function migrateTags(count) {
  log.title("🚀 Starting Tag Migration to Builder.io");

  // Check API key
  if (!PRIVATE_API_KEY) {
    log.error("Builder.io Private API key not found in .env.local");
    log.error("Add BUILDER_PRIVATE_API_KEY to .env.local");
    log.error("Get it from: https://builder.io/account/space");
    process.exit(1);
  }

  // Read CSV
  log.info("Reading CSV file...");
  const allRows = readCSV();
  log.success(`Found ${allRows.length} tags in CSV`);

  // Determine how many to migrate
  const rowsToMigrate =
    count === "all" ? allRows : allRows.slice(0, parseInt(count));
  log.info(`Migrating ${rowsToMigrate.length} tags...`);

  // Load existing mapping
  const mapping = loadMapping();
  let successCount = 0;
  let errorCount = 0;

  // Migrate tags
  for (let i = 0; i < rowsToMigrate.length; i++) {
    const row = rowsToMigrate[i];
    const wixId = row.ID;

    // Skip if already migrated
    if (mapping.wixToBuilder[wixId]) {
      log.warning(
        `[${i + 1}/${rowsToMigrate.length}] Skipping ${
          row.Name
        } (already migrated)`
      );
      continue;
    }

    const tagData = transformTagData(row);
    const result = await createTag(tagData, i, rowsToMigrate.length);

    if (result && result.id) {
      // Store mapping
      mapping.wixToBuilder[wixId] = {
        builderId: result.id,
        name: row.Name,
        masterTagWixId: row["Master Tag"] || null,
      };
      mapping.builderToWix[result.id] = wixId;
      successCount++;

      // Save mapping after each successful creation
      mapping.migratedCount = successCount;
      mapping.lastMigrated = new Date().toISOString();
      saveMapping(mapping);
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  log.title("📊 Migration Summary");
  log.success(`Successfully migrated: ${successCount} tags`);
  if (errorCount > 0) {
    log.error(`Failed: ${errorCount} tags`);
  }
  log.info(`Mapping saved to: ${MAPPING_FILE}`);
}

// Migrate masterTag references
async function migrateMasterTags() {
  log.title("🔗 Updating Master Tag References");

  // Load mapping
  const mapping = loadMapping();

  if (Object.keys(mapping.wixToBuilder).length === 0) {
    log.error("No mapping found. Please run the initial migration first.");
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  const entries = Object.entries(mapping.wixToBuilder);
  log.info(`Processing ${entries.length} tags...`);

  for (const [wixId, tagInfo] of entries) {
    const { builderId, name, masterTagWixId } = tagInfo;

    // Skip if no masterTag
    if (!masterTagWixId) {
      skippedCount++;
      continue;
    }

    // Find the Builder.io ID for the masterTag
    const masterTagInfo = mapping.wixToBuilder[masterTagWixId];

    if (!masterTagInfo) {
      log.warning(
        `MasterTag not found for ${name} (Wix ID: ${masterTagWixId})`
      );
      errorCount++;
      continue;
    }

    const result = await updateMasterTag(
      builderId,
      masterTagInfo.builderId,
      name
    );

    if (result) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  log.title("📊 MasterTag Update Summary");
  log.success(`Successfully updated: ${successCount} tags`);
  log.info(`Skipped (no masterTag): ${skippedCount} tags`);
  if (errorCount > 0) {
    log.error(`Failed: ${errorCount} tags`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
${colors.bright}Wix Tags to Builder.io Migration Script${colors.reset}

Usage:
  node migrate-tags.js <count> [migrateMasterTags]

Arguments:
  count              - Number of entries to migrate (1, 2, 100, or "all")
  migrateMasterTags  - Optional flag to update masterTag references

Examples:
  node migrate-tags.js 10                    # Migrate first 10 tags
  node migrate-tags.js all                   # Migrate all tags
  node migrate-tags.js all migrateMasterTags # Update masterTag references

Note: 
  - The first run creates tags without masterTag references
  - Run with "migrateMasterTags" flag after all tags are created
  - Progress is saved to ${MAPPING_FILE}
    `);
    process.exit(0);
  }

  const count = args[0];
  const shouldMigrateMasterTags = args[1] === "migrateMasterTags";

  // Validate count argument
  if (count !== "all" && isNaN(parseInt(count))) {
    log.error('Invalid count argument. Use a number or "all"');
    process.exit(1);
  }

  try {
    if (shouldMigrateMasterTags) {
      await migrateMasterTags();
    } else {
      await migrateTags(count);
      log.info(
        '\n💡 Next step: Run with "migrateMasterTags" flag to link master tags'
      );
      log.info(`   Example: node migrate-tags.js ${count} migrateMasterTags`);
    }
  } catch (error) {
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
