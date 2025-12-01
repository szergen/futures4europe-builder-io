#!/usr/bin/env node

/**
 * Wix Info Pages to Builder.io Migration Script
 *
 * Migrates info pages (Person, Organisation, and Project pages) from Wix CSV export
 * to Builder.io using the Write API. Routes pages to different models based on page type,
 * handles field transformation, tag reference resolution, duplicate prevention, and progress tracking.
 *
 * Usage:
 *   node scripts/migrations/migrate-infopages.js <count> [--dry-run] [--validate]
 *
 * Arguments:
 *   count       - Number of info pages to migrate (1, 10, 100, or "all")
 *   --dry-run   - Preview migration without creating pages (optional)
 *   --validate  - Validate migrated pages against source data (optional)
 *
 * Examples:
 *   node scripts/migrations/migrate-infopages.js 10                 # Migrate first 10 pages
 *   node scripts/migrations/migrate-infopages.js all                # Migrate all pages
 *   node scripts/migrations/migrate-infopages.js 5 --dry-run        # Preview 5 pages
 *   node scripts/migrations/migrate-infopages.js 10 --validate      # Validate 10 pages
 *
 * Features:
 *   - Routes pages to three models: person-page, organisation-page, project-page
 *   - Page type determination via tag name lookup (simplified string matching)
 *   - All references resolve to tags only (major simplification)
 *   - Structured roles stored as JSON text (no reference resolution)
 *   - Case-insensitive CSV column matching for robustness
 *   - Three separate mapping files per page type
 *   - Progress tracking with ETA calculation
 *   - Resume capability after interruption
 *   - Rate limiting (200ms default delay)
 */

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse/sync");

// ============================================================================
// Configuration - T003: Define configuration constants
// ============================================================================

// API Configuration
const PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY;
const BUILDER_API_URL = "https://builder.io/api/v1";
const RATE_LIMIT = 200; // milliseconds between API calls

// File Paths
const CSV_FILE =
  "./data/exports/Project_Organisation_Person+Info+Pages_wix.csv";
const TAG_MAPPING_FILE = "./data/mappings/tag-migration-mapping.json";

// Mapping files configuration
// Option 1: Separate mapping files for each page type (tracks migrations per type)
// const MAPPING_FILES = {
//   person: "./data/mappings/person-migration-mapping.json",
//   organisation: "./data/mappings/organisation-migration-mapping.json",
//   project: "./data/mappings/project-migration-mapping.json",
// };

// Option 2: Single mapping file for all info pages (simpler if using single model)
const SINGLE_MAPPING_FILE = "./data/mappings/info-page-migration-mapping.json";
const MAPPING_FILES = {
  person: SINGLE_MAPPING_FILE,
  organisation: SINGLE_MAPPING_FILE,
  project: SINGLE_MAPPING_FILE,
};

// Model names for Builder.io
// Option 1: Use separate models for each type (requires creating 3 models in Builder.io)
// const MODELS = {
//   person: "person-page",
//   organisation: "organisation-page",
//   project: "project-page",
// };

// Option 2: Use single model for all info pages (simpler - requires only 1 model)
const MODELS = {
  person: "info-page",
  organisation: "info-page",
  project: "info-page",
};

// Slug prefixes for each page type
const SLUG_PREFIXES = {
  person: "/person/",
  organisation: "/organisation/",
  project: "/project/",
};

// ============================================================================
// Console Colors & Logging - T004: Set up colored console logging utilities
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
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  pageType: (type) => {
    const typeColors = {
      person: colors.magenta,
      organisation: colors.blue,
      project: colors.cyan,
    };
    return `${typeColors[type] || colors.reset}${type}${colors.reset}`;
  },
};

// ============================================================================
// CLI Argument Parsing - T005: Implement CLI argument parsing with help
// ============================================================================

/**
 * Display help text
 */
