# Data Model: Builder.io Tags

**Feature**: Switch Tag Operations from Wix to Builder.io
**Date**: 2024-12-03
**Status**: Defined

## Overview

This document defines the data models, structures, and relationships for tag operations using Builder.io as the source of truth. It covers the Builder.io tag model, transformation formats, mapping file structure, and cache data structures.

## Core Entities

### 1. Builder.io Tag Model

**Model Name**: `tag`
**Model ID**: `a275c515afdb401b8b06f9fafe9bcbce`
**Kind**: `data`

**Schema**:

| Field         | Type      | Required | Description                              | Validation                                                                                                                                                               |
| ------------- | --------- | -------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | text      | No       | Display name of the tag                  | Non-empty string                                                                                                                                                         |
| `tagType`     | select    | No       | Category of tag                          | One of: page type, project result, post, event, project info, organisation info, person info, person, project, organisation, foresight method, domain, activity, country |
| `tagLine`     | text      | No       | Optional description/subtitle            | Max 500 characters                                                                                                                                                       |
| `picture`     | file      | No       | Optional image URL                       | Valid URL or Builder.io file reference                                                                                                                                   |
| `tagPageLink` | text      | No       | Optional URL to dedicated page           | Valid relative or absolute URL                                                                                                                                           |
| `masterTag`   | reference | No       | Parent/canonical tag reference           | Reference to tag model                                                                                                                                                   |
| `wixId`       | text      | No       | Original Wix ID for legacy compatibility | UUID format                                                                                                                                                              |

**Builder.io Metadata Fields** (automatic):

- `id`: Unique Builder.io identifier
- `createdDate`: Timestamp (ms) when created
- `lastUpdated`: Timestamp (ms) when last modified
- `published`: Publication status (`published` or `draft`)

**Indexes**:

- Primary: `id` (Builder.io managed)
- Lookup: `wixId` (for legacy translation)
- Filter: `tagType` (for category filtering)

**Relationships**:

- `masterTag` → `tag.id` (self-referential, optional)
- Referenced by: `info-page`, `post-page` (via list fields)

**Validation Rules**:

- `name` MUST be unique (case-insensitive)
- `tagType` MUST be from enum list
- `masterTag` MUST NOT create circular references
- `wixId` MUST be unique if provided

**Default Values**:

- `tagType`: "general" (if not specified)

### 2. Legacy Wix Format (Component Interface)

**Purpose**: Maintain backward compatibility with existing components

**TypeScript Interface**:

```typescript
interface WixTag {
  _id: string; // Builder.io ID
  name: string; // Display name
  tagType: string; // Category
  tagLine?: string; // Optional description
  picture?: string; // Optional image URL
  tagPageLink?: string; // Optional page URL
  masterTag?: string; // Builder.io ID of master tag
  wixId?: string; // Original Wix ID
  mentions?: number; // Runtime calculated popularity
  _createdDate?: {
    // Optional metadata
    $date: string;
  };
  _updatedDate?: {
    // Optional metadata
    $date: string;
  };
}
```

**Field Mapping**:
| Wix Format | Builder.io Format | Transformation |
|------------|-------------------|----------------|
| `_id` | `id` | Direct copy |
| `name` | `data.name` | Direct copy |
| `tagType` | `data.tagType` | Direct copy |
| `tagLine` | `data.tagLine` | Direct copy (optional) |
| `picture` | `data.picture` | Direct copy (optional) |
| `tagPageLink` | `data.tagPageLink` | Direct copy (optional) |
| `masterTag` | `data.masterTag.id` | Extract ID from reference |
| `wixId` | `data.wixId` | Direct copy (optional) |
| `mentions` | N/A | Calculated at runtime |
| `_createdDate` | `createdDate` | Convert timestamp to date object |
| `_updatedDate` | `lastUpdated` | Convert timestamp to date object |

### 3. Tag Migration Mapping

