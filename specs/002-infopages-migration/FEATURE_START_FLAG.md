# Feature: --start Flag for Selective Migration

## Overview

Added a `--start` flag to the info pages migration script, allowing you to migrate X number of pages starting from the Nth position. This provides flexible control over which records to migrate.

## Implementation Date

December 2025

## Syntax

```bash
node scripts/migrations/migrate-infopages.js <count> [--start N]
```

- `count`: Number of pages to migrate (number or "all")
- `--start N`: Start from the Nth record (0-based index, default: 0)

## Examples

### Basic Usage

```bash
# Migrate 10 pages starting from position 50 (records 50-59)
node scripts/migrations/migrate-infopages.js 10 --start 50

# Output:
# Migrating 10 info pages (records 51-60 of 604 total)...
# [51/60] Creating person: John Doe
# [52/60] Creating project: Project X
# ...
```

### Real-World Use Cases

#### 1. Testing Specific Records

```bash
# Test with records from the middle of the dataset
node scripts/migrations/migrate-infopages.js 5 --start 100

# Test near the end
node scripts/migrations/migrate-infopages.js 5 --start 600
```

#### 2. Batch Processing

```bash
# Migrate in chunks of 100 for better control
node scripts/migrations/migrate-infopages.js 100 --start 0    # Batch 1: records 0-99
node scripts/migrations/migrate-infopages.js 100 --start 100  # Batch 2: records 100-199
node scripts/migrations/migrate-infopages.js 100 --start 200  # Batch 3: records 200-299
# ... continue until done
```

#### 3. Resuming After Interruption

```bash
# If migration stopped at record 250, resume from there
node scripts/migrations/migrate-infopages.js all --start 250

# Output:
# Migrating 354 info pages (records 251-604 of 604 total)...
```

#### 4. Parallel Processing (Advanced)

Run multiple instances simultaneously on different ranges:

```bash
# Terminal 1
node scripts/migrations/migrate-infopages.js 200 --start 0

# Terminal 2 (simultaneously)
node scripts/migrations/migrate-infopages.js 200 --start 200

# Terminal 3 (simultaneously)
node scripts/migrations/migrate-infopages.js 204 --start 400
```

**⚠️ Caution**: Ensure ranges don't overlap to avoid duplicate migrations!

## Technical Details

### Changes Made

**1. Updated `parseArguments()` Function**

- Parses `--start` flag from command line arguments
- Validates that start value is a non-negative integer
- Returns `start` in addition to existing parameters

**2. Updated `migrate()` Function**

- Accepts `start` parameter (default: 0)
- Validates start index is within bounds
- Slices array with proper start/end positions:
  - For specific count: `allPages.slice(start, start + count)`
  - For "all": `allPages.slice(start)`

**3. Updated Progress Logging**

- Shows actual position: `[51/60]` instead of `[1/10]`
- Shows range in initial message: `records 51-60 of 604 total`
- Calculates: `currentPosition = start + i + 1` (1-based display)

**4. Updated Documentation**

- Help text includes `--start N` usage
- Examples demonstrate common use cases
- QUICK_START.md and INFO_PAGES_MIGRATION_GUIDE.md updated

### Code Snippet

```javascript
// Determine pages to migrate with start offset
let pagesToMigrate;
if (count === "all") {
  pagesToMigrate = allPages.slice(start);
} else {
  const end = start + parseInt(count);
  pagesToMigrate = allPages.slice(start, end);
}

// Loop with correct position tracking
for (let i = 0; i < pagesToMigrate.length; i++) {
  const currentPosition = start + i + 1; // Actual position in full dataset
  const totalInBatch = start + pagesToMigrate.length;

  log.info(`[${currentPosition}/${totalInBatch}] Creating...`);
  // ...
}
```

## Testing

### Test Scenarios

**Scenario 1: Default Behavior (no --start)**

```bash
node scripts/migrations/migrate-infopages.js 5
# Migrates records 1-5
```

**Scenario 2: Mid-Range**

```bash
node scripts/migrations/migrate-infopages.js 10 --start 50
# Migrates records 51-60
```

**Scenario 3: Near End**

```bash
node scripts/migrations/migrate-infopages.js 5 --start 600
# Migrates records 601-604 (only 4 available)
```

**Scenario 4: All from Offset**

```bash
node scripts/migrations/migrate-infopages.js all --start 500
# Migrates records 501-604 (104 pages)
```

### Validation

✅ **Tested and Verified:**

- Correct range selection for all scenarios
- Proper position display in progress logs
- Boundary handling (start beyond total, requesting more than available)
- "all" keyword works with start offset
- Error handling for invalid start values (negative, non-numeric)

## Error Handling

### Invalid Start Value

```bash
node scripts/migrations/migrate-infopages.js 10 --start -5
# Error: Invalid --start value: -5
# --start must be a non-negative number

node scripts/migrations/migrate-infopages.js 10 --start abc
# Error: Invalid --start value: abc
# --start must be a non-negative number
```

### Start Beyond Total Records

```bash
node scripts/migrations/migrate-infopages.js 10 --start 700
# Error: Start index 700 is beyond total records (604)
```

## Benefits

1. **Flexible Testing**: Test with any subset of data without modifying the script
2. **Better Control**: Migrate in manageable chunks instead of all-or-nothing
3. **Resume Capability**: Easily continue from where you left off
4. **Parallel Processing**: Multiple team members can migrate different ranges simultaneously
5. **Debugging**: Isolate and test specific problematic records

## Limitations

- **0-Based Indexing**: Start uses 0-based index (like arrays), though display is 1-based
- **No Validation**: Script doesn't prevent overlapping ranges in parallel runs
- **Mapping Files**: All page types share offset (can't start at different positions per type)

## Future Enhancements

Potential improvements for future versions:

1. **Named Ranges**: `--type person --start 0 --count 100`
2. **Retry Failed**: `--retry-failed` to only process pages that failed in previous run
3. **Range Validation**: Prevent overlapping ranges in parallel runs
4. **Progress State File**: Save progress state for automatic resume

## Backward Compatibility

✅ **Fully Backward Compatible**

- Existing usage without `--start` works exactly as before
- Default start value is 0 (beginning of dataset)
- All existing features remain unchanged

```bash
# These all work as before:
node scripts/migrations/migrate-infopages.js 10
node scripts/migrations/migrate-infopages.js all
node scripts/migrations/migrate-infopages.js 10 --dry-run
```

## Documentation Updated

- ✅ `scripts/migrations/migrate-infopages.js` - Help text
- ✅ `specs/002-infopages-migration/QUICK_START.md` - Examples and use cases
- ✅ `docs/migration/infopages/INFO_PAGES_MIGRATION_GUIDE.md` - Detailed usage
- ✅ `specs/002-infopages-migration/FEATURE_START_FLAG.md` - This document

## Summary

The `--start` flag is a powerful addition that provides fine-grained control over the migration process. It enables:

- Selective testing of specific data ranges
- Batch processing for large datasets
- Easy resumption after interruptions
- Parallel processing capabilities

The feature is fully tested, backward compatible, and ready for production use.

---

**Status**: ✅ Complete and Tested
**Backward Compatible**: Yes
**Breaking Changes**: None
**Version**: 1.1.0 (added to MVP 1.0.0)
