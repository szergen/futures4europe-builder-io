# Quickstart: Working with Builder.io Tags

**Feature**: Switch Tag Operations from Wix to Builder.io
**Date**: 2024-12-03
**Audience**: Developers implementing or maintaining tag operations

## Overview

This guide provides practical examples for working with Builder.io tags after the migration from Wix. It covers common tasks, code patterns, and troubleshooting tips.

## Prerequisites

- Node.js 18+ installed
- Access to Builder.io workspace
- Environment variables configured
- Redis (Upstash) credentials

## Environment Setup

### Required Environment Variables

```bash
# .env.local
BUILDER_PUBLIC_API_KEY=your-public-key
BUILDER_PRIVATE_API_KEY=your-private-key
REDIS_URL=your-upstash-redis-url
REDIS_TOKEN=your-upstash-redis-token
```

**Security Notes**:

- Never commit API keys to version control
- Use `.env.local` for local development
- Vercel deployment uses environment variables dashboard
- Private API key only needed for write operations

### Verify Setup

```typescript
// Test Builder.io connection
import { builder } from "@builder.io/sdk";

builder.init(process.env.BUILDER_PUBLIC_API_KEY);

const tags = await builder.getAll("tag", { limit: 1 });
console.log("Connected to Builder.io:", tags.length > 0);
```

## User-Facing Examples

### Creating a Tag via UI

**TagPicker Component** - Users can create new tags directly from the tag picker:

1. Open tag picker in any post/project/person form
2. Type a new tag name
3. Click "Create [tag name]" button
4. Fill in optional tagline
5. Tag is created in Builder.io and immediately available

**Behind the scenes**:

- `POST /api/builder/tag` with validation
- Duplicate name checking (case-insensitive)
- Automatic cache invalidation
- Returns created tag with Builder.io ID

### Searching and Filtering Tags

**Tag Search** - Filter tags by type or name:

```typescript
// Filter by tag type (e.g., "person", "project", "organisation")
const personTags = await fetch("/api/tags?tagType=person").then((res) =>
  res.json()
);

// In client component with hooks
import useFetchListTags from "@app/custom-hooks/useFetchListTags";

function MyComponent() {
  const { tags, loading } = useFetchListTags({ tagType: "project" });

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag._id} {...tag} />
      ))}
    </div>
  );
}
```

**Features**:

- Real-time filtering client-side
- Case-insensitive matching
- Handles plural/singular variations (e.g., "project" matches "projects")

### Tag with Popularity (Mentions)

**Display Popular Tags**:

```typescript
const popularTags = await fetch("/api/tags-with-popularity").then((res) =>
  res.json()
);

// Tags include mentions count
popularTags.forEach((tag) => {
  console.log(`${tag.name}: ${tag.mentions} mentions`);
});
```

---

## Developer API Examples

### Common Tasks

### 1. Fetch All Tags

**Use Case**: Display tag picker, populate filters

```typescript
import {
  getAllBuilderTags,
  batchTransformBuilderTagsToWixFormat,
} from "@/app/utils/builderTagUtils";

// In API route or server component
async function getTags() {
  // Fetch from Builder.io (uses cache)
  const builderTags = await getAllBuilderTags();

  // Transform to Wix format for components
  const wixTags = batchTransformBuilderTagsToWixFormat(builderTags);

  return wixTags;
}

// In client component
const tags = await fetch("/api/tags").then((res) => res.json());
```

**When to Use**:

- Loading TagPicker dropdown
- Populating search filters
- Building tag clouds

**Performance**: ~500ms (cached), ~2s (uncached)

---

### 2. Fetch Tags by Type

**Use Case**: Filter tags for specific content type

```typescript
import {
  getAllBuilderTags,
  batchTransformBuilderTagsToWixFormat,
} from "@/app/utils/builderTagUtils";

async function getTagsByType(tagType: string) {
  const allTags = await getAllBuilderTags();

  // Filter by tag type
  const filteredTags = allTags.filter(
    (tag) => tag.data.tagType.toLowerCase() === tagType.toLowerCase()
  );

  return batchTransformBuilderTagsToWixFormat(filteredTags);
}

// Usage
const personTags = await getTagsByType("person");
const projectTags = await getTagsByType("project");
```

