# Contract: Tag Transformation Utilities

**Feature**: Switch Tag Operations from Wix to Builder.io
**Date**: 2024-12-03
**Version**: 1.0.0

## Overview

This document defines the contracts for transformation utilities that convert between Builder.io tag format and legacy Wix format. These utilities maintain backward compatibility with existing components during the migration.

## Module: `app/utils/builderTagUtils.ts`

### Purpose

Provide centralized utilities for:

1. Fetching tags from Builder.io
2. Transforming Builder.io tags to Wix format
3. Transforming Wix tags to Builder.io format
4. Translating Wix tag IDs to Builder.io IDs
5. Creating and updating tags in Builder.io

### Dependencies

```typescript
import { builder } from "@builder.io/sdk";
import tagMapping from "@/data/mappings/tag-migration-mapping.json";
```

## Type Definitions

### Builder.io Tag Format

```typescript
interface BuilderReference {
  "@type": "@builder.io/core:Reference";
  id: string;
  model: string;
  value?: any; // Expanded reference (if includeRefs: true)
}

interface BuilderTag {
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
}
```

### Wix Tag Format

```typescript
interface WixTag {
  _id: string;
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string; // Just the ID, not full reference
  wixId?: string;
  mentions?: number;
  _createdDate?: {
    $date: string;
  };
  _updatedDate?: {
    $date: string;
  };
}
```

### Tag Mapping Entry

```typescript
interface TagMappingEntry {
  wixId: string;
  builderId: string;
  name: string;
  tagType: string;
  migratedAt?: string;
}
```

## Function Contracts

### 1. getAllBuilderTags()

Fetch all tags from Builder.io with caching.

**Signature**:

```typescript
async function getAllBuilderTags(options?: {
  includeRefs?: boolean;
  skipCache?: boolean;
}): Promise<BuilderTag[]>;
```

**Parameters**:

- `options.includeRefs`: Expand masterTag references (default: false)
- `options.skipCache`: Bypass Redis cache (default: false)

**Returns**: Array of Builder.io tag objects

**Behavior**:

1. Check Redis cache if `skipCache` is false
2. On cache miss, fetch from Builder.io
3. Apply retry logic (3 attempts, exponential backoff)
4. Cache result with 4-hour TTL
5. Return tags

**Error Handling**:

- Throws `BuilderApiError` on Builder.io failures
- Logs errors and returns empty array on total failure

**Example**:

```typescript
const tags = await getAllBuilderTags({ includeRefs: false });
// Returns: BuilderTag[]
```

---

### 2. getBuilderTagById()

Fetch a single tag by Builder.io ID.

**Signature**:

```typescript
async function getBuilderTagById(
  id: string,
  options?: { includeRefs?: boolean }
): Promise<BuilderTag | null>;
```

**Parameters**:

- `id`: Builder.io tag ID
- `options.includeRefs`: Expand masterTag reference (default: false)

**Returns**: Builder.io tag object or `null` if not found

**Behavior**:

1. Query Builder.io by ID
2. Return tag if found
3. Return null if not found

**Error Handling**:

- Returns null on not found
- Throws `BuilderApiError` on API failures

**Example**:

```typescript
const tag = await getBuilderTagById("abc123xyz789", { includeRefs: true });
// Returns: BuilderTag | null
```

---

### 3. createBuilderTag()

Create a new tag in Builder.io.

**Signature**:

```typescript
async function createBuilderTag(tagData: {
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string; // Builder.io tag ID
}): Promise<BuilderTag>;
```

**Parameters**:

- `tagData`: Tag fields (name and tagType required)

**Returns**: Created Builder.io tag with ID

**Behavior**:

1. Validate required fields (name, tagType)
2. Check for duplicate name (case-insensitive)
3. Transform masterTag to Builder.io reference format
4. Create tag in Builder.io with published status
5. Invalidate tags cache
6. Return created tag

**Error Handling**:

- Throws `ValidationError` on missing required fields
- Throws `DuplicateError` on duplicate name
- Throws `BuilderApiError` on Builder.io failures

**Example**:

