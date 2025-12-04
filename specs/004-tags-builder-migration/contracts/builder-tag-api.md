# API Contract: Builder.io Tag Operations

**Feature**: Switch Tag Operations from Wix to Builder.io
**Date**: 2024-12-03
**Version**: 1.0.0

## Overview

This document defines the API contracts for all tag operations using Builder.io as the data source. It covers endpoints for fetching, creating, updating, and invalidating tag data.

## Base Configuration

**Builder.io API Base**: `https://cdn.builder.io/api/v2`
**Authentication**: Private API Key (write operations) / Public API Key (read operations)
**Content Type**: `application/json`
**Model Name**: `tag`

## Endpoints

### 1. GET /api/tags

Fetch all tags from Builder.io with caching.

**Method**: `GET`
**Auth**: None (public read)
**Cache**: Redis (`tags.json`, 4-hour TTL)
**Query Parameters**:

- `tagType` (optional): Filter tags by type (e.g., `?tagType=domain`)
- Supported values: person, organisation, project, domain, foresight method, activity, country, etc.

**Response** (200 OK):

```typescript
{
  // Array of Builder.io tag objects
  tags: Array<{
    id: string;
    data: {
      name: string;
      tagType: string;
      tagLine?: string;
      picture?: string;
      tagPageLink?: string;
      masterTag?: {
        "@type": "@builder.io/core:Reference";
        id: string;
        model: "tag";
      };
      wixId?: string;
    };
    createdDate: number;
    lastUpdated: number;
    published: string;
  }>;
}
```

**Error Responses**:

- `500`: Builder.io fetch failed

```json
{
  "error": "Failed to fetch tags from Builder.io",
  "details": "API error message"
}
```

**Implementation Notes**:

- Check Redis cache first
- On cache miss, fetch from Builder.io
- Apply retry logic (3 attempts, exponential backoff)
- Cache result before returning
- Transform to Wix format for components if needed

**Cache Invalidation**: Via POST `/api/tags` or `/api/invalidate-cache`

---

### 2. POST /api/tags

Refresh tags cache from Builder.io.

**Method**: `POST`
**Auth**: None (cache management)
**Side Effects**: Invalidates and rebuilds cache

**Request Body**: None

**Response** (200 OK):

```json
{
  "message": "Tags cache updated successfully",
  "count": 4523
}
```

**Error Responses**:

- `500`: Cache update failed

```json
{
  "error": "Failed to update tags cache",
  "details": "Error message"
}
```

**Implementation Notes**:

- Fetch all tags from Builder.io
- Save to Redis with TTL
- Return count of cached tags
- Used after tag creation/update

---

### 3. GET /api/tags-with-popularity

Fetch tags with calculated mention counts.

**Method**: `GET`
**Auth**: None (public read)
**Cache**: Redis (`tags-with-popularity.json`, 4-hour TTL)

**Response** (200 OK):

```typescript
{
  tags: Array<{
    _id: string;
    name: string;
    tagType: string;
    tagLine?: string;
    picture?: string;
    tagPageLink?: string;
    masterTag?: string;
    wixId?: string;
    mentions: number; // Calculated popularity score
  }>;
}
```

**Error Responses**:

- `500`: Popularity calculation failed

```json
{
  "error": "Failed to calculate tag popularity",
  "details": "Error message"
}
```

**Implementation Notes**:

- Check cache first
- On miss, fetch tags, info pages, post pages, affiliations
- Calculate mentions for each tag
- Include affiliation mentions (via Wix ID translation)
- Count masterTag references
- Sort by mentions (descending)
- Cache result

**Cache Invalidation**: Via `/api/invalidate-cache` or on content updates

---

### 4. POST /api/builder/tag

Create a new tag in Builder.io.

**Method**: `POST`
**Auth**: Builder.io private API key (server-side)
**Validation**: Required fields, unique name

**Request Body**:

```typescript
{
  name: string;           // Required
  tagType: string;        // Required
  tagLine?: string;       // Optional
  picture?: string;       // Optional
  tagPageLink?: string;   // Optional
  masterTag?: string;     // Optional (Builder.io tag ID)
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "tag": {
    "id": "abc123xyz789",
    "data": {
      "name": "New Tag",
      "tagType": "domain",
      "tagLine": "Optional tagline",
      "wixId": null
    },
    "createdDate": 1701619200000,
    "lastUpdated": 1701619200000,
    "published": "published"
  }
}
```