**Common Tag Types**:

- `person` - People tags
- `project` - Project tags
- `organisation` - Organisation tags
- `domain` - Domain/topic tags
- `foresight method` - Methodology tags
- `activity` - Activity type tags
- `country` - Country/location tags

---

### 3. Create a New Tag

**Use Case**: User creates tag via TagPicker or admin interface

```typescript
import { createBuilderTag } from "@/app/utils/builderTagUtils";

async function handleCreateTag(formData: {
  name: string;
  tagType: string;
  tagLine?: string;
  masterTag?: string;
}) {
  try {
    // Create in Builder.io
    const newTag = await createBuilderTag({
      name: formData.name,
      tagType: formData.tagType,
      tagLine: formData.tagLine,
      masterTag: formData.masterTag, // Optional master tag ID
    });

    // Invalidate cache
    await fetch("/api/invalidate-cache", { method: "POST" });

    // Transform for UI
    const wixTag = transformBuilderTagToWixFormat(newTag);

    return { success: true, tag: wixTag };
  } catch (error) {
    if (error instanceof DuplicateError) {
      return { success: false, error: "Tag already exists" };
    }
    throw error;
  }
}

// In TagPicker component
const result = await handleCreateTag({
  name: "New Research Topic",
  tagType: "domain",
  tagLine: "Emerging research area",
});
```

**Validation**:

- `name`: Required, unique (case-insensitive)
- `tagType`: Required, must be valid enum
- `masterTag`: Optional, must be valid tag ID

---

### 4. Update an Existing Tag

**Use Case**: Edit tag details in admin interface

```typescript
import { updateBuilderTag } from "@/app/utils/builderTagUtils";

async function handleUpdateTag(
  tagId: string,
  updates: Partial<{
    name: string;
    tagType: string;
    tagLine: string;
    picture: string;
    tagPageLink: string;
    masterTag: string;
  }>
) {
  try {
    const updatedTag = await updateBuilderTag(tagId, updates);

    // Invalidate cache
    await fetch("/api/invalidate-cache", { method: "POST" });

    return { success: true, tag: updatedTag };
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { success: false, error: "Tag not found" };
    }
    throw error;
  }
}

// Usage
await handleUpdateTag("abc123xyz789", {
  tagLine: "Updated description",
  picture: "https://cdn.builder.io/api/v1/image/...",
});
```

**Notes**:

- Only changed fields need to be included
- Cache invalidation is automatic
- Validates no circular masterTag references

---

### 5. Calculate Tag Mentions (Popularity)

**Use Case**: Display tag popularity, sort by mentions

```typescript
import { calculatePopularity } from "@/app/utils/tags.utils";
import { getAllBuilderTags } from "@/app/utils/builderTagUtils";

async function getTagsWithPopularity() {
  // Fetch all required data
  const builderTags = await getAllBuilderTags();
  const infoPages = await getInfoPagesFromBuilderOrCache();
  const postPages = await getPostPagesFromBuilderOrCache();
  const affiliations = await getAffiliationsFromWix();

  // Transform tags to Wix format
  const wixTags = batchTransformBuilderTagsToWixFormat(builderTags);

  // Calculate mentions
  const tagsWithMentions = calculatePopularity(
    wixTags,
    infoPages,
    postPages,
    affiliations
  );

  // Sort by popularity
  return tagsWithMentions.sort((a, b) => b.mentions - a.mentions);
}

// Usage
const popularTags = await getTagsWithPopularity();
console.log(
  "Top tag:",
  popularTags[0].name,
  "with",
  popularTags[0].mentions,
  "mentions"
);
```

**Mention Calculation**:

- Counts references in info pages (using Builder.io ID)
- Counts references in post pages (using Builder.io ID)
- Counts references in affiliations (using Wix ID → Builder.io translation)
- Includes masterTag references

---

### 6. Translate Wix Tag IDs (Legacy Support)

**Use Case**: Handle affiliation data still using Wix IDs

