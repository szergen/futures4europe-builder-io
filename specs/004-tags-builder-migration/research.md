# Research: Builder.io Tag Operations

**Feature**: Switch Tag Operations from Wix to Builder.io
**Date**: 2024-12-03
**Status**: Complete

## Overview

This document contains research findings for implementing Builder.io tag operations, including SDK usage patterns, API best practices, caching strategies, and transformation patterns.

## Research Areas

### 1. Builder.io SDK Tag Creation Patterns

**Decision**: Use Builder.io Write API with private API key for tag creation

**Rationale**:

- Builder.io provides a Write API for creating/updating content programmatically
- Private API key required for write operations (read API uses public key)
- Content creation follows REST-like pattern: `POST /api/v2/content/{model}`
- SDK method: `builder.content.create()`

**Implementation Pattern**:

```typescript
import { builder } from "@builder.io/sdk";

builder.init(process.env.BUILDER_PRIVATE_API_KEY);

async function createTag(tagData: {
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string;
  wixId?: string;
}) {
  const response = await builder.content.create({
    model: "tag",
    data: tagData,
    published: "published", // or 'draft'
  });
  return response;
}
```

**Alternatives Considered**:

- Direct REST API calls: More control but requires manual auth handling
- Builder.io UI only: Not viable for programmatic creation from application

**Best Practices**:

- Always validate data before sending to Builder.io
- Handle rate limits with retry logic (3 attempts with exponential backoff)
- Use environment variables for API keys (never commit)
- Set `published` status appropriately

### 2. Builder.io Reference Field Handling

**Decision**: Use Builder.io Reference type with model linking for masterTag relationships

**Rationale**:

- Builder.io provides native `reference` field type for relationships
- References store: `{ "@type": "@builder.io/core:Reference", "id": "...", "model": "..." }`
- Enables Builder.io UI to show relationship picker
- Queries can expand references automatically

**Implementation Pattern**:

```typescript
// Creating a tag with masterTag reference
const tagWithMaster = {
  name: "AI Ethics",
  tagType: "domain",
  masterTag: {
    "@type": "@builder.io/core:Reference",
    id: "master-tag-builder-id",
    model: "tag",
  },
};

// Query with reference expansion
const tags = await builder.getAll("tag", {
  options: {
    includeRefs: true, // Expands masterTag reference
  },
});
```

**Alternatives Considered**:

- Store Builder.io ID as string: Loses Builder.io relationship awareness
- Store Wix ID and translate: Requires mapping lookup on every access

**Best Practices**:

- Always set `model` field in references (enables type checking)
- Use `includeRefs: true` when querying if you need expanded data
- Validate reference IDs exist before creating relationships
- Handle circular references (detected in edge cases)

### 3. Cache Invalidation Strategies for Builder.io Content

**Decision**: Manual cache invalidation with Redis TTL + on-demand refresh

**Rationale**:

- Builder.io doesn't provide automatic cache invalidation webhooks in free tier
- Redis caching crucial for performance (avoid hitting Builder.io API on every request)
- TTL-based expiration (4 hours) provides baseline freshness
- Manual invalidation via API endpoint for immediate updates

**Implementation Pattern**:

```typescript
// Cache key structure
const CACHE_KEYS = {
  allTags: "tags.json",
  tagsWithPopularity: "tags-with-popularity.json",
};

// Cache with TTL
await RedisCacheService.saveToCache(
  CACHE_KEYS.allTags,
  tags,
  4 * 60 * 60 * 1000 // 4 hours
);

// Invalidation endpoint
export async function POST(req: NextRequest) {
  await RedisCacheService.deleteCache(CACHE_KEYS.allTags);
  await RedisCacheService.deleteCache(CACHE_KEYS.tagsWithPopularity);
  return NextResponse.json({ success: true });
}

// Client-side cache refresh trigger
async function handleTagCreated() {
  await fetch("/api/invalidate-cache", { method: "POST" });
  // Refetch tags from Builder.io
}
```

**Alternatives Considered**:

- No caching: Unacceptable performance (3s fetch goal)
- Short TTL (minutes): Too many Builder.io API calls, rate limit risk
- Webhook-based invalidation: Not available in current Builder.io plan

**Best Practices**:

- Always invalidate both `tags.json` and `tags-with-popularity.json` together
- Fallback to direct Builder.io fetch if cache miss
- Log cache operations for debugging
- Consider warming cache after invalidation (prevent cold start)

### 4. Builder.io API Rate Limits and Batch Operations

**Decision**: Implement retry logic with exponential backoff, fetch all tags in single query

**Rationale**:

- Builder.io rate limits vary by plan (typically 100-1000 req/min)
- Single query for all tags preferred over pagination when dataset < 5000
- Retry logic handles transient failures and rate limits gracefully
- Exponential backoff prevents overwhelming API during issues

**Implementation Pattern**:

```typescript
async function fetchBuilderTagsWithRetry(maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const tags = await builder.getAll("tag", {
        limit: 100,
        options: {
          noTargeting: true, // Skip targeting evaluation
        },
      });
      return tags;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      if (isLastAttempt) throw error;

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Pagination for large datasets (if needed in future)
async function fetchAllTagsPaginated() {
  let offset = 0;
  const limit = 100;
  const allTags = [];

  while (true) {
    const batch = await builder.getAll("tag", {
      limit,
      offset,
      options: { noTargeting: true },
    });

    allTags.push(...batch);
    if (batch.length < limit) break; // Last page
    offset += limit;
  }

  return allTags;
}
```

**Alternatives Considered**:

- No retry logic: Fragile to transient errors
- Immediate retry: Can amplify rate limit issues
- Client-side batching: Unnecessary complexity for current scale

**Best Practices**:

- Log retry attempts for monitoring
- Use exponential backoff (don't hammer API)
- Set reasonable max retries (3 is standard)
- Consider circuit breaker pattern if failures persist
- Use `noTargeting: true` for admin/backend queries (faster)

### 5. Transformation Patterns for Builder.io → Legacy Format

**Decision**: Create utility functions to transform Builder.io data structure to match Wix format

**Rationale**:

- Existing components expect Wix data structure (backward compatibility)
- Transformation layer isolates components from data source changes
- Enables gradual component refactoring in Phase 4 if desired
- Consistent pattern across post pages, info pages, and tags

**Implementation Pattern**:

```typescript
// Builder.io format
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
}

// Wix legacy format (for components)
interface WixTag {
  _id: string;
  name: string;
  tagType: string;
  tagLine?: string;
  picture?: string;
  tagPageLink?: string;
  masterTag?: string; // Just the ID
  wixId?: string;
  mentions?: number; // Runtime calculated
}

// Transformation utility
function transformBuilderTagToWixFormat(builderTag: BuilderTag): WixTag {
  return {
    _id: builderTag.id,
    name: builderTag.data.name,
    tagType: builderTag.data.tagType,
    tagLine: builderTag.data.tagLine,
    picture: builderTag.data.picture,
    tagPageLink: builderTag.data.tagPageLink,
    masterTag: builderTag.data.masterTag?.id || undefined,
    wixId: builderTag.data.wixId,
    // mentions calculated separately
  };
}

// Reverse transformation for creation
function transformWixTagToBuilderFormat(wixTag: Partial<WixTag>) {
  const builderData: any = {
    name: wixTag.name,
    tagType: wixTag.tagType,
  };

  if (wixTag.tagLine) builderData.tagLine = wixTag.tagLine;
  if (wixTag.picture) builderData.picture = wixTag.picture;
  if (wixTag.tagPageLink) builderData.tagPageLink = wixTag.tagPageLink;

  // Convert masterTag ID to Builder.io reference
  if (wixTag.masterTag) {
    builderData.masterTag = {
      "@type": "@builder.io/core:Reference",
      id: wixTag.masterTag,
      model: "tag",
    };
  }

  return builderData;
}
```

**Alternatives Considered**:

- Refactor all components to use Builder.io format: Too risky for big bang
- Dual format support: Complexity without benefit
- No transformation: Breaking change to all consumers

**Best Practices**:

- Keep transformations simple and pure (no side effects)
- Document the transformation in JSDoc comments
- Unit test transformations thoroughly
- Consider TypeScript types for compile-time safety
- Log transformation errors (don't silently fail)

### 6. Affiliation Tag ID Translation Using Mapping File

**Decision**: Load mapping file once at startup, keep in memory for mention calculations

**Rationale**:

- Affiliations remain in Wix temporarily (out of scope for this feature)
- Mention calculations need to count affiliation references
- Mapping file provides Wix ID → Builder.io ID translation
- In-memory map provides O(1) lookup performance

**Implementation Pattern**:

```typescript
// Load mapping file
import mappingData from "@/data/mappings/tag-migration-mapping.json";

interface TagMapping {
  wixId: string;
  builderId: string;
  name: string;
  tagType: string;
}

const tagMappingCache = new Map<string, string>();

// Initialize mapping cache
function loadTagMapping() {
  const mappings: TagMapping[] = mappingData as any;
  mappings.forEach((mapping) => {
    tagMappingCache.set(mapping.wixId, mapping.builderId);
  });
}

// Translate Wix ID to Builder.io ID
function translateWixTagIdToBuilderId(wixId: string): string | undefined {
  return tagMappingCache.get(wixId);
}

// Use in mention calculation
function calculatePopularity(
  tags: BuilderTag[],
  infoPages: any[],
  postPages: any[],
  affiliations: any[] // From Wix
) {
  const popularityResults = [];

  tags.forEach((tag) => {
    let count = 0;

    // Count in info pages (Builder.io IDs)
    count += countTagInPages(tag.id, infoPages);

    // Count in post pages (Builder.io IDs)
    count += countTagInPages(tag.id, postPages);

    // Count in affiliations (Wix IDs - need translation)
    const wixId = tag.data.wixId;
    if (wixId) {
      const affiliationMentions = affiliations.filter(
        (affiliation) =>
          affiliation.personTag === wixId ||
          affiliation.projectTag === wixId ||
          affiliation.organisationTag === wixId
      );
      count += affiliationMentions.length;
    }

    popularityResults.push({
      ...transformBuilderTagToWixFormat(tag),
      mentions: count,
    });
  });

  return popularityResults;
}
```

**Alternatives Considered**:

- Query mapping on each mention calculation: Too slow (file I/O)
- Update affiliations first: Out of scope (separate migration)
- Skip affiliation mentions: Inaccurate popularity scores

**Best Practices**:

- Load mapping once at module initialization
- Gracefully handle missing mappings (log warning, skip)
- Validate mapping file format on load
- Consider refreshing mapping if updated (low priority)

## Implementation Readiness

All research complete. Key takeaways:

1. Builder.io SDK ready for tag creation with private API key
2. Reference field pattern clear for masterTag relationships
3. Cache strategy defined (Redis + TTL + manual invalidation)
4. Retry logic with exponential backoff for API resilience
5. Transformation utilities maintain backward compatibility
6. Mapping file strategy bridges Wix affiliations to Builder.io tags

Ready to proceed to Phase 1: Design & Contracts.
