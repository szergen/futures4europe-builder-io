# Info Pages Migration Guide

## Overview

This guide documents the migration of info pages (Person, Organisation, and Project pages) from Wix to Builder.io. The migration script handles 604 pages across three distinct page types, routing each to its appropriate Builder.io model.

## Quick Start

### Prerequisites

1. Environment variables configured in `.env.local`:

   ```bash
   BUILDER_PRIVATE_API_KEY=your_private_api_key_here
   ```

2. Tag migration must be completed first:

   ```bash
   node scripts/migrations/migrate-tags.js all
   ```

3. Required files:
   - CSV export: `data/exports/Project_Organisation_Person+Info+Pages_wix.csv`
   - Tag mapping: `data/mappings/tag-migration-mapping.json`

### Basic Usage

```bash
# Migrate first 10 pages (recommended for testing)
node scripts/migrations/migrate-infopages.js 10

# Migrate all pages
node scripts/migrations/migrate-infopages.js all

# Migrate specific range: 10 pages starting from position 50 (records 50-59)
node scripts/migrations/migrate-infopages.js 10 --start 50

# Migrate in batches
node scripts/migrations/migrate-infopages.js 100 --start 0    # First 100
node scripts/migrations/migrate-infopages.js 100 --start 100  # Next 100

# Resume from specific position
node scripts/migrations/migrate-infopages.js all --start 250

# Preview migration without making API calls (coming soon)
node scripts/migrations/migrate-infopages.js 10 --dry-run

# Validate migrated data (coming soon)
node scripts/migrations/migrate-infopages.js 10 --validate
```

### The --start Flag

The `--start` flag allows you to migrate X number of pages starting from the Nth position (0-based index).

**Use Cases:**

- **Testing specific records**: Test with pages from the middle or end of the dataset
- **Batch processing**: Migrate in chunks for better control and monitoring
- **Resuming**: Continue from where a previous migration stopped
- **Parallel processing**: Run multiple migration processes simultaneously on different ranges

**Examples:**

```bash
# Records 50-59 (10 pages starting at position 50)
node scripts/migrations/migrate-infopages.js 10 --start 50

# Records 100-119 (20 pages starting at position 100)
node scripts/migrations/migrate-infopages.js 20 --start 100

# All remaining pages from position 500 to end (104 pages)
node scripts/migrations/migrate-infopages.js all --start 500
```

The script will show: `Migrating 10 info pages (records 51-60 of 604 total)...`

## Architecture

### Multi-Model Routing

The script routes pages to three distinct Builder.io models based on page type:

| Page Type    | Builder.io Model    | Slug Prefix      | Count |
| ------------ | ------------------- | ---------------- | ----- |
| Person       | `person-page`       | `/person/`       | 393   |
| Organisation | `organisation-page` | `/organisation/` | 79    |
| Project      | `project-page`      | `/project/`      | 132   |

### Page Type Determination

**Simplified Approach** (major improvement from initial plan):

1. Extract `Page Types` field from CSV (JSON array of Wix tag IDs)
2. Look up each Wix tag ID in `tag-migration-mapping.json` to get tag names
3. Simple string matching on tag name:
   - Contains "person" → person-page
   - Contains "organisation" or "organization" → organisation-page
   - Contains "project" → project-page
4. Priority fallback (Person > Organisation > Project) for rare mixed-type cases

**Example:**

```javascript
Page Types: ["ff988067-2fee-41f2-9b33-7eb14d282b17"]
→ Tag name: "person info"
→ Determined type: "person"
→ Routes to: person-page model with /person/ prefix
```

### Mapping Files

Three separate mapping files track migrations for each page type:

```
data/mappings/
├── person-migration-mapping.json
├── organisation-migration-mapping.json
└── project-migration-mapping.json
```

Each mapping file contains:

```json
{
  "wixToBuilder": {
    "wix-id": {
      "builderId": "builder-id",
      "title": "Page Title",
      "slug": "/person/page-slug",
      "migratedAt": "2025-12-01T12:00:00.000Z"
    }
  },
  "builderToWix": {
    "builder-id": "wix-id"
  },
  "migratedCount": 1,
  "lastMigrated": "2025-12-01T12:00:00.000Z"
}
```

## Field Transformations

### Common Fields (All Page Types)

| CSV Column     | Builder.io Field | Transformation                 |
| -------------- | ---------------- | ------------------------------ |
| `Title`        | `title`          | Direct copy                    |
| `slug`         | `slug`           | Add prefix + ensure uniqueness |
| `ID`           | `wixId`          | Preserved for tracking         |
| `Description`  | `description`    | Direct copy                    |
| `Created Date` | `createdDate`    | Convert to Unix timestamp (ms) |
| `Updated Date` | `lastUpdated`    | Convert to Unix timestamp (ms) |
| `Owner`        | `createdBy`      | Direct copy                    |
| `Website Link` | `websiteLink`    | Direct copy                    |
| `Domains`      | `domains`        | Resolve to tag References      |
| `Country Tag`  | `countrytag`     | Resolve to tag References      |

### Person-Specific Fields

| CSV Column                         | Builder.io Field                | Type        | Notes                        |
| ---------------------------------- | ------------------------------- | ----------- | ---------------------------- |
| `Linkedin Link`                    | `linkedinLink`                  | String      | External link                |
| `Research Gate Link`               | `researchGateLink`              | String      | External link                |
| `ORCID Link`                       | `orcidLink`                     | String      | External link                |
| `Person Organisation`              | `personorganisation`            | Reference[] | Tags only                    |
| `Person Organisation - Former`     | `personorganisationformer`      | Reference[] | Tags only                    |
| `Person Type`                      | `persontype`                    | Reference[] | Tags only                    |
| `Person Organisation Roles`        | `personorganisationroles`       | JSON        | Structured roles (see below) |
| `Person Organisation Roles Former` | `personorganisationrolesformer` | JSON        | Structured roles             |

### Organisation-Specific Fields

| CSV Column                      | Builder.io Field              | Type        | Notes            |
| ------------------------------- | ----------------------------- | ----------- | ---------------- |
| `Organisation Established Date` | `organisationEstablishedDate` | Timestamp   | Unix ms          |
| `Organisation Type`             | `organisationtype`            | Reference[] | Tags only        |
| `Organisation Project`          | `organisationproject`         | Reference[] | Tags only        |
| `Organisation Has Member`       | `organisationhasmember`       | Reference[] | Tags only        |
| `Organisation Member Of`        | `organisationmemberof`        | Reference[] | Tags only        |
| `Organisation People Roles`     | `organisationpeopleroles`     | JSON        | Structured roles |
| `Organisation Project Roles`    | `organisationprojectroles`    | JSON        | Structured roles |

### Project-Specific Fields

| CSV Column                   | Builder.io Field           | Type        | Notes                |
| ---------------------------- | -------------------------- | ----------- | -------------------- |
| `Project Start Date`         | `projectStartDate`         | Timestamp   | Unix ms              |
| `Project End Date`           | `projectEndDate`           | Timestamp   | Unix ms              |
| `Methods`                    | `methods`                  | Reference[] | Tags only            |
| `Project Organisation`       | `projectorganisation`      | Reference[] | Tags only            |
| `Project Coordinator`        | `projectcoordinator`       | Reference[] | Tags only            |
| `Project Participant Team`   | `projectparticipantteam`   | Reference[] | Tags only            |
| `Activity`                   | `activity`                 | Reference[] | Tags only            |
| `Post Content Rich 1-10`     | `postContentRich1-10`      | String      | Rich text content    |
| `Post Image 1-10`            | `postImage1-10`            | Object      | Image objects (JSON) |
| `Internal Links`             | `internalLinks`            | Array       | JSON array           |
| `Media Files`                | `mediaFiles`               | Array       | JSON array           |
| `Project Organisation Roles` | `projectorganisationroles` | JSON        | Structured roles     |