```typescript
import { translateWixTagIdToBuilderId } from "@/app/utils/builderTagUtils";

function processAffiliation(affiliation: any) {
  // Affiliation has Wix tag IDs
  const wixPersonTagId = affiliation.personTag;
  const wixProjectTagId = affiliation.projectTag;

  // Translate to Builder.io IDs
  const builderPersonTagId = translateWixTagIdToBuilderId(wixPersonTagId);
  const builderProjectTagId = translateWixTagIdToBuilderId(wixProjectTagId);

  return {
    ...affiliation,
    builderPersonTagId,
    builderProjectTagId,
  };
}

// Usage in mention calculation
const affiliationMentions = affiliations.filter((aff) => {
  const wixId = tag.data.wixId;
  return aff.personTag === wixId || aff.projectTag === wixId;
});
```

**Notes**:

- Mapping file loaded once at startup
- O(1) lookup performance
- Returns `undefined` if Wix ID not found

---

### 7. Work with Master Tags (Tag Hierarchies)

**Use Case**: Display tag with parent, validate relationships

```typescript
import { getBuilderTagById } from "@/app/utils/builderTagUtils";

async function getTagWithMaster(tagId: string) {
  // Fetch tag with expanded references
  const tag = await getBuilderTagById(tagId, { includeRefs: true });

  if (!tag) return null;

  // Check if has master tag
  if (tag.data.masterTag) {
    const masterTag = tag.data.masterTag.value; // Expanded reference

    return {
      tag: transformBuilderTagToWixFormat(tag),
      masterTag: masterTag ? transformBuilderTagToWixFormat(masterTag) : null,
    };
  }

  return {
    tag: transformBuilderTagToWixFormat(tag),
    masterTag: null,
  };
}

// Usage
const { tag, masterTag } = await getTagWithMaster("abc123");
if (masterTag) {
  console.log(`${tag.name} is a variant of ${masterTag.name}`);
}
```

**Master Tag Use Cases**:

- Tag aliases (e.g., "AI" → "Artificial Intelligence")
- Tag hierarchies (e.g., "Machine Learning" → "Artificial Intelligence")
- Tag consolidation (multiple tags point to one canonical tag)

---

### 8. Invalidate Cache After Changes

**Use Case**: Force cache refresh after tag creation/update

```typescript
// After creating/updating tags
async function invalidateTagCache() {
  await fetch("/api/invalidate-cache", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keys: [
        "tags_builder.json",
        "tags-with-popularity_builder.json",
        "builder-tags-raw_builder.json",
      ],
    }),
  });
}

// In TagPicker after tag creation
const newTag = await createBuilderTag({ name, tagType });
await invalidateTagCache();
await refetchTags(); // Re-fetch tags for UI
```

**Cache Keys**:

- `tags_builder.json` - All tags from Builder.io (isolated from production)
- `tags-with-popularity_builder.json` - Tags with mention counts (isolated from production)
- `builder-tags-raw_builder.json` - Raw Builder.io tag data (internal cache)

**When to Invalidate**:

- After creating a tag
- After updating a tag
- After deleting/unpublishing a tag
- On manual cache refresh request

---

## Component Integration

### TagPicker Component

**Before (Wix)**:

```typescript
const uploadTag = async (tagName: string, tagTagline: string) => {
  const result = await insertDataItem({
    dataCollectionId: "Tags",
    dataItem: {
      data: {
        name: tagName,
        tagLine: tagTagline,
        tagType: tagType,
      },
    },
  });
  return result;
};
```

**After (Builder.io)**:

```typescript
import { createBuilderTag } from "@/app/utils/builderTagUtils";

const uploadTag = async (tagName: string, tagTagline: string) => {
  const result = await createBuilderTag({
    name: tagName,
    tagLine: tagTagline,
    tagType: tagType,
  });

  // Invalidate cache
  await fetch("/api/invalidate-cache", { method: "POST" });

  return result;
};
```

### AuthContext (Tag Fetching)

**Before (Wix)**:

```typescript
useEffect(() => {
  const fetchTags = async () => {
    fetchTagsWithPopularity().then((allTags) => {
      setTags(allTags);
      setTagsFetched(true);
    });
  };
  fetchTags();
}, [refreshTags]);
```

**After (Builder.io)** - No changes needed! `fetchTagsWithPopularity()` updated to use Builder.io internally.

