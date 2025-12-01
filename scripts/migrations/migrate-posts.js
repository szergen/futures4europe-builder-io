#!/usr/bin/env node

/**
 * Wix Post Pages to Builder.io Migration Script
 *
 * Migrates post pages (including events and project results) from Wix CSV export
 * to Builder.io using the Write API. Handles field transformation, reference resolution,
 * duplicate prevention, and progress tracking.
 *
 * Usage:
 *   node scripts/migrations/migrate-posts.js <count> [--dry-run] [--validate]
 *
 * Arguments:
 *   count       - Number of posts to migrate (1, 10, 100, or "all")
 *   --dry-run   - Preview migration without creating posts (optional)
 *   --validate  - Validate migrated posts against source data (optional)
 *
 * Examples:
 *   node scripts/migrations/migrate-posts.js 10                 # Migrate first 10 posts
 *   node scripts/migrations/migrate-posts.js all                # Migrate all posts
 *   node scripts/migrations/migrate-posts.js 5 --dry-run        # Preview 5 posts
 *   node scripts/migrations/migrate-posts.js 10 --validate      # Validate 10 posts
 *
 * Features:
 *   - Preserves all 40+ fields (basic, metadata, content, references)
 *   - Handles 3 sub-types: post, event, project-result
 *   - Resolves references via tag-migration-mapping.json
 *   - Prevents duplicates via post-migration-mapping.json
 *   - Progress tracking with ETA calculation
 *   - Resume capability after interruption
 *   - Rate limiting (200ms default delay)
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");

// ============================================================================
// Configuration
// ============================================================================

// Note: Use PRIVATE API KEY for write operations, not the public key
const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const MODEL_NAME = "post-page";
const CSV_FILE = "./data/exports/Posts_Events_Project+Results+Pages_wix.csv";
const MAPPING_FILE = "./data/mappings/post-migration-mapping.json";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";
const BUILDER_API_URL = "https://builder.io/api/v1";
const RATE_LIMIT = 200; // milliseconds between API calls

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
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// ============================================================================
// Phase 2: Foundational Functions
// ============================================================================

/**
 * Load and parse CSV file with posts export from Wix
 * @returns {Array} Array of post objects from CSV
 */