## Tag Reference Resolution

**Major Simplification**: All reference fields point exclusively to `tag` models.

### Reference Format

All resolved references use Builder.io's Reference format:

```json
{
  "@type": "@builder.io/core:Reference",
  "id": "builder-tag-id",
  "model": "tag"
}
```

### Resolution Process

1. Parse JSON array of Wix tag IDs from CSV field
2. Look up each Wix ID in `tag-migration-mapping.json`
3. Create Reference object using Builder.io tag ID
4. Log warning for any unresolved tags
5. Store array of Reference objects in Builder.io field

**Example:**

```javascript
CSV: Person Organisation = ["95224d24-...", "392e06b2-..."]

→ Lookup in tag-migration-mapping.json:
  "95224d24-...": { builderId: "abc123", name: "UEFISCDI" }
  "392e06b2-...": { builderId: "def456", name: "Meteo Romania" }

→ Builder.io field:
personorganisation: [
  { "@type": "@builder.io/core:Reference", "id": "abc123", "model": "tag" },
  { "@type": "@builder.io/core:Reference", "id": "def456", "model": "tag" }
]
```

### Fields with Tag References

**Person Pages:**

- `domains`, `countrytag`
- `personorganisation`, `personorganisationformer`
- `persontype`

**Organisation Pages:**

- `domains`, `countrytag`
- `organisationtype`, `organisationproject`
- `organisationhasmember`, `organisationmemberof`

**Project Pages:**

- `domains`, `countrytag`
- `methods`, `projectorganisation`
- `projectcoordinator`, `projectparticipantteam`
- `activity`

## Structured Roles

### Format

Structured roles are stored as JSON arrays of objects:

```json
[
  { "organisation": "UEFISCDI", "role": "Researcher" },
  { "organisation": "Meteo Romania", "role": "Consultant" },
  { "role": "Independent" }
]
```

### No Reference Resolution

Organisation/person/project names within structured roles are **stored as plain text** exactly as they appear in the CSV. This prevents unreliable fuzzy matching and preserves original data integrity.

### Fields with Structured Roles

**Person Pages:**

- `personorganisationroles` (10 records)
- `personorganisationrolesformer` (10 records)

**Organisation Pages:**

- `organisationpeopleroles` (7 records)
- `organisationprojectroles` (7 records)

**Project Pages:**

- `projectorganisationroles` (42 records)

## Special Features

### Case-Insensitive CSV Parsing

All CSV column names are normalized to lowercase for robust matching:

```javascript
"Person Organisation Roles" → "person organisation roles"
"ORCID Link" → "orcid link"
```

This handles variations in CSV export formatting.

### Slug Collision Handling

If a slug already exists in the mapping:

1. Append `-2`, `-3`, etc. to make it unique
2. Log a warning with original and new slug
3. Continue migration with unique slug

**Example:**

```
/person/john-doe → /person/john-doe-2 (collision detected)
```

### Resume Capability

- Mapping files are saved after each successful migration
- Script automatically skips already-migrated pages
- Can be interrupted and resumed at any time

### Rate Limiting

- 200ms delay between API calls (default)
- Prevents hitting Builder.io rate limits
- Configurable in script constants

## Migration Statistics

### Current Dataset

- **Total Records**: 604
- **Person Pages**: 393 (65%)
- **Organisation Pages**: 79 (13%)
- **Project Pages**: 132 (22%)

### Data Richness

| Feature          | Person     | Organisation | Project        |
| ---------------- | ---------- | ------------ | -------------- |
| Tag References   | 10 records | Low          | High           |
| Structured Roles | 20 records | 14 records   | 42 records     |
| External Links   | Variable   | Variable     | Low            |
| Rich Content     | N/A        | N/A          | 10 fields each |

## Error Handling

### Error Categories