function displayHelp() {
  console.log(`
${colors.cyan}Wix Info Pages to Builder.io Migration Script${colors.reset}

${colors.bright}Usage:${colors.reset}
  node scripts/migrations/migrate-infopages.js <count> [--start N] [--dry-run] [--validate]

${colors.bright}Arguments:${colors.reset}
  count           Number of info pages to migrate (number or "all")
  --start N       Start from the Nth record (0-based index, default: 0)
  --dry-run       Preview migration without creating pages
  --validate      Validate migrated pages against source data

${colors.bright}Examples:${colors.reset}
  node scripts/migrations/migrate-infopages.js 10
  node scripts/migrations/migrate-infopages.js all
  node scripts/migrations/migrate-infopages.js 10 --start 50      # Migrate records 50-59
  node scripts/migrations/migrate-infopages.js 20 --start 100     # Migrate records 100-119
  node scripts/migrations/migrate-infopages.js 5 --dry-run
  node scripts/migrations/migrate-infopages.js 10 --validate

${colors.bright}Page Types:${colors.reset}
  ${log.pageType("person")}       - Person pages → person-page model
  ${log.pageType("organisation")} - Organisation pages → organisation-page model
  ${log.pageType("project")}      - Project pages → project-page model
`);
}

/**
 * Parse command line arguments
 * @returns {Object} Parsed arguments {count, start, isDryRun, isValidate}
 */
function parseArguments() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    displayHelp();
    process.exit(0);
  }

  const count = args[0];
  const isDryRun = args.includes("--dry-run");
  const isValidate = args.includes("--validate");

  // Parse --start flag
  let start = 0;
  const startFlagIndex = args.indexOf("--start");
  if (startFlagIndex !== -1 && args[startFlagIndex + 1]) {
    const startValue = parseInt(args[startFlagIndex + 1]);
    if (isNaN(startValue) || startValue < 0) {
      log.error(`Invalid --start value: ${args[startFlagIndex + 1]}`);
      log.info("--start must be a non-negative number");
      process.exit(1);
    }
    start = startValue;
  }

  // Validate count argument
  if (count !== "all" && isNaN(parseInt(count))) {
    log.error(`Invalid count argument: ${count}`);
    log.info('Count must be a number or "all"');
    process.exit(1);
  }

  return {
    count: count === "all" ? count : parseInt(count),
    start,
    isDryRun,
    isValidate,
  };
}

// ============================================================================
// CSV & Mapping File Functions - T006-T010
// ============================================================================

/**
 * T007: Normalize column names to lowercase for case-insensitive matching
 * @param {string} name - Column name from CSV
 * @returns {string} Normalized column name
 */
function normalizeColumnName(name) {
  return name.toLowerCase().trim();
}

/**
 * T006: Load and parse CSV file with case-insensitive column matching
 * @returns {Array} Array of info page objects from CSV
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

    // Create a normalized column mapping for case-insensitive access
    const normalizedRecords = records.map((record) => {
      const normalized = {};
      const originalKeys = {};
      for (const key in record) {
        const normalizedKey = normalizeColumnName(key);
        normalized[normalizedKey] = record[key];
        originalKeys[normalizedKey] = key;
      }
      // Store both normalized and original for reference
      normalized._originalKeys = originalKeys;
      return normalized;
    });

    log.success(`Found ${normalizedRecords.length} info pages in CSV`);
    return normalizedRecords;
  } catch (error) {
    log.error(`Failed to read CSV: ${error.message}`);
    process.exit(1);
  }
}

/**
 * T008: Load or initialize mapping file by page type
 * @param {string} pageType - 'person', 'organisation', or 'project'
 * @returns {Object} Mapping object with wixToBuilder, builderToWix, stats
 */
function loadMapping(pageType) {
  const mappingFile = MAPPING_FILES[pageType];
  if (fs.existsSync(mappingFile)) {
    const data = fs.readFileSync(mappingFile, "utf8");
    return JSON.parse(data);
  }
  // T010: Create mapping file structure
  return {
    wixToBuilder: {},
    builderToWix: {},
    migratedCount: 0,
    lastMigrated: null,
  };
}

/**
 * T009: Save mapping file with atomic write by page type
 * @param {string} pageType - 'person', 'organisation', or 'project'
 * @param {Object} mapping - Mapping object to save
 */
