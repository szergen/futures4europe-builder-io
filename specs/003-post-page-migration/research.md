# Research: Post-Page Creation Migration

**Feature**: 003-post-page-migration  
**Date**: 2025-12-01  
**Status**: ✅ Complete

## Purpose

This document consolidates research findings for migrating post-page creation and editing from Wix API to Builder.io Write API, resolving all technical unknowns before implementation.

---

## Research Area 1: Builder.io Write API Patterns

### Decision

Use Builder.io Write API (v1) with Bearer token authentication for all content mutations (create/update).

### Rationale

- **Established pattern**: Migration scripts (`migrate-posts.js`, `migrate-infopages.js`) already use this approach successfully
- **Single-call efficiency**: Write API accepts complete payloads including all reference fields
- **Error handling**: Standard HTTP responses with detailed error messages
- **Authentication**: Private API key (server-side only) provides full write access

### Implementation Pattern (from `scripts/migrations/migrate-posts.js`)

```javascript
async function makeRequest(method, endpoint, data = null) {
  const url = `${BUILDER_API_URL}/${endpoint}`;

  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${PRIVATE_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${JSON.stringify(responseData)}`);
  }

  return responseData;
}
```

### Key Endpoints

- **Create**: `POST /v1/write/post-page`
- **Update**: `PUT /v1/write/post-page/{id}`

### Alternatives Considered

1. ❌ **Builder.io SDK mutations** - SDK is primarily for read operations; Write API is recommended for mutations
2. ❌ **GraphQL API** - Write API is simpler and has established patterns in codebase
3. ❌ **Separate calls per field** - Would replicate Wix's inefficiency (10+ calls)

---

## Research Area 2: Reference Field Transformation

### Decision

Transform tag objects to Builder.io Reference format inline during API payload construction.

### Rationale

- **Consistency**: Matches existing pattern in `builderPostUtils.ts` for reading data
- **Efficiency**: All references included in single API call
- **Type safety**: Reference format is standardized across all content types

### Reference Format

```typescript
// Single reference (e.g., countryTag)
{
  "@type": "@builder.io/core:Reference",
  "id": "builder-content-id",
  "model": "tag-page"
}

// Reference array (e.g., people, methods, domains)
[
  { "@type": "@builder.io/core:Reference", "id": "id-1", "model": "tag-page" },
  { "@type": "@builder.io/core:Reference", "id": "id-2", "model": "tag-page" }
]
```

### Transformation Function (to be created)

```typescript
function transformReferencesForBuilder(tags: TagProps[]): BuilderReference[] {
  if (!tags || !Array.isArray(tags)) return [];

  return tags
    .filter((tag) => tag && tag._id)
    .map((tag) => ({
      "@type": "@builder.io/core:Reference" as const,
      id: tag._id,
      model: "tag-page",
    }));
}
```

### Alternatives Considered

1. ❌ **Separate API calls per reference field** - Wix approach, too slow (10+ calls)
2. ❌ **String IDs instead of Reference objects** - Doesn't match Builder.io schema requirements
3. ❌ **Reference wrappers (e.g., authorItem)** - Only needed for reading/display, not for writing

---

## Research Area 3: Error Handling Strategy

### Decision

Implement explicit error handling with user-visible messages and data preservation on failure.

### Rationale (from Clarification Q1)

- **No automatic retries**: User has control, prevents aggressive retry loops
- **Data preservation**: Edit state maintained, no data loss
- **Manual retry**: User can fix issues (network, validation) and retry when ready
- **Graceful degradation**: API failures don't crash the application

### Error Handling Pattern

```typescript
async function createBuilderPost(
  postData: PostData
): Promise<BuilderResponse | null> {
  try {
    const response = await fetch(`${BUILDER_API_URL}/v1/write/post-page`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformPostDataForBuilder(postData)),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Builder.io API error (${response.status}): ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("[Builder.io] Failed to create post:", error);
    // Error message displayed to user via component state
    // Data remains in edit state for manual retry
    return null;
  }
}
```

### Console Logging Scope (from Clarification Q4)

- ✅ Operation start
- ✅ Success/failure status
- ✅ Builder.io response IDs
- ✅ Error details
- ❌ Full API request payloads (privacy concern)
- ❌ Full API response payloads (privacy concern)

### Alternatives Considered

1. ❌ **Automatic retry with exponential backoff** - Could worsen rate limiting, masks persistent issues
2. ❌ **Silent failure** - Poor UX, user doesn't know what happened
3. ❌ **Verbose logging** - Exposes sensitive user data in console

---

## Research Area 4: Cache Invalidation Integration

### Decision

Call existing `invalidatePostPageCache(slug)` after successful Builder.io save and before user redirect.

### Rationale (from Clarification Q3)

- **Timing**: After save ensures data is persisted before cache clear
- **Before redirect**: Ensures cache is fresh before user navigates
- **Graceful degradation**: If invalidation fails, post is still saved correctly
- **Existing utility**: `cache-utils.ts` provides `invalidatePostPageCache()`

### Integration Pattern (from `cache-utils.ts`)

```typescript
// Existing utility function
export const invalidatePostPageCache = async (
  slug: string
): Promise<Response[]> => {
  return Promise.all([revalidatePath(`/post/${slug}`)]);
};

