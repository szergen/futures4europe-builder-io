# Fix Info Page Reference Fields Script

> Utility script to fix reference fields (like `pageOwner`) that were not properly mapped during the initial info-page migration from Wix to Builder.io.

## Problem

During the initial migration of info-pages (Person, Organisation, Project pages) from Wix to Builder.io, some reference fields were not properly mapped. Specifically, the `pageOwner` field contained Wix tag IDs instead of Builder.io Reference objects.

### What Went Wrong

The original migration script (`migrate-infopages.js`) had a `transformTagReferences` function that mapped common reference fields, but `pageOwner` was missing from the list:

```javascript
// Fields that WERE mapped:
const commonRefFields = [
  { field: "domains", wrapper: "domainsItem" },
  { field: "country tag", wrapper: "countryTagItem" },
  { field: "author", wrapper: "authorItem" },
  // ... etc
];

// Fields that were MISSING:
// - pageOwner
// - (pageTypes was handled separately)
```

## Solution

The `fix-infopage-references.js` script:

1. Reads the original Wix CSV export to get the original tag IDs
2. Uses the tag migration mapping to convert Wix IDs → Builder.io IDs
3. Fetches existing page data from Builder.io (preserving all fields)
4. Updates only the specified reference field with proper Builder.io Reference format

## Usage

```bash
# Navigate to project root
cd /path/to/futures4europe-builder-io

# Preview what would be fixed (recommended first)
node scripts/migrations/fix-infopage-references.js <count> --dry-run

# Fix pages
node scripts/migrations/fix-infopage-references.js <count> [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `count` | Number of pages to process. Use a number or `"all"` |
| `--start N` | Start from the Nth record (0-based index, default: 0) |
| `--field FIELD` | Field to fix (default: `pageOwner`) |
| `--dry-run` | Preview updates without making changes |
| `--verbose` | Show detailed logging |

### Examples

```bash
# Preview first 10 pages
node scripts/migrations/fix-infopage-references.js 10 --dry-run

# Fix all pages (pageOwner field)
node scripts/migrations/fix-infopage-references.js all

# Fix pages 50-99
node scripts/migrations/fix-infopage-references.js 50 --start 50

# Fix a different field
node scripts/migrations/fix-infopage-references.js all --field pageTypes

# Verbose mode for debugging
node scripts/migrations/fix-infopage-references.js 5 --dry-run --verbose
```

## Available Fields

The script can fix the following reference fields:

| Field | CSV Column | Builder.io Field | Wrapper Key |
|-------|-----------|------------------|-------------|
| `pageOwner` | `pageowner` | `pageOwner` | `pageOwnerItem` |
| `pageTypes` | `page types` | `pageTypes` | `pageTypeItem` |
| `author` | `author` | `author` | `authorItem` |

### Adding More Fields

To fix additional reference fields, add them to the `FIELD_CONFIG` object in the script:

```javascript
const FIELD_CONFIG = {
  // Existing fields...
  
  // Add new field:
  newField: {
    csvColumn: "csv column name",      // Column name in CSV (lowercase)
    builderField: "builderFieldName",  // Field name in Builder.io
    wrapperKey: "wrapperKeyItem",      // Wrapper key for reference
  },
};
```

## How It Works

### 1. Load Data Sources

```
┌─────────────────────────────────────────────────────────────────┐
│ CSV File                    │ Tag Mapping    │ Info-Page Mapping│
│ (Original Wix data)         │ (Wix→Builder)  │ (Wix→Builder)    │
│                             │                │                  │
│ pageOwner: ["wix-id-1",     │ wix-id-1 →     │ wix-page-id →    │
│             "wix-id-2"]     │   builder-id-1 │   builder-page-id│
└─────────────────────────────────────────────────────────────────┘
```

### 2. Resolve References

For each page:

```
Wix Tag ID: "1a0da9bf-8dcd-41f2-85f5-e51455e084f6"
                    ↓
         Tag Mapping Lookup
                    ↓