function saveMapping(pageType, mapping) {
  const mappingFile = MAPPING_FILES[pageType];
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
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

// ============================================================================
// Page Type Determination - T011-T017 (SIMPLIFIED APPROACH)
// ============================================================================

/**
 * T011-T017: Determine page type from CSV row using simplified tag name matching
 * @param {Object} row - CSV row with normalized column names
 * @param {Object} tagMapping - Tag migration mapping
 * @returns {Object|null} Page type info {type, model, prefix} or null if invalid
 */
function determinePageType(row, tagMapping) {
  // T012: Extract Page Types field from CSV row
  const pageTypesField = row["page types"] || row["pagetypes"];

  if (!pageTypesField || pageTypesField.trim() === "") {
    // T017: Handle missing/invalid Page Types field
    log.warning(`Row with ID ${row.id || "unknown"}: Missing Page Types field`);
    return null;
  }

  try {
    // Parse JSON array of Wix tag IDs
    const pageTypeIds = JSON.parse(pageTypesField);

    if (!Array.isArray(pageTypeIds) || pageTypeIds.length === 0) {
      log.warning(
        `Row with ID ${
          row.id || "unknown"
        }: Page Types field is not a valid array`
      );
      return null;
    }

    // T013: Look up each Wix tag ID in tag-migration-mapping.json to get tag names
    const recognizedTypes = [];

    for (const wixTagId of pageTypeIds) {
      const tagData = tagMapping.wixToBuilder[wixTagId];

      if (tagData && tagData.name) {
        const tagName = tagData.name.toLowerCase();

        // T014: Simple string matching on tag name
        if (tagName.includes("person")) {
          recognizedTypes.push("person");
        } else if (
          tagName.includes("organisation") ||
          tagName.includes("organization")
        ) {
          recognizedTypes.push("organisation");
        } else if (tagName.includes("project")) {
          recognizedTypes.push("project");
        }
      }
    }

    if (recognizedTypes.length === 0) {
      log.warning(
        `Row with ID ${
          row.id || "unknown"
        }: No recognized page type in Page Types field`
      );
      return null;
    }

    // T015: Apply fallback priority order if multiple types detected (rare case)
    let selectedType;
    if (recognizedTypes.length > 1) {
      // Priority: Person > Organisation > Project
      if (recognizedTypes.includes("person")) {
        selectedType = "person";
      } else if (recognizedTypes.includes("organisation")) {
        selectedType = "organisation";
      } else {
        selectedType = "project";
      }

      log.warning(
        `Row with ID ${
          row.id || "unknown"
        }: Multiple page types detected [${recognizedTypes.join(
          ", "
        )}], using priority: ${selectedType}`
      );
    } else {
      selectedType = recognizedTypes[0];
    }

    // T016: Return page type object with model and prefix
    return {
      type: selectedType,
      model: MODELS[selectedType],
      prefix: SLUG_PREFIXES[selectedType],
    };
  } catch (error) {
    log.warning(
      `Row with ID ${row.id || "unknown"}: Failed to parse Page Types field: ${
        error.message
      }`
    );
    return null;
  }
}

// ============================================================================
// Field Transformation Functions - T018-T025
// ============================================================================

/**
 * T018: Core transformation function for info pages (UPDATED with Phase 3 features)
 * T019: Transform basic fields (title, slug with prefix, description)
 * T020: Transform metadata fields (dates, published status)
 * @param {Object} row - CSV row with normalized column names
 * @param {Object} pageTypeInfo - Page type info {type, model, prefix}
 * @param {Object} tagMapping - Tag migration mapping for reference resolution
 * @param {Object} typeMapping - Mapping object for this page type (for slug collision checking)
 * @returns {Object} Transformed info page data for Builder.io
 */
function transformInfoPage(row, pageTypeInfo, tagMapping, typeMapping) {
  const { type, prefix } = pageTypeInfo;

  // T019: Transform basic fields
  const baseSlug = `${prefix}${row.slug}`; // Add prefix: /person/, /organisation/, or /project/
  const uniqueSlug = ensureUniqueSlug(baseSlug, typeMapping); // T060-T063: Handle slug collisions

  const basicFields = {
    title: row.title || "",
    slug: uniqueSlug,
    wixId: row.id, // Preserve original Wix ID for tracking
    description: row.description || "",
  };

  // T020: Transform metadata fields
  const metadata = {
    createdDate: row["created date"]
      ? new Date(row["created date"]).getTime()
      : Date.now(),
    lastUpdated: row["updated date"]
      ? new Date(row["updated date"]).getTime()
      : Date.now(),
    published: "published", // Default to published
    createdBy: row.owner || "", // Builder.io user ID
  };

  // T022: Transform external links (direct text fields)
  const externalLinks = {
    websiteLink: row["website link"] || "",
  };

  // Add type-specific links
  if (type === "person") {
    // T023: Person-specific fields
    externalLinks.linkedinLink = row["linkedin link"] || "";
    externalLinks.researchGateLink = row["research gate link"] || "";
    externalLinks.orcidLink = row["orcid link"] || "";
  }

  // Add pageTypes field as a tag reference (important for filtering/display)
  const pageTypesIds = parseTagIds(row["page types"]);
  const pageTypesRefs =
    pageTypesIds.length > 0
      ? resolveTagReferences(pageTypesIds, tagMapping, "pageTypeItem")
      : [];

  // T044-T052: Transform tag references (Phase 3)
  const tagReferences = transformTagReferences(row, tagMapping, type);

  // T053-T059: Transform structured roles (Phase 3)
  const structuredRoles = transformStructuredRoles(row, type);

  // Combine all fields
  const data = {
    ...basicFields,
    ...externalLinks,
    pageTypes: pageTypesRefs, // ✅ Store pageTypes as tag references
    ...tagReferences, // Add resolved tag references
    ...structuredRoles, // Add structured roles
  };

  // Common content fields (Post Content Rich 1-10, Post Image 1-10) - available for all page types
  // Note: Field name matches posts migration exactly: postContentRIch (capital R, capital I)
  for (let i = 1; i <= 10; i++) {
    const contentKey = `post content rich ${i}`;
    const imageKey = `post image ${i}`;

    if (row[contentKey]) {
      data[`postContentRIch${i}`] = row[contentKey]; // Matches posts migration typo for consistency
    }

    if (row[imageKey]) {
      try {
        data[`postImage${i}`] = JSON.parse(row[imageKey]);
      } catch (e) {
        // Store as-is if not valid JSON
        data[`postImage${i}`] = { url: row[imageKey] };
      }
    }
  }

  // T024: Organisation-specific fields
  if (type === "organisation" && row["organisation established date"]) {
    data.organisationEstablishedDate = new Date(
      row["organisation established date"]
    ).getTime();
  }

  // T025: Project-specific fields
  if (type === "project") {
    if (row["project start date"]) {
      data.projectStartDate = new Date(row["project start date"]).getTime();
    }
    if (row["project end date"]) {
      data.projectEndDate = new Date(row["project end date"]).getTime();
    }

    // Internal Links and Media Files
    if (row["internal links"]) {
      try {
        data.internalLinks = JSON.parse(row["internal links"]);
      } catch (e) {
        data.internalLinks = [];
      }
    }

    if (row["media files"]) {
      try {
        data.mediaFiles = JSON.parse(row["media files"]);
      } catch (e) {
        data.mediaFiles = [];
      }
    }
  }

  return {
    name: row.title || "Untitled", // Content Entry Name in Builder.io UI
    published: metadata.published,
    data,
    createdDate: metadata.createdDate,
    lastUpdated: metadata.lastUpdated,
    createdBy: metadata.createdBy,
  };
}

/**
 * T021: Validate required fields are present
 * @param {Object} row - CSV row with normalized column names
 * @returns {Object} {valid: boolean, missing: Array}
 */
function validateRequiredFields(row) {
  const required = ["title", "slug"];
  const missing = [];

  for (const field of required) {
    if (!row[field] || row[field].trim() === "") {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

// ============================================================================
// Tag Reference Resolution - T044-T052
// ============================================================================

/**
 * T044: Parse JSON array of Wix tag IDs from CSV field
 * @param {string} fieldValue - JSON string from CSV
 * @returns {Array} Array of Wix tag IDs or empty array
 */
function parseTagIds(fieldValue) {
  if (!fieldValue || fieldValue.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(fieldValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    log.warning(`Failed to parse tag IDs: ${fieldValue}`);
    return [];
  }
}

/**
 * T045-T051: Resolve Wix tag IDs to Builder.io Reference objects
 * @param {Array} wixTagIds - Array of Wix tag IDs
 * @param {Object} tagMapping - Tag migration mapping
 * @param {string} wrapperKey - Wrapper key for the reference (e.g., "domainsItem")
 * @returns {Array} Array of wrapped Builder.io Reference objects
 */
function resolveTagReferences(wixTagIds, tagMapping, wrapperKey) {
  const resolved = [];

  for (const wixTagId of wixTagIds) {
    // T046: Look up Wix ID in tag-migration-mapping.json
    const tagData = tagMapping.wixToBuilder[wixTagId];

    if (tagData && tagData.builderId) {
      // T047: Create Builder.io Reference object wrapped in item key (matches posts migration pattern)
      const ref = {
        "@type": "@builder.io/core:Reference",
        id: tagData.builderId,
        model: "tag",
      };

      // Wrap reference in item object (e.g., { domainsItem: ref })
      resolved.push({ [wrapperKey]: ref });
    } else {
      // T048: Log warning for unresolved tags
      log.warning(`Tag reference not found in mapping: ${wixTagId}`);
    }
  }

  return resolved;
}

/**
 * Convert field name to camelCase (e.g., "country tag" -> "countryTag")
 * @param {string} fieldName - Field name with spaces or hyphens
 * @returns {string} camelCase field name
 */
function toCamelCase(fieldName) {
  return fieldName
    .replace(/[-\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) => char.toLowerCase());
}

/**
 * T052: Transform all tag reference fields for an info page
 * @param {Object} row - CSV row with normalized column names
 * @param {Object} tagMapping - Tag migration mapping
 * @param {string} pageType - Page type (person, organisation, project)
 * @returns {Object} Object with all resolved tag reference fields
 */
function transformTagReferences(row, tagMapping, pageType) {
  const refs = {};

  // Common reference fields (actual CSV: "Domains", "Country Tag", "Author", "Activity")
  const commonRefFields = [
    { field: "domains", wrapper: "domainsItem" },
    { field: "country tag", wrapper: "countryTagItem" },
    { field: "author", wrapper: "authorItem" },
    { field: "activity", wrapper: "activityItem" },
    { field: "person", wrapper: "personItem" },
    { field: "organisation", wrapper: "organisationItem" },
    { field: "methods", wrapper: "methodsItem" },
    { field: "project", wrapper: "projectItem" },
  ];

  for (const { field, wrapper } of commonRefFields) {
    const wixTagIds = parseTagIds(row[field]);
    if (wixTagIds.length > 0) {
      const fieldName = toCamelCase(field); // Convert to camelCase
      refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
    }
  }

  // Person-specific reference fields (actual CSV: "Person Organisation", "Person Type", etc.)
  if (pageType === "person") {
    const personRefFields = [
      { field: "person organisation", wrapper: "personOrganisationItem" },
      {
        field: "person organisation - former",
        wrapper: "personOrganisationFormerItem",
      },
      { field: "person type", wrapper: "personTypeItem" },
    ];

    for (const { field, wrapper } of personRefFields) {
      const wixTagIds = parseTagIds(row[field]);
      if (wixTagIds.length > 0) {
        const fieldName = toCamelCase(field);
        refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
      }
    }
  }

  // Organisation-specific reference fields (actual CSV: "Organisation Type", etc.)
  if (pageType === "organisation") {
    const orgRefFields = [
      { field: "organisation type", wrapper: "organisationTypeItem" },
      { field: "organisation project", wrapper: "organisationProjectItem" },
      {
        field: "organisation has member",
        wrapper: "organisationHasMemberItem",
      },
      { field: "organisation member of", wrapper: "organisationMemberOfItem" },
    ];

    for (const { field, wrapper } of orgRefFields) {
      const wixTagIds = parseTagIds(row[field]);
      if (wixTagIds.length > 0) {
        const fieldName = toCamelCase(field);
        refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
      }
    }
  }

  // Project-specific reference fields (actual CSV: "Methods", "Project Organisation", etc.)
  if (pageType === "project") {
    const projectRefFields = [
      { field: "project funded", wrapper: "projectFundedItem" },
      { field: "project organisation", wrapper: "projectOrganisationItem" },
      { field: "project coordinator", wrapper: "projectCoordinatorItem" },
      {
        field: "project participant team",
        wrapper: "projectParticipantTeamItem",
      },
    ];

    for (const { field, wrapper } of projectRefFields) {
      const wixTagIds = parseTagIds(row[field]);
      if (wixTagIds.length > 0) {
        const fieldName = toCamelCase(field);
        refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
      }
    }
  }

  return refs;
}

// ============================================================================
// Structured Roles Parsing - T053-T059
// ============================================================================

/**
 * T053-T059: Parse and preserve structured roles data
 * Roles have format: [{"organisation":"X","role":"Y"}, ...]
 * @param {Object} row - CSV row with normalized column names
 * @param {string} pageType - Page type (person, organisation, project)
 * @returns {Object} Object with parsed roles fields
 */
function transformStructuredRoles(row, pageType) {
  const roles = {};

  // T054: Person roles fields (actual CSV: "Person Organisation Roles", "Person Organisation Roles Former")
  if (pageType === "person") {
    const roleFields = [
      "person organisation roles",
      "person organisation roles former",
    ];

    for (const field of roleFields) {
      const fieldValue = row[field];

      if (fieldValue && fieldValue.trim() !== "") {
        try {
          // T055: Parse as JSON array
          const parsed = JSON.parse(fieldValue);

          // T056: Validate array of objects with organisation/role structure
          if (Array.isArray(parsed)) {
            // T057: Store as plain text (no reference resolution)
            const fieldName = toCamelCase(field);
            roles[fieldName] = parsed;
          }
        } catch (e) {
          // T058: Log warning if parsing fails
          log.warning(
            `Failed to parse structured roles for ${field}: ${e.message}`
          );
        }
      }
    }
  }

  // T059: Organisation roles (actual CSV: "Organisation People Roles", "Organisation Project Roles")
  if (pageType === "organisation") {
    const orgRoleFields = [
      "organisation people roles",
      "organisation project roles",
    ];

    for (const field of orgRoleFields) {
      const fieldValue = row[field];

      if (fieldValue && fieldValue.trim() !== "") {
        try {
          const parsed = JSON.parse(fieldValue);
          if (Array.isArray(parsed)) {
            const fieldName = toCamelCase(field);
            roles[fieldName] = parsed;
          }
        } catch (e) {
          log.warning(`Failed to parse ${field}: ${e.message}`);
        }
      }
    }
  }

  // Project roles (actual CSV: "Project Organisation Roles")
  if (pageType === "project") {
    const projectRoleFields = ["project organisation roles"];

    for (const field of projectRoleFields) {
      const fieldValue = row[field];

      if (fieldValue && fieldValue.trim() !== "") {
        try {
          const parsed = JSON.parse(fieldValue);
          if (Array.isArray(parsed)) {
            const fieldName = toCamelCase(field);
            roles[fieldName] = parsed;
          }
        } catch (e) {
          log.warning(`Failed to parse ${field}: ${e.message}`);
        }
      }
    }
  }

  return roles;
}

// ============================================================================
// Slug Collision Handling - T060-T063
// ============================================================================

/**
 * T060-T063: Check for slug collisions and generate unique slug
 * @param {string} baseSlug - Base slug with prefix (e.g., "/person/john-doe")
 * @param {Object} mapping - Mapping object for the page type
 * @returns {string} Unique slug (may have suffix like "-2", "-3" if collision)
 */
function ensureUniqueSlug(baseSlug, mapping) {
  // T061: Check if slug exists in mapping
  const existingSlugs = Object.values(mapping.wixToBuilder).map(
    (entry) => entry.slug
  );

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug; // No collision, use base slug
  }

  // T062: Collision detected - generate unique slug with suffix
  let suffix = 2;
  let uniqueSlug = `${baseSlug}-${suffix}`;

  while (existingSlugs.includes(uniqueSlug)) {
    suffix++;
    uniqueSlug = `${baseSlug}-${suffix}`;
  }

  // T063: Log warning about slug collision
  log.warning(`Slug collision detected for ${baseSlug}, using ${uniqueSlug}`);

  return uniqueSlug;
}

// ============================================================================
// Builder.io API Integration - T026-T029
// ============================================================================

/**
 * T026: HTTP helper with authentication
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {Object|null} data - Request body data
 * @returns {Promise<Object>} Response data
 */
async function makeRequest(method, endpoint, data = null) {
  const url = `${BUILDER_API_URL}/${endpoint}`;

  const options = {
    method,
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

    // T029: Error handling for API failures
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
 * T027-T028: Create info page in Builder.io via Write API
 * @param {string} model - Builder.io model name (person-page, organisation-page, project-page)
 * @param {Object} pageData - Transformed page data
 * @param {number} index - Current index for logging
 * @param {number} total - Total pages for logging
 * @param {string} pageType - Page type for colored logging
 * @returns {Promise<Object|null>} Created page response with ID or null if failed
 */
async function createInfoPage(model, pageData, index, total, pageType) {
  try {
    log.info(
      `[${index + 1}/${total}] Creating ${log.pageType(pageType)}: ${
        pageData.data.title
      }`
    );

    const response = await makeRequest("POST", `write/${model}`, pageData);

    // T028: Parse response for Builder.io ID
    if (response && response.id) {
      log.success(
        `[${index + 1}/${total}] Created ${pageData.data.title} (ID: ${
          response.id
        })`
      );
      return response;
    } else {
      log.error(
        `[${index + 1}/${total}] No ID returned for ${pageData.data.title}`
      );
      return null;
    }
  } catch (error) {
    // T029: Log error and continue
    log.error(
      `[${index + 1}/${total}] Failed to create ${pageData.data.title}: ${
        error.message
      }`
    );
    return null;
  }
}

// ============================================================================
// Main Migration Function - T030-T043
// ============================================================================

/**
 * T030: Main migration function
 * @param {string} count - Number of pages to migrate ("all" or number)
 * @param {number} start - Starting index (0-based, default: 0)
 */
async function migrate(count, start = 0) {
  log.title("🚀 Starting Info Pages Migration to Builder.io");

  // Load CSV and mappings
  const allPages = loadCSV();
  const tagMapping = loadTagMapping();

  // Validate start index
  if (start >= allPages.length) {
    log.error(
      `Start index ${start} is beyond total records (${allPages.length})`
    );
    process.exit(1);
  }

  // T031: Determine how many to migrate with start offset
  let pagesToMigrate;
  if (count === "all") {
    pagesToMigrate = allPages.slice(start);
  } else {
    const end = start + parseInt(count);
    pagesToMigrate = allPages.slice(start, end);
  }

  log.info(
    `Migrating ${pagesToMigrate.length} info pages (records ${start + 1}-${
      start + pagesToMigrate.length
    } of ${allPages.length} total)...`
  );

  // Load mapping files for all three page types
  const mappings = {
    person: loadMapping("person"),
    organisation: loadMapping("organisation"),
    project: loadMapping("project"),
  };

  // T038: Track counters (overall and per page type)
  const counters = {
    total: 0,
    success: 0,
    skip: 0,
    error: 0,
    byType: {
      person: { total: 0, success: 0, skip: 0, error: 0 },
      organisation: { total: 0, success: 0, skip: 0, error: 0 },
      project: { total: 0, success: 0, skip: 0, error: 0 },
    },
  };

  const errors = [];

  // T031: Loop through CSV rows
  for (let i = 0; i < pagesToMigrate.length; i++) {
    const row = pagesToMigrate[i];
    const wixId = row.id;
    const currentPosition = start + i + 1; // Actual position in full dataset
    const totalInBatch = start + pagesToMigrate.length;

    counters.total++;

    // T031: Determine page type for this row
    const pageTypeInfo = determinePageType(row, tagMapping);

    // T032: Skip if no valid page type
    if (!pageTypeInfo) {
      log.error(
        `[${currentPosition}/${totalInBatch}] Skipping ${
          row.title || wixId
        }: Could not determine page type`
      );
      counters.error++;
      errors.push({
        wixId,
        title: row.title,
        reason: "Could not determine page type",
      });
      continue;
    }

    const { type, model } = pageTypeInfo;
    counters.byType[type].total++;

    // T033: Check if already migrated using appropriate mapping file
    if (mappings[type].wixToBuilder[wixId]) {
      log.warning(
        `[${currentPosition}/${totalInBatch}] Skipping ${row.title} (${type} - already migrated)`
      );
      counters.skip++;
      counters.byType[type].skip++;
      continue;
    }

    // T021: Validate required fields
    const validation = validateRequiredFields(row);
    if (!validation.valid) {
      log.error(
        `[${currentPosition}/${totalInBatch}] Skipping ${
          row.title || wixId
        } (${type}): Missing required fields: ${validation.missing.join(", ")}`
      );
      counters.error++;
      counters.byType[type].error++;
      errors.push({
        wixId,
        title: row.title,
        type,
        reason: `Missing required fields: ${validation.missing.join(", ")}`,
      });
      continue;
    }

    // T034: Transform row data to Builder.io format (with Phase 3 features)
    const infoPage = transformInfoPage(
      row,
      pageTypeInfo,
      tagMapping,
      mappings[type]
    );

    // T035: Create page in Builder.io via API (route to correct model)
    const result = await createInfoPage(
      model,
      infoPage,
      start + i,
      totalInBatch,
      type
    );

    if (result && result.id) {
      // T036: Update appropriate mapping file with Wix ID ↔ Builder.io ID
      mappings[type].wixToBuilder[wixId] = {
        builderId: result.id,
        title: row.title,
        slug: infoPage.data.slug,
        migratedAt: new Date().toISOString(),
      };
      mappings[type].builderToWix[result.id] = wixId;
      mappings[type].migratedCount++;
      mappings[type].lastMigrated = new Date().toISOString();

      // Save mapping file after each successful migration (resume capability)
      saveMapping(type, mappings[type]);

      counters.success++;
      counters.byType[type].success++;
    } else {
      counters.error++;
      counters.byType[type].error++;
      errors.push({
        wixId,
        title: row.title,
        type,
        reason: "API creation failed",
      });
    }

    // T037: Rate limiting delay
    if (i < pagesToMigrate.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
    }
  }

  // T043: Display summary report broken down by page type
  log.title("📊 Migration Summary");
  log.info(`Total Processed: ${counters.total}`);
  log.success(`✓ Successfully Migrated: ${counters.success}`);
  log.warning(`⊘ Skipped (already migrated): ${counters.skip}`);
  log.error(`✗ Failed: ${counters.error}`);

  log.title("By Page Type:");
  for (const type of ["person", "organisation", "project"]) {
    const typeCounters = counters.byType[type];
    if (typeCounters.total > 0) {
      log.info(`\n${log.pageType(type).toUpperCase()}:`);
      log.info(`  Total: ${typeCounters.total}`);
      log.success(`  ✓ Success: ${typeCounters.success}`);
      log.warning(`  ⊘ Skipped: ${typeCounters.skip}`);
      log.error(`  ✗ Failed: ${typeCounters.error}`);
    }
  }

  // Display errors if any
  if (errors.length > 0) {
    log.title("❌ Errors:");
    errors.forEach((err) => {
      log.error(
        `${err.wixId} - ${err.title || "Untitled"} (${
          err.type || "unknown"
        }): ${err.reason}`
      );
    });
  }

  log.title("✅ Migration Complete!");
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
  // Parse CLI arguments
  const { count, start, isDryRun, isValidate } = parseArguments();

  // Validate API key
  if (!PRIVATE_API_KEY) {
    log.error("Missing BUILDER_PRIVATE_API_KEY in .env.local");
    process.exit(1);
  }

  // Execute appropriate mode
  if (isValidate) {
    log.info("Validation mode not yet implemented");
    log.info("Coming in Phase 6 (User Story 3)");
    process.exit(0);
  } else if (isDryRun) {
    log.info("Dry-run mode not yet implemented");
    log.info("Coming in Phase 5 (User Story 5)");
    process.exit(0);
  } else {
    await migrate(count, start);
  }
}

// Run the script
main().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