```typescript
const newTag = await createBuilderTag({
  name: "Climate Change",
  tagType: "domain",
  tagLine: "Environmental sustainability",
});
// Returns: BuilderTag with id
```

---

### 4. updateBuilderTag()

Update an existing tag in Builder.io.

**Signature**:

```typescript
async function updateBuilderTag(
  id: string,
  updates: Partial<{
    name: string;
    tagType: string;
    tagLine: string;
    picture: string;
    tagPageLink: string;
    masterTag: string;
  }>
): Promise<BuilderTag>;
```

**Parameters**:

- `id`: Builder.io tag ID
- `updates`: Partial tag data to update

**Returns**: Updated Builder.io tag

**Behavior**:

1. Fetch current tag
2. Validate updates (no circular masterTag)
3. Merge updates with existing data
4. Update in Builder.io
5. Invalidate tags cache
6. Return updated tag

**Error Handling**:

- Throws `NotFoundError` if tag doesn't exist
- Throws `ValidationError` on circular reference
- Throws `BuilderApiError` on Builder.io failures

**Example**:

```typescript
const updated = await updateBuilderTag("abc123", {
  tagLine: "Updated description",
});
// Returns: BuilderTag
```

---

### 5. transformBuilderTagToWixFormat()

Transform Builder.io tag to Wix-compatible format.

**Signature**:

```typescript
function transformBuilderTagToWixFormat(
  builderTag: BuilderTag,
  mentions?: number
): WixTag;
```

**Parameters**:

- `builderTag`: Builder.io tag object
- `mentions`: Optional mention count (calculated separately)

**Returns**: Wix-compatible tag object

**Transformation**:
| Source | Target | Transformation |
|--------|--------|----------------|
| `id` | `_id` | Direct copy |
| `data.name` | `name` | Direct copy |
| `data.tagType` | `tagType` | Direct copy |
| `data.tagLine` | `tagLine` | Direct copy (optional) |
| `data.picture` | `picture` | Direct copy (optional) |
| `data.tagPageLink` | `tagPageLink` | Direct copy (optional) |
| `data.masterTag.id` | `masterTag` | Extract ID from reference |
| `data.wixId` | `wixId` | Direct copy (optional) |
| `createdDate` | `_createdDate.$date` | Convert timestamp to ISO string |
| `lastUpdated` | `_updatedDate.$date` | Convert timestamp to ISO string |
| `mentions` param | `mentions` | Direct copy |

**Error Handling**:

- Returns valid WixTag even with missing optional fields
- Logs warning on invalid structure

**Example**:

```typescript
const builderTag: BuilderTag = {
  id: "abc123",
  data: {
    name: "AI Ethics",
    tagType: "domain",
    masterTag: {
      "@type": "@builder.io/core:Reference",
      id: "master-id",
      model: "tag",
    },
  },
  createdDate: 1701619200000,
  lastUpdated: 1701622800000,
  published: "published",
};

const wixTag = transformBuilderTagToWixFormat(builderTag, 42);
// Returns:
// {
//   _id: 'abc123',
//   name: 'AI Ethics',
//   tagType: 'domain',
//   masterTag: 'master-id',
//   mentions: 42,
//   _createdDate: { $date: '2023-12-03T...' },
//   ...
// }
```

---

### 6. transformWixTagToBuilderFormat()

Transform Wix tag to Builder.io creation payload.

**Signature**:

```typescript
function transformWixTagToBuilderFormat(wixTag: Partial<WixTag>): {
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: BuilderReference;
};
```

**Parameters**:

- `wixTag`: Wix tag object (partial for creation)

**Returns**: Builder.io data payload

**Transformation**:
| Source | Target | Transformation |
|--------|--------|----------------|
| `name` | `name` | Direct copy (required) |
| `tagType` | `tagType` | Direct copy (required) |
| `tagLine` | `tagLine` | Direct copy (optional) |
| `picture` | `picture` | Direct copy (optional) |
| `tagPageLink` | `tagPageLink` | Direct copy (optional) |
| `masterTag` | `masterTag` | Convert to Builder.io reference |

**Error Handling**:

- Throws `ValidationError` if name or tagType missing
- Omits invalid masterTag (logs warning)

**Example**:

```typescript
const wixTag: Partial<WixTag> = {
  name: "New Tag",
  tagType: "domain",
  masterTag: "master-id",
};

const builderData = transformWixTagToBuilderFormat(wixTag);
// Returns:
// {
//   name: 'New Tag',
//   tagType: 'domain',
//   masterTag: {
//     "@type": "@builder.io/core:Reference",
//     "id": "master-id",
//     "model": "tag"
//   }
// }
```

---

### 7. translateWixTagIdToBuilderId()

Translate Wix tag ID to Builder.io tag ID using mapping file.

**Signature**:

```typescript
function translateWixTagIdToBuilderId(wixId: string): string | undefined;
```

**Parameters**:

- `wixId`: Original Wix tag UUID

**Returns**: Builder.io tag ID or `undefined` if not found

**Behavior**:

1. Load mapping file into memory (once at module init)
2. Build Map: wixId → builderId
3. Lookup wixId in map
4. Return builderId or undefined

**Error Handling**:

- Returns undefined if wixId not found
- Logs warning: `"Wix tag ID ${wixId} not found in mapping file - skipping mention"`
- Mention calculation continues with remaining tags
- Throws on invalid mapping file format (fails fast at module load)

**Example**:

```typescript
const builderId = translateWixTagIdToBuilderId("old-wix-uuid-123");
// Returns: 'abc123xyz789' or undefined
```

---

### 8. translateBuilderIdToWixTagId()

Translate Builder.io tag ID to Wix tag ID (reverse lookup).

**Signature**:

```typescript
function translateBuilderIdToWixTagId(builderId: string): string | undefined;
```

**Parameters**:

- `builderId`: Builder.io tag ID

**Returns**: Wix tag UUID or `undefined` if not found

**Behavior**:

1. Build reverse map: builderId → wixId (once at module init)
2. Lookup builderId in reverse map
3. Return wixId or undefined

**Error Handling**:

- Returns undefined if builderId not found
- Useful for legacy URL redirects

**Example**:

```typescript
const wixId = translateBuilderIdToWixTagId("abc123xyz789");
// Returns: 'old-wix-uuid-123' or undefined
```

---

### 9. batchTransformBuilderTagsToWixFormat()

Transform array of Builder.io tags to Wix format (optimized).

**Signature**:

```typescript
function batchTransformBuilderTagsToWixFormat(
  builderTags: BuilderTag[],
  mentionsMap?: Map<string, number>
): WixTag[];
```

**Parameters**:

- `builderTags`: Array of Builder.io tags
- `mentionsMap`: Optional map of tag ID → mention count

**Returns**: Array of Wix-compatible tags

**Behavior**:

1. Transform each tag using `transformBuilderTagToWixFormat`
2. Attach mentions from map if provided
3. Return transformed array

**Performance**: O(n) complexity

**Example**:

```typescript
const builderTags = await getAllBuilderTags();
const mentionsMap = new Map([["abc123", 42]]);
const wixTags = batchTransformBuilderTagsToWixFormat(builderTags, mentionsMap);
// Returns: WixTag[]
```

---

## Mapping Module Initialization

### On Module Load

```typescript
// Load mapping file once
const mappingData: TagMappingEntry[] = require("@/data/mappings/tag-migration-mapping.json");

// Build maps
const wixToBuilderMap = new Map<string, string>();
const builderToWixMap = new Map<string, string>();

mappingData.forEach((entry) => {
  wixToBuilderMap.set(entry.wixId, entry.builderId);
  builderToWixMap.set(entry.builderId, entry.wixId);
});

// Export lookup functions
export const translateWixTagIdToBuilderId = (wixId: string) =>
  wixToBuilderMap.get(wixId);

export const translateBuilderIdToWixTagId = (builderId: string) =>
  builderToWixMap.get(builderId);
```

## Error Types

```typescript
export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DuplicateError extends Error {
  constructor(message: string, public existingId: string) {
    super(message);
    this.name = "DuplicateError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string, public id: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BuilderApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = "BuilderApiError";
  }
}
```

## Testing Contracts

### Unit Tests

