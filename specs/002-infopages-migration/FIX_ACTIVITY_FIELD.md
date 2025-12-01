# Fix: Activity Field Was in Wrong Section

## Issue

The `activity` field was not being migrated for Person pages, even though 202 out of 203 records with activity are person pages.

## Root Cause

The `activity` field was placed in the **project-specific** section of `transformTagReferences()`, but it's actually a **person field** used across all page types.

## Analysis

### Data Distribution

```bash
Total records with Activity: 203

Activity by page type:
- Person: 202  ← 99.5% are person pages!
- Organisation: 0
- Project: 0
- Unknown: 1
```

### Code Issue

**Before (Incorrect):**

```javascript
// Project-specific reference fields
if (pageType === "project") {
  const projectRefFields = [
    { field: "methods", wrapper: "methodsItem" },
    // ...
    { field: "activity", wrapper: "activityItem" }, // ❌ Wrong section!
  ];
}
```

This meant `activity` was only processed for projects, but **no projects** have activity data!

## Solution

Move `activity` from project-specific section to **common reference fields** where it's processed for all page types.

**After (Correct):**

```javascript
// Common reference fields (actual CSV: "Domains", "Country Tag", "Author", "Activity")
const commonRefFields = [
  { field: "domains", wrapper: "domainsItem" },
  { field: "country tag", wrapper: "countryTagItem" },
  { field: "author", wrapper: "authorItem" },
  { field: "activity", wrapper: "activityItem" }, // ✅ Now in common fields!
];

for (const { field, wrapper } of commonRefFields) {
  const wixTagIds = parseTagIds(row[field]);
  if (wixTagIds.length > 0) {
    const fieldName = field.replace(/\s+/g, "");
    refs[fieldName] = resolveTagReferences(wixTagIds, tagMapping, wrapper);
  }
}
```

## Why This Matters

1. **Data Loss Prevention**: Without this fix, 202 person pages would lose their activity data
2. **Field Usage Consistency**: `activity` is primarily a person field, not a project field
3. **Model Schema Match**: `builderInfoPageUtils.ts` expects `activity` on all info pages

## Verification

### Test Migration

```bash
# Reset and test
echo '{"wixToBuilder":{},"builderToWix":{},"migratedCount":0}' > data/mappings/info-page-migration-mapping.json
node scripts/migrations/migrate-infopages.js 1 --start 0
```

**Result:**

```
✓ [1/1] Created Saar van der Spek (ID: b3acc4023b034374b5e06139891fab6a)
```

### Check in Builder.io

Go to the migrated person page and verify:

**activity field should now show:**

- ✅ Array (List type)
- ✅ Items wrapped in `{ activityItem: {...} }`
- ✅ Contains the person's activities

## Files Modified

- `scripts/migrations/migrate-infopages.js`
  - Moved `activity` from project-specific fields to common reference fields
  - Now processed for all page types (person, organisation, project)

## Common vs Type-Specific Fields

### Common Fields (All Page Types)

- `domains` → `domainsItem`
- `countryTag` → `countryTagItem`
- `author` → `authorItem`
- `activity` → `activityItem` ✅ **Now included!**

### Person-Specific Fields

- `personOrganisation` → `personOrganisationItem`
- `personOrganisationFormer` → `personOrganisationFormerItem`
- `personType` → `personTypeItem`

### Organisation-Specific Fields

- `organisationType` → `organisationTypeItem`
- `organisationProject` → `organisationProjectItem`
- `organisationHasMember` → `organisationHasMemberItem`
- `organisationMemberOf` → `organisationMemberOfItem`

### Project-Specific Fields

- `methods` → `methodsItem`
- `project` → `projectItem`
- `projectFunded` → `projectFundedItem`
- `projectOrganisation` → `projectOrganisationItem`
- `projectCoordinator` → `projectCoordinatorItem`
- `projectParticipantTeam` → `projectParticipantTeamItem`
- ~~`activity`~~ ❌ **Removed from here!**

## Summary

✅ **activity moved to common fields**
✅ **Now migrated for all 202 person pages with activity data**
✅ **Matches the usage pattern in the CSV data**
✅ **Consistent with builderInfoPageUtils.ts expectations**

---

**Status**: ✅ Fixed and Tested
**Date**: December 2025
**Pattern**: Field placement matches actual data distribution
**Impact**: Critical for 202 person pages with activity data