Builder.io Reference:
{
  "pageOwnerItem": {
    "@type": "@builder.io/core:Reference",
    "id": "99fc4abc63214b20b8c41542eac43a28",
    "model": "tag"
  }
}
```

### 3. Merge and Update

```
┌──────────────────────┐     ┌──────────────────────┐
│  Existing Page Data  │     │   New Field Value    │
│  (fetched from API)  │  +  │   (resolved refs)    │
└──────────────────────┘     └──────────────────────┘
            │                           │
            └───────────┬───────────────┘
                        ↓
              ┌─────────────────────┐
              │   Merged Data       │
              │   (PUT to API)      │
              └─────────────────────┘
```

## Required Files

| File | Purpose |
|------|---------|
| `data/exports/Project_Organisation_Person+Info+Pages_wix.csv` | Original Wix data export |
| `data/mappings/tag-migration-mapping.json` | Wix tag ID → Builder.io tag ID mapping |
| `data/mappings/info-page-migration-mapping.json` | Wix page ID → Builder.io page ID mapping |

## Environment Variables

The script requires these environment variables (from `.env.local`):

```env
NEXT_PUBLIC_BUILDER_API_KEY=your-public-api-key   # For reading content
BUILDER_PRIVATE_API_KEY=your-private-api-key      # For writing content
```

## Output

### Progress Display

```
Fix Info Page Reference Fields

ℹ Reading CSV file...
✓ Found 604 info pages in CSV
ℹ Loading tag mapping...
✓ Loaded 3077 tag mappings
ℹ Loading info-page mapping...
✓ Loaded 581 info-page mappings
ℹ Field to fix: pageOwner (CSV: "pageowner" → Builder: "pageOwner")
ℹ Processing records 0 to 603 (604 records)

[1/604] 0% - Saar van der Spek
[2/604] 0% - FORGING
[3/604] 0% - European Foresight Monitoring Network - EFMN
...
```

### Summary

```
Summary

  Total processed:    604
  Updated:            543
  No mapping:         23
  No value in CSV:    37
  Skipped:            1
  Errors:             0

⚠ 1 tag references could not be resolved:
  - 33fc8532-d490-4d9d-9218-e180632b31b3
```

### Summary Metrics Explained

| Metric | Description |
|--------|-------------|
| **Updated** | Successfully updated with correct references |
| **No mapping** | Page exists in CSV but not in Builder.io (not migrated) |
| **No value in CSV** | Field is empty in original CSV |
| **Skipped** | Could not resolve any valid references |
| **Errors** | API errors during update |

## Troubleshooting

### "BUILDER_PRIVATE_API_KEY not set"

Make sure `.env.local` contains:
```env
BUILDER_PRIVATE_API_KEY=bpk-xxxxx
```

### "NEXT_PUBLIC_BUILDER_API_KEY not set"

Make sure `.env.local` contains:
```env
NEXT_PUBLIC_BUILDER_API_KEY=xxxxx
```

### "Tag reference not found in mapping"

The Wix tag ID doesn't exist in `tag-migration-mapping.json`. This could mean:
- The tag was never migrated to Builder.io
- The tag was deleted in Wix before export

### "No Builder.io mapping found for Wix ID"

The page wasn't migrated to Builder.io. Check if it exists in `info-page-migration-mapping.json`.

### API Rate Limiting

The script has a built-in 200ms delay between API calls. If you encounter rate limiting, you can increase `RATE_LIMIT` in the script.

## Best Practices

1. **Always run `--dry-run` first** to preview changes
2. **Start with a small batch** (e.g., 10) to verify it works
3. **Use `--verbose`** when debugging issues
4. **Check the summary** for unresolved tags or errors
5. **Backup your Builder.io space** before running on `all`

## Related Scripts

- `scripts/migrations/migrate-infopages.js` - Original migration script
- `scripts/migrations/migrate-tags.js` - Tag migration script

## Changelog

### 2025-12-05
- Initial version created to fix `pageOwner` mapping issue
- Supports `pageOwner`, `pageTypes`, and `author` fields
- Uses CDN API for reading, Write API for updating
- Preserves existing page data during updates

