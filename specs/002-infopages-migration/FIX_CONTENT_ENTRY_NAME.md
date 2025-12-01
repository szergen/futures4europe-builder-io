# Fix: Content Entry Name Now Shows Title

## Issue

When viewing migrated info pages in Builder.io, the "Content Entry Name" (shown at the top of the page) was blank/empty instead of showing the page title.

**Before:**

```
Content Entry Name: [blank]
└─ Title field inside: "Saar van der Spek"
```

## Root Cause

The Builder.io Write API has two separate fields:

- `name` - The display name shown in the Builder.io UI content list
- `data.title` - The actual title field inside the content data

We were only setting `data.title` but not `name`.

## Solution

Updated `transformInfoPage()` function to include the `name` field at the top level:

```javascript
return {
  name: row.title || "Untitled", // Content Entry Name in Builder.io UI ✅
  data,
  ...metadata,
};
```

## Result

**After:**

```
Content Entry Name: "Saar van der Spek" ✅
└─ Title field inside: "Saar van der Spek" ✅
```

Both the UI display name and the data field now show the title.

## Verification

Test migration:

```bash
node scripts/migrations/migrate-infopages.js 1 --start 1
```

Then check in Builder.io:

1. Go to Content → info-page
2. The content entry should now show the title (e.g., "FORGING")
3. No more blank content entry names!

## Consistency

This now matches the pattern used in the posts migration:

```javascript
// migrate-posts.js
return {
  post: {
    name: basic.title, // ✓ Same pattern
    // ...
  },
};

// migrate-infopages.js (now)
return {
  name: row.title || "Untitled", // ✓ Same pattern
  // ...
};
```

---

**Status**: ✅ Fixed  
**Date**: December 2025  
**Applies To**: All future migrations (existing migrated pages keep their current state)
