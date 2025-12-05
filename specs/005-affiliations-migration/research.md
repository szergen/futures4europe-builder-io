# Research: Affiliations Migration

**Feature**: 005-affiliations-migration  
**Date**: 2024-12-04

## Summary

Research findings for migrating affiliations from Wix to Builder.io, following the established patterns from tags migration.

---

## 1. Builder.io Affiliations Model Schema

**Decision**: Use the existing Builder.io `affiliations` model (ID: `cda5281bf4f9491490eca792af06b25b`)

**Model Schema** (verified via Builder.io MCP):

| Field                  | Type                  | Required | Description                      |
| ---------------------- | --------------------- | -------- | -------------------------------- |
| `title`                | text                  | No       | Display name of affiliation      |
| `projectTag`           | reference (tag model) | No       | Project tag reference            |
| `organisationTag`      | reference (tag model) | No       | Organisation tag reference       |
| `extraOrganisationTag` | reference (tag model) | No       | Extra organisation tag reference |
| `personTag`            | reference (tag model) | No       | Person tag reference             |
| `role`                 | text                  | No       | Role description                 |
| `extraIdentifier`      | text                  | No       | Additional identifier            |

**Reference Target Model ID**: `a275c515afdb401b8b06f9fafe9bcbce` (tag model)

**Rationale**: Model already exists with correct field structure. No schema changes needed.

**Alternatives considered**:

- Creating new model: Rejected (model already exists)
- Adding wixId field: Not needed in schema (stored in data object)

---

## 2. Wix CSV Data Structure

**Decision**: Map CSV columns to Builder.io fields with transformation

**CSV Structure Analysis** (from `data/exports/Affiliations_wix.csv`):

| CSV Column             | Builder.io Field            | Transformation                |
| ---------------------- | --------------------------- | ----------------------------- |
| `Title`                | `name` + `data.title`       | Direct copy                   |
| `projectTag`           | `data.projectTag`           | Wix ID → Builder.io Reference |
| `organisationTag`      | `data.organisationTag`      | Wix ID → Builder.io Reference |
| `personTag`            | `data.personTag`            | Wix ID → Builder.io Reference |
| `extraOrganisationTag` | `data.extraOrganisationTag` | Wix ID → Builder.io Reference |
| `role`                 | `data.role`                 | Direct copy                   |
| `extraIdentifier`      | `data.extraIdentifier`      | Direct copy                   |
| `ID`                   | `data.wixId`                | Store for reference           |

**Data Quality Issues Found**:

1. Some `personTag` values contain malformed JSON: `{"id":"","name":"","arole":""}` (row 25 example)
2. Empty reference fields are common (not all affiliations have all 4 tag references)
3. Total records: ~1,826

**Rationale**: Direct field mapping with reference transformation matches existing migration patterns.

**Alternatives considered**:

- Separate migrations per reference type: Rejected (single pass more efficient)

---

## 3. Reference Transformation Pattern

**Decision**: Use Builder.io Reference format with tag mapping lookup

**Reference Format**:

```json
{
  "@type": "@builder.io/core:Reference",
  "id": "<builderId>",
  "model": "tag"
}
```

**Mapping Lookup**: Use `data/mappings/tag-migration-mapping.json`

**Structure of mapping file**:

```json
{
  "wixToBuilder": {
    "<wixTagId>": {
      "builderId": "<builderTagId>",
      "name": "Tag Name",
      "masterTagWixId": null
    }
  }
}
```

**Handling Missing Mappings**:

- Log warning with Wix ID
- Set reference field to undefined (not included in payload)
- Continue processing

**Rationale**: Follows `migrate-tags.js` pattern for masterTag references. Mapping file already complete from tags migration.

**Alternatives considered**:

- Fail migration on missing mapping: Rejected (would prevent partial migration)
- Use Wix IDs directly: Rejected (references must use Builder.io IDs)

---

## 4. Migration Script Pattern

**Decision**: Port `migrate-tags.js` pattern with enhancements for multiple references

**CLI Interface**:

```bash
# Migrate N affiliations
node scripts/migrations/migrate-affiliations.js <count>

# Migrate all affiliations
node scripts/migrations/migrate-affiliations.js all

# Verify migration (spot-check random records)
node scripts/migrations/migrate-affiliations.js --verify <count>
```

**Key Functions**:

1. `readCSV()` - Parse CSV with BOM handling
2. `loadTagMapping()` - Load Wix→Builder.io tag mapping
3. `transformAffiliationData()` - Transform CSV row to Builder.io payload
4. `createBuilderReference()` - Create reference object for tag
5. `createAffiliation()` - POST to Builder.io Write API
6. `loadMapping()` / `saveMapping()` - Incremental progress tracking
7. `printSummary()` - Summary report at completion
8. `verifyMigration()` - Spot-check random records

**Rationale**: Proven pattern from tags migration with additions for multi-reference handling and verification.

**Alternatives considered**:

- Batch API calls: Rejected (Builder.io Write API doesn't support batch)
- Direct SDK usage: Rejected (REST API more reliable for migrations)

---

## 5. API Endpoint Update Pattern

**Decision**: Follow `builderTagUtils.ts` pattern for affiliations

**New Utility File**: `app/utils/builderAffiliationUtils.ts`

**Key Functions**:

- `getAllBuilderAffiliations()` - Fetch all with pagination
- `transformBuilderAffiliationToWixFormat()` - Transform for backwards compatibility

**Response Format** (backwards compatible):

```typescript
// Wix format (current)
{
  data: {
    title: string;
    projectTag: string; // Wix ID
    organisationTag: string;
    personTag: string;
    extraOrganisationTag: string;
    role: string;
    extraIdentifier: string;
  }
}

// Builder.io format (transformed to match)
{
  data: {
    title: string;
    projectTag: string; // Builder.io ID (consumers don't need Wix ID)
    organisationTag: string;
    personTag: string;
    extraOrganisationTag: string;
    role: string;
    extraIdentifier: string;
  }
}
```

**Note**: After P2, affiliations will contain Builder.io tag IDs instead of Wix tag IDs. The tag popularity calculation will no longer need to translate Wix IDs since both affiliations and tags will use Builder.io IDs natively.

**Rationale**: Matches existing patterns, maintains API contract for consumers.

**Alternatives considered**:

- Return raw Builder.io format: Rejected (would break consumers)
- Keep Wix IDs in response: Rejected (creates dependency on Wix)

---

## 6. Cache Strategy

**Decision**: Maintain existing Redis cache pattern with Builder.io source

**Cache Key**: `affiliations.json` (unchanged)  
**TTL**: 4 hours (14,400,000 ms) (unchanged)

**Cache Update Flow**:

1. GET `/api/affiliations` checks cache first
2. On cache miss, fetch from Builder.io
3. Transform to Wix format
4. Save to cache
5. Return response

**POST `/api/affiliations`**:

1. Fetch fresh from Builder.io
2. Transform and save to cache
3. Return success

**Rationale**: Minimal change to caching infrastructure, just switching data source.

**Alternatives considered**:

- Separate cache key for Builder.io: Rejected (unnecessary complexity)
- Invalidate on migration: Not needed (fresh fetch on next request)

---

## 7. Tag Popularity Calculation Impact

**Decision**: Simplify calculation post-P2 (no Wix ID translation needed)

**Current Flow** (with Wix affiliations):

1. Fetch affiliations (Wix format with Wix tag IDs)
2. Translate Wix tag IDs → Builder.io IDs using mapping
3. Count references

**Post-P2 Flow** (with Builder.io affiliations):

1. Fetch affiliations (contains Builder.io tag IDs directly)
2. Count references (no translation needed)

**Code Impact**: Remove ID translation in `calculatePopularity()` when affiliations use Builder.io IDs.

**Rationale**: Cleaner code, better performance, removes mapping file dependency for popularity calculation.

**Alternatives considered**:

- Keep translation layer: Rejected (unnecessary after migration)

---

## Dependencies Verified

| Dependency                    | Status         | Notes                                             |
| ----------------------------- | -------------- | ------------------------------------------------- |
| Builder.io affiliations model | ✅ Exists      | ID: `cda5281bf4f9491490eca792af06b25b`            |
| Tag migration mapping         | ✅ Exists      | `data/mappings/tag-migration-mapping.json`        |
| Wix CSV export                | ✅ Exists      | `data/exports/Affiliations_wix.csv` (~1,826 rows) |
| Builder.io Write API          | ✅ Available   | Using BUILDER_PRIVATE_API_KEY                     |
| Redis cache                   | ✅ Operational | Upstash connection                                |
