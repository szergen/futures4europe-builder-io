#!/usr/bin/env node

/**
 * Wix Affiliations to Builder.io Migration Script
 *
 * Migrates affiliation data from Wix CSV export to Builder.io CMS.
 * Transforms Wix tag IDs to Builder.io references using the tag migration mapping.
 *
 * Usage:
 *   node scripts/migrations/migrate-affiliations.js <count>
 *   node scripts/migrations/migrate-affiliations.js all
 *   node scripts/migrations/migrate-affiliations.js --verify <count>
 *   node scripts/migrations/migrate-affiliations.js <count> --dry-run
 *
 * Arguments:
 *   count      - Number of entries to migrate (1, 2, 100, or "all")
 *   --verify   - Spot-check random migrated records against Builder.io
 *   --dry-run  - Validate CSV parsing and tag mapping without creating records
 *
 * Examples:
 *   node scripts/migrations/migrate-affiliations.js 10                # Migrate first 10
 *   node scripts/migrations/migrate-affiliations.js all               # Migrate all
 *   node scripts/migrations/migrate-affiliations.js --verify 5        # Verify 5 random records
 *   node scripts/migrations/migrate-affiliations.js 10 --dry-run      # Dry run 10 records
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");

// Configuration
const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const MODEL_NAME = "affiliations";
const CSV_FILE = "./data/exports/Affiliations_wix.csv";
const MAPPING_FILE = "./data/mappings/affiliation-migration-mapping.json";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";
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
  magenta: "\x1b[35m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  dryRun: (msg) =>
    console.log(`${colors.magenta}[DRY-RUN]${colors.reset} ${msg}`),
};

// Statistics tracking
let stats = {
  total: 0,
  successful: 0,
  failed: 0,
  skipped: 0,
  missingTagReferences: 0,
  malformedData: 0,
};

// Tag mapping cache
let tagMapping = null;

// Helper function to make API requests using fetch
async function makeRequest(method, endpoint, data = null, retries = 3) {
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

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 429 && attempt < retries) {
          // Rate limited - exponential backoff
          const waitTime = Math.pow(2, attempt) * 1000;
          log.warning(
            `Rate limited. Waiting ${waitTime / 1000}s before retry...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        throw new Error(
          `HTTP ${response.status}: ${JSON.stringify(responseData)}`
        );
      }

      return responseData;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      // Exponential backoff for other errors
      const waitTime = Math.pow(2, attempt) * 1000;
      log.warning(
        `Request failed (attempt ${attempt}/${retries}). Retrying in ${
          waitTime / 1000
        }s...`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

// Load tag migration mapping
function loadTagMapping() {
  if (tagMapping) return tagMapping;

  try {
    if (!fs.existsSync(TAG_MAPPING_FILE)) {
      log.error(`Tag mapping file not found: ${TAG_MAPPING_FILE}`);
      log.error("Please run the tags migration first.");
      process.exit(1);
    }

    const data = fs.readFileSync(TAG_MAPPING_FILE, "utf8");
    tagMapping = JSON.parse(data);
    log.success(
      `Loaded tag mapping with ${
        Object.keys(tagMapping.wixToBuilder).length
      } entries`
    );
    return tagMapping;
  } catch (error) {
    log.error(`Failed to load tag mapping: ${error.message}`);
    process.exit(1);
  }
}

// Load or initialize affiliation mapping file
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
    stats: {
      total: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      missingTagReferences: 0,
    },
  };
}

// Save mapping file
function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
}

// Read and parse CSV file
function readCSV() {
  try {
    let fileContent = fs.readFileSync(CSV_FILE, "utf8");

    // Remove BOM if present
    if (fileContent.charCodeAt(0) === 0xfeff) {
      fileContent = fileContent.slice(1);
    }

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
      relax_quotes: true,
      relax_column_count: true,
    });
    return records;
  } catch (error) {
    log.error(`Failed to read CSV: ${error.message}`);
    process.exit(1);
  }
}

// Create Builder.io reference object
function createBuilderReference(builderId) {
  return {
    "@type": "@builder.io/core:Reference",
    id: builderId,
    model: "tag",
  };
}

// Resolve Wix tag ID to Builder.io reference
function resolveTagReference(wixTagId, fieldName) {
  if (!wixTagId || wixTagId.trim() === "") {
    return null;
  }

  const mapping = loadTagMapping();
  const tagInfo = mapping.wixToBuilder[wixTagId];

  if (!tagInfo) {
    log.warning(`Missing tag mapping for ${fieldName}: ${wixTagId}`);
    stats.missingTagReferences++;
    return null;
  }

  return createBuilderReference(tagInfo.builderId);
}

// Check if personTag is malformed (contains JSON instead of UUID)
function isMalformedPersonTag(value) {
  if (!value || typeof value !== "string") return false;

  // Check if it looks like JSON object
  const trimmed = value.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      JSON.parse(trimmed);
      return true; // It's valid JSON, which is wrong for a UUID field
    } catch {
      return false;
    }
  }
  return false;
}

// Transform Wix CSV row to Builder.io format
function transformAffiliationData(csvRow) {
  const title = csvRow.Title || "";
  const wixId = csvRow.ID;

  // Resolve tag references
  const projectTag = resolveTagReference(csvRow.projectTag, "projectTag");
  const organisationTag = resolveTagReference(
    csvRow.organisationTag,
    "organisationTag"
  );
  const extraOrganisationTag = resolveTagReference(
    csvRow.extraOrganisationTag,
    "extraOrganisationTag"
  );

  // Handle personTag - check for malformed data
  let personTag = null;
  if (isMalformedPersonTag(csvRow.personTag)) {
    log.warning(`Malformed personTag (JSON object) in row: ${title}`);
    stats.malformedData++;
  } else {
    personTag = resolveTagReference(csvRow.personTag, "personTag");
  }

  const data = {
    title: title,
    wixId: wixId,
  };

  // Only include reference fields if they have values
  if (projectTag) data.projectTag = projectTag;
  if (organisationTag) data.organisationTag = organisationTag;
  if (extraOrganisationTag) data.extraOrganisationTag = extraOrganisationTag;
  if (personTag) data.personTag = personTag;

  // Include other fields if present
  if (csvRow.role && csvRow.role.trim()) {
    data.role = csvRow.role.trim();
  }
  if (csvRow.extraIdentifier && csvRow.extraIdentifier.trim()) {
    data.extraIdentifier = csvRow.extraIdentifier.trim();
  }

  return {
    name: title,
    published: "published",
    data: data,
  };
}

// Create an affiliation in Builder.io
async function createAffiliation(affiliationData, index, total) {
  try {
    const response = await makeRequest(
      "POST",
      `write/${MODEL_NAME}`,
      affiliationData
    );

    log.success(
      `[${index + 1}/${total}] Created: ${affiliationData.name} (ID: ${
        response.id
      })`
    );
    return response;
  } catch (error) {
    log.error(
      `[${index + 1}/${total}] Failed to create "${affiliationData.name}": ${
        error.message
      }`
    );
    return null;
  }
}

// Main migration function
async function migrateAffiliations(count) {
  log.title("🚀 Starting Affiliations Migration to Builder.io");

  // Check API key
  if (!PRIVATE_API_KEY) {
    log.error("Builder.io Private API key not found in .env.local");
    log.error("Add BUILDER_PRIVATE_API_KEY to .env.local");
    log.error("Get it from: https://builder.io/account/space");
    process.exit(1);
  }

  // Load tag mapping
  loadTagMapping();

  // Read CSV
  log.info("Reading CSV file...");
  const allRows = readCSV();
  log.success(`Found ${allRows.length} affiliations in CSV`);

  // Determine how many to migrate
  const rowsToMigrate =
    count === "all" ? allRows : allRows.slice(0, parseInt(count));
  log.info(`Migrating ${rowsToMigrate.length} affiliations...`);

  // Load existing mapping
  const mapping = loadMapping();

  // Reset stats
  stats = {
    total: rowsToMigrate.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    missingTagReferences: 0,
    malformedData: 0,
  };

  // Migrate affiliations
  for (let i = 0; i < rowsToMigrate.length; i++) {
    const row = rowsToMigrate[i];
    const wixId = row.ID;

    // Skip if already migrated
    if (mapping.wixToBuilder[wixId]) {
      log.warning(
        `[${i + 1}/${rowsToMigrate.length}] Skipping "${
          row.Title
        }" (already migrated)`
      );
      stats.skipped++;
      continue;
    }

    const affiliationData = transformAffiliationData(row);
    const result = await createAffiliation(
      affiliationData,
      i,
      rowsToMigrate.length
    );

    if (result && result.id) {
      // Store mapping
      mapping.wixToBuilder[wixId] = {
        builderId: result.id,
        title: row.Title,
        migratedAt: new Date().toISOString(),
      };
      mapping.builderToWix[result.id] = wixId;
      stats.successful++;

      // Save mapping after each successful creation
      mapping.migratedCount = Object.keys(mapping.wixToBuilder).length;
      mapping.lastMigrated = new Date().toISOString();
      mapping.stats = { ...stats };
      saveMapping(mapping);
    } else {
      stats.failed++;
    }

    // Rate limiting delay (200ms)
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  printSummary();
}

// Dry run function - validate without creating records
async function dryRun(count) {
  log.title("🔍 Dry Run - Validating Affiliations Migration");

  // Check API key
  if (!PRIVATE_API_KEY) {
    log.error("Builder.io Private API key not found in .env.local");
    log.error("Add BUILDER_PRIVATE_API_KEY to .env.local");
    process.exit(1);
  }

  // Load tag mapping
  loadTagMapping();

  // Read CSV
  log.info("Reading CSV file...");
  const allRows = readCSV();
  log.success(`Found ${allRows.length} affiliations in CSV`);

  // Determine how many to validate
  const rowsToValidate =
    count === "all" ? allRows : allRows.slice(0, parseInt(count));
  log.info(`Validating ${rowsToValidate.length} affiliations...`);

  // Load existing mapping
  const mapping = loadMapping();

  // Reset stats
  stats = {
    total: rowsToValidate.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    missingTagReferences: 0,
    malformedData: 0,
  };

  let wouldSkip = 0;
  let wouldCreate = 0;
  let errors = [];

  // Validate affiliations
  for (let i = 0; i < rowsToValidate.length; i++) {
    const row = rowsToValidate[i];
    const wixId = row.ID;

    // Check if already migrated
    if (mapping.wixToBuilder[wixId]) {
      log.dryRun(
        `[${i + 1}/${rowsToValidate.length}] Would skip "${
          row.Title
        }" (already migrated)`
      );
      wouldSkip++;
      stats.skipped++;
      continue;
    }

    try {
      // Transform data (this will log warnings for missing mappings)
      const affiliationData = transformAffiliationData(row);

      // Validate required fields
      if (!affiliationData.name || affiliationData.name.trim() === "") {
        errors.push({ row: i + 1, title: row.Title, error: "Empty title" });
        stats.failed++;
        continue;
      }

      if (!affiliationData.data.wixId) {
        errors.push({ row: i + 1, title: row.Title, error: "Missing Wix ID" });
        stats.failed++;
        continue;
      }

      log.dryRun(
        `[${i + 1}/${rowsToValidate.length}] Would create "${
          affiliationData.name
        }"`
      );
      wouldCreate++;
      stats.successful++;
    } catch (error) {
      errors.push({ row: i + 1, title: row.Title, error: error.message });
      stats.failed++;
    }
  }

  // Print dry run summary
  log.title("📊 Dry Run Summary");
  log.info(`Total records:        ${stats.total}`);
  log.success(`Would create:        ${wouldCreate}`);
  log.warning(`Would skip:          ${wouldSkip}`);
  if (stats.failed > 0) {
    log.error(`Would fail:          ${stats.failed}`);
  }
  log.warning(`Missing tag refs:    ${stats.missingTagReferences}`);
  log.warning(`Malformed data:      ${stats.malformedData}`);

  if (errors.length > 0) {
    log.title("❌ Validation Errors");
    errors.forEach((e) => {
      log.error(`Row ${e.row}: "${e.title}" - ${e.error}`);
    });
  }

  log.info("\n💡 Run without --dry-run to actually create records");
}

// Print migration summary
function printSummary() {
  log.title("📊 Migration Summary");
  log.info(`Total records:        ${stats.total}`);
  log.success(`Successfully created: ${stats.successful}`);
  log.warning(`Skipped (existing):   ${stats.skipped}`);
  if (stats.failed > 0) {
    log.error(`Failed:               ${stats.failed}`);
  }
  log.warning(`Missing tag refs:    ${stats.missingTagReferences}`);
  log.warning(`Malformed data:      ${stats.malformedData}`);
  log.info(`Mapping saved to:     ${MAPPING_FILE}`);
}

// Verify migration by spot-checking random records
async function verifyMigration(count) {
  log.title("🔍 Verifying Migration - Spot Check");

  // Check API key
  if (!PRIVATE_API_KEY) {
    log.error("Builder.io Private API key not found in .env.local");
    process.exit(1);
  }

  // Load mapping
  const mapping = loadMapping();
  const mappedEntries = Object.entries(mapping.wixToBuilder);

  if (mappedEntries.length === 0) {
    log.error("No migrated records found. Please run the migration first.");
    process.exit(1);
  }

  const verifyCount = Math.min(parseInt(count), mappedEntries.length);
  log.info(`Verifying ${verifyCount} random records...`);

  // Select random records
  const shuffled = mappedEntries.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, verifyCount);

  let verified = 0;
  let failed = 0;

  for (const [wixId, info] of selected) {
    try {
      const response = await makeRequest(
        "GET",
        `content/${MODEL_NAME}/${info.builderId}?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`
      );

      if (response && response.data) {
        // Verify wixId matches
        if (response.data.wixId === wixId) {
          log.success(
            `✓ Verified: "${info.title}" (Builder ID: ${info.builderId})`
          );
          verified++;
        } else {
          log.error(
            `✗ Wix ID mismatch for "${info.title}": expected ${wixId}, got ${response.data.wixId}`
          );
          failed++;
        }
      } else {
        log.error(
          `✗ Record not found: "${info.title}" (Builder ID: ${info.builderId})`
        );
        failed++;
      }
    } catch (error) {
      log.error(`✗ Failed to verify "${info.title}": ${error.message}`);
      failed++;
    }

    // Small delay
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  log.title("📊 Verification Summary");
  log.success(`Verified: ${verified}/${verifyCount}`);
  if (failed > 0) {
    log.error(`Failed:   ${failed}/${verifyCount}`);
  }
}

// Main CLI handler
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
${colors.bright}Wix Affiliations to Builder.io Migration Script${colors.reset}

Usage:
  node scripts/migrations/migrate-affiliations.js <count>
  node scripts/migrations/migrate-affiliations.js all
  node scripts/migrations/migrate-affiliations.js --verify <count>
  node scripts/migrations/migrate-affiliations.js <count> --dry-run

Arguments:
  count      - Number of entries to migrate (1, 2, 100, or "all")
  --verify   - Spot-check random migrated records against Builder.io
  --dry-run  - Validate CSV parsing and tag mapping without creating records

Examples:
  node scripts/migrations/migrate-affiliations.js 10            # Migrate first 10
  node scripts/migrations/migrate-affiliations.js all           # Migrate all (~1,826)
  node scripts/migrations/migrate-affiliations.js --verify 5    # Verify 5 random records
  node scripts/migrations/migrate-affiliations.js 10 --dry-run  # Dry run 10 records

Note:
  - Progress is saved to ${MAPPING_FILE}
  - Rate limiting: 200ms delay between API calls
  - Existing records are skipped (idempotent)
  - Requires tag migration to be complete (uses tag-migration-mapping.json)
    `);
    process.exit(0);
  }

  // Handle --verify mode
  if (args[0] === "--verify") {
    const count = args[1] || "5";
    if (isNaN(parseInt(count))) {
      log.error("Invalid count argument. Use a number for --verify.");
      process.exit(1);
    }
    await verifyMigration(count);
    return;
  }

  // Handle --dry-run mode
  const isDryRun = args.includes("--dry-run");
  const count = args.find((arg) => arg !== "--dry-run");

  // Validate count argument
  if (count !== "all" && isNaN(parseInt(count))) {
    log.error('Invalid count argument. Use a number or "all"');
    process.exit(1);
  }

  try {
    if (isDryRun) {
      await dryRun(count);
    } else {
      await migrateAffiliations(count);
    }
  } catch (error) {
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
