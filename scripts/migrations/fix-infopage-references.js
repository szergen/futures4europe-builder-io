#!/usr/bin/env node

/**
 * Fix Info Page Reference Fields Script
 *
 * Updates existing info-pages in Builder.io to fix reference fields that were
 * not properly mapped during the initial migration (e.g., pageOwner).
 *
 * Usage:
 *   node scripts/migrations/fix-infopage-references.js <count> [options]
 *
 * Arguments:
 *   count              Number of pages to update (number or "all")
 *   --start N          Start from the Nth record (0-based index, default: 0)
 *   --field FIELD      Field to fix (default: "pageOwner")
 *   --dry-run          Preview updates without making changes
 *   --verbose          Show detailed logging
 *
 * Examples:
 *   node scripts/migrations/fix-infopage-references.js 10
 *   node scripts/migrations/fix-infopage-references.js all --field pageOwner
 *   node scripts/migrations/fix-infopage-references.js 10 --start 50
 *   node scripts/migrations/fix-infopage-references.js 5 --dry-run --verbose
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");

// ============================================================================
// Configuration
// ============================================================================

const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
const BUILDER_API_URL = "https://builder.io/api/v1";
const RATE_LIMIT = 200; // milliseconds between API calls

// File Paths
const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";
const INFO_PAGE_MAPPING_FILE =
  "./data/mappings/info-page-migration-mapping.json";

// Field configuration: CSV column name -> Builder.io field name + wrapper key
const FIELD_CONFIG = {
  pageOwner: {
    csvColumn: "pageowner",
    builderField: "pageOwner",
    wrapperKey: "pageOwnerItem",
  },
  pageTypes: {
    csvColumn: "page types",
    builderField: "pageTypes",
    wrapperKey: "pageTypeItem",
  },
  author: {
    csvColumn: "author",
    builderField: "author",
    wrapperKey: "authorItem",
  },
};

// ============================================================================
// Console Colors & Logging
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  dim: "\x1b[2m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  verbose: (msg, isVerbose) => {
    if (isVerbose) console.log(`${colors.dim}  ${msg}${colors.reset}`);
  },
  progress: (current, total, title) => {
    const pct = Math.round((current / total) * 100);
    console.log(
      `${colors.cyan}[${current}/${total}]${colors.reset} ${pct}% - ${title}`
    );
  },
};

// ============================================================================
// CLI Argument Parsing
// ============================================================================

function displayHelp() {
  console.log(`
${colors.cyan}Fix Info Page Reference Fields Script${colors.reset}

${colors.bright}Usage:${colors.reset}
  node scripts/migrations/fix-infopage-references.js <count> [options]

${colors.bright}Arguments:${colors.reset}
  count              Number of pages to update (number or "all")
  --start N          Start from the Nth record (0-based index, default: 0)
  --field FIELD      Field to fix (default: "pageOwner")
                     Available: ${Object.keys(FIELD_CONFIG).join(", ")}
  --dry-run          Preview updates without making changes
  --verbose          Show detailed logging

${colors.bright}Examples:${colors.reset}
  node scripts/migrations/fix-infopage-references.js 10
  node scripts/migrations/fix-infopage-references.js all --field pageOwner
  node scripts/migrations/fix-infopage-references.js 10 --start 50
  node scripts/migrations/fix-infopage-references.js 5 --dry-run --verbose

${colors.bright}Available Fields:${colors.reset}
  pageOwner   - Fix page owner references (most common issue)
  pageTypes   - Fix page type references
  author      - Fix author references
`);
}

function parseArguments() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    displayHelp();
    process.exit(0);
  }

  const count = args[0];
  const isDryRun = args.includes("--dry-run");
  const isVerbose = args.includes("--verbose");

  // Parse --start flag
  let start = 0;
  const startFlagIndex = args.indexOf("--start");
  if (startFlagIndex !== -1 && args[startFlagIndex + 1]) {
    const startValue = parseInt(args[startFlagIndex + 1]);
    if (isNaN(startValue) || startValue < 0) {
      log.error(`Invalid --start value: ${args[startFlagIndex + 1]}`);
      process.exit(1);
    }
    start = startValue;
  }

  // Parse --field flag
  let field = "pageOwner";
  const fieldFlagIndex = args.indexOf("--field");
  if (fieldFlagIndex !== -1 && args[fieldFlagIndex + 1]) {
    const fieldValue = args[fieldFlagIndex + 1];
    if (!FIELD_CONFIG[fieldValue]) {
      log.error(`Invalid --field value: ${fieldValue}`);
      log.info(`Available fields: ${Object.keys(FIELD_CONFIG).join(", ")}`);
      process.exit(1);
    }
    field = fieldValue;
  }

  // Validate count argument
  if (count !== "all" && isNaN(parseInt(count))) {
    log.error(`Invalid count argument: ${count}`);
    process.exit(1);
  }

  return {
    count: count === "all" ? count : parseInt(count),
    start,
    field,
    isDryRun,
    isVerbose,
  };
}

// ============================================================================
// Data Loading Functions
// ============================================================================

function normalizeColumnName(name) {
  return name.toLowerCase().trim();
}

function loadCSV() {
  try {
    log.info("Reading CSV file...");
    const fileContent = fs.readFileSync(CSV_FILE, "utf8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
      relax_quotes: true,
    });

    const normalizedRecords = records.map((record) => {
      const normalized = {};
      for (const key in record) {
        const normalizedKey = normalizeColumnName(key);
        normalized[normalizedKey] = record[key];
      }
      return normalized;
    });

    log.success(`Found ${normalizedRecords.length} info pages in CSV`);
    return normalizedRecords;
  } catch (error) {
    log.error(`Failed to read CSV: ${error.message}`);
    process.exit(1);
  }
}

function loadTagMapping() {
  try {
    log.info("Loading tag mapping...");
    if (!fs.existsSync(TAG_MAPPING_FILE)) {
      log.error(`Tag mapping file not found: ${TAG_MAPPING_FILE}`);
      process.exit(1);
    }
    const mapping = JSON.parse(fs.readFileSync(TAG_MAPPING_FILE, "utf8"));
    const count = Object.keys(mapping.wixToBuilder || {}).length;
    log.success(`Loaded ${count} tag mappings`);
    return mapping;
  } catch (error) {
    log.error(`Failed to load tag mapping: ${error.message}`);
    process.exit(1);
  }
}

function loadInfoPageMapping() {
  try {
    log.info("Loading info-page mapping...");
    if (!fs.existsSync(INFO_PAGE_MAPPING_FILE)) {
      log.error(`Info-page mapping file not found: ${INFO_PAGE_MAPPING_FILE}`);
      process.exit(1);
    }
    const mapping = JSON.parse(fs.readFileSync(INFO_PAGE_MAPPING_FILE, "utf8"));
    const count = Object.keys(mapping.wixToBuilder || {}).length;
    log.success(`Loaded ${count} info-page mappings`);
    return mapping;
  } catch (error) {
    log.error(`Failed to load info-page mapping: ${error.message}`);
    process.exit(1);
  }
}

// ============================================================================
// Reference Resolution Functions
// ============================================================================

function parseTagIds(fieldValue) {
  if (!fieldValue || fieldValue.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(fieldValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function resolveTagReferences(wixTagIds, tagMapping, wrapperKey, isVerbose) {
  const resolved = [];
  const unresolved = [];

  for (const wixTagId of wixTagIds) {
    const tagData = tagMapping.wixToBuilder[wixTagId];

    if (tagData && tagData.builderId) {
      const ref = {
        "@type": "@builder.io/core:Reference",
        id: tagData.builderId,
        model: "tag",
      };
      resolved.push({ [wrapperKey]: ref });
      log.verbose(
        `  Resolved: ${wixTagId} → ${tagData.builderId} (${tagData.name})`,
        isVerbose
      );
    } else {
      unresolved.push(wixTagId);
      log.verbose(`  Not found: ${wixTagId}`, isVerbose);
    }
  }

  return { resolved, unresolved };
}

// ============================================================================
// Builder.io API Functions
// ============================================================================

/**
 * Fetch existing info-page data from Builder.io
 * Uses the CDN API endpoint for reading content
 */