**Error Responses**:

- `400`: Validation failed

```json
{
  "error": "Validation failed",
  "details": "name is required"
}
```

- `409`: Duplicate tag name

```json
{
  "error": "Tag already exists",
  "details": "Tag with name 'Existing Tag' already exists"
}
```

- `500`: Builder.io API error

```json
{
  "error": "Failed to create tag",
  "details": "Builder.io API error"
}
```

**Implementation Notes**:

- Validate required fields before API call
- Check for duplicate name (case-insensitive)
- Transform masterTag to Builder.io reference format
- Set published status to "published"
- Invalidate tags cache after creation
- Return created tag with Builder.io ID

---

### 5. GET /api/builder/tag/:id

Fetch a single tag by Builder.io ID.

**Method**: `GET`
**Auth**: None (public read)
**Parameters**: `id` - Builder.io tag ID

**Response** (200 OK):

```json
{
  "id": "abc123xyz789",
  "data": {
    "name": "Tag Name",
    "tagType": "domain",
    "tagLine": "Optional tagline",
    "picture": "https://cdn.builder.io/...",
    "tagPageLink": "/tags/tag-name",
    "masterTag": {
      "@type": "@builder.io/core:Reference",
      "id": "master-tag-id",
      "model": "tag"
    },
    "wixId": "old-wix-uuid"
  },
  "createdDate": 1701619200000,
  "lastUpdated": 1701619200000,
  "published": "published"
}
```

**Error Responses**:

- `404`: Tag not found

```json
{
  "error": "Tag not found",
  "id": "abc123xyz789"
}
```

- `500`: Builder.io API error

```json
{
  "error": "Failed to fetch tag",
  "details": "API error message"
}
```

**Implementation Notes**:

- Use Builder.io SDK `builder.get('tag', { id })`
- Return null if not found
- No caching for individual tag lookups

---

### 6. PUT /api/builder/tag/:id

Update an existing tag in Builder.io.

**Method**: `PUT`
**Auth**: Builder.io private API key (server-side)
**Parameters**: `id` - Builder.io tag ID
**Validation**: Tag exists, no circular references

**Request Body** (partial update):

```typescript
{
  name?: string;
  tagType?: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string;  // Builder.io tag ID
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "tag": {
    "id": "abc123xyz789",
    "data": {
      "name": "Updated Name",
      "tagType": "domain",
      ...
    },
    "lastUpdated": 1701622800000
  }
}
```

**Error Responses**:

- `404`: Tag not found
- `400`: Validation failed
- `409`: Circular masterTag reference
- `500`: Builder.io API error

**Implementation Notes**:

- Fetch current tag first
- Merge updates with existing data
- Validate no circular masterTag references
- Update in Builder.io
- Invalidate tags cache
- Return updated tag

---

### 7. DELETE /api/builder/tag/:id

Unpublish (soft delete) a tag in Builder.io.

**Method**: `DELETE`
**Auth**: Builder.io private API key (server-side)
**Parameters**: `id` - Builder.io tag ID

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Tag unpublished successfully"
}
```

**Error Responses**:

- `404`: Tag not found
- `409`: Tag referenced by pages (cannot delete)
- `500`: Builder.io API error

**Implementation Notes**:

- Check if tag referenced by any pages
- If referenced, return 409 error
- Otherwise, unpublish in Builder.io
- Invalidate tags cache
- Tag remains in Builder.io for audit

---

### 8. POST /api/invalidate-cache

Invalidate all tag-related caches.

**Method**: `POST`
**Auth**: None (cache management)
**Side Effects**: Clears Redis cache keys

**Request Body** (optional):

```typescript
{
  keys?: string[];  // Specific keys to invalidate, or all if omitted
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "invalidated": ["tags.json", "tags-with-popularity.json"]
}
```

**Error Responses**:

- `500`: Cache invalidation failed

**Implementation Notes**:

- Delete specified cache keys from Redis
- If no keys specified, delete all tag-related caches
- Used after tag create/update/delete operations
- Client-side can call this to force refresh

---

### 9. GET /api/getCollectionItems

Legacy endpoint - route "Tags" collection to Builder.io.

**Method**: `POST` (legacy, should be GET)
**Auth**: None
**Request Body**:

```json
{
  "collectionName": "Tags"
}
```

**Response** (200 OK):

```typescript
{
  items: Array<BuilderTag>; // Same as GET /api/tags
}
```

**Implementation Notes**:

- Check if `collectionName === "Tags"`
- If yes, fetch from Builder.io
- Otherwise, fall through to existing logic
- Transform to Wix format for backward compatibility

---

## Builder.io SDK Usage

### Read Operations

```typescript
import { builder } from "@builder.io/sdk";

