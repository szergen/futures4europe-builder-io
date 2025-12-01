# Fix: Content Fields, Media Files, and Internal Links Now Common for All Page Types

## Issue

Several content-related fields were being processed only for **project** page types, but they should be available for **all page types** (person, organisation, and project):

- Post Content Rich (1-10)
- Post Image (1-10)
- Internal Links
- Media Files

## Root Cause

The content fields processing was inside the `if (type === "project")` block:

```javascript
// Before (Incorrect)
if (type === "project") {
  if (row["project start date"]) {
    data.projectStartDate = new Date(row["project start date"]).getTime();
  }
  if (row["project end date"]) {
    data.projectEndDate = new Date(row["project end date"]).getTime();
  }

  // Project content fields (Post Content Rich 1-10, Post Image 1-10)
  for (let i = 1; i <= 10; i++) {
    const contentKey = `post content rich ${i}`;
    const imageKey = `post image ${i}`;

    if (row[contentKey]) {
      data[`postContentRIch${i}`] = row[contentKey];
    }

    if (row[imageKey]) {
      try {
        data[`postImage${i}`] = JSON.parse(row[imageKey]);
      } catch (e) {
        data[`postImage${i}`] = { url: row[imageKey] };
      }
    }
  }

  // ... other project-specific fields
}
```

This meant:

- ❌ Person pages could not have Post Content Rich fields or Media Files
- ❌ Organisation pages could not have Post Content Rich fields or Media Files
- ✅ Project pages could have all these fields

But these should be **common fields** available to all page types!

## Data Evidence

From the CSV analysis:

- **187 pages** have Post Content Rich fields (all projects currently)
- **568 pages** have Media Files (**357 are person pages!**)
- **0 pages** have Internal Links (currently empty for all)

This confirms that `mediaFiles` is heavily used by person pages, not just projects!

## Solution

Moved all content-related fields **outside** of the project-specific block, making them available for all page types:

```javascript
// After (Correct)
const data = {
  ...basicFields,
  ...externalLinks,
  pageTypes: pageTypesRefs,
  ...tagReferences,
  ...structuredRoles,
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

// Common array fields (Internal Links, Media Files) - available for all page types
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

// Now type-specific fields follow...
if (type === "organisation" && row["organisation established date"]) {
  // ...
}

if (type === "project") {
  // Project-specific fields like dates only
  // Content fields, links, and media are now common!
}
```

## Fields Affected

### Common Fields (Now Available for All Page Types)

- `postContentRIch1` through `postContentRIch10`
- `postImage1` through `postImage10`

These are now processed **before** any type-specific fields, making them universally available.

### Also Common Fields (Added)

- `internalLinks` (JSON array, currently empty in all pages)
- `mediaFiles` (JSON array, **568 pages** have this - **357 person pages!**)

### Still Project-Specific (Correctly)

- `projectStartDate`
- `projectEndDate`

## Data Analysis

From the CSV:

- **187 pages** have Post Content Rich fields
- Currently all are project pages
- But person and organisation pages may also need these fields in the future

## Why This Matters

1. **Consistency**: Matches the posts migration pattern where content fields are common
2. **Flexibility**: Allows any info page type to have rich content
3. **Future-Proof**: Person/Organisation pages can have content without code changes
4. **Data Integrity**: No data loss if a person or organisation page has content fields

## Comparison with Posts Migration

In the posts migration (`migrate-posts.js`), content fields are naturally common because there's only one page type. For info pages, we have three types, but content should still be universally available.

**Posts Pattern:**

```javascript
// All posts have content fields
postContentRIch1: data.postContentRIch1 || "",
postContentRIch2: data.postContentRIch2 || "",
// etc.
```

**Info Pages Pattern (Now Fixed):**

```javascript
// All info pages (person/organisation/project) can have content fields
for (let i = 1; i <= 10; i++) {
  if (row[`post content rich ${i}`]) {
    data[`postContentRIch${i}`] = row[`post content rich ${i}`];
  }
}
```

## Files Modified

- `scripts/migrations/migrate-infopages.js`
  - Moved Post Content Rich 1-10 processing outside project block
  - Moved Post Image 1-10 processing outside project block
  - Moved Internal Links processing outside project block
  - Moved Media Files processing outside project block
  - All now processed immediately after data object creation
  - All available for all page types (person, organisation, project)

## Verification

The fields will now be migrated for:

- ✅ Person pages with content
- ✅ Organisation pages with content
- ✅ Project pages with content (as before, but now consistent)

## Summary

✅ **Post Content Rich 1-10 fields** - Now common for all page types  
✅ **Post Image 1-10 fields** - Now common for all page types  
✅ **Internal Links field** - Now common for all page types  
✅ **Media Files field** - Now common for all page types (568 pages use this!)  
✅ **Consistent with posts migration** - Content fields are universal  
✅ **Future-proof** - Any page type can have rich content and media  
✅ **No data loss** - All content fields will be migrated regardless of page type  
✅ **Especially critical for person pages** - 357 person pages have media files!

---

**Status**: ✅ Fixed and Ready
**Date**: December 2025
**Pattern**: Common content fields (matches posts migration philosophy)
**Impact**: All 604 info pages can now have Post Content Rich fields and Media Files
**Critical**: 357 person pages with media files will now migrate correctly!