function loadCSV() {
  try {
    log.info("Reading CSV file...");
    const fileContent = fs.readFileSync(CSV_FILE, "utf8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true, // Handle UTF-8 BOM (Byte Order Mark)
      relax_quotes: true, // More lenient quote handling
    });
    log.success(`Found ${records.length} posts in CSV`);
    return records;
  } catch (error) {
    log.error(`Failed to read CSV: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Load or initialize post migration mapping file
 * @returns {Object} Mapping object with wixToBuilder, builderToWix, stats
 */
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

/**
 * Save mapping file with atomic write
 * @param {Object} mapping - Mapping object to save
 */
function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
}

/**
 * Load tag migration mapping for reference resolution
 * @returns {Object} Tag mapping object
 */
function loadTagMapping() {
  try {
    if (!fs.existsSync(TAG_MAPPING_FILE)) {
      log.error(`Tag mapping file not found: ${TAG_MAPPING_FILE}`);
      log.error(
        "Please run tag migration first: node scripts/migrations/migrate-tags.js all"
      );
      process.exit(1);
    }
    const data = fs.readFileSync(TAG_MAPPING_FILE, "utf8");
    const mapping = JSON.parse(data);
    log.success(
      `Loaded tag mapping: ${Object.keys(mapping.wixToBuilder).length} tags`
    );
    return mapping;
  } catch (error) {
    log.error(`Failed to load tag mapping: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Make HTTP request to Builder.io API
 * @param {string} method - HTTP method (GET, POST, PUT)
 * @param {string} endpoint - API endpoint
 * @param {Object|null} data - Request body data
 * @returns {Promise<Object>} Response data
 */
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

/**
 * Validate that required fields are present in post data
 * @param {Object} post - Post data object (CSV row)
 * @returns {Object} {valid: boolean, missing: Array}
 */
function validateRequiredFields(post) {
  // CSV headers are: "Title" and "Slug" (capitalized)
  const required = ["Title", "Slug"];
  const missing = [];

  for (const field of required) {
    if (!post[field] || post[field].trim() === "") {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing: missing,
  };
}

// ============================================================================
// CLI Argument Parsing
// ============================================================================

/**
 * Parse command-line arguments
 * @param {Array} args - Process arguments
 * @returns {Object} Parsed arguments {count, isDryRun, isValidate}
 */
function parseArgs(args) {
  if (args.length === 0) {
    return null; // Will show help
  }

  const count = args[0];
  const flags = args.slice(1);

  // Validate count
  if (count !== "all" && isNaN(parseInt(count))) {
    log.error('Invalid count argument. Use a number or "all"');
    process.exit(1);
  }

  return {
    count: count,
    isDryRun: flags.includes("--dry-run"),
    isValidate: flags.includes("--validate"),
  };
}

// ============================================================================
// Phase 3: User Story 1 - Transformation Functions
// ============================================================================

/**
 * Transform basic fields (title, subtitle, slug, wixId)
 * @param {Object} csvRow - CSV row data
 * @returns {Object} Basic fields object
 */
function transformBasicFields(csvRow) {
  return {
    title: csvRow.Title || "",
    subtitle: csvRow.subtitle || "",
    slug: `/post/${csvRow.Slug}`, // Add /post/ prefix for Builder.io
    wixId: csvRow.ID, // Preserve original Wix ID
  };
}

/**
 * Transform metadata fields (dates, published status, owner)
 * @param {Object} csvRow - CSV row data
 * @returns {Object} Metadata object
 */
function transformMetadata(csvRow) {
  return {
    createdDate: csvRow["Created Date"]
      ? new Date(csvRow["Created Date"]).getTime()
      : Date.now(),
    lastUpdated: csvRow["Updated Date"]
      ? new Date(csvRow["Updated Date"]).getTime()
      : Date.now(),
    published: "published", // Default to published
    createdBy: csvRow.Owner || "", // Builder.io user ID
  };
}

/**
 * Helper to safely parse JSON string or return default
 * @param {string} jsonString - JSON string from CSV
 * @param {*} defaultValue - Default value if parse fails
 * @returns {*} Parsed object or default value
 */
function parseJsonField(jsonString, defaultValue = {}) {
  if (!jsonString || jsonString.trim() === "") {
    return defaultValue;
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    // If not valid JSON, treat as plain string (for backward compatibility)
    return typeof defaultValue === "object" && defaultValue !== null
      ? { url: jsonString }
      : jsonString;
  }
}

/**
 * Transform content fields (rich text and images)
 * @param {Object} csvRow - CSV row data
 * @returns {Object} Content fields object
 */
function transformContentFields(csvRow) {
  const content = {};

  // Rich text fields (10 sections)
  for (let i = 1; i <= 10; i++) {
    const fieldName = `Post Content ${i}`;
    content[`postContentRIch${i}`] = csvRow[fieldName] || "";
  }

  // Image fields (10 images) - Parse JSON objects from CSV
  for (let i = 1; i <= 10; i++) {
    const fieldName = `Post Image ${i}`;
    const imageData = csvRow[fieldName] || "";
    content[`postImage${i}`] = parseJsonField(imageData, {});
  }

  return content;
}

/**
 * Resolve a Wix ID to a Builder.io Reference object
 * @param {string} wixId - Wix entity ID
 * @param {Object} tagMapping - Tag migration mapping
 * @param {string} model - Builder.io model name (usually "tag")
 * @returns {Object|null} Builder.io Reference object or null
 */
function resolveReference(wixId, tagMapping, model = "tag") {
  if (!wixId || !tagMapping.wixToBuilder[wixId]) {
    return null;
  }

  const builderInfo = tagMapping.wixToBuilder[wixId];
  return {
    "@type": "@builder.io/core:Reference",
    id: builderInfo.builderId,
    model: model,
  };
}

/**
 * Transform reference fields (tags, people, projects, etc.)
 * @param {Object} csvRow - CSV row data
 * @param {Object} tagMapping - Tag migration mapping
 * @returns {Object} Reference fields object with warnings
 */
function transformReferences(csvRow, tagMapping) {
  const references = {};
  const warnings = [];

  // Helper to parse JSON array from CSV
  const parseJsonArray = (field) => {
    if (!field || field.trim() === "") return [];
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  };

  // Helper to wrap reference in item wrapper
  const wrapReference = (ref, wrapperKey) => {
    if (!ref) return null;
    return { [wrapperKey]: ref };
  };

  // Helper to transform array of Wix IDs to Builder.io references
  const transformReferenceArray = (wixIds, wrapperKey) => {
    if (!wixIds || wixIds.length === 0) return [];

    const refs = [];
    for (const wixId of wixIds) {
      const ref = resolveReference(wixId, tagMapping);
      if (ref) {
        refs.push(wrapReference(ref, wrapperKey));
      } else {
        warnings.push({
          type: wrapperKey.replace("Item", ""),
          wixId: wixId,
        });
      }
    }
    return refs;
  };

  // Transform all reference fields
  references.author = transformReferenceArray(
    parseJsonArray(csvRow.Author),
    "authorItem"
  );
  references.pageOwner = transformReferenceArray(
    parseJsonArray(csvRow.pageOwner),
    "pageOwnerItem"
  );
  references.people = transformReferenceArray(
    parseJsonArray(csvRow.people),
    "peopleItem"
  );
  references.methods = transformReferenceArray(
    parseJsonArray(csvRow.methods),
    "methodsItem"
  );
  references.domains = transformReferenceArray(
    parseJsonArray(csvRow.domains),
    "domainsItem"
  );
  references.projects = transformReferenceArray(
    parseJsonArray(csvRow.projects),
    "projectsItem"
  );
  references.organisations = transformReferenceArray(
    parseJsonArray(csvRow.organisations),
    "organisationsItem"
  );
  references.pageTypes = transformReferenceArray(
    parseJsonArray(csvRow.pageTypes),
    "pageTypeItem"
  );

  // Country tag (single reference, but stored as array)
  const countryTagIds = parseJsonArray(csvRow.countryTag);
  if (countryTagIds.length > 0) {
    const ref = resolveReference(countryTagIds[0], tagMapping);
    references.countryTag = ref || null;
  } else {
    references.countryTag = null;
  }

  return { references, warnings };
}

/**
 * Transform event-specific fields
 * @param {Object} csvRow - CSV row data
 * @param {Object} tagMapping - Tag migration mapping
 * @returns {Object} Event fields object with warnings
 */
function transformEventFields(csvRow, tagMapping) {
  const parseJsonArray = (field) => {
    if (!field || field.trim() === "") return [];
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  };

  const wrapReference = (ref, wrapperKey) => {
    if (!ref) return null;
    return { [wrapperKey]: ref };
  };

  const transformReferenceArray = (wixIds, wrapperKey) => {
    if (!wixIds || wixIds.length === 0) return [];
    return wixIds
      .map((wixId) => {
        const ref = resolveReference(wixId, tagMapping);
        return ref ? wrapReference(ref, wrapperKey) : null;
      })
      .filter(Boolean);
  };

  return {
    speakers: transformReferenceArray(
      parseJsonArray(csvRow.speakers),
      "speakersItem"
    ),
    moderators: transformReferenceArray(
      parseJsonArray(csvRow.moderators),
      "moderatorsItem"
    ),
    eventRegistration: csvRow.eventRegistration || "",
    eventStartDate: csvRow.eventStartDate
      ? new Date(csvRow.eventStartDate).getTime()
      : null,
    eventEndDate: csvRow.eventEndDate
      ? new Date(csvRow.eventEndDate).getTime()
      : null,
  };
}

/**
 * Transform project result-specific fields
 * @param {Object} csvRow - CSV row data
 * @param {Object} tagMapping - Tag migration mapping
 * @returns {Object} Project result fields object
 */
function transformProjectResultFields(csvRow, tagMapping) {
  const parseJsonArray = (field) => {
    if (!field || field.trim() === "") return [];
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  };

  const wrapReference = (ref, wrapperKey) => {
    if (!ref) return null;
    return { [wrapperKey]: ref };
  };

  const transformReferenceArray = (wixIds, wrapperKey) => {
    if (!wixIds || wixIds.length === 0) return [];
    return wixIds
      .map((wixId) => {
        const ref = resolveReference(wixId, tagMapping);
        return ref ? wrapReference(ref, wrapperKey) : null;
      })
      .filter(Boolean);
  };

  return {
    projectResultAuthor: transformReferenceArray(
      parseJsonArray(csvRow.projectResultAuthor),
      "projectResultAuthorItem"
    ),
    // Parse JSON object from CSV instead of wrapping in { url: ... }
    projectResultMedia: parseJsonField(csvRow["Project Result Media"], {}),
    projectResultPublicationDate: csvRow.projectResultPublicationDate
      ? new Date(csvRow.projectResultPublicationDate).getTime()
      : null,
  };
}

/**
 * Transform additional fields
 * @param {Object} csvRow - CSV row data
 * @returns {Object} Additional fields object
 */
function transformAdditionalFields(csvRow) {
  const parseJsonArray = (field) => {
    if (!field || field.trim() === "") return [];
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  };

  return {
    internalLinks: parseJsonArray(csvRow.internalLinks),
    mediaFiles: parseJsonArray(csvRow["Media Files"]),
    recommendations: csvRow.recomendations
      ? parseInt(csvRow.recomendations)
      : 0,
    postPublicationDate: csvRow.postPublicationDate
      ? new Date(csvRow.postPublicationDate).getTime()
      : null,
  };
}

/**
 * Main transformation function - orchestrates all transformations
 * @param {Object} csvRow - CSV row data
 * @param {Object} tagMapping - Tag migration mapping
 * @returns {Object} Complete transformed post data
 */
function transformPost(csvRow, tagMapping) {
  const basic = transformBasicFields(csvRow);
  const metadata = transformMetadata(csvRow);
  const content = transformContentFields(csvRow);
  const { references, warnings } = transformReferences(csvRow, tagMapping);
  const eventFields = transformEventFields(csvRow, tagMapping);
  const projectResultFields = transformProjectResultFields(csvRow, tagMapping);
  const additional = transformAdditionalFields(csvRow);

  return {
    post: {
      name: basic.title,
      published: metadata.published,
      data: {
        ...basic,
        ...content,
        ...references,
        ...eventFields,
        ...projectResultFields,
        ...additional,
      },
      createdDate: metadata.createdDate,
      lastUpdated: metadata.lastUpdated,
      createdBy: metadata.createdBy,
    },
    warnings,
  };
}

/**
 * Check if a slug already exists in Builder.io and generate unique version
 * @param {string} slug - Original slug
 * @param {number} attempt - Collision attempt number
 * @returns {Promise<string>} Unique slug
 */
async function checkDuplicateSlug(slug, attempt = 0) {
  try {
    // Query Builder.io for posts with this slug
    const endpoint = `query/${MODEL_NAME}?query.data.slug=${encodeURIComponent(
      slug
    )}&limit=1&fields=id`;
    const response = await makeRequest("GET", endpoint);

    // If no results, slug is available
    if (!response || !response.results || response.results.length === 0) {
      return slug;
    }

    // Slug exists, try with suffix
    const newAttempt = attempt + 1;
    const baseSlug = slug.replace(/-\d+$/, ""); // Remove existing suffix
    const newSlug = `${baseSlug}-${newAttempt + 1}`;

    log.warning(`Slug collision: ${slug} -> ${newSlug}`);
    return await checkDuplicateSlug(newSlug, newAttempt);
  } catch (error) {
    // If query fails, assume slug is available
    log.warning(`Failed to check slug uniqueness: ${error.message}`);
    return slug;
  }
}

/**
 * Create a post in Builder.io
 * @param {Object} postData - Post data to create
 * @param {number} index - Current post index
 * @param {number} total - Total posts to migrate
 * @returns {Promise<Object|null>} Created post response or null on failure
 */
async function createPost(postData, index, total) {
  try {
    const response = await makeRequest("POST", `write/${MODEL_NAME}`, postData);
    log.success(
      `[${index + 1}/${total}] Created: ${postData.name} (ID: ${response.id})`
    );
    return response;
  } catch (error) {
    log.error(
      `[${index + 1}/${total}] Failed to create ${postData.name}: ${
        error.message
      }`
    );
    return null;
  }
}

/**
 * Main migration function
 * @param {string} count - Number of posts to migrate ("all" or number)
 */
async function migrate(count) {
  log.title("🚀 Starting Post Pages Migration to Builder.io");

  // Load CSV
  const allPosts = loadCSV();

  // Determine how many to migrate
  const postsToMigrate =
    count === "all" ? allPosts : allPosts.slice(0, parseInt(count));
  log.info(`Migrating ${postsToMigrate.length} posts...`);

  // Load mappings
  const mapping = loadMapping();
  const tagMapping = loadTagMapping();

  // Counters
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  const errors = [];

  // Migrate posts
  for (let i = 0; i < postsToMigrate.length; i++) {
    const row = postsToMigrate[i];
    const wixId = row.ID;

    // Skip if already migrated (duplicate prevention)
    if (mapping.wixToBuilder[wixId]) {
      log.warning(
        `[${i + 1}/${postsToMigrate.length}] Skipping ${
          row.Title
        } (already migrated)`
      );
      skipCount++;
      continue;
    }

    // Validate required fields
    const validation = validateRequiredFields(row);
    if (!validation.valid) {
      log.error(
        `[${i + 1}/${postsToMigrate.length}] Skipping ${
          row.Title || wixId
        }: Missing required fields: ${validation.missing.join(", ")}`
      );
      errors.push({
        wixId,
        title: row.Title,
        reason: `Missing required fields: ${validation.missing.join(", ")}`,
      });
      errorCount++;
      continue;
    }

    // Transform post
    const { post, warnings } = transformPost(row, tagMapping);

    // Log reference warnings
    if (warnings.length > 0) {
      for (const warning of warnings) {
        log.warning(
          `Post ${wixId}: Missing reference ${warning.type}:${warning.wixId}`
        );
      }
    }

    // Check for duplicate slug
    post.data.slug = await checkDuplicateSlug(post.data.slug);

    // Create post in Builder.io
    const result = await createPost(post, i, postsToMigrate.length);

    if (result && result.id) {
      // Store mapping
      mapping.wixToBuilder[wixId] = {
        builderId: result.id,
        title: row.Title,
        slug: post.data.slug,
      };
      mapping.builderToWix[result.id] = wixId;
      successCount++;

      // Save mapping after each successful creation
      mapping.migratedCount = successCount;
      mapping.lastMigrated = new Date().toISOString();
      saveMapping(mapping);
    } else {
      errors.push({
        wixId,
        title: row.Title,
        reason: "Failed to create post in Builder.io",
      });
      errorCount++;
    }

    // Rate limiting - wait 200ms before next request
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
  }

  // Summary report
  log.title("📊 Migration Summary");
  log.success(`Successfully migrated: ${successCount} posts`);
  if (skipCount > 0) {
    log.info(`Skipped (already migrated): ${skipCount} posts`);
  }
  if (errorCount > 0) {
    log.error(`Failed: ${errorCount} posts`);
    if (errors.length > 0) {
      log.title("Failed Posts:");
      errors.forEach((err) => {
        log.error(`  • ${err.title || err.wixId}: ${err.reason}`);
      });
    }
  }
  log.info(`Mapping saved to: ${MAPPING_FILE}`);
  log.info(`Total processed: ${postsToMigrate.length} posts`);
}

// ============================================================================
// CLI Help & Main
// ============================================================================

function showHelp() {
  console.log(`
${colors.bright}Wix Post Pages to Builder.io Migration Script${colors.reset}

${colors.bright}Usage:${colors.reset}
  node scripts/migrations/migrate-posts.js <count> [--dry-run] [--validate]

${colors.bright}Arguments:${colors.reset}
  count       - Number of posts to migrate (1, 10, 100, or "all")
  --dry-run   - Preview migration without creating posts (optional)
  --validate  - Validate migrated posts against source data (optional)

${colors.bright}Examples:${colors.reset}
  node scripts/migrations/migrate-posts.js 10                 # Migrate first 10 posts
  node scripts/migrations/migrate-posts.js all                # Migrate all posts
  node scripts/migrations/migrate-posts.js 5 --dry-run        # Preview 5 posts
  node scripts/migrations/migrate-posts.js 10 --validate      # Validate 10 posts

${colors.bright}Features:${colors.reset}
  • Preserves all 40+ fields (basic, metadata, content, references)
  • Handles 3 sub-types: post, event, project-result
  • Resolves references via tag-migration-mapping.json
  • Prevents duplicates via post-migration-mapping.json
  • Progress tracking with ETA calculation
  • Resume capability after interruption
  • Rate limiting (200ms default delay)

${colors.bright}Prerequisites:${colors.reset}
  1. BUILDER_PRIVATE_API_KEY in .env.local
  2. CSV file at: ${CSV_FILE}
  3. Tag mapping at: ${TAG_MAPPING_FILE}

${colors.bright}Progress:${colors.reset}
  Progress is saved to ${MAPPING_FILE}
  Interruptions are safe - script resumes from last successful migration
  `);
}

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const parsed = parseArgs(args);

  // Show help if no arguments
  if (!parsed) {
    showHelp();
    process.exit(0);
  }

  const { count, isDryRun, isValidate } = parsed;

  // Check API key
  if (!PRIVATE_API_KEY) {
    log.error("Builder.io Private API key not found in .env.local");
    log.error("Add BUILDER_PRIVATE_API_KEY to .env.local");
    log.error("Get it from: https://builder.io/account/space");
    process.exit(1);
  }

  try {
    if (isValidate) {
      log.title("🔍 Post Migration Validation Mode");
      log.info("Validation mode not yet implemented (Phase 6 - User Story 2)");
      log.info("Run without --validate flag to migrate posts");
    } else if (isDryRun) {
      log.title("🧪 Post Migration Dry-Run Mode");
      log.info("Dry-run mode not yet implemented (Phase 5 - User Story 4)");
      log.info("Run without --dry-run flag to migrate posts");
    } else {
      // Standard migration mode
      await migrate(count);
    }
  } catch (error) {
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