builder.init(process.env.BUILDER_PUBLIC_API_KEY);

// Get all tags with automatic pagination
const tags = await builder.getAll("tag", {
  limit: 100, // Builder.io maximum per request
  options: {
    noTargeting: true, // Faster for backend queries
    includeRefs: false, // Don't expand references
  },
});
// SDK automatically handles pagination and returns all results

// Manual pagination (if needed for custom logic)
let allTags = [];
let offset = 0;
const limit = 100;
let hasMore = true;

while (hasMore) {
  const batch = await builder.getAll("tag", {
    limit,
    offset,
    options: { noTargeting: true },
  });
  allTags = allTags.concat(batch);
  hasMore = batch.length === limit;
  offset += limit;
}

// Get single tag
const tag = await builder.get("tag", {
  query: {
    id: "tag-id",
  },
  options: {
    includeRefs: true, // Expand masterTag reference
  },
});
```

### Write Operations

```typescript
import { builder } from "@builder.io/sdk";

builder.init(process.env.BUILDER_PRIVATE_API_KEY);

// Create tag
const newTag = await builder.content.create({
  model: "tag",
  data: {
    name: "New Tag",
    tagType: "domain",
    tagLine: "Optional",
  },
  published: "published",
});

// Update tag
const updatedTag = await builder.content.update({
  model: "tag",
  id: "tag-id",
  data: {
    tagLine: "Updated tagline",
  },
});

// Unpublish tag
await builder.content.update({
  model: "tag",
  id: "tag-id",
  published: "draft", // Unpublish
});
```

## Error Handling

### Retry Logic

```typescript
async function fetchWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      if (isLastAttempt) throw error;

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
}
```

### Error Types

```typescript
class BuilderApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = "BuilderApiError";
  }
}

class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class DuplicateError extends Error {
  constructor(message: string, public existingId: string) {
    super(message);
    this.name = "DuplicateError";
  }
}
```

## Rate Limits

**Builder.io Limits**:

- Reads: ~1000 requests/minute (free tier)
- Writes: ~100 requests/minute (free tier)

**Mitigation**:

- Cache aggressively (4-hour TTL)
- Batch operations when possible
- Implement exponential backoff
- Monitor rate limit headers
- Consider upgrading Builder.io plan if limits hit

## Testing

### Contract Testing

```typescript
describe("Builder.io Tag API", () => {
  it("should fetch all tags", async () => {
    const response = await fetch("/api/tags");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.tags)).toBe(true);
  });

  it("should create tag", async () => {
    const response = await fetch("/api/builder/tag", {
      method: "POST",
      body: JSON.stringify({
        name: "Test Tag",
        tagType: "domain",
      }),
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.tag.id).toBeDefined();
  });
});
```

## Error Message Standards

**User-Friendly Error Format**:

All error messages returned to users MUST follow this structure:

```typescript
interface UserFriendlyError {
  error: string; // Brief, non-technical message for users
  details?: string; // Technical details for debugging (optional in production)
  action?: string; // Suggested action user can take
  code?: string; // Error code for tracking (e.g., "TAG_CREATE_FAILED")
}
```

**Examples**:

```json
{
  "error": "Unable to create tag at this time",
  "action": "Please try again in a few moments",
  "code": "TAG_CREATE_FAILED"
}
```

```json
{
  "error": "Tag with this name already exists",
  "action": "Please choose a different name or use the existing tag",
  "code": "TAG_DUPLICATE"
}
```

**Error Categories**:

- Network failures: "Unable to connect to tag service"
- Validation failures: Clear field-specific messages (e.g., "Tag name is required")
- Duplicate errors: "This tag already exists"
- Rate limits: "Too many requests. Please wait a moment and try again"

---

## Summary

All API contracts defined for Builder.io tag operations. Key endpoints:

- `/api/tags` - Fetch all tags (cached)
- `/api/tags-with-popularity` - Fetch with mentions (cached)
- `/api/builder/tag` - CRUD operations
- `/api/invalidate-cache` - Cache management

Ready for implementation with defined request/response formats, error handling, and testing patterns.