async function getInfoPage(builderId) {
  // Use cdn.builder.io for content reads with query by ID
  const url = `https://cdn.builder.io/api/v3/content/info-page?apiKey=${PUBLIC_API_KEY}&query.id=${builderId}&limit=1&includeRefs=false`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `${response.status}: ${errorText}`,
      };
    }

    const result = await response.json();

    // The API returns { results: [...] }, get the first result
    const data = result.results?.[0] || null;

    if (!data) {
      return {
        success: false,
        error: "Content not found",
      };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update info-page with merged data (preserves existing fields)
 */
async function updateInfoPage(
  builderId,
  fieldName,
  fieldValue,
  isDryRun,
  isVerbose
) {
  if (isDryRun) {
    return { success: true, dryRun: true };
  }

  // First, fetch existing page data
  const existingResult = await getInfoPage(builderId);
  if (!existingResult.success) {
    return {
      success: false,
      error: `Failed to fetch existing data: ${existingResult.error}`,
    };
  }

  const existingData = existingResult.data?.data || {};
  log.verbose(
    `  Fetched existing data with ${Object.keys(existingData).length} fields`,
    isVerbose
  );

  // Merge the new field value with existing data
  const mergedData = {
    ...existingData,
    [fieldName]: fieldValue,
  };

  const url = `${BUILDER_API_URL}/write/info-page/${builderId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: mergedData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `${response.status}: ${errorText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============================================================================
// Main Fix Function
// ============================================================================

async function fixReferences(count, start, field, isDryRun, isVerbose) {
  log.title("Fix Info Page Reference Fields");

  // Validate API keys
  if (!PRIVATE_API_KEY) {
    log.error("BUILDER_PRIVATE_API_KEY not set in environment");
    process.exit(1);
  }
  if (!PUBLIC_API_KEY) {
    log.error("NEXT_PUBLIC_BUILDER_API_KEY not set in environment");
    process.exit(1);
  }

  // Load data
  const csvRecords = loadCSV();
  const tagMapping = loadTagMapping();
  const infoPageMapping = loadInfoPageMapping();

  // Get field configuration
  const fieldConfig = FIELD_CONFIG[field];
  log.info(
    `Field to fix: ${field} (CSV: "${fieldConfig.csvColumn}" → Builder: "${fieldConfig.builderField}")`
  );

  // Determine records to process
  const totalRecords = csvRecords.length;
  const endIndex =
    count === "all" ? totalRecords : Math.min(start + count, totalRecords);
  const recordsToProcess = csvRecords.slice(start, endIndex);

  log.info(
    `Processing records ${start} to ${endIndex - 1} (${
      recordsToProcess.length
    } records)`
  );

  if (isDryRun) {
    log.warning("DRY RUN MODE - No changes will be made");
  }

  // Statistics
  const stats = {
    total: recordsToProcess.length,
    updated: 0,
    skipped: 0,
    noMapping: 0,
    noValue: 0,
    errors: 0,
    unresolvedTags: [],
  };

  console.log();

  // Process each record
  for (let i = 0; i < recordsToProcess.length; i++) {
    const row = recordsToProcess[i];
    const wixId = row.id;
    const title = row.title || "Untitled";

    log.progress(i + 1, recordsToProcess.length, title);

    // Find Builder.io page ID from mapping
    const pageMapping = infoPageMapping.wixToBuilder[wixId];
    if (!pageMapping || !pageMapping.builderId) {
      log.verbose(
        `  Skipping: No Builder.io mapping found for Wix ID ${wixId}`,
        isVerbose
      );
      stats.noMapping++;
      continue;
    }

    const builderId = pageMapping.builderId;

    // Get field value from CSV
    const csvValue = row[fieldConfig.csvColumn];
    if (!csvValue || csvValue.trim() === "") {
      log.verbose(`  Skipping: No ${field} value in CSV`, isVerbose);
      stats.noValue++;
      continue;
    }

    // Parse Wix tag IDs
    const wixTagIds = parseTagIds(csvValue);
    if (wixTagIds.length === 0) {
      log.verbose(`  Skipping: Empty ${field} array`, isVerbose);
      stats.noValue++;
      continue;
    }

    log.verbose(
      `  Found ${wixTagIds.length} Wix tag IDs: ${wixTagIds.join(", ")}`,
      isVerbose
    );

    // Resolve tag references
    const { resolved, unresolved } = resolveTagReferences(
      wixTagIds,
      tagMapping,
      fieldConfig.wrapperKey,
      isVerbose
    );

    if (unresolved.length > 0) {
      stats.unresolvedTags.push(
        ...unresolved.map((id) => ({ wixId, tagId: id, title }))
      );
    }

    if (resolved.length === 0) {
      log.warning(`  No valid references resolved for ${title}`);
      stats.skipped++;
      continue;
    }

    // Update the page in Builder.io
    const result = await updateInfoPage(
      builderId,
      fieldConfig.builderField,
      resolved,
      isDryRun,
      isVerbose
    );

    if (result.success) {
      if (result.dryRun) {
        log.verbose(
          `  Would update ${builderId} with ${resolved.length} references`,
          isVerbose
        );
      } else {
        log.verbose(
          `  Updated ${builderId} with ${resolved.length} references`,
          isVerbose
        );
      }
      stats.updated++;
    } else {
      log.error(`  Failed to update ${builderId}: ${result.error}`);
      stats.errors++;
    }

    // Rate limiting
    if (!isDryRun && i < recordsToProcess.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
    }
  }

  // Print summary
  console.log();
  log.title("Summary");
  console.log(`  Total processed:    ${stats.total}`);
  console.log(
    `  ${colors.green}Updated:${colors.reset}             ${stats.updated}`
  );
  console.log(
    `  ${colors.yellow}No mapping:${colors.reset}          ${stats.noMapping}`
  );
  console.log(
    `  ${colors.yellow}No value in CSV:${colors.reset}     ${stats.noValue}`
  );
  console.log(
    `  ${colors.yellow}Skipped:${colors.reset}             ${stats.skipped}`
  );
  console.log(
    `  ${colors.red}Errors:${colors.reset}              ${stats.errors}`
  );

  if (stats.unresolvedTags.length > 0) {
    console.log();
    log.warning(
      `${stats.unresolvedTags.length} tag references could not be resolved:`
    );
    const uniqueUnresolved = [
      ...new Set(stats.unresolvedTags.map((t) => t.tagId)),
    ];
    uniqueUnresolved.slice(0, 10).forEach((tagId) => {
      console.log(`  - ${tagId}`);
    });
    if (uniqueUnresolved.length > 10) {
      console.log(`  ... and ${uniqueUnresolved.length - 10} more`);
    }
  }

  if (isDryRun) {
    console.log();
    log.info("This was a dry run. Run without --dry-run to apply changes.");
  }
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
  try {
    const { count, start, field, isDryRun, isVerbose } = parseArguments();
    await fixReferences(count, start, field, isDryRun, isVerbose);
  } catch (error) {
    log.error(`Script failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

main();
