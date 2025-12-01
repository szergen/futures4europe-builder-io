#!/usr/bin/env node

/**
 * Show current migration configuration
 */

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  bright: "\x1b[1m",
};

// These should match the configuration in migrate-infopages.js
const MODELS = {
  person: "info-page",
  organisation: "info-page",
  project: "info-page",
};

const SINGLE_MAPPING_FILE = "./data/mappings/info-page-migration-mapping.json";
const MAPPING_FILES = {
  person: SINGLE_MAPPING_FILE,
  organisation: SINGLE_MAPPING_FILE,
  project: SINGLE_MAPPING_FILE,
};

const SLUG_PREFIXES = {
  person: "/person/",
  organisation: "/organisation/",
  project: "/project/",
};

console.log(
  `\n${colors.cyan}${colors.bright}Current Migration Configuration${colors.reset}\n`
);

console.log(`${colors.cyan}Builder.io Models:${colors.reset}`);
console.log(
  `  Person pages       → ${colors.green}${MODELS.person}${colors.reset}`
);
console.log(
  `  Organisation pages → ${colors.green}${MODELS.organisation}${colors.reset}`
);
console.log(
  `  Project pages      → ${colors.green}${MODELS.project}${colors.reset}`
);

const uniqueModels = [...new Set(Object.values(MODELS))];
if (uniqueModels.length === 1) {
  console.log(
    `\n  ${colors.yellow}ℹ Using single model for all page types${colors.reset}`
  );
} else {
  console.log(
    `\n  ${colors.yellow}ℹ Using separate models for each page type${colors.reset}`
  );
}

console.log(`\n${colors.cyan}Mapping Files:${colors.reset}`);
console.log(`  Person pages       → ${MAPPING_FILES.person}`);
console.log(`  Organisation pages → ${MAPPING_FILES.organisation}`);
console.log(`  Project pages      → ${MAPPING_FILES.project}`);

const uniqueMappings = [...new Set(Object.values(MAPPING_FILES))];
if (uniqueMappings.length === 1) {
  console.log(
    `\n  ${colors.yellow}ℹ Using single mapping file for all page types${colors.reset}`
  );
} else {
  console.log(
    `\n  ${colors.yellow}ℹ Using separate mapping files for each page type${colors.reset}`
  );
}

console.log(`\n${colors.cyan}Slug Prefixes:${colors.reset}`);
console.log(`  Person pages       → ${SLUG_PREFIXES.person}`);
console.log(`  Organisation pages → ${SLUG_PREFIXES.organisation}`);
console.log(`  Project pages      → ${SLUG_PREFIXES.project}`);

console.log(`\n${colors.green}Configuration Notes:${colors.reset}`);
console.log(
  `  - To change configuration, edit migrate-infopages.js (lines 57-75)`
);
console.log(`  - Ensure the model "${uniqueModels[0]}" exists in Builder.io`);
console.log(`  - Page types are still tracked internally (for reporting)\n`);