## Testing

### Unit Tests

```typescript
import { transformBuilderTagToWixFormat } from "@/app/utils/builderTagUtils";

describe("Tag Transformations", () => {
  it("should transform Builder.io tag to Wix format", () => {
    const builderTag = {
      id: "abc123",
      data: {
        name: "Test Tag",
        tagType: "domain",
        tagLine: "Description",
      },
      createdDate: 1701619200000,
      lastUpdated: 1701619200000,
      published: "published",
    };

    const wixTag = transformBuilderTagToWixFormat(builderTag, 10);

    expect(wixTag._id).toBe("abc123");
    expect(wixTag.name).toBe("Test Tag");
    expect(wixTag.mentions).toBe(10);
  });
});
```

### E2E Tests

```typescript
import { test, expect } from "@playwright/test";

test("should create and display new tag", async ({ page }) => {
  await page.goto("/dashboard/posts/new");

  // Open tag picker
  await page.click('[data-testid="tag-picker"]');

  // Create new tag
  await page.click('[data-testid="create-tag-button"]');
  await page.fill('[data-testid="tag-name-input"]', "E2E Test Tag");
  await page.selectOption('[data-testid="tag-type-select"]', "domain");
  await page.click('[data-testid="submit-tag-button"]');

  // Verify tag appears in picker
  await expect(page.locator("text=E2E Test Tag")).toBeVisible();
});
```

## Troubleshooting

### Issue: Tags not appearing after creation

**Symptoms**: New tag created but not showing in TagPicker

**Solution**:

```typescript
// Ensure cache invalidation is called
await fetch("/api/invalidate-cache", { method: "POST" });

// Check if tag actually created in Builder.io
const tag = await getBuilderTagById(newTagId);
console.log("Tag exists:", !!tag);

// Force refetch tags
const freshTags = await getAllBuilderTags({ skipCache: true });
```

### Issue: Duplicate tag error

**Symptoms**: `DuplicateError` thrown on tag creation

**Solution**:

```typescript
// Check for existing tag (case-insensitive)
const existingTags = await getAllBuilderTags();
const duplicate = existingTags.find(
  (t) => t.data.name.toLowerCase() === newTagName.toLowerCase()
);

if (duplicate) {
  // Use existing tag instead
  return duplicate;
} else {
  // Create new tag
  return await createBuilderTag({ name: newTagName, tagType });
}
```

### Issue: Slow tag fetching

**Symptoms**: Tags take > 5 seconds to load

**Possible Causes**:

1. Cache not working (check Redis connection)
2. Builder.io API slow (check Builder.io status)
3. Too many tags (> 10,000)

**Solutions**:

```typescript
// Verify cache working
const cached = await RedisCacheService.getFromCache("tags_builder.json");
console.log("Cache hit:", !!cached);

// Check tag count
const tags = await getAllBuilderTags();
console.log("Tag count:", tags.length);

// Enable query logging
const tags = await builder.getAll("tag", {
  limit: 100,
  options: { noTargeting: true },
});
console.log("Fetch time:", performance.now());
```

### Issue: Mention counts incorrect

**Symptoms**: Tag mentions don't match expected value

**Debugging**:

```typescript
// Check each source
const tag = await getBuilderTagById(tagId);
const wixId = tag.data.wixId;

// Count in info pages
const infoMentions = infoPages.filter((page) =>
  containsId(page.data, tag.id)
).length;

// Count in post pages
const postMentions = postPages.filter((page) =>
  containsId(page.data, tag.id)
).length;

// Count in affiliations
const affMentions = affiliations.filter(
  (aff) =>
    aff.personTag === wixId ||
    aff.projectTag === wixId ||
    aff.organisationTag === wixId
).length;

console.log({
  infoMentions,
  postMentions,
  affMentions,
  total: infoMentions + postMentions + affMentions,
});
```

## Best Practices

### 1. Always Transform for Components

```typescript
// ✅ Good - Transform to Wix format
const builderTags = await getAllBuilderTags();
const wixTags = batchTransformBuilderTagsToWixFormat(builderTags);
return wixTags;

// ❌ Bad - Return Builder.io format directly
const tags = await getAllBuilderTags();
return tags; // Components expect Wix format!
```

