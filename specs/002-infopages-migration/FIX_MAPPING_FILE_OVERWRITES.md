# Fix: Mapping File Overwrites When Using Single File

## Issue

When using a single mapping file for all page types (`info-page-migration-mapping.json`), the script was overwriting previous migrations because it loaded the file three times into separate objects.

### Symptoms

- First person page migrates ✅
- Second person page migrates ✅
- First project page migrates, but overwrites person pages ❌
- Mapping file only contains the most recent entries, losing previous ones

## Root Cause

The script loaded the mapping file three times into separate objects:

```javascript
// Before (Buggy)
const mappings = {
  person: loadMapping("person"), // Loads file into separate object
  organisation: loadMapping("organisation"), // Loads same file into separate object
  project: loadMapping("project"), // Loads same file into separate object
};
```

When all three point to `info-page-migration-mapping.json`:

1. All three load the same file content
2. But into **separate JavaScript objects**
3. When person page migrates, updates `mappings.person`, saves to file ✅
4. When project page migrates, updates `mappings.project` (still has old data!), saves to file ❌ **Overwrites!**

### Example of the Bug

```
1. Load: person={}, organisation={}, project={}  (all separate objects)
2. Migrate person-1: person={person-1}, save → file has {person-1}
3. Migrate person-2: person={person-1, person-2}, save → file has {person-1, person-2}
4. Migrate project-1: project={project-1}, save → file has {project-1} ❌ Lost persons!
```

## Solution

Detect when using a single file and share the same mapping object across all three types:

```javascript
// After (Fixed)
const usingSingleFile =
  MAPPING_FILES.person === MAPPING_FILES.organisation &&
  MAPPING_FILES.organisation === MAPPING_FILES.project;

let mappings;
if (usingSingleFile) {
  // Use single shared mapping object to prevent overwrites
  const sharedMapping = loadMapping("person");
  mappings = {
    person: sharedMapping, // Same object reference
    organisation: sharedMapping, // Same object reference
    project: sharedMapping, // Same object reference
  };
} else {
  // Load separate mapping objects for each type
  mappings = {
    person: loadMapping("person"),
    organisation: loadMapping("organisation"),
    project: loadMapping("project"),
  };
}
```

### How This Fixes It

Now all three types reference the **same object**:

```
1. Load: sharedMapping={}
   person → sharedMapping, organisation → sharedMapping, project → sharedMapping
2. Migrate person-1: sharedMapping={person-1}, save → file has {person-1}
3. Migrate person-2: sharedMapping={person-1, person-2}, save → file has {person-1, person-2}
4. Migrate project-1: sharedMapping={person-1, person-2, project-1}, save → file has all! ✅
```

## Test Results

Created test script that demonstrates the fix:

```
=== OLD BEHAVIOR (separate objects) ===
Are they the same object? false
After person migration: [ 'person-1' ]
After org migration (OVERWRITES!): [ 'org-1' ]

=== NEW BEHAVIOR (shared object) ===
Are they the same object? true
After person migration: [ 'person-1' ]
After org migration (PRESERVES!): [ 'person-1', 'org-1' ]
After project migration (ALL PRESERVED!): [ 'person-1', 'org-1', 'project-1' ]
```

## Configuration Support

The fix automatically detects the configuration:

### Single File Mode (Default)

```javascript
const SINGLE_MAPPING_FILE = "./data/mappings/info-page-migration-mapping.json";
const MAPPING_FILES = {
  person: SINGLE_MAPPING_FILE,
  organisation: SINGLE_MAPPING_FILE,
  project: SINGLE_MAPPING_FILE,
};
```

→ Uses shared mapping object ✅

### Separate Files Mode

```javascript
const MAPPING_FILES = {
  person: "./data/mappings/person-migration-mapping.json",
  organisation: "./data/mappings/organisation-migration-mapping.json",
  project: "./data/mappings/project-migration-mapping.json",
};
```

→ Uses separate mapping objects (as intended) ✅

Both configurations now work correctly!

## Files Modified

- `scripts/migrations/migrate-infopages.js`
  - Added detection for single vs. separate mapping files
  - Uses shared object reference when single file detected
  - Maintains separate objects when using separate files

## Why This Matters

1. **Data Integrity**: No more losing migrated entries
2. **Resume Capability**: Can restart migration without re-migrating everything
3. **Duplicate Prevention**: Mapping file accurately tracks what's migrated
4. **Progress Tracking**: Correct count of migrated pages

## Verification

To verify the fix works:

```bash
# Clear mapping
echo '{"wixToBuilder":{},"builderToWix":{},"migratedCount":0}' > data/mappings/info-page-migration-mapping.json

# Migrate a mix of page types
node scripts/migrations/migrate-infopages.js 10 --start 0

# Check mapping file - should have all 10 entries
cat data/mappings/info-page-migration-mapping.json | grep migratedCount
```

Expected: `"migratedCount": 10` ✅

## Summary

✅ **Detects single file configuration automatically**  
✅ **Uses shared object to prevent overwrites**  
✅ **Maintains compatibility with separate files mode**  
✅ **All migrated entries are preserved**  
✅ **No data loss during migration**

---

**Status**: ✅ Fixed and Tested
**Date**: December 2025
**Priority**: Critical - Data Integrity Issue
**Impact**: Prevents loss of migration tracking data
