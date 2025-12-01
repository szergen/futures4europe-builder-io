#!/usr/bin/env node

/**
 * Test script to verify single mapping file shared object behavior
 */

const fs = require("fs");

// Simulate the configuration
const SINGLE_MAPPING_FILE =
  "./data/mappings/info-page-migration-mapping-test.json";
const MAPPING_FILES = {
  person: SINGLE_MAPPING_FILE,
  organisation: SINGLE_MAPPING_FILE,
  project: SINGLE_MAPPING_FILE,
};

function loadMapping(pageType) {
  const mappingFile = MAPPING_FILES[pageType];
  if (fs.existsSync(mappingFile)) {
    const data = fs.readFileSync(mappingFile, "utf8");
    return JSON.parse(data);
  }
  return {
    wixToBuilder: {},
    builderToWix: {},
    migratedCount: 0,
    lastMigrated: null,
  };
}

function saveMapping(pageType, mapping) {
  const mappingFile = MAPPING_FILES[pageType];
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
}

// Clean start
if (fs.existsSync(SINGLE_MAPPING_FILE)) {
  fs.unlinkSync(SINGLE_MAPPING_FILE);
}

console.log("Testing mapping file behavior...\n");

// OLD BEHAVIOR (buggy - loads separately)
console.log("=== OLD BEHAVIOR (separate objects) ===");
const oldMappings = {
  person: loadMapping("person"),
  organisation: loadMapping("organisation"),
  project: loadMapping("project"),
};

console.log(
  "Are they the same object?",
  oldMappings.person === oldMappings.organisation
);

// Simulate migrations
oldMappings.person.wixToBuilder["person-1"] = { builderId: "builder-person-1" };
oldMappings.person.migratedCount = 1;
saveMapping("person", oldMappings.person);
console.log(
  "After person migration:",
  Object.keys(
    JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).wixToBuilder
  )
);

oldMappings.organisation.wixToBuilder["org-1"] = { builderId: "builder-org-1" };
oldMappings.organisation.migratedCount = 1;
saveMapping("organisation", oldMappings.organisation);
console.log(
  "After org migration (OVERWRITES!):",
  Object.keys(
    JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).wixToBuilder
  )
);

// Clean for new test
fs.unlinkSync(SINGLE_MAPPING_FILE);

// NEW BEHAVIOR (fixed - shared object)
console.log("\n=== NEW BEHAVIOR (shared object) ===");
const usingSingleFile =
  MAPPING_FILES.person === MAPPING_FILES.organisation &&
  MAPPING_FILES.organisation === MAPPING_FILES.project;

let newMappings;
if (usingSingleFile) {
  const sharedMapping = loadMapping("person");
  newMappings = {
    person: sharedMapping,
    organisation: sharedMapping,
    project: sharedMapping,
  };
} else {
  newMappings = {
    person: loadMapping("person"),
    organisation: loadMapping("organisation"),
    project: loadMapping("project"),
  };
}

console.log(
  "Are they the same object?",
  newMappings.person === newMappings.organisation
);

// Simulate migrations
newMappings.person.wixToBuilder["person-1"] = { builderId: "builder-person-1" };
newMappings.person.migratedCount = 1;
saveMapping("person", newMappings.person);
console.log(
  "After person migration:",
  Object.keys(
    JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).wixToBuilder
  )
);

newMappings.organisation.wixToBuilder["org-1"] = { builderId: "builder-org-1" };
newMappings.organisation.migratedCount = 2;
saveMapping("organisation", newMappings.organisation);
console.log(
  "After org migration (PRESERVES!):",
  Object.keys(
    JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).wixToBuilder
  )
);

newMappings.project.wixToBuilder["project-1"] = {
  builderId: "builder-project-1",
};
newMappings.project.migratedCount = 3;
saveMapping("project", newMappings.project);
console.log(
  "After project migration (ALL PRESERVED!):",
  Object.keys(
    JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).wixToBuilder
  )
);

console.log(
  "\nFinal count:",
  JSON.parse(fs.readFileSync(SINGLE_MAPPING_FILE, "utf8")).migratedCount
);

// Cleanup
fs.unlinkSync(SINGLE_MAPPING_FILE);
console.log("\n✅ Test complete! Shared object prevents overwrites.");
