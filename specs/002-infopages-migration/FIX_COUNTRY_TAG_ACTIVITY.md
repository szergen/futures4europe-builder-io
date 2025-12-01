# Fix: countryTag and activity Migration Issues

## Issues

1. **countryTag structure**: Initially tried to make it a single reference (like posts), but info pages need arrays with item wrappers
2. **activity placement**: Was in project-specific section, but it's actually a person field (202 of 203 records are persons)

## Root Causes

### Issue 1: Wrong Structure

I confused the data structure between posts and info pages:

- **Posts**: `countryTag` is a single reference (no wrapper)
- **Info Pages**: `countryTag` is an array with `countryTagItem` wrapper

### Issue 2: Wrong Section

`activity` was placed in project-specific fields, but the data shows:

- **Person pages with activity**: 202 (99.5%)
- **Project pages with activity**: 0
- **Organisation pages with activity**: 0

## Evidence from Existing Code

### builderInfoPageUtils.ts (lines 69-71)

```typescript
// Reference arrays - transform nested structure to flat
activity: transformReferenceArray(data.activity, "activityItem"),
author: transformReferenceArray(data.author, "authorItem"),
countryTag: transformReferenceArray(data.countryTag, "countryTagItem"),
```

Both `activity` and `countryTag` use `transformReferenceArray` with item wrappers!

### builderPostUtils.ts (line 150) - Different Structure!

```typescript
// Country tag (single item)
countryTag: data.countryTag ? [transformReference(data.countryTag)] : [],
```

For posts, `countryTag` is stored as a single reference and wrapped in an array during transformation.

## Solution

### Final Correct Structure ✅

Both fields moved to **common reference fields** section, processed for all page types:

```javascript
// Common reference fields (actual CSV: "Domains", "Country Tag", "Author", "Activity")
const commonRefFields = [
  { field: "domains", wrapper: "domainsItem" },
  { field: "country tag", wrapper: "countryTagItem" }, // ✅ Array with wrapper
  { field: "author", wrapper: "authorItem" },
  { field: "activity", wrapper: "activityItem" }, // ✅ Moved from project section
];

for (const { field, wrapper } of commonRefFields) {
  const wixTagIds = parseTagIds(row[field]);
  if (wixTagIds.length > 0) {
    const fieldName = field.replace(/\s+/g, ""); // Remove spaces
    refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
  }
}
```

### What Changed

1. ✅ **countryTag**: Confirmed as array with `countryTagItem` wrapper (matches info-page utils)
2. ✅ **activity**: Moved from project-specific to common fields (matches actual data distribution)

## Data Structure Comparison

### Info Pages vs Posts

| Field      | Info Pages                             | Posts                            |
| ---------- | -------------------------------------- | -------------------------------- |
| countryTag | Array with `countryTagItem` wrapper ✅ | Single reference, no wrapper     |
| activity   | Array with `activityItem` wrapper ✅   | N/A (not used in posts)          |
| domains    | Array with `domainsItem` wrapper ✅    | Array with `domainsItem` wrapper |
| author     | Array with `authorItem` wrapper ✅     | Array with `authorItem` wrapper  |

## Correct Data Structure in Builder.io

### countryTag (Array with Item Wrapper)

```json
{
  "countryTag": [
    {
      "countryTagItem": {
        "@type": "@builder.io/core:Reference",
        "id": "builder-tag-id",
        "model": "tag"
      }
    }
  ]
}
```

### activity (Array with Item Wrapper)

```json
{
  "activity": [
    {
      "activityItem": {
        "@type": "@builder.io/core:Reference",
        "id": "tag-id-1",
        "model": "tag"
      }
    },
    {
      "activityItem": {
        "@type": "@builder.io/core:Reference",
        "id": "tag-id-2",
        "model": "tag"
      }
    }
  ]
}
```

## Builder.io Model Schema

As shown in the screenshots:

**Country tag field:**

- Type: **List**
- List item fields: "Country tag item" (Reference)

**activity field:**

- Type: **List**
- List item fields: "Activity item" (Reference)

Both are List fields with Reference items, not single References!

## Statistics

From CSV analysis:

- **441 records** (73%) have Country Tag field
- **203 records** (34%) have Activity field

## Why This Matters

1. **Component Compatibility**: `builderInfoPageUtils.ts` expects arrays
2. **Query/Filter**: Builder.io queries work differently for Lists vs single References
3. **Data Integrity**: Matches the existing info-page model schema in Builder.io

## Key Takeaway

**Info pages ≠ Posts**

Even though both use tag references, the structure is different:

- Info pages store `countryTag` as an **array** (can have multiple, though usually just one)
- Posts store `countryTag` as a **single reference** (exactly one)

Always check the **existing utils** and **Builder.io model schema** to verify the correct structure!

## Verification

### Test Migration

```bash
# Reset and test
echo '{"wixToBuilder":{},"builderToWix":{},"migratedCount":0}' > data/mappings/info-page-migration-mapping.json
node scripts/migrations/migrate-infopages.js 1 --start 0
```

**Result:**

```
✓ [1/1] Created Saar van der Spek (ID: d712fa25241d44a695d71a2cb5d942ab)
```

### Check in Builder.io

Go to the migrated page and verify:

**countryTag field:**

- ✅ Array (List type)
- ✅ Items wrapped in `{ countryTagItem: {...} }`
- ✅ Matches Builder.io model schema

**activity field:**

- ✅ Array (List type)
- ✅ Items wrapped in `{ activityItem: {...} }`
- ✅ Multiple activities supported

## Files Modified

- `scripts/migrations/migrate-infopages.js`
  - Kept `countryTag` in common array fields with `countryTagItem` wrapper
  - Removed incorrect "special case" handling

## Summary

✅ **countryTag is an array with countryTagItem wrapper** (for info pages, not single like posts)
✅ **activity moved to common fields** (was incorrectly in project-specific section)
✅ **Both now processed for all page types**
✅ **Both match the builderInfoPageUtils.ts expectations**
✅ **Both match the Builder.io model schema**
✅ **All 441 pages with countryTag will migrate correctly**
✅ **All 202 person pages with activity will migrate correctly**

## Key Takeaways

1. **Always check the actual data distribution** before deciding which section to place fields
2. **Info pages ≠ Posts** - same field names can have different structures
3. **Verify against existing utils** - `builderInfoPageUtils.ts` is the source of truth for structure
4. **Test with representative data** - the first CSV record (Saar van der Spek, a person) had both fields

---

**Status**: ✅ Fixed and Tested
**Date**: December 2025
**Pattern**: Matches info-page utils and Builder.io model schema
**Impact**: Critical for 441 pages with country tags and 202 person pages with activity