1. **Skip with Warning**:

   - Missing Page Types field
   - Unrecognized page type
   - Missing required fields (title, slug)
   - Already migrated

2. **Log and Continue**:

   - Unresolved tag references
   - Structured roles parse errors
   - API creation failures
   - Image/JSON parse errors

3. **Fatal Errors**:
   - Missing API key
   - Missing tag mapping file
   - CSV file not found

### Error Logging

Errors are logged with:

- Wix ID for tracking
- Page title (if available)
- Page type
- Specific error reason
- Summary report at end

## Migration Summary Report

After migration, the script displays:

```
📊 Migration Summary

Total Processed: 604
✓ Successfully Migrated: 595
⊘ Skipped (already migrated): 5
✗ Failed: 4

By Page Type:

PERSON:
  Total: 393
  ✓ Success: 390
  ⊘ Skipped: 2
  ✗ Failed: 1

ORGANISATION:
  Total: 79
  ✓ Success: 78
  ⊘ Skipped: 1
  ✗ Failed: 0

PROJECT:
  Total: 132
  ✓ Success: 127
  ⊘ Skipped: 2
  ✗ Failed: 3

❌ Errors:
[Detailed list of failed records with reasons]
```

## Validation

### Manual Validation Checklist

After migration, verify:

- [ ] Correct number of pages migrated per type
- [ ] Slugs are unique and correctly prefixed
- [ ] Tag references resolve to existing tags
- [ ] Structured roles preserve original format
- [ ] External links are valid URLs
- [ ] Dates are correctly converted
- [ ] All three mapping files are updated

### Builder.io Console Checks

1. Navigate to each model (person-page, organisation-page, project-page)
2. Verify record count matches expected
3. Spot-check a few records:
   - All fields populated correctly
   - References point to tag model
   - Structured roles format is valid JSON
   - No missing or malformed data

## Troubleshooting

### Common Issues

**Issue**: "Tag mapping file not found"

- **Solution**: Run tag migration first: `node scripts/migrations/migrate-tags.js all`

**Issue**: "Missing BUILDER_PRIVATE_API_KEY"

- **Solution**: Add private API key to `.env.local` (not public key!)

**Issue**: High failure rate for specific page type

- **Solution**: Check CSV for data quality issues in that section

**Issue**: Slug collisions

- **Solution**: Review CSV for duplicate slugs, script auto-handles with suffixes

## Next Steps

### Coming Soon (Phase 4-7)

1. **Dry-Run Mode** (Phase 5)

   - Preview transformations without API calls
   - Validate data before migration
   - Output sample transformed data

2. **Validation Mode** (Phase 6)

   - Compare migrated data against CSV
   - Detect missing or mismatched fields
   - Generate validation report

3. **Batch Processing** (Phase 4)

   - Chunked migration for large datasets
   - Better progress tracking with ETA
   - Memory optimization

4. **Advanced Features** (Phase 7)
   - Retry failed migrations
   - Selective re-migration
   - Data cleanup utilities

## Implementation Details

### Script Location

```
scripts/migrations/migrate-infopages.js
```

### Key Functions

- `determinePageType()` - Routes pages to correct model
- `transformInfoPage()` - Main transformation function
- `transformTagReferences()` - Resolves tag references
- `transformStructuredRoles()` - Parses role data
- `ensureUniqueSlug()` - Handles slug collisions
- `createInfoPage()` - Builder.io Write API call

### Dependencies

- `dotenv` - Environment variables
- `node-fetch` - HTTP requests
- `csv-parse` - CSV parsing

## Support

For issues or questions:

1. Check CSV data quality first
2. Review mapping files for completeness
3. Check Builder.io console for API errors
4. Review error summary in migration output
5. Consult specification: `specs/002-infopages-migration/spec.md`

---

**Last Updated**: December 2025
**Script Version**: 1.0.0 (MVP - Phases 1-3 Complete)
**Status**: Ready for testing with small batches