```typescript
describe("transformBuilderTagToWixFormat", () => {
  it("should transform complete tag", () => {
    const builderTag: BuilderTag = {
      id: "abc123",
      data: {
        name: "Test Tag",
        tagType: "domain",
        tagLine: "Description",
        masterTag: {
          "@type": "@builder.io/core:Reference",
          id: "master-id",
          model: "tag",
        },
      },
      createdDate: 1701619200000,
      lastUpdated: 1701619200000,
      published: "published",
    };

    const wixTag = transformBuilderTagToWixFormat(builderTag, 10);

    expect(wixTag._id).toBe("abc123");
    expect(wixTag.name).toBe("Test Tag");
    expect(wixTag.masterTag).toBe("master-id");
    expect(wixTag.mentions).toBe(10);
  });

  it("should handle missing optional fields", () => {
    const builderTag: BuilderTag = {
      id: "abc123",
      data: { name: "Minimal", tagType: "domain" },
      createdDate: 1701619200000,
      lastUpdated: 1701619200000,
      published: "published",
    };

    const wixTag = transformBuilderTagToWixFormat(builderTag);

    expect(wixTag.tagLine).toBeUndefined();
    expect(wixTag.masterTag).toBeUndefined();
  });
});

describe("translateWixTagIdToBuilderId", () => {
  it("should translate known ID", () => {
    const builderId = translateWixTagIdToBuilderId("known-wix-id");
    expect(builderId).toBe("abc123xyz789");
  });

  it("should return undefined for unknown ID", () => {
    const builderId = translateWixTagIdToBuilderId("unknown-id");
    expect(builderId).toBeUndefined();
  });
});
```

## Performance Considerations

**Memory Usage**:

- Mapping file loaded once (~500KB)
- In-memory maps: O(n) space where n = number of tags
- Transformation: O(1) per tag

**Time Complexity**:

- `translateWixTagIdToBuilderId`: O(1) lookup
- `transformBuilderTagToWixFormat`: O(1) per tag
- `batchTransformBuilderTagsToWixFormat`: O(n) for n tags

**Optimization Notes**:

- Mapping loaded once at startup (not per request)
- Use batch transformation for arrays
- Consider memoization for frequently accessed tags

## Usage Examples

### Fetch and Transform Tags

```typescript
import {
  getAllBuilderTags,
  batchTransformBuilderTagsToWixFormat,
} from "@/app/utils/builderTagUtils";

// In API route
export async function GET() {
  const builderTags = await getAllBuilderTags();
  const wixTags = batchTransformBuilderTagsToWixFormat(builderTags);
  return NextResponse.json(wixTags);
}
```

### Create Tag from Component

```typescript
import { createBuilderTag } from "@/app/utils/builderTagUtils";

async function handleCreateTag(name: string, tagType: string) {
  try {
    const newTag = await createBuilderTag({ name, tagType });
    console.log("Created tag:", newTag.id);
    // Invalidate cache
    await fetch("/api/invalidate-cache", { method: "POST" });
  } catch (error) {
    if (error instanceof DuplicateError) {
      alert("Tag already exists");
    } else {
      alert("Failed to create tag");
    }
  }
}
```

### Translate Affiliation Tag IDs

```typescript
import { translateWixTagIdToBuilderId } from "@/app/utils/builderTagUtils";

function countAffiliationMentions(tag: BuilderTag, affiliations: any[]) {
  const wixId = tag.data.wixId;
  if (!wixId) return 0;

  return affiliations.filter(
    (aff) =>
      aff.personTag === wixId ||
      aff.projectTag === wixId ||
      aff.organisationTag === wixId
  ).length;
}
```

## Summary

All transformation utilities defined with clear contracts:

- Fetch operations: `getAllBuilderTags`, `getBuilderTagById`
- Create/Update: `createBuilderTag`, `updateBuilderTag`
- Transformations: `transformBuilderTagToWixFormat`, `transformWixTagToBuilderFormat`
- ID translation: `translateWixTagIdToBuilderId`, `translateBuilderIdToWixTagId`
- Batch operations: `batchTransformBuilderTagsToWixFormat`

Ready for implementation with defined signatures, error handling, and testing patterns.