**File**: `data/mappings/tag-migration-mapping.json`
**Purpose**: Map Wix tag IDs to Builder.io tag IDs for legacy compatibility

**Structure**:

```typescript
interface TagMapping {
  wixId: string; // Original Wix UUID
  builderId: string; // New Builder.io ID
  name: string; // Tag name (for reference)
  tagType: string; // Tag category (for validation)
  migratedAt?: string; // ISO timestamp of migration
}

type TagMappingFile = TagMapping[];
```

**Example**:

```json
[
  {
    "wixId": "abc123-def456-ghi789",
    "builderId": "xyz789-uvw456-rst123",
    "name": "Artificial Intelligence",
    "tagType": "domain",
    "migratedAt": "2024-12-01T10:30:00Z"
  },
  {
    "wixId": "def456-ghi789-jkl012",
    "builderId": "uvw456-rst123-opq789",
    "name": "John Doe",
    "tagType": "person",
    "migratedAt": "2024-12-01T10:31:15Z"
  }
]
```

**Usage**:

- Load once at application startup
- Build in-memory Map: `wixId → builderId`
- Use for translating affiliation tag references
- Lookup complexity: O(1)

**Constraints**:

- `wixId` MUST be unique
- `builderId` MUST be unique
- `name` for human reference only (not used in lookups)
- File MUST be valid JSON array

### 4. Cache Data Structures

#### 4.1. Tags Cache

**Key**: `tags.json`
**TTL**: 4 hours (14,400,000 ms)
**Format**: Array of Builder.io tag objects

**Structure**:

```typescript
interface TagsCache {
  // Array of Builder.io responses
  data: Array<{
    id: string;
    data: {
      name: string;
      tagType: string;
      tagLine?: string;
      picture?: string;
      tagPageLink?: string;
      masterTag?: BuilderReference;
      wixId?: string;
    };
    createdDate: number;
    lastUpdated: number;
    published: string;
  }>;
}
```

**Invalidation Triggers**:

- New tag created
- Existing tag updated
- Manual cache refresh via API
- TTL expiration

#### 4.2. Tags with Popularity Cache

**Key**: `tags-with-popularity.json`
**TTL**: 4 hours (14,400,000 ms)
**Format**: Array of tags with calculated mention counts

**Structure**:

```typescript
interface TagWithPopularity extends WixTag {
  mentions: number; // Count of references across all pages
}

type TagsWithPopularityCache = TagWithPopularity[];
```

**Calculation Logic**:

1. Fetch all tags from Builder.io
2. Fetch all info pages from Builder.io (or cache)
3. Fetch all post pages from Builder.io (or cache)
4. Fetch affiliations from Wix
5. For each tag:
   - Count references in info pages (using Builder.io ID)
   - Count references in post pages (using Builder.io ID)
   - Count references in affiliations (using Wix ID → translate to Builder.io ID)
   - If tag has masterTag, also count masterTag references
6. Sort by mention count (descending)
7. Cache result

**Invalidation Triggers**:

- Tags cache invalidated
- Info pages updated
- Post pages updated
- Manual popularity recalculation

## Data Transformations

### Builder.io → Wix Format

**Function**: `transformBuilderTagToWixFormat()`
**Input**: Builder.io tag object
**Output**: Wix-compatible tag object

**Transformation Steps**:

1. Map `id` → `_id`
2. Flatten `data.*` fields to top level
3. Extract `masterTag.id` from reference object
4. Convert timestamps to date objects
5. Set `mentions` to `undefined` (calculated separately)

**Edge Cases**:

- Missing `masterTag`: Set to `undefined`
- Missing optional fields: Set to `undefined`
- Invalid Builder.io structure: Throw error with details

### Wix Format → Builder.io Format

**Function**: `transformWixTagToBuilderFormat()`
**Input**: Wix tag object (partial)
**Output**: Builder.io data payload

**Transformation Steps**:

1. Extract required fields (`name`, `tagType`)
2. Include optional fields if present
3. Convert `masterTag` string ID to Builder.io reference object
4. Exclude metadata fields (`_id`, `mentions`, timestamps)

**Edge Cases**:

- Missing required fields: Throw validation error
- Invalid `masterTag` ID: Log warning, omit from payload
- Extra fields: Ignore (don't send to Builder.io)

### Wix ID → Builder.io ID Translation

**Function**: `translateWixTagIdToBuilderId()`
**Input**: Wix tag UUID
**Output**: Builder.io tag ID or `undefined`

**Lookup Steps**:

1. Check in-memory mapping cache
2. Return Builder.io ID if found
3. Return `undefined` if not found (log warning)

**Usage**:

- Affiliation mention calculations
- Legacy URL redirects
- Gradual migration support

## State Transitions

### Tag Lifecycle

```
┌─────────────┐
│   Created   │
│ (Builder.io)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Published  │◄──────┐
└──────┬──────┘       │
       │              │
       ▼              │
┌─────────────┐       │
│   Updated   ├───────┘
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Deleted   │ (soft delete via unpublish)
└─────────────┘
```

**States**:

- **Created**: Tag exists in Builder.io, not yet published
- **Published**: Tag visible in application, cached
- **Updated**: Modified in Builder.io, cache invalidated
- **Deleted**: Unpublished in Builder.io, removed from cache

**Constraints**:

- Published tags cannot be hard deleted if referenced by pages
- Updated tags trigger cache invalidation
- Deleted tags remain in Builder.io for audit

## Validation Rules

### Tag Creation

**Required Checks**:

1. `name` non-empty
2. `tagType` valid enum value
3. `masterTag` ID exists (if provided)
4. No circular `masterTag` references
5. Unique `name` (case-insensitive)

**Response**:

- Success: Return created tag with Builder.io ID
- Failure: Return error with specific validation message

### Tag Updates

**Additional Checks**:

1. Tag ID exists
2. Not creating circular `masterTag` reference
3. `tagType` change doesn't break references

**Response**:

- Success: Return updated tag
- Failure: Return error with specific validation message

### Mention Calculation

**Data Integrity Checks**:

1. All tags have valid `id`
2. All pages are in Builder.io format
3. Affiliation Wix IDs translate to Builder.io IDs
4. No duplicate mentions counted

**Response**:

- Success: Return tags with mention counts
- Partial failure: Log missing references, continue

## Performance Considerations

**Query Optimization**:

- Fetch all tags in single Builder.io query (< 5000 tags expected)
- Use `noTargeting: true` for backend queries (faster)
- Omit unnecessary fields in queries (if available)

**Caching Strategy**:

- Cache all tags (high read, low write)
- Cache tags-with-popularity separately (expensive calculation)
- 4-hour TTL balances freshness vs. API calls

**Memory Usage**:

- Mapping file loaded once (~500KB expected)
- Tags cache ~1-2MB for 5000 tags
- In-memory Map for mapping lookup

**Scalability Limits**:

- Current approach works up to ~10,000 tags
- Beyond that, consider pagination and incremental caching
- Mention calculation may need optimization for large datasets

## Migration Notes

**Historical Data**:

- All Wix tags migrated to Builder.io (completed)
- Mapping file generated during migration
- `wixId` field populated for all migrated tags

**Backward Compatibility**:

- Legacy code uses `_id` (mapped from Builder.io `id`)
- Components use Wix format (transformation layer)
- Affiliation data uses Wix IDs (mapping translation)

**Future Cleanup** (Phase 4):

- Consider removing transformation layer
- Update components to use Builder.io format directly
- Remove mapping file after affiliation migration

## Summary

The data model maintains backward compatibility through transformation utilities while enabling Builder.io as the source of truth. Key structures:

1. Builder.io tag model (authoritative)
2. Wix format for component compatibility
3. Mapping file for legacy translation
4. Cache structures for performance

All entities validated, relationships defined, and transformations specified. Ready for implementation.