### 2. Handle Errors Gracefully

```typescript
// ✅ Good - Specific error handling
try {
  const tag = await createBuilderTag(data);
} catch (error) {
  if (error instanceof DuplicateError) {
    // Handle duplicate
  } else if (error instanceof ValidationError) {
    // Handle validation
  } else {
    // Handle unknown error
  }
}

// ❌ Bad - Generic error handling
try {
  const tag = await createBuilderTag(data);
} catch (error) {
  console.error(error); // User sees generic error
}
```

### 3. Cache Aggressively

```typescript
// ✅ Good - Use cache
const tags = await getAllBuilderTags(); // Uses cache

// ❌ Bad - Bypass cache unnecessarily
const tags = await builder.getAll("tag"); // Direct API call every time
```

### 4. Cache Optimization (Automatic)

**Note**: Cache management is now optimized automatically. You don't need to manually invalidate!

```typescript
// ✅ Optimized - Cache is automatically updated
const newTag = await createBuilderTag(data);
// New tag is APPENDED to cache, not invalidated
// Instant availability, no refetch needed

const updated = await updateBuilderTag(id, data);
// Tag is UPDATED in cache, mentions preserved
// Instant reflection, no refetch needed
```

**How it works**:

1. **CREATE**: Appends new tag to all 3 cache layers

   - `builder-tags-raw_builder.json`
   - `tags_builder.json`
   - `tags-with-popularity_builder.json` (mentions: 0)

2. **UPDATE**: Updates tag in all 3 cache layers (preserves mentions)

3. **Fallback**: If cache operation fails, falls back to invalidation

**Performance Impact**:

- Before: ~10-15s cache rebuild on next request
- After: Instant availability (< 1ms cache update)

```typescript
// ❌ Old Way (don't do this)
const newTag = await createBuilderTag(data);
await fetch("/api/invalidate-cache", { method: "POST" }); // No longer needed!
```

### 5. Page Load Optimization

**Optimization**: Removed unnecessary cache invalidation on page load.

```typescript
// ❌ Before - New_Post page load triggered full cache rebuild
useEffect(() => {
  isNewPost && handleTagCreated(); // Invalidated ALL caches
}, []);
// Result: 10-15s delay every time someone visited /post-page/New_Post

// ✅ After - New_Post uses existing cached data
// No useEffect, no cache invalidation
// Result: <100ms instant load
```

**Why this matters**:

- **Before**: Every New_Post page visit → Full cache rebuild → 3,000+ tags refetched
- **After**: New_Post page uses existing cache → Instant load
- **Trade-off**: Tags might be 1-4 hours stale (acceptable for low-traffic site)

**When cache IS invalidated**:

- Manual cache clear via `/api/invalidate-cache`
- Cache TTL expires (4 hours)
- Error in cache append/update operations (fallback)

### 6. Use Batch Operations

```typescript
// ✅ Good - Transform in batch
const wixTags = batchTransformBuilderTagsToWixFormat(builderTags);

// ❌ Bad - Transform one by one
const wixTags = builderTags.map((tag) => transformBuilderTagToWixFormat(tag));
// Less efficient, no optimization opportunity
```

## Next Steps

1. **Review**: Read [data-model.md](./data-model.md) for complete data structures
2. **Contracts**: Check [contracts/](./contracts/) for API specifications
3. **Implement**: Start with tag fetching, then creation, then updates
4. **Test**: Write E2E tests for each user story
5. **Deploy**: Follow deployment checklist with smoke tests

## Support

- **Documentation**: `/specs/004-tags-builder-migration/`
- **Constitution**: `/.specify/memory/constitution.md`
- **Builder.io Docs**: https://www.builder.io/c/docs
- **Upstash Redis Docs**: https://docs.upstash.com/

## Summary

This quickstart covers the most common tag operations after migration to Builder.io:

- Fetching tags (with caching)
- Creating and updating tags
- Calculating tag mentions
- Transforming between formats
- Cache management
- Component integration

All utilities are in `app/utils/builderTagUtils.ts` with comprehensive error handling and performance optimization.