// Integration in create/update flow
async function savePost(postData) {
  // 1. Save to Builder.io
  const result = await createBuilderPost(postData);
  if (!result) {
    // Handle error, preserve edit state
    return;
  }

  // 2. Invalidate cache (after save, before redirect)
  try {
    await invalidatePostPageCache(result.data.slug);
  } catch (cacheError) {
    console.warn(
      "[Cache] Invalidation failed, post saved successfully:",
      cacheError
    );
    // Continue anyway - post is saved, cache will expire naturally
  }

  // 3. Redirect to new post
  router.push(`/post-page/${result.data.slug}`);
}
```

### Cache Paths to Invalidate

- `/post/{slug}` - Specific post page
- `/post` - Post listing page (for dashboard)

### Alternatives Considered

1. ❌ **Invalidate before save** - Risk of stale cache if save fails
2. ❌ **Invalidate after redirect** - User might see stale data on new page
3. ❌ **Block on invalidation failure** - Poor UX if cache service is down but Builder.io is up

---

## Research Area 5: Slug Generation

### Decision

Preserve existing `sanitizeTitleForSlug()` and `generateUniqueHash()` functions without modification.

### Rationale (from Clarification Q5)

- **Existing logic works**: Already handles special chars, length limits, uniqueness
- **Character limit**: Current limit (~100 chars) is appropriate, no change needed
- **No migration required**: New posts follow same pattern as existing posts

### Existing Functions (from `PageComponents.utils.ts`)

```typescript
// Already implemented, no changes needed
export const sanitizeTitleForSlug = (title: string): string => {
  // Lowercase, replace spaces/special chars with hyphens, truncate at existing limit
};

export const generateUniqueHash = (): string => {
  // Generates unique hash for slug uniqueness
};

// Usage in createNewPost
const slug = sanitizeTitleForSlug(postData.title) + "-" + generateUniqueHash();
```

### Alternatives Considered

1. ❌ **Change character limit to 80** - No benefit, existing limit is fine
2. ❌ **URL encoding for special chars** - Makes slugs less readable
3. ❌ **New slug generation algorithm** - Unnecessary change, existing works well

---

## Technical Stack Summary

### Languages & Frameworks

- **TypeScript 4.8.4**: Type safety for API contracts
- **Next.js 13.4.9 (App Router)**: Server and client components
- **React 18.2.0**: UI framework

### APIs & Services

- **Builder.io Write API v1**: Content mutations (create/update)
- **Builder.io Private API Key**: Server-side authentication
- **Next.js API Routes**: Cache invalidation endpoint

### Key Libraries

- `@builder.io/sdk-react`: Builder.io React SDK (read operations)
- `next/navigation`: Router for redirects
- `react`: Component framework

### Utilities (existing)

- `app/utils/builderPostUtils.ts`: Builder.io transformations (to be extended)
- `app/utils/cache-utils.ts`: Cache invalidation (existing, no changes)
- `app/utils/PageComponents.utils.ts`: Slug generation (existing, no changes)

---

## Risk Assessment

| Risk                            | Likelihood | Impact | Mitigation                                                             |
| ------------------------------- | ---------- | ------ | ---------------------------------------------------------------------- |
| Builder.io API rate limits      | Low        | Medium | Single API call per save (vs 10+), delay already implemented if needed |
| API authentication failure      | Low        | High   | Environment variable validation, clear error messages                  |
| Cache invalidation failure      | Medium     | Low    | Graceful degradation, post still saved correctly                       |
| Data loss on failure            | Low        | High   | Edit state preserved, no automatic retries, manual retry available     |
| Reference transformation errors | Low        | Medium | Validation before API call, detailed error logging                     |

---

## Performance Comparison

### Current (Wix API)

- Create: 1 initial call + 10+ reference calls = **11+ API calls**
- Update: 1 update call + ~6 reference calls = **7+ API calls**
- Time: **5-10+ seconds** per save operation

### New (Builder.io API)

- Create: **1 API call** (all fields including references)
- Update: **1 API call** (changed fields only)
- Time: **<2 seconds** per save operation (SC-002)

### Improvement

- **90%+ reduction** in API calls
- **70%+ reduction** in save time
- Better user experience with loading modal

---

## Dependencies

### Required Before Implementation

✅ Builder.io `post-page` model configured with all fields  
✅ Builder.io Private API key in environment (`BUILDER_PRIVATE_API_KEY`)  
✅ User authentication providing user tag ID  
✅ Tag migration complete (all tags in Builder.io)

### Required During Implementation

- Extend `builderPostUtils.ts` with create/update functions
- Update `PostPageComponent.tsx` createNewPost() and updateDataToServer()
- Migrate route from `app/post/New_Post` to `app/post-page/New_Post`

### Testing Requirements

- Browser-based testing for all 3 post types
- Network tab verification of single API call
- Cache invalidation verification
- Error state testing (network failures, validation errors)

---

## Next Steps

✅ **Phase 0 Complete** - All technical unknowns resolved  
➡️ **Phase 1 Next** - Create data model, API contracts, and quickstart guide  
⏳ **Phase 2 Pending** - Task breakdown and implementation

---

## References

- Existing migration scripts: `scripts/migrations/migrate-posts.js`, `scripts/migrations/migrate-infopages.js`
- Existing utilities: `app/utils/builderPostUtils.ts`, `app/utils/cache-utils.ts`
- Feature specification: `specs/003-post-page-migration/spec.md`
- Constitution: `.specify/memory/constitution.md`
